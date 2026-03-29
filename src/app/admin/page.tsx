"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Users,
  DollarSign,
  ChefHat,
  Bell,
  Check,
  X,
  Eye,
  ToggleLeft,
  ToggleRight,
  TrendingUp,
  Clock,
  Search,
  Menu as MenuIcon,
  LayoutDashboard,
  UtensilsCrossed,
  Receipt,
  Settings,
  LogOut,
  ChevronRight,
  Utensils,
  Waves,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Button from "@/components/ui/Button";

interface Reservation {
  id: string;
  name: string;
  guests: number;
  time: string;
  area: string;
  table: number;
  status: "pendiente" | "aprobada" | "rechazada";
  paymentProof: string;
  reward: string | null;
  amount: number;
  phone: string;
}

interface MenuItemAdmin {
  id: string;
  name: string;
  category: string;
  price: number;
  active: boolean;
}

const mockReservations: Reservation[] = [
  { id: "BAL-A3K9D2", name: "María González", guests: 4, time: "7:00 PM", area: "Terraza", table: 3, status: "pendiente", paymentProof: "/images/brindis.png", reward: null, amount: 11.60, phone: "+58 412-555-0001" },
  { id: "BAL-F7H2M1", name: "Carlos Rodríguez", guests: 2, time: "8:30 PM", area: "Bar", table: 11, status: "pendiente", paymentProof: "/images/plato-mar.png", reward: null, amount: 11.60, phone: "+58 414-555-0002" },
  { id: "BAL-P2Q8N5", name: "Ana Martínez", guests: 6, time: "9:00 PM", area: "Churuata", table: 10, status: "aprobada", paymentProof: "/images/restaurante.png", reward: null, amount: 11.60, phone: "+58 424-555-0003" },
  { id: "BAL-L9R3T7", name: "Pedro Herrera", guests: 2, time: "6:00 PM", area: "Terraza", table: 1, status: "aprobada", paymentProof: "/images/brindis.png", reward: null, amount: 11.60, phone: "+58 412-555-0004" },
  { id: "BAL-K5M8P3", name: "Luisa Fernández", guests: 5, time: "7:30 PM", area: "Churuata", table: 6, status: "pendiente", paymentProof: "/images/restaurante.png", reward: null, amount: 11.60, phone: "+58 416-555-0005" },
];

const mockMenuItems: MenuItemAdmin[] = [
  { id: "1", name: "Canoa de Mariscos", category: "Frutos del Mar", price: 35.41, active: true },
  { id: "2", name: "Salmón Báltico", category: "Pescados", price: 30.17, active: true },
  { id: "3", name: "Pulpo al Grill", category: "Frutos del Mar", price: 38.95, active: true },
  { id: "4", name: "Paella Valenciana x2", category: "Arroces", price: 44.48, active: true },
  { id: "5", name: "Ceviche Nikkei", category: "Ceviches", price: 17.91, active: false },
  { id: "6", name: "Cazuela de Mariscos", category: "Frutos del Mar", price: 35.41, active: true },
  { id: "7", name: "Filet Mignon", category: "Carnes", price: 25.87, active: true },
  { id: "8", name: "Blue Burger Premium", category: "Hamburguesas", price: 16.37, active: true },
  { id: "9", name: "Aperol Spritz", category: "Coctelería", price: 7.30, active: true },
  { id: "10", name: "Marquesa de Chocolate", category: "Postres", price: 6.34, active: false },
  { id: "11", name: "Lectura de Pargo", category: "Pescados", price: 28.09, active: true },
  { id: "12", name: "Churrasco Santa Bárbara", category: "Carnes", price: 36.51, active: true },
  { id: "13", name: "Margarita", category: "Coctelería", price: 7.30, active: true },
  { id: "14", name: "Tabla Ibérica", category: "Entradas", price: 22.22, active: true },
  { id: "15", name: "Risotto Negro de Calamar", category: "Arroces", price: 22.22, active: true },
];

