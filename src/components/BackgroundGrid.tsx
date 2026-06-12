import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function BackgroundGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if device supports hover (ignores mobile)
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!mediaQuery.matches) return;
      if (!gridRef.current) return;
      
      const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1

      // Subtle tilt
      gsap.to(gridRef.current, {
        rotateX: -y * 8,
        rotateY: x * 8,
        x: -x * 20,
        y: -y * 20,
        transformPerspective: 1000,
        ease: "power2.out",
        duration: 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-bg-main flex items-center justify-center transform-gpu perspective-[1000px]"
    >
      <div 
        ref={gridRef}
        className="absolute inset-[-50%] w-[200%] h-[200%] opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #00ff88 1px, transparent 1px),
            linear-gradient(to bottom, #00ff88 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
        }}
      />
      {/* Radial gradient mask to fade grid smoothly towards edges */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--bg)_80%)]" />
    </div>
  );
}
