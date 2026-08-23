import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Mail, Linkedin, Github, Rocket, Send, Calendar } from 'lucide-react';
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
    <section id="contact" ref={container} className="relative flex flex-col items-start px-6 py-24 md:px-12 md:py-32 lg:px-16 lg:py-48 bg-bg-secondary overflow-hidden">
      <div className="w-full max-w-7xl mx-auto relative z-10 flex flex-col xl:flex-row gap-16 md:gap-24 justify-between">
        
        <div className="w-full xl:max-w-xl">
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
        
        <div className="w-full xl:max-w-xl flex-shrink-0 flex flex-col gap-16">
          <div className="w-full">
            {showCalendar ? (
              <div className="animate-[fadeIn_0.5s_ease-out]">
                <CalBooking />
              </div>
            ) : (
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
            )}
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
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-5">
                    <div className="text-accent group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300 drop-shadow-[0_4px_4px_rgba(0,255,136,0.2)] bg-bg-card p-3 rounded-full border border-border-main group-hover:border-accent">
                      <Mail className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <span className="font-mono text-text-secondary group-hover:text-accent transition-colors block overflow-hidden relative flex-1">
                      <span className="block transition-transform duration-300 group-hover:-translate-y-full">Email</span>
                      <span className="block transition-transform duration-300 absolute top-full left-0 group-hover:-translate-y-full text-accent normal-case tracking-normal">yashpanpaliya11@gmail...</span>
                    </span>
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
              >
                <div className="flex items-center gap-5 w-full">
                  <div className="text-accent group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 drop-shadow-[0_4px_4px_rgba(0,255,136,0.2)] bg-bg-card p-3 rounded-full border border-border-main group-hover:border-accent">
                    <Linkedin className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <span className="font-mono text-text-secondary group-hover:text-accent transition-colors block overflow-hidden relative flex-1">
                    <span className="block transition-transform duration-300 group-hover:-translate-y-full">LinkedIn</span>
                    <span className="block transition-transform duration-300 absolute top-full left-0 group-hover:-translate-y-full text-accent normal-case tracking-normal">yash-panpaliya</span>
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-accent transition-all duration-300 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
              </a>

              <a 
                href="https://github.com/yashpanpaliya11" 
                target="_blank" rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                className="group flex items-center justify-between py-6 border-b border-border-main hover:border-accent transition-colors"
              >
                <div className="flex items-center gap-5 w-full">
                  <div className="text-accent group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300 drop-shadow-[0_4px_4px_rgba(0,255,136,0.2)] bg-bg-card p-3 rounded-full border border-border-main group-hover:border-accent">
                    <Github className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <span className="font-mono text-text-secondary group-hover:text-accent transition-colors block overflow-hidden relative flex-1">
                    <span className="block transition-transform duration-300 group-hover:-translate-y-full">GitHub</span>
                    <span className="block transition-transform duration-300 absolute top-full left-0 group-hover:-translate-y-full text-accent normal-case tracking-normal">yashpanpaliya11</span>
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-accent transition-all duration-300 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
              </a>

              <a 
                href="https://www.fiverr.com/users/yash_panpaliya/portfolio" 
                target="_blank" rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                className="group flex items-center justify-between py-6 border-b border-border-main hover:border-accent transition-colors"
              >
                <div className="flex items-center gap-5 w-full">
                  <div className="text-accent group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 drop-shadow-[0_4px_4px_rgba(0,255,136,0.2)] bg-bg-card p-3 rounded-full border border-border-main group-hover:border-accent">
                    <Rocket className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <span className="font-mono text-text-secondary group-hover:text-accent transition-colors block overflow-hidden relative flex-1">
                    <span className="block transition-transform duration-300 group-hover:-translate-y-full">Fiverr</span>
                    <span className="block transition-transform duration-300 absolute top-full left-0 group-hover:-translate-y-full text-accent normal-case tracking-normal">@yash_panpaliya</span>
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-accent transition-all duration-300 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
              </a>

            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
