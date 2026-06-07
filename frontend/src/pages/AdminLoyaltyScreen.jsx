import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import ScreenHeader from "@/components/ScreenHeader";
import api from "@/lib/api";
import { Save, Trophy, Award } from "lucide-react";

export default function AdminLoyaltyScreen() {
  const { settings, refresh, isAdmin } = useApp();
  const navigate = useNavigate();
  const [enabled, setEnabled] = useState(true);
  const [threshold, setThreshold] = useState(10);
  const [reward, setReward] = useState("");
  const [list, setList] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!isAdmin) navigate("/admin");
    else loadList();
  }, [isAdmin, navigate]);

  useEffect(() => {
    if (settings) {
      setEnabled(settings.loyalty_enabled ?? true);
      setThreshold(settings.loyalty_threshold ?? 10);
      setReward(settings.loyalty_reward ?? "");
    }
  }, [settings]);

  const loadList = async () => {
    try {
      const res = await api.get("/loyalty");
      setList(res.data);
    } catch {}
  };

  const save = async () => {
    await api.put("/settings", {
      loyalty_enabled: enabled,
      loyalty_threshold: parseInt(threshold) || 10,
      loyalty_reward: reward,
    });
    await refresh();
    setMsg("Enregistré");
    setTimeout(() => setMsg(""), 2000);
  };

  return (
    <div className="pb-32 min-h-screen" data-testid="admin-loyalty">
      <ScreenHeader title="Fidélité" right={<Trophy size={20} className="text-[#FFD700]" />} />

      <div className="px-5 space-y-4">
        <div className="bg-[#111111] border border-white/5 rounded-[22px] p-4 space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-white font-medium">Activer le programme</span>
            <input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} data-testid="loyalty-toggle" className="w-5 h-5 accent-[#FF1493]" />
          </label>
          <div>
            <label className="text-white/60 text-sm">Nombre de visites pour récompense</label>
            <input type="number" value={threshold} onChange={(e) => setThreshold(e.target.value)} data-testid="loyalty-threshold"
              className="w-full mt-1 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white outline-none focus:border-[#FF1493]" />
          </div>
          <div>
            <label className="text-white/60 text-sm">Récompense</label>
            <input value={reward} onChange={(e) => setReward(e.target.value)} data-testid="loyalty-reward"
              placeholder="ex: 1 Nail Art offert"
              className="w-full mt-1 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white outline-none focus:border-[#FF1493]" />
          </div>
          {msg && <p className="text-center text-[#FF1493] text-sm" data-testid="loyalty-msg">{msg}</p>}
          <button onClick={save} data-testid="loyalty-save"
            className="w-full bg-[#FF1493] text-white rounded-full py-3 font-semibold flex items-center justify-center gap-2 glow-pink-sm">
            <Save size={18} /> Enregistrer
          </button>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <Award size={18} className="text-[#FFD700]" /> Top clientes
          </h3>
          {list.length === 0 && <p className="text-white/40 text-center py-6">Aucune cliente fidèle pour le moment</p>}
          {list.map((c, i) => (
            <div key={c.phone} className="bg-[#111111] border border-white/5 rounded-2xl p-3 flex items-center gap-3 mb-2" data-testid={`top-${i}`}>
              <div className="w-10 h-10 rounded-full bg-[#FF1493]/15 flex items-center justify-center text-[#FF1493] font-bold">
                {i + 1}
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">{c.client_name || "Cliente"}</p>
                <p className="text-white/40 text-xs">{c.phone}</p>
              </div>
              <div className="text-right">
                <p className="text-[#FF1493] font-bold text-lg">{c.visits}</p>
                <p className="text-white/40 text-[10px]">visites</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
