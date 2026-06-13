import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedDivider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!lineRef.current || !containerRef.current || !dotRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 90%',
        once: true
      }
    });

    tl.fromTo(
      lineRef.current,
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1,
        opacity: 1,
        duration: 1.5,
        ease: 'expo.inOut',
        transformOrigin: 'center center'
      }
    ).fromTo(
      dotRef.current,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(2)'
      },
      '-=0.8'
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full flex items-center justify-center py-4 relative z-10 bg-transparent overflow-hidden">
      <div className="w-full max-w-screen-2xl px-8 flex items-center justify-center relative">
        <div 
          ref={lineRef} 
          className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border-main to-transparent opacity-0"
        ></div>
        <div 
          ref={dotRef}
          className="w-1.5 h-1.5 rounded-full bg-accent relative z-10 shadow-[0_0_10px_rgba(0,255,136,0.8)] opacity-0"
        ></div>
      </div>
    </div>
  );
}
