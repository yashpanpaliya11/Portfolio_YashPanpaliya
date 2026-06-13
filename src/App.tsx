/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Timeline from './components/Timeline';
import Experience from './components/Experience';
import TechStack3D from './components/TechStack3D';
import Projects from './components/Projects';
import PaidWorks from './components/PaidWorks';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';
import BackgroundGrid from './components/BackgroundGrid';
import SmoothScrollInit from './components/SmoothScrollInit';
import BackToTop from './components/BackToTop';
import AnimatedDivider from './components/AnimatedDivider';
import SettingsWidget from './components/SettingsWidget';
import { useState } from 'react';
import { playClickSound } from './utils/audio';

let hasSeenLoaderThisSession = false;

export default function App() {
  const [loading, setLoading] = useState(!hasSeenLoaderThisSession);

  const handleLoaderComplete = () => {
    hasSeenLoaderThisSession = true;
    setLoading(false);
  };

  return (
    <>
      <SmoothScrollInit />
      <SettingsWidget />
      <div className="min-h-screen bg-bg-main text-text-primary flex">
        <BackgroundGrid />
        {loading && <Loader onComplete={handleLoaderComplete} />}
        <CustomCursor />
        <Navbar />
        <BackToTop />
        
        <div className="flex-1 w-full relative">
          <div className="md:pl-20 w-full flex flex-col">
            <main className="flex-1 flex flex-col w-full relative">
              <Hero />
              <AnimatedDivider />
              <Marquee />
              <AnimatedDivider />
              <About />
              <AnimatedDivider />
              <Timeline />
              <AnimatedDivider />
              <Experience />
              <AnimatedDivider />
              <TechStack3D />
              <AnimatedDivider />
              <Projects />
              <AnimatedDivider />
              <PaidWorks />
              <AnimatedDivider />
              <Contact />
              <Footer />
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

