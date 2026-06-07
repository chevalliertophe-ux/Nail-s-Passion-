import React, { useState } from "react";
import ScreenHeader from "@/components/ScreenHeader";
import { useApp } from "@/context/AppContext";
import { Plus, X } from "lucide-react";
import api from "@/lib/api";

const filters = [
  { key: "all", label: "Toutes" },
  { key: "classiques", label: "Classiques" },
  { key: "nail-art", label: "Nail Art" },
  { key: "luxury", label: "Luxury" },
];

export default function GalleryScreen() {
  const { gallery, isAdmin, refresh } = useApp();
  const [active, setActive] = useState("all");
  const [preview, setPreview] = useState(null);
  const [adding, setAdding] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [newCat, setNewCat] = useState("classiques");

  const filtered = active === "all" ? gallery : gallery.filter(g => g.category === active);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      await api.post("/gallery", { image_url: reader.result, category: newCat });
      await refresh();
      setAdding(false);
      setNewUrl("");
    };
    reader.readAsDataURL(file);
  };

  const handleAddUrl = async () => {
    if (!newUrl.trim()) return;
    await api.post("/gallery", { image_url: newUrl.trim(), category: newCat });
    await refresh();
    setAdding(false);
    setNewUrl("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette photo ?")) return;
    await api.delete(`/gallery/${id}`);
    await refresh();
  };

  return (
    <div className="pb-32 min-h-screen" data-testid="gallery-screen">
      <ScreenHeader title="Galerie" />

      {/* Filters */}
      <div className="flex gap-2 px-5 overflow-x-auto scrollbar-hide pb-4">
        {filters.map(f => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            data-testid={`gal-filter-${f.key}`}
            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              active === f.key
                ? "bg-[#FF1493] text-white glow-pink-sm"
                : "bg-[#1A1A1A] border border-[#2A2A2A] text-white/60"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid 3 cols */}
      <div className="grid grid-cols-3 gap-2 px-3">
        {filtered.map((g) => (
          <div key={g.id} className="relative aspect-[3/4] rounded-2xl overflow-hidden group">
            <img
              src={g.image_url}
              alt=""
              onClick={() => setPreview(g)}
              data-testid={`gal-img-${g.id}`}
              className="w-full h-full object-cover cursor-pointer"
            />
            {isAdmin && (
              <button
                onClick={() => handleDelete(g.id)}
                data-testid={`gal-del-${g.id}`}
                className="absolute top-1 right-1 w-7 h-7 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-white/80 hover:text-[#FF1493]"
              >
                <X size={14} />
              </button>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-3 text-center text-white/40 py-12">Aucune photo</p>
        )}
      </div>

      {/* Floating Add (admin only) */}
      {isAdmin && (
        <button
          onClick={() => setAdding(true)}
          data-testid="gal-add-btn"
          className="fixed bottom-28 right-5 w-14 h-14 rounded-full bg-[#FF1493] flex items-center justify-center glow-pink z-40 active:scale-95"
        >
          <Plus size={28} className="text-white" />
        </button>
      )}

      {/* Preview modal */}
      {preview && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setPreview(null)}>
          <button data-testid="preview-close" className="absolute top-6 right-6 text-white"><X size={28} /></button>
          <img src={preview.image_url} alt="" className="max-w-full max-h-full rounded-2xl" />
        </div>
      )}

      {/* Add modal */}
      {adding && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-end" onClick={() => setAdding(false)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-[480px] mx-auto bg-[#0F0F0F] rounded-t-3xl p-6 border-t border-[#FF1493]/30">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-white text-xl font-semibold">Ajouter une photo</h3>
              <button data-testid="add-close" onClick={() => setAdding(false)} className="text-white/60"><X size={22} /></button>
            </div>

            <label className="block text-white/60 text-sm mb-1">Catégorie</label>
            <select
              value={newCat}
              onChange={(e) => setNewCat(e.target.value)}
              data-testid="add-cat"
              className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white mb-4"
            >
              <option value="classiques">Classiques</option>
              <option value="nail-art">Nail Art</option>
              <option value="luxury">Luxury</option>
            </select>

            <label className="block text-white/60 text-sm mb-1">URL de l&apos;image</label>
            <input
              type="text"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              data-testid="add-url"
              placeholder="https://..."
              className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white mb-3"
            />
            <button onClick={handleAddUrl} data-testid="add-url-btn" className="w-full bg-[#FF1493] text-white rounded-full py-3 font-medium glow-pink-sm mb-3">
              Ajouter par URL
            </button>

            <label className="block text-white/60 text-sm mb-1">Ou téléverser depuis l&apos;appareil</label>
            <input type="file" accept="image/*" onChange={handleUpload} data-testid="add-file"
              className="w-full text-white text-sm bg-[#1A1A1A] rounded-xl p-3 border border-[#2A2A2A] file:bg-[#FF1493] file:text-white file:border-0 file:rounded-full file:px-4 file:py-2 file:mr-3" />
          </div>
        </div>
      )}
    </div>
  );
}
