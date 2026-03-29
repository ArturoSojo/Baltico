"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/landing/Footer";
import MenuTabs from "@/components/menu/MenuTabs";
import DishCard from "@/components/menu/DishCard";
import { MenuSkeleton } from "@/components/ui/Skeleton";
import { categories, menuItems } from "@/data/menu";
import { wineList } from "@/data/wines";
import { isNightTime, formatPrice } from "@/lib/utils";
import { Search, SunMoon, Wine } from "lucide-react";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("promociones");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showWines, setShowWines] = useState(false);
  const isNight = isNightTime();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredItems = useMemo(() => {
    let items = menuItems.filter((item) => item.category === activeCategory);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = menuItems.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    return items;
  }, [activeCategory, searchQuery]);

  const sortedItems = useMemo(() => {
    if (!isNight) return filteredItems;
    return [...filteredItems].sort((a, b) => {
      const aScore = a.timePreference === "night" ? 0 : a.timePreference === "all" ? 1 : 2;
      const bScore = b.timePreference === "night" ? 0 : b.timePreference === "all" ? 1 : 2;
      return aScore - bScore;
    });
  }, [filteredItems, isNight]);

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <section className="flex-1 pt-36 sm:pt-40 pb-24 sm:pb-32 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 sm:mb-16"
          >
            <span className="text-sunset-400 text-xs tracking-[0.25em] uppercase font-medium">
              Carta Gastronómica
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white mt-3 mb-4">
              Nuestro Menú
            </h1>
            <div className="w-16 h-0.5 bg-gradient-to-r from-sunset-500 to-gold-500 mx-auto mb-5" />
            <p className="text-sand-400 max-w-lg mx-auto text-base">
              Precios no incluyen IVA · Promociones activas todos los días
            </p>
            {isNight && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline-flex items-center gap-2.5 mt-5 px-5 py-2.5 bg-navy-800/60 border border-white/[0.06] rounded-full text-sm text-sand-300"
              >
                <SunMoon size={14} className="text-sunset-400" />
                Menú nocturno — destacamos parrillas, coctelería y whiskys
              </motion.div>
            )}
          </motion.div>

          <div className="max-w-lg mx-auto mb-10 sm:mb-12">
            <div className="relative">
              <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-sand-500" />
              <input
                type="text"
                placeholder="Buscar plato, ingrediente o categoría..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-5 py-4 bg-navy-800/50 border border-white/[0.08] rounded-2xl text-white focus:border-sunset-500 focus:outline-none focus:ring-2 focus:ring-sunset-500/20 transition-all placeholder:text-sand-600 text-sm"
              />
            </div>
          </div>

          {!searchQuery && (
            <div className="mb-10 sm:mb-12">
              <MenuTabs
                categories={categories}
                activeCategory={activeCategory}
                onSelect={setActiveCategory}
              />
            </div>
          )}

          <div className="flex justify-center mb-10 sm:mb-14">
            <button
              onClick={() => setShowWines(!showWines)}
              className="inline-flex items-center gap-2.5 px-6 py-3 glass rounded-full text-sm text-gold-300 hover:text-gold-200 transition-colors border border-gold-500/20 hover:border-gold-500/40"
            >
              <Wine size={16} />
              {showWines ? "Ver Menú de Platos" : "Ver Carta de Vinos"}
            </button>
          </div>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div key="skeleton" exit={{ opacity: 0 }}>
                <MenuSkeleton />
              </motion.div>
            ) : showWines ? (
              <motion.div
                key="wines"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-14"
              >
                {wineList.map((cat) => (
                  <div key={cat.country}>
                    <h3 className="font-serif text-2xl text-white mb-6 flex items-center gap-3">
                      <span className="text-3xl">{cat.flag}</span>
                      {cat.country}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {cat.wines.map((wine) => (
                        <div
                          key={wine.id}
                          className="glass rounded-2xl p-5 hover:border-gold-500/20 transition-colors group"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-serif text-white group-hover:text-gold-300 transition-colors">
                              {wine.name}
                            </h4>
                            <span className="text-lg font-bold text-gradient-gold whitespace-nowrap ml-4">
                              {formatPrice(wine.price)}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {wine.varieties.map((v) => (
                              <span
                                key={v}
                                className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 text-sand-400 border border-white/5"
                              >
                                {v}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={searchQuery || activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {sortedItems.length === 0 ? (
                  <div className="text-center py-28 text-sand-400">
                    <p className="text-lg mb-2">No se encontraron platos</p>
                    <p className="text-sm">Intenta con otra búsqueda</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
                    {sortedItems.map((item, i) => (
                      <DishCard key={item.id} item={item} index={i} />
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </main>
  );
}
