import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import ScreenHeader from "@/components/ScreenHeader";
import api from "@/lib/api";
import { Check, X, Trash2, Calendar, Phone } from "lucide-react";

export default function AdminBookingsScreen() {
  const { isAdmin } = useApp();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [tab, setTab] = useState("pending");

  useEffect(() => {
    if (!isAdmin) navigate("/admin");
    else load();
  }, [isAdmin]);

  const load = async () => {
    const res = await api.get("/bookings");
    setBookings(res.data);
  };

  const setBookingStatus = async (id, newStatus) => {
    await api.put(`/bookings/${id}/status?status=${newStatus}`);
    await load();
  };

  const del = async (id) => {
    if (!window.confirm("Supprimer ?")) return;
    await api.delete(`/bookings/${id}`);
    await load();
  };

  const filtered = bookings.filter(b => b.status === tab);

  return (
    <div className="pb-32 min-h-screen" data-testid="admin-bookings">
      <ScreenHeader title="Réservations" />

      <div className="flex gap-2 px-5 pb-3 overflow-x-auto scrollbar-hide">
        {[
          { k: "pending", l: "En attente" },
          { k: "confirmed", l: "Confirmés" },
          { k: "cancelled", l: "Annulés" },
        ].map(t => (
          <button key={t.k} onClick={() => setTab(t.k)} data-testid={`book-tab-${t.k}`}
            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap ${tab === t.k ? "bg-[#FF1493] text-white glow-pink-sm" : "bg-[#1A1A1A] border border-[#2A2A2A] text-white/60"}`}>
            {t.l}
          </button>
        ))}
      </div>

      <div className="px-5 space-y-3">
        {filtered.length === 0 && <p className="text-white/40 text-center py-10">Aucune réservation</p>}
        {filtered.map(b => (
          <div key={b.id} className="bg-[#111111] border border-white/5 rounded-[22px] p-4" data-testid={`booking-${b.id}`}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-white font-semibold">{b.client_name}</p>
                <p className="text-[#FF1493] text-sm font-medium mt-1">{b.prestation_title}</p>
                <div className="flex items-center gap-3 mt-2 text-white/60 text-xs">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {b.date} • {b.time}</span>
                </div>
                <a href={`tel:${b.client_phone}`} className="flex items-center gap-1 text-white/60 text-xs mt-1">
                  <Phone size={12} /> {b.client_phone}
                </a>
                {b.note && <p className="text-white/40 text-xs mt-2 italic">{`"${b.note}"`}</p>}
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              {b.status !== "confirmed" && (
                <button onClick={() => setBookingStatus(b.id, "confirmed")} data-testid={`confirm-${b.id}`} className="flex-1 bg-green-500/15 text-green-400 rounded-full py-2 text-sm font-medium flex items-center justify-center gap-1">
                  <Check size={14} /> Confirmer
                </button>
              )}
              {b.status !== "cancelled" && (
                <button onClick={() => setBookingStatus(b.id, "cancelled")} data-testid={`cancel-${b.id}`} className="flex-1 bg-white/5 text-white/60 rounded-full py-2 text-sm font-medium flex items-center justify-center gap-1">
                  <X size={14} /> Annuler
                </button>
              )}
              <button onClick={() => del(b.id)} data-testid={`del-book-${b.id}`} className="bg-red-500/15 text-red-400 rounded-full px-3 py-2 text-sm font-medium flex items-center justify-center">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
