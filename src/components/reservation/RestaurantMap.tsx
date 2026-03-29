"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { AreaType } from "@/store/reservationStore";

interface Table {
  id: number;
  x: number;
  y: number;
  seats: number;
  area: AreaType;
  occupied: boolean;
}

const tables: Table[] = [
  // Terraza
  { id: 1, x: 15, y: 20, seats: 2, area: "terraza", occupied: false },
  { id: 2, x: 30, y: 20, seats: 2, area: "terraza", occupied: true },
  { id: 3, x: 15, y: 38, seats: 4, area: "terraza", occupied: false },
  { id: 4, x: 30, y: 38, seats: 4, area: "terraza", occupied: false },
  { id: 5, x: 22, y: 55, seats: 6, area: "terraza", occupied: true },
  // Churuata
  { id: 6, x: 55, y: 20, seats: 4, area: "churuata", occupied: false },
  { id: 7, x: 70, y: 20, seats: 4, area: "churuata", occupied: false },
  { id: 8, x: 55, y: 38, seats: 6, area: "churuata", occupied: true },
  { id: 9, x: 70, y: 38, seats: 2, area: "churuata", occupied: false },
  { id: 10, x: 62, y: 55, seats: 8, area: "churuata", occupied: false },
  // Bar
  { id: 11, x: 50, y: 75, seats: 2, area: "bar", occupied: false },
  { id: 12, x: 62, y: 75, seats: 2, area: "bar", occupied: true },
  { id: 13, x: 74, y: 75, seats: 2, area: "bar", occupied: false },
  { id: 14, x: 86, y: 75, seats: 4, area: "bar", occupied: false },
];

interface Props {
  selectedArea: AreaType | null;
  selectedTable: number | null;
  onSelectTable: (id: number) => void;
  guests: number;
}

export default function RestaurantMap({ selectedArea, selectedTable, onSelectTable, guests }: Props) {
  const areaLabels: Record<AreaType, { label: string; color: string }> = {
    terraza: { label: "Terraza Vista al Mar", color: "bg-sea-500" },
    churuata: { label: "Churuata Principal", color: "bg-sunset-500" },
    bar: { label: "Zona de Bar", color: "bg-gold-500" },
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 text-xs">
        {Object.entries(areaLabels).map(([key, val]) => (
          <div key={key} className="flex items-center gap-2">
            <div className={cn("w-3 h-3 rounded-full", val.color)} />
            <span className="text-sand-300">{val.label}</span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50 border border-red-500" />
          <span className="text-sand-300">Ocupada</span>
        </div>
      </div>

      <div className="relative w-full aspect-[16/10] glass rounded-2xl overflow-hidden p-4">
        <div className="absolute top-2 left-0 right-0 flex justify-center">
          <div className="px-4 py-1.5 bg-sea-500/20 rounded-full text-[10px] text-sea-400 border border-sea-500/20">
            ~ ~ ~ Vista al Mar ~ ~ ~
          </div>
        </div>

        <div className="absolute left-[5%] top-[12%] w-[40%] h-[55%] rounded-xl border border-sea-500/20 border-dashed" />
        <div className="absolute left-[5%] top-[12%] px-2 py-0.5 text-[9px] text-sea-400 bg-navy-900/80 rounded">
          Terraza
        </div>

        <div className="absolute left-[48%] top-[12%] w-[40%] h-[55%] rounded-xl border border-sunset-500/20 border-dashed" />
        <div className="absolute left-[48%] top-[12%] px-2 py-0.5 text-[9px] text-sunset-400 bg-navy-900/80 rounded">
          Churuata
        </div>

        <div className="absolute left-[40%] top-[68%] w-[52%] h-[25%] rounded-xl border border-gold-500/20 border-dashed" />
        <div className="absolute left-[40%] top-[68%] px-2 py-0.5 text-[9px] text-gold-400 bg-navy-900/80 rounded">
          Bar
        </div>

        {tables.map((table) => {
          const isSelected = selectedTable === table.id;
          const isFiltered = selectedArea && table.area !== selectedArea;
          const canFit = table.seats >= guests;
          const isAvailable = !table.occupied && canFit && !isFiltered;

          return (
            <motion.button
              key={table.id}
              whileHover={isAvailable ? { scale: 1.2 } : {}}
              whileTap={isAvailable ? { scale: 0.9 } : {}}
              onClick={() => isAvailable && onSelectTable(table.id)}
              className={cn(
                "absolute flex items-center justify-center rounded-lg text-[10px] font-bold transition-all duration-300",
                table.seats <= 2 ? "w-8 h-8" : table.seats <= 4 ? "w-10 h-10" : table.seats <= 6 ? "w-12 h-10" : "w-14 h-10",
                table.occupied
                  ? "bg-red-500/20 border border-red-500/40 text-red-400 cursor-not-allowed"
                  : isFiltered
                    ? "bg-navy-800/50 border border-white/5 text-sand-600 opacity-30 cursor-not-allowed"
                    : !canFit
                      ? "bg-navy-800/50 border border-white/10 text-sand-500 cursor-not-allowed"
                      : isSelected
                        ? "bg-sunset-500 border-2 border-sunset-400 text-white shadow-lg shadow-sunset-500/40 ring-4 ring-sunset-500/20"
                        : "bg-navy-700/80 border border-white/15 text-sand-200 hover:border-sunset-500/50 hover:bg-navy-600/80 cursor-pointer",
              )}
              style={{
                left: `${table.x}%`,
                top: `${table.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              disabled={!isAvailable}
            >
              {table.seats}
            </motion.button>
          );
        })}
      </div>

      {selectedTable && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-sm text-sunset-400"
        >
          Mesa {selectedTable} seleccionada ({tables.find(t => t.id === selectedTable)?.seats} personas)
        </motion.div>
      )}
    </div>
  );
}
