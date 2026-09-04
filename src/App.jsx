import React, { useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext.jsx';
import { SpatialCanvas } from './components/3d/SpatialCanvas.jsx';
import { Header } from './components/navigation/Header.jsx';
import { HeroSection } from './components/hero/HeroSection.jsx';
import { ExperienceTimeline } from './components/experience/ExperienceTimeline.jsx';
import { ProjectGallery } from './components/projects/ProjectGallery.jsx';
import { PatentExhibition } from './components/patents/PatentExhibition.jsx';
import { TechnicalMatrix } from './components/skills/TechnicalMatrix.jsx';
import { HonorsSection } from './components/credentials/HonorsSection.jsx';
import { Footer } from './components/common/Footer.jsx';
import { CinematicCursor } from './components/common/CinematicCursor.jsx';
import { ScrollSpine } from './components/navigation/ScrollSpine.jsx';

const AppContent = () => {
  const { toggleTheme } = useTheme();

  // Keyboard shortcut listener ('T' to toggle creative direction)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.key === 't' || e.key === 'T') {
        toggleTheme();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTheme]);

  return (
    <div className="portfolio-app-root">
      {/* Interactive Cinematic Mouse Aura */}
      <CinematicCursor />

      {/* Chapter Scroll Progress Spine */}
      <ScrollSpine />

      {/* 3D WebGL Background Layer */}
      <SpatialCanvas />

      {/* Atmospheric Spatial Overlay */}
      <div className="spatial-overlay" aria-hidden="true" />

      {/* Main Foreground Editorial Content */}
      <div className="content-surface">
        <Header />
        <main>
          <HeroSection />
          <ExperienceTimeline />
          <ProjectGallery />
          <PatentExhibition />
          <TechnicalMatrix />
          <HonorsSection />
        </main>
        <Footer />
      </div>

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

export const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
