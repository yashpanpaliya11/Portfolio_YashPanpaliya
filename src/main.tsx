import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import App from './App.tsx';
import ProjectDetails from './components/ProjectDetails.tsx';
import HackingKernel from './components/HackingKernel.tsx';
import Analytics from './components/Analytics.tsx';
import { PreferenceProvider } from './context/PreferenceContext.tsx';
import './index.css';

gsap.registerPlugin(useGSAP);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PreferenceProvider>
      <BrowserRouter>
        <Analytics />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/kernel" element={<HackingKernel />} />
        </Routes>
      </BrowserRouter>
    </PreferenceProvider>
  </StrictMode>,
);
