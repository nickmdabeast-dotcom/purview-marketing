import { Lock, Shield, EyeOff } from "lucide-react";

const badges = [
  { icon: Lock, label: "256-bit Data Encryption" },
  { icon: Shield, label: "GDPR Compliant Infrastructure" },
  { icon: EyeOff, label: "Privacy-First Design" },
];

export function SecurityBadges() {
  return (
    <div className="pt-2 md:pt-4 pb-8 md:pb-10">
      <div className="max-w-[1440px] mx-auto px-6 flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6">
        {badges.map((badge) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.label}
              className="flex items-center justify-center gap-3 premium-card rounded-xl px-5 py-4 text-xs md:text-sm w-full sm:w-auto"
            >
              <Icon className="w-[18px] h-[18px] text-primary" />
              <span className="text-text-main">{badge.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
