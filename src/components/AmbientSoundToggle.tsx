import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { toggleAmbientSound, isAmbientPlaying } from '../utils/audio';

export default function AmbientSoundToggle() {
  const [isPlaying, setIsPlaying] = useState(isAmbientPlaying);

  const handleToggle = () => {
    const newState = toggleAmbientSound();
    setIsPlaying(newState);
  };

  return (
    <button
      onClick={handleToggle}
      className={`fixed bottom-20 right-6 z-50 p-3 rounded-full shadow-lg transition-colors border hover:text-accent ${
        isPlaying 
          ? 'bg-bg-secondary border-accent text-accent' 
          : 'bg-bg-main border-border-main text-text-secondary hover:border-accent'
      }`}
      aria-label="Toggle ambient sound"
    >
      {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
    </button>
  );
}
