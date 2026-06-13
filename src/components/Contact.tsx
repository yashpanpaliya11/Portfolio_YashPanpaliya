import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Mail, Linkedin, Github, Rocket, Send } from 'lucide-react';
import { playHoverSound } from '../utils/audio';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const container = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useGSAP(() => {
    // Basic setup
  }, { scope: container });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate network transmission
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      console.error('Error submitting message:', error);
      setErrorMessage(error.message || 'Unknown error');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 8000); // clear status after 8s
    }
  };

  return (
    <section id="contact" ref={container} className="relative border-b border-border-main flex flex-col items-start p-8 md:p-12 lg:p-16 py-32 md:py-48 bg-bg-secondary overflow-hidden">
      <div className="w-full relative z-10 flex flex-col xl:flex-row gap-16 md:gap-24 justify-between">
        
        <div className="w-full xl:max-w-xl">
          <div className="section-eyebrow mb-12">
            06 // LET'S BUILD SOMETHING
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl tracking-tight mb-8 font-light">
            Ready to Collaborate?
          </h2>
          
          <p className="text-text-secondary text-lg leading-relaxed mb-12 font-light">
            Currently open for new opportunities, freelance work, and interesting collaborations. Typical response: within 24 hours.
          </p>
          
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-sm border border-border-main bg-bg-card font-mono text-[10px] uppercase tracking-widest text-text-secondary">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            Systems Operational
          </div>
        </div>
        
        <div className="w-full xl:max-w-xl flex-shrink-0 flex flex-col gap-16">
          <div className="w-full">
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs font-mono text-text-secondary uppercase tracking-widest">Name</label>
                <input 
                  type="text" 
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="bg-bg-main border border-border-main px-4 py-3 outline-none focus:border-accent transition-colors text-sm" 
                  placeholder="John Doe"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-mono text-text-secondary uppercase tracking-widest">Email</label>
                <input 
                  type="email" 
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="bg-bg-main border border-border-main px-4 py-3 outline-none focus:border-accent transition-colors text-sm" 
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-xs font-mono text-text-secondary uppercase tracking-widest">Message</label>
              <textarea 
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
                rows={4}
                className="bg-bg-main border border-border-main px-4 py-3 outline-none focus:border-accent transition-colors text-sm resize-none" 
                placeholder="How can I help you?"
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              onMouseEnter={playHoverSound}
              className="group relative inline-flex items-center justify-center gap-2 text-sm text-accent border border-accent/40 bg-accent/5 px-6 py-4 overflow-hidden transition-all hover:bg-accent/20 hover:border-accent hover:shadow-[0_0_15px_rgba(0,255,136,0.3)] font-medium w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-accent/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
              <span className="relative z-10 flex items-center gap-2">
                {isSubmitting ? 'TRANSMITTING...' : 'SEND MESSAGE'} 
                {!isSubmitting && <Send className="w-4 h-4 ml-2" />}
              </span>
            </button>

            {submitStatus === 'success' && (
              <div className="text-accent text-sm font-mono border border-accent/30 bg-accent/5 p-4 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
                  Message received successfully.
                </div>
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="text-red-500 text-sm font-mono border border-red-500/30 bg-red-500/5 p-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 font-bold">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                  Transmission failed.
                </div>
                <div className="text-xs opacity-90 break-words mt-1">
                  {errorMessage.includes('permission') || errorMessage.includes('Missing or insufficient')
                    ? "Permission denied. Please ensure Firestore Security Rules allow writes in your Firebase console."
                    : `Error: ${errorMessage}. Please check your Firebase config.`}
                </div>
              </div>
            )}
          </form>
          </div>

          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 text-sm uppercase tracking-widest pt-8 border-t border-border-main">
              
              <a 
                href="mailto:yashpanpaliya11@gmail.com" 
                onClick={(e) => {
                  e.preventDefault();
                  navigator.clipboard.writeText('yashpanpaliya11@gmail.com');
                  setSubmitStatus('success');
                  setTimeout(() => setSubmitStatus('idle'), 2000);
                }}
                onMouseEnter={playHoverSound}
                className="group flex flex-col justify-center py-6 border-b border-border-main hover:border-accent transition-colors"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-5">
                    <div className="text-accent group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300 drop-shadow-[0_4px_4px_rgba(0,255,136,0.2)] bg-bg-card p-3 rounded-full border border-border-main group-hover:border-accent">
                      <Mail className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <span className="font-mono text-text-secondary group-hover:text-accent transition-colors block overflow-hidden relative flex-1">
                      <span className="block transition-transform duration-300 group-hover:-translate-y-full">Email</span>
                      <span className="block transition-transform duration-300 absolute top-full left-0 group-hover:-translate-y-full text-accent normal-case tracking-normal">yashpanpaliya11@gmail...</span>
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-accent transition-all duration-300 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
                </div>
                {submitStatus === 'success' && <div className="text-accent font-mono text-xs mt-2 transition-all">Copied to clipboard!</div>}
              </a>

              <a 
                href="https://www.linkedin.com/in/yash-panpaliya-ba95a0388/" 
                target="_blank" rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                className="group flex items-center justify-between py-6 border-b border-border-main hover:border-accent transition-colors"
              >
                <div className="flex items-center gap-5 w-full">
                  <div className="text-accent group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 drop-shadow-[0_4px_4px_rgba(0,255,136,0.2)] bg-bg-card p-3 rounded-full border border-border-main group-hover:border-accent">
                    <Linkedin className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <span className="font-mono text-text-secondary group-hover:text-accent transition-colors block overflow-hidden relative flex-1">
                    <span className="block transition-transform duration-300 group-hover:-translate-y-full">LinkedIn</span>
                    <span className="block transition-transform duration-300 absolute top-full left-0 group-hover:-translate-y-full text-accent normal-case tracking-normal">yash-panpaliya</span>
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-accent transition-all duration-300 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
              </a>

              <a 
                href="https://github.com/yashpanpaliya11" 
                target="_blank" rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                className="group flex items-center justify-between py-6 border-b border-border-main hover:border-accent transition-colors"
              >
                <div className="flex items-center gap-5 w-full">
                  <div className="text-accent group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300 drop-shadow-[0_4px_4px_rgba(0,255,136,0.2)] bg-bg-card p-3 rounded-full border border-border-main group-hover:border-accent">
                    <Github className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <span className="font-mono text-text-secondary group-hover:text-accent transition-colors block overflow-hidden relative flex-1">
                    <span className="block transition-transform duration-300 group-hover:-translate-y-full">GitHub</span>
                    <span className="block transition-transform duration-300 absolute top-full left-0 group-hover:-translate-y-full text-accent normal-case tracking-normal">yashpanpaliya11</span>
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-accent transition-all duration-300 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
              </a>

              <a 
                href="https://fiverr.com/yashpanpaliya" 
                target="_blank" rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                className="group flex items-center justify-between py-6 border-b border-border-main hover:border-accent transition-colors"
              >
                <div className="flex items-center gap-5 w-full">
                  <div className="text-accent group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 drop-shadow-[0_4px_4px_rgba(0,255,136,0.2)] bg-bg-card p-3 rounded-full border border-border-main group-hover:border-accent">
                    <Rocket className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <span className="font-mono text-text-secondary group-hover:text-accent transition-colors block overflow-hidden relative flex-1">
                    <span className="block transition-transform duration-300 group-hover:-translate-y-full">Fiverr</span>
                    <span className="block transition-transform duration-300 absolute top-full left-0 group-hover:-translate-y-full text-accent normal-case tracking-normal">@yashpanpaliya</span>
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-accent transition-all duration-300 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
              </a>

            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
