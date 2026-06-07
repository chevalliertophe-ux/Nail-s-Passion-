import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import ScreenHeader from "@/components/ScreenHeader";
import api from "@/lib/api";
import { Plus, Trash2, Edit3, X, Save } from "lucide-react";

const emptyForm = { title: "", description: "", price: 15, category: "ongles", icon: "sparkles", image_url: "", order: 0 };

export default function AdminPrestationsScreen() {
  const { prestations, refresh, isAdmin } = useApp();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(null); // null or object
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!isAdmin) navigate("/admin");
  }, [isAdmin]);

  const openNew = () => { setForm(emptyForm); setEditing("new"); };
  const openEdit = (p) => { setForm(p); setEditing(p.id); };

  const save = async () => {
    const payload = { ...form, price: parseFloat(form.price) || 0, order: parseInt(form.order) || 0 };
    if (editing === "new") await api.post("/prestations", payload);
    else await api.put(`/prestations/${editing}`, payload);
    await refresh();
    setEditing(null);
  };

  const del = async (id) => {
    if (!window.confirm("Supprimer cette prestation ?")) return;
    await api.delete(`/prestations/${id}`);
    await refresh();
  };

  return (
    <div className="pb-32 min-h-screen" data-testid="admin-prestations">
      <ScreenHeader title="Prestations" right={
        <button onClick={openNew} data-testid="add-presta" className="text-[#FF1493]"><Plus size={24} /></button>
      } />

      <div className="px-5 space-y-3">
        {prestations.map(p => (
          <div key={p.id} className="bg-[#111111] border border-white/5 rounded-[22px] p-4">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <p className="text-white font-semibold">{p.title}</p>
                <p className="text-white/45 text-xs">{p.description}</p>
                <p className="text-[#FF1493] font-bold mt-1">{p.price}€ <span className="text-white/40 text-xs font-normal ml-2 uppercase">{p.category}</span></p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(p)} data-testid={`edit-${p.id}`} className="w-10 h-10 rounded-full bg-[#FF1493]/15 flex items-center justify-center text-[#FF1493]"><Edit3 size={16} /></button>
                <button onClick={() => del(p.id)} data-testid={`del-${p.id}`} className="w-10 h-10 rounded-full bg-red-500/15 flex items-center justify-center text-red-400"><Trash2 size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-end" onClick={() => setEditing(null)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-[480px] mx-auto bg-[#0F0F0F] rounded-t-3xl p-6 border-t border-[#FF1493]/30">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-white text-xl font-semibold">{editing === "new" ? "Nouvelle prestation" : "Modifier"}</h3>
              <button onClick={() => setEditing(null)} className="text-white/60"><X size={22} /></button>
            </div>

            <div className="space-y-3">
              <input data-testid="form-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Titre" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white outline-none focus:border-[#FF1493]" />
              <input data-testid="form-desc" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white outline-none focus:border-[#FF1493]" />
              <input data-testid="form-price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Prix (€)" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white outline-none focus:border-[#FF1493]" />
              <select data-testid="form-cat" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white">
                <option value="ongles">Ongles</option>
                <option value="soins">Soins</option>
                <option value="extras">Extras</option>
              </select>
              <select data-testid="form-icon" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white">
                <option value="sparkles">Sparkles</option>
                <option value="palette">Palette</option>
                <option value="hand">Hand</option>
                <option value="refresh-cw">Refresh</option>
                <option value="shield">Shield</option>
                <option value="minus-circle">Minus</option>
              </select>
              {form.image_url && (
                <div className="rounded-xl overflow-hidden h-24 bg-black/30">
                  <img src={form.image_url} alt="" className="w-full h-full object-cover" />
                </div>
              )}
              <input data-testid="form-image" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="URL image (ou téléverser ci-dessous)" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white outline-none focus:border-[#FF1493]" />
              <label className="flex items-center gap-2 bg-[#FF1493]/10 border border-[#FF1493]/30 text-[#FF1493] rounded-xl px-3 py-2 text-sm font-medium cursor-pointer w-fit">
                Téléverser image
                <input data-testid="form-image-file" type="file" accept="image/*" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const r = new FileReader();
                  r.onload = () => setForm(prev => ({ ...prev, image_url: r.result }));
                  r.readAsDataURL(file);
                }} className="hidden" />
              </label>
              <input data-testid="form-order" type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} placeholder="Ordre" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white outline-none focus:border-[#FF1493]" />

              <button onClick={save} data-testid="form-save" className="w-full bg-[#FF1493] text-white rounded-full py-3 font-semibold flex items-center justify-center gap-2 glow-pink-sm">
                <Save size={18} /> Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
