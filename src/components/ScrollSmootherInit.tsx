import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function ScrollSmootherInit() {
  useEffect(() => {
    let smoother: any = null;
    
    // Initialize ScrollSmoother in a slightly delayed manner to ensure DOM is ready
    // especially useful when using React
    const initSmoother = () => {
      try {
        smoother = ScrollSmoother.create({
          wrapper: '#smooth-wrapper',
          content: '#smooth-content',
          smooth: 1.5,
          effects: true,
          smoothTouch: 0.1,
        });
      } catch (err) {
        console.error("ScrollSmoother initialization error:", err);
      }
    };

    // Use requestAnimationFrame or setTimeout to let React mount children first
    const timer = setTimeout(initSmoother, 100);

    return () => {
      clearTimeout(timer);
      if (smoother) {
        smoother.kill();
      }
    };
  }, []);

  return null;
}
