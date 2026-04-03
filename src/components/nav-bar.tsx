"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, Menu, X } from "lucide-react";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <nav aria-label="Main navigation" className="fixed top-0 w-full z-40 bg-bg/80 backdrop-blur-md border-b border-border-dark h-16 flex items-center transition-all">
      <div className="max-w-[1440px] mx-auto px-6 w-full flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-surface-elevated to-surface border border-border-dark flex items-center justify-center group-hover:border-primary/50 transition-all glow-blue">
            <ShieldCheck className="w-[18px] h-[18px] text-primary" />
          </div>
          <span className="font-bold text-xl tracking-tight gradient-text">
            Purview
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-muted hover:text-primary transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://app.getpurview.com/login"
            className="text-sm text-text-main hover:text-primary transition-colors hidden sm:block"
          >
            Log in
          </a>
          <a
            href="https://app.getpurview.com/scan"
            className="btn-primary text-white text-sm font-medium px-5 py-2.5 rounded-xl hidden sm:inline-flex"
          >
            Get Started
          </a>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden p-2 text-text-muted hover:text-primary transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden animate-fade-in-up"
          style={{ animationDuration: "0.2s" }}
        >
          <div className="absolute inset-0 bg-bg/95 backdrop-blur-xl" />
          <div className="relative flex flex-col h-full px-6 pt-6">
            <div className="flex items-center justify-between">
              <a
                href="#hero"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-surface-elevated to-surface border border-border-dark flex items-center justify-center glow-blue">
                  <ShieldCheck className="w-[18px] h-[18px] text-primary" />
                </div>
                <span className="font-bold text-xl tracking-tight gradient-text">
                  Purview
                </span>
              </a>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-text-muted hover:text-primary transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav aria-label="Mobile navigation" className="flex flex-col items-center justify-center flex-1 gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-medium py-4 text-text-main hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://app.getpurview.com/login"
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-medium py-4 text-text-main hover:text-primary transition-colors"
              >
                Log In
              </a>
              <a
                href="https://app.getpurview.com/scan"
                onClick={() => setIsMenuOpen(false)}
                className="btn-primary text-white text-lg font-semibold px-10 py-4 rounded-xl w-full max-w-sm text-center"
              >
                Get Started
              </a>
            </nav>
          </div>
        </div>
      )}

    </nav>
  );
}
