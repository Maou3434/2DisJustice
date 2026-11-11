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
import { ChapterInterlude } from './components/common/ChapterInterlude.jsx';

export const App = () => {
  useEffect(() => {
    const sections = document.querySelectorAll('.scene-section');
    const interludes = document.querySelectorAll('.chapter-interlude');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-inview');
          }
        });
      },
      { threshold: 0.12 }
    );

    sections.forEach((sec) => observer.observe(sec));

    let rafId = null;

    const updateScrollChoreography = () => {
      rafId = null;
      const vh = window.innerHeight || 800;

      // 1. Live Section Scroll Physics: Background Parallax, Scale & Spine Fill
      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.bottom > -200 && rect.top < vh + 200) {
          // Normalized center offset [-1 .. +1]
          const centerDelta = (vh * 0.5 - (rect.top + rect.height * 0.5)) / vh;
          const parallaxPx = centerDelta * -48;
          const bgScale = 1.05 + Math.abs(centerDelta) * 0.03;

          // Section scroll completion [0 .. 100%]
          const progress = Math.max(
            0,
            Math.min(1, (vh * 0.65 - rect.top) / Math.max(rect.height * 0.85, 1))
          );

          sec.style.setProperty('--bg-parallax', `${parallaxPx.toFixed(1)}px`);
          sec.style.setProperty('--bg-scale', bgScale.toFixed(3));
          sec.style.setProperty('--watermark-y', `${(centerDelta * -36).toFixed(1)}px`);
          sec.style.setProperty('--section-fill', `${(progress * 100).toFixed(1)}%`);
        }
      });

      // 2. Live Interlude Transition Physics: Sweeping Wind Slash & Kanji Drift
      interludes.forEach((inter) => {
        const rect = inter.getBoundingClientRect();
        if (rect.bottom > -100 && rect.top < vh + 100) {
          // Progress from bottom of screen (-1) to top (+1)
          const norm = (vh * 0.5 - (rect.top + rect.height * 0.5)) / (vh * 0.6);
          const clamped = Math.max(-1, Math.min(1, norm));
          const windShift = clamped * 110;
          const kanjiShift = clamped * -65;
          const scale = 1.04 - Math.abs(clamped) * 0.06;

          inter.style.setProperty('--wind-shift', `${windShift.toFixed(1)}px`);
          inter.style.setProperty('--kanji-shift', `${kanjiShift.toFixed(1)}px`);
          inter.style.setProperty('--interlude-scale', scale.toFixed(3));
        }
      });
    };

    const handleScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(updateScrollChoreography);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    updateScrollChoreography();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="portfolio-app-root">
      {/* Guiding Wind & Momiji Vortex Preloader */}
      <Preloader />

      {/* Interactive Cinematic Mouse Aura */}
      <CinematicCursor />

      {/* Homepage 3D Momiji Petals & Atmospheric Embers */}
      <SpatialCanvas />

      {/* Top Audio Control & Mobile Index Drawer */}
      <Header />

      {/* Chapter Scroll Progress Spine (Side Numbered Navigation) */}
      <ScrollSpine />

      {/* Main Foreground Editorial Scenes with Scroll-Interactive Chapter Transitions */}
      <main className="content-surface">
        <HeroSection />

        <ChapterInterlude
          actNumber="02"
          kanji="経験 // TENURE"
          title="RESEARCH & ENGINEERING"
          subtitle="PHYSICS-INFORMED ML · MICROSERVICES · EDGE IOT"
        />
        <ExperienceTimeline />

        <ChapterInterlude
          actNumber="03"
          kanji="機構 // SYSTEMS"
          title="SELECTED ARCHITECTURE"
          subtitle="LAKEHOUSE OLAP · GPU COMBINATORICS · PAAS"
        />
        <ProjectGallery />

        <ChapterInterlude
          actNumber="04"
          kanji="特許 // PATENTS"
          title="PUBLISHED INVENTIONS"
          subtitle="OFFICIAL GAZETTE OF THE PATENT OFFICE OF INDIA"
        />
        <PatentExhibition />

        <ChapterInterlude
          actNumber="05"
          kanji="技芸 // MATRIX"
          title="TECHNICAL DISCIPLINES"
          subtitle="CORE LANGUAGES · DEEP LEARNING · CUDA ACCELERATION"
        />
        <TechnicalMatrix />

        <ChapterInterlude
          actNumber="06"
          kanji="栄誉 // HONORS"
          title="ACADEMIC & DISTINCTIONS"
          subtitle="VIT VELLORE · IEEE IAS · NVIDIA & ORACLE CREDENTIALS"
        />
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
