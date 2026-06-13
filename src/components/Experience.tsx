import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

  export default function Experience() {
    const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Keeping useGSAP for structure but removing curtain animation
  }, { scope: container });

  return (
    <section id="experience" ref={container} className="relative flex flex-col px-6 py-20 md:px-12 md:py-28 lg:px-16 lg:py-32 bg-bg-main overflow-hidden">
      <div className="w-full max-w-7xl mx-auto relative z-10">
        <div className="section-eyebrow mb-12">
          EXPERIENCE // HIGHLIGHT
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-20 max-w-2xl font-light text-shine">
          Experience.
        </h2>

        <div className="flex flex-col gap-8">
          <div 
            className="relative flex flex-col md:flex-row gap-6 md:gap-8 bg-bg-main border border-border-main p-6 md:p-8 rounded-lg overflow-hidden group hover:border-border-hover transition-colors"
          >
            {/* Subtle left accent */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-border-main group-hover:bg-accent transition-colors"></div>

            <div className="shrink-0 flex items-start pt-1">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-border-main p-1 bg-black/50 overflow-hidden shrink-0 group-hover:border-accent transition-colors duration-500 flex items-center justify-center font-sans font-medium text-3xl text-accent">
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
                <span className="inline-block px-3 py-1 font-mono text-[10px] uppercase tracking-wider border border-accent/30 bg-accent/10 text-accent rounded-sm">
                  AI Automation
                </span>
                <span className="inline-block px-3 py-1 font-mono text-[10px] uppercase tracking-wider border border-border-main bg-bg-secondary text-text-muted rounded-sm">
                  n8n
                </span>
                <span className="inline-block px-3 py-1 font-mono text-[10px] uppercase tracking-wider border border-border-main bg-bg-secondary text-text-muted rounded-sm">
                  Communication
                </span>
                <span className="inline-block px-3 py-1 font-mono text-[10px] uppercase tracking-wider border border-border-main bg-bg-secondary text-text-muted rounded-sm">
                  JavaScript
                </span>
                <span className="inline-block px-3 py-1 font-mono text-[10px] uppercase tracking-wider border border-border-main bg-bg-secondary text-text-muted rounded-sm">
                  Content Strategy
                </span>
              </div>
            </div>
          </div>

          <div 
            className="relative flex flex-col md:flex-row gap-6 md:gap-8 bg-bg-main border border-border-main p-6 md:p-8 rounded-lg overflow-hidden group hover:border-border-hover transition-colors"
          >
            {/* Subtle left accent */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-border-main group-hover:bg-accent transition-colors"></div>

            <div className="shrink-0 flex items-start pt-1">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-border-main p-1 bg-black/50 overflow-hidden shrink-0 group-hover:border-accent transition-colors duration-500">
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
                <span className="inline-block px-3 py-1 font-mono text-[10px] uppercase tracking-wider border border-accent/30 bg-accent/10 text-accent rounded-sm">
                  Flagship Event — Tekron
                </span>
              </div>
            </div>

            <div className="shrink-0 w-full sm:w-48 md:w-56 mt-6 md:mt-0 rounded-lg overflow-hidden border border-border-main bg-bg-main group-hover:border-border-hover transition-colors relative self-start">
              <div className="absolute inset-0 bg-accent/5 pointer-events-none group-hover:bg-transparent transition-colors z-10"></div>
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
