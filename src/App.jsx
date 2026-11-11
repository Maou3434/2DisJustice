import React, { useEffect } from 'react';
import { HeroSection } from './components/hero/HeroSection.jsx';
import { ExperienceTimeline } from './components/experience/ExperienceTimeline.jsx';
import { ProjectGallery } from './components/projects/ProjectGallery.jsx';
import { PatentExhibition } from './components/patents/PatentExhibition.jsx';
import { TechnicalMatrix } from './components/skills/TechnicalMatrix.jsx';
import { HonorsSection } from './components/credentials/HonorsSection.jsx';
import { Footer } from './components/common/Footer.jsx';
import { CinematicCursor } from './components/common/CinematicCursor.jsx';
import { ScrollSpine } from './components/navigation/ScrollSpine.jsx';
import { Header } from './components/navigation/Header.jsx';
import { Preloader } from './components/common/Preloader.jsx';
import { SpatialCanvas } from './components/3d/SpatialCanvas.jsx';

export const App = () => {
  useEffect(() => {
    // 1. Scroll-triggered Entrance Choreography for all sections
    const sections = document.querySelectorAll('.scene-section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-inview');
          }
        });
      },
      { threshold: 0.14 }
    );

    sections.forEach((sec) => observer.observe(sec));

    // 2. Subtle Watermark Parallax Depth
    const handleScrollParallax = () => {
      const vh = window.innerHeight;
      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < vh) {
          const offset = (vh * 0.5 - (rect.top + rect.height * 0.5)) * -0.08;
          sec.style.setProperty('--watermark-y', `${offset.toFixed(1)}px`);
        }
      });
    };

    window.addEventListener('scroll', handleScrollParallax, { passive: true });
    handleScrollParallax();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScrollParallax);
    };
  }, []);

  return (
    <div className="portfolio-app-root">
      {/* Ceremonial Sumi-e & Cinnabar Hanko Opening Sequence */}
      <Preloader />

      {/* Interactive Cinematic Mouse Aura */}
      <CinematicCursor />

      {/* Persistent Spatial WebGL Momiji Petals & Atmospheric Embers */}
      <SpatialCanvas />

      {/* Top Editorial Header & Mobile Chapter Drawer */}
      <Header />

      {/* Chapter Scroll Progress Spine (Side Numbered Navigation) */}
      <ScrollSpine />

      {/* Main Foreground Editorial Scenes */}
      <main className="content-surface">
        <HeroSection />
        <ExperienceTimeline />
        <ProjectGallery />
        <PatentExhibition />
        <TechnicalMatrix />
        <HonorsSection />
        <Footer />
      </main>

      <style>{`
        .portfolio-app-root {
          position: relative;
          min-height: 100vh;
          background: var(--bg-primary);
          color: var(--text-primary);
        }

        .content-surface {
          position: relative;
          z-index: var(--z-content);
        }
      `}</style>
    </div>
  );
};

export default App;
