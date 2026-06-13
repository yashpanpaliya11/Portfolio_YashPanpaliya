import { Settings, X } from 'lucide-react';
import { useState } from 'react';
import { usePreferences, Theme, AnimationIntensity } from '../context/PreferenceContext';

export default function SettingsWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, animationIntensity, setAnimationIntensity } = usePreferences();

  return (
    <>
      {/* Settings Toggle Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-3 bg-bg-secondary border border-border-main rounded-full shadow-lg hover:border-accent hover:text-accent transition-colors"
        aria-label="Preferences"
      >
        <Settings className="w-5 h-5" />
      </button>

      {/* Settings Modal/Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-bg-main border border-border-main rounded-lg shadow-2xl overflow-hidden relative">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1 hover:text-accent transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-6">
              <div className="section-eyebrow mb-6">
                PREFERENCES
              </div>
              
              {/* Theme Toggle */}
              <div className="mb-8">
                <h3 className="text-sm tracking-wide text-text-secondary mb-3">THEME</h3>
                <div className="flex gap-2 p-1 bg-bg-secondary rounded-md border border-border-main">
                  <button 
                    onClick={() => setTheme('dark')}
                    className={`flex-1 py-1.5 text-xs tracking-wider rounded-sm transition-colors ${theme === 'dark' ? 'bg-bg-main border border-border-main text-text-primary shadow-sm' : 'text-text-muted hover:text-text-primary'}`}
                  >
                    DARK
                  </button>
                  <button 
                    onClick={() => setTheme('light')}
                    className={`flex-1 py-1.5 text-xs tracking-wider rounded-sm transition-colors ${theme === 'light' ? 'bg-bg-main border border-border-main text-text-primary shadow-sm' : 'text-text-muted hover:text-text-primary'}`}
                  >
                    LIGHT
                  </button>
                </div>
              </div>

              {/* Animation Intensity Toggle */}
              <div>
                <h3 className="text-sm tracking-wide text-text-secondary mb-3">ANIMATION INTENSITY</h3>
                <div className="flex flex-col gap-2">
                  {(['full', 'reduced', 'none'] as AnimationIntensity[]).map((intensity) => (
                    <button
                      key={intensity}
                      onClick={() => setAnimationIntensity(intensity)}
                      className={`flex items-center justify-between px-3 py-2 text-xs tracking-wider rounded-md border transition-colors ${
                        animationIntensity === intensity 
                          ? 'border-accent text-accent bg-accent/5' 
                          : 'border-border-main text-text-secondary hover:border-text-muted'
                      }`}
                    >
                      <span className="uppercase">{intensity}</span>
                      {animationIntensity === intensity && (
                        <div className="w-2 h-2 rounded-full bg-accent" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
