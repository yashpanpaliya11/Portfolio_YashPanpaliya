import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Mail, Linkedin, Github, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
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
    .fromTo('.contact-element',
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
  }, { scope: container });

  return (
    <section id="contact" ref={container} className="relative border-b border-border-main flex flex-col items-start p-8 md:p-12 lg:p-16 py-32 md:py-48 bg-bg-secondary overflow-hidden">
      {/* Curtain Overlay */}
      <div ref={overlayRef} className="absolute inset-0 bg-bg-main z-50 pointer-events-none"></div>

      <div className="w-full relative z-10 flex flex-col xl:flex-row gap-16 md:gap-24 justify-between">
        
        <div className="w-full xl:max-w-xl">
          <div className="contact-element section-eyebrow mb-12">
            06 // LET'S BUILD SOMETHING
          </div>
          
          <h2 className="contact-element text-5xl md:text-6xl lg:text-7xl tracking-tight mb-8 font-light">
            Ready to Collaborate?
          </h2>
          
          <p className="contact-element text-text-secondary text-lg leading-relaxed mb-12 font-light">
            Currently open for new opportunities, freelance work, and interesting collaborations. Typical response: within 24 hours.
          </p>
          
          <div className="contact-element inline-flex items-center gap-3 px-4 py-2 rounded-sm border border-border-main bg-bg-card font-mono text-[10px] uppercase tracking-widest text-text-secondary">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            Systems Operational
          </div>
        </div>
        
        <div className="w-full xl:max-w-xl flex-shrink-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-sm uppercase tracking-widest">
            
            <a 
              href="mailto:yashpanpaliya11@gmail.com" 
              className="contact-element group flex items-center justify-between py-6 border-b border-border-main hover:border-accent transition-colors"
            >
              <div className="flex items-center gap-5 w-full">
                <div className="text-accent group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300 drop-shadow-[0_4px_4px_rgba(0,255,136,0.2)] bg-bg-card p-3 rounded-full border border-border-main group-hover:border-accent">
                  <Mail className="w-6 h-6 stroke-[1.5]" />
                </div>
                <span className="font-mono text-text-secondary group-hover:text-accent transition-colors block overflow-hidden relative flex-1">
                  <span className="block transition-transform duration-300 group-hover:-translate-y-full">Email</span>
                  <span className="block transition-transform duration-300 absolute top-full left-0 group-hover:-translate-y-full text-accent normal-case tracking-normal">yashpanpaliya11@gmail...</span>
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-accent transition-all duration-300 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
            </a>

            <a 
              href="https://www.linkedin.com/in/yash-panpaliya-ba95a0388/" 
              target="_blank" rel="noopener noreferrer"
              className="contact-element group flex items-center justify-between py-6 border-b border-border-main hover:border-accent transition-colors"
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
              className="contact-element group flex items-center justify-between py-6 border-b border-border-main hover:border-accent transition-colors"
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
              href="https://fiverr.com/yashpanpaliya" 
              target="_blank" rel="noopener noreferrer"
              className="contact-element group flex items-center justify-between py-6 border-b border-border-main hover:border-accent transition-colors"
            >
              <div className="flex items-center gap-5 w-full">
                <div className="text-accent group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 drop-shadow-[0_4px_4px_rgba(0,255,136,0.2)] bg-bg-card p-3 rounded-full border border-border-main group-hover:border-accent">
                  <Rocket className="w-6 h-6 stroke-[1.5]" />
                </div>
                <span className="font-mono text-text-secondary group-hover:text-accent transition-colors block overflow-hidden relative flex-1">
                  <span className="block transition-transform duration-300 group-hover:-translate-y-full">Fiverr</span>
                  <span className="block transition-transform duration-300 absolute top-full left-0 group-hover:-translate-y-full text-accent normal-case tracking-normal">@yashpanpaliya</span>
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-accent transition-all duration-300 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
            </a>

          </div>
        </div>
        
      </div>
    </section>
  );
}
