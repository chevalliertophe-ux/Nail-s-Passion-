import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Sparkles, Palette, Hand, Heart, Crown, Gift } from "lucide-react";
import { useApp } from "@/context/AppContext";

const quickIcons = [
  { label: "Pose Gel", icon: Sparkles },
  { label: "Nail Art", icon: Palette },
  { label: "Manucure", icon: Hand },
];

export default function HomeScreen() {
  const navigate = useNavigate();
  const { prestations, settings } = useApp();
  const tapCount = useRef(0);
  const tapTimer = useRef(null);

  const handleLogoTap = () => {
    tapCount.current += 1;
    if (tapTimer.current) clearTimeout(tapTimer.current);
    if (tapCount.current >= 5) {
      tapCount.current = 0;
      navigate("/admin");
      return;
    }
    tapTimer.current = setTimeout(() => { tapCount.current = 0; }, 1200);
  };

  const topServices = prestations.slice(0, 4);
  const heroImg = settings?.home_hero_image || "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800";

  return (
    <div className="pb-32 min-h-screen" data-testid="home-screen">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-12 pb-2">
        <button data-testid="home-menu-btn" onClick={() => navigate("/profil")} className="text-white">
          <Menu size={28} />
        </button>
        {settings?.loyalty_enabled && (
          <button onClick={() => navigate("/fidelite")} data-testid="home-loyalty-btn"
            className="w-11 h-11 rounded-2xl bg-[#FF1493]/15 border border-[#FF1493]/40 flex items-center justify-center glow-pink-sm">
            <Gift size={18} className="text-[#FF1493]" />
          </button>
        )}
      </div>

      {/* Welcome */}
      <div className="text-center mt-4 px-6">
        <p className="font-script text-white text-5xl text-glow-pink leading-none">
          Bienvenue <Heart size={22} fill="#FF1493" className="inline text-[#FF1493] -mt-2" />
        </p>
        <h1
          onClick={handleLogoTap}
          data-testid="home-logo-tap"
          className="font-italic-display text-white text-4xl mt-2 cursor-pointer select-none"
        >
          {settings?.salon_name || "Nail's Passion"}
        </h1>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="text-[#FFD700] text-2xl">❦</span>
          <div className="h-px w-12 bg-[#FFD700]/40" />
          <Crown size={14} fill="#FFD700" className="text-[#FFD700]" />
          <div className="h-px w-12 bg-[#FFD700]/40" />
          <span className="text-[#FFD700] text-2xl">❦</span>
        </div>
      </div>

      {/* Hero circular image */}
      <div className="relative flex justify-center mt-6 px-6">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[280px] mx-12 rounded-full bg-[#FF1493]/30 blur-3xl" />
        <div className="relative w-[280px] h-[280px] rounded-full overflow-hidden border-2 border-[#FFD700]/40 glow-pink-lg animate-float">
          <img src={heroImg} alt="Nail showcase" className="w-full h-full object-cover" />
        </div>
        <span className="absolute top-4 right-12 text-[#FFD700] text-xl">✦</span>
        <span className="absolute bottom-8 left-12 text-[#FFD700] text-sm">✦</span>
        <span className="absolute top-1/2 left-6 text-[#FF1493] text-xs">✧</span>
      </div>

      {/* Quick icons */}
      <div className="grid grid-cols-3 gap-3 px-5 mt-8">
        {quickIcons.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => navigate("/prestations")}
            data-testid={`quick-${label.toLowerCase().replace(' ', '-')}`}
            className="aspect-square rounded-[22px] bg-[#0F0F0F] border border-[#FF1493]/20 flex flex-col items-center justify-center gap-2 hover:border-[#FF1493] transition-colors glow-pink-sm"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FF1493]/15 flex items-center justify-center">
              <Icon size={22} className="text-[#FF1493]" />
            </div>
            <span className="text-white text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>

      {/* Nos Prestations */}
      <div className="mt-10 px-5">
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-10 bg-[#FFD700]/50" />
          <h2 className="font-italic-display text-white text-3xl">Nos Prestations</h2>
          <div className="h-px w-10 bg-[#FFD700]/50" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {topServices.map((p, i) => (
            <button
              key={p.id}
              onClick={() => navigate("/prestations")}
              data-testid={`home-service-${i}`}
              className="rounded-[22px] overflow-hidden bg-[#0F0F0F] border border-[#FFD700]/20 active:scale-[0.98] transition-transform"
            >
              <div className="h-28 overflow-hidden">
                <img
                  src={p.image_url || (i % 2 === 0 ? settings?.home_card_image_1 : settings?.home_card_image_2)}
                  className="w-full h-full object-cover"
                  alt={p.title}
                />
              </div>
              <div className="p-3 text-left">
                <div className="flex items-center justify-between">
                  <p className="text-white font-medium text-sm">{p.title}</p>
                  <span className="text-[#FF1493] text-xs">→</span>
                </div>
                <p className="text-white/40 text-[10px] mt-1 truncate">{p.description}</p>
                <p className="text-[#FF1493] font-bold text-lg mt-1">{p.price}€</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
