import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { playHoverSound } from '../utils/audio';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const container = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useGSAP(() => {
    // Keeping useGSAP for structure but removing curtain animation
    
    // Add Parallax tilt to cards
    const cards = gsap.utils.toArray<HTMLElement>('.project-card');
    
    // Check if device supports hover (ignores mobile where tilt is jittery)
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mediaQuery.matches) return;

    cards.forEach(card => {
      const q = gsap.utils.selector(card);
      
      const onMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const ax = -(rect.width / 2 - (e.clientX - rect.left)) / 40;
        const ay = (rect.height / 2 - (e.clientY - rect.top)) / 40;
        
        gsap.to(card, {
          rotateY: ax,
          rotateX: ay,
          transformPerspective: 1000,
          scale: 1.01,
          ease: "power2.out",
          duration: 0.5
        });
      };
      
      const onMouseLeave = () => {
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          ease: "power2.out",
          duration: 0.7
        });
      };
      
      card.addEventListener('mousemove', onMouseMove);
      card.addEventListener('mouseleave', onMouseLeave);
      
      return () => {
        card.removeEventListener('mousemove', onMouseMove);
        card.removeEventListener('mouseleave', onMouseLeave);
      };
    });
    
  }, { scope: container });

  return (
    <section id="projects" ref={container} className="relative border-b border-border-main flex flex-col items-start p-8 md:p-12 lg:p-16 bg-bg-main overflow-hidden">
      <div className="w-full relative z-10">
        <div className="section-eyebrow mb-12">
          05 // SELECTED WORK
        </div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-16 max-w-2xl font-light">
          Projects & Builds.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* 1. AI Voice Agent Card */}
          <div className="md:col-span-2 h-full flex flex-col perspective-[1000px]">
            <div 
              onClick={() => navigate('/project/voice-agent')}
              onMouseEnter={playHoverSound}
              className="project-card cursor-pointer group bg-[#000000] p-6 md:p-8 border border-border-main border-l-2 border-l-accent rounded-sm relative flex flex-col lg:flex-row gap-8 hover:border-text-primary/30 transition-all duration-300 w-full h-full transform-gpu"
            >
              <div className="absolute top-4 right-4 md:top-6 md:right-6 text-text-muted font-mono text-xs z-10 bg-black px-2 py-1 flex items-center gap-2">
                <span className="text-accent">●</span> COMPLETED (3 DAYS)
              </div>

              <div className="flex-1 lg:w-1/2 flex flex-col justify-between relative z-10 cursor-pointer">
                <div>
                  <div className="flex items-center gap-2 mb-4 mt-2 md:mt-0">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
                    <span className="font-mono text-[10px] text-accent tracking-widest uppercase">Latest Work / Voice AI</span>
                  </div>
                  <h3 className="text-xl md:text-2xl uppercase tracking-widest mb-4 group-hover:text-accent transition-colors">AI Voice Booking Agent</h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-6">
                    Built an end-to-end Hindi-speaking voice AI system that automatically books appointments over a phone call — no human receptionist needed. The agent naturally handles conversations, checks calendar availability, confirms slots, collects user details, and logs everything to Google Sheets automatically.
                  </p>
                  
                  <div className="flex gap-3 font-mono text-[10px] text-text-muted tracking-wider flex-wrap mb-6">
                    <span className="px-2 py-1 bg-white/5 rounded-sm border border-white/5">#ElevenLabs</span>
                    <span className="px-2 py-1 bg-white/5 rounded-sm border border-white/5">#n8n</span>
                    <span className="px-2 py-1 bg-white/5 rounded-sm border border-white/5">#Cal.com</span>
                    <span className="px-2 py-1 bg-white/5 rounded-sm border border-white/5">#Twilio</span>
                  </div>
                  
                  <div className="group relative inline-flex items-center gap-2 text-sm text-accent border border-accent/40 bg-accent/5 px-6 py-2.5 rounded-full overflow-hidden transition-all hover:bg-accent/20 hover:border-accent hover:shadow-[0_0_15px_rgba(0,255,136,0.3)] font-medium w-fit">
                    <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-accent/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
                    <span className="relative z-10 flex items-center gap-2">View Project Details <ArrowRight className="w-4 h-4" /></span>
                  </div>
                </div>
              </div>

              <div className="flex-1 lg:w-1/2 flex flex-col sm:flex-row gap-4 w-full h-full min-h-[300px]">
                <div className="flex-1 flex flex-col gap-4">
                  <div className="flex-1 rounded-sm border border-border-main overflow-hidden relative bg-[#050505] group-hover:border-text-primary/30 transition-colors">
                    <img src="https://i.ibb.co/VYQV20Z7/1780487143638.jpg" alt="Voice Agent Flow 1" className="absolute inset-0 w-full h-full object-cover grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
                  </div>
                  <div className="flex-1 rounded-sm border border-border-main overflow-hidden relative bg-[#050505] group-hover:border-text-primary/30 transition-colors">
                    <img src="https://i.ibb.co/8DXPb5JN/1780487145898.jpg" alt="Voice Agent Flow 3" className="absolute inset-0 w-full h-full object-cover grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-4">
                  <div className="flex-1 rounded-sm border border-border-main overflow-hidden relative bg-[#050505] group-hover:border-text-primary/30 transition-colors">
                    <img src="https://i.ibb.co/BHYgTC2Z/1780487142586.jpg" alt="Voice Agent Flow 2" className="absolute inset-0 w-full h-full object-cover grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
                  </div>
                  <div className="flex-1 rounded-sm border border-border-main overflow-hidden relative bg-[#050505] group-hover:border-text-primary/30 transition-colors">
                    <img src="https://i.ibb.co/mrn9LkxK/1780487143973.jpg" alt="Voice Agent Flow 4" className="absolute inset-0 w-full h-full object-cover grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. CRM Dashboard Card */}
          <div className="md:col-span-2 h-full flex flex-col perspective-[1000px]">
            <div 
              onClick={() => navigate('/project/crm-dashboard')}
              onMouseEnter={playHoverSound}
              className="project-card group cursor-pointer bg-[#000000] p-6 md:p-8 border border-border-main border-l-2 border-l-accent rounded-sm relative flex flex-col lg:flex-row gap-8 hover:border-text-primary/30 transition-all duration-300 w-full h-full transform-gpu"
            >
              <div className="absolute top-4 right-4 md:top-6 md:right-6 text-text-muted font-mono text-xs z-10 bg-black px-2 py-1">FEB-MAR 2026</div>

              <div className="flex-1 lg:w-2/5 flex flex-col justify-between relative z-10">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                    <span className="font-mono text-[10px] text-accent tracking-widest uppercase">Featured</span>
                  </div>
                  <h3 className="text-xl md:text-2xl uppercase tracking-widest mb-4 group-hover:text-accent transition-colors">CRM Dashboard</h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-6">
                    Full-stack Lead Management CRM with Firebase Auth, protected routes, and real-time pipeline tracking. Built to streamline workflow efficiency with automated reminders and an intuitive user interface.
                  </p>
                  
                  <div className="group relative inline-flex items-center gap-2 text-sm text-accent border border-accent/40 bg-accent/5 px-6 py-2.5 rounded-full overflow-hidden transition-all hover:bg-accent/20 hover:border-accent hover:shadow-[0_0_15px_rgba(0,255,136,0.3)] mb-6 font-medium w-fit">
                    <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-accent/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
                    <span className="relative z-10 flex items-center gap-2">View Project Details <ArrowRight className="w-4 h-4" /></span>
                  </div>
                </div>
                
                <div className="flex gap-3 font-mono text-[10px] text-text-muted tracking-wider flex-wrap mt-auto pt-6 border-t border-[#ffffff14]">
                  <span>#React</span><span>#Firebase</span><span>#Firestore</span><span>#TailwindCSS</span>
                </div>
              </div>

              <div className="flex-1 lg:w-3/5 flex flex-col sm:flex-row gap-4 w-full min-h-[300px] lg:h-auto pointer-events-none">
                <div className="flex-[2] rounded-sm border border-border-main overflow-hidden relative bg-[#050505] group-hover:border-text-primary/30 transition-colors min-h-[200px]">
                  <img 
                    src="https://i.ibb.co/DsC8Ssm/Screenshot-2026-05-31-at-12-58-52-AM.png" 
                    alt="CRM Dashboard Pipeline" 
                    className="absolute inset-0 w-full h-full object-cover object-left-top grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  />
                  <div className="absolute bottom-3 left-3 bg-[#000000cc] backdrop-blur-sm px-2 py-1 text-[9px] font-mono border border-[#ffffff14] text-text-primary pointer-events-none">Pipeline View</div>
                </div>
                <div className="flex-1 flex flex-col gap-4 min-h-[200px]">
                  <div className="flex-1 rounded-sm border border-border-main overflow-hidden relative bg-[#050505] group-hover:border-text-primary/30 transition-colors">
                    <img 
                      src="https://i.ibb.co/PKZKtKs/Screenshot-2026-05-31-at-1-04-03-AM.png" 
                      alt="CRM Lead Details" 
                      className="absolute inset-0 w-full h-full object-cover object-top grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                    />
                    <div className="absolute bottom-2 left-2 bg-[#000000cc] backdrop-blur-sm px-1.5 py-0.5 text-[8px] font-mono border border-[#ffffff14] text-text-primary pointer-events-none">Admin</div>
                  </div>
                  <div className="flex-1 rounded-sm border border-border-main overflow-hidden relative bg-[#050505] group-hover:border-text-primary/30 transition-colors">
                    <img 
                      src="https://i.ibb.co/qLSgjBTP/1779904304632.jpg" 
                      alt="CRM Mobile View" 
                      className="absolute inset-0 w-full h-full object-cover object-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                    />
                    <div className="absolute bottom-2 left-2 bg-[#000000cc] backdrop-blur-sm px-1.5 py-0.5 text-[8px] font-mono border border-[#ffffff14] text-text-primary pointer-events-none">Details</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Dukaan Mate Card */}
          <div className="h-full perspective-[1000px]">
            <div 
              onClick={() => navigate('/project/dukaan-mate')}
              onMouseEnter={playHoverSound}
              className="project-card group cursor-pointer bg-bg-main p-6 border border-border-main rounded-sm relative flex flex-col justify-between hover:border-text-primary/30 transition-all duration-300 min-h-[240px] h-full transform-gpu"
            >
              <div className="absolute top-4 right-4 text-text-muted font-mono text-xs">2026</div>
              <div>
                <h3 className="text-sm uppercase tracking-widest mb-2 mt-4 group-hover:text-accent transition-colors">Dukaan Mate</h3>
                <p className="text-text-secondary text-xs leading-relaxed mb-4">
                  AI retail platform featuring voice "Rush Mode" via Gemini API and interactive dashboards.
                </p>
                <div className="group relative inline-flex items-center gap-2 text-xs text-accent border border-accent/40 bg-accent/5 px-4 py-2 rounded-full overflow-hidden transition-all hover:bg-accent/20 hover:border-accent hover:shadow-[0_0_15px_rgba(0,255,136,0.3)] mb-4 font-medium w-fit">
                  <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-accent/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
                  <span className="relative z-10 flex items-center gap-2">View Project <ArrowRight className="w-3 h-3" /></span>
                </div>
              </div>
              <div className="flex gap-3 font-mono text-[10px] text-text-muted tracking-wider mt-auto pt-4 border-t border-[#ffffff14]">
                <span>#React</span><span>#TS</span><span>#GeminiAPI</span>
              </div>
            </div>
          </div>

          {/* 4. WhatsApp Ordering Card */}
          <div className="h-full perspective-[1000px]">
            <div 
              onClick={() => navigate('/project/whatsapp-bot')}
              onMouseEnter={playHoverSound}
              className="project-card group cursor-pointer bg-bg-main p-6 border border-border-main rounded-sm relative flex flex-col justify-between hover:border-text-primary/30 transition-all duration-300 min-h-[240px] h-full transform-gpu"
            >
              <div className="absolute top-4 right-4 text-text-muted font-mono text-xs">MAY 2026</div>
              <div>
                <h3 className="text-sm uppercase tracking-widest mb-2 mt-4 group-hover:text-accent transition-colors">WhatsApp AI Bot</h3>
                <p className="text-text-secondary text-xs leading-relaxed mb-4">
                  AI-powered WhatsApp Assistant for automated ordering built with n8n and AI agents.
                </p>
                <div className="group relative inline-flex items-center gap-2 text-xs text-accent border border-accent/40 bg-accent/5 px-4 py-2 rounded-full overflow-hidden transition-all hover:bg-accent/20 hover:border-accent hover:shadow-[0_0_15px_rgba(0,255,136,0.3)] mb-4 font-medium w-fit">
                  <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-accent/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
                  <span className="relative z-10 flex items-center gap-2">View Project <ArrowRight className="w-3 h-3" /></span>
                </div>
              </div>
              <div className="flex gap-3 font-mono text-[10px] text-text-muted tracking-wider mt-auto pt-4 border-t border-[#ffffff14] flex-wrap">
                <span>#n8n</span><span>#AI_Agents</span><span>#Automation</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
