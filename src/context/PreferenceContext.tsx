import React, { createContext, useContext, useState, useEffect } from 'react';

export type AnimationIntensity = 'full' | 'reduced' | 'none';
export type Theme = 'dark' | 'light';

interface PreferenceContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  animationIntensity: AnimationIntensity;
  setAnimationIntensity: (intensity: AnimationIntensity) => void;
}

const PreferenceContext = createContext<PreferenceContextType | undefined>(undefined);

export const PreferenceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme: Theme = 'dark'; // Forced to dark
  const setTheme = () => {};

  const [animationIntensity, setAnimationIntensity] = useState<AnimationIntensity>(() => {
    const saved = localStorage.getItem('app-animation-intensity');
    return (saved as AnimationIntensity) || 'full';
  });

  useEffect(() => {
    document.documentElement.classList.remove('light-theme');
  }, []);

  useEffect(() => {
    localStorage.setItem('app-animation-intensity', animationIntensity);
    if (animationIntensity === 'none') {
      document.documentElement.classList.add('disable-animations');
      document.documentElement.classList.remove('reduce-animations');
    } else if (animationIntensity === 'reduced') {
      document.documentElement.classList.add('reduce-animations');
      document.documentElement.classList.remove('disable-animations');
    } else {
      document.documentElement.classList.remove('disable-animations');
      document.documentElement.classList.remove('reduce-animations');
    }
  }, [animationIntensity]);

  return (
    <PreferenceContext.Provider value={{ theme, setTheme, animationIntensity, setAnimationIntensity }}>
      {children}
    </PreferenceContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferenceContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferenceProvider');
  }
  return context;
};
