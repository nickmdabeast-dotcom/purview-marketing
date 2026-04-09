import { ShieldCheck } from "lucide-react";

const links = [
  { href: "https://app.getpurview.com/privacy", label: "Privacy Policy", external: true },
  { href: "https://app.getpurview.com/terms", label: "Terms of Service", external: true },
  { href: "https://app.getpurview.com/login", label: "Log In", external: true },
  { href: "mailto:nikolas@getpurview.com", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="py-10 md:py-12 border-t border-border-dark/50 bg-bg/50 backdrop-blur-sm relative z-10">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-surface-elevated to-surface border border-border-dark flex items-center justify-center glow-blue">
              <ShieldCheck className="w-[18px] h-[18px] text-primary" />
            </div>
            <span className="font-bold text-xl tracking-tight gradient-text">
              Purview
            </span>
            <span className="text-text-muted text-xs md:text-sm ml-2">
              &copy; 2026 Purview LLC
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-xs md:text-sm text-text-muted hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="text-[10px] md:text-xs text-text-muted/70 font-mono text-center md:text-left border-t border-border-dark/30 pt-6 md:pt-8 leading-relaxed">
          This site provides legal information, not legal advice. Consult a qualified attorney for legal guidance regarding privacy compliance for your specific business operations.
        </div>
      </div>
    </footer>
  );
}
