import React from "react";
import ScreenHeader from "@/components/ScreenHeader";
import { useApp } from "@/context/AppContext";
import { Phone, MessageCircle, Instagram, MapPin, Clock, ChevronRight } from "lucide-react";

export default function ContactScreen() {
  const { settings } = useApp();
  if (!settings) return null;

  const items = [
    {
      icon: Phone,
      title: "Téléphone",
      subtitle: settings.phone,
      action: () => window.location.href = `tel:${settings.phone.replace(/\s/g, '')}`,
      testid: "contact-phone",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      subtitle: "Discuter avec nous",
      action: () => window.open(`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`, "_blank"),
      testid: "contact-whatsapp",
    },
    {
      icon: Instagram,
      title: "Instagram",
      subtitle: settings.instagram,
      action: () => window.open(settings.instagram_url, "_blank"),
      testid: "contact-instagram",
    },
    {
      icon: MapPin,
      title: "Adresse",
      subtitle: settings.address,
      action: () => window.open(`https://maps.google.com/?q=${encodeURIComponent(settings.address)}`, "_blank"),
      testid: "contact-address",
    },
    {
      icon: Clock,
      title: "Horaires",
      subtitle: `${settings.hours_weekday}\n${settings.hours_weekend}`,
      action: null,
      testid: "contact-hours",
    },
  ];

  return (
    <div className="pb-32 min-h-screen relative" data-testid="contact-screen">
      <ScreenHeader title="Contact" />

      {/* Decorative bottle image */}
      <div className="absolute top-32 right-0 opacity-25 pointer-events-none">
        <img src="https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=400"
          alt="" className="w-48 h-72 object-cover" style={{ maskImage: 'linear-gradient(to left, black, transparent)', WebkitMaskImage: 'linear-gradient(to left, black, transparent)' }} />
      </div>

      <div className="px-5 mt-2 space-y-3 relative z-10">
        {items.map((item, i) => {
          const Icon = item.icon;
          const Wrapper = item.action ? 'button' : 'div';
          return (
            <Wrapper
              key={i}
              onClick={item.action || undefined}
              data-testid={item.testid}
              className={`w-full bg-[#111111] border border-white/5 rounded-[22px] p-4 flex items-center gap-4 ${item.action ? 'active:scale-[0.98] transition-transform hover:border-[#FF1493]/30' : ''}`}
            >
              <div className="w-12 h-12 rounded-2xl bg-[#FF1493]/15 flex items-center justify-center shrink-0 glow-pink-sm">
                <Icon size={22} className="text-[#FF1493]" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-white font-semibold text-base">{item.title}</p>
                <p className="text-white/55 text-xs mt-0.5 whitespace-pre-line">{item.subtitle}</p>
              </div>
              {item.action && <ChevronRight size={20} className="text-white/30" />}
            </Wrapper>
          );
        })}
      </div>
    </div>
  );
}
