import React from 'react';
import { useTheme } from '../../context/ThemeContext.jsx';
import { ArrowDownRight, Compass, ShieldCheck, Sparkles } from 'lucide-react';
import resumeData from '../../../data/resume_data.json';

export const HeroSection = () => {
  const { theme } = useTheme();
  const isTsushima = theme === 'tsushima';

  return (
    <section id="top" className="hero-section">
      {/* Deep Photographic Atmospheric Layer */}
      <div className="hero-photographic-backdrop" aria-hidden="true" />
      <div className="hero-vignette-overlay" aria-hidden="true" />

      <div className="container hero-container">
        <div className="hero-split">
          
          {/* Left: Welcoming Narrative */}
          <div className="hero-text-block">
            
            {/* Warm Welcoming Salutation */}
            <div className="hero-greeting">
              {isTsushima ? (
                <div className="greeting-tsushima">
                  <span className="kanji-seal">迎</span>
                  <span className="greeting-label">ようこそ · WELCOME TO MY WORKSHOP &amp; RESEARCH ARCHIVE</span>
                </div>
              ) : (
                <div className="greeting-architectural">
                  <span className="greeting-dot" />
                  <span className="greeting-label">HELLO · PORTFOLIO &amp; RESEARCH LOG OF ABIMANYU JAYAGANESH</span>
                </div>
              )}
            </div>

            {/* Main Welcoming Headline */}
            <h1 className="hero-title">
              {isTsushima ? (
                <>
                  Crafting <span className="highlight-text">Physics-ML</span> &amp; High-Throughput <span className="highlight-text">Systems</span>
                </>
              ) : (
                <>
                  Physics-Informed ML <span className="slash">&amp;</span> High-Throughput Lakehouses
                </>
              )}
            </h1>

            {/* Warm Human Intro */}
            <p className="hero-bio">
              I am <strong className="hero-name">{resumeData.personal.name}</strong>, a Computer Science Engineer and researcher at Vellore Institute of Technology (VIT). I specialize in Physics-Informed Neural Network (PINN) digital twins for battery electrochemistry, accelerated computing, and real-time analytical lakehouses.
            </p>

            {/* Completely Unboxed Stat Ribbon */}
            <div className="hero-stat-ribbon">
              <div className="stat-item">
                <span className="stat-number">78M+</span>
                <span className="stat-desc">Time steps evaluated across 522 thermal cycles</span>
              </div>

              <div className="stat-divider" aria-hidden="true" />

              <div className="stat-item">
                <span className="stat-number">−65.6%</span>
                <span className="stat-desc">Max rollout error reduction in battery PINN</span>
              </div>

              <div className="stat-divider" aria-hidden="true" />

              <div className="stat-item">
                <span className="stat-number">2 Patents</span>
                <span className="stat-desc">Published with IP India (Colour &amp; Physiology IoT)</span>
              </div>
            </div>

            {/* Welcoming Action Buttons */}
            <div className="hero-actions">
              <a href="#projects" className="primary-btn">
                <span>Explore Selected Projects</span>
                <ArrowDownRight size={16} />
              </a>
              <a href="#patents" className="secondary-btn">
                <span>View Published Patents</span>
              </a>
              <a href="#contact" className="warm-link">
                <span>Get in touch &rarr;</span>
              </a>
            </div>

          </div>

          {/* Right: Unboxed 3D Artifact Showcase with Natural Breathing Space */}
          <div className="hero-canvas-guide">
            <div className="artifact-descriptor">
              <div className="descriptor-title">
                {isTsushima ? '3D Ceremonial Katana' : '3D PINN Battery Digital Twin'}
              </div>
              <p className="descriptor-note">
                {isTsushima
                  ? 'Procedural Tamahagane steel blade with sori curvature & hamon temper line. Hover and move your cursor across the scene to catch the light along the razor edge.'
                  : 'Procedural 60-cell lithium module with finite-element thermal gradients. Cells pulse with simulated heat wave propagation and ODE constraints.'}
              </p>
              <div className="descriptor-subtle-hint">
                <Sparkles size={13} className="hint-star" />
                <span>Move cursor to illuminate reflections &amp; tilt the view</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          padding-top: calc(var(--space-24) + 28px);
          padding-bottom: var(--space-20);
          z-index: var(--z-content);
          min-height: 94vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        /* Cinematic Background Layer */
        .hero-photographic-backdrop {
          position: absolute;
          inset: 0;
          background-image: var(--hero-bg-image);
          background-size: cover;
          background-position: center 35%;
          opacity: 0.32;
          z-index: -2;
          filter: contrast(1.1) brightness(0.85);
          transition: background-image 600ms ease, opacity 600ms ease;
        }

        /* Soft Gradient Vignette that naturally welcomes the visitor */
        .hero-vignette-overlay {
          position: absolute;
          inset: 0;
          background: 
            linear-gradient(to bottom, transparent 0%, rgba(10, 11, 14, 0.4) 60%, var(--bg-primary) 100%),
            radial-gradient(ellipse at 80% 45%, transparent 25%, var(--bg-primary) 90%);
          z-index: -1;
          pointer-events: none;
        }

        .hero-container {
          position: relative;
          z-index: 2;
        }

        .hero-split {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: var(--space-10);
          align-items: center;
        }

        .hero-text-block {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
          max-width: 680px;
        }

        /* Welcoming Greeting */
        .hero-greeting {
          display: flex;
          align-items: center;
        }

        .greeting-tsushima {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: var(--text-secondary);
        }

        .kanji-seal {
          width: 24px;
          height: 24px;
          background: var(--accent-primary);
          color: #FFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-heading);
          font-size: 0.875rem;
          font-weight: 700;
          border-radius: 2px;
          box-shadow: var(--shadow-accent);
        }

        .greeting-label {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          color: var(--text-muted);
        }

        .greeting-architectural {
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }

        .greeting-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent-primary);
          box-shadow: 0 0 10px var(--accent-primary);
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(2.4rem, 4.8vw, 4.4rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: var(--text-primary);
          text-shadow: 0 2px 24px rgba(0, 0, 0, 0.5);
        }

        .highlight-text {
          color: var(--accent-primary);
          position: relative;
        }

        .slash {
          color: var(--accent-primary);
          font-weight: 300;
          margin: 0 4px;
        }

        .hero-bio {
          font-family: var(--font-body);
          font-size: clamp(1.0625rem, 1.4vw, 1.25rem);
          line-height: 1.7;
          color: var(--text-secondary);
        }

        .hero-name {
          color: var(--text-primary);
          font-weight: 600;
        }

        /* Completely Unboxed Stats Ribbon */
        .hero-stat-ribbon {
          display: flex;
          align-items: center;
          gap: var(--space-6);
          padding: var(--space-4) 0;
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .stat-number {
          font-family: var(--font-heading);
          font-size: 1.875rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.1;
        }

        .stat-desc {
          font-size: 0.75rem;
          color: var(--text-muted);
          line-height: 1.35;
          max-width: 170px;
        }

        .stat-divider {
          width: 1px;
          height: 42px;
          background: var(--border-subtle);
          flex-shrink: 0;
        }

        /* Welcoming Actions */
        .hero-actions {
          display: flex;
          align-items: center;
          gap: var(--space-5);
          flex-wrap: wrap;
          margin-top: var(--space-2);
        }

        .primary-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 26px;
          background: var(--accent-primary);
          color: var(--accent-text);
          font-family: var(--font-body);
          font-size: 0.9375rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-accent);
          transition: transform var(--transition-fast), background-color var(--transition-fast);
        }

        .primary-btn:hover {
          background: var(--accent-hover);
          transform: translateY(-2px);
        }

        .secondary-btn {
          display: inline-flex;
          align-items: center;
          padding: 12px 22px;
          background: transparent;
          border: 1px solid var(--border-prominent);
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 0.9375rem;
          font-weight: 500;
          border-radius: var(--radius-md);
          transition: border-color var(--transition-fast), color var(--transition-fast);
        }

        .secondary-btn:hover {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
        }

        .warm-link {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          color: var(--text-secondary);
          padding: 8px 12px;
          transition: color var(--transition-fast);
        }

        .warm-link:hover {
          color: var(--text-primary);
        }

        /* Right Unboxed 3D Artifact Showcase */
        .hero-canvas-guide {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          pointer-events: none;
        }

        .artifact-descriptor {
          max-width: 320px;
          text-align: right;
          margin-top: 240px; /* Sits naturally under the 3D blade/battery in the canvas */
          pointer-events: auto;
        }

        .descriptor-title {
          font-family: var(--font-heading);
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .descriptor-note {
          font-size: 0.8125rem;
          line-height: 1.6;
          color: var(--text-muted);
          margin-bottom: 8px;
        }

        .descriptor-subtle-hint {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.6875rem;
          color: var(--accent-primary);
        }

        .hint-star {
          flex-shrink: 0;
        }

        @media (max-width: 960px) {
          .hero-split {
            grid-template-columns: 1fr;
          }
          .hero-stat-ribbon {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--space-4);
          }
          .stat-divider {
            display: none;
          }
          .artifact-descriptor {
            margin-top: 20px;
            text-align: left;
          }
        }
      `}</style>
    </section>
  );
};
