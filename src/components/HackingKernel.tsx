import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { playTypingBeep, playHoverSound } from '../utils/audio';

export default function HackingKernel() {
  const [logs, setLogs] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('kernelLogs');
      if (saved) return JSON.parse(saved);
    }
    return [];
  });
  const [inputValue, setInputValue] = useState('');
  const [bootPhase, setBootPhase] = useState(() => {
    if (typeof window !== 'undefined') {
      const hasBooted = sessionStorage.getItem('kernelBooted');
      return !hasBooted;
    }
    return true;
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let resizeTimer: NodeJS.Timeout;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()ㅂㅈㄷㄱ쇼ㅕㅑㅐㅔㅁㄴㅇㄹ호ㅓㅏㅣㅋㅌㅊ퓨ㅜㅡ';
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    let drops: number[] = new Array(columns).fill(1).map(() => Math.random() * -100);

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0'; 
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setCanvasSize();
        columns = Math.floor(canvas.width / fontSize);
        drops = new Array(columns).fill(1).map(() => Math.random() * -100);
      }, 200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const bootSequence = [
    "INIT KERNEL v24.9.1",
    "LOADING MODULES...",
    "MOUNTING VIRTUAL FILESYSTEM...",
    "CHECKING SECURITY PROTOCOLS... [OK]",
    "ESTABLISHING SECURE CONNECTION...",
    "WARNING: UNAUTHORIZED ACCESS DETECTED",
    "BYPASSING FIREWALL...",
    "ACCESS GRANTED.",
    "",
    "Welcome to YP-SYSTEM.",
    "Type 'help' for a list of commands."
  ];

  useEffect(() => {
    if (logs.length > 0) {
      sessionStorage.setItem('kernelLogs', JSON.stringify(logs));
    }
  }, [logs]);

  useEffect(() => {
    let i = 0;
    if (bootPhase) {
      const interval = setInterval(() => {
        setLogs(prev => [...prev, bootSequence[i]]);
        i++;
        playTypingBeep();
        if (i >= bootSequence.length) {
          clearInterval(interval);
          setBootPhase(false);
          sessionStorage.setItem('kernelBooted', 'true');
        }
      }, 300);
      return () => clearInterval(interval);
    }
  }, [bootPhase]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    const focusInput = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };
    document.addEventListener('click', focusInput);
    return () => document.removeEventListener('click', focusInput);
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    setLogs(prev => [...prev, `root@yp-kernel:~$ ${cmd}`]);
    
    if (trimmedCmd === 'help') {
      setLogs(prev => [
        ...prev, 
        "AVAILABLE COMMANDS:",
        "  about    - read about YP",
        "  projects - list recent operations",
        "  contact  - establish secure comms",
        "  history  - view command history",
        "  clear    - clear terminal",
        "  exit     - return to standard GUI"
      ]);
    } else if (trimmedCmd === 'about') {
      setLogs(prev => [
        ...prev,
        "NAME: Yash Panpaliya",
        "ROLE: Full Stack Developer / Software Engineer",
        "STATUS: Active",
        "Decentralized nodes functioning optimally."
      ]);
    } else if (trimmedCmd === 'projects') {
      setLogs(prev => [
        ...prev,
        "[1] AI Voice Agent (VOICE-CRM) - DEPLOYED",
        "[2] CRM Dashboard - ACTIVE",
        "[3] Dukaan Mate - ARCHIVED",
        "[4] WhatsApp Bot - ACTIVE",
      ]);
    } else if (trimmedCmd === 'contact') {
      setLogs(prev => [
        ...prev,
        "Initiating comms...",
        "Email: yashpanpaliya11@gmail.com",
        "Ping sent. Waiting for response."
      ]);
    } else if (trimmedCmd === 'history') {
      const history = logs.filter(l => l.startsWith('root@yp-kernel:~$')).map(l => l.replace('root@yp-kernel:~$ ', ''));
      setLogs(prev => [...prev, ...history.map((h, i) => `  ${i + 1}  ${h}`)]);
    } else if (trimmedCmd === 'clear') {
      setLogs([]);
      sessionStorage.removeItem('kernelLogs');
    } else if (trimmedCmd === 'exit') {
      setLogs(prev => [...prev, "Terminating session...", "Switching to GUI mode..."]);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else if (trimmedCmd !== '') {
      setLogs(prev => [...prev, `Command not found: ${trimmedCmd}`, "Type 'help' for available commands."]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      playHoverSound();
      handleCommand(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#00ff88] font-mono text-sm sm:text-base p-4 sm:p-8 flex flex-col overflow-hidden selection:bg-[#00ff88] selection:text-black">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-20 z-0"></canvas>
      <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #00ff88 2px, #00ff88 4px)', backgroundSize: '100% 4px' }}></div>
      <div className="scanline-overlay"></div>
      
      {/* Main Content Area: System Specs Header */}
      <div className="w-full max-w-4xl mx-auto mb-6 shrink-0 z-10 border-b border-[#00ff88]/30 pb-4 hidden sm:block">
        <div className="flex justify-between items-end">
          <pre className="text-xs text-[#00ff88] opacity-80 font-bold tracking-widest leading-tight">
{`__   __  ___  _____     ______  _____  
\\ \\ / / | _ \\| _ \\___  |   _  ||  _  |
 \\ V /  |  _/|  _/___| |  | | || | | |
  |_|   |_|  |_|       |__|_|__||__|__| `}
          </pre>
          <div className="text-right text-xs opacity-70">
            <div>SYSTEM: YP-OS 9.2 (DECENTRALIZED)</div>
            <div>STATUS: ONLINE</div>
            <div>RAM: 128TB VIRTUAL</div>
          </div>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto w-full max-w-4xl mx-auto flex flex-col gap-1 z-10 pb-20 custom-scrollbar"
      >
        {logs.map((log, index) => (
          <div key={index} className="whitespace-pre-wrap">{log}</div>
        ))}
        {!bootPhase && (
          <div className="flex items-center gap-2 mt-2">
            <span className="shrink-0">root@yp-kernel:~$</span>
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
              className="bg-transparent outline-none flex-1 w-full text-[#00ff88] caret-[#00ff88]"
              autoFocus
              spellCheck="false"
              autoComplete="off"
            />
          </div>
        )}
      </div>
      
      {/* Power Off button */}
      <button 
        onClick={() => navigate('/')}
        onMouseEnter={playHoverSound}
        className="fixed top-4 right-4 z-50 text-[#00ff88] border border-[#00ff88]/30 px-4 py-2 text-xs uppercase hover:bg-[#00ff88]/20 transition-colors"
      >
        Exit Terminal
      </button>

      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
        .scanline-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 15vh;
          background: linear-gradient(to bottom, transparent, rgba(0, 255, 136, 0.4), transparent);
          animation: scanline 8s linear infinite;
          pointer-events: none;
          z-index: 50;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 255, 136, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 255, 136, 0.2);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 255, 136, 0.4);
        }
      `}</style>
    </div>
  );
}
