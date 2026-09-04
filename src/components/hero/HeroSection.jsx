import React from 'react';
import { useTheme } from '../../context/ThemeContext.jsx';
import { ArrowDownRight } from 'lucide-react';
import resumeData from '../../../data/resume_data.json';

export const HeroSection = () => {
  const { theme } = useTheme();
  const isTsushima = theme === 'tsushima';

  return (
    <section id="top" className="hero-section">
      {/* Pinned Fixed Photographic Layer - completely responsive to any screen zoom or ultrawide */}
      <div className="hero-fixed-backdrop" aria-hidden="true" />
      <div className="hero-vignette-overlay" aria-hidden="true" />

      <div className="container hero-container">
        <div className="hero-centered-layout">
          
          {/* Tracked Kicker Badge */}
          <div className="hero-kicker-wrap">
            <span className="hero-kicker mono">
              {isTsushima
                ? '迎 RESEARCH & SYSTEMS ARCHITECTURE // CLASS OF 2027'
                : 'SYS_LOG // RESEARCH & SYSTEMS ARCHITECTURE // VIT 2027'}
            </span>
          </div>

          {/* Monumental Centered Editorial Headline */}
          <h1 className="hero-title">
            DISCIPLINED PHYSICS
            <br />
            <span className="hero-title-italic">
              INTO SCALABLE SYSTEMS
            </span>
          </h1>

          {/* Centered Concise Bio Statement */}
          <p className="hero-bio">
            I am <strong className="bio-name">{resumeData.personal.name}</strong>, a Computer Science Engineer and researcher developing Physics-Informed Neural Network (PINN) digital twins, real-time analytical lakehouses, and GPU-accelerated computing pipelines.
          </p>

          {/* Centered Action Button */}
          <div className="hero-cta-wrap">
            <a href="#projects" className="hero-primary-pill">
              <span>Explore Selected Work</span>
              <ArrowDownRight size={16} />
            </a>
            <a href="#patents" className="hero-secondary-pill">
              <span>Published Patents</span>
            </a>
          </div>

          {/* Centered Minimalist Evidence Bar */}
          <div className="hero-evidence-bar">
            <span className="evidence-item">
              <strong className="evidence-num">78M+</strong>
              <span className="evidence-lbl">Time Steps Evaluated</span>
            </span>
            <span className="evidence-sep" aria-hidden="true">·</span>
            <span className="evidence-item">
              <strong className="evidence-num">−65.6%</strong>
              <span className="evidence-lbl">Rollout Error Reduction</span>
            </span>
            <span className="evidence-sep" aria-hidden="true">·</span>
            <span className="evidence-item">
              <strong className="evidence-num">2 Patents</strong>
              <span className="evidence-lbl">Published with IP India</span>
            </span>
          </div>

        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          min-height: 96vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: calc(var(--space-24) + 40px);
          padding-bottom: var(--space-24);
          z-index: var(--z-content);
          overflow: hidden;
        }

        /* Fixed Background: Never shifts or crops weirdly on zoom-out */
        .hero-fixed-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-image: var(--hero-bg-image);
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          opacity: 0.35;
          z-index: -2;
          filter: contrast(1.1) brightness(0.85);
          pointer-events: none;
          transition: background-image 600ms ease, opacity 600ms ease;
        }

        /* Deep Vignette Fade that smoothly transitions down into the page */
        .hero-vignette-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: 
            radial-gradient(ellipse at 50% 45%, transparent 20%, rgba(10, 11, 14, 0.85) 85%),
            linear-gradient(to bottom, transparent 0%, rgba(10, 11, 14, 0.4) 60%, var(--bg-primary) 100%);
          z-index: -1;
          pointer-events: none;
        }

        .hero-container {
          position: relative;
          z-index: 2;
          width: 100%;
        }

        /* Pure Centered Editorial Layout */
        .hero-centered-layout {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 980px;
          margin: 0 auto;
          gap: var(--space-6);
        }

        /* Tracked Kicker */
        .hero-kicker-wrap {
          display: flex;
          justify-content: center;
        }

        .hero-kicker {
          font-size: 0.75rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-muted);
          padding: 6px 16px;
          background: rgba(18, 20, 26, 0.65);
          backdrop-filter: blur(10px);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
        }

        /* Monumental Centered Headline */
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(2.8rem, 6.2vw, 5.8rem);
          font-weight: 400;
          letter-spacing: 0.02em;
          line-height: 1.04;
          color: var(--text-primary);
          text-transform: uppercase;
          text-shadow: 0 4px 30px rgba(0, 0, 0, 0.7);
        }

        /* Glowing Italic Swash Accent */
        .hero-title-italic {
          font-family: 'Instrument Serif', 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 400;
          text-transform: uppercase;
          color: #E84D3D;
          text-shadow: 
            0 0 40px rgba(200, 50, 38, 0.45),
            0 0 80px rgba(200, 50, 38, 0.2);
          display: inline-block;
          margin-top: 4px;
        }

        /* Centered Bio */
        .hero-bio {
          font-family: var(--font-body);
          font-size: clamp(1.0625rem, 1.4vw, 1.25rem);
          font-weight: 300;
          line-height: 1.7;
          color: var(--text-secondary);
          max-width: 680px;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.6);
        }

        .bio-name {
          color: var(--text-primary);
          font-weight: 600;
        }

        /* Centered Action Buttons */
        .hero-cta-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-4);
          margin-top: var(--space-2);
          flex-wrap: wrap;
        }

        .hero-primary-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          background: var(--accent-primary);
          color: var(--accent-text);
          font-family: var(--font-body);
          font-size: 0.9375rem;
          font-weight: 600;
          border-radius: var(--radius-full);
          box-shadow: var(--shadow-accent);
          transition: transform var(--transition-fast), background-color var(--transition-fast);
        }

        .hero-primary-pill:hover {
          background: var(--accent-hover);
          transform: translateY(-2px);
        }

        .hero-secondary-pill {
          display: inline-flex;
          align-items: center;
          padding: 13px 26px;
          background: rgba(18, 20, 26, 0.65);
          backdrop-filter: blur(10px);
          border: 1px solid var(--border-prominent);
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 0.9375rem;
          font-weight: 500;
          border-radius: var(--radius-full);
          transition: border-color var(--transition-fast), color var(--transition-fast);
        }

        .hero-secondary-pill:hover {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
        }

        /* Centered Evidence Ribbon */
        .hero-evidence-bar {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-5);
          padding: 10px 24px;
          background: rgba(10, 11, 14, 0.55);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          margin-top: var(--space-4);
          flex-wrap: wrap;
        }

        .evidence-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8125rem;
          color: var(--text-secondary);
        }

        .evidence-num {
          font-family: var(--font-heading);
          font-size: 0.9375rem;
          color: var(--text-primary);
        }

        .evidence-lbl {
          color: var(--text-muted);
        }

        .evidence-sep {
          color: var(--border-prominent);
          font-size: 1rem;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          .hero-evidence-bar {
            flex-direction: column;
            gap: var(--space-2);
            border-radius: var(--radius-md);
            padding: var(--space-3);
          }
          .evidence-sep {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};
