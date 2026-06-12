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

  useGSAP(() => {
    // Basic setup if any future timelines are needed
  }, { scope: container });

  return (
    <section id="journey" ref={container} className="relative border-b border-border-main flex flex-col items-start p-8 md:p-12 lg:p-16 bg-bg-secondary overflow-hidden">
      <div className="w-full relative z-10">
        <div className="section-eyebrow mb-12">
          02 // CAREER HIGHLIGHTS
        </div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-20 max-w-2xl font-light">
          The Journey So Far.
        </h2>
        
        <div className="relative pl-6 md:pl-10">
          <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-border-hover"></div>
          
          <div className="space-y-16">
            {TIMELINE_DATA.map((item, index) => (
              <div key={index} className="relative">
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
