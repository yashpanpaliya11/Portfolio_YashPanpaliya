let audioCtx: AudioContext | null = null;

export const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      try {
        audioCtx = new AudioContextClass();
      } catch (e) {}
    }
  }
  // Resume context if suspended (needed in many browsers until user interaction)
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const playTypingBeep = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const t = ctx.currentTime;
    
    // 1. Transient click (the bottom-out of the switch)
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'square';
    
    // Randomize pitch slightly for variation between keystrokes
    const baseFreq = 120 + Math.random() * 80; 
    osc.frequency.setValueAtTime(baseFreq, t);
    osc.frequency.exponentialRampToValueAtTime(40, t + 0.02);
    
    oscGain.gain.setValueAtTime(0.05, t);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);
    
    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    // 2. High-frequency click/clack (noise component for the plastic keycap sound)
    const bufferSize = ctx.sampleRate * 0.04; // 40ms duration
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.5; // white noise
    }
    
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    // Filter noise to sound "plasticky" and less harsh
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 3500 + Math.random() * 1500; // center frequency
    filter.Q.value = 1.2;
    
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.15, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.03); // Quick decay
    
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    // Play both components
    osc.start(t);
    noise.start(t);
    osc.stop(t + 0.04);
    noise.stop(t + 0.04);
  } catch(e) {}
};

export const playHoverSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch(e) {}
};

export const playClickSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch(e) {}
};

let ambientOsc: OscillatorNode | null = null;
let ambientGain: GainNode | null = null;
export let isAmbientPlaying = false;

export const toggleAmbientSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return false;
  
  if (isAmbientPlaying) {
    if (ambientGain) {
      ambientGain.gain.setTargetAtTime(0, ctx.currentTime, 1);
      setTimeout(() => {
        ambientOsc?.stop();
        ambientOsc?.disconnect();
        ambientGain?.disconnect();
        ambientOsc = null;
        ambientGain = null;
      }, 2000);
    }
    isAmbientPlaying = false;
  } else {
    // Resume context if needed
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    ambientOsc = ctx.createOscillator();
    ambientGain = ctx.createGain();
    
    ambientOsc.type = 'sine';
    
    // Create a very subtle low drone
    ambientOsc.frequency.setValueAtTime(60, ctx.currentTime);
    // Add slight LFO logic to frequency could go here, or just keep it simple
    
    ambientGain.gain.setValueAtTime(0, ctx.currentTime);
    ambientGain.gain.setTargetAtTime(0.015, ctx.currentTime, 2); // fade in slowly
    
    ambientOsc.connect(ambientGain);
    ambientGain.connect(ctx.destination);
    
    ambientOsc.start();
    isAmbientPlaying = true;
  }
  return isAmbientPlaying;
};

if (typeof document !== 'undefined') {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target && target.closest && target.closest('button, a, .cursor-pointer, [role="button"]')) {
      playClickSound();
    }
  });
}
