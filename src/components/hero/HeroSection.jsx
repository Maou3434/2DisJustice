import React from 'react';
import { Sparkles, ArrowDown } from 'lucide-react';
import { ParallaxLayer } from '../parallax/ParallaxLayer.jsx';

export const HeroSection = () => {
  return (
    <section id="top" className="hero-section">
      <div className="container hero-container">
        <div className="hero-landing-pure">
          
          {/* Background Ambient Kanji Watermark (Speed 0.42, Z -180) */}
          <ParallaxLayer speed={0.42} mouseFactor={16} zDepth={-180} className="hero-bg-kanji-wrap">
            <span className="hero-bg-kanji">志</span>
          </ParallaxLayer>

          {/* Subtle Japanese Inkan Seal Stamp (Speed 0.94) */}
          <ParallaxLayer speed={0.94} mouseFactor={22} zDepth={20} className="landing-seal-wrap" aria-hidden="true">
            <span className="landing-seal">志</span>
          </ParallaxLayer>

          {/* Monumental Name-Only Headline (Speed 1.0, 3D tilt) */}
          <ParallaxLayer speed={1.0} mouseFactor={24} rotateFactor={1.5} zDepth={40}>
            <h1 className="landing-name">
              <span className="first-name">Abimanyu</span>
              <span className="last-name">Jayaganesh</span>
            </h1>
            <p className="landing-title-sub">
              Physics-Informed ML · Lakehouse Architectures · GPU Systems
            </p>
            <p className="landing-institution mono">
              Vellore Institute of Technology (VIT)
            </p>
          </ParallaxLayer>

          {/* Bottom Airspace Controls: Anchored low in foreground shadow, clearing the samurai figure */}
          <div className="hero-bottom-controls">
            <div className="landing-cue mono">
              <Sparkles size={13} className="cue-icon" />
              <span>Move cursor to part the mountain mist</span>
            </div>
            <div className="landing-scroll-cue">
              <ArrowDown size={14} className="scroll-arrow" />
              <span className="scroll-text mono">SCROLL TO ENTER ARCHIVES</span>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          z-index: var(--z-content);
          overflow: hidden;
          pointer-events: none;
        }

        .hero-container {
          position: relative;
          z-index: 2;
          width: 100%;
        }

        /* Pure Minimalist Name-Only Landing */
        .hero-landing-pure {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 1200px;
          margin: 0 auto;
          gap: var(--space-4);
          pointer-events: auto;
          padding-bottom: 80px;
        }

        .hero-bg-kanji-wrap {
          position: absolute;
          top: 45%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: -1;
          user-select: none;
        }

        .hero-bg-kanji {
          font-family: var(--font-heading);
          font-size: clamp(14rem, 30vw, 32rem);
          font-weight: 900;
          color: rgba(245, 239, 230, 0.035);
          text-shadow: 0 0 100px rgba(0, 0, 0, 0.8);
          line-height: 1;
        }

        .landing-seal-wrap {
          margin-bottom: var(--space-2);
        }

        .landing-seal {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          background: var(--accent-primary);
          color: #FFF;
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 700;
          border-radius: var(--radius-sm);
          box-shadow: 0 0 25px rgba(200, 50, 38, 0.4);
        }

        /* Monumental Symmetrical Name Typography */
        .landing-name {
          font-family: var(--font-display);
          font-size: clamp(3.2rem, 8.2vw, 7.8rem);
          line-height: 1.0;
          color: var(--text-primary);
          text-transform: uppercase;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-shadow: 0 4px 40px rgba(0, 0, 0, 0.85);
          user-select: none;
        }

        .first-name {
          font-weight: 300;
          letter-spacing: 0.08em;
          color: var(--text-primary);
        }

        .last-name {
          font-family: var(--font-display);
          font-style: normal;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: #D4382B;
          text-shadow: 
            0 4px 30px rgba(0, 0, 0, 0.85),
            0 0 25px rgba(212, 56, 43, 0.22);
          margin-top: 2px;
        }

        .landing-title-sub {
          font-family: var(--font-body);
          font-size: clamp(0.95rem, 1.8vw, 1.25rem);
          font-weight: 500;
          letter-spacing: 0.08em;
          color: var(--text-secondary);
          margin-top: var(--space-4);
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.9);
        }

        .landing-institution {
          font-size: 0.8125rem;
          letter-spacing: 0.16em;
          color: var(--text-secondary);
          text-transform: uppercase;
          margin-top: var(--space-2);
          border-bottom: 1px solid var(--accent-primary);
          padding-bottom: 2px;
          display: inline-block;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.8);
        }

        /* Bottom Controls Airspace: Positioned low to free samurai figure */
        .hero-bottom-controls {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          z-index: 10;
          pointer-events: auto;
          width: 100%;
          max-width: 500px;
        }

        .landing-cue {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 6px 18px;
          background: rgba(10, 11, 14, 0.75);
          backdrop-filter: blur(14px);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          color: var(--text-secondary);
          user-select: none;
          transition: border-color var(--transition-fast), color var(--transition-fast);
        }

        .landing-cue:hover {
          border-color: var(--border-prominent);
          color: var(--text-primary);
        }

        .cue-icon {
          color: var(--accent-primary);
        }

        .landing-scroll-cue {
          display: flex;
          align-items: center;
          gap: 6px;
          opacity: 0.65;
          transition: opacity var(--transition-fast);
          user-select: none;
        }

        .landing-scroll-cue:hover {
          opacity: 1;
        }

        .scroll-arrow {
          font-size: 1rem;
          color: var(--accent-primary);
          animation: bounceSlow 2s infinite ease-in-out;
        }

        .scroll-text {
          font-size: 0.6875rem;
          letter-spacing: 0.16em;
          color: var(--text-muted);
        }

        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }

        @media (max-width: 768px) {
          .landing-name {
            font-size: 3.4rem;
          }
        }
      `}</style>
    </section>
  );
};
