'use client';
import { useEffect, useState } from 'react';

/**
 * Hiệu ứng cánh hoa anh đào Sakura (桜吹雪 - Sakura Fubuki)
 * Cánh hoa bay nhẹ nhàng tự nhiên với hình cánh hoa khía chữ V đặc trưng Nhật Bản.
 */
export default function SakuraPetals({ enabled = true }) {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    if (!enabled) {
      setPetals([]);
      return;
    }
    // Tạo 18 cánh hoa anh đào rải rác
    const list = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.random() * 96 + 2,
      size: Math.random() * 8 + 10, // 10px - 18px
      duration: Math.random() * 9 + 11, // 11s - 20s (bay êm dịu, không giật)
      delay: Math.random() * 8,
      rotation: Math.random() * 360,
      opacity: Math.random() * 0.4 + 0.35,
    }));
    setPetals(list);
  }, [enabled]);

  if (!enabled || petals.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden select-none" aria-hidden="true">
      {petals.map((p) => (
        <div
          key={p.id}
          className="sakura-petal-container"
          style={{
            position: 'absolute',
            left: `${p.left}vw`,
            top: '-20px',
            width: `${p.size}px`,
            height: `${p.size * 1.3}px`,
            animation: `sakuraDrift ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        >
          {/* Cánh hoa khía chữ V truyền thống Nhật Bản */}
          <svg
            viewBox="0 0 30 40"
            className="w-full h-full drop-shadow-xs"
            style={{ transform: `rotate(${p.rotation}deg)` }}
          >
            <defs>
              <linearGradient id={`sakuraGrad-${p.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbcfe8" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#f472b6" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#e11d48" stopOpacity="0.75" />
              </linearGradient>
            </defs>
            <path
              d="M15,0 C20,8 30,18 28,28 C26,36 18,39 15,38 C12,39 4,36 2,28 C0,18 10,8 15,0 Z"
              fill={`url(#sakuraGrad-${p.id})`}
            />
            {/* Vết khía lõm nhẹ ở chóp cánh hoa */}
            <path
              d="M15,0 Q13,4 11,5 Q15,4 15,0 Z"
              fill="rgba(255, 255, 255, 0.4)"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
