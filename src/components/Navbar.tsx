import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

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
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <aside 
        className={`hidden md:flex w-20 fixed top-0 left-0 h-screen border-r border-[#ffffff14] flex-col items-center py-8 justify-between bg-bg-main z-50 transition-transform duration-300 ${
          hideNav ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        <a href="#" className="font-serif text-2xl tracking-tighter text-accent z-50 relative">
          YP.
        </a>
        
        <nav className="flex gap-6 text-[10px] font-mono uppercase tracking-[0.2em] rotate-180 whitespace-nowrap text-text-secondary" style={{ writingMode: 'vertical-rl' }}>
          {[...links].reverse().map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="hover:text-accent hover:underline decoration-accent underline-offset-4 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-4 text-text-muted font-mono text-[10px] uppercase tracking-widest">
          <a href="https://github.com/yashpanpaliya11" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">GH.</a>
          <a href="https://www.linkedin.com/in/yash-panpaliya-ba95a0388/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">IN.</a>
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
        className={`fixed inset-0 bg-bg-main z-40 flex flex-col justify-center items-center transition-opacity duration-300 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col gap-8 text-center">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-3xl font-medium text-text-primary transition-opacity hover:opacity-70"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
