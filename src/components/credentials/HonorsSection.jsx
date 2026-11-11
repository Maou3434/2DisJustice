import React from 'react';
import resumeData from '../../../data/resume_data.json';
import { GraduationCap, Trophy, Award } from 'lucide-react';
import { SceneBackdrop } from '../common/SceneBackdrop.jsx';

export const HonorsSection = () => {
  return (
    <section id="education" className="scene-section honors-section">
      {/* Vivid Sunrise Maple & Mountain Mist Backdrop */}
      <SceneBackdrop
        image="/images/cinematic_maple.png"
        position="center 65%"
        opacity={0.90}
        overlayDarkness={0.46}
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

        {/* Top Monumental Academic Showcase Banner */}
        <div className="academic-hero-banner reveal-item reveal-delay-1">
          <div className="academic-banner-left">
            <div className="banner-badge mono">
              <GraduationCap size={16} />
              <span>ACADEMIC FOUNDATION // {resumeData.personal.education.graduation}</span>
            </div>
            <h3 className="institution-name">{resumeData.personal.education.institution}</h3>
            <p className="degree-name">{resumeData.personal.education.degree}</p>

            {resumeData.personal.languages_spoken && (
              <div className="languages-pill-row mono">
                {resumeData.personal.languages_spoken.map((l) => (
                  <span key={l.language} className="lang-pill">
                    {l.language} <em>({l.proficiency.split(' ')[0]})</em>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="academic-banner-right mono">
            <span className="cgpa-label">CUMULATIVE GPA</span>
            <strong className="cgpa-giant-val">{resumeData.personal.education.cgpa}</strong>
            <span className="cgpa-scale">OUT OF 10.0 SCALE</span>
          </div>
        </div>

        {/* Bottom 2-Column Interactive Distinctions & Certifications Deck */}
        <div className="credentials-two-col">
          
          {/* Left Panel: Honors & Leadership */}
          <div className="cred-glass-panel reveal-item reveal-delay-2">
            <div className="panel-header mono">
              <Trophy size={16} className="panel-icon" />
              <span>COMPETITIVE HONORS &amp; LEADERSHIP</span>
            </div>

            <div className="panel-items-list">
              {resumeData.achievements.map((ach, idx) => (
                <div key={idx} className="panel-item-row">
                  <span className="item-idx mono">0{idx + 1}</span>
                  <div className="item-text-col">
                    <h4 className="item-title">{ach.title}</h4>
                    <span className="item-org mono">{ach.organization}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel: Industry Certifications */}
          <div className="cred-glass-panel reveal-item reveal-delay-3">
            <div className="panel-header mono">
              <Award size={16} className="panel-icon" />
              <span>VERIFIED INDUSTRY CERTIFICATIONS</span>
            </div>

            <div className="panel-items-list">
              {resumeData.certifications.map((cert, idx) => (
                <div key={idx} className="panel-item-row">
                  <span className="item-idx mono">{cert.year}</span>
                  <div className="item-text-col">
                    <h4 className="item-title">{cert.name}</h4>
                    <span className="item-org mono">{cert.issuer}</span>
                  </div>
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

        /* Monumental Academic Banner */
        .academic-hero-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          padding: clamp(2rem, 3.8vw, 3rem);
          background: rgba(10, 12, 18, 0.78);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(245, 239, 230, 0.16);
          border-left: 3px solid var(--accent-primary);
          border-radius: var(--radius-md);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
          margin-bottom: clamp(2rem, 3.5vw, 2.75rem);
        }

        .academic-banner-left {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .banner-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--accent-primary);
          letter-spacing: 0.14em;
        }

        .institution-name {
          font-family: var(--font-heading);
          font-size: clamp(1.65rem, 2.4vw, 2.25rem);
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
        }

        .degree-name {
          font-size: 1.05rem;
          color: var(--text-secondary);
        }

        .languages-pill-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 6px;
        }

        .lang-pill {
          font-size: 0.75rem;
          color: var(--text-primary);
          padding: 4px 12px;
          background: rgba(245, 239, 230, 0.05);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
        }

        .lang-pill em {
          font-style: normal;
          color: var(--text-muted);
        }

        .academic-banner-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          padding-left: 32px;
          border-left: 1px solid var(--border-subtle);
          flex-shrink: 0;
        }

        .cgpa-label {
          font-size: 0.6875rem;
          color: var(--text-muted);
          letter-spacing: 0.14em;
        }

        .cgpa-giant-val {
          font-family: var(--font-heading);
          font-size: clamp(3rem, 4.5vw, 4.25rem);
          font-weight: 800;
          color: var(--accent-primary);
          line-height: 1.05;
        }

        .cgpa-scale {
          font-size: 0.625rem;
          color: var(--text-secondary);
          letter-spacing: 0.1em;
        }

        /* Bottom 2-Column Panels */
        .credentials-two-col {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(1.75rem, 3vw, 2.5rem);
        }

        .cred-glass-panel {
          background: rgba(10, 12, 18, 0.76);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(245, 239, 230, 0.14);
          border-radius: var(--radius-md);
          padding: clamp(1.75rem, 3vw, 2.25rem);
          display: flex;
          flex-direction: column;
          gap: 20px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.55);
        }

        .panel-header {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--accent-primary);
          letter-spacing: 0.14em;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .panel-items-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .panel-item-row {
          display: flex;
          align-items: baseline;
          gap: 16px;
        }

        .item-idx {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--accent-primary);
          min-width: 36px;
        }

        .item-text-col {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .item-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.3;
        }

        .item-org {
          font-size: 0.75rem;
          color: var(--text-muted);
          letter-spacing: 0.04em;
        }

        @media (max-width: 900px) {
          .academic-hero-banner {
            flex-direction: column;
            align-items: flex-start;
          }

          .academic-banner-right {
            align-items: flex-start;
            padding-left: 0;
            border-left: none;
            padding-top: 16px;
            border-top: 1px solid var(--border-subtle);
            width: 100%;
          }

          .credentials-two-col {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default HonorsSection;
