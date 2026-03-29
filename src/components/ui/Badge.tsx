"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "promo" | "chef" | "share" | "premium" | "tropical" | "firma" | "default";
  className?: string;
}

const variantStyles: Record<string, string> = {
  promo: "bg-sunset-500/20 text-sunset-300 border-sunset-500/30",
  chef: "bg-gold-500/20 text-gold-300 border-gold-500/30",
  share: "bg-sea-500/20 text-sea-400 border-sea-500/30",
  premium: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  tropical: "bg-green-500/20 text-green-300 border-green-500/30",
  firma: "bg-gold-500/20 text-gold-300 border-gold-500/30 ring-1 ring-gold-500/20",
  default: "bg-white/10 text-sand-300 border-white/10",
};

function getVariantFromTag(tag: string): string {
  if (tag.includes("Promoción")) return "promo";
  if (tag.includes("Chef")) return "chef";
  if (tag.includes("Compartir")) return "share";
  if (tag.includes("Premium") || tag.includes("Ultra")) return "premium";
  if (tag.includes("Tropical")) return "tropical";
  if (tag.includes("Firma")) return "firma";
  if (tag.includes("Popular")) return "promo";
  if (tag.includes("Especial")) return "chef";
  return "default";
}

export default function Badge({ children, variant, className }: BadgeProps) {
  const resolvedVariant = variant || getVariantFromTag(String(children));

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase border",
        variantStyles[resolvedVariant],
        className,
      )}
    >
      {children}
    </span>
  );
}
