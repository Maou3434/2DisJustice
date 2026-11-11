import React from 'react';
import resumeData from '../../../data/resume_data.json';
import { SceneBackdrop } from '../common/SceneBackdrop.jsx';

export const HonorsSection = () => {
  return (
    <section id="education" className="scene-section honors-section">
      {/* Dedicated Sunrise Maple & Mountain Mist Backdrop */}
      <SceneBackdrop
        image="/images/cinematic_maple.png"
        position="center 65%"
        opacity={0.76}
        overlayDarkness={0.84}
      />

      {/* Restrained Chapter Number Watermark */}
      <div className="section-backdrop-watermark" aria-hidden="true">
        <span className="wm-number">06</span>
      </div>

      <div className="container scene-content honors-content">
        
        {/* Clean Editorial Scene Header */}
        <div className="scene-head-editorial">
          <div className="scene-head-top">
            <div className="scene-head-left">
              <span className="scene-eyebrow">06 // CREDENTIALS</span>
              <h2 className="scene-title-editorial">Education &amp; Honors</h2>
            </div>
          </div>
          <div className="scene-divider-rule" />
        </div>

        {/* Guided 3-Row Editorial Ledger (Consistent Left Anchor -> Right Content Stream) */}
        <div className="credentials-rows-flow">
          
          {/* Row 01: Academic Degree */}
          <div className="credential-row reveal-item reveal-delay-1">
            <div className="cred-left-anchor mono">
              <span className="cred-idx">01</span>
              <span className="cred-label">ACADEMIC DEGREE</span>
            </div>

            <div className="cred-right-body">
              <h3 className="institution-name">{resumeData.personal.education.institution}</h3>
              <p className="degree-name">{resumeData.personal.education.degree}</p>
              
              <div className="academic-meta-strip mono">
                <span className="meta-badge">CGPA: <strong>{resumeData.personal.education.cgpa}</strong></span>
                <span className="meta-badge">{resumeData.personal.education.graduation}</span>
                {resumeData.personal.languages_spoken && (
                  <span className="meta-badge">
                    LANGUAGES: {resumeData.personal.languages_spoken.map((l) => l.language).join(' · ')}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Row 02: Honors & Distinctions */}
          <div className="credential-row reveal-item reveal-delay-2">
            <div className="cred-left-anchor mono">
              <span className="cred-idx">02</span>
              <span className="cred-label">DISTINCTIONS</span>
            </div>

            <div className="cred-right-grid">
              {resumeData.achievements.map((ach, idx) => (
                <div key={idx} className="cred-card-item">
                  <h4 className="cred-item-title">{ach.title}</h4>
                  <span className="cred-item-org mono">{ach.organization}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 03: Industry Certifications */}
          <div className="credential-row reveal-item reveal-delay-3">
            <div className="cred-left-anchor mono">
              <span className="cred-idx">03</span>
              <span className="cred-label">CERTIFICATIONS</span>
            </div>

            <div className="cred-right-grid">
              {resumeData.certifications.map((cert, idx) => (
                <div key={idx} className="cred-card-item">
                  <h4 className="cred-item-title">{cert.name}</h4>
                  <span className="cred-item-org mono">{cert.issuer} · {cert.year}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      <style>{`
        .honors-section {
          background-color: var(--bg-primary);
        }

        .credentials-rows-flow {
          display: flex;
          flex-direction: column;
        }

        .credential-row {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: clamp(2rem, 5vw, 4.5rem);
          padding: clamp(2.75rem, 5.5vh, 4.25rem) 0;
          border-bottom: 1px solid var(--border-subtle);
          align-items: start;
        }

        .credential-row:first-child {
          padding-top: 0.5rem;
        }

        .cred-left-anchor {
          display: flex;
          align-items: baseline;
          gap: 16px;
          padding-top: 6px;
        }

        .cred-idx {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--accent-primary);
          letter-spacing: 0.1em;
        }

        .cred-label {
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: 0.14em;
        }

        .cred-right-body {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .institution-name {
          font-family: var(--font-heading);
          font-size: clamp(1.65rem, 2.3vw, 2.15rem);
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
        }

        .degree-name {
          font-family: var(--font-body);
          font-size: clamp(1.05rem, 1.15vw, 1.15rem);
          color: var(--text-secondary);
          line-height: 1.65;
        }

        .academic-meta-strip {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 6px;
        }

        .meta-badge {
          font-size: 0.75rem;
          color: var(--text-secondary);
          padding: 6px 14px;
          background: rgba(245, 239, 230, 0.04);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          letter-spacing: 0.04em;
        }

        .meta-badge strong {
          color: var(--accent-primary);
        }

        .cred-right-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(1.75rem, 3.5vh, 2.5rem) clamp(2rem, 4vw, 3.5rem);
        }

        .cred-card-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .cred-item-title {
          font-family: var(--font-heading);
          font-size: clamp(1.2rem, 1.5vw, 1.4rem);
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.3;
        }

        .cred-item-org {
          font-size: 0.75rem;
          color: var(--accent-primary);
          letter-spacing: 0.08em;
          font-weight: 700;
        }

        @media (max-width: 900px) {
          .credential-row {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .cred-right-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default HonorsSection;
