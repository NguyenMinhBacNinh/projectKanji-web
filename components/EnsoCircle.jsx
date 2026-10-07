'use client';

export default function EnsoCircle() {
  return (
    <svg
      className="enso-circle"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Vòng tròn thiền thư pháp Enso với nét bút lông Sumi tự nhiên */}
      <path
        d="M98 22 C 142 21, 178 55, 179 99 C 180 144, 145 179, 101 179 C 56 179, 21 144, 21 99 C 21 68, 40 40, 68 28 C 76 25, 87 23, 98 22"
        stroke="currentColor"
        strokeWidth="14"
        strokeLinecap="round"
        strokeDasharray="480"
        strokeDashoffset="15"
        className="text-torii"
        style={{
          filter: 'url(#roughpaper)',
        }}
      />
      {/* Nét cọ xơ rách đặc trưng của bút lông */}
      <path
        d="M102 24 C 138 23, 174 53, 176 96 C 177 138, 142 175, 103 176 C 63 176, 25 141, 24 99 C 24 72, 41 45, 66 33"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        className="text-torii"
        opacity="0.6"
      />
      <circle cx="178" cy="105" r="3" fill="currentColor" className="text-torii" opacity="0.4" />
      <circle cx="168" cy="148" r="2" fill="currentColor" className="text-torii" opacity="0.5" />
      <circle cx="95" cy="183" r="2.5" fill="currentColor" className="text-torii" opacity="0.4" />
      <circle cx="28" cy="120" r="2" fill="currentColor" className="text-torii" opacity="0.3" />
    </svg>
  );
}
