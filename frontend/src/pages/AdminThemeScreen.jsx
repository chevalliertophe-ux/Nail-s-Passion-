import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import ScreenHeader from "@/components/ScreenHeader";
import api from "@/lib/api";
import { Save, Sparkles, Wand2, RefreshCw, Image as ImageIcon } from "lucide-react";

const VIBES = [
  { key: "rose-smoke", name: "Rose Fumée", emoji: "🌹", desc: "Fumée rose néon (par défaut)", grad: "from-[#FF1493] to-[#FF6FA3]" },
  { key: "glitter-gold", name: "Glitter Doré", emoji: "✨", desc: "Paillettes d'or qui tombent", grad: "from-[#FFD700] to-[#FFB300]" },
  { key: "pink-dream", name: "Rêve Rose", emoji: "🌸", desc: "Cœurs flottants tout doux", grad: "from-[#FF6FA3] to-[#FFC0E0]" },
  { key: "black-luxe", name: "Black Luxe", emoji: "💎", desc: "Or & sparkles luxueux", grad: "from-[#FFD700] to-[#FFA500]" },
  { key: "lavender-magic", name: "Magie Lavande", emoji: "🦋", desc: "Papillons & brume violette", grad: "from-[#B57BFF] to-[#FF6FE0]" },
];

export default function AdminThemeScreen() {
  const { settings, refresh, isAdmin } = useApp();
  const navigate = useNavigate();
  const [vibe, setVibe] = useState("rose-smoke");
  const [theme, setTheme] = useState("dark");
  const [msg, setMsg] = useState("");
  const [genLoading, setGenLoading] = useState(null); // 'logo' | 'icon' | null
  const [customPrompt, setCustomPrompt] = useState("");

  useEffect(() => {
    if (!isAdmin) navigate("/admin");
  }, [isAdmin, navigate]);

  useEffect(() => {
    if (settings) {
      setVibe(settings.vibe || "rose-smoke");
      setTheme(settings.theme || "dark");
    }
  }, [settings]);

  const save = async () => {
    await api.put("/settings", { vibe, theme });
    await refresh();
    setMsg("Vibe enregistrée ✨");
    setTimeout(() => setMsg(""), 2200);
  };

  const regen = async (kind) => {
    setGenLoading(kind);
    setMsg(`Génération ${kind === "logo" ? "du logo" : "de l'icône"} en cours...`);
    try {
      await api.post("/admin/regenerate-logo", { kind, prompt: customPrompt || null });
      await refresh();
      setMsg(`${kind === "logo" ? "Logo" : "Icône"} régénéré ✨`);
    } catch (e) {
      setMsg(`Erreur: ${e.response?.data?.detail || e.message}`);
    }
    setGenLoading(null);
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div className="pb-32 min-h-screen relative z-10" data-testid="admin-theme">
      <ScreenHeader title="Thème" right={<Sparkles size={20} className="text-[#FF1493]" />} />

      <div className="px-5 space-y-5">
        {/* Theme dark/light */}
        <div className="bg-[#111111] border border-white/5 rounded-[22px] p-4">
          <p className="text-white font-semibold mb-3">Mode</p>
          <div className="grid grid-cols-2 gap-2">
            {["dark", "light"].map(t => (
              <button key={t} onClick={() => setTheme(t)} data-testid={`mode-${t}`}
                className={`rounded-xl py-3 text-sm font-medium border transition-all ${
                  theme === t ? "bg-[#FF1493] text-white border-[#FF1493] glow-pink-sm" : "bg-[#1A1A1A] border-[#2A2A2A] text-white/60"
                }`}>
                {t === "dark" ? "🌙 Sombre" : "🌸 Rosé clair"}
              </button>
            ))}
          </div>
        </div>

        {/* Vibes */}
        <div>
          <p className="text-white font-semibold mb-3 flex items-center gap-2">
            <Wand2 size={18} className="text-[#FF1493]" /> Choisir une vibe ✨
          </p>
          <div className="grid grid-cols-1 gap-3">
            {VIBES.map(v => (
              <button key={v.key} onClick={() => setVibe(v.key)} data-testid={`vibe-${v.key}`}
                className={`relative overflow-hidden rounded-[22px] p-4 text-left border-2 transition-all ${
                  vibe === v.key ? "border-[#FF1493] glow-pink-sm scale-[1.02]" : "border-white/5"
                }`}
                style={{ background: "#111" }}>
                <div className={`absolute inset-0 bg-gradient-to-br ${v.grad} opacity-20`} />
                <div className="relative flex items-center gap-4">
                  <div className="text-3xl">{v.emoji}</div>
                  <div className="flex-1">
                    <p className="text-white font-semibold">{v.name}</p>
                    <p className="text-white/55 text-xs mt-0.5">{v.desc}</p>
                  </div>
                  {vibe === v.key && (
                    <span className="bg-[#FF1493] text-white text-[10px] uppercase tracking-wider px-2 py-1 rounded-full">Active</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {msg && <p className="text-center text-[#FF1493] font-medium text-sm" data-testid="theme-msg">{msg}</p>}

        <button onClick={save} data-testid="theme-save"
          className="w-full bg-[#FF1493] text-white rounded-full py-4 font-semibold flex items-center justify-center gap-2 glow-pink-sm">
          <Save size={18} /> Enregistrer la vibe
        </button>

        {/* Logo regen */}
        <div className="bg-gradient-to-br from-[#FF1493]/10 to-transparent border border-[#FF1493]/20 rounded-[22px] p-4 mt-6">
          <p className="text-white font-semibold flex items-center gap-2">
            <ImageIcon size={18} className="text-[#FF1493]" /> Logo & icône (IA Gemini)
          </p>
          <p className="text-white/55 text-xs mt-1">Générer un nouveau logo via IA. Décrivez le style souhaité (optionnel).</p>

          {settings?.logo_url && (
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <p className="text-white/50 text-[10px] uppercase tracking-wider mb-1">Logo</p>
                <div className="bg-black/40 rounded-xl overflow-hidden aspect-square">
                  <img src={settings.logo_url} alt="logo" className="w-full h-full object-contain" />
                </div>
              </div>
              <div>
                <p className="text-white/50 text-[10px] uppercase tracking-wider mb-1">Icône</p>
                <div className="bg-black/40 rounded-xl overflow-hidden aspect-square">
                  <img src={settings.icon_url} alt="icon" className="w-full h-full object-contain" />
                </div>
              </div>
            </div>
          )}

          <textarea value={customPrompt} onChange={(e) => setCustomPrompt(e.target.value)} data-testid="logo-prompt"
            rows={3} placeholder="Ex: 'avec plus de paillettes argentées' (laisser vide pour le défaut)"
            className="w-full mt-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-[#FF1493] resize-none" />

          <div className="grid grid-cols-2 gap-2 mt-3">
            <button onClick={() => regen("logo")} disabled={genLoading !== null} data-testid="regen-logo"
              className="bg-[#FF1493] text-white rounded-full py-3 text-sm font-medium flex items-center justify-center gap-2 glow-pink-sm disabled:opacity-50">
              {genLoading === "logo" ? <RefreshCw size={14} className="animate-spin" /> : <Wand2 size={14} />}
              Régénérer logo
            </button>
            <button onClick={() => regen("icon")} disabled={genLoading !== null} data-testid="regen-icon"
              className="bg-[#FFD700] text-black rounded-full py-3 text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50">
              {genLoading === "icon" ? <RefreshCw size={14} className="animate-spin" /> : <Wand2 size={14} />}
              Régénérer icône
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
