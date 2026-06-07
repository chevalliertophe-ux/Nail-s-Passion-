import React from "react";
import { Home, Image as ImageIcon, LayoutGrid, Phone, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const tabs = [
  { key: "home", label: "Accueil", icon: Home, path: "/" },
  { key: "gallery", label: "Galerie", icon: ImageIcon, path: "/galerie" },
  { key: "prestations", label: "Prestations", icon: LayoutGrid, path: "/prestations" },
  { key: "contact", label: "Contact", icon: Phone, path: "/contact" },
  { key: "profil", label: "Profil", icon: User, path: "/profil" },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const isActive = (p) => {
    if (p === "/") return path === "/";
    return path.startsWith(p);
  };

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-50">
      <div className="relative mx-3 mb-3 rounded-[28px] bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/5 px-2 pt-3 pb-2 flex items-end justify-around h-[78px]"
        style={{ boxShadow: "0 -8px 30px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,20,147,0.08)" }}
        data-testid="bottom-nav">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = isActive(tab.path);
          return (
            <button
              key={tab.key}
              onClick={() => navigate(tab.path)}
              data-testid={`nav-${tab.key}`}
              className="flex flex-col items-center justify-end flex-1 relative h-full"
            >
              <div className={`tab-pop ${active
                ? "-translate-y-5 bg-[#FF1493] w-14 h-14 rounded-full flex items-center justify-center border-[3px] border-[#050505] glow-pink"
                : "w-10 h-10 flex items-center justify-center"
                }`}>
                <Icon size={active ? 26 : 22} className={active ? "text-white" : "text-white/55"} strokeWidth={active ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] mt-1 font-medium tracking-wide ${active ? "text-[#FF1493]" : "text-white/45"}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
