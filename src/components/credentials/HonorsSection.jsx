import React from 'react';
import resumeData from '../../../data/resume_data.json';
import { Trophy, Award, GraduationCap, CheckCircle } from 'lucide-react';
import { SceneBackdrop } from '../common/SceneBackdrop.jsx';

export const HonorsSection = () => {
  return (
    <section id="education" className="scene-section honors-section">
      {/* Dedicated Sunrise Torii Gate Backdrop */}
      <SceneBackdrop
        image="/images/cinematic_maple.png"
        position="center 30%"
        opacity={0.82}
        overlayDarkness={0.78}
      />

      {/* Side Numbered Equation & Chapter Watermark */}
      <div className="section-backdrop-watermark" aria-hidden="true">
        <span className="wm-number mono">06</span>
        <div className="wm-equation mono">DEFENSE CADET &amp; COMPETITIVE EXCELLENCE</div>
      </div>

      <div className="container scene-content honors-content">
        
        {/* Editorial Scene Header */}
        <div className="scene-head-editorial">
          <div className="scene-head-top">
            <div className="scene-head-left">
              <span className="scene-eyebrow">06 // ACADEMIC FOUNDATIONS &amp; MILITARY HONORS</span>
              <h2 className="scene-title-editorial">
                Education, Service &amp; Honors
              </h2>
            </div>
            <p className="scene-head-right-subtext">
              ACADEMIC FOUNDATION AT VIT VELLORE, NATIONAL DEFENSE CADET DISCIPLINE, AND RECOGNIZED ACCELERATED COMPUTING CERTIFICATIONS.
            </p>
          </div>
          <div className="scene-divider-rule" />
        </div>

        {/* 3-Column Editorial Grid (No Boxy Cards) */}
        <div className="education-grid-editorial">
          
          {/* Column 1: Academic Degree & Institution */}
          <div className="credential-col">
            <div className="col-header-row">
              <GraduationCap size={18} className="col-icon" />
              <h3 className="col-title">Academic Degree</h3>
            </div>

            <div className="academic-feature-block">
              <span className="institution-name">{resumeData.personal.education.institution}</span>
              <h4 className="degree-name">{resumeData.personal.education.degree}</h4>
              
              <div className="academic-stats-row mono">
                <div className="stat-pill">
                  <span className="stat-label">CGPA</span>
                  <strong className="stat-val">{resumeData.personal.education.cgpa}</strong>
                </div>
                <div className="stat-pill">
                  <span className="stat-label">STATUS</span>
                  <strong className="stat-val">{resumeData.personal.education.graduation}</strong>
                </div>
              </div>

              <p className="academic-desc">
                Core coursework spanning Analysis of Algorithms, Operating Systems, Database Management Systems, Distributed Computing, and Compilers.
              </p>
            </div>
          </div>

          {/* Column 2: Industry Certifications */}
          <div className="credential-col">
            <div className="col-header-row">
              <Award size={18} className="col-icon" />
              <h3 className="col-title">Recognized Credentials</h3>
            </div>

            <div className="credentials-list">
              {resumeData.certifications.map((cert, idx) => (
                <div key={idx} className="cert-item-editorial">
                  <div className="cert-top-meta mono">
                    <span className="cert-year">{cert.year}</span>
                    <span className="cert-issuer">{cert.issuer}</span>
                  </div>
                  <h4 className="cert-name-text">{cert.name}</h4>
                  <div className="cert-verified-cue mono">
                    <CheckCircle size={13} className="check-icon" />
                    <span>Credential Verified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Competitive & Cadet Honors */}
          <div className="credential-col">
            <div className="col-header-row">
              <Trophy size={18} className="col-icon" />
              <h3 className="col-title">Honors &amp; Service</h3>
            </div>

            <div className="honors-list-editorial">
              {resumeData.achievements.map((ach, idx) => (
                <div key={idx} className="honor-item-editorial">
                  <h4 className="honor-name-text">{ach.title}</h4>
                  <span className="honor-org-meta mono">{ach.organization}</span>
                  <p className="honor-note-text">{ach.note}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      <style>{`
        .honors-section {
          background-color: #0A0B0E;
        }

        .honors-content {
          padding-top: clamp(1rem, 2.5vh, 2rem);
          padding-bottom: clamp(1rem, 2.5vh, 2rem);
        }

        .education-grid-editorial {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1.25rem, 3vw, 2.5rem);
          margin-top: clamp(0.75rem, 2vh, 1.5rem);
        }

        .credential-col {
          display: flex;
          flex-direction: column;
          gap: clamp(0.75rem, 1.8vh, 1.25rem);
          border-left: 1px solid rgba(255, 255, 255, 0.12);
          padding-left: clamp(12px, 1.5vw, 20px);
          transition: border-color 200ms ease;
        }

        .credential-col:hover {
          border-color: var(--accent-primary);
        }

        .col-header-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .col-icon {
          color: var(--accent-primary);
        }

        .col-title {
          font-family: var(--font-body);
          font-size: clamp(1rem, 1.25vw, 1.2rem);
          font-weight: 700;
          color: #FFFFFF;
          letter-spacing: -0.01em;
        }

        /* Academic Block */
        .academic-feature-block {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .institution-name {
          font-size: clamp(1.05rem, 1.35vw, 1.25rem);
          font-weight: 700;
          color: var(--accent-primary);
          line-height: 1.2;
        }

        .degree-name {
          font-size: clamp(0.8125rem, 1vw, 0.9375rem);
          color: #F5EFE6;
          font-weight: 600;
        }

        .academic-stats-row {
          display: flex;
          gap: 10px;
          margin-top: 4px;
        }

        .stat-pill {
          display: flex;
          flex-direction: column;
          padding: 4px 10px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-sm);
        }

        .stat-label {
          font-size: 0.5625rem;
          color: #9CA3AF;
          letter-spacing: 0.06em;
        }

        .stat-val {
          font-size: 0.8125rem;
          color: var(--accent-primary);
          font-weight: 700;
        }

        .academic-desc {
          font-size: clamp(0.6875rem, 0.85vw, 0.78125rem);
          line-height: 1.5;
          color: #9CA3AF;
          margin-top: 4px;
        }

        /* Credentials List */
        .credentials-list {
          display: flex;
          flex-direction: column;
          gap: clamp(0.75rem, 1.8vh, 1.25rem);
        }

        .cert-item-editorial {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .cert-top-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.6875rem;
        }

        .cert-year {
          color: var(--accent-primary);
        }

        .cert-issuer {
          color: #9CA3AF;
        }

        .cert-name-text {
          font-size: clamp(0.8125rem, 1vw, 0.9375rem);
          font-weight: 700;
          color: #FFFFFF;
          line-height: 1.25;
        }

        .cert-verified-cue {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.625rem;
          color: var(--accent-primary);
          margin-top: 1px;
        }

        .check-icon {
          color: var(--accent-primary);
        }

        /* Honors List */
        .honors-list-editorial {
          display: flex;
          flex-direction: column;
          gap: clamp(0.65rem, 1.5vh, 1rem);
        }

        .honor-item-editorial {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .honor-name-text {
          font-size: clamp(0.8125rem, 1vw, 0.875rem);
          font-weight: 700;
          color: #FFFFFF;
          line-height: 1.2;
        }

        .honor-org-meta {
          font-size: 0.6875rem;
          color: var(--accent-primary);
        }

        .honor-note-text {
          font-size: clamp(0.6875rem, 0.85vw, 0.75rem);
          line-height: 1.4;
          color: #9CA3AF;
        }

        @media (max-width: 900px) {
          .education-grid-editorial {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
      `}</style>
    </section>
  );
};

export default HonorsSection;
