import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ArrowDown, Download } from 'lucide-react';
import { playHoverSound } from '../utils/audio';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const leftText = useRef<HTMLHeadingElement>(null);
  const rightText = useRef<HTMLHeadingElement>(null);
  const subCopy = useRef<HTMLDivElement>(null);
  const ctaGroup = useRef<HTMLDivElement>(null);
  const imageReveal = useRef<HTMLDivElement>(null);
  const heroContent = useRef<HTMLDivElement>(null);
  const scrollIndicator = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // Initial Load Animation
    const tl = gsap.timeline();
    
    tl.fromTo(leftText.current, 
      { x: "-15vw", opacity: 0, filter: 'blur(10px)' },
      { x: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: "back.out(1.5)", delay: 0.2 }
    )
    .fromTo(rightText.current,
      { x: "15vw", opacity: 0, filter: 'blur(10px)' },
      { x: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: "back.out(1.5)" },
      "<" 
    )
    .fromTo(imageReveal.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(subCopy.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(ctaGroup.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(scrollIndicator.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.2"
    );

    // Scroll fade out
    gsap.to(scrollIndicator.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=300",
        scrub: true,
      }
    });

  }, { scope: container });

  return (
    <section ref={container} className="relative min-h-screen flex flex-col md:flex-row bg-bg-main overflow-hidden">
      <div ref={heroContent} className="w-full md:w-[55%] lg:w-[60%] shrink-0 px-6 py-24 md:px-12 lg:px-16 xl:px-24 flex flex-col justify-center relative z-20" data-speed="1.1">
        <div className="section-eyebrow mb-8">
          DEVELOPER. BUILDER. STUDENT.
        </div>
        
        <div className="mb-10 space-y-2">
          <h1 ref={leftText} className="text-5xl sm:text-6xl md:text-[84px] tracking-tighter !leading-[0.9] opacity-0 font-light text-shine">
            React Developer.
          </h1>
          <br />
          <h1 ref={rightText} className="text-5xl sm:text-6xl md:text-[84px] tracking-tighter !leading-[0.9] opacity-0 font-light text-shine-muted">
            & AI Builder.
          </h1>
        </div>
        
        <div ref={subCopy} className="flex flex-col md:flex-row md:items-start lg:items-center gap-6 opacity-0 max-w-3xl">
          <div className="flex items-center gap-2 px-4 py-2 border border-border-main rounded-full shrink-0 max-w-fit">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-text-primary">Open to Internships</span>
          </div>
          <div className="flex flex-col gap-3 text-sm md:text-base text-text-secondary leading-relaxed bg-bg-main/80 backdrop-blur-sm rounded-md p-4 -ml-4 border border-border-main/50">
            <div className="flex items-center gap-3 group">
              <div className="w-1.5 h-1.5 bg-accent/50 group-hover:bg-accent transition-colors rounded-none"></div>
              <span><span className="text-text-primary font-medium">Shipping AI automation</span> at Observal</span>
            </div>
            <div className="flex items-center gap-3 group">
              <div className="w-1.5 h-1.5 bg-accent/50 group-hover:bg-accent transition-colors rounded-none"></div>
              <span><span className="text-text-primary font-medium">Founding Intern</span> @ Campus Connect</span>
            </div>
            <div className="flex items-center gap-3 group">
              <div className="w-1.5 h-1.5 bg-accent/50 group-hover:bg-accent transition-colors rounded-none"></div>
              <span><span className="text-text-primary font-medium">Tech:</span> n8n · Python · React</span>
            </div>
            <div className="flex items-center gap-3 group">
              <div className="w-1.5 h-1.5 bg-accent/50 group-hover:bg-accent transition-colors rounded-none"></div>
              <span><span className="text-text-primary font-medium">CSE</span> @ Newton School of Technology</span>
            </div>
            <div className="flex items-center gap-3 group">
              <div className="w-1.5 h-1.5 bg-accent/50 group-hover:bg-accent transition-colors rounded-none"></div>
              <span className="text-accent tracking-wide uppercase text-xs font-mono">Builder by nature 🚀</span>
            </div>
          </div>
        </div>
        
        <div ref={ctaGroup} className="flex flex-wrap items-center gap-4 md:gap-6 opacity-0 w-full mt-12 bg-bg-main/80 backdrop-blur-sm p-4 -ml-4 rounded-md">
          <a href="#projects" onMouseEnter={playHoverSound} className="px-6 py-3 bg-text-primary text-bg-main font-medium text-sm rounded-sm hover:bg-accent hover:text-bg-main transition-colors">
            Selected Work ↓
          </a>
          <a href="https://drive.google.com/file/d/1UWQMmvCfsO03JCy01V1CrQc7BB_RJ-RW/view?usp=sharing" onMouseEnter={playHoverSound} target="_blank" rel="noopener noreferrer" className="group relative px-6 py-3 bg-accent/10 border border-accent/40 text-accent font-medium text-sm rounded-sm overflow-hidden transition-all hover:bg-accent/20 hover:border-accent hover:shadow-[0_0_15px_rgba(0,255,136,0.3)] flex items-center gap-2">
            <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-accent/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <Download className="w-5 h-5 drop-shadow-sm stroke-[2] group-hover:-translate-y-0.5 transition-transform relative z-10" /> 
            <span className="relative z-10">Download Resume</span>
          </a>
        </div>
        
        <div ref={scrollIndicator} className="absolute bottom-12 left-8 md:left-12 lg:left-16 xl:left-24 flex items-center gap-2 text-text-muted font-mono text-[10px] uppercase tracking-wider opacity-0">
          <div className="w-5 h-8 border border-text-muted/50 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-text-muted rounded-full animate-bounce"></div>
          </div>
          Scroll to explore
        </div>
      </div>

      <div 
        className="w-full md:w-[45%] lg:w-[40%] min-h-[50vh] md:min-h-screen relative flex items-center justify-center bg-bg-main z-10 overflow-hidden"
        onMouseMove={(e) => {
          if (!imageReveal.current) return;
          const wrapper = imageReveal.current.querySelector('.tilt-wrapper');
          if (!wrapper) return;
          const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - left) / width;
          const y = (e.clientY - top) / height;
          const rotateY = (x - 0.5) * 20;
          const rotateX = (0.5 - y) * 20;
          
          gsap.to(wrapper, {
            rotateX,
            rotateY,
            scale: 1.05,
            duration: 0.5,
            ease: "power2.out",
            transformPerspective: 1000,
            transformOrigin: "center center"
          });
        }}
        onMouseLeave={() => {
          if (!imageReveal.current) return;
          const wrapper = imageReveal.current.querySelector('.tilt-wrapper');
          if (!wrapper) return;
          gsap.to(wrapper, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 1,
            ease: "power2.out",
          });
        }}
      >
        <div className="absolute top-0 right-0 p-6 font-mono text-[10px] text-text-muted uppercase hidden md:block z-20" data-lag="0.3">
          Status // Active
        </div>
        <div ref={imageReveal} className="absolute inset-0 w-full h-full opacity-0 z-10" data-speed="0.8">
          <div className="tilt-wrapper w-full h-full">
            <img 
              src="https://i.ibb.co/Q7mFQGG2/selfimg.jpg" 
              alt="Yash Panpaliya" 
              className="w-full h-full object-cover object-[center_top] grayscale filter brightness-95 hover:grayscale-0 transition-all duration-500 cursor-pointer"
            />
          </div>
          <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-bg-main to-transparent pointer-events-none z-10 hidden md:block"></div>
          <div className="absolute inset-x-0 top-0 h-32 md:hidden bg-gradient-to-b from-bg-main to-transparent pointer-events-none z-10"></div>
        </div>
      </div>
    </section>
  );
}
