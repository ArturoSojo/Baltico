"use client";

import { motion } from "framer-motion";
import { ChevronDown, Waves } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[750px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/restaurante.png"
          alt="Báltico Restaurante"
          fill
          sizes="100vw"
          className="object-cover"
          priority
          quality={90}
        />
        <div className="hero-gradient absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/60 via-transparent to-navy-950/60" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gold-400/20"
            style={{ left: `${20 + i * 15}%`, top: `${30 + (i % 3) * 20}%` }}
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-5 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <Waves className="text-sea-400" size={20} />
          <span className="text-sea-400 text-sm tracking-[0.3em] uppercase font-medium">
            La Guaira, Venezuela
          </span>
          <Waves className="text-sea-400" size={20} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] mb-8"
        >
          <span className="block">Donde el Mar</span>
          <span className="block text-gradient-gold">se Encuentra</span>
          <span className="block">con el Sabor</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-sand-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Vive la experiencia gastronómica más exclusiva del litoral.
          Mariscos frescos, atardeceres infinitos y la mejor vida nocturna.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <Link
            href="/reservar"
            className="group relative px-10 py-5 bg-gradient-to-r from-sunset-500 to-sunset-600 text-white text-lg font-bold rounded-2xl shadow-2xl shadow-sunset-500/30 hover:shadow-sunset-500/50 transition-all duration-300 animate-pulse-glow"
          >
            <span className="relative z-10">Reserva tu Experiencia</span>
          </Link>
          <Link
            href="/menu"
            className="px-9 py-4.5 text-sand-200 hover:text-white border border-white/20 hover:border-white/40 rounded-2xl transition-all duration-300 hover:bg-white/5 text-lg"
          >
            Ver Menú
          </Link>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="text-sand-400" size={28} />
      </motion.div>
    </section>
  );
}
