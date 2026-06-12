import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { playHoverSound } from '../utils/audio';
import { ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PAID_WORKS = [
  {
    title: "Gaming Cafe Website",
    videoUrl: "https://videotourl.com/videos/1781289284379-4cbeeafc-2c7f-4730-99b4-f7140bd879e1.mp4",
    desc: "A completely custom, modern website engineered and developed for an upcoming gaming cafe.",
    link: "https://ajexgamingcafe.netlify.app/"
  },
  {
    title: "Gym Website",
    videoUrl: "https://videotourl.com/videos/1781286123381-f1c808a4-6886-4c6c-aa0f-b27a17110497.mp4",
    desc: "An engaging, high-performance website crafted for a local fitness center.",
    link: "https://gymantra.netlify.app/"
  }
];

export default function PaidWorks() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo('.paid-line',
      { scaleX: 0 },
      {
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        },
        scaleX: 1,
        transformOrigin: "left",
        duration: 1.5,
        ease: "power2.inOut",
      }
    );
  }, { scope: container });

  return (
    <section 
      id="paid-works" 
      ref={container} 
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24 mx-auto max-w-[1600px] w-full relative min-h-screen flex items-center bg-[#070707] overflow-hidden border-t border-border-main"
    >
      <div className="w-full relative z-10">
        <div className="section-eyebrow mb-12">
          06 // FREELANCE
        </div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-8 max-w-2xl font-light text-white">
          Paid Works.
        </h2>
        <p className="text-text-secondary text-lg max-w-xl mb-16">
          A selection of commissioned website developments.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative pb-8">
          <div className="paid-line absolute bottom-0 left-0 right-0 h-[1px] bg-border-hover w-full hidden md:block"></div>
          
          {PAID_WORKS.map((work, index) => (
            <a 
              key={index}
              href={work.link}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHoverSound}
              className="group relative flex flex-col bg-[#000000] border border-[#ffffff14] p-4 rounded-lg overflow-hidden transition-colors hover:border-[#ffffff2a] cursor-pointer"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ffffff14] group-hover:bg-accent transition-colors hidden sm:block"></div>
              
              <div className="relative w-full aspect-video rounded-md overflow-hidden bg-bg-secondary mb-6 border border-border-main">
                <video 
                  src={work.videoUrl} 
                  className="w-full h-full object-cover transition-all duration-500"
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-md pointer-events-none"></div>
              </div>
              
              <div className="flex flex-col gap-2 pl-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white group-hover:text-accent transition-colors">
                    {work.title}
                  </h3>
                  <ExternalLink className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors" />
                </div>
                <p className="text-sm md:text-base text-text-secondary">
                  {work.desc}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
