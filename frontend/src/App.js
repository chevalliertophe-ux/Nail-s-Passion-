import React from "react";
import "@/App.css";
import "@/styles/vibes.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import BottomNav from "@/components/BottomNav";
import VibeEffects from "@/components/VibeEffects";
import SplashScreen from "@/pages/SplashScreen";
import HomeScreen from "@/pages/HomeScreen";
import GalleryScreen from "@/pages/GalleryScreen";
import PrestationsScreen from "@/pages/PrestationsScreen";
import ContactScreen from "@/pages/ContactScreen";
import ProfileScreen from "@/pages/ProfileScreen";
import AdminPinScreen from "@/pages/AdminPinScreen";
import AdminPanelScreen from "@/pages/AdminPanelScreen";
import AdminInfosScreen from "@/pages/AdminInfosScreen";
import AdminPrestationsScreen from "@/pages/AdminPrestationsScreen";
import AdminHorairesScreen from "@/pages/AdminHorairesScreen";
import AdminPromotionsScreen from "@/pages/AdminPromotionsScreen";
import AdminBookingsScreen from "@/pages/AdminBookingsScreen";
import AdminImagesScreen from "@/pages/AdminImagesScreen";
import AdminLoyaltyScreen from "@/pages/AdminLoyaltyScreen";
import AdminThemeScreen from "@/pages/AdminThemeScreen";
import BookingScreen from "@/pages/BookingScreen";
import LoyaltyScreen from "@/pages/LoyaltyScreen";

function NavGate() {
  const location = useLocation();
  const path = location.pathname;
  if (path === "/welcome" || path === "/admin") return null;
  return <BottomNav />;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppProvider>
          <div className="mobile-frame">
            <Routes>
              <Route path="/welcome" element={<SplashScreen />} />
              <Route path="/" element={<HomeScreen />} />
              <Route path="/galerie" element={<GalleryScreen />} />
              <Route path="/prestations" element={<PrestationsScreen />} />
              <Route path="/contact" element={<ContactScreen />} />
              <Route path="/profil" element={<ProfileScreen />} />
              <Route path="/reserver" element={<BookingScreen />} />
              <Route path="/fidelite" element={<LoyaltyScreen />} />
              <Route path="/admin" element={<AdminPinScreen />} />
              <Route path="/admin/panel" element={<AdminPanelScreen />} />
              <Route path="/admin/infos" element={<AdminInfosScreen />} />
              <Route path="/admin/prestations" element={<AdminPrestationsScreen />} />
              <Route path="/admin/horaires" element={<AdminHorairesScreen />} />
              <Route path="/admin/promotions" element={<AdminPromotionsScreen />} />
              <Route path="/admin/bookings" element={<AdminBookingsScreen />} />
              <Route path="/admin/images" element={<AdminImagesScreen />} />
              <Route path="/admin/loyalty" element={<AdminLoyaltyScreen />} />
            </Routes>
            <NavGate />
          </div>
        </AppProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
