import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ScreenHeader from "@/components/ScreenHeader";
import { useApp } from "@/context/AppContext";
import api from "@/lib/api";
import { Calendar, Clock, User, Phone, Mail, MessageSquare, Send, CheckCircle, ExternalLink } from "lucide-react";

export default function BookingScreen() {
  const { prestations, settings } = useApp();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const presetId = params.get("prestation");

  const [form, setForm] = useState({
    client_name: "",
    client_phone: "",
    client_email: "",
    prestation_id: presetId || "",
    date: "",
    time: "",
    note: "",
  });
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedPresta = prestations.find(p => p.id === form.prestation_id);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.client_name || !form.client_phone || !form.date || !form.time || !form.prestation_id) return;
    setLoading(true);
    try {
      await api.post("/bookings", {
        ...form,
        prestation_title: selectedPresta?.title || "",
      });
      setDone(true);
    } catch (err) {
      alert("Erreur lors de l'envoi");
    }
    setLoading(false);
  };

  if (done) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-8 text-center" data-testid="booking-success">
        <div className="w-24 h-24 rounded-full bg-[#FF1493]/15 flex items-center justify-center glow-pink animate-pulse-glow">
          <CheckCircle size={48} className="text-[#FF1493]" />
        </div>
        <h2 className="font-italic-display text-white text-3xl mt-6">Demande envoyée !</h2>
        <p className="text-white/60 mt-3">Votre réservation a été transmise. Nous vous confirmerons rapidement.</p>
        <button onClick={() => navigate("/")} data-testid="back-home" className="mt-8 bg-[#FF1493] text-white rounded-full px-8 py-3 font-medium glow-pink-sm">
          Retour à l&apos;accueil
        </button>
      </div>
    );
  }

  return (
    <div className="pb-32 min-h-screen" data-testid="booking-screen">
      <ScreenHeader title="Réserver" />

      {settings?.sumup_url && (
        <div className="mx-5 mb-5 bg-gradient-to-br from-[#FF1493]/15 to-transparent border border-[#FF1493]/30 rounded-[22px] p-4">
          <p className="text-white/70 text-sm">Vous pouvez aussi réserver via notre agenda en ligne :</p>
          <button
            onClick={() => window.open(settings.sumup_url, "_blank")}
            data-testid="open-sumup"
            className="mt-3 w-full bg-[#FF1493] text-white rounded-full py-3 font-medium flex items-center justify-center gap-2 glow-pink-sm"
          >
            <ExternalLink size={16} />
            Ouvrir l&apos;agenda SumUp
          </button>
        </div>
      )}

      <form onSubmit={submit} className="px-5 space-y-3">
        <p className="text-white/60 text-sm">Ou faites une demande directement :</p>

        <div className="relative">
          <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FF1493]" />
          <input data-testid="book-name" required value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} placeholder="Votre nom" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl pl-12 pr-4 py-3 text-white outline-none focus:border-[#FF1493]" />
        </div>

        <div className="relative">
          <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FF1493]" />
          <input data-testid="book-phone" required type="tel" value={form.client_phone} onChange={(e) => setForm({ ...form, client_phone: e.target.value })} placeholder="Téléphone" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl pl-12 pr-4 py-3 text-white outline-none focus:border-[#FF1493]" />
        </div>

        <div className="relative">
          <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FF1493]" />
          <input data-testid="book-email" type="email" value={form.client_email} onChange={(e) => setForm({ ...form, client_email: e.target.value })} placeholder="Email (optionnel)" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl pl-12 pr-4 py-3 text-white outline-none focus:border-[#FF1493]" />
        </div>

        <select data-testid="book-presta" required value={form.prestation_id} onChange={(e) => setForm({ ...form, prestation_id: e.target.value })} className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white outline-none focus:border-[#FF1493]">
          <option value="">Choisir une prestation</option>
          {prestations.map(p => (
            <option key={p.id} value={p.id}>{p.title} — {p.price}€</option>
          ))}
        </select>

        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FF1493] pointer-events-none" />
            <input data-testid="book-date" required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl pl-12 pr-2 py-3 text-white outline-none focus:border-[#FF1493]" />
          </div>
          <div className="relative">
            <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FF1493] pointer-events-none" />
            <input data-testid="book-time" required type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl pl-12 pr-2 py-3 text-white outline-none focus:border-[#FF1493]" />
          </div>
        </div>

        <div className="relative">
          <MessageSquare size={18} className="absolute left-4 top-4 text-[#FF1493]" />
          <textarea data-testid="book-note" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Note (optionnel)" rows={3} className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl pl-12 pr-4 py-3 text-white outline-none focus:border-[#FF1493] resize-none" />
        </div>

        <button data-testid="book-submit" disabled={loading} type="submit" className="w-full bg-[#FF1493] text-white rounded-full py-4 font-semibold flex items-center justify-center gap-2 glow-pink-sm disabled:opacity-50 mt-2">
          <Send size={18} />
          {loading ? "Envoi..." : "Envoyer la demande"}
        </button>
      </form>
    </div>
  );
}
