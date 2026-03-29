"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Flame, Users, Wine, ArrowRight } from "lucide-react";

const promos = [
  {
    icon: Users,
    title: "Combo Familiar",
    subtitle: "Para 4 personas",
    description: "Pargo frito + Mixto de Camarones y Calamares + Tostones Playeros + Sangría de la casa",
    price: 115.55,
    highlight: "$28.89 por persona",
    gradient: "from-sea-500/20 to-navy-800/40",
    border: "border-sea-500/20",
  },
  {
    icon: Wine,
    title: "Paella Para Dos",
    subtitle: "Romántico",
    description: "Paella x 2 con una botella de vino Catame. Ideal para una cita frente al mar.",
    price: 59.52,
    highlight: "$29.76 por persona",
    gradient: "from-sunset-500/20 to-navy-800/40",
    border: "border-sunset-500/20",
  },
  {
    icon: Flame,
    title: "Promo Romeo",
    subtitle: "Para 5 personas",
    description: "Arroz Marinera, Paella, Asopado o Fideguá + Botella de vino Romeo",
    price: 123.57,
    highlight: "$24.71 por persona",
    gradient: "from-gold-500/20 to-navy-800/40",
    border: "border-gold-500/20",
  },
];

export default function PromoSection() {
  return (
    <section className="py-24 sm:py-32 px-5 sm:px-8 relative overflow-hidden bg-navy-950">
      {/* Decorative background gradients */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sunset-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sea-500/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-gold-500 text-[10px] tracking-[0.5em] uppercase font-black flex items-center justify-center gap-4">
             <div className="w-8 h-px bg-gold-500/30" />
             Privilegios Báltico
             <div className="w-8 h-px bg-gold-500/30" />
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white mt-6 mb-8">
            Experiencias <span className="italic text-gradient-gold">Curadas</span>
          </h2>
          <p className="text-sand-400 max-w-xl mx-auto text-lg leading-relaxed">
            Diseñamos momentos perfectos con maridajes exclusivos y selecciones 
            festivas para disfrutar con tus personas favoritas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promos.map((promo, i) => (
            <motion.div
              key={promo.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group"
            >
              <div
                className={`relative h-full rounded-[2.5rem] bg-navy-900 border border-white/[0.05] p-8 sm:p-10 hover:border-white/20 transition-all duration-500 flex flex-col overflow-hidden group/card shadow-2xl`}
              >
                {/* Subtle gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${promo.gradient} opacity-40 group-hover/card:opacity-60 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-sunset-500 group-hover/card:scale-110 transition-transform duration-500">
                      <promo.icon size={28} />
                    </div>
                    <div className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[9px] font-black uppercase tracking-[0.2em] text-sand-400">
                      {promo.subtitle}
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl text-white mb-4 leading-tight">{promo.title}</h3>
                  
                  <p className="text-sand-500 text-sm leading-relaxed mb-10 h-20 overflow-hidden line-clamp-4">
                    {promo.description}
                  </p>

                  <div className="mt-auto">
                     <div className="h-px bg-white/5 w-full mb-8" />
                     <div className="flex items-end justify-between">
                       <div>
                         <p className="text-[10px] font-black uppercase tracking-widest text-sand-600 mb-1">Precio Especial</p>
                         <p className="text-4xl font-black text-white">
                           ${promo.price.toFixed(2)}
                         </p>
                         <p className="text-[10px] text-sunset-500 font-bold uppercase mt-2 tracking-tighter">{promo.highlight}</p>
                       </div>
                       
                       <Link
                         href="/reservar"
                         className="w-12 h-12 rounded-full bg-sunset-500 flex items-center justify-center text-white shadow-xl shadow-sunset-500/20 hover:scale-110 active:scale-95 transition-all duration-300"
                       >
                         <ArrowRight size={20} />
                       </Link>
                     </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
