"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sunset, Music, UtensilsCrossed, Palmtree } from "lucide-react";

const features = [
  {
    icon: Sunset,
    title: "Atardeceres Infinitos",
    description: "Vista directa al mar Caribe con los atardeceres más impresionantes del litoral central",
  },
  {
    icon: UtensilsCrossed,
    title: "Cocina de Autor",
    description: "Mariscos frescos del día, preparados con técnicas gourmet y sabor caribeño auténtico",
  },
  {
    icon: Music,
    title: "Vida Nocturna",
    description: "DJ sessions, música en vivo y la mejor energía para noches inolvidables",
  },
  {
    icon: Palmtree,
    title: "Ambiente Tropical",
    description: "Churuatas, terraza frente al mar y decoración que te transporta al paraíso",
  },
];

export default function Experience() {
  return (
    <section className="py-24 sm:py-32 px-5 sm:px-8 relative overflow-hidden bg-navy-950">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sunset-400 text-[10px] tracking-[0.4em] uppercase font-black">
              El Estilo de Vida
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white mt-6 mb-8 leading-tight">
              Más que un Restaurante,{" "}
              <span className="italic text-gradient-gold block mt-2">un Destino Privilegiado</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-sunset-500 to-transparent mb-10" />
            <p className="text-sand-400 text-lg leading-relaxed mb-16 font-medium">
              Ubicado en el epicentro de La Guaira, Báltico fusiona la majestuosidad 
              del océano con una propuesta cosmopolita. Desde almuerzos bajo la brisa 
              del mar hasta noches que vibran con energía curada.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-12">
              {features.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 group"
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-sunset-500 group-hover:bg-sunset-500 group-hover:text-white transition-all duration-500 shadow-xl group-hover:shadow-sunset-500/20">
                    <feat.icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base mb-2 uppercase tracking-wide">{feat.title}</h4>
                    <p className="text-sand-600 text-sm leading-relaxed">{feat.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* Background decorative square */}
            <div className="absolute -top-10 -right-10 w-full h-full border border-white/5 rounded-[3rem] pointer-events-none" />
            
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10 group">
              <Image
                src="/images/brindis.png"
                alt="Experiencia Báltico"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-[3s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
            </div>
            
            <div className="absolute -bottom-10 -left-10 glass rounded-[2.5rem] p-10 max-w-[280px] border border-white/10 shadow-2xl animate-float">
               <div className="flex items-center gap-4 mb-4">
                  <div className="flex -space-x-4">
                     {[1,2,3].map(i => (
                       <div key={i} className="w-10 h-10 rounded-full border-2 border-navy-900 bg-navy-800" />
                     ))}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-sand-500">+10k Visitas</span>
               </div>
               
               <div className="flex items-center gap-3">
                 <p className="text-white font-serif text-5xl font-black italic">4.9</p>
                 <div>
                   <div className="flex gap-1 mb-1">
                     {Array.from({ length: 5 }).map((_, i) => (
                       <span key={i} className="text-gold-500 text-xs">★</span>
                     ))}
                   </div>
                   <p className="text-sand-600 text-[9px] font-black uppercase tracking-[0.1em]">Google Global Reviews</p>
                 </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
