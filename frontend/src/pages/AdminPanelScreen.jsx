import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import ScreenHeader from "@/components/ScreenHeader";
import { Settings as SettingsIcon, Tag, Image as ImageIcon, Clock, Gift, LogOut, ChevronRight, CalendarCheck, Crown, Trophy, ImagePlus } from "lucide-react";

const menu = [
  { key: "infos", title: "Modifier infos", subtitle: "Tél, WhatsApp, Instagram, Adresse", icon: SettingsIcon, path: "/admin/infos" },
  { key: "prestations", title: "Prestations & Tarifs", subtitle: "Gérer vos prestations", icon: Tag, path: "/admin/prestations" },
  { key: "images", title: "Images du site", subtitle: "Splash, hero, cards d'accueil", icon: ImagePlus, path: "/admin/images" },
  { key: "gallery", title: "Galerie Photos", subtitle: "Ajouter, modifier, supprimer", icon: ImageIcon, path: "/galerie" },
  { key: "horaires", title: "Horaires", subtitle: "Gérer vos horaires", icon: Clock, path: "/admin/horaires" },
  { key: "promotions", title: "Promotions", subtitle: "Offres & nouveautés", icon: Gift, path: "/admin/promotions" },
  { key: "loyalty", title: "Fidélité", subtitle: "Programme & top clientes", icon: Trophy, path: "/admin/loyalty" },
  { key: "bookings", title: "Réservations", subtitle: "Valider les RDV clients", icon: CalendarCheck, path: "/admin/bookings" },
];

export default function AdminPanelScreen() {
  const navigate = useNavigate();
  const { logoutAdmin, isAdmin } = useApp();

  if (!isAdmin) {
    navigate("/admin");
    return null;
  }

  return (
    <div className="pb-20 min-h-screen" data-testid="admin-panel">
      <ScreenHeader title="Admin" right={<Crown size={20} className="text-[#FFD700]" fill="#FFD700" />} />

      <div className="px-5 space-y-3 mt-2">
        {menu.map(({ key, title, subtitle, icon: Icon, path }) => (
          <button
            key={key}
            onClick={() => navigate(path)}
            data-testid={`admin-menu-${key}`}
            className="w-full bg-[#111111] border border-white/5 rounded-[22px] p-4 flex items-center gap-4 active:scale-[0.98] transition-transform hover:border-[#FF1493]/30"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FF1493]/15 flex items-center justify-center shrink-0">
              <Icon size={22} className="text-[#FF1493]" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-white font-semibold">{title}</p>
              <p className="text-white/45 text-xs mt-0.5">{subtitle}</p>
            </div>
            <ChevronRight size={20} className="text-white/30" />
          </button>
        ))}
      </div>

      <div className="px-5 mt-8">
        <button
          onClick={async () => { await logoutAdmin(); navigate("/"); }}
          data-testid="admin-logout"
          className="w-full bg-[#FF1493] text-white rounded-full py-4 font-semibold flex items-center justify-center gap-2 glow-pink-sm"
        >
          <LogOut size={18} />
          Déconnexion
        </button>
      </div>
    </div>
  );
}
