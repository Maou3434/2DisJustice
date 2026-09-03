import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext.jsx';
import { ArrowDownRight, FileCode, ShieldCheck, Cpu, Eye, Sparkles } from 'lucide-react';
import resumeData from '../../../data/resume_data.json';

export const HeroSection = () => {
  const { theme } = useTheme();
  const isTsushima = theme === 'tsushima';
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      setCursorPos({
        x: Math.round((e.clientX / window.innerWidth) * 100),
        y: Math.round((e.clientY / window.innerHeight) * 100)
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <section id="top" className="hero-section">
      {/* Deep Photographic Atmospheric Layer */}
      <div className="hero-photographic-backdrop" aria-hidden="true" />
      <div className="hero-vignette-overlay" aria-hidden="true" />

      <div className="container hero-container">
        
        {/* Main Content Split: Left Text / Right 3D HUD */}
        <div className="hero-split">
          
          {/* Left Hero Narrative */}
          <div className="hero-text-block">
            {/* Top Status Telemetry / Poetic Kicker */}
            <div className="hero-kicker">
              {isTsushima ? (
                <div className="kicker-tsushima">
                  <span className="kanji-badge">道</span>
                  <span className="mono">VELLORE INSTITUTE OF TECHNOLOGY // CLASS OF 2027</span>
                </div>
              ) : (
                <div className="kicker-architectural">
                  <span className="pulse-indicator" />
                  <span className="mono">SYS_STATUS: ACTIVE // CGPA: 8.47 // COIMBATORE, TN</span>
                </div>
              )}
            </div>

            <h1 className="hero-title">
              {isTsushima ? (
                <>
                  Disciplined <span className="highlight-text">Physics</span> &amp; High-Velocity <span className="highlight-text">Systems</span>
                </>
              ) : (
                <>
                  Physics-Informed ML <span className="slash">/</span> Real-Time Lakehouses
                </>
              )}
            </h1>

            <p className="hero-thesis">
              I am <strong className="hero-name">{resumeData.personal.name}</strong>, a Computer Science Engineer and researcher developing Physics-Informed Neural Network (PINN) digital twins, high-frequency IoT pipelines, and scalable Delta Lake data platforms.
            </p>

            {/* Empirical Evidence Badges */}
            <div className="hero-metrics-grid">
              <div className="metric-card">
                <div className="metric-header">
                  <Cpu size={15} className="metric-icon" />
                  <span className="metric-label">EV Battery PINN</span>
                </div>
                <div className="metric-value">78M+</div>
                <div className="metric-detail">Time steps evaluated across 522 thermal trajectories</div>
              </div>

              <div className="metric-card">
                <div className="metric-header">
                  <FileCode size={15} className="metric-icon" />
                  <span className="metric-label">Rollout Accuracy</span>
                </div>
                <div className="metric-value">−65.6%</div>
                <div className="metric-detail">Max error reduction on unseen WLTP2 drive cycles</div>
              </div>

              <div className="metric-card">
                <div className="metric-header">
                  <ShieldCheck size={15} className="metric-icon" />
                  <span className="metric-label">Intellectual Property</span>
                </div>
                <div className="metric-value">2 Patents</div>
                <div className="metric-detail">Published with IP India (Colour Matching &amp; Physiological IoT)</div>
              </div>
            </div>

            {/* Action Row */}
            <div className="hero-actions">
              <a href="#projects" className="primary-btn">
                <span>Explore Engineering Work</span>
                <ArrowDownRight size={16} />
              </a>
              <a href="#patents" className="secondary-btn">
                <span>Published Patents</span>
              </a>
              <a href="#contact" className="text-btn">
                <span>Direct Terminal &rarr;</span>
              </a>
            </div>
          </div>

          {/* Right 3D Model HUD / Narrative Framing */}
          <div className="hero-hud-block">
            <div className="hud-card">
              <div className="hud-header mono">
                <div className="hud-title-row">
                  <span className="hud-blip" />
                  <span>{isTsushima ? 'INTERACTIVE 3D BLADE' : '3D DIGITAL TWIN'}</span>
                </div>
                <span className="hud-coords">{cursorPos.x}°X / {cursorPos.y}°Y</span>
              </div>

              <div className="hud-viewport-spacer" />

              <div className="hud-caption">
                <h4 className="hud-caption-title">
                  {isTsushima ? 'Forged Tamahagane Katana' : '60-Cell PINN Battery Pack'}
                </h4>
                <p className="hud-caption-text">
                  {isTsushima
                    ? 'Hand-crafted 3D Katana blade resting on ceremonial kake stand. Move cursor across viewport to inspect dynamic specular reflections along the steel temper line.'
                    : 'Interactive 3D finite-element battery module. Real-time temperature gradient and ODE thermal flux vectors respond to spatial mouse coordinates.'}
                </p>
                <div className="hud-hint mono">
                  <Eye size={13} className="hint-icon" />
                  <span>Interactive 3D Layer · Drag &amp; Hover to inspect specular light</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        .hero-section {
          position: relative;
          padding-top: calc(var(--space-24) + 20px);
          padding-bottom: var(--space-20);
          z-index: var(--z-content);
          min-height: 92vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        /* Cinematic Background Image Layer */
        .hero-photographic-backdrop {
          position: absolute;
          inset: 0;
          background-image: var(--hero-bg-image);
          background-size: cover;
          background-position: center 30%;
          opacity: 0.38;
          z-index: -2;
          filter: contrast(1.15) brightness(0.9);
          transition: background-image 600ms ease, opacity 600ms ease;
        }

        /* Seamless Gradient Vignette into Page Body */
        .hero-vignette-overlay {
          position: absolute;
          inset: 0;
          background: 
            linear-gradient(to bottom, transparent 0%, rgba(10, 11, 14, 0.4) 60%, var(--bg-primary) 100%),
            radial-gradient(ellipse at 75% 45%, transparent 20%, var(--bg-primary) 90%);
          z-index: -1;
          pointer-events: none;
        }

        .hero-container {
          position: relative;
          z-index: 2;
        }

        .hero-split {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: var(--space-8);
          align-items: center;
        }

        .hero-text-block {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
          max-width: 680px;
        }

        .hero-kicker {
          display: flex;
          align-items: center;
        }

        .kicker-tsushima {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 4px 12px 4px 6px;
          background: rgba(18, 20, 26, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border-prominent);
          border-radius: var(--radius-sm);
        }

        .kanji-badge {
          width: 22px;
          height: 22px;
          background: var(--accent-primary);
          color: #FFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: serif;
          font-size: 0.8125rem;
          border-radius: 2px;
        }

        .kicker-architectural {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 6px 14px;
          background: rgba(14, 16, 21, 0.85);
          backdrop-filter: blur(8px);
          border-left: 3px solid var(--accent-primary);
          border-top: 1px solid var(--border-subtle);
          border-right: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .pulse-indicator {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent-primary);
          box-shadow: 0 0 8px var(--accent-primary);
        }

        .hero-title {
          font-size: clamp(2.4rem, 4.8vw, 4.2rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.08;
          color: var(--text-primary);
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.6);
        }

        .highlight-text {
          color: var(--accent-primary);
          position: relative;
        }

        .slash {
          color: var(--accent-primary);
          font-weight: 300;
          margin: 0 8px;
        }

        .hero-thesis {
          font-size: clamp(1.0625rem, 1.5vw, 1.2rem);
          line-height: 1.65;
          color: var(--text-secondary);
        }

        .hero-name {
          color: var(--text-primary);
          font-weight: 600;
        }

        /* Empirical Metrics Grid */
        .hero-metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-4);
          margin-top: var(--space-2);
        }

        .metric-card {
          padding: var(--space-4);
          background: rgba(18, 20, 26, 0.75);
          backdrop-filter: blur(12px);
          border: 1px solid var(--border-prominent);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-subtle);
          transition: border-color var(--transition-fast), transform var(--transition-fast);
        }

        .metric-card:hover {
          border-color: var(--accent-primary);
          transform: translateY(-2px);
        }

        .metric-header {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: var(--space-2);
        }

        .metric-icon {
          color: var(--accent-primary);
        }

        .metric-label {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .metric-value {
          font-family: var(--font-heading);
          font-size: 1.625rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.1;
          margin-bottom: var(--space-1);
        }

        .metric-detail {
          font-size: 0.75rem;
          line-height: 1.4;
          color: var(--text-muted);
        }

        /* Action Row */
        .hero-actions {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          flex-wrap: wrap;
          margin-top: var(--space-2);
        }

        .primary-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 26px;
          background: var(--accent-primary);
          color: var(--accent-text);
          font-family: var(--font-mono);
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-accent);
          transition: transform var(--transition-fast), background-color var(--transition-fast);
        }

        .primary-btn:hover {
          background: var(--accent-hover);
          transform: translateY(-1px);
        }

        .secondary-btn {
          display: inline-flex;
          align-items: center;
          padding: 13px 22px;
          background: rgba(18, 20, 26, 0.75);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border-prominent);
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-size: 0.875rem;
          font-weight: 500;
          border-radius: var(--radius-md);
          transition: border-color var(--transition-fast), background-color var(--transition-fast);
        }

        .secondary-btn:hover {
          border-color: var(--accent-primary);
          background: var(--bg-surface-elevated);
        }

        .text-btn {
          display: inline-flex;
          align-items: center;
          padding: 12px 16px;
          font-family: var(--font-mono);
          font-size: 0.875rem;
          color: var(--text-muted);
          transition: color var(--transition-fast);
        }

        .text-btn:hover {
          color: var(--text-primary);
        }

        /* Right HUD Card */
        .hero-hud-block {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hud-card {
          width: 100%;
          max-width: 440px;
          background: rgba(14, 16, 22, 0.65);
          backdrop-filter: blur(16px);
          border: 1px solid var(--border-prominent);
          border-radius: var(--radius-lg);
          padding: var(--space-6);
          box-shadow: var(--shadow-prominent);
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
          position: relative;
        }

        .hud-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.6875rem;
          color: var(--text-muted);
          padding-bottom: var(--space-3);
          border-bottom: 1px solid var(--border-subtle);
        }

        .hud-title-row {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--accent-primary);
          font-weight: 700;
        }

        .hud-blip {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-primary);
          box-shadow: 0 0 6px var(--accent-primary);
        }

        .hud-coords {
          color: var(--text-muted);
        }

        /* Spacer for the 3D Canvas visible underneath */
        .hud-viewport-spacer {
          height: 180px;
          position: relative;
        }

        .hud-caption {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          padding-top: var(--space-4);
          border-top: 1px solid var(--border-subtle);
        }

        .hud-caption-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .hud-caption-text {
          font-size: 0.8125rem;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        .hud-hint {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.6875rem;
          color: var(--accent-primary);
          margin-top: 4px;
        }

        .hint-icon {
          flex-shrink: 0;
        }

        @media (max-width: 960px) {
          .hero-split {
            grid-template-columns: 1fr;
          }
          .hero-metrics-grid {
            grid-template-columns: 1fr;
          }
          .hud-viewport-spacer {
            height: 140px;
          }
        }
      `}</style>
    </section>
  );
};
