import React from 'react';
import resumeData from '../../../data/resume_data.json';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';

export const ExperienceTimeline = () => {
  const { theme } = useTheme();
  const isTsushima = theme === 'tsushima';

  return (
    <section id="research" className="experience-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-head">
          <div className="section-tag">
            <span className="mono">{isTsushima ? '// 鍛錬 — RESEARCH & ENGINEERING' : '// TIMELINE_RECORDS.LOG'}</span>
          </div>
          <h2 className="section-title">
            {isTsushima ? 'Research & Applied Engineering' : 'Engineering & Research Experience'}
          </h2>
          <p className="section-subtitle">
            Focused on scientific digital twins, high-frequency IoT ingest pipelines, and enterprise-grade software standards.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="experience-stack">
          {resumeData.professional_experience.map((exp, idx) => (
            <article key={idx} className="experience-entry">
              
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
          ))}
        </div>

      </div>

      <style>{`
        .experience-section {
          position: relative;
          padding: var(--space-16) 0;
          z-index: var(--z-content);
          border-top: 1px solid var(--border-subtle);
        }

        .section-head {
          margin-bottom: var(--space-12);
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
          color: var(--accent-primary);
          font-weight: 600;
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
