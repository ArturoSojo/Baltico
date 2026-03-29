"use client";

import { create } from "zustand";

export type AreaType = "terraza" | "churuata" | "bar";
export type PaymentMethod = "tarjeta" | "zelle" | "pago-movil" | "transferencia";

export interface ReservationState {
  date: string;
  time: string;
  guests: number;
  area: AreaType | null;
  selectedTable: number | null;
  name: string;
  phone: string;
  email: string;
  specialRequests: string;
  paymentMethod: PaymentMethod | null;
  proofOfPayment: File | null;
  proofPreview: string | null;
  rouletteReward: string | null;
  reservationId: string | null;
  step: number;

  setDate: (date: string) => void;
  setTime: (time: string) => void;
  setGuests: (guests: number) => void;
  setArea: (area: AreaType) => void;
  setSelectedTable: (table: number | null) => void;
  setName: (name: string) => void;
  setPhone: (phone: string) => void;
  setEmail: (email: string) => void;
  setSpecialRequests: (req: string) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setProofOfPayment: (file: File | null, preview: string | null) => void;
  setRouletteReward: (reward: string) => void;
  setReservationId: (id: string) => void;
  setStep: (step: number) => void;
  reset: () => void;
}

const initialState = {
  date: "",
  time: "",
  guests: 2,
  area: null as AreaType | null,
  selectedTable: null as number | null,
  name: "",
  phone: "",
  email: "",
  specialRequests: "",
  paymentMethod: null as PaymentMethod | null,
  proofOfPayment: null as File | null,
  proofPreview: null as string | null,
  rouletteReward: null as string | null,
  reservationId: null as string | null,
  step: 1,
};

export const useReservationStore = create<ReservationState>((set) => ({
  ...initialState,
  setDate: (date) => set({ date }),
  setTime: (time) => set({ time }),
  setGuests: (guests) => set({ guests }),
  setArea: (area) => set({ area }),
  setSelectedTable: (table) => set({ selectedTable: table }),
  setName: (name) => set({ name }),
  setPhone: (phone) => set({ phone }),
  setEmail: (email) => set({ email }),
  setSpecialRequests: (req) => set({ specialRequests: req }),
  setPaymentMethod: (method) => set({ paymentMethod: method }),
  setProofOfPayment: (file, preview) =>
    set({ proofOfPayment: file, proofPreview: preview }),
  setRouletteReward: (reward) => set({ rouletteReward: reward }),
  setReservationId: (id) => set({ reservationId: id }),
  setStep: (step) => set({ step }),
  reset: () => set(initialState),
}));
