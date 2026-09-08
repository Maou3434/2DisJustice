import React from 'react';
import { useTheme } from '../../context/ThemeContext.jsx';
import { Sparkles, ArrowDown } from 'lucide-react';
import { ParallaxLayer } from '../parallax/ParallaxLayer.jsx';

export const HeroSection = () => {
  const { theme } = useTheme();
  const isTsushima = theme === 'tsushima';

  return (
    <section id="top" className="hero-section">
      <div className="container hero-container">
        <div className="hero-landing-pure">
          
          {/* Background Ambient Kanji Watermark (Speed 0.42, Z -180) */}
          <ParallaxLayer speed={0.42} mouseFactor={16} zDepth={-180} className="hero-bg-kanji-wrap">
            <span className="hero-bg-kanji">{isTsushima ? '志' : 'AJ'}</span>
          </ParallaxLayer>

          {/* Subtle Japanese Inkan Seal Stamp (Speed 0.94) */}
          <ParallaxLayer speed={0.94} mouseFactor={22} zDepth={20} className="landing-seal-wrap" aria-hidden="true">
            <span className="landing-seal">{isTsushima ? '志' : 'AJ'}</span>
          </ParallaxLayer>

          {/* Monumental Name-Only Headline (Speed 1.0, 3D tilt) */}
          <ParallaxLayer speed={1.0} mouseFactor={28} rotateFactor={2.0} zDepth={40}>
            <h1 className="landing-name">
              <span className="first-name">Abimanyu</span>
              <span className="last-name">Jayaganesh</span>
            </h1>
          </ParallaxLayer>

          {/* Waterbrush Interaction Hint (Speed 1.06) */}
          <ParallaxLayer speed={1.06} mouseFactor={14} zDepth={15}>
            <div className="landing-cue mono">
              <Sparkles size={13} className="cue-icon" />
              <span>Move cursor to paint &amp; reveal the Japanese landscape</span>
            </div>
          </ParallaxLayer>

          {/* Clean Editorial Scroll Cue (Speed 1.12) */}
          <ParallaxLayer speed={1.12} mouseFactor={10} zDepth={10}>
            <div className="landing-scroll-cue">
              <ArrowDown size={14} className="scroll-arrow" />
              <span className="scroll-text mono">SCROLL TO ENTER ARCHIVES</span>
            </div>
          </ParallaxLayer>

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

        /* Monumental Name Typography */
        .landing-name {
          font-family: var(--font-display);
          font-size: clamp(3.2rem, 8.2vw, 7.8rem);
          font-weight: 400;
          letter-spacing: 0.03em;
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
          color: var(--text-primary);
        }

        .last-name {
          font-family: 'Instrument Serif', 'Cormorant Garamond', serif;
          font-style: italic;
          color: #E84D3D;
          text-shadow: 
            0 0 45px rgba(200, 50, 38, 0.5),
            0 0 90px rgba(200, 50, 38, 0.25);
          margin-top: -6px;
        }

        /* Brush Interaction Cue */
        .landing-cue {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 22px;
          background: rgba(10, 11, 14, 0.65);
          backdrop-filter: blur(12px);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          color: var(--text-secondary);
          margin-top: var(--space-4);
          user-select: none;
        }

        .brush-icon {
          font-size: 0.9rem;
        }

        /* Scroll Cue */
        .landing-scroll-cue {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          margin-top: var(--space-8);
          opacity: 0.7;
          transition: opacity var(--transition-fast);
          user-select: none;
        }

        .landing-scroll-cue:hover {
          opacity: 1;
        }

        .scroll-arrow {
          font-size: 1.25rem;
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
