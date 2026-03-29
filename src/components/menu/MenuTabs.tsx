"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { CategoryInfo } from "@/data/menu";

interface MenuTabsProps {
  categories: CategoryInfo[];
  activeCategory: string;
  onSelect: (id: string) => void;
}

export default function MenuTabs({ categories, activeCategory, onSelect }: MenuTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const el = activeRef.current;
      const left = el.offsetLeft - container.offsetWidth / 2 + el.offsetWidth / 2;
      container.scrollTo({ left, behavior: "smooth" });
    }
  }, [activeCategory]);

  return (
    <div className="relative">
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-navy-950 to-transparent z-10 pointer-events-none sm:hidden" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-navy-950 to-transparent z-10 pointer-events-none sm:hidden" />

      <div
        ref={scrollRef}
        className="flex gap-2.5 overflow-x-auto pb-3 -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center sm:gap-2.5"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              ref={isActive ? activeRef : null}
              onClick={() => onSelect(cat.id)}
              className={cn(
                "relative flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-300 flex-shrink-0",
                isActive
                  ? "text-white"
                  : "text-sand-400 hover:text-sand-200 bg-white/[0.03] border border-white/[0.06] hover:border-white/10",
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-sunset-500 to-sunset-600 rounded-full shadow-lg shadow-sunset-500/25"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 text-base">{cat.icon}</span>
              <span className="relative z-10">{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
