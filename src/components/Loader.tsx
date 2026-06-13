import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { playTypingBeep } from '../utils/audio';

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'booting' | 'prompt' | 'granted'>('booting');
  const [progress, setProgress] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const [logs, setLogs] = useState<string[]>([]);
  const logsRef = useRef<HTMLDivElement>(null);

  const hackingLogs = [
    "[ OK ] Started Show Plymouth Boot Screen.",
    "[ OK ] Reached target Paths.",
    "[ OK ] Reached target Basic System.",
    "Starting Network Manager...",
    "[ OK ] Started Network Manager.",
    "Starting WPA supplicant...",
    "[ OK ] Started WPA supplicant.",
    "Starting PostgreSQL RDBMS...",
    "[ OK ] Started PostgreSQL RDBMS.",
    "Starting Metasploit RPC Server...",
    "Initializing auxiliary modules... [ 1243 modules loaded ]",
    "Initializing exploit modules... [ 2102 modules loaded ]",
    "Connecting to proxy chains...",
    "ProxyChains-3.1 (http://proxychains.sf.net)",
    "[+] Dynamic chain ... 127.0.0.1:9050 ... 192.168.1.45:80 ... OK",
    "Scanning target network [10.0.0.0/24]",
    "Discovered open port 22/tcp on 10.0.0.15",
    "Discovered open port 80/tcp on 10.0.0.15",
    "Initiating brute force protocol...",
    "Bypassing IDS/IPS signatures...",
    "Payload injected successfully at 0x00007FF8B.",
    "Elevating privileges...",
    "root access acquired.",
    "Mounting secure local environment..."
  ];

  // Booting Phase
  useEffect(() => {
    if (phase !== 'booting') return;

    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    let audioCtx: AudioContext | null = null;
    try {
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    } catch(e) {}

    try {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        const msg = new SpeechSynthesisUtterance("System initialization. Establishing secure connection.");
        msg.rate = 0.9;
        msg.pitch = 0.6;
        msg.volume = 0.8;
        setTimeout(() => {
            window.speechSynthesis.speak(msg);
        }, 500);
      }
    } catch (e) {
      console.warn("Speech Synthesis failed or blocked.");
    }
    
    let currentProgress = 0;
    let logIndex = 0;

    const interval = setInterval(() => {
      // Faster progress
      currentProgress += Math.random() * 8 + 6;
      
      if (logIndex < hackingLogs.length && Math.random() > 0.1) {
        setLogs(prev => [...prev.slice(-20), hackingLogs[logIndex]]);
        logIndex++;
        if (logsRef.current) {
          logsRef.current.scrollTop = logsRef.current.scrollHeight;
        }
      }

      if (currentProgress % 10 < 3) {
         playTypingBeep();
      }

      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setPhase('prompt');
        }, 500);
      }
      setProgress(Math.floor(currentProgress));

    }, 30);

    return () => clearInterval(interval);
  }, [phase]);

  // Prompt Phase
  useEffect(() => {
    if (phase === 'prompt') {
      try {
        if (window.speechSynthesis) {
          const msg = new SpeechSynthesisUtterance("Please identify yourself to proceed.");
          msg.rate = 0.9;
          msg.pitch = 0.6;
          window.speechSynthesis.speak(msg);
        }
      } catch (e) {}
      
      // Focus input
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);
    }
  }, [phase]);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim().length > 0) {
      setPhase('granted');
      try {
        if (window.speechSynthesis) {
          window.speechSynthesis.cancel();
          const msg = new SpeechSynthesisUtterance(`Access granted. Welcome, ${inputValue.trim()}.`);
          msg.rate = 0.9;
          msg.pitch = 0.6;
          window.speechSynthesis.speak(msg);
        }
      } catch (e) {}

      setTimeout(() => {
        gsap.to(containerRef.current, {
          y: '-100%',
          opacity: 0,
          duration: 1.2,
          ease: 'expo.inOut',
          onComplete
        });
      }, 2500); // give time for voice to speak
    }
  };

  return (
    <div ref={containerRef} className="fixed inset-0 z-[999999] bg-[#000000] flex flex-col items-center justify-center font-mono overflow-hidden">
      {/* CRT scanline effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none z-10" />
      
      {/* Hacker Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(#00ff88 1px, transparent 1px), linear-gradient(90deg, #00ff88 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>

      <div className="relative z-20 flex flex-col items-center gap-12 w-full max-w-3xl px-6">
        
        {phase === 'booting' && (
           <div className="flex flex-col items-center w-full">
             <div 
               ref={logsRef}
               className="w-full max-w-2xl h-[40vh] overflow-y-hidden text-accent text-xs sm:text-sm font-mono text-left flex flex-col justify-end mb-8 whitespace-pre-wrap leading-relaxed glow-text"
             >
               {logs.map((log, i) => (
                 <div key={i}>{log}</div>
               ))}
             </div>
           </div>
        )}

        {phase === 'prompt' && (
           <div className="flex flex-col items-center gap-6 w-full max-w-lg">
              <div className="text-accent text-xl md:text-2xl tracking-widest text-center">
                IDENTIFY_YOURSELF
              </div>
              <div className="flex items-center gap-4 w-full border-b-2 border-accent pb-2">
                <span className="text-accent text-xl">{'>'}</span>
                <input 
                  ref={inputRef}
                  type="text" 
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    if (e.target.value.length > inputValue.length) {
                      playTypingBeep();
                    }
                  }}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent outline-none text-accent text-xl w-full uppercase placeholder:text-accent/30"
                  placeholder="ENTER NAME..."
                  spellCheck="false"
                  autoComplete="off"
                />
              </div>
              <div className="text-accent/50 text-xs mt-2 blink cursor-default">AWAITING INPUT... PRESS ENTER TO VERIFY</div>
           </div>
        )}

        {phase === 'granted' && (
           <div className="flex flex-col items-center gap-4">
              <div className="text-accent text-3xl md:text-5xl lg:text-5xl tracking-[0.2em] font-bold text-center glow-text">
                ACCESS_GRANTED
              </div>
              <div className="text-white/80 text-xl md:text-2xl tracking-widest text-center mt-4 uppercase">
                WELCOME, {inputValue}
              </div>
           </div>
        )}
        
        {phase === 'booting' && (
          <div className="w-full">
            <div className="flex justify-between text-accent/80 text-xs md:text-sm tracking-widest mb-3">
              <span>DECRYPTING_ASSETS</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 w-full bg-[#111] relative overflow-hidden border border-[#ffffff14]">
              <div 
                className="absolute top-0 left-0 h-full bg-accent transition-all duration-75"
                style={{ width: `${progress}%`, boxShadow: '0 0 15px #00ff88' }}
              ></div>
            </div>
          </div>
        )}

      </div>

      <div className="fixed bottom-8 left-6 right-6 lg:left-12 lg:right-12 z-20 flex justify-between items-end opacity-50 text-[10px] md:text-xs text-accent">
          <div className="flex flex-col gap-1.5">
            <span>PROTOCOL: OMEGA_7</span>
            <span>SECURE_LINK: ACTIVE</span>
            <span>USER_NODE: ROOT_{progress}</span>
          </div>
          <div className="text-right flex flex-col gap-1.5">
            <span>SYSTEM MEMORY: OK</span>
            <span>KERNAL: LOADED</span>
            <span>STATE: {phase.toUpperCase()}</span>
          </div>
      </div>

      <style>{`
        .glow-text {
          text-shadow: 0 0 15px rgba(0, 255, 136, 0.6), 0 0 30px rgba(0, 255, 136, 0.4);
        }
        .blink {
          animation: blink-animation 1.5s steps(2, start) infinite;
        }
        @keyframes blink-animation {
          to {
            visibility: hidden;
          }
        }
      `}</style>
    </div>
  );
}
