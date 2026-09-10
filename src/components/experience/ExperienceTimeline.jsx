import React from 'react';
import resumeData from '../../../data/resume_data.json';
import { Calendar, MapPin } from 'lucide-react';
import { ParallaxLayer } from '../parallax/ParallaxLayer.jsx';

export const ExperienceTimeline = () => {
  return (
    <section id="research" className="experience-section">
      {/* Localized Section Watermark (Physically bounded to this section) */}
      <div className="section-backdrop-watermark" aria-hidden="true">
        <span className="wm-japanese">鍛錬</span>
        <span className="wm-number mono">02</span>
        <div className="wm-equation mono">
          ρ·c_p·(∂T/∂t) = k·∇²T + q̇_gen  // PINN Thermal Twin ODE
        </div>
      </div>

      <div className="container relative-content">
        {/* Section Header */}
        <div className="section-head">
          <div className="section-tag">
            <span className="mono">// FIELD RESEARCH · VIT AUTOMOTIVE RESEARCH CENTRE</span>
          </div>
          <h2 className="section-title">
            Research &amp; Applied Engineering
          </h2>
          <p className="section-subtitle">
            Focused on scientific digital twins, high-frequency IoT ingest pipelines, and enterprise-grade software standards.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="experience-stack">
          {resumeData.professional_experience.map((exp, idx) => (
            <ParallaxLayer
              key={idx}
              speed={0.96 + (idx * 0.03)}
              mouseFactor={10}
              className="experience-parallax-wrap"
            >
              <article className="experience-entry">
                
                {/* Left Meta Column */}
                <div className="exp-meta">
                  <span className="exp-period mono">
                    <Calendar size={13} className="inline-icon" />
                    {exp.period}
                  </span>
                  <span className="exp-location mono">
                    <MapPin size={13} className="inline-icon" />
                    {exp.location}
                  </span>
                </div>

                {/* Center Content Column */}
                <div className="exp-content">
                  <div className="exp-header">
                    <h3 className="exp-role">{exp.role}</h3>
                    <span className="exp-org">{exp.organization}</span>
                  </div>

                  <ul className="exp-highlights">
                    {exp.highlights.map((bullet, bIdx) => (
                      <li key={bIdx} className="exp-bullet">
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="exp-tags">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="tech-tag mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </article>
            </ParallaxLayer>
          ))}
        </div>

      </div>

      <style>{`
        .experience-section {
          position: relative;
          padding: var(--space-16) 0;
          z-index: var(--z-content);
          border-top: 1px solid var(--border-subtle);
          overflow: hidden;
        }

        .relative-content {
          position: relative;
          z-index: 2;
        }

        .section-backdrop-watermark {
          position: absolute;
          top: 16px;
          right: 28px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          user-select: none;
          pointer-events: none;
          opacity: 0.06;
          line-height: 0.85;
          letter-spacing: -0.04em;
          z-index: 0;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 70%, transparent 100%);
        }

        .wm-japanese {
          font-family: var(--font-heading);
          font-size: clamp(6.5rem, 14vw, 13rem);
          font-weight: 800;
          color: var(--text-primary);
          text-shadow: 0 0 60px rgba(0, 0, 0, 0.95);
        }

        .wm-number {
          font-size: clamp(3rem, 6.5vw, 6.5rem);
          color: var(--accent-primary);
          opacity: 0.85;
          margin-top: -10px;
          font-weight: 700;
        }

        .wm-equation {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          letter-spacing: 0.08em;
          margin-top: 16px;
          opacity: 0.85;
          background: rgba(18, 20, 26, 0.55);
          padding: 6px 14px;
          border-left: 2px solid var(--accent-primary);
          border-radius: var(--radius-sm);
        }

        .section-head {
          margin-bottom: var(--space-12);
          max-width: 680px;
          position: relative;
          z-index: 2;
        }

        .section-tag {
          font-size: 0.75rem;
          color: var(--accent-primary);
          margin-bottom: var(--space-2);
          letter-spacing: 0.05em;
        }

        .section-title {
          font-size: clamp(1.875rem, 3.5vw, 2.75rem);
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: var(--space-3);
        }

        .section-subtitle {
          font-size: 1.0625rem;
          color: var(--text-secondary);
          max-width: 650px;
        }

        .experience-stack {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }

        .experience-entry {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: var(--space-8);
          padding: var(--space-8);
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          transition: border-color var(--transition-fast), background-color var(--transition-fast);
        }

        .experience-entry:hover {
          border-color: var(--border-prominent);
          background: var(--bg-surface-elevated);
        }

        .exp-meta {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .exp-period {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8125rem;
          color: var(--text-secondary);
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .exp-period .inline-icon {
          color: var(--accent-primary);
        }

        .exp-location {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .inline-icon {
          flex-shrink: 0;
        }

        .exp-content {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .exp-header {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .exp-role {
          font-size: 1.375rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .exp-org {
          font-family: var(--font-heading);
          font-size: 1.0625rem;
          color: var(--text-secondary);
        }

        .exp-highlights {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .exp-bullet {
          position: relative;
          padding-left: 18px;
          font-size: 0.9375rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .exp-bullet::before {
          content: '—';
          position: absolute;
          left: 0;
          color: var(--accent-primary);
        }

        .exp-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: var(--space-2);
        }

        .tech-tag {
          font-size: 0.75rem;
          padding: 3px 9px;
          background: var(--bg-primary);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          border-radius: var(--radius-sm);
        }

        @media (max-width: 768px) {
          .experience-entry {
            grid-template-columns: 1fr;
            gap: var(--space-4);
            padding: var(--space-5);
          }
        }
      `}</style>
    </section>
  );
};
