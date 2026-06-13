import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import CustomCursor from './CustomCursor';
import gsap from 'gsap';
import { projects } from '../data/projects';
import SmoothScrollInit from './SmoothScrollInit';
import BackToTop from './BackToTop';

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage]);

  if (!project) {
    return (
      <div className="min-h-screen bg-bg-main text-text-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl mb-4 font-mono">404 // PROJECT NOT FOUND</h1>
          <Link to="/" className="text-accent hover:underline flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" /> BACK TO HOME
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SmoothScrollInit />
      <div className="min-h-screen bg-bg-main text-text-primary relative selection:bg-accent selection:text-black font-sans font-light">
        <CustomCursor />
        <BackToTop />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center bg-bg-main/80 backdrop-blur-md border-b border-[#ffffff14]">
        <Link to="/" className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-accent transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <div className="font-mono text-xs text-text-muted">{project.date}</div>
      </nav>

      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Header */}
        <header className="flex flex-col gap-6">
          <div className="flex gap-3 font-mono text-[10px] text-text-muted tracking-wider flex-wrap">
            {project.tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-white/5 rounded-sm border border-white/5">{tag}</span>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight">{project.title}</h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl leading-relaxed mt-4">
            {project.description}
          </p>
          {project.link && (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-6 inline-flex items-center gap-2 text-sm text-accent border border-accent/40 bg-accent/5 px-6 py-3 rounded-full overflow-hidden transition-all hover:bg-accent/20 hover:border-accent hover:shadow-[0_0_15px_rgba(0,255,136,0.3)] w-fit font-medium group"
            >
              <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-accent/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
              <span className="relative z-10 flex items-center gap-2">Visit Project <ExternalLink className="w-4 h-4" /></span>
            </a>
          )}
        </header>

        {/* Features & Challenges */}
        {(project.features || project.challenges) && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-[#ffffff14]">
            {project.features && (
              <div>
                <h3 className="font-mono text-sm tracking-widest text-accent uppercase mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                  Key Features
                </h3>
                <ul className="space-y-4 text-text-secondary">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-accent opacity-50 mt-1">▹</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {project.challenges && (
              <div>
                <h3 className="font-mono text-sm tracking-widest text-accent uppercase mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                  Challenges Solved
                </h3>
                <ul className="space-y-4 text-text-secondary">
                  {project.challenges.map((challenge, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-accent opacity-50 mt-1">▪</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {/* Gallery */}
        <section className="pt-12">
          <h3 className="font-mono text-sm tracking-widest text-text-muted uppercase mb-8">Gallery</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.images.map((img, idx) => (
              <figure 
                key={idx} 
                className="group relative rounded-sm border border-[#ffffff14] overflow-hidden bg-[#050505] cursor-zoom-in"
                onClick={() => setSelectedImage(img.url)}
              >
                <div className="aspect-[4/3] w-full relative">
                  <img 
                    src={img.url} 
                    alt={img.caption}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                </div>
                <figcaption className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 text-xs font-mono border border-[#ffffff14] text-white tracking-wide">
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </main>

      {/* Lightbox */}
      {selectedImage && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[rgba(0,0,0,0.92)] backdrop-blur-sm p-4 sm:p-8"
          onClick={() => setSelectedImage(null)}
          style={{ animation: 'lbFadeIn 0.3s ease-out' }}
        >
          <style>{`
            @keyframes lbFadeIn {
              from { opacity: 0; transform: scale(0.98); }
              to { opacity: 1; transform: scale(1); }
            }
          `}</style>
          
          <button 
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white p-2 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          
          <img 
            src={selectedImage} 
            alt="Project full view" 
            className="max-w-[90vw] max-h-[90vh] object-contain shadow-2xl rounded-sm"
            onClick={(e) => e.stopPropagation()}
          />
        </div>,
        document.body
      )}
      </div>
    </>
  );
}
