"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/landing/Footer";
import Button from "@/components/ui/Button";
import { useReservationStore, PaymentMethod } from "@/store/reservationStore";
import {
  CreditCard,
  Smartphone,
  Building,
  Upload,
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  Users,
  MapPin,
  Sparkles,
  FileImage,
  X,
  ArrowLeft,
  Loader2,
} from "lucide-react";

const paymentMethods: { id: PaymentMethod; name: string; icon: React.ElementType; description: string }[] = [
  { id: "tarjeta", name: "Tarjeta", icon: CreditCard, description: "Débito o crédito" },
  { id: "zelle", name: "Zelle", icon: Building, description: "baltico@email.com" },
  { id: "pago-movil", name: "Pago Móvil", icon: Smartphone, description: "0412-1234567 / CI: V-12345678" },
  { id: "transferencia", name: "Transferencia", icon: Building, description: "Banco: Venezuela / Cuenta: 0102-1234-56-789" },
];

type PaymentStatus = "idle" | "uploading" | "verifying" | "approved" | "error";

export default function CheckoutPage() {
  const router = useRouter();
  const store = useReservationStore();
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onloadend = () => {
        store.setProofOfPayment(file, reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    [store],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFileUpload(file);
    },
    [handleFileUpload],
  );

  const handleSubmitPayment = async () => {
    setPaymentStatus("uploading");
    await new Promise((r) => setTimeout(r, 1500));
    setPaymentStatus("verifying");
    await new Promise((r) => setTimeout(r, 3000));
    setPaymentStatus("approved");
  };

  const areaLabels: Record<string, string> = {
    terraza: "Terraza Vista al Mar",
    churuata: "Churuata Principal",
    bar: "Zona de Bar",
  };

  if (!store.reservationId) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center pt-20">
          <div className="text-center space-y-4">
            <AlertCircle size={48} className="text-sand-500 mx-auto" />
            <p className="text-sand-400">No hay una reserva en proceso</p>
            <Button onClick={() => router.push("/reservar")}>
              Ir a Reservar
            </Button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="font-serif text-4xl sm:text-5xl text-white mb-3">
              Confirmar Reserva
            </h1>
            <p className="text-sand-400">
              Código de reserva:{" "}
              <span className="text-sunset-400 font-mono font-bold">
                {store.reservationId}
              </span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass rounded-2xl p-6 space-y-4"
              >
                <h3 className="font-serif text-lg text-white">
                  Resumen de Reserva
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-sand-300">
                    <Calendar size={16} className="text-sunset-400 flex-shrink-0" />
                    <span>
                      {store.date} a las {store.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sand-300">
                    <Users size={16} className="text-sunset-400 flex-shrink-0" />
                    <span>{store.guests} personas</span>
                  </div>
                  <div className="flex items-center gap-3 text-sand-300">
                    <MapPin size={16} className="text-sunset-400 flex-shrink-0" />
                    <span>
                      {store.area ? areaLabels[store.area] : "Sin área"} — Mesa {store.selectedTable}
                    </span>
                  </div>
                </div>

                {store.rouletteReward && (
                  <div className="glass-gold rounded-xl p-3 flex items-center gap-2">
                    <Sparkles size={16} className="text-gold-400 flex-shrink-0" />
                    <div>
                      <p className="text-gold-300 text-xs font-semibold">
                        Premio
                      </p>
                      <p className="text-white text-sm">
                        {store.rouletteReward}
                      </p>
                    </div>
                  </div>
                )}

                <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-sand-300">
                    <span>Reserva de mesa</span>
                    <span className="text-white font-semibold">$10.00</span>
                  </div>
                  <div className="flex justify-between text-sand-300">
                    <span>IVA (16%)</span>
                    <span className="text-white font-semibold">$1.60</span>
                  </div>
                  <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-white/10">
                    <span>Total</span>
                    <span className="text-gradient-gold">$11.60</span>
                  </div>
                  <p className="text-[10px] text-sand-500">
                    Este monto se descuenta de tu consumo final
                  </p>
                </div>
              </motion.div>

              <Button
                variant="ghost"
                onClick={() => router.push("/reservar")}
                className="w-full"
              >
                <ArrowLeft size={16} /> Modificar Reserva
              </Button>
            </div>

            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {paymentStatus === "approved" ? (
                  <motion.div
                    key="approved"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass rounded-2xl p-8 text-center space-y-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    >
                      <CheckCircle2 size={80} className="text-green-400 mx-auto" />
                    </motion.div>
                    <h3 className="font-serif text-2xl text-white">
                      ¡Pago Aprobado!
                    </h3>
                    <p className="text-sand-300 text-sm max-w-sm mx-auto">
                      Tu reserva ha sido confirmada. Te enviaremos un mensaje de
                      WhatsApp con los detalles. ¡Te esperamos en Báltico!
                    </p>
                    <div className="glass-gold rounded-xl p-4 max-w-sm mx-auto">
                      <p className="text-gold-300 text-sm">
                        &quot;¡Hola! Tu pago ha sido verificado y tu mesa en Báltico
                        está lista. ¡Te esperamos para disfrutar del
                        atardecer!&quot;
                      </p>
                    </div>
                    <Button onClick={() => { store.reset(); router.push("/"); }}>
                      Volver al Inicio
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass rounded-2xl p-6 sm:p-8 space-y-6"
                  >
                    <h3 className="font-serif text-lg text-white">
                      Método de Pago
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                      {paymentMethods.map((method) => (
                        <button
                          key={method.id}
                          onClick={() => store.setPaymentMethod(method.id)}
                          className={`p-4 rounded-xl text-left transition-all ${
                            store.paymentMethod === method.id
                              ? "bg-sunset-500/10 border-2 border-sunset-500/50"
                              : "bg-navy-800/80 border border-white/10 hover:border-white/20"
                          }`}
                        >
                          <method.icon
                            size={20}
                            className={
                              store.paymentMethod === method.id
                                ? "text-sunset-400"
                                : "text-sand-400"
                            }
                          />
                          <h4 className="text-white text-sm font-semibold mt-2">
                            {method.name}
                          </h4>
                          <p className="text-sand-500 text-[10px] mt-0.5">
                            {method.description}
                          </p>
                        </button>
                      ))}
                    </div>

                    {store.paymentMethod && store.paymentMethod !== "tarjeta" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-3"
                      >
                        <p className="text-sand-300 text-sm">
                          Sube el capture de tu pago
                        </p>
                        <div
                          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                          onDragLeave={() => setIsDragging(false)}
                          onDrop={handleDrop}
                          className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
                            isDragging
                              ? "border-sunset-500 bg-sunset-500/10"
                              : store.proofPreview
                                ? "border-green-500/50 bg-green-500/5"
                                : "border-white/20 hover:border-white/30 bg-navy-800/40"
                          }`}
                        >
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(file);
                            }}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                          {store.proofPreview ? (
                            <div className="space-y-3">
                              <div className="relative w-48 h-32 mx-auto rounded-lg overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={store.proofPreview}
                                  alt="Comprobante"
                                  className="w-full h-full object-cover"
                                />
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    store.setProofOfPayment(null, null);
                                  }}
                                  className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500/80 flex items-center justify-center"
                                >
                                  <X size={12} className="text-white" />
                                </button>
                              </div>
                              <p className="text-green-400 text-sm flex items-center justify-center gap-1">
                                <CheckCircle2 size={14} />
                                Comprobante cargado
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <div className="w-16 h-16 rounded-full bg-navy-700/80 flex items-center justify-center mx-auto">
                                {isDragging ? (
                                  <FileImage size={28} className="text-sunset-400" />
                                ) : (
                                  <Upload size={28} className="text-sand-400" />
                                )}
                              </div>
                              <div>
                                <p className="text-white text-sm font-medium">
                                  Sube aquí el capture de tu pago
                                </p>
                                <p className="text-sand-500 text-xs mt-1">
                                  Arrastra y suelta o haz clic para seleccionar
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {paymentStatus === "verifying" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-center gap-3 py-4"
                      >
                        <Loader2 size={20} className="text-sunset-400 animate-spin" />
                        <span className="text-sand-300 text-sm">
                          Verificando pago...
                        </span>
                      </motion.div>
                    )}

                    {paymentStatus === "uploading" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-center gap-3 py-4"
                      >
                        <Clock size={20} className="text-sunset-400 animate-spin" />
                        <span className="text-sand-300 text-sm">
                          Subiendo comprobante...
                        </span>
                      </motion.div>
                    )}

                    <Button
                      onClick={handleSubmitPayment}
                      size="lg"
                      className="w-full"
                      disabled={
                        !store.paymentMethod ||
                        (store.paymentMethod !== "tarjeta" && !store.proofPreview) ||
                        paymentStatus === "uploading" ||
                        paymentStatus === "verifying"
                      }
                      isLoading={
                        paymentStatus === "uploading" || paymentStatus === "verifying"
                      }
                    >
                      {paymentStatus === "idle" ? "Confirmar Pago — $11.60" : "Procesando..."}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
