import React from 'react';
import { useTheme } from '../../context/ThemeContext.jsx';
import { ArrowDownRight, FileCode, ShieldCheck, Cpu } from 'lucide-react';
import resumeData from '../../../data/resume_data.json';

export const HeroSection = () => {
  const { theme } = useTheme();
  const isTsushima = theme === 'tsushima';

  return (
    <section id="top" className="hero-section">
      <div className="container hero-container">
        
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

        {/* Hero Headline */}
        <div className="hero-main">
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
        </div>

        {/* Empirical Evidence Badges (Ground Truth, Anti-Fluff) */}
        <div className="hero-metrics-grid">
          <div className="metric-card">
            <div className="metric-header">
              <Cpu size={16} className="metric-icon" />
              <span className="metric-label">EV Battery PINN</span>
            </div>
            <div className="metric-value">78M+</div>
            <div className="metric-detail">Time steps evaluated across 522 thermal trajectories</div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <FileCode size={16} className="metric-icon" />
              <span className="metric-label">Rollout Accuracy</span>
            </div>
            <div className="metric-value">−65.6%</div>
            <div className="metric-detail">Max error reduction on unseen WLTP2 drive cycles</div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <ShieldCheck size={16} className="metric-icon" />
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

      <style>{`
        .hero-section {
          position: relative;
          padding-top: calc(var(--space-20) + 40px);
          padding-bottom: var(--space-16);
          z-index: var(--z-content);
          min-height: 90vh;
          display: flex;
          align-items: center;
        }

        .hero-container {
          display: flex;
          flex-direction: column;
          gap: var(--space-8);
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
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
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
          background: var(--bg-surface);
          border-left: 2px solid var(--accent-primary);
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

        .hero-main {
          max-width: 860px;
        }

        .hero-title {
          font-size: clamp(2.5rem, 5.5vw, 4.5rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.08;
          color: var(--text-primary);
          margin-bottom: var(--space-6);
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
          font-size: clamp(1.0625rem, 1.6vw, 1.25rem);
          line-height: 1.65;
          color: var(--text-secondary);
          max-width: 720px;
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
          max-width: 860px;
          margin-top: var(--space-2);
        }

        .metric-card {
          padding: var(--space-4);
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          transition: border-color var(--transition-fast), transform var(--transition-fast);
        }

        .metric-card:hover {
          border-color: var(--border-prominent);
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
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .metric-value {
          font-family: var(--font-heading);
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.1;
          margin-bottom: var(--space-1);
        }

        .metric-detail {
          font-size: 0.8125rem;
          line-height: 1.4;
          color: var(--text-muted);
        }

        /* Action Row */
        .hero-actions {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          flex-wrap: wrap;
          margin-top: var(--space-4);
        }

        .primary-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: var(--accent-primary);
          color: var(--accent-text);
          font-family: var(--font-mono);
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          border-radius: var(--radius-md);
          transition: transform var(--transition-fast), box-shadow var(--transition-fast), background-color var(--transition-fast);
        }

        .primary-btn:hover {
          background: var(--accent-hover);
          transform: translateY(-1px);
          box-shadow: var(--shadow-accent);
        }

        .secondary-btn {
          display: inline-flex;
          align-items: center;
          padding: 12px 22px;
          background: var(--bg-surface);
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

        @media (max-width: 850px) {
          .hero-metrics-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};
