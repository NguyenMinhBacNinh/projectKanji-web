'use client';
import { useEffect, useState } from 'react';

export default function SakuraPetals() {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const list = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 10 + 7,
      duration: Math.random() * 8 + 8,
      delay: Math.random() * 6,
      // Cánh hoa lắc lư kiểu khác nhau
      sway: Math.random() * 80 + 60,
      rotation: Math.random() * 360,
    }));
    setPetals(list);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <div
          key={p.id}
          className="sakura-petal"
          style={{
            left: `${p.left}vw`,
            width: `${p.size}px`,
            height: `${p.size * 1.4}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}
