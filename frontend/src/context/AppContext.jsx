import React, { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [prestations, setPrestations] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [adminToken, setAdminToken] = useState(localStorage.getItem("np_admin_token") || null);
  const [loading, setLoading] = useState(true);
  const [localTheme, setLocalTheme] = useState(localStorage.getItem("np_theme"));

  const isAdmin = !!adminToken;

  const refresh = async () => {
    try {
      const [s, p, g, promo] = await Promise.all([
        api.get("/settings/public"),
        api.get("/prestations"),
        api.get("/gallery"),
        api.get("/promotions"),
      ]);
      setSettings(s.data);
      setPrestations(p.data);
      setGallery(g.data);
      setPromotions(promo.data);
    } catch (e) {
      console.error("refresh error", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  // Apply theme: localTheme wins for non-admin, otherwise settings.theme
  useEffect(() => {
    const t = localTheme || settings?.theme || "dark";
    document.documentElement.dataset.theme = t;
  }, [settings, localTheme]);

  // listen for local theme changes (from ProfileScreen toggleTheme)
  useEffect(() => {
    const handler = () => setLocalTheme(localStorage.getItem("np_theme"));
    window.addEventListener("themechange", handler);
    return () => window.removeEventListener("themechange", handler);
  }, []);

  const loginAdmin = async (pin) => {
    const res = await api.post("/admin/login", { pin });
    const token = res.data.token;
    localStorage.setItem("np_admin_token", token);
    setAdminToken(token);
    return token;
  };

  const logoutAdmin = async () => {
    try { await api.post("/admin/logout"); } catch (e) { /* ignore */ }
    localStorage.removeItem("np_admin_token");
    setAdminToken(null);
  };

  return (
    <AppContext.Provider value={{
      settings, prestations, gallery, promotions,
      isAdmin, adminToken, loginAdmin, logoutAdmin,
      refresh, loading,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
