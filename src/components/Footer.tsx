import { Mail, Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-bg-card p-8 md:p-12 lg:p-16 border-[#ffffff14]">
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        <div className="flex flex-col gap-4">
          <span className="font-serif text-3xl tracking-tighter text-accent">YP.</span>
          <p className="text-text-secondary text-sm max-w-xs">
            Building real products that actually work.
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-6 text-sm">
          <div className="font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-sm border border-border-main text-text-muted">
            BUILT WITH REACT + FIREBASE
          </div>
          
          <div className="flex gap-6 font-mono text-xs uppercase tracking-wider text-text-secondary group-links">
            <a href="mailto:yashpanpaliya11@gmail.com" className="hover:text-accent transition-colors flex items-center gap-2"><Mail className="w-4 h-4 drop-shadow-md stroke-[1.5]" /> EMAIL</a>
            <a href="https://github.com/yashpanpaliya11" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-2"><Github className="w-4 h-4 drop-shadow-md stroke-[1.5]" /> GITHUB</a>
            <a href="https://www.linkedin.com/in/yash-panpaliya-ba95a0388/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-2"><Linkedin className="w-4 h-4 drop-shadow-md stroke-[1.5]" /> LINKEDIN</a>
          </div>
          
          <div className="text-text-muted text-xs mt-4 md:mt-0 font-mono">
            &copy; {new Date().getFullYear()} Yash Panpaliya.
          </div>
        </div>
        
      </div>
    </footer>
  );
}
