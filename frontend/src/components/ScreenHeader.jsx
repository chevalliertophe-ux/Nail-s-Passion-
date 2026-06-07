import React from "react";
import { Crown, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ScreenHeader({ title, showBack = true, right = null }) {
  const navigate = useNavigate();
  return (
    <div className="relative pt-12 pb-4 px-5 flex items-center justify-between">
      {showBack ? (
        <button
          onClick={() => navigate(-1)}
          data-testid="header-back"
          className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-[#FF1493] transition-colors"
        >
          <ChevronLeft size={28} />
        </button>
      ) : <div className="w-10" />}

      <div className="flex flex-col items-center">
        <Crown size={20} className="text-[#FFD700] text-glow-gold -mb-1" fill="#FFD700" />
        <h1 className="font-italic-display text-white text-[26px] leading-tight">{title}</h1>
        <div className="w-12 h-[2px] bg-[#FF1493] mt-1 rounded-full glow-pink-sm" />
      </div>

      <div className="w-10 flex justify-end">
        {right}
      </div>
    </div>
  );
}
