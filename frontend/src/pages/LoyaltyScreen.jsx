import React, { useState } from "react";
import ScreenHeader from "@/components/ScreenHeader";
import api from "@/lib/api";
import { Gift, Phone, Sparkles, Trophy } from "lucide-react";

export default function LoyaltyScreen() {
  const [phone, setPhone] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const check = async () => {
    if (!phone.trim()) return;
    setLoading(true);
    setErr("");
    try {
      const res = await api.get(`/loyalty/${encodeURIComponent(phone.trim())}`);
      setData(res.data);
    } catch (e) {
      setErr("Erreur");
    }
    setLoading(false);
  };

  return (
    <div className="pb-32 min-h-screen" data-testid="loyalty-screen">
      <ScreenHeader title="Fidélité" />

      <div className="px-5">
        <div className="bg-gradient-to-br from-[#FF1493]/20 via-[#FF1493]/5 to-transparent border border-[#FF1493]/30 rounded-[24px] p-6 text-center glow-pink-sm">
          <div className="w-20 h-20 mx-auto rounded-full bg-[#FF1493]/15 flex items-center justify-center mb-4 animate-pulse-glow">
            <Trophy size={36} className="text-[#FFD700]" />
          </div>
          <h2 className="font-italic-display text-white text-2xl">Programme Fidélité</h2>
          <p className="text-white/60 text-sm mt-2">
            Cumulez vos visites et débloquez des récompenses exclusives ✨
          </p>
        </div>

        <div className="mt-5">
          <label className="text-white/60 text-sm">Votre numéro de téléphone</label>
          <div className="flex gap-2 mt-1">
            <div className="relative flex-1">
              <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FF1493]" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && check()}
                data-testid="loyalty-phone"
                placeholder="06 12 34 56 78"
                className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl pl-12 pr-4 py-3 text-white outline-none focus:border-[#FF1493]"
              />
            </div>
            <button onClick={check} disabled={loading} data-testid="loyalty-check"
              className="bg-[#FF1493] text-white rounded-xl px-5 font-medium glow-pink-sm disabled:opacity-50">
              Voir
            </button>
          </div>
          {err && <p className="text-red-400 text-sm mt-2">{err}</p>}
        </div>

        {data && (
          <div className="mt-6 bg-[#111111] border border-[#FF1493]/20 rounded-[24px] p-6" data-testid="loyalty-card">
            {data.client_name && <p className="text-white/60 text-sm">Bonjour</p>}
            {data.client_name && <p className="text-white text-2xl font-semibold mt-1">{data.client_name}</p>}

            <div className="mt-5 flex items-end justify-between">
              <div>
                <p className="text-white/50 text-xs uppercase tracking-wider">Visites</p>
                <p className="font-italic-display text-white text-5xl">
                  {data.visits}<span className="text-white/30 text-2xl">/{data.threshold}</span>
                </p>
              </div>
              <Gift size={48} className="text-[#FF1493]" />
            </div>

            {/* Progress bar */}
            <div className="mt-4 h-3 bg-[#2A2A2A] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FF1493] to-[#FFD700] glow-pink-sm transition-all duration-700"
                style={{ width: `${data.progress_pct}%` }}
              />
            </div>

            {data.reward_unlocked ? (
              <div className="mt-5 bg-gradient-to-br from-[#FFD700]/20 to-[#FF1493]/20 border border-[#FFD700]/40 rounded-2xl p-4 text-center">
                <Sparkles size={28} className="text-[#FFD700] mx-auto" />
                <p className="text-[#FFD700] font-semibold mt-2">🎉 Récompense débloquée !</p>
                <p className="text-white text-sm mt-1">{data.reward}</p>
                <p className="text-white/50 text-xs mt-2">Présentez ce code lors de votre prochaine visite</p>
              </div>
            ) : (
              <p className="text-white/50 text-sm mt-4 text-center">
                Plus que <span className="text-[#FF1493] font-semibold">{data.threshold - data.visits}</span> visites pour gagner <span className="text-[#FFD700]">{data.reward}</span> ✨
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
