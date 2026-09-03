import React from 'react';
import resumeData from '../../../data/resume_data.json';
import { Trophy, Medal, Award, CheckCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';

export const HonorsSection = () => {
  const { theme } = useTheme();
  const isTsushima = theme === 'tsushima';

  return (
    <section id="honors" className="honors-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-head">
          <div className="section-tag">
            <span className="mono">{isTsushima ? '// 誉 — ACCOLADES & HONORS' : '// CREDENTIALS_REGISTRY.HONORS'}</span>
          </div>
          <h2 className="section-title">
            {isTsushima ? 'Honor, Service & Certifications' : 'Accolades, Honors & Certifications'}
          </h2>
          <p className="section-subtitle">
            Competitions, defense cadet achievements, and recognized accelerated computing qualifications.
          </p>
        </div>

        {/* Dual Grid: Achievements & Certifications */}
        <div className="credentials-layout">
          
          {/* Column 1: Competitive & Discipline Honors */}
          <div className="credentials-column">
            <h3 className="column-heading">
              <Trophy size={18} className="column-icon" />
              <span>Competitive &amp; Leadership Accolades</span>
            </h3>

            <div className="honors-list">
              {resumeData.achievements.map((ach, idx) => (
                <div key={idx} className="honor-card">
                  <div className="honor-marker">
                    <Medal size={16} />
                  </div>
                  <div className="honor-content">
                    <h4 className="honor-title">{ach.title}</h4>
                    <span className="honor-org mono">{ach.organization}</span>
                    <p className="honor-note">{ach.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Industry Certifications */}
          <div className="credentials-column">
            <h3 className="column-heading">
              <Award size={18} className="column-icon" />
              <span>Industry Certifications</span>
            </h3>

            <div className="certifications-list">
              {resumeData.certifications.map((cert, idx) => (
                <div key={idx} className="cert-card">
                  <div className="cert-badge-row">
                    <span className="cert-year mono">{cert.year}</span>
                    <span className="cert-issuer mono">{cert.issuer}</span>
                  </div>
                  <h4 className="cert-name">{cert.name}</h4>
                  <div className="cert-verify mono">
                    <CheckCircle size={13} className="check-icon" />
                    <span>Credential Verified</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Academic Snapshot Card */}
            <div className="academic-snapshot-card">
              <span className="snapshot-label mono">ACADEMIC CREDENTIALS</span>
              <div className="snapshot-val">{resumeData.personal.education.institution}</div>
              <div className="snapshot-degree">{resumeData.personal.education.degree}</div>
              <div className="snapshot-meta mono">
                <span>CGPA: <strong>{resumeData.personal.education.cgpa}</strong></span>
                <span>Graduation: {resumeData.personal.education.graduation}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        .honors-section {
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

        .credentials-layout {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-8);
        }

        .credentials-column {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }

        .column-heading {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--text-primary);
          padding-bottom: var(--space-3);
          border-bottom: 1px solid var(--border-subtle);
        }

        .column-icon {
          color: var(--accent-primary);
        }

        .honors-list, .certifications-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .honor-card {
          display: flex;
          gap: 14px;
          padding: var(--space-5);
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          transition: border-color var(--transition-fast);
        }

        .honor-card:hover {
          border-color: var(--border-prominent);
        }

        .honor-marker {
          color: var(--accent-primary);
          padding-top: 2px;
          flex-shrink: 0;
        }

        .honor-content {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .honor-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .honor-org {
          font-size: 0.75rem;
          color: var(--accent-primary);
        }

        .honor-note {
          font-size: 0.8125rem;
          color: var(--text-muted);
          margin-top: 4px;
          line-height: 1.45;
        }

        .cert-card {
          padding: var(--space-5);
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          transition: border-color var(--transition-fast);
        }

        .cert-card:hover {
          border-color: var(--border-prominent);
        }

        .cert-badge-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.75rem;
        }

        .cert-year {
          color: var(--accent-primary);
          font-weight: 600;
        }

        .cert-issuer {
          color: var(--text-muted);
        }

        .cert-name {
          font-size: 1.0625rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .cert-verify {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.6875rem;
          color: var(--text-muted);
          margin-top: 4px;
        }

        .check-icon {
          color: var(--accent-primary);
        }

        .academic-snapshot-card {
          padding: var(--space-6);
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-prominent);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          margin-top: var(--space-2);
        }

        .snapshot-label {
          font-size: 0.6875rem;
          color: var(--accent-primary);
          letter-spacing: 0.05em;
        }

        .snapshot-val {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .snapshot-degree {
          font-size: 0.9375rem;
          color: var(--text-secondary);
        }

        .snapshot-meta {
          display: flex;
          gap: 16px;
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 6px;
          padding-top: 8px;
          border-top: 1px solid var(--border-subtle);
        }

        @media (max-width: 850px) {
          .credentials-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};
