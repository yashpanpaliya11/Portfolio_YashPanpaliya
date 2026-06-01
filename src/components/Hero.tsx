import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Github } from 'lucide-react';

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const leftText = useRef<HTMLHeadingElement>(null);
  const rightText = useRef<HTMLHeadingElement>(null);
  const subCopy = useRef<HTMLDivElement>(null);
  const ctaGroup = useRef<HTMLDivElement>(null);
  const imageReveal = useRef<HTMLDivElement>(null);
  const heroContent = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // Initial Load Animation
    const tl = gsap.timeline();
    
    tl.fromTo(leftText.current, 
      { x: "-15vw", opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: "back.out(1.5)", delay: 0.2 }
    )
    .fromTo(rightText.current,
      { x: "15vw", opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: "back.out(1.5)" },
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
    );

  }, { scope: container });

  return (
    <section ref={container} className="relative min-h-screen flex flex-col md:flex-row border-b border-border-main bg-bg-main overflow-hidden">
      <div ref={heroContent} className="w-full md:w-[55%] lg:w-[60%] shrink-0 p-8 md:p-12 lg:p-16 xl:p-24 flex flex-col justify-center relative z-20">
        <div className="section-eyebrow mb-8">
          DEVELOPER. BUILDER. STUDENT.
        </div>
        
        <div className="mb-10 space-y-2">
          <h1 ref={leftText} className="text-6xl md:text-[84px] tracking-tighter !leading-[0.9] opacity-0 font-light whitespace-nowrap">
            React Developer.
          </h1>
          <h1 ref={rightText} className="text-6xl md:text-[84px] tracking-tighter !leading-[0.9] opacity-0 font-light text-text-muted whitespace-nowrap">
            & AI Builder.
          </h1>
        </div>
        
        <div ref={subCopy} className="flex flex-col md:flex-row md:items-start lg:items-center gap-6 opacity-0 max-w-3xl">
          <div className="flex items-center gap-2 px-4 py-2 border border-border-main rounded-full shrink-0 max-w-fit">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-text-primary">Open to Internships</span>
          </div>
          <p className="text-sm md:text-base text-text-secondary leading-relaxed bg-bg-main/80 backdrop-blur-sm rounded-md p-2 -ml-2">
            Software engineer skilled in React, JavaScript, and Python. Building API-based applications and exploring AI tech like LLMs to build scalable solutions.
          </p>
        </div>
        
        <div ref={ctaGroup} className="flex flex-wrap items-center gap-6 opacity-0 w-full mt-12 bg-bg-main/80 backdrop-blur-sm p-4 -ml-4 rounded-md inline-flex max-w-fit">
          <a href="#projects" className="px-6 py-3 bg-text-primary text-bg-main font-medium text-sm rounded-sm hover:bg-accent hover:text-bg-main transition-colors">
            Selected Work ↓
          </a>
          <a href="https://github.com/yashpanpaliya11" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-border-main hover:border-accent hover:text-accent text-text-primary text-sm rounded-sm transition-colors flex items-center gap-2">
            <Github className="w-5 h-5 drop-shadow-sm stroke-[1.5]" /> View GitHub ↗
          </a>
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
