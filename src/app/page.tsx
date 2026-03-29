"use client";

import Header from "@/components/Header";
import Hero from "@/components/landing/Hero";
import QuickReservation from "@/components/landing/QuickReservation";
import FeaturedDishes from "@/components/landing/FeaturedDishes";
import Experience from "@/components/landing/Experience";
import PromoSection from "@/components/landing/PromoSection";
import Footer from "@/components/landing/Footer";

function SectionDivider() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-white/[0.05]"></div>
        </div>
        <div className="relative bg-navy-950 px-4">
          <div className="w-1.5 h-1.5 rounded-full bg-sunset-500/40" />
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="relative bg-navy-950">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] bg-sunset-500/5 blur-[120px] rounded-full" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] bg-gold-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10">
        <Header />
        <Hero />
        
        <div className="py-16 sm:py-24">
          <QuickReservation />
        </div>
        
        <SectionDivider />
        
        <div className="py-16 sm:py-24 bg-navy-900/40">
          <FeaturedDishes />
        </div>
        
        <SectionDivider />
        
        <div className="py-16 sm:py-24">
          <PromoSection />
        </div>
        
        <SectionDivider />
        
        <div className="py-16 sm:py-24 bg-navy-900/40">
          <Experience />
        </div>
        
        <Footer />
      </div>
    </main>
  );
}
