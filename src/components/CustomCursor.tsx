import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function CustomCursor() {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorOutline = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      gsap.to(cursorDot.current, {
        x: clientX,
        y: clientY,
        duration: 0,
        ease: "none"
      });

      gsap.to(cursorOutline.current, {
        x: clientX,
        y: clientY,
        duration: 0.15,
        ease: "power2.out"
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true);
        document.body.classList.add('cursor-hover');
      } else {
        setIsHovering(false);
        document.body.classList.remove('cursor-hover');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.classList.remove('cursor-hover');
    };
  }, []);

  return (
    <>
      <div ref={cursorDot} className="cursor-dot hidden md:block"></div>
      <div ref={cursorOutline} className="cursor-outline hidden md:block"></div>
    </>
  );
}
