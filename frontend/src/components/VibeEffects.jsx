import React, { useMemo } from "react";
import { useApp } from "@/context/AppContext";

/**
 * Renders the ambient background "vibe" effect based on selected theme.
 * Sits behind app content (z-0). The .mobile-frame content should be z-10+.
 */
export default function VibeEffects() {
  const { settings } = useApp();
  const vibe = settings?.vibe || "rose-smoke";

  const glitterParticles = useMemo(() => Array.from({ length: 30 }, (_, i) => ({
    left: Math.random() * 100,
    duration: 6 + Math.random() * 8,
    delay: Math.random() * 8,
    size: 4 + Math.random() * 6,
  })), []);

  const hearts = useMemo(() => Array.from({ length: 14 }, (_, i) => ({
    left: Math.random() * 100,
    duration: 10 + Math.random() * 8,
    delay: Math.random() * 10,
  })), []);

  const butterflies = useMemo(() => Array.from({ length: 4 }, (_, i) => ({
    top: 10 + Math.random() * 70,
    duration: 16 + Math.random() * 8,
    delay: Math.random() * 12,
  })), []);

  if (vibe === "rose-smoke") return <div className="fx-smoke" aria-hidden />;

  if (vibe === "glitter-gold") return (
    <div className="fx-glitter" aria-hidden>
      {glitterParticles.map((p, i) => (
        <span key={i} className="g-particle"
          style={{ left: `${p.left}%`, animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s`, width: p.size, height: p.size }} />
      ))}
    </div>
  );

  if (vibe === "pink-dream") return (
    <div className="fx-hearts" aria-hidden>
      {hearts.map((h, i) => (
        <span key={i} className="heart" style={{ left: `${h.left}%`, animationDuration: `${h.duration}s`, animationDelay: `${h.delay}s` }}>♥</span>
      ))}
    </div>
  );

  if (vibe === "black-luxe") return <div className="fx-luxe" aria-hidden />;

  if (vibe === "lavender-magic") return (
    <div className="fx-magic" aria-hidden>
      {butterflies.map((b, i) => (
        <span key={i} className="bfly" style={{ top: `${b.top}%`, animationDuration: `${b.duration}s`, animationDelay: `${b.delay}s` }}>🦋</span>
      ))}
    </div>
  );

  return null;
}
