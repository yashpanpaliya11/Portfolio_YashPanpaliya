import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const container = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 60%",
      }
    });

    // Curtain reveal
    tl.to(overlayRef.current, {
      scaleY: 0,
      transformOrigin: "top",
      duration: 1,
      ease: "power2.inOut",
    })
    .fromTo('.section-eyebrow',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo('h2',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo('.project-card',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      },
      "-=0.4"
    );
  }, { scope: container });

  return (
    <section id="projects" ref={container} className="relative border-b border-border-main flex flex-col items-start p-8 md:p-12 lg:p-16 bg-bg-main overflow-hidden">
      {/* Curtain Overlay */}
      <div ref={overlayRef} className="absolute inset-0 bg-bg-main z-50 pointer-events-none"></div>

      <div className="w-full relative z-10">
        <div className="section-eyebrow mb-12">
          05 // SELECTED WORK
        </div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-16 max-w-2xl font-light">
          Projects & Builds.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* New Featured Full-Width Card */}
          <div className="project-card md:col-span-2 group cursor-pointer bg-[#111111] p-6 md:p-8 border border-border-main border-l-2 border-l-accent rounded-sm relative flex flex-col lg:flex-row gap-8 hover:border-text-primary/30 transition-all duration-300">
            <div className="absolute top-4 right-4 md:top-6 md:right-6 text-text-muted font-mono text-xs z-10 bg-[#111] px-2 py-1">MAY 2026 - PRESENT</div>

            <div className="flex-1 flex flex-col justify-between relative z-10">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
                  <span className="font-mono text-[10px] text-accent tracking-widest uppercase">Latest Work</span>
                </div>
                <h3 className="text-xl md:text-2xl uppercase tracking-widest mb-4">AI-Powered WhatsApp Ordering</h3>
                <ul className="text-text-secondary text-sm leading-relaxed mb-6 space-y-2">
                  <li className="flex items-start gap-2"><span className="text-text-muted mt-0.5">▹</span> Developed an AI-powered WhatsApp Restaurant Assistant for automated food ordering and customer support.</li>
                  <li className="flex items-start gap-2"><span className="text-text-muted mt-0.5">▹</span> Implemented real-time inventory checking and order management using Google Sheets.</li>
                  <li className="flex items-start gap-2"><span className="text-text-muted mt-0.5">▹</span> Built conversational AI workflows with n8n and AI Agents for seamless customer interactions.</li>
                  <li className="flex items-start gap-2"><span className="text-text-muted mt-0.5">▹</span> Automated order tracking, FAQ handling, and WhatsApp notifications, reducing manual operations.</li>
                </ul>
              </div>

              <div className="flex gap-3 font-mono text-[10px] text-text-muted tracking-wider flex-wrap mt-auto pt-6 border-t border-[#ffffff14]">
                <span>#n8n</span><span>#Automation</span><span>#AI_Agents</span><span>#Google_Sheets</span>
              </div>
            </div>

            <div className="flex-1 flex flex-col sm:flex-row gap-4 w-full min-h-[220px] lg:h-auto">
              <div className="flex-1 rounded-sm border border-border-main overflow-hidden relative bg-[#050505] group-hover:border-text-primary/30 transition-colors">
                <img 
                  src="https://i.ibb.co/35T1dykp/Screenshot-2026-05-31-at-12-47-54-AM.png" 
                  alt="n8n Automation" 
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                />
                <div className="absolute bottom-3 left-3 bg-[#000000cc] backdrop-blur-sm px-2 py-1 text-[9px] font-mono border border-[#ffffff14] text-text-primary">n8n Automation</div>
              </div>
              <div className="flex-1 rounded-sm border border-border-main overflow-hidden relative bg-[#050505] group-hover:border-text-primary/30 transition-colors">
                <img 
                  src="https://i.ibb.co/Z6DtKGGv/WHA.jpg" 
                  alt="WhatsApp Chat" 
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                />
                <div className="absolute bottom-3 left-3 bg-[#000000cc] backdrop-blur-sm px-2 py-1 text-[9px] font-mono border border-[#ffffff14] text-text-primary">WhatsApp Chat</div>
              </div>
            </div>
          </div>

          {/* Featured Large Card */}
          <div className="project-card md:col-span-2 group cursor-pointer bg-[#111111] p-6 md:p-8 border border-border-main border-l-2 border-l-accent rounded-sm relative flex flex-col lg:flex-row gap-8 hover:border-text-primary/30 transition-all duration-300">
            <div className="absolute top-4 right-4 md:top-6 md:right-6 text-text-muted font-mono text-xs z-10 bg-[#111] px-2 py-1">FEB-MAR 2026</div>

            <div className="flex-1 lg:w-2/5 flex flex-col justify-between relative z-10">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                  <span className="font-mono text-[10px] text-accent tracking-widest uppercase">Featured</span>
                </div>
                <h3 className="text-xl md:text-2xl uppercase tracking-widest mb-4">CRM Dashboard</h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  Full-stack Lead Management CRM with Firebase Auth, protected routes, and real-time pipeline tracking. Built to streamline workflow efficiency with automated reminders and an intuitive user interface.
                </p>
                
                <a href="https://crm-gharpayy.vercel.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs text-bg-main bg-accent px-4 py-2 rounded-sm hover:opacity-80 transition-opacity mb-6 font-medium tracking-wide">
                  VIEW LIVE <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
              
              <div className="flex gap-3 font-mono text-[10px] text-text-muted tracking-wider flex-wrap mt-auto pt-6 border-t border-[#ffffff14]">
                <span>#React</span><span>#Firebase</span><span>#Firestore</span><span>#TailwindCSS</span>
              </div>
            </div>

            <div className="flex-1 lg:w-3/5 flex flex-col sm:flex-row gap-4 w-full min-h-[300px] lg:h-auto">
              <div className="flex-[2] rounded-sm border border-border-main overflow-hidden relative bg-[#050505] group-hover:border-text-primary/30 transition-colors min-h-[200px]">
                <img 
                  src="https://i.ibb.co/DsC8Ssm/Screenshot-2026-05-31-at-12-58-52-AM.png" 
                  alt="CRM Dashboard Pipeline" 
                  className="absolute inset-0 w-full h-full object-cover object-left-top grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                />
                <div className="absolute bottom-3 left-3 bg-[#000000cc] backdrop-blur-sm px-2 py-1 text-[9px] font-mono border border-[#ffffff14] text-text-primary">Pipeline View</div>
              </div>
              <div className="flex-1 flex flex-col gap-4 min-h-[200px]">
                <div className="flex-1 rounded-sm border border-border-main overflow-hidden relative bg-[#050505] group-hover:border-text-primary/30 transition-colors">
                  <img 
                    src="https://i.ibb.co/PKZKtKs/Screenshot-2026-05-31-at-1-04-03-AM.png" 
                    alt="CRM Lead Details" 
                    className="absolute inset-0 w-full h-full object-cover object-top grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  />
                  <div className="absolute bottom-2 left-2 bg-[#000000cc] backdrop-blur-sm px-1.5 py-0.5 text-[8px] font-mono border border-[#ffffff14] text-text-primary">Admin</div>
                </div>
                <div className="flex-1 rounded-sm border border-border-main overflow-hidden relative bg-[#050505] group-hover:border-text-primary/30 transition-colors">
                  <img 
                    src="https://i.ibb.co/qLSgjBTP/1779904304632.jpg" 
                    alt="CRM Mobile View" 
                    className="absolute inset-0 w-full h-full object-cover object-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  />
                  <div className="absolute bottom-2 left-2 bg-[#000000cc] backdrop-blur-sm px-1.5 py-0.5 text-[8px] font-mono border border-[#ffffff14] text-text-primary">Details</div>
                </div>
              </div>
            </div>
          </div>

          <div className="project-card group cursor-pointer bg-bg-main p-6 border border-border-main rounded-sm relative flex flex-col justify-between hover:border-text-primary/30 transition-all duration-300 min-h-[240px]">
            <div className="absolute top-4 right-4 text-text-muted font-mono text-xs">2026</div>
            <div>
              <h3 className="text-sm uppercase tracking-widest mb-2 mt-4">Dukaan Mate</h3>
              <p className="text-text-secondary text-xs leading-relaxed mb-4">
                AI retail platform featuring voice "Rush Mode" via Gemini API and interactive dashboards.
              </p>
              <a href="https://dukaan-mate-final.vercel.app/#/dashboard" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs text-bg-main bg-accent px-3 py-1.5 rounded-sm hover:opacity-80 transition-opacity mb-4 font-medium tracking-wide">
                VIEW LIVE <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
            <div className="flex gap-3 font-mono text-[10px] text-text-muted tracking-wider mt-auto pt-4 border-t border-[#ffffff14]">
              <span>#React</span><span>#TS</span><span>#GeminiAPI</span>
            </div>
          </div>

          <div className="project-card group cursor-pointer bg-bg-main p-6 border border-border-main rounded-sm relative flex flex-col justify-between hover:border-text-primary/30 transition-all duration-300 min-h-[200px]">
            <div className="absolute top-4 right-4 text-text-muted font-mono text-xs">MAR-APR 2026</div>
            <div>
              <h3 className="text-sm uppercase tracking-widest mb-2 mt-4">Microsoft Clone</h3>
              <p className="text-text-secondary text-xs leading-relaxed mb-4">
                Scalable UI implementing dynamic routing, real-time search, and optimized API data rendering.
              </p>
              <a href="https://msclonenst.netlify.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs text-bg-main bg-accent px-3 py-1.5 rounded-sm hover:opacity-80 transition-opacity mb-4 font-medium tracking-wide">
                VIEW LIVE <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
            <div className="flex gap-3 font-mono text-[10px] text-text-muted tracking-wider mt-auto pt-4 border-t border-[#ffffff14]">
              <span>#React</span><span>#JS</span><span>#Router</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
