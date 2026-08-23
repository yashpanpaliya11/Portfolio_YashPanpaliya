import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Mail, Linkedin, Github, Rocket, Send, Calendar, X } from 'lucide-react';
import { playHoverSound } from '../utils/audio';
import CalBooking from './CalBooking';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const container = useRef<HTMLDivElement>(null);
  const [copyStatus, setCopyStatus] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  useGSAP(() => {
    // Basic setup
  }, { scope: container });

  return (
    <section id="contact" ref={container} className="relative flex flex-col items-start px-6 py-16 md:px-12 md:py-24 lg:px-16 lg:py-32 bg-bg-secondary overflow-hidden">
      <div className="w-full max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24">
        
        <div className="w-full flex flex-col justify-start lg:sticky lg:top-32 h-fit">
          <div className="section-eyebrow mb-12">
            06 // LET'S BUILD SOMETHING
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl tracking-tight mb-8 font-light text-shine">
            Ready to Collaborate?
          </h2>
          
          <p className="text-text-secondary text-lg leading-relaxed mb-12 font-light">
            Currently open for new opportunities, freelance work, and interesting collaborations. Typical response: within 24 hours.
          </p>
          
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-sm border border-border-main bg-bg-card font-mono text-[10px] uppercase tracking-widest text-text-secondary">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            Systems Operational
          </div>
        </div>
        
        <div className="w-full flex flex-col gap-16">
          <div className="w-full">
            <button 
              onClick={() => { playHoverSound(); setShowCalendar(true); }}
              onMouseEnter={playHoverSound}
              className="group relative inline-flex items-center justify-center gap-2 text-sm text-accent border border-accent/40 bg-accent/5 px-6 py-4 overflow-hidden transition-all hover:bg-accent/20 hover:border-accent hover:shadow-[0_0_15px_rgba(0,255,136,0.3)] font-medium w-full"
            >
              <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-accent/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
              <span className="relative z-10 flex items-center gap-2">
                BOOK APPOINTMENT
                <Calendar className="w-4 h-4 ml-2" />
              </span>
            </button>
          </div>

          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 text-sm uppercase tracking-widest pt-8 border-t border-border-main">
              
              <a 
                href="mailto:yashpanpaliya11@gmail.com" 
                onClick={(e) => {
                  e.preventDefault();
                  navigator.clipboard.writeText('yashpanpaliya11@gmail.com');
                  setCopyStatus(true);
                  setTimeout(() => setCopyStatus(false), 2000);
                }}
                onMouseEnter={playHoverSound}
                className="group flex flex-col justify-center py-6 border-b border-border-main hover:border-accent transition-colors"
                title="Email Yash Panpaliya"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-5">
                    <div className="text-accent group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300 drop-shadow-[0_4px_4px_rgba(0,255,136,0.2)] bg-bg-card p-3 rounded-full border border-border-main group-hover:border-accent">
                      <Mail className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <div className="font-mono text-text-secondary group-hover:text-accent transition-colors flex flex-col">
                      <span className="font-bold">Email</span>
                      <span className="text-accent text-xs mt-1 opacity-80 group-hover:opacity-100 transition-opacity">yashpanpaliya11@gmail.com</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-accent transition-all duration-300 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
                </div>
                {copyStatus && <div className="text-accent font-mono text-xs mt-2 transition-all">Copied to clipboard!</div>}
              </a>

              <a 
                href="https://www.linkedin.com/in/yash-panpaliya-ba95a0388/" 
                target="_blank" rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                className="group flex items-center justify-between py-6 border-b border-border-main hover:border-accent transition-colors"
                title="Yash Panpaliya LinkedIn Profile"
              >
                <div className="flex items-center gap-5 w-full">
                  <div className="text-accent group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 drop-shadow-[0_4px_4px_rgba(0,255,136,0.2)] bg-bg-card p-3 rounded-full border border-border-main group-hover:border-accent">
                    <Linkedin className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <div className="font-mono text-text-secondary group-hover:text-accent transition-colors flex flex-col">
                    <span className="font-bold">LinkedIn</span>
                    <span className="text-accent text-xs mt-1 opacity-80 group-hover:opacity-100 transition-opacity">yash-panpaliya</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-accent transition-all duration-300 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
              </a>

              <a 
                href="https://github.com/yashpanpaliya11" 
                target="_blank" rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                className="group flex items-center justify-between py-6 border-b border-border-main hover:border-accent transition-colors"
                title="Yash Panpaliya GitHub Profile"
              >
                <div className="flex items-center gap-5 w-full">
                  <div className="text-accent group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300 drop-shadow-[0_4px_4px_rgba(0,255,136,0.2)] bg-bg-card p-3 rounded-full border border-border-main group-hover:border-accent">
                    <Github className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <div className="font-mono text-text-secondary group-hover:text-accent transition-colors flex flex-col">
                    <span className="font-bold">GitHub</span>
                    <span className="text-accent text-xs mt-1 opacity-80 group-hover:opacity-100 transition-opacity">yashpanpaliya11</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-accent transition-all duration-300 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
              </a>

              <a 
                href="https://www.fiverr.com/users/yash_panpaliya/portfolio" 
                target="_blank" rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                className="group flex items-center justify-between py-6 border-b border-border-main hover:border-accent transition-colors"
                title="Yash Panpaliya Fiverr Profile"
              >
                <div className="flex items-center gap-5 w-full">
                  <div className="text-accent group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 drop-shadow-[0_4px_4px_rgba(0,255,136,0.2)] bg-bg-card p-3 rounded-full border border-border-main group-hover:border-accent">
                    <Rocket className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <div className="font-mono text-text-secondary group-hover:text-accent transition-colors flex flex-col">
                    <span className="font-bold">Fiverr</span>
                    <span className="text-accent text-xs mt-1 opacity-80 group-hover:opacity-100 transition-opacity">@yash_panpaliya</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-accent transition-all duration-300 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
              </a>

            </div>
          </div>
        </div>
        
      </div>

      {showCalendar && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/80 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="relative w-full max-w-5xl h-full max-h-[85vh] bg-bg-main border border-border-main rounded-xl overflow-hidden flex flex-col shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b border-border-main bg-bg-secondary shrink-0">
              <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">Schedule a Meeting</span>
              <button 
                onClick={() => setShowCalendar(false)}
                className="p-1 text-text-muted hover:text-accent transition-colors rounded-sm hover:bg-accent/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 w-full overflow-hidden bg-bg-main relative">
              <CalBooking />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
