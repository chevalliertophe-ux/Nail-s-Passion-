import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Delete, Crown } from "lucide-react";
import { useApp } from "@/context/AppContext";
import ScreenHeader from "@/components/ScreenHeader";

export default function AdminPinScreen() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const { loginAdmin } = useApp();
  const navigate = useNavigate();

  const handleDigit = async (d) => {
    setError("");
    if (pin.length >= 4) return;
    const next = pin + d;
    setPin(next);
    if (next.length === 4) {
      try {
        await loginAdmin(next);
        navigate("/admin/panel");
      } catch {
        setError("Code PIN incorrect");
        setTimeout(() => setPin(""), 600);
      }
    }
  };

  const handleDelete = () => {
    setError("");
    setPin(pin.slice(0, -1));
  };

  return (
    <div className="min-h-screen pb-10" data-testid="admin-pin-screen">
      <ScreenHeader title="Admin" />

      <div className="flex flex-col items-center mt-8 px-6">
        <div className="w-24 h-24 rounded-full bg-[#FF1493]/15 border border-[#FF1493]/30 flex items-center justify-center glow-pink">
          <Lock size={42} className="text-[#FF1493]" />
        </div>

        <h2 className="font-italic-display text-white text-3xl mt-6">Connexion Admin</h2>
        <p className="text-white/50 text-sm mt-2">Entrez votre code PIN</p>

        {/* PIN dots */}
        <div className="flex gap-4 mt-8" data-testid="pin-dots">
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full transition-all ${
                i < pin.length ? "bg-[#FF1493] glow-pink-sm" : "bg-[#2A2A2A]"
              }`}
            />
          ))}
        </div>

        {error && <p className="text-red-400 text-sm mt-4" data-testid="pin-error">{error}</p>}

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-4 mt-10">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
            <button
              key={n}
              onClick={() => handleDigit(String(n))}
              data-testid={`pin-${n}`}
              className="w-[72px] h-[72px] rounded-full bg-[#161616] border border-[#2A2A2A] text-white text-2xl font-light active:bg-[#FF1493] active:border-[#FF1493] active:glow-pink-sm transition-all"
            >
              {n}
            </button>
          ))}
          <div />
          <button
            onClick={() => handleDigit("0")}
            data-testid="pin-0"
            className="w-[72px] h-[72px] rounded-full bg-[#161616] border border-[#2A2A2A] text-white text-2xl font-light active:bg-[#FF1493] active:border-[#FF1493] transition-all"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            data-testid="pin-delete"
            className="w-[72px] h-[72px] rounded-full bg-[#161616] border border-[#2A2A2A] text-white flex items-center justify-center active:bg-[#1F1F1F] transition-all"
          >
            <Delete size={22} />
          </button>
        </div>

        <p className="text-white/30 text-xs mt-8">PIN par défaut : 1234</p>
      </div>
    </div>
  );
}
