import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import ScreenHeader from "@/components/ScreenHeader";
import api from "@/lib/api";
import { Save } from "lucide-react";

function Field({ label, name, placeholder, type, value, onChange }) {
  return (
    <div>
      <label className="text-white/60 text-sm">{label}</label>
      <input
        type={type || "text"}
        value={value || ""}
        onChange={onChange}
        data-testid={`field-${name}`}
        placeholder={placeholder}
        className="w-full mt-1 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white focus:border-[#FF1493] outline-none"
      />
    </div>
  );
}

export default function AdminInfosScreen() {
  const { settings, refresh, isAdmin } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!isAdmin) navigate("/admin");
  }, [isAdmin, navigate]);

  useEffect(() => {
    if (settings) setForm(settings);
  }, [settings]);

  const save = async () => {
    setSaving(true);
    setMsg("");
    try {
      await api.put("/settings", form);
      await refresh();
      setMsg("Enregistré");
    } catch (e) {
      setMsg("Erreur");
    }
    setSaving(false);
    setTimeout(() => setMsg(""), 2500);
  };

  const onChange = (name) => (e) => setForm({ ...form, [name]: e.target.value });

  return (
    <div className="pb-32 min-h-screen" data-testid="admin-infos">
      <ScreenHeader title="Infos" />

      <div className="px-5 space-y-4 mt-2">
        <Field label="Nom du salon" name="salon_name" value={form.salon_name} onChange={onChange("salon_name")} />
        <Field label="Slogan" name="tagline" value={form.tagline} onChange={onChange("tagline")} />
        <Field label="Téléphone" name="phone" value={form.phone} onChange={onChange("phone")} />
        <Field label="WhatsApp (numéro intl.)" name="whatsapp" value={form.whatsapp} onChange={onChange("whatsapp")} placeholder="+33612345678" />
        <Field label="Instagram (handle)" name="instagram" value={form.instagram} onChange={onChange("instagram")} />
        <Field label="Instagram URL" name="instagram_url" value={form.instagram_url} onChange={onChange("instagram_url")} />
        <Field label="Adresse" name="address" value={form.address} onChange={onChange("address")} />
        <Field label="Lien SumUp" name="sumup_url" value={form.sumup_url} onChange={onChange("sumup_url")} />

        <div className="border-t border-[#2A2A2A] pt-4">
          <Field label="Code PIN admin (4 chiffres)" name="admin_pin" value={form.admin_pin} onChange={onChange("admin_pin")} />
        </div>

        {msg && <p className="text-center text-sm text-[#FF1493]" data-testid="infos-msg">{msg}</p>}

        <button
          onClick={save}
          disabled={saving}
          data-testid="infos-save"
          className="w-full bg-[#FF1493] text-white rounded-full py-4 font-semibold flex items-center justify-center gap-2 glow-pink-sm disabled:opacity-50"
        >
          <Save size={18} />
          {saving ? "Enregistrement..." : "Enregistrer"}
        </button>
      </div>
    </div>
  );
}
