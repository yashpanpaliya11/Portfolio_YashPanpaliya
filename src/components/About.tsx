import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const container = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 60%", // Start earlier to trigger the curtain
      }
    });

    // Curtain reveal
    tl.to(overlayRef.current, {
      scaleY: 0,
      transformOrigin: "top",
      duration: 1,
      ease: "power2.inOut",
    })
    // Fade up stagger on scroll
    .fromTo(".about-element",
      { y: 40, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.15, 
        ease: "power2.out",
      },
      "-=0.6"
    );

    // Stats count up
    const stats = gsap.utils.toArray('.stat-num');
    stats.forEach((stat: any) => {
      const target = parseFloat(stat.getAttribute('data-target') || '0');
      gsap.to(stat, {
        innerHTML: target,
        duration: 2,
        ease: "power2.out",
        snap: { innerHTML: 1 }, 
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          once: true
        },
        onUpdate: function() {
          if(target % 1 !== 0) {
             stat.innerHTML = Number(this.targets()[0].innerHTML).toFixed(2);
          }
        }
      });
    });

  }, { scope: container });

  return (
    <section id="about" ref={container} className="relative border-b border-border-main flex flex-col items-start p-8 md:p-12 lg:p-16 bg-bg-main overflow-hidden">
      {/* Curtain Overlay */}
      <div ref={overlayRef} className="absolute inset-0 bg-bg-main z-50 pointer-events-none"></div>

      <div className="w-full relative z-10">
        <div className="about-element section-eyebrow">
          01 // WHO I AM
        </div>
        
        <h2 className="about-element text-4xl md:text-5xl lg:text-6xl tracking-tight mb-12 max-w-3xl font-light">
          A Builder Who Ships.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-16">
          <div className="space-y-6 text-text-secondary md:text-lg leading-relaxed font-light">
            <p className="about-element">
              I am a B.Tech CSE student (Class of 2029) at Ajeenkya DY Patil University (Newton School of Technology). I am a software engineer skilled in React, Python, and JavaScript, with a strong foundation in DSA.
            </p>
            <p className="about-element">
              My core focus involves developing API-based applications and exploring AI technologies—like LLMs, Vector Databases, and Hugging Face—to build scalable and intelligent solutions.
            </p>
          </div>
          
          <div className="about-element flex flex-col justify-end">
            <div className="bg-bg-secondary p-6 border border-border-main rounded-sm h-fit w-full max-w-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-mono uppercase tracking-wider text-text-primary">Open to internships</span>
              </div>
              <div className="border-t border-border-main my-2"></div>
              <div className="grid grid-cols-[1rem_1fr] gap-3 text-text-secondary text-xs font-mono">
                <span>📍</span> <span>Pune, Maharashtra, India</span>
                <span>🎓</span> <span>Ajeenkya DY Patil University</span>
                <span>💻</span> <span>B.Tech CSE (2029)</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="about-element grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-border-main">
          <div className="flex flex-col gap-2">
            <div className="text-4xl md:text-5xl font-light text-text-primary">
              <span className="stat-num" data-target="4">0</span>+
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted">Live Projects</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-4xl md:text-5xl font-light text-text-primary">
              <span className="stat-num" data-target="100">0</span>+
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted">LeetCode</div>
          </div>
          <div className="flex flex-col gap-2 items-start">
            <div className="text-4xl md:text-5xl font-light text-text-primary bg-bg-secondary px-4 py-2 border border-border-main rounded-sm">
              <span className="stat-num" data-target="8.43">0</span>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted mt-2">CGPA</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-4xl md:text-5xl font-light text-text-primary">
              <span className="stat-num" data-target="2">0</span>nd
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted">Year</div>
          </div>
        </div>
      </div>
    </section>
  );
}
