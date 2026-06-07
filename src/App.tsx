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
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollSmootherInit from './components/ScrollSmootherInit';
import Loader from './components/Loader';
import { useState } from 'react';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-bg-main text-text-primary flex">
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <CustomCursor />
      <Navbar />
      <ScrollSmootherInit />
      
      <div id="smooth-wrapper" className="flex-1 w-full relative">
        <div id="smooth-content" className="md:pl-20 w-full flex flex-col">
          <main className="flex-1 flex flex-col w-full relative">
            <Hero />
            <Marquee />
            <About />
            <Timeline />
            <Experience />
            <TechStack3D />
            <Projects />
            <Contact />
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
}

