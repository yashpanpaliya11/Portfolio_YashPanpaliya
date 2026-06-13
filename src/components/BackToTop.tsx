import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { playHoverSound, playClickSound } from '../utils/audio';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button if scrolled past 80% of viewport height
      if (window.scrollY > window.innerHeight * 0.8) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check immediately on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    playClickSound();
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={scrollToTop}
      onMouseEnter={playHoverSound}
      className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 p-3 bg-bg-card border border-border-main text-text-secondary shadow-2xl shadow-black hover:text-accent hover:border-accent hover:bg-black transition-all duration-300 rounded-sm transform flex items-center justify-center ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'
      }`}
      aria-label="Back to top"
    >
      <ArrowUp className="w-5 h-5 stroke-[1.5]" />
    </button>
  );
}
