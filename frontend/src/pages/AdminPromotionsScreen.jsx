import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import ScreenHeader from "@/components/ScreenHeader";
import api from "@/lib/api";
import { Plus, Trash2, X, Save, Gift } from "lucide-react";

export default function AdminPromotionsScreen() {
  const { promotions, refresh, isAdmin } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "", discount: "", active: true });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isAdmin) navigate("/admin");
  }, [isAdmin]);

  const create = async () => {
    if (!form.title.trim()) return;
    await api.post("/promotions", form);
    await refresh();
    setForm({ title: "", description: "", discount: "", active: true });
    setShow(false);
  };

  const del = async (id) => {
    if (!window.confirm("Supprimer ?")) return;
    await api.delete(`/promotions/${id}`);
    await refresh();
  };

  const toggleActive = async (p) => {
    await api.put(`/promotions/${p.id}`, { ...p, active: !p.active });
    await refresh();
  };

  return (
    <div className="pb-32 min-h-screen" data-testid="admin-promos">
      <ScreenHeader title="Promotions" right={
        <button onClick={() => setShow(true)} data-testid="add-promo" className="text-[#FF1493]"><Plus size={24} /></button>
      } />

      <div className="px-5 space-y-3">
        {promotions.length === 0 && <p className="text-white/40 text-center py-10">Aucune promotion</p>}
        {promotions.map(p => (
          <div key={p.id} className="bg-[#111111] border border-white/5 rounded-[22px] p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Gift size={16} className="text-[#FF1493]" />
                  <p className="text-white font-semibold">{p.title}</p>
                  {p.discount && <span className="bg-[#FF1493]/15 text-[#FF1493] text-xs px-2 py-0.5 rounded-full">{p.discount}</span>}
                </div>
                <p className="text-white/45 text-xs mt-1">{p.description}</p>
                <button onClick={() => toggleActive(p)} data-testid={`promo-toggle-${p.id}`} className={`mt-2 text-xs px-3 py-1 rounded-full ${p.active ? "bg-green-500/15 text-green-400" : "bg-white/10 text-white/40"}`}>
                  {p.active ? "Active" : "Inactive"}
                </button>
              </div>
              <button onClick={() => del(p.id)} data-testid={`promo-del-${p.id}`} className="w-10 h-10 rounded-full bg-red-500/15 flex items-center justify-center text-red-400"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>

      {show && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-end" onClick={() => setShow(false)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-[480px] mx-auto bg-[#0F0F0F] rounded-t-3xl p-6 border-t border-[#FF1493]/30">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-white text-xl font-semibold">Nouvelle promotion</h3>
              <button onClick={() => setShow(false)} className="text-white/60"><X size={22} /></button>
            </div>
            <div className="space-y-3">
              <input data-testid="promo-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Titre" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white outline-none focus:border-[#FF1493]" />
              <input data-testid="promo-desc" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white outline-none focus:border-[#FF1493]" />
              <input data-testid="promo-disc" value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} placeholder="Réduction (ex: -20%)" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white outline-none focus:border-[#FF1493]" />
              <button onClick={create} data-testid="promo-save" className="w-full bg-[#FF1493] text-white rounded-full py-3 font-semibold flex items-center justify-center gap-2 glow-pink-sm">
                <Save size={18} /> Créer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
