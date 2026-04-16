"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const COOKIE_NAME = "purview-consent";
const CROSS_DOMAINS = ["getpurview.com", "app.getpurview.com"];

type ConsentState = "granted" | "denied" | "pending";

function getStoredConsent(): ConsentState {
  if (typeof document === "undefined") return "pending";
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COOKIE_NAME}=(granted|denied)`),
  );
  return match ? (match[1] as ConsentState) : "pending";
}

function isGpcEnabled(): boolean {
  if (typeof navigator === "undefined") return false;
  return !!(navigator as Navigator & { globalPrivacyControl?: boolean })
    .globalPrivacyControl;
}

/**
 * Injects gtag.js for Google Ads with cross-domain linker so the _gcl_*
 * cookie is shared between getpurview.com and app.getpurview.com. Without
 * the linker, conversions fired on the app subdomain show up as "unknown
 * source" because the click ID gets stripped at the domain boundary.
 */
function loadGtagScript(adsId: string): void {
  if (typeof window === "undefined" || window.gtag) return;

  /* eslint-disable @typescript-eslint/no-explicit-any, prefer-rest-params */
  const w: any = window;
  w.dataLayer = w.dataLayer || [];
  function gtag() {
    w.dataLayer.push(arguments);
  }
  w.gtag = gtag;

  // Linker MUST be set before js and config commands. See
  // https://developers.google.com/tag-platform/devguides/cross-domain
  w.gtag("set", "linker", { domains: CROSS_DOMAINS });
  w.gtag("js", new Date());
  w.gtag("config", adsId);
  /* eslint-enable @typescript-eslint/no-explicit-any, prefer-rest-params */

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${adsId}`;
  document.head.appendChild(script);
}

/**
 * Consent-gated Google Ads tag. Reuses the same `purview-consent` cookie
 * that the Meta Pixel banner writes, so users only see one consent prompt.
 * Polls the cookie until a choice is made — no coupling to the pixel's
 * internal state.
 */
export function GoogleAdsTag(): null {
  const loaded = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!GOOGLE_ADS_ID) return;
    if (loaded.current) return;
    if (isGpcEnabled()) return;

    const tryLoad = (): boolean => {
      const state = getStoredConsent();
      if (state === "granted") {
        loaded.current = true;
        loadGtagScript(GOOGLE_ADS_ID);
        return true;
      }
      return state === "denied";
    };

    if (tryLoad()) return;

    // Poll the consent cookie for up to 5 minutes waiting for the user's
    // choice from the Meta Pixel banner (shared cookie = shared decision).
    let ticks = 0;
    const maxTicks = 600; // 600 * 500ms = 5 minutes
    const interval = window.setInterval(() => {
      ticks += 1;
      if (tryLoad() || ticks >= maxTicks) {
        window.clearInterval(interval);
      }
    }, 500);

    return () => window.clearInterval(interval);
  }, []);

  // Fire a page_view on client-side route changes so each SPA navigation
  // registers as a separate page in the remarketing audience.
  useEffect(() => {
    if (!GOOGLE_ADS_ID) return;
    if (!loaded.current || !window.gtag) return;
    window.gtag("event", "page_view", { page_path: pathname });
  }, [pathname]);

  return null;
}