type SidebarTab = "dashboard" | "reservas" | "menu" | "config";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<SidebarTab>("dashboard");
  const [reservations, setReservations] = useState(mockReservations);
  const [menuItemsState, setMenuItemsState] = useState(mockMenuItems);
  const [selectedProof, setSelectedProof] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuFilter, setMenuFilter] = useState("");

  const pendingCount = reservations.filter((r) => r.status === "pendiente").length;
  const approvedToday = reservations.filter((r) => r.status === "aprobada").length;
  const totalRevenue = reservations.filter((r) => r.status === "aprobada").reduce((sum, r) => sum + r.amount, 0);
  const activeMenuCount = menuItemsState.filter((m) => m.active).length;

  const handleApprove = (id: string) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "aprobada" as const } : r)),
    );
  };

  const handleReject = (id: string) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "rechazada" as const } : r)),
    );
  };

  const toggleMenuItem = (id: string) => {
    setMenuItemsState((prev) =>
      prev.map((m) => (m.id === id ? { ...m, active: !m.active } : m)),
    );
  };

  const filteredMenuItems = menuFilter
    ? menuItemsState.filter(
        (m) =>
          m.name.toLowerCase().includes(menuFilter.toLowerCase()) ||
          m.category.toLowerCase().includes(menuFilter.toLowerCase()),
      )
    : menuItemsState;

  const sidebarItems: { id: SidebarTab; label: string; icon: React.ElementType }[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "reservas", label: "Reservas", icon: Receipt },
    { id: "menu", label: "Gestor de Menú", icon: UtensilsCrossed },
    { id: "config", label: "Configuración", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#080c16] text-sand-100 flex">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[260px] bg-[#0c1020] border-r border-white/[0.04] flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-6 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sunset-400 to-gold-500 flex items-center justify-center shadow-lg shadow-sunset-500/20">
              <span className="text-white font-serif font-bold text-lg">B</span>
            </div>
            <div>
              <h2 className="font-serif text-base font-bold text-white">Báltico</h2>
              <p className="text-[9px] text-sand-600 tracking-[0.15em] uppercase">Panel Administrativo</p>
            </div>
          </div>
        </div>

        <div className="px-3 mb-2">
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>

        <nav className="flex-1 px-3 py-2 space-y-0.5">
          <p className="text-[9px] text-sand-600 tracking-[0.15em] uppercase px-3 pt-3 pb-2">Principal</p>
          {sidebarItems.slice(0, 2).map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] transition-all duration-200",
                activeTab === item.id
                  ? "bg-sunset-500/10 text-sunset-400 font-medium"
                  : "text-sand-400 hover:text-sand-200 hover:bg-white/[0.03]",
              )}
            >
              <item.icon size={17} />
              {item.label}
              {item.id === "reservas" && pendingCount > 0 && (
                <span className="ml-auto w-5 h-5 rounded-md bg-red-500 text-white text-[9px] flex items-center justify-center font-bold">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
          <p className="text-[9px] text-sand-600 tracking-[0.15em] uppercase px-3 pt-5 pb-2">Gestión</p>
          {sidebarItems.slice(2).map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] transition-all duration-200",
                activeTab === item.id
                  ? "bg-sunset-500/10 text-sunset-400 font-medium"
                  : "text-sand-400 hover:text-sand-200 hover:bg-white/[0.03]",
              )}
            >
              <item.icon size={17} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-3">
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-3" />
          <div className="px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-sunset-500/20 flex items-center justify-center text-sm font-bold text-sunset-400">
                G
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-sand-200 truncate">Gerente</p>
                <p className="text-[10px] text-sand-600">Administrador</p>
              </div>
            </div>
          </div>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 mt-1 rounded-xl text-[13px] text-sand-600 hover:text-red-400 hover:bg-red-500/5 transition-all">
            <LogOut size={15} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 min-h-screen flex flex-col">
        <header className="sticky top-0 z-30 bg-[#080c16]/90 backdrop-blur-2xl border-b border-white/[0.04] px-5 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden w-9 h-9 flex items-center justify-center text-sand-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              >
                <MenuIcon size={18} />
              </button>
              <div>
                <h1 className="text-lg font-semibold text-white">
                  {sidebarItems.find((s) => s.id === activeTab)?.label}
                </h1>
                <p className="text-[11px] text-sand-600">
                  {new Date().toLocaleDateString("es-VE", {
                    weekday: "long", year: "numeric", month: "long", day: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors">
                <Bell size={17} className="text-sand-400" />
                {pendingCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-[#080c16]" />
                )}
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-5 sm:p-8 space-y-8">
          {activeTab === "dashboard" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                {[
                  { label: "Reservas Hoy", value: reservations.length, sub: `${pendingCount} pendientes`, icon: CalendarDays, color: "text-sea-400", bg: "bg-sea-500/10", border: "border-sea-500/10" },
                  { label: "Mesas Disponibles", value: "9 / 14", sub: "64% disponible", icon: Utensils, color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/10" },
                  { label: "Facturación", value: `$${totalRevenue.toFixed(2)}`, sub: `${approvedToday} confirmadas`, icon: DollarSign, color: "text-gold-400", bg: "bg-gold-500/10", border: "border-gold-500/10" },
                  { label: "Menú Activo", value: `${activeMenuCount}`, sub: `de ${menuItemsState.length} platos`, icon: ChefHat, color: "text-sunset-400", bg: "bg-sunset-500/10", border: "border-sunset-500/10" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className={`rounded-2xl p-5 sm:p-6 bg-[#0e1424] border ${stat.border}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", stat.bg)}>
                        <stat.icon size={18} className={stat.color} />
                      </div>
                      <TrendingUp size={13} className="text-green-400/60" />
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</p>
                    <p className="text-[11px] text-sand-500 mt-1">{stat.label}</p>
                    <p className="text-[10px] text-sand-600 mt-0.5">{stat.sub}</p>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-[#0e1424] rounded-2xl border border-white/[0.04] p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white font-semibold flex items-center gap-2.5">
                      <Clock size={16} className="text-sunset-400" />
                      Pagos Pendientes
                    </h3>
                    <span className="text-[10px] bg-red-500/10 text-red-400 px-2.5 py-1 rounded-full font-medium">
                      {pendingCount} por verificar
                    </span>
                  </div>
                  <div className="space-y-3">
                    {reservations.filter((r) => r.status === "pendiente").map((res) => (
                      <div
                        key={res.id}
                        className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-sunset-500/15 transition-all"
                      >
                        <div
                          className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer relative group"
                          onClick={() => setSelectedProof(res.paymentProof)}
                        >
                          <Image src={res.paymentProof} alt="Comprobante" fill sizes="56px" className="object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                            <Eye size={16} className="text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="text-white text-sm font-medium truncate">{res.name}</p>
                            <span className="text-[9px] text-sand-600 font-mono bg-white/[0.03] px-1.5 py-0.5 rounded">{res.id}</span>
                          </div>
                          <p className="text-sand-500 text-xs">
                            {res.guests}p · {res.time} · {res.area} · Mesa {res.table}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleApprove(res.id)}
                            className="w-9 h-9 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center hover:bg-green-500/20 transition-colors"
                            title="Aprobar"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            onClick={() => handleReject(res.id)}
                            className="w-9 h-9 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-colors"
                            title="Rechazar"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                    {pendingCount === 0 && (
                      <div className="text-center py-10">
                        <Check size={32} className="text-green-400/40 mx-auto mb-3" />
                        <p className="text-sand-500 text-sm">No hay pagos pendientes</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-2 bg-[#0e1424] rounded-2xl border border-white/[0.04] p-6">
                  <h3 className="text-white font-semibold mb-5 flex items-center gap-2.5">
                    <CalendarDays size={16} className="text-sunset-400" />
                    Reservas de Hoy
                  </h3>
                  <div className="space-y-1.5">
                    {reservations.map((res) => (
                      <div
                        key={res.id}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.02] transition-colors"
                      >
                        <div
                          className={cn(
                            "w-2.5 h-2.5 rounded-full flex-shrink-0",
                            res.status === "aprobada" ? "bg-green-400" : res.status === "pendiente" ? "bg-yellow-400 animate-pulse" : "bg-red-400",
                          )}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sand-200 text-sm truncate">{res.name}</p>
                          <p className="text-sand-600 text-[10px]">
                            {res.time} · {res.guests}p · {res.area}
                          </p>
                        </div>
                        <span
                          className={cn(
                            "text-[9px] px-2 py-0.5 rounded-full font-medium flex-shrink-0",
                            res.status === "aprobada" ? "bg-green-500/10 text-green-400" : res.status === "pendiente" ? "bg-yellow-500/10 text-yellow-400" : "bg-red-500/10 text-red-400",
                          )}
                        >
                          {res.status.charAt(0).toUpperCase() + res.status.slice(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "reservas" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-sand-600" />
                  <input
                    type="text"
                    placeholder="Buscar por nombre o código..."
                    className="w-full pl-10 pr-4 py-3 bg-[#0e1424] border border-white/[0.06] rounded-xl text-white text-sm focus:border-sunset-500 focus:outline-none focus:ring-1 focus:ring-sunset-500/20 transition-all"
                  />
                </div>
                <div className="flex gap-2">
                  {["Todas", "Pendientes", "Aprobadas"].map((f) => (
                    <button key={f} className="px-4 py-2 text-xs rounded-lg bg-white/[0.03] text-sand-400 border border-white/[0.06] hover:text-sand-200 hover:border-white/10 transition-colors">
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#0e1424] rounded-2xl border border-white/[0.04] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/[0.04]">
                        {["Código", "Cliente", "Hora", "Mesa", "Estado", "Acciones"].map((h) => (
                          <th key={h} className="text-left p-4 text-sand-600 font-medium text-[11px] uppercase tracking-wider">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {reservations.map((res) => (
                        <tr key={res.id} className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors">
                          <td className="p-4 font-mono text-xs text-sand-400">{res.id}</td>
                          <td className="p-4">
                            <p className="text-white text-sm">{res.name}</p>
                            <p className="text-sand-600 text-[11px]">{res.guests} personas · {res.phone}</p>
                          </td>
                          <td className="p-4 text-sand-300 text-sm">{res.time}</td>
                          <td className="p-4 text-sand-300 text-sm">{res.area} #{res.table}</td>
                          <td className="p-4">
                            <span
                              className={cn(
                                "text-[10px] px-2.5 py-1 rounded-full font-medium",
                                res.status === "aprobada" ? "bg-green-500/10 text-green-400" : res.status === "pendiente" ? "bg-yellow-500/10 text-yellow-400" : "bg-red-500/10 text-red-400",
                              )}
                            >
                              {res.status.charAt(0).toUpperCase() + res.status.slice(1)}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => setSelectedProof(res.paymentProof)}
                                className="w-8 h-8 rounded-lg bg-white/[0.03] text-sand-400 flex items-center justify-center hover:text-white hover:bg-white/[0.06] transition-colors"
                                title="Ver comprobante"
                              >
                                <Eye size={13} />
                              </button>
                              {res.status === "pendiente" && (
                                <>
                                  <button
                                    onClick={() => handleApprove(res.id)}
                                    className="w-8 h-8 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center hover:bg-green-500/20 transition-colors"
                                  >
                                    <Check size={13} />
                                  </button>
                                  <button
                                    onClick={() => handleReject(res.id)}
                                    className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-colors"
                                  >
                                    <X size={13} />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "menu" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sand-300 text-sm">
                    <span className="text-white font-medium">{activeMenuCount}</span> de {menuItemsState.length} platos activos en el menú
                  </p>
                </div>
                <div className="relative max-w-xs w-full">
                  <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-sand-600" />
                  <input
                    type="text"
                    placeholder="Buscar plato o categoría..."
                    value={menuFilter}
                    onChange={(e) => setMenuFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#0e1424] border border-white/[0.06] rounded-xl text-white text-sm focus:border-sunset-500 focus:outline-none focus:ring-1 focus:ring-sunset-500/20 transition-all"
                  />
                </div>
              </div>

              <div className="bg-[#0e1424] rounded-2xl border border-white/[0.04] divide-y divide-white/[0.03]">
                {filteredMenuItems.map((item) => (
                  <div
                    key={item.id}
                    className={cn(
                      "flex items-center gap-5 px-6 py-4 transition-all",
                      !item.active && "opacity-40",
                    )}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center flex-shrink-0">
                      <Waves size={16} className="text-sand-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2.5">
                        <h4 className="text-white text-sm font-medium">{item.name}</h4>
                        <span className="text-[9px] text-sand-600 bg-white/[0.03] px-2 py-0.5 rounded-full border border-white/[0.04]">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-sand-500 text-xs mt-0.5">${item.price.toFixed(2)}</p>
                    </div>
                    <button onClick={() => toggleMenuItem(item.id)} className="flex-shrink-0 transition-colors">
                      {item.active ? (
                        <ToggleRight size={34} className="text-green-400" />
                      ) : (
                        <ToggleLeft size={34} className="text-sand-700" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "config" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl space-y-6">
              <div className="bg-[#0e1424] rounded-2xl border border-white/[0.04] p-7 space-y-5">
                <h3 className="text-white font-semibold text-base">Datos del Restaurante</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[11px] text-sand-500 uppercase tracking-wider">Nombre</label>
                    <input type="text" defaultValue="Báltico" className="w-full px-4 py-3 bg-navy-900/60 border border-white/[0.06] rounded-xl text-white text-sm focus:border-sunset-500 focus:outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] text-sand-500 uppercase tracking-wider">Teléfono</label>
                    <input type="tel" defaultValue="+58 412 1234567" className="w-full px-4 py-3 bg-navy-900/60 border border-white/[0.06] rounded-xl text-white text-sm focus:border-sunset-500 focus:outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] text-sand-500 uppercase tracking-wider">Costo Reserva ($)</label>
                    <input type="number" defaultValue={10} className="w-full px-4 py-3 bg-navy-900/60 border border-white/[0.06] rounded-xl text-white text-sm focus:border-sunset-500 focus:outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] text-sand-500 uppercase tracking-wider">IVA (%)</label>
                    <input type="number" defaultValue={16} className="w-full px-4 py-3 bg-navy-900/60 border border-white/[0.06] rounded-xl text-white text-sm focus:border-sunset-500 focus:outline-none transition-all" />
                  </div>
                </div>
                <Button size="sm">Guardar Cambios</Button>
              </div>

              <div className="bg-[#0e1424] rounded-2xl border border-white/[0.04] p-7 space-y-5">
                <h3 className="text-white font-semibold text-base">Datos de Pago para Clientes</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[11px] text-sand-500 uppercase tracking-wider">Zelle Email</label>
                    <input type="email" defaultValue="baltico@email.com" className="w-full px-4 py-3 bg-navy-900/60 border border-white/[0.06] rounded-xl text-white text-sm focus:border-sunset-500 focus:outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] text-sand-500 uppercase tracking-wider">Pago Móvil Tel.</label>
                    <input type="tel" defaultValue="0412-1234567" className="w-full px-4 py-3 bg-navy-900/60 border border-white/[0.06] rounded-xl text-white text-sm focus:border-sunset-500 focus:outline-none transition-all" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-[11px] text-sand-500 uppercase tracking-wider">Cuenta Bancaria</label>
                    <input type="text" defaultValue="Banco Venezuela / 0102-1234-56-789" className="w-full px-4 py-3 bg-navy-900/60 border border-white/[0.06] rounded-xl text-white text-sm focus:border-sunset-500 focus:outline-none transition-all" />
                  </div>
                </div>
                <Button size="sm">Guardar Datos de Pago</Button>
              </div>

              <div className="bg-[#0e1424] rounded-2xl border border-white/[0.04] p-7 space-y-5">
                <h3 className="text-white font-semibold text-base">Horario de Operación</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[11px] text-sand-500 uppercase tracking-wider">Días de Operación</label>
                    <input type="text" defaultValue="Martes a Domingo" className="w-full px-4 py-3 bg-navy-900/60 border border-white/[0.06] rounded-xl text-white text-sm focus:border-sunset-500 focus:outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] text-sand-500 uppercase tracking-wider">Horario</label>
                    <input type="text" defaultValue="12:00 PM - 12:00 AM" className="w-full px-4 py-3 bg-navy-900/60 border border-white/[0.06] rounded-xl text-white text-sm focus:border-sunset-500 focus:outline-none transition-all" />
                  </div>
                </div>
                <Button size="sm">Guardar Horario</Button>
              </div>
            </motion.div>
          )}
        </main>
      </div>

      <AnimatePresence>
        {selectedProof && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setSelectedProof(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={selectedProof} alt="Comprobante de pago" width={600} height={400} className="w-full h-auto" />
              <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent flex items-center justify-between">
                <span className="text-white text-sm font-medium">Comprobante de Pago</span>
                <button
                  onClick={() => setSelectedProof(null)}
                  className="w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent flex justify-center gap-3">
                <Button variant="primary" size="sm" onClick={() => setSelectedProof(null)}>
                  <Check size={14} /> Aprobar
                </Button>
                <Button variant="danger" size="sm" onClick={() => setSelectedProof(null)}>
                  <X size={14} /> Rechazar
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
