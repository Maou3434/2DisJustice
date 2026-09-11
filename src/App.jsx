import React from 'react';
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

export const App = () => {
  return (
    <div className="portfolio-app-root">
      {/* Interactive Cinematic Mouse Aura */}
      <CinematicCursor />

      {/* Chapter Scroll Progress Spine */}
      <ScrollSpine />

      {/* 3D WebGL Background Layer (Atmospheric falling leaves & embers) */}
      <SpatialCanvas />

      {/* Fixed Navigation Header */}
      <Header />

      {/* Main Foreground Editorial Scenes with Scroll Snapping */}
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
            background: transparent;
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
