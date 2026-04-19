"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ShieldCheck, X } from "lucide-react";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const COOKIE_NAME = "purview-consent";

type ConsentState = "granted" | "denied" | "pending";

/** Read consent from cookie (shared across *.getpurview.com). */
function getStoredConsent(): ConsentState {
  if (typeof document === "undefined") return "pending";
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COOKIE_NAME}=(granted|denied)`),
  );
  return match ? (match[1] as ConsentState) : "pending";
}

/**
 * Write consent to a cookie scoped to .getpurview.com in production so both
 * the marketing site and the app share a single consent choice. On localhost
 * the domain attribute is omitted so the cookie works without a real domain.
 */
function setStoredConsent(value: "granted" | "denied"): void {
  if (typeof document === "undefined") return;
  const isLocalhost =
    typeof window !== "undefined" && window.location.hostname === "localhost";
  const domainPart = isLocalhost ? "" : "; domain=.getpurview.com";
  const securePart = isLocalhost ? "" : "; Secure";
  document.cookie = `${COOKIE_NAME}=${value}${domainPart}; path=/; max-age=31536000; SameSite=Lax${securePart}`;

  // Additive coordination primitive: notify sibling trackers (GoogleAdsTag)
  // that live in the same layout so they can load within the same banner-click
  // tick without each needing its own banner UI or cookie poll. Mirrors the
  // dashboard app's MetaPixel implementation for consistency.
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("purview-consent-change", { detail: { state: value } }),
    );
  }
}

function isGpcEnabled(): boolean {
  if (typeof navigator === "undefined") return false;
  return !!(navigator as Navigator & { globalPrivacyControl?: boolean })
    .globalPrivacyControl;
}

/** Dynamically injects Meta Pixel. Only called after explicit consent. */
function loadPixelScript(): void {
  if (typeof window === "undefined" || window.fbq) return;
  if (!PIXEL_ID) return;

  /* eslint-disable @typescript-eslint/no-explicit-any, prefer-rest-params, prefer-spread, @typescript-eslint/no-unused-expressions */
  const f: any = window;
  const n: any = (f.fbq = function () {
    n.callMethod
      ? n.callMethod.apply(n, arguments)
      : n.queue.push(arguments);
  });
  if (!f._fbq) f._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];
  /* eslint-enable @typescript-eslint/no-explicit-any, prefer-rest-params, prefer-spread, @typescript-eslint/no-unused-expressions */

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  n("init", PIXEL_ID);
  n("track", "PageView");
}

/**
 * Consent-gated Meta Pixel with route change tracking.
 *
 * - Honors GPC signal (pixel never loads, banner never shows)
 * - Stores consent in a cookie shared across *.getpurview.com
 * - Dynamically loads fbevents.js ONLY after explicit opt-in
 * - Tracks PageView on every client-side route change
 * - No-op if `NEXT_PUBLIC_META_PIXEL_ID` is unset
 */
export function MetaPixel(): React.JSX.Element | null {
  const [consent, setConsent] = useState<ConsentState>("pending");
  const [gpcBlocked, setGpcBlocked] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const pixelLoaded = useRef(false);
  const pathname = usePathname();

  // On mount: check GPC signal and stored consent cookie
  useEffect(() => {
    if (!PIXEL_ID) return;
    if (isGpcEnabled()) {
      setGpcBlocked(true);
      setConsent("denied");
      return;
    }

    const stored = getStoredConsent();
    setConsent(stored);

    if (stored === "granted" && !pixelLoaded.current) {
      pixelLoaded.current = true;
      loadPixelScript();
    } else if (stored === "pending") {
      const t = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(t);
    }
  }, []);

  // Track route changes (only fires if pixel is loaded)
  useEffect(() => {
    if (pixelLoaded.current && window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAccept = useCallback(() => {
    setStoredConsent("granted");
    setConsent("granted");
    setShowBanner(false);
    if (!pixelLoaded.current) {
      pixelLoaded.current = true;
      loadPixelScript();
    }
  }, []);

  const handleDecline = useCallback(() => {
    setStoredConsent("denied");
    setConsent("denied");
    setShowBanner(false);
  }, []);

  if (gpcBlocked || consent !== "pending" || !showBanner) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6"
    >
      <div className="mx-auto max-w-lg rounded-xl border border-white/10 bg-[#0d0d1a]/95 p-4 shadow-2xl backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <ShieldCheck
            className="mt-0.5 size-5 shrink-0 text-blue-400"
            aria-hidden="true"
          />
          <div className="flex-1 space-y-3">
            <p className="text-sm text-white/90">
              We use cookies to measure how our site is used and improve your
              experience. No data is shared until you consent.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={handleAccept}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500"
              >
                Accept
              </button>
              <button
                onClick={handleDecline}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:bg-white/5"
              >
                Decline
              </button>
            </div>
          </div>
          <button
            onClick={handleDecline}
            className="text-white/40 hover:text-white/80"
            aria-label="Dismiss"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
