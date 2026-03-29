"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, MapPin, ArrowRight, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

const areas = [
  { id: "terraza", name: "Terraza Vista al Mar", icon: "🌊" },
  { id: "churuata", name: "Churuata Principal", icon: "🏝️" },
  { id: "bar", name: "Zona de Bar", icon: "🍸" },
];

const guestOptions = [
  { value: 2, label: "Para Dos" },
  { value: 4, label: "Familiar (4)" },
  { value: 5, label: "Grupo (5+)" },
];

export default function QuickReservation() {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [area, setArea] = useState("");

  const handleReserve = () => {
    const params = new URLSearchParams();
    if (date) params.set("date", date);
    if (guests) params.set("guests", String(guests));
    if (area) params.set("area", area);
    router.push(`/reservar?${params.toString()}`);
  };

  return (
    <section className="relative -mt-24 sm:-mt-32 z-30 px-5 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-5xl mx-auto"
      >
        <div className="glass rounded-[2.5rem] p-8 sm:p-12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] border border-white/[0.1] relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-sunset-500/10 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-end gap-8">
              <div className="flex-1 space-y-4">
                <label className="flex items-center gap-3 text-xs text-sunset-400 font-black uppercase tracking-[0.2em]">
                  <Calendar size={14} /> Fecha de Visita
                </label>
                <div className="relative group">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-6 py-4.5 bg-navy-800/40 border border-white/10 rounded-2xl text-white text-base focus:border-sunset-500/50 focus:outline-none focus:ring-4 focus:ring-sunset-500/10 transition-all font-bold appearance-none"
                  />
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <label className="flex items-center gap-3 text-xs text-sunset-400 font-black uppercase tracking-[0.2em]">
                  <Users size={14} /> Invitados
                </label>
                <div className="flex p-1.5 bg-navy-800/40 border border-white/10 rounded-2xl">
                  {guestOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setGuests(opt.value)}
                      className={`flex-1 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                        guests === opt.value
                          ? "bg-sunset-500 text-white shadow-xl shadow-sunset-500/20"
                          : "text-sand-500 hover:text-sand-200 hover:bg-white/5"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <label className="flex items-center gap-3 text-xs text-sunset-400 font-black uppercase tracking-[0.2em]">
                  <MapPin size={14} /> Preferencia
                </label>
                <div className="relative group">
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full px-6 py-4.5 bg-navy-800/40 border border-white/10 rounded-2xl text-white text-base focus:border-sunset-500/50 focus:outline-none focus:ring-4 focus:ring-sunset-500/10 transition-all font-bold appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-navy-900">Cualquier Área</option>
                    {areas.map((a) => (
                      <option key={a.id} value={a.id} className="bg-navy-900">
                        {a.icon} {a.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                    <ChevronDown size={18} />
                  </div>
                </div>
              </div>

              <div className="md:w-fit">
                <Button 
                  onClick={handleReserve} 
                  size="lg" 
                  className="w-full md:w-auto px-10 py-5 h-auto rounded-2xl shadow-2xl shadow-sunset-500/20 group text-base font-black uppercase tracking-widest"
                >
                  Confirmar <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-10 opacity-30">
               <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                 <span className="text-[10px] font-bold uppercase tracking-widest text-sand-400">Mesas Disponibles hoy</span>
               </div>
               <div className="w-px h-3 bg-white/20" />
               <div className="flex items-center gap-2">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-sand-400">Suministro Fresco del día</span>
               </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
