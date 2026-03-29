"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";

const featured = [
  {
    name: "Canoa de Mariscos",
    description: "Mixtura de mariscos en crema blanca sobre media piña gratinada",
    price: 35.41,
    image: "/images/plato-mar.png",
    tags: ["Firma Báltico", "Recomendación del Chef"],
  },
  {
    name: "Salmón Báltico",
    description: "Churrasco de salmón glaseado con alcaparras, limón y mantequilla",
    price: 30.17,
    image: "/images/plato-mar.png",
    tags: ["Firma Báltico"],
  },
  {
    name: "Pulpo al Grill",
    description: "Pulpo bebé marinado en finas hierbas con chimichurri y papas aromatizadas",
    price: 38.95,
    image: "/images/plato-mar.png",
    tags: ["Premium"],
  },
  {
    name: "Parrilla Mar y Tierra",
    description: "Camarón, calamar, pollo, lomito y vieiras a la parrilla para dos",
    price: 53.09,
    image: "/images/restaurante.png",
    tags: ["Ideal para Compartir"],
  },
];

export default function FeaturedDishes() {
  return (
    <section className="py-24 sm:py-32 px-5 sm:px-8 relative overflow-hidden">
      {/* Background element */}
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-gold-500/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-sunset-400 text-[10px] tracking-[0.4em] uppercase font-black">
            Nuestra Gastronomía
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white mt-6 mb-8 lg:px-20 leading-[1.1]">
            Platos Diseñados para <span className="text-gradient-gold italic">Enamorar</span>
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-sunset-500 to-transparent mx-auto mb-8" />
          <p className="text-sand-400 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
            Cada creación es un tributo al mar. Utilizamos técnicas de vanguardia 
            con los tesoros más frescos capturados diariamente en nuestras costas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((dish, i) => (
            <motion.div
              key={dish.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="group"
            >
              <div className="glass rounded-[2rem] overflow-hidden border border-white/[0.06] hover:border-sunset-500/30 transition-all duration-700 h-full flex flex-col group/card shadow-2xl hover:shadow-sunset-500/10 hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-1000 group-hover/card:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent" />
                  
                  <div className="absolute top-5 left-5 flex flex-wrap gap-2">
                    {dish.tags.map((tag) => (
                      <div key={tag} className="px-3 py-1 bg-navy-950/60 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-white">
                        {tag}
                      </div>
                    ))}
                  </div>

                  <div className="absolute bottom-5 right-5 flex gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={10} className="text-gold-400 fill-gold-400" />
                    ))}
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="font-serif text-2xl text-white mb-3 group-hover/card:text-sunset-400 transition-colors">
                    {dish.name}
                  </h3>
                  <p className="text-sand-500 text-sm leading-relaxed mb-8 line-clamp-3">
                    {dish.description}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <span className="text-xs text-sand-600 block mb-0.5 uppercase font-bold tracking-tighter">Inversión</span>
                      <span className="text-2xl font-black text-white">
                        {formatPrice(dish.price)}
                      </span>
                    </div>
                    <button className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white group-hover/card:bg-sunset-500 group-hover/card:border-sunset-500 transition-all duration-500">
                      <ArrowRight size={20} className="group-hover/card:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <Link
            href="/menu"
            className="inline-flex items-center gap-4 px-10 py-5 bg-navy-900 border border-white/[0.08] text-white hover:border-sunset-500/50 rounded-2xl font-black uppercase tracking-[0.15em] text-xs transition-all hover:shadow-2xl hover:shadow-sunset-500/10 group"
          >
            Explorar Menú Completo
            <div className="w-8 h-8 rounded-full bg-sunset-500/10 flex items-center justify-center text-sunset-400 group-hover:bg-sunset-500 group-hover:text-white transition-all">
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
