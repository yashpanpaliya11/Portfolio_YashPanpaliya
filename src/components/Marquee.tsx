import { useEffect, useRef } from 'react';

const ITEMS = [
  "REACT", "TYPESCRIPT", "FIREBASE", "AI AUTOMATION", "N8N", "GEMINI API", "TAILWIND"
];

export default function Marquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full bg-text-primary text-bg-main py-3 md:py-4 overflow-hidden flex whitespace-nowrap">
      <div className="flex animate-marquee">
        {/* Double array for seamless loop */}
        {[...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
          <div key={i} className="flex items-center mx-6">
            <span className="font-mono text-xs tracking-[0.2em] font-medium uppercase">{item}</span>
            <span className="mx-6 text-accent">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}
