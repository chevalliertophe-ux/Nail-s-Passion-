import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import ScreenHeader from "@/components/ScreenHeader";
import api from "@/lib/api";
import { Save, Upload, ImagePlus } from "lucide-react";

const IMG_FIELDS = [
  { name: "splash_image", label: "Écran d'accueil (Splash)", hint: "Image affichée au lancement" },
  { name: "home_hero_image", label: "Photo principale (cercle)", hint: "Cercle central de la page d'accueil" },
  { name: "home_card_image_1", label: "Carte service #1", hint: "Image fallback pour cartes" },
  { name: "home_card_image_2", label: "Carte service #2", hint: "Image fallback pour cartes" },
];

function ImageRow({ field, value, onChange }) {
  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-[#111111] border border-white/5 rounded-[20px] p-4">
      <p className="text-white font-semibold">{field.label}</p>
      <p className="text-white/40 text-xs mt-0.5">{field.hint}</p>

      {value && (
        <div className="mt-3 rounded-xl overflow-hidden bg-black/30 h-32">
          <img src={value} alt="" className="w-full h-full object-cover" />
        </div>
      )}

      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        data-testid={`img-url-${field.name}`}
        placeholder="URL de l'image"
        className="w-full mt-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#FF1493]"
      />

      <label className="mt-2 flex items-center gap-2 bg-[#FF1493]/10 border border-[#FF1493]/30 text-[#FF1493] rounded-xl px-3 py-2 text-sm font-medium cursor-pointer w-fit">
        <Upload size={14} />
        Téléverser depuis l&apos;appareil
        <input data-testid={`img-file-${field.name}`} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      </label>
    </div>
  );
}

export default function AdminImagesScreen() {
  const { settings, refresh, isAdmin } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!isAdmin) navigate("/admin");
  }, [isAdmin, navigate]);

  useEffect(() => {
    if (settings) {
      setForm({
        splash_image: settings.splash_image,
        home_hero_image: settings.home_hero_image,
        home_card_image_1: settings.home_card_image_1,
        home_card_image_2: settings.home_card_image_2,
      });
    }
  }, [settings]);

  const save = async () => {
    setSaving(true);
    try {
      await api.put("/settings", form);
      await refresh();
      setMsg("Enregistré ✨");
    } catch (e) {
      setMsg("Erreur");
    }
    setSaving(false);
    setTimeout(() => setMsg(""), 2500);
  };

  return (
    <div className="pb-32 min-h-screen" data-testid="admin-images">
      <ScreenHeader title="Images" right={<ImagePlus size={20} className="text-[#FF1493]" />} />

      <div className="px-5 space-y-3">
        {IMG_FIELDS.map(f => (
          <ImageRow
            key={f.name}
            field={f}
            value={form[f.name]}
            onChange={(v) => setForm({ ...form, [f.name]: v })}
          />
        ))}

        {msg && <p className="text-center text-sm text-[#FF1493]" data-testid="images-msg">{msg}</p>}

        <button onClick={save} disabled={saving} data-testid="images-save"
          className="w-full bg-[#FF1493] text-white rounded-full py-4 font-semibold flex items-center justify-center gap-2 glow-pink-sm disabled:opacity-50">
          <Save size={18} />
          {saving ? "Enregistrement..." : "Enregistrer"}
        </button>
      </div>
    </div>
  );
}
