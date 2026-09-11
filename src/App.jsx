import React from 'react';
import { SpatialCanvas } from './components/3d/SpatialCanvas.jsx';
import { HeroSection } from './components/hero/HeroSection.jsx';
import { ExperienceTimeline } from './components/experience/ExperienceTimeline.jsx';
import { ProjectGallery } from './components/projects/ProjectGallery.jsx';
import { PatentExhibition } from './components/patents/PatentExhibition.jsx';
import { TechnicalMatrix } from './components/skills/TechnicalMatrix.jsx';
import { HonorsSection } from './components/credentials/HonorsSection.jsx';
import { Footer } from './components/common/Footer.jsx';
import { CinematicCursor } from './components/common/CinematicCursor.jsx';
import { ScrollSpine } from './components/navigation/ScrollSpine.jsx';
import { AudioController } from './components/common/AudioController.jsx';

export const App = () => {
  return (
    <div className="portfolio-app-root">
      {/* Interactive Cinematic Mouse Aura */}
      <CinematicCursor />

      {/* Chapter Scroll Progress Spine (Side Numbered Navigation) */}
      <ScrollSpine />

      {/* Floating Discreet Ambient Audio Control (No Top Ribbon) */}
      <div className="floating-ambient-audio">
        <AudioController />
      </div>

      {/* 3D WebGL Background Layer (Atmospheric falling leaves & embers) */}
      <SpatialCanvas />

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

          .floating-ambient-audio {
            position: fixed;
            top: 24px;
            right: 28px;
            z-index: 50;
          }

          @media (max-width: 768px) {
            .floating-ambient-audio {
              top: 16px;
              right: 16px;
            }
          }
        `}</style>
      </div>
    );
  };

export default App;
