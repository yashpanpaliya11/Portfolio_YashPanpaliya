import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

  export default function Experience() {
    const container = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 60%"
      }
    });

    tl.to(overlayRef.current, {
      scaleY: 0,
      transformOrigin: "top",
      duration: 1,
      ease: "power2.inOut",
    })
    .fromTo('.exp-eyebrow',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo('.exp-card',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" },
      "-=0.6"
    );
  }, { scope: container });

  return (
    <section id="experience" ref={container} className="relative border-b border-[#ffffff14] flex flex-col p-8 md:p-12 lg:p-16 bg-[#000000] overflow-hidden">
      {/* Curtain Overlay */}
      <div ref={overlayRef} className="absolute inset-0 bg-black z-50 pointer-events-none"></div>

      <div className="w-full relative z-10">
        <div className="exp-eyebrow font-mono text-[10px] tracking-wider text-text-muted uppercase mb-12">
          EXPERIENCE // HIGHLIGHT
        </div>

        <div className="flex flex-col gap-8">
          <div 
            className="exp-card relative flex flex-col md:flex-row gap-6 md:gap-8 bg-[#000000] border border-[#ffffff14] p-6 md:p-8 rounded-lg overflow-hidden group hover:border-[#ffffff2a] transition-colors"
          >
            {/* Subtle left accent */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ffffff14] group-hover:bg-[#00ff88] transition-colors"></div>

            <div className="shrink-0 flex items-start pt-1">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-[#ffffff14] p-1 bg-black/50 overflow-hidden shrink-0 group-hover:border-[#00ff88] transition-colors duration-500 flex items-center justify-center font-sans font-medium text-3xl text-accent">
                <img src="https://i.ibb.co/kgkVKPL7/logo.png" alt="Observal Logo" className="w-full h-full object-cover rounded-full" referrerPolicy="no-referrer" />
              </div>
            </div>

            <div className="flex flex-col flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-xl md:text-2xl font-medium text-text-primary tracking-tight">Automation Engineering Intern</h3>
                  <p className="text-base text-text-secondary mt-1">Observal (Remote)</p>
                </div>
                <div className="font-mono text-xs text-text-muted whitespace-nowrap">
                  June 2026 · Present
                </div>
              </div>

              <p className="text-text-secondary text-sm md:text-base leading-relaxed mt-4 max-w-3xl">
                Working with BlazeUp AI on growth and automation initiatives for Observal — an open source AI agent observability platform. Built automation workflows and researched developer outreach strategies.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="inline-block px-3 py-1 font-mono text-[10px] uppercase tracking-wider border border-[#00ff88]/30 bg-[#00ff88]/10 text-[#00ff88] rounded-sm">
                  AI Automation
                </span>
                <span className="inline-block px-3 py-1 font-mono text-[10px] uppercase tracking-wider border border-[#ffffff14] bg-[#ffffff0a] text-text-muted rounded-sm">
                  n8n
                </span>
                <span className="inline-block px-3 py-1 font-mono text-[10px] uppercase tracking-wider border border-[#ffffff14] bg-[#ffffff0a] text-text-muted rounded-sm">
                  Communication
                </span>
                <span className="inline-block px-3 py-1 font-mono text-[10px] uppercase tracking-wider border border-[#ffffff14] bg-[#ffffff0a] text-text-muted rounded-sm">
                  JavaScript
                </span>
                <span className="inline-block px-3 py-1 font-mono text-[10px] uppercase tracking-wider border border-[#ffffff14] bg-[#ffffff0a] text-text-muted rounded-sm">
                  Content Strategy
                </span>
              </div>
            </div>
          </div>

          <div 
            className="exp-card relative flex flex-col md:flex-row gap-6 md:gap-8 bg-[#000000] border border-[#ffffff14] p-6 md:p-8 rounded-lg overflow-hidden group hover:border-[#ffffff2a] transition-colors"
          >
            {/* Subtle left accent */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ffffff14] group-hover:bg-[#00ff88] transition-colors"></div>

          <div className="shrink-0 flex items-start pt-1">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-[#ffffff14] p-1 bg-black/50 overflow-hidden shrink-0 group-hover:border-[#00ff88] transition-colors duration-500">
              <img 
                src="https://i.ibb.co/RTSbKf6y/image.png" 
                alt="Newton School of Technology Logo" 
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="flex flex-col flex-1">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
              <div>
                <h3 className="text-xl md:text-2xl font-medium text-text-primary tracking-tight">Event Manager</h3>
                <p className="text-base text-text-secondary mt-1">Newton School of Technology</p>
              </div>
              <div className="font-mono text-xs text-text-muted whitespace-nowrap">
                Jan 2026 · 1 mo
              </div>
            </div>

            <p className="text-text-secondary text-sm md:text-base leading-relaxed mt-4 max-w-3xl">
              Led the end-to-end execution of a flagship event, utilizing project management tools and ensuring smooth coordination among cross-functional teams through regular progress updates.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-block px-3 py-1 font-mono text-[10px] uppercase tracking-wider border border-[#00ff88]/30 bg-[#00ff88]/10 text-[#00ff88] rounded-sm">
                Flagship Event — Tekron
              </span>
            </div>
          </div>

          <div className="shrink-0 w-full sm:w-48 md:w-56 mt-6 md:mt-0 rounded-lg overflow-hidden border border-[#ffffff14] bg-[#000000] group-hover:border-[#ffffff2a] transition-colors relative self-start">
            <div className="absolute inset-0 bg-[#00ff88]/5 pointer-events-none group-hover:bg-transparent transition-colors z-10"></div>
            <video 
              src="https://www.image2url.com/r2/default/videos/1780219687456-94ce01ee-6743-4c9c-8f81-cf6724174db1.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity relative z-0"
            />
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
