"use client";

import Link from "next/link";
import { MapPin, Phone, Clock, ExternalLink, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-16 sm:mt-24">
      <div className="h-px bg-gradient-to-r from-transparent via-sunset-500/30 to-transparent" />

      <div className="bg-navy-900/40">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-20 sm:pt-24 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sunset-400 to-gold-500 flex items-center justify-center ring-2 ring-white/10">
                  <span className="text-white font-serif font-bold text-2xl">B</span>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">
                    Báltico
                  </h3>
                  <p className="text-[10px] text-sand-500 tracking-[0.2em] uppercase">
                    Restaurante & Marisquería
                  </p>
                </div>
              </div>
              <p className="text-sand-400 text-sm leading-relaxed mb-6 max-w-xs">
                La experiencia gastronómica más exclusiva del litoral central.
                Mariscos frescos, atardeceres infinitos y la mejor vida
                nocturna de La Guaira.
              </p>
              <a
                href="https://www.instagram.com/balticovzla/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.05] border border-white/10 text-sand-200 hover:text-sunset-400 hover:border-sunset-500/30 transition-all text-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                @balticovzla
                <ExternalLink size={12} />
              </a>
            </div>

            <div className="lg:col-span-2">
              <h4 className="font-semibold text-white text-xs mb-5 uppercase tracking-[0.15em]">
                Navegación
              </h4>
              <ul className="space-y-3.5">
                {[
                  { href: "/", label: "Inicio" },
                  { href: "/menu", label: "Menú" },
                  { href: "/reservar", label: "Reservaciones" },
                  { href: "/admin", label: "Admin" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sand-400 hover:text-sunset-400 text-sm transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight
                        size={11}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-sunset-500"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h4 className="font-semibold text-white text-xs mb-5 uppercase tracking-[0.15em]">
                Información
              </h4>
              <ul className="space-y-4 text-sm text-sand-400">
                <li className="flex items-start gap-3">
                  <MapPin size={15} className="mt-0.5 text-sunset-400 flex-shrink-0" />
                  <div>
                    <span className="text-sand-200 block">La Guaira 1164</span>
                    <span className="text-sand-500 text-xs">Estado La Guaira, Venezuela</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={15} className="mt-0.5 text-sunset-400 flex-shrink-0" />
                  <div>
                    <span className="text-sand-200 block">Martes – Domingo</span>
                    <span className="text-sand-500 text-xs">12:00 PM – 12:00 AM</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={15} className="mt-0.5 text-sunset-400 flex-shrink-0" />
                  <div>
                    <span className="text-sand-200 block">Reservaciones</span>
                    <span className="text-sand-500 text-xs">Vía Instagram DM o WhatsApp</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h4 className="font-semibold text-white text-xs mb-5 uppercase tracking-[0.15em]">
                Ubicación
              </h4>
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl shadow-black/20">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2!2d-66.9008553!3d10.6054602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2a5bb2ee50dc87%3A0x570f78195ceccf9!2sLa%20Guaira%201164%2C%20La%20Guaira!5e0!3m2!1ses!2sve!4v1711700000000!5m2!1ses!2sve"
                  width="100%"
                  height="200"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.9) contrast(1.1)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de Báltico"
                  className="w-full"
                />
                <a
                  href="https://www.google.com/maps/dir//1164,+La+Guaira+1164,+La+Guaira/@10.6054602,-66.9008553,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 bg-navy-800/60 text-sand-300 hover:text-sunset-400 text-xs transition-colors"
                >
                  <MapPin size={12} />
                  Abrir en Google Maps
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/[0.06]">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sand-600 text-xs">
                © {new Date().getFullYear()} Báltico Restaurante & Marisquería.
                Todos los derechos reservados.
              </p>
              <div className="flex items-center gap-6 text-xs text-sand-600">
                <span>Precios no incluyen IVA</span>
                <span className="hidden sm:inline">·</span>
                <span className="hidden sm:inline">Diseñado con ♡ para Báltico</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
