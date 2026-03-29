"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import { Wine, Users } from "lucide-react";
import type { MenuItem } from "@/data/menu";

interface DishCardProps {
  item: MenuItem;
  index: number;
}

export default function DishCard({ item, index }: DishCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <div className="glass rounded-2xl overflow-hidden menu-card-shadow hover:shadow-sunset-500/10 transition-all duration-500 hover:border-sunset-500/20 h-full flex flex-col">
        <div className="relative h-52 sm:h-56 overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent" />

          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[80%]">
            {item.tags.slice(0, 3).map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>

          {item.servesCount && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-navy-900/80 backdrop-blur-sm rounded-full px-2.5 py-1 text-[10px] text-sand-300">
              <Users size={10} />
              {item.servesCount}p
            </div>
          )}

          <AnimatePresence>
            {isHovered && item.pairing && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-3 left-3 right-3 glass-gold rounded-xl px-3 py-2.5 flex items-start gap-2"
              >
                <Wine size={14} className="text-gold-400 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-gold-200 leading-snug">
                  {item.pairing}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-serif text-lg text-white mb-2 group-hover:text-sunset-300 transition-colors leading-tight">
            {item.name}
          </h3>
          <p className="text-sand-400 text-sm leading-relaxed mb-5 line-clamp-2 flex-1">
            {item.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gradient-gold">
              {formatPrice(item.price)}
            </span>
            {item.isPromo && (
              <span className="text-[10px] text-sunset-400 font-medium bg-sunset-500/10 px-2 py-1 rounded-full">
                Disponible hoy
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
