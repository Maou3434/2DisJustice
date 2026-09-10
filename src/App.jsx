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
import { WaterbrushCanvas } from './components/common/WaterbrushCanvas.jsx';

import { ParallaxProvider } from './components/parallax/ParallaxEngine.jsx';
import { ParallaxBackdrop } from './components/parallax/ParallaxBackdrop.jsx';

export const App = () => {
  return (
    <ParallaxProvider>
      <div className="portfolio-app-root">
        {/* Interactive Waterbrush Japanese Painting Reveal Layer */}
        <WaterbrushCanvas />

        {/* Interactive Cinematic Mouse Aura */}
        <CinematicCursor />

        {/* Chapter Scroll Progress Spine */}
        <ScrollSpine />

        {/* 3D WebGL Background Layer (Atmospheric falling leaves & embers) */}
        <SpatialCanvas />

        {/* Atmospheric Spatial Overlay */}
        <div className="spatial-overlay" aria-hidden="true" />

        {/* Multi-Plane Parallax Depth Backdrop (Horizons, Sumi Ink, Floating Leaves) */}
        <ParallaxBackdrop />

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
            background: transparent;
            color: var(--text-primary);
          }

          .content-surface {
            position: relative;
            z-index: var(--z-content);
          }
        `}</style>
      </div>
    </ParallaxProvider>
  );
};

export default App;
