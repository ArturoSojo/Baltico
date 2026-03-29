"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/landing/Footer";
import Button from "@/components/ui/Button";
import RestaurantMap from "@/components/reservation/RestaurantMap";
import { useReservationStore, AreaType } from "@/store/reservationStore";
import { generateReservationId } from "@/lib/utils";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  User,
  Phone,
  Mail,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  Check,
} from "lucide-react";

const timeSlots = [
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "5:00 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
  "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM",
];

const areas: { id: AreaType; name: string; icon: string; description: string; capacity: string }[] = [
  { id: "terraza", name: "Terraza Vista al Mar", icon: "🌊", description: "Brisa marina y atardecer", capacity: "2–6 personas" },
  { id: "churuata", name: "Churuata Principal", icon: "🏝️", description: "Ambiente tropical techado", capacity: "2–8 personas" },
  { id: "bar", name: "Zona de Bar", icon: "🍸", description: "Vida nocturna y cocteles", capacity: "2–4 personas" },
];

function ReservationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const store = useReservationStore();
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const dateParam = searchParams.get("date");
    const guestsParam = searchParams.get("guests");
    const areaParam = searchParams.get("area");
    if (dateParam) store.setDate(dateParam);
    if (guestsParam) store.setGuests(parseInt(guestsParam));
    if (areaParam) store.setArea(areaParam as AreaType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const canProceedStep1 = store.date && store.time && store.area;
  const canProceedStep2 = store.selectedTable !== null;
  const canProceedStep3 = store.name && store.phone && store.email;

  const handleNextStep = () => {
    if (currentStep === 3) {
      const id = generateReservationId();
      store.setReservationId(id);
      router.push("/checkout");
      return;
    }
    setCurrentStep((s) => Math.min(s + 1, 3));
  };

  const steps = [
    { num: 1, label: "Fecha y Área" },
    { num: 2, label: "Seleccionar Mesa" },
    { num: 3, label: "Tus Datos" },
  ];

  const areaLabels: Record<string, string> = {
    terraza: "Terraza Vista al Mar",
    churuata: "Churuata Principal",
    bar: "Zona de Bar",
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <section className="flex-1 pt-36 sm:pt-44 pb-28 sm:pb-36 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-14 sm:mb-16"
          >
            <span className="text-sunset-400 text-xs tracking-[0.25em] uppercase font-medium">
              Reservaciones
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white mt-3 mb-4">
              Reserva tu Experiencia
            </h1>
            <div className="w-16 h-0.5 bg-gradient-to-r from-sunset-500 to-gold-500 mx-auto mb-5" />
            <p className="text-sand-400 text-base max-w-md mx-auto">
              Selecciona tu fecha, elige tu mesa y prepárate para disfrutar
            </p>
          </motion.div>

          {/* Stepper */}
          <div className="flex items-center justify-center mb-16 px-4">
            {steps.map((step, i) => (
              <div key={step.num} className="flex items-center">
                <div className="flex flex-col items-center gap-2 group">
                  <button
                    onClick={() => { if (step.num < currentStep) setCurrentStep(step.num); }}
                    className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                      currentStep === step.num
                        ? "bg-sunset-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.4)] scale-110"
                        : currentStep > step.num
                          ? "bg-green-500/10 border border-green-500/30 text-green-500 cursor-pointer hover:bg-green-500/20"
                          : "bg-navy-800/60 border border-white/[0.08] text-sand-600"
                    }`}
                  >
                    {currentStep > step.num ? <Check size={18} /> : 
                      <span className="text-base font-bold">{step.num}</span>
                    }
                    {currentStep === step.num && (
                      <span className="absolute -inset-1 rounded-[1.2rem] border border-sunset-500/30 animate-pulse" />
                    )}
                  </button>
                  <span className={`text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-300 ${
                    currentStep >= step.num ? "text-sand-200" : "text-sand-600"
                  }`}>
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-12 sm:w-24 h-px mx-2 sm:mx-6 mb-4">
                    <div className={`h-full transition-all duration-700 ${
                      currentStep > step.num ? "bg-gradient-to-r from-green-500/40 to-navy-800/40" : "bg-white/[0.06]"
                    }`} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="glass overflow-hidden rounded-[2.5rem] border border-white/[0.06]">
                  <div className="p-8 sm:p-12 lg:p-14">
                    {/* Date & Guests */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 mb-14">
                      <div className="space-y-4">
                        <label className="flex items-center gap-3 text-sm text-sand-300 font-bold uppercase tracking-wider">
                          <Calendar size={16} className="text-sunset-400" />
                          Fecha de reserva
                        </label>
                        <div className="relative group">
                          <input
                            type="date"
                            value={store.date}
                            onChange={(e) => store.setDate(e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full px-6 py-5 bg-navy-800/40 border border-white/[0.08] rounded-2xl text-white focus:border-sunset-500/50 focus:outline-none focus:ring-4 focus:ring-sunset-500/10 transition-all text-lg font-medium appearance-none"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                             <Calendar size={20} />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="flex items-center gap-3 text-sm text-sand-300 font-bold uppercase tracking-wider">
                          <Users size={16} className="text-sunset-400" />
                          Número de personas
                        </label>
                        <div className="flex items-center gap-8 bg-navy-800/40 border border-white/[0.08] rounded-2xl px-6 py-4">
                          <button
                            onClick={() => store.setGuests(Math.max(1, store.guests - 1))}
                            className="w-12 h-12 rounded-xl bg-navy-700/60 border border-white/10 text-white text-2xl hover:border-sunset-500/40 hover:bg-navy-600/60 transition-all flex items-center justify-center active:scale-90"
                          >
                            −
                          </button>
                          <div className="flex-1 text-center">
                            <span className="text-4xl font-serif font-black text-white">{store.guests}</span>
                            <span className="text-sand-500 text-sm ml-3 uppercase tracking-tighter">Personas</span>
                          </div>
                          <button
                            onClick={() => store.setGuests(Math.min(12, store.guests + 1))}
                            className="w-12 h-12 rounded-xl bg-navy-700/60 border border-white/10 text-white text-2xl hover:border-sunset-500/40 hover:bg-navy-600/60 transition-all flex items-center justify-center active:scale-90"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Divider with subtle label */}
                    <div className="relative mb-14">
                      <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-white/[0.04]"></div>
                      </div>
                      <div className="relative flex justify-center">
                        <span className="px-4 bg-navy-900 text-[10px] font-bold uppercase tracking-[0.3em] text-sand-600">
                          Horarios Disponibles
                        </span>
                      </div>
                    </div>

                    {/* Time Slots */}
                    <div className="mb-14">
                      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => store.setTime(slot)}
                            className={`px-3 py-4 rounded-xl text-sm font-bold transition-all duration-300 ${
                              store.time === slot
                                ? "bg-sunset-500 text-white shadow-[0_10px_20px_-5px_rgba(249,115,22,0.4)] scale-105 z-10"
                                : "bg-navy-800/30 text-sand-400 border border-white/[0.04] hover:border-white/20 hover:text-sand-100 hover:bg-navy-800/80"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="relative mb-14">
                      <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-white/[0.04]"></div>
                      </div>
                      <div className="relative flex justify-center">
                        <span className="px-4 bg-navy-900 text-[10px] font-bold uppercase tracking-[0.3em] text-sand-600">
                          Elige tu Ambiente
                        </span>
                      </div>
                    </div>

                    {/* Area Selection */}
                    <div className="mb-14">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {areas.map((a) => (
                          <button
                            key={a.id}
                            onClick={() => store.setArea(a.id)}
                            className={`group p-8 rounded-[2rem] text-left transition-all duration-500 relative overflow-hidden ${
                              store.area === a.id
                                ? "bg-sunset-500/10 border-2 border-sunset-500/40 shadow-2xl shadow-sunset-500/10"
                                : "bg-navy-800/30 border border-white/[0.04] hover:border-white/10 hover:bg-navy-800/60"
                            }`}
                          >
                            {store.area === a.id && (
                              <div className="absolute top-0 right-0 p-4">
                                <div className="w-6 h-6 rounded-full bg-sunset-500 flex items-center justify-center">
                                  <Check size={12} className="text-white" />
                                </div>
                              </div>
                            )}
                            <span className="text-5xl mb-6 block transform transition-transform group-hover:scale-110 group-active:scale-95 duration-500">{a.icon}</span>
                            <h4 className="text-white font-serif text-xl mb-2">{a.name}</h4>
                            <p className="text-sand-500 text-sm mb-4 leading-relaxed">{a.description}</p>
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
                              <span className="text-[10px] text-sand-500 font-bold uppercase tracking-wider">
                                {a.capacity}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex justify-end pt-4">
                      <Button onClick={handleNextStep} disabled={!canProceedStep1} size="lg" className="px-12 py-7 h-auto rounded-2xl shadow-xl shadow-sunset-500/20 group">
                        Siguiente Paso <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="glass rounded-3xl p-8 sm:p-12 lg:p-14">
                  <div className="text-center mb-10">
                    <h3 className="font-serif text-2xl sm:text-3xl text-white mb-3">
                      Selecciona tu Mesa
                    </h3>
                    <p className="text-sand-400 text-sm max-w-md mx-auto">
                      Los números indican la capacidad. Las mesas en rojo están ocupadas.
                    </p>
                  </div>

                  <div className="mb-10">
                    <RestaurantMap
                      selectedArea={store.area}
                      selectedTable={store.selectedTable}
                      onSelectTable={(id) => store.setSelectedTable(id)}
                      guests={store.guests}
                    />
                  </div>

                  <div className="flex justify-between">
                    <Button variant="ghost" onClick={() => setCurrentStep(1)} size="lg">
                      <ArrowLeft size={18} /> Atrás
                    </Button>
                    <Button onClick={handleNextStep} disabled={!canProceedStep2} size="lg" className="px-10">
                      Confirmar Mesa <ArrowRight size={18} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="glass rounded-3xl p-8 sm:p-12 lg:p-14">
                  <div className="text-center mb-10">
                    <h3 className="font-serif text-2xl sm:text-3xl text-white mb-3">
                      Completa tus Datos
                    </h3>
                    <p className="text-sand-400 text-sm max-w-md mx-auto">
                      Necesitamos esta información para confirmar tu reserva
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                    <div className="space-y-2.5">
                      <label className="flex items-center gap-2 text-sm text-sand-200 font-medium">
                        <User size={14} className="text-sunset-400" /> Nombre completo
                      </label>
                      <input
                        type="text"
                        value={store.name}
                        onChange={(e) => store.setName(e.target.value)}
                        placeholder="Tu nombre completo"
                        className="w-full px-5 py-4 bg-navy-800/50 border border-white/[0.08] rounded-2xl text-white focus:border-sunset-500 focus:outline-none focus:ring-2 focus:ring-sunset-500/20 transition-all placeholder:text-sand-600"
                      />
                    </div>
                    <div className="space-y-2.5">
                      <label className="flex items-center gap-2 text-sm text-sand-200 font-medium">
                        <Phone size={14} className="text-sunset-400" /> Teléfono / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={store.phone}
                        onChange={(e) => store.setPhone(e.target.value)}
                        placeholder="+58 412 1234567"
                        className="w-full px-5 py-4 bg-navy-800/50 border border-white/[0.08] rounded-2xl text-white focus:border-sunset-500 focus:outline-none focus:ring-2 focus:ring-sunset-500/20 transition-all placeholder:text-sand-600"
                      />
                    </div>
                    <div className="space-y-2.5">
                      <label className="flex items-center gap-2 text-sm text-sand-200 font-medium">
                        <Mail size={14} className="text-sunset-400" /> Email
                      </label>
                      <input
                        type="email"
                        value={store.email}
                        onChange={(e) => store.setEmail(e.target.value)}
                        placeholder="tu@email.com"
                        className="w-full px-5 py-4 bg-navy-800/50 border border-white/[0.08] rounded-2xl text-white focus:border-sunset-500 focus:outline-none focus:ring-2 focus:ring-sunset-500/20 transition-all placeholder:text-sand-600"
                      />
                    </div>
                    <div className="space-y-2.5">
                      <label className="flex items-center gap-2 text-sm text-sand-200 font-medium">
                        <MessageSquare size={14} className="text-sunset-400" /> Peticiones especiales
                      </label>
                      <input
                        type="text"
                        value={store.specialRequests}
                        onChange={(e) => store.setSpecialRequests(e.target.value)}
                        placeholder="Cumpleaños, alergias, etc."
                        className="w-full px-5 py-4 bg-navy-800/50 border border-white/[0.08] rounded-2xl text-white focus:border-sunset-500 focus:outline-none focus:ring-2 focus:ring-sunset-500/20 transition-all placeholder:text-sand-600"
                      />
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-8" />

                  {/* Reservation Summary - Ticket Style */}
                  <div className="relative mb-12 mt-16">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1 bg-navy-900 border border-white/[0.1] rounded-full z-10 text-[10px] uppercase tracking-[0.4em] font-black text-sunset-500 shimmer">
                      Voucher Digital
                    </div>
                    
                    <div className="bg-navy-800/80 backdrop-blur-md rounded-[2.5rem] border border-white/[0.1] overflow-hidden shadow-2xl">
                      <div className="bg-gradient-to-r from-sunset-600/20 to-gold-600/20 px-8 py-6 border-b border-white/[0.06] flex items-center justify-between">
                         <h4 className="text-white font-serif text-xl">Baltico Ocean Club</h4>
                         <div className="flex gap-1">
                           {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-1 rounded-full bg-sunset-500" />)}
                         </div>
                      </div>

                      <div className="p-8 sm:p-10">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-12">
                          <div className="space-y-1.5">
                            <p className="text-sand-600 text-[10px] font-black uppercase tracking-widest">Fecha Evento</p>
                            <div className="flex items-center gap-2 text-white">
                              <Calendar size={14} className="text-sunset-500" />
                              <span className="font-bold text-lg">{store.date || "Pendiente"}</span>
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <p className="text-sand-600 text-[10px] font-black uppercase tracking-widest">Hora Citación</p>
                            <div className="flex items-center gap-2 text-white">
                              <Clock size={14} className="text-sunset-500" />
                              <span className="font-bold text-lg">{store.time || "Pendiente"}</span>
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <p className="text-sand-600 text-[10px] font-black uppercase tracking-widest">Invitados</p>
                            <div className="flex items-center gap-2 text-white">
                              <Users size={14} className="text-sunset-500" />
                              <span className="font-bold text-lg">{store.guests} PAX</span>
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <p className="text-sand-600 text-[10px] font-black uppercase tracking-widest">Ubicación</p>
                            <div className="flex items-center gap-2 text-white">
                              <MapPin size={14} className="text-sunset-500" />
                              <span className="font-bold text-lg truncate">
                                {store.area ? areaLabels[store.area] : "Pendiente"}{store.selectedTable ? ` - T#${store.selectedTable}` : ""}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Scalloped edge visual */}
                        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between px-0 opacity-20 pointer-events-none">
                           <div className="w-6 h-6 rounded-full bg-navy-950 -ml-3 border border-white/10" />
                           <div className="w-6 h-6 rounded-full bg-navy-950 -mr-3 border border-white/10" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="ghost" onClick={() => setCurrentStep(2)} size="lg">
                      <ArrowLeft size={18} /> Atrás
                    </Button>
                    <Button onClick={handleNextStep} disabled={!canProceedStep3} size="lg" className="px-10">
                      Continuar al Pago <ArrowRight size={18} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function ReservarPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-navy-950">
          <div className="text-sand-400">Cargando...</div>
        </div>
      }
    >
      <ReservationContent />
    </Suspense>
  );
}
