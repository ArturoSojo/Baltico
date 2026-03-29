"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MapPin, Phone, Clock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/menu", label: "Menú" },
  { href: "/reservar", label: "Reservar" },
  { href: "/admin", label: "Admin" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-navy-950/80 backdrop-blur-2xl py-3 shadow-2xl shadow-black/30 border-b border-white/[0.06]"
            : "bg-transparent py-5",
        )}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-sunset-400 to-gold-500 flex items-center justify-center shadow-lg shadow-sunset-500/30 ring-2 ring-white/10">
              <span className="text-white font-serif font-bold text-xl">B</span>
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold text-white tracking-wide group-hover:text-sunset-300 transition-colors">
                Báltico
              </h1>
              <p className="text-[10px] text-sand-400 tracking-[0.2em] uppercase -mt-0.5">
                Restaurante & Marisquería
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-2">
            <div className="flex items-center gap-1 bg-white/[0.04] rounded-full p-1.5 border border-white/[0.06]">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-6 py-2.5 text-sm rounded-full transition-all duration-300",
                      isActive
                        ? "text-white font-medium"
                        : "text-sand-300 hover:text-white",
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="headerActiveNav"
                        className="absolute inset-0 bg-white/10 rounded-full border border-white/10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              })}
            </div>
            <Link
              href="/reservar"
              className="ml-3 px-7 py-2.5 bg-gradient-to-r from-sunset-500 to-sunset-600 text-white text-sm font-semibold rounded-full hover:from-sunset-400 hover:to-sunset-500 transition-all shadow-lg shadow-sunset-500/25 hover:shadow-sunset-500/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              Reservar Mesa
            </Link>
          </nav>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40"
          >
            <div className="absolute inset-0 bg-navy-950/95 backdrop-blur-2xl" />
            <div className="relative h-full pt-24 px-6 pb-8 flex flex-col">
              <nav className="flex-1 flex flex-col gap-1 mt-4">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileOpen(false)}
                        className={cn(
                          "flex items-center justify-between px-5 py-4.5 rounded-2xl text-lg transition-all",
                          isActive
                            ? "bg-sunset-500/10 text-sunset-400 border border-sunset-500/20"
                            : "text-sand-100 hover:bg-white/5",
                        )}
                      >
                        {link.label}
                        <ChevronRight size={18} className="text-sand-600" />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <Link
                  href="/reservar"
                  onClick={() => setIsMobileOpen(false)}
                  className="block w-full text-center py-4.5 bg-gradient-to-r from-sunset-500 to-sunset-600 text-white font-semibold rounded-2xl text-lg shadow-lg shadow-sunset-500/25"
                >
                  Reserva tu Experiencia
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 pt-6 border-t border-white/5 space-y-2.5 text-sm text-sand-500"
              >
                <div className="flex items-center gap-2.5">
                  <MapPin size={13} className="text-sand-600" />
                  <span>La Guaira, Venezuela</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone size={13} className="text-sand-600" />
                  <span>@balticovzla</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock size={13} className="text-sand-600" />
                  <span>Mar – Dom · 12:00 PM – 12:00 AM</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
