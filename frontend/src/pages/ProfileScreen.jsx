import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { User, Calendar, Settings as SettingsIcon, ExternalLink, LogOut, ChevronRight, Trophy, Sun, Moon } from "lucide-react";
import ScreenHeader from "@/components/ScreenHeader";
import api from "@/lib/api";

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { settings, isAdmin, logoutAdmin, refresh } = useApp();

  const toggleTheme = async () => {
    const next = settings?.theme === "light" ? "dark" : "light";
    // L'admin seul peut changer le thème "permanent" ; sinon override local
    if (isAdmin) {
      await api.put("/settings", { theme: next });
      await refresh();
    } else {
      // Override local visiteur
      const newTheme = next;
      document.documentElement.dataset.theme = newTheme;
      localStorage.setItem("np_theme", newTheme);
      // force update via custom event
      window.dispatchEvent(new Event("themechange"));
    }
  };

  const currentTheme = settings?.theme || "dark";

  return (
    <div className="pb-32 min-h-screen" data-testid="profile-screen">
      <ScreenHeader title="Profil" showBack={false} />

      <div className="px-5 mt-4">
        <div className="bg-[#111111] border border-[#FF1493]/20 rounded-[22px] p-5 flex items-center gap-4 glow-pink-sm">
          <div className="w-16 h-16 rounded-full bg-[#FF1493]/15 flex items-center justify-center">
            <User size={28} className="text-[#FF1493]" />
          </div>
          <div>
            <p className="text-white font-semibold text-lg">{isAdmin ? "Mode Administrateur" : "Bienvenue"}</p>
            <p className="text-white/50 text-xs">{settings?.salon_name || "Nail's Passion"}</p>
          </div>
        </div>
      </div>

      <div className="px-5 mt-5 space-y-3">
        <button onClick={() => navigate("/reserver")} data-testid="profile-book" className="w-full bg-[#111111] border border-white/5 rounded-[22px] p-4 flex items-center gap-4 active:scale-[0.98] transition-transform">
          <div className="w-12 h-12 rounded-2xl bg-[#FF1493]/15 flex items-center justify-center"><Calendar size={20} className="text-[#FF1493]" /></div>
          <div className="flex-1 text-left"><p className="text-white font-semibold">Réserver un RDV</p><p className="text-white/45 text-xs">Demande de réservation</p></div>
          <ChevronRight size={20} className="text-white/30" />
        </button>

        {settings?.loyalty_enabled && (
          <button onClick={() => navigate("/fidelite")} data-testid="profile-loyalty" className="w-full bg-[#111111] border border-white/5 rounded-[22px] p-4 flex items-center gap-4 active:scale-[0.98] transition-transform">
            <div className="w-12 h-12 rounded-2xl bg-[#FFD700]/15 flex items-center justify-center"><Trophy size={20} className="text-[#FFD700]" /></div>
            <div className="flex-1 text-left"><p className="text-white font-semibold">Programme fidélité</p><p className="text-white/45 text-xs">Vos visites & récompenses</p></div>
            <ChevronRight size={20} className="text-white/30" />
          </button>
        )}

        {settings?.sumup_url && (
          <button onClick={() => window.open(settings.sumup_url, "_blank")} data-testid="profile-sumup" className="w-full bg-[#111111] border border-white/5 rounded-[22px] p-4 flex items-center gap-4 active:scale-[0.98] transition-transform">
            <div className="w-12 h-12 rounded-2xl bg-[#FF1493]/15 flex items-center justify-center"><ExternalLink size={20} className="text-[#FF1493]" /></div>
            <div className="flex-1 text-left"><p className="text-white font-semibold">Agenda SumUp</p><p className="text-white/45 text-xs">Réservation en ligne</p></div>
            <ChevronRight size={20} className="text-white/30" />
          </button>
        )}

        <button onClick={toggleTheme} data-testid="profile-theme" className="w-full bg-[#111111] border border-white/5 rounded-[22px] p-4 flex items-center gap-4 active:scale-[0.98] transition-transform">
          <div className="w-12 h-12 rounded-2xl bg-[#FF1493]/15 flex items-center justify-center">
            {currentTheme === "dark" ? <Sun size={20} className="text-[#FFD700]" /> : <Moon size={20} className="text-[#FF1493]" />}
          </div>
          <div className="flex-1 text-left">
            <p className="text-white font-semibold">Thème</p>
            <p className="text-white/45 text-xs">Actuel : {currentTheme === "dark" ? "Sombre 🌙" : "Rosé clair 🌸"}</p>
          </div>
          <ChevronRight size={20} className="text-white/30" />
        </button>

        {isAdmin && (
          <>
            <button onClick={() => navigate("/admin/panel")} data-testid="profile-admin-panel" className="w-full bg-[#111111] border border-[#FF1493]/30 rounded-[22px] p-4 flex items-center gap-4 active:scale-[0.98] transition-transform">
              <div className="w-12 h-12 rounded-2xl bg-[#FF1493] flex items-center justify-center"><SettingsIcon size={20} className="text-white" /></div>
              <div className="flex-1 text-left"><p className="text-white font-semibold">Panneau admin</p><p className="text-white/45 text-xs">Gérer l&apos;application</p></div>
              <ChevronRight size={20} className="text-white/30" />
            </button>
            <button onClick={async () => { await logoutAdmin(); }} data-testid="profile-logout" className="w-full bg-[#111111] border border-white/5 rounded-[22px] p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-red-500/15 flex items-center justify-center"><LogOut size={20} className="text-red-400" /></div>
              <div className="flex-1 text-left"><p className="text-white font-semibold">Déconnexion admin</p></div>
            </button>
          </>
        )}
      </div>

      <p className="text-center text-white/20 text-[10px] mt-10">v1.0 • Nail&apos;s Passion</p>
    </div>
  );
}
