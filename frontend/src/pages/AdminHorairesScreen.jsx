import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import ScreenHeader from "@/components/ScreenHeader";
import api from "@/lib/api";
import { Save } from "lucide-react";

export default function AdminHorairesScreen() {
  const { settings, refresh, isAdmin } = useApp();
  const navigate = useNavigate();
  const [weekday, setWeekday] = useState("");
  const [weekend, setWeekend] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!isAdmin) navigate("/admin");
  }, [isAdmin]);

  useEffect(() => {
    if (settings) {
      setWeekday(settings.hours_weekday);
      setWeekend(settings.hours_weekend);
    }
  }, [settings]);

  const save = async () => {
    await api.put("/settings", { hours_weekday: weekday, hours_weekend: weekend });
    await refresh();
    setMsg("✅ Enregistré");
    setTimeout(() => setMsg(""), 2000);
  };

  return (
    <div className="pb-32 min-h-screen" data-testid="admin-horaires">
      <ScreenHeader title="Horaires" />
      <div className="px-5 space-y-4">
        <div>
          <label className="text-white/60 text-sm">Semaine</label>
          <input value={weekday} onChange={(e) => setWeekday(e.target.value)} data-testid="hours-weekday"
            className="w-full mt-1 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white" />
        </div>
        <div>
          <label className="text-white/60 text-sm">Week-end</label>
          <input value={weekend} onChange={(e) => setWeekend(e.target.value)} data-testid="hours-weekend"
            className="w-full mt-1 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white" />
        </div>
        {msg && <p className="text-center" data-testid="hours-msg">{msg}</p>}
        <button onClick={save} data-testid="hours-save" className="w-full bg-[#FF1493] text-white rounded-full py-4 font-semibold flex items-center justify-center gap-2 glow-pink-sm">
          <Save size={18} /> Enregistrer
        </button>
      </div>
    </div>
  );
}
