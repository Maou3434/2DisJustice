import React from 'react';
import { SceneBackdrop } from '../common/SceneBackdrop.jsx';

export const HeroSection = () => {
  return (
    <section id="top" className="scene-section hero-section" aria-label="Prologue">
      {/* Dominant Atmospheric Environment: Sunrise Maple Grove & Torii Gate */}
      <SceneBackdrop
        image="/images/cinematic_maple.png"
        position="center 30%"
        opacity={0.88}
        overlayDarkness={0.70}
      />

      {/* Controlled Atmosphere Mask for Focused Typographic Negative Space */}
      <div className="hero-atmosphere-mask" aria-hidden="true" />

      <div className="container hero-container">
        {/* Layered Monumental Title: Exact Viewport Center */}
        <h1 className="hero-layered-title" aria-label="Abimanyu Jayaganesh">
          <span className="layer-word layer-abimanyu">
            <span className="swash-cap">A</span>bimanyu
          </span>
          <span className="layer-word layer-jayaganesh">
            <span className="swash-cap">J</span>ayaganes<span className="swash-term">h</span>
          </span>
        </h1>

        {/* Bottom Center Descriptor Masthead */}
        <div className="hero-bottom-masthead">
          <div className="specimen-sub-primary mono">
            SOFTWARE ENGINEER · ML · SYSTEMS
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          z-index: var(--z-content);
          overflow: hidden;
        }

        /* Controlled Radial Atmosphere Vignette for Focused Readability */
        .hero-atmosphere-mask {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 80% 65% at 50% 50%,
            rgba(10, 11, 14, 0.74) 0%,
            rgba(10, 11, 14, 0.46) 45%,
            rgba(10, 11, 14, 0.10) 80%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        .hero-container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 100%;
          height: 100%;
          padding: 0 3vw;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Page-Filling Layered Title: Exactly Dead-Center */
        .hero-layered-title {
          font-family: var(--font-display);
          font-size: clamp(4.5rem, 14.5vw, 15.0rem);
          font-weight: 400;
          line-height: 0.82;
          letter-spacing: -0.01em;
          color: #F5EFE6;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          margin: 0;
          padding: 0;
          text-align: center;
          user-select: none;
        }

        /* Surgical OpenType Stylistic Sets for Haute Couture Editorial Elegance */
        .swash-cap {
          font-feature-settings: "ss01" 1;
          display: inline-block;
        }

        .swash-term {
          font-feature-settings: "ss03" 1;
          display: inline-block;
        }

        .layer-word {
          display: block;
          white-space: nowrap;
          transition: transform 300ms ease;
          text-shadow: 
            0 4px 45px rgba(0, 0, 0, 0.92),
            0 2px 10px rgba(0, 0, 0, 0.98);
        }

        /* Abimanyu Layered Over Jayaganesh */
        .layer-abimanyu {
          position: relative;
          z-index: 3;
          margin-bottom: -0.07em; /* Controlled luxury layering overlap */
          text-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.96),
            0 2px 12px rgba(0, 0, 0, 0.98);
        }

        .layer-jayaganesh {
          position: relative;
          z-index: 2;
        }

        /* Descriptor Masthead: Centered between Name and Bottom of Viewport */
        .hero-bottom-masthead {
          position: absolute;
          bottom: clamp(84px, 13.5vh, 140px);
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          z-index: 4;
          width: 100%;
          pointer-events: auto;
        }

        /* Subtitle: Refined Bottom Ground Line */
        .specimen-sub-primary {
          color: var(--accent-primary);
          font-family: var(--font-mono);
          font-size: clamp(0.85rem, 1.2vw, 1.15rem);
          font-weight: 700;
          letter-spacing: 0.32em;
          text-indent: 0.32em;
          text-transform: uppercase;
          text-shadow: 0 2px 18px rgba(0, 0, 0, 0.95);
        }

        @media (max-width: 768px) {
          .hero-layered-title {
            font-size: clamp(3.0rem, 16vw, 5.5rem);
            line-height: 0.80;
          }

          .layer-abimanyu {
            margin-bottom: -0.10em;
          }

          .hero-specimen-subtitles {
            margin-top: clamp(32px, 6vh, 48px);
          }

          .specimen-sub-primary {
            letter-spacing: 0.22em;
            text-indent: 0.22em;
            font-size: 0.82rem;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
