"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";

const prizes = [
  { label: "Entrada Fría de Cortesía", color: "#f97316", icon: "🥗" },
  { label: "10% Descuento", color: "#22d3ee", icon: "💰" },
  { label: "Tobo de Cerveza Zulia", color: "#fbbf24", icon: "🍺" },
  { label: "Trago de Cortesía", color: "#a855f7", icon: "🍹" },
  { label: "Postre Gratis", color: "#ec4899", icon: "🍰" },
  { label: "Copa de Vino", color: "#10b981", icon: "🍷" },
  { label: "Sigue Participando", color: "#6366f1", icon: "🎯" },
  { label: "Ceviche de Cortesía", color: "#ef4444", icon: "🐟" },
];

interface Props {
  onRewardWon: (reward: string) => void;
}

export default function RouletteWheel({ onRewardWon }: Props) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [hasSpun, setHasSpun] = useState(false);

  const segmentAngle = 360 / prizes.length;

  const spin = useCallback(() => {
    if (isSpinning || hasSpun) return;
    setIsSpinning(true);
    setResult(null);

    const winningIndex = Math.floor(Math.random() * prizes.length);
    const spins = 5 + Math.random() * 3;
    const targetAngle = spins * 360 + (360 - winningIndex * segmentAngle - segmentAngle / 2);

    setRotation(targetAngle);

    setTimeout(() => {
      setIsSpinning(false);
      setResult(prizes[winningIndex].label);
      setHasSpun(true);
      onRewardWon(prizes[winningIndex].label);
    }, 4500);
  }, [isSpinning, hasSpun, onRewardWon, segmentAngle]);

  return (
    <div className="text-center space-y-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-2"
      >
        <div className="flex items-center justify-center gap-2 text-gold-400">
          <Sparkles size={20} />
          <h3 className="font-serif text-2xl text-white">Ruleta Digital Báltico</h3>
          <Sparkles size={20} />
        </div>
        <p className="text-sand-400 text-sm">
          ¡Gira la ruleta por reservar online y gana premios!
        </p>
      </motion.div>

      <div className="relative inline-block">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 text-3xl">
          ▼
        </div>

        <div className="relative w-72 h-72 sm:w-80 sm:h-80 mx-auto">
          <motion.div
            animate={{ rotate: rotation }}
            transition={{ duration: 4.5, ease: [0.17, 0.67, 0.12, 0.99] }}
            className="w-full h-full rounded-full border-4 border-gold-500/30 shadow-2xl shadow-gold-500/10 overflow-hidden relative"
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {prizes.map((prize, i) => {
                const startAngle = (i * segmentAngle * Math.PI) / 180;
                const endAngle = ((i + 1) * segmentAngle * Math.PI) / 180;
                const x1 = 100 + 100 * Math.cos(startAngle);
                const y1 = 100 + 100 * Math.sin(startAngle);
                const x2 = 100 + 100 * Math.cos(endAngle);
                const y2 = 100 + 100 * Math.sin(endAngle);
                const largeArc = segmentAngle > 180 ? 1 : 0;

                const midAngle = ((i + 0.5) * segmentAngle * Math.PI) / 180;
                const textX = 100 + 60 * Math.cos(midAngle);
                const textY = 100 + 60 * Math.sin(midAngle);
                const textRotation = (i + 0.5) * segmentAngle;

                return (
                  <g key={i}>
                    <path
                      d={`M100,100 L${x1},${y1} A100,100 0 ${largeArc},1 ${x2},${y2} Z`}
                      fill={prize.color}
                      opacity={0.85}
                      stroke="rgba(0,0,0,0.2)"
                      strokeWidth="0.5"
                    />
                    <text
                      x={textX}
                      y={textY}
                      fill="white"
                      fontSize="5.5"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${textRotation}, ${textX}, ${textY})`}
                    >
                      {prize.icon}
                    </text>
                  </g>
                );
              })}
            </svg>
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-navy-900 border-4 border-gold-500/50 flex items-center justify-center shadow-xl">
              <Gift size={24} className="text-gold-400" />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {result ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-3"
          >
            <div className="glass-gold rounded-2xl p-6 max-w-sm mx-auto">
              <p className="text-gold-300 text-sm mb-1">¡Felicitaciones!</p>
              <p className="text-white font-serif text-xl">{result}</p>
              <p className="text-sand-400 text-xs mt-2">
                Se aplicará automáticamente a tu reserva
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="button">
            <Button
              onClick={spin}
              size="lg"
              disabled={isSpinning}
              isLoading={isSpinning}
              className="animate-pulse-glow"
            >
              {isSpinning ? "Girando..." : "¡Gira la Ruleta!"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
