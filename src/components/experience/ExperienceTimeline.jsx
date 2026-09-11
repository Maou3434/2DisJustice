import React from 'react';
import resumeData from '../../../data/resume_data.json';
import { SceneBackdrop } from '../common/SceneBackdrop.jsx';

export const ExperienceTimeline = () => {
  return (
    <section id="experience" className="scene-section experience-section">
      {/* Dedicated Coastal Bluffs Backdrop */}
      <SceneBackdrop
        image="/images/cinematic_sea.png"
        position="center 40%"
        opacity={0.85}
        overlayDarkness={0.78}
      />

      {/* Side Numbered Equation & Chapter Watermark */}
      <div className="section-backdrop-watermark" aria-hidden="true">
        <span className="wm-number mono">02</span>
        <div className="wm-equation mono">ρ·c_p·(∂T/∂t) = k·∇²T + q̇_gen // PINN Thermal Twin ODE</div>
      </div>

      <div className="container scene-content experience-content">
        
        {/* Editorial Scene Header */}
        <div className="scene-head-editorial">
          <div className="scene-head-top">
            <div className="scene-head-left">
              <span className="scene-eyebrow">02 // FIELD RESEARCH &amp; APPLIED ENGINEERING</span>
              <h2 className="scene-title-editorial">
                Internships &amp;{'\n'}Experience
              </h2>
            </div>
            <p className="scene-head-right-subtext">
              CHRONOLOGICAL TENURE ACROSS PHYSICS-INFORMED ML DIGITAL TWINS, REAL-TIME LAKEHOUSES, AND DISTRIBUTED EMBEDDED SYSTEMS.
            </p>
          </div>
          <div className="scene-divider-rule" />
        </div>

        {/* Vertical Timeline Progression (No Cards, Pure Editorial Layout) */}
        <div className="timeline-flow">
          <div className="timeline-spine-line" aria-hidden="true" />

          {resumeData.professional_experience.map((exp, idx) => {
            const isRecent = idx === 0;
            const nodeClass = idx === 0 ? 'node-cinnabar' : 'node-subtle';
            const pillLabel = idx === 0 ? 'RESEARCH' : 'INTERNSHIP';

            return (
              <article key={idx} className="timeline-entry">
                {/* Node Ring Marker */}
                <div className={`timeline-node-ring ${nodeClass}`} aria-hidden="true" />

                {/* Main Content Block */}
                <div className="timeline-entry-body">
                  
                  {/* Top Row: Role + Status Pill (Left) & Dates + Location (Right) */}
                  <div className="entry-header-row">
                    <div className="entry-role-group">
                      <h3 className="entry-role-title">{exp.role}</h3>
                      <span className={`entry-status-pill mono ${isRecent ? 'pill-cinnabar' : 'pill-muted'}`}>
                        {pillLabel}
                      </span>
                    </div>

                    <div className="entry-meta-right mono">
                      <span>{exp.period}</span>
                      <span className="meta-dot">•</span>
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  {/* Company / Organization Name in Imperial Vermilion Accent */}
                  <div className="entry-company mono">
                    {exp.organization}
                  </div>

                  {/* Editorial Description Text */}
                  <p className="entry-description">
                    {exp.highlights.join(' ')}
                  </p>

                  {/* Inline Monospace Tech Stack */}
                  <div className="entry-tags-row mono">
                    {exp.tags.map((tag, tIdx) => (
                      <React.Fragment key={tag}>
                        <span className="entry-tag-item">{tag}</span>
                        {tIdx < exp.tags.length - 1 && (
                          <span className="tag-separator">•</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                </div>
              </article>
            );
          })}
        </div>

      </div>

      <style>{`
        .experience-section {
          background-color: #0A0B0E;
        }

        .experience-content {
          padding-top: clamp(1rem, 2.5vh, 2rem);
          padding-bottom: clamp(1rem, 2.5vh, 2rem);
        }

        /* Continuous Vertical Timeline Flow */
        .timeline-flow {
          position: relative;
          padding-left: 28px;
          margin-top: clamp(0.75rem, 2vh, 1.5rem);
          display: flex;
          flex-direction: column;
          gap: clamp(1rem, 2.2vh, 1.85rem);
        }

        .timeline-spine-line {
          position: absolute;
          left: 5px;
          top: 8px;
          bottom: 12px;
          width: 1px;
          background: rgba(255, 255, 255, 0.16);
        }

        .timeline-entry {
          position: relative;
          display: flex;
          flex-direction: column;
        }

        /* Node Markers (Illuminated Outline Rings) */
        .timeline-node-ring {
          position: absolute;
          left: -28px;
          top: 5px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #0A0B0E;
          box-sizing: border-box;
          z-index: 2;
        }

        .node-cinnabar {
          border: 2px solid var(--accent-primary);
          box-shadow: 0 0 10px rgba(200, 50, 38, 0.7), inset 0 0 4px rgba(200, 50, 38, 0.4);
        }

        .node-subtle {
          border: 2px solid rgba(255, 255, 255, 0.28);
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.12);
        }

        /* Entry Body */
        .timeline-entry-body {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .entry-header-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: var(--space-4);
        }

        .entry-role-group {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .entry-role-title {
          font-family: var(--font-body);
          font-size: clamp(1.2rem, 1.8vw, 1.6rem);
          font-weight: 700;
          color: #FFFFFF;
          letter-spacing: -0.02em;
          line-height: 1.15;
        }

        .entry-status-pill {
          font-size: 0.625rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 2px 8px;
          border-radius: 9999px;
          text-transform: uppercase;
        }

        .pill-cinnabar {
          color: var(--accent-primary);
          border: 1px solid rgba(200, 50, 38, 0.4);
          background: rgba(200, 50, 38, 0.1);
        }

        .pill-muted {
          color: #94A3B8;
          border: 1px solid rgba(148, 163, 184, 0.3);
          background: rgba(148, 163, 184, 0.06);
        }

        .entry-meta-right {
          font-size: clamp(0.6875rem, 0.9vw, 0.75rem);
          letter-spacing: 0.08em;
          color: #9CA3AF;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .meta-dot {
          color: #6B7280;
        }

        .entry-company {
          font-size: clamp(0.8125rem, 1.1vw, 0.9375rem);
          font-weight: 600;
          color: var(--accent-primary);
          letter-spacing: 0.04em;
        }

        .entry-description {
          font-family: var(--font-body);
          font-size: clamp(0.8125rem, 1.05vw, 0.875rem);
          line-height: 1.55;
          color: #D1D5DB;
          max-width: 1050px;
          margin-top: 2px;
        }

        /* Inline Monospace Tags */
        .entry-tags-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
          font-size: clamp(0.6875rem, 0.85vw, 0.75rem);
          color: #9CA3AF;
        }

        .entry-tag-item {
          color: #9CA3AF;
          border-bottom: 1px dotted rgba(255, 255, 255, 0.2);
          padding-bottom: 1px;
          transition: color 150ms ease, border-color 150ms ease;
        }

        .entry-tag-item:hover {
          color: #FFFFFF;
          border-color: var(--accent-primary);
        }

        .tag-separator {
          color: #4B5563;
        }

        @media (max-width: 768px) {
          .entry-header-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 2px;
          }

          .entry-meta-right {
            white-space: normal;
          }
        }
      `}</style>
    </section>
  );
};

export default ExperienceTimeline;
