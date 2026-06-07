import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Phone, Crown, Heart } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function SplashScreen() {
  const navigate = useNavigate();
  const { settings } = useApp();

  return (
    <div className="relative min-h-screen overflow-hidden" data-testid="splash-screen">
      {/* Background hero image with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1200"
          alt=""
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
        {/* Pink radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#FF1493]/20 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center px-8 pt-20 pb-10">
        {/* Logo */}
        <div className="flex flex-col items-center animate-fade-up">
          <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#FF1493]/30 to-transparent border-2 border-[#FFD700]/60 flex items-center justify-center glow-pink animate-pulse-glow">
            <Crown size={32} className="absolute -top-3 text-[#FFD700] shimmer-gold" fill="#FFD700" />
            <span className="font-italic-display text-[#FFD700] text-7xl text-glow-gold">N</span>
          </div>

          <h1 className="font-script text-white text-6xl mt-6 text-glow-pink leading-none">
            Nail&apos;s Passion
          </h1>

          <div className="flex items-center gap-2 mt-4 text-[#FFD700]/90 text-sm tracking-[0.25em] uppercase">
            <span>Beauté</span>
            <Heart size={10} fill="#FF1493" className="text-[#FF1493]" />
            <span>Élégance</span>
            <Heart size={10} fill="#FF1493" className="text-[#FF1493]" />
            <span>Premium</span>
          </div>
        </div>

        <div className="flex-1" />

        {/* Tagline */}
        <div className="text-center mb-12 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <p className="font-italic-display text-white text-3xl leading-snug">
            La beauté est
          </p>
          <p className="font-script text-[#FF1493] text-5xl text-glow-pink mt-1">
            notre passion
          </p>
          <Heart size={20} fill="#FF1493" className="text-[#FF1493] mx-auto mt-2" />
        </div>

        {/* CTAs */}
        <div className="w-full space-y-4 animate-fade-up" style={{ animationDelay: '0.5s' }}>
          <button
            onClick={() => window.open(settings?.sumup_url || "/", "_blank")}
            data-testid="splash-reserve-btn"
            className="w-full h-16 rounded-full bg-[#FF1493] text-white font-medium text-lg flex items-center justify-center gap-3 glow-pink active:scale-95 transition-transform"
          >
            <Calendar size={22} />
            <span>Réserver maintenant</span>
            <span className="ml-2">→</span>
          </button>

          <button
            onClick={() => navigate("/contact")}
            data-testid="splash-contact-btn"
            className="w-full h-16 rounded-full bg-transparent border-2 border-[#FFD700]/40 text-white font-medium text-lg flex items-center justify-center gap-3 hover:border-[#FFD700] transition-colors"
          >
            <Phone size={20} className="text-[#FF1493]" />
            <span>Nous contacter</span>
          </button>

          <button
            onClick={() => navigate("/")}
            data-testid="splash-enter-app"
            className="w-full text-white/40 text-xs tracking-widest uppercase mt-2"
          >
            Entrer dans l&apos;application →
          </button>
        </div>
      </div>
    </div>
  );
}
