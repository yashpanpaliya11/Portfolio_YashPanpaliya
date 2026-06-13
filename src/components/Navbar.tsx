import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin } from 'lucide-react';
import { playHoverSound } from '../utils/audio';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!menuRef.current || !navRef.current) return;

    const links = navRef.current.querySelectorAll('.mobile-link');
    
    if (menuOpen) {
      gsap.to(menuRef.current, {
        clipPath: 'circle(150% at top right)',
        duration: 0.8,
        ease: 'power3.inOut',
        display: 'flex',
      });
      
      gsap.fromTo(
        links,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.5, 
          stagger: 0.1, 
          ease: 'power3.out',
          delay: 0.3 
        }
      );
    } else {
      gsap.to(menuRef.current, {
        clipPath: 'circle(0% at top right)',
        duration: 0.6,
        ease: 'power3.inOut',
        onComplete: () => {
          if (menuRef.current) {
            gsap.set(menuRef.current, { display: 'none' });
          }
        }
      });
    }
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Transparent to solid bg
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Auto-hide on scroll down, reveal on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHideNav(true);
        setMenuOpen(false); // Close menu on scroll down
      } else {
        setHideNav(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const links = [
    { name: 'About', href: '#about' },
    { name: 'Journey', href: '#journey' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Freelance', href: '#paid-works' },
    { name: 'Contact', href: '#contact' },
    { name: 'Kernel', href: '/kernel' },
  ];

  return (
    <>
      <aside 
        className={`hidden md:flex w-20 fixed top-0 left-0 h-screen border-r border-[#ffffff14] flex-col items-center py-8 justify-between bg-bg-main z-50 transition-transform duration-300 ${
          hideNav ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        <a href="#" onMouseEnter={playHoverSound} className="font-serif text-2xl tracking-tighter text-accent z-50 relative">
          YP.
        </a>
        
        <nav className="flex gap-6 text-[10px] font-mono uppercase tracking-[0.2em] rotate-180 whitespace-nowrap text-text-secondary" style={{ writingMode: 'vertical-rl' }}>
          {[...links].reverse().map((link) => {
            const isInternal = link.href.startsWith('/');
            if (isInternal) {
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onMouseEnter={playHoverSound}
                  className="hover:text-accent hover:underline decoration-accent underline-offset-4 transition-colors"
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                >
                  {link.name}
                </Link>
              );
            }
            return (
            <a 
              key={link.name} 
              href={link.href}
              onMouseEnter={playHoverSound}
              className="hover:text-accent hover:underline decoration-accent underline-offset-4 transition-colors"
              onClick={() => {
                setMenuOpen(false);
              }}
            >
              {link.name}
            </a>
          )})}
        </nav>

        <div className="flex flex-col gap-4 text-text-muted font-mono text-[10px] uppercase tracking-widest">
          <a href="https://github.com/yashpanpaliya11" onMouseEnter={playHoverSound} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center justify-center gap-1 flex-col"><Github className="w-4 h-4 drop-shadow-md stroke-[1.5]" />GH.</a>
          <a href="https://www.linkedin.com/in/yash-panpaliya-ba95a0388/" onMouseEnter={playHoverSound} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center justify-center gap-1 flex-col"><Linkedin className="w-4 h-4 drop-shadow-md stroke-[1.5]" />IN.</a>
        </div>
      </aside>

      <header 
        className={`md:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-bg-main/80 backdrop-blur-md py-4 border-b border-[#ffffff14]' : 'bg-transparent py-4'
        } ${hideNav ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="px-6 flex justify-between items-center">
          <a href="#" className="font-serif text-2xl tracking-tighter text-accent z-50 relative">
            YP.
          </a>
          
          <button 
            className="md:hidden z-50 relative text-accent p-2"
            onMouseEnter={playHoverSound}
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <div className={`w-6 h-0.5 bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : 'mb-1.5'}`}></div>
            <div className={`w-6 h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-0.5' : ''}`}></div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        ref={menuRef}
        className={`fixed inset-0 bg-bg-main z-40 flex-col justify-center items-center md:hidden`}
        style={{ display: 'none', clipPath: 'circle(0% at top right)' }}
      >
        <nav ref={navRef} className="flex flex-col gap-8 text-center">
          {links.map((link) => {
            const isInternal = link.href.startsWith('/');
            if (isInternal) {
              return (
                <Link
                  key={link.name} 
                  to={link.href}
                  className="mobile-link text-3xl font-medium text-text-primary transition-opacity hover:opacity-70"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            }
            return (
            <a 
              key={link.name} 
              href={link.href}
              className="mobile-link text-3xl font-medium text-text-primary transition-opacity hover:opacity-70"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </a>
          )})}
        </nav>
      </div>
    </>
  );
}
