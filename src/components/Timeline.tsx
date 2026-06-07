import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const TIMELINE_DATA = [
  {
    year: "2026",
    title: "Full-Stack & UI Engineering",
    desc: "Developed scalable platforms like CRM Dashboard and Microsoft Clone using React, JavaScript, Firebase, and React Router."
  },
  {
    year: "2026",
    title: "Flagship Event Manager",
    desc: "Led end-to-end execution of 'Tekron' at Newton School of Technology, ensuring smooth coordination among cross-functional teams."
  },
  {
    year: "2025",
    title: "AI & Automation Integrations",
    desc: "Built Dukaan Mate using Google Gemini API. Explored RAG pipelines, Hugging Face, and n8n automation workflows."
  },
  {
    year: "2024",
    title: "Foundations & Problem Solving",
    desc: "Started B.Tech CSE. Gained solid problem-solving ability in DSA and mastered core web fundamentals (HTML5, CSS3, JS)."
  }
];

export default function Timeline() {
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
    .fromTo('.timeline-line',
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: "top",
        duration: 1.5,
        ease: "power2.inOut",
      },
      "-=0.6"
    )
    .fromTo('.timeline-item',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      },
      "-=1.2"
    );
  }, { scope: container });

  return (
    <section id="journey" ref={container} className="relative border-b border-border-main flex flex-col items-start p-8 md:p-12 lg:p-16 bg-bg-secondary overflow-hidden">
      {/* Curtain Overlay */}
      <div ref={overlayRef} className="absolute inset-0 bg-bg-main z-50 pointer-events-none"></div>

      <div className="w-full relative z-10">
        <div className="section-eyebrow mb-12">
          02 // CAREER HIGHLIGHTS
        </div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-20 max-w-2xl font-light">
          The Journey So Far.
        </h2>
        
        <div className="relative pl-6 md:pl-10">
          <div className="timeline-line absolute left-0 top-2 bottom-2 w-[1px] bg-border-hover"></div>
          
          <div className="space-y-16">
            {TIMELINE_DATA.map((item, index) => (
              <div key={index} className="timeline-item relative">
                {/* Accent dot */}
                <div className="absolute -left-[28px] md:-left-[44px] top-1.5 w-2 h-2 rounded-full bg-text-primary shadow-[0_0_8px_rgba(255,255,255,0.5)]"></div>
                
                <div className="flex flex-col md:flex-row md:gap-12 gap-3 items-start">
                  <div className="font-mono text-accent w-20 shrink-0 mt-1">
                    {item.year}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-medium mb-3 text-text-primary bg-bg-card border border-border-main inline-block px-4 py-1.5 rounded-sm">
                      {item.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed max-w-xl text-sm md:text-base mt-2">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
