import React, { useState } from "react";
import ScreenHeader from "@/components/ScreenHeader";
import { useApp } from "@/context/AppContext";
import { Sparkles, Palette, Hand, RefreshCw, Shield, MinusCircle, ChevronRight, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const filters = [
  { key: "all", label: "Toutes" },
  { key: "ongles", label: "Ongles" },
  { key: "soins", label: "Soins" },
  { key: "extras", label: "Extras" },
];

const iconMap = {
  sparkles: Sparkles,
  palette: Palette,
  hand: Hand,
  "refresh-cw": RefreshCw,
  shield: Shield,
  "minus-circle": MinusCircle,
};

export default function PrestationsScreen() {
  const { prestations, settings } = useApp();
  const [active, setActive] = useState("all");
  const navigate = useNavigate();

  const filtered = active === "all" ? prestations : prestations.filter(p => p.category === active);

  return (
    <div className="pb-32 min-h-screen" data-testid="prestations-screen">
      <ScreenHeader title="Prestations" right={
        <button onClick={() => navigate("/reserver")} data-testid="presta-book-icon" className="text-[#FF1493]">
          <Calendar size={22} />
        </button>
      } />

      {/* Filters */}
      <div className="flex gap-2 px-5 overflow-x-auto scrollbar-hide pb-3">
        {filters.map(f => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            data-testid={`filter-${f.key}`}
            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              active === f.key
                ? "bg-[#FF1493] text-white glow-pink-sm"
                : "bg-[#1A1A1A] border border-[#2A2A2A] text-white/60"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="px-5 mt-3 space-y-3">
        {filtered.map((p) => {
          const Icon = iconMap[p.icon] || Sparkles;
          return (
            <button
              key={p.id}
              onClick={() => navigate(`/reserver?prestation=${p.id}`)}
              data-testid={`presta-${p.id}`}
              className="w-full bg-[#111111] border border-white/5 rounded-[22px] p-4 flex items-center gap-4 active:scale-[0.98] transition-transform hover:border-[#FF1493]/40"
            >
              {p.image_url ? (
                <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-[#FF1493]/30">
                  <img src={p.image_url} alt="" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-2xl bg-[#FF1493]/15 flex items-center justify-center shrink-0">
                  <Icon size={22} className="text-[#FF1493]" />
                </div>
              )}
              <div className="flex-1 text-left">
                <p className="text-white font-semibold text-base">{p.title}</p>
                <p className="text-white/45 text-xs mt-0.5">{p.description}</p>
              </div>
              <p className="text-[#FF1493] font-bold text-xl">{p.price}€</p>
              <ChevronRight size={20} className="text-white/30" />
            </button>
          );
        })}
        {filtered.length === 0 && (
          <p className="text-center text-white/40 py-12">Aucune prestation dans cette catégorie</p>
        )}
      </div>
    </div>
  );
}
