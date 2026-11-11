import React, { useState } from 'react';
import resumeData from '../../../data/resume_data.json';
import { ProjectModal } from './ProjectModal.jsx';
import { ArrowUpRight, ZoomIn } from 'lucide-react';
import { SceneBackdrop } from '../common/SceneBackdrop.jsx';

export const ProjectGallery = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const flagshipProjects = resumeData.projects.filter((p) => p.flagship);
  const archiveProjects = resumeData.projects.filter((p) => !p.flagship);
  const [activeArchiveIdx, setActiveArchiveIdx] = useState(0);

  const activeArchive = archiveProjects[activeArchiveIdx] || archiveProjects[0];

  return (
    <section id="projects" className="scene-section projects-section">
      {/* Dedicated River Valley Backdrop */}
      <SceneBackdrop
        image="/images/cinematic_forest.png"
        position="center 35%"
        opacity={0.78}
        overlayDarkness={0.84}
      />

      {/* Restrained Chapter Number Watermark */}
      <div className="section-backdrop-watermark" aria-hidden="true">
        <span className="wm-number">03</span>
      </div>

      <div className="container scene-content projects-content">
        
        {/* Clean Editorial Scene Header */}
        <div className="scene-head-editorial">
          <div className="scene-head-top">
            <div className="scene-head-left">
              <span className="scene-eyebrow">03 // ARCHITECTURE</span>
              <h2 className="scene-title-editorial">Selected Systems</h2>
            </div>
          </div>
          <div className="scene-divider-rule" />
        </div>

        {/* Consistent F-Pattern Flow: Left Narrative Spine -> Right Blueprint Frame */}
        <div className="projects-composition-flow">
          {flagshipProjects.map((project, idx) => {
            const visual = project.visual;

            return (
              <article
                key={project.id}
                className={`project-row reveal-item reveal-delay-${idx + 1}`}
              >
                {/* Left Column: Consistent Eye-Tracking Anchor */}
                <div className="project-editorial-side">
                  <div className="project-category mono">
                    0{idx + 1} // {project.category}
                  </div>

                  <h3 className="project-title">{project.title}</h3>
                  
                  <p className="project-summary">{project.summary}</p>

                  <div className="project-tags-row mono">
                    {project.tech.slice(0, 4).map((t) => (
                      <span key={t} className="project-tech-pill">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="project-action-row">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="action-btn-editorial mono"
                    >
                      <span>INSPECT ARCHITECTURE</span>
                      <ArrowUpRight size={15} />
                    </button>
                  </div>
                </div>

                {/* Right Column: Interactive Vector Blueprint Frame */}
                <div
                  className="project-visual-frame"
                  onClick={() => setSelectedProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedProject(project);
                    }
                  }}
                  aria-label={`Inspect ${project.title} architecture`}
                >
                  <div className="frame-image-wrapper">
                    <img
                      src={visual.src}
                      alt={visual.alt}
                      className="frame-image"
                      loading="lazy"
                    />
                    <div className="frame-hover-cue mono">
                      <ZoomIn size={16} />
                      <span>OPEN FULL ARCHITECTURE &amp; SPECS</span>
                    </div>
                  </div>

                  <div className="frame-metrics-bar mono">
                    {visual.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="metric-item">
                        <span className="metric-label">{m.label}</span>
                        <strong className="metric-value">{m.val}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Breathable Research Archive Switcher */}
        {archiveProjects.length > 0 && (
          <div className="research-archive-strip reveal-item reveal-delay-4">
            <div className="archive-tabs-row">
              <span className="archive-strip-label mono">ADDITIONAL RESEARCH ARCHIVE //</span>
              <div className="switcher-tabs" role="tablist" aria-label="Select Research System">
                {archiveProjects.map((archProj, aIdx) => {
                  const isActive = activeArchiveIdx === aIdx;
                  return (
                    <button
                      key={archProj.id}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveArchiveIdx(aIdx)}
                      className={`switcher-tab-btn mono ${isActive ? 'is-active' : ''}`}
                    >
                      <span className="tab-idx">0{aIdx + 4}</span>
                      <span>{archProj.title.split(':')[0].split('—')[0].trim()}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {activeArchive && (
              <div className="archive-compact-preview">
                <div className="archive-preview-text">
                  <span className="archive-cat mono">0{activeArchiveIdx + 4} // {activeArchive.category}</span>
                  <h4 className="archive-preview-title">{activeArchive.title}</h4>
                  <p className="archive-preview-desc">{activeArchive.summary}</p>
                </div>

                <div className="archive-preview-actions mono">
                  {activeArchive.visual?.metrics?.[0] && (
                    <div className="archive-key-stat">
                      <span className="stat-lbl">{activeArchive.visual.metrics[0].label}</span>
                      <strong className="stat-val">{activeArchive.visual.metrics[0].val}</strong>
                    </div>
                  )}

                  <button
                    onClick={() => setSelectedProject(activeArchive)}
                    className="action-btn-editorial mono"
                  >
                    <span>VIEW BLUEPRINT</span>
                    <ArrowUpRight size={15} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Deep Dive Case Study Lightbox / Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          projectImage={selectedProject.visual?.src}
          onClose={() => setSelectedProject(null)}
        />
      )}

      <style>{`
        .projects-section {
          background-color: var(--bg-primary);
        }

        .projects-composition-flow {
          display: flex;
          flex-direction: column;
        }

        .project-row {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: clamp(2.5rem, 5vw, 4.75rem);
          align-items: center;
          padding: clamp(3.25rem, 6.5vh, 5rem) 0;
          border-bottom: 1px solid var(--border-subtle);
        }

        .project-row:first-child {
          padding-top: 0.5rem;
        }

        /* Left Editorial Column */
        .project-editorial-side {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .project-category {
          font-size: 0.75rem;
          color: var(--accent-primary);
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 700;
        }

        .project-title {
          font-family: var(--font-heading);
          font-size: clamp(1.75rem, 2.5vw, 2.3rem);
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
          letter-spacing: -0.015em;
        }

        .project-summary {
          font-size: clamp(1.05rem, 1.15vw, 1.125rem);
          line-height: 1.82;
          color: var(--text-secondary);
          max-width: 58ch;
        }

        .project-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 2px;
        }

        .project-tech-pill {
          font-size: 0.75rem;
          color: var(--text-secondary);
          padding: 4px 12px;
          background: rgba(245, 239, 230, 0.04);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
        }

        .project-action-row {
          margin-top: 8px;
        }

        .action-btn-editorial {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--text-primary);
          padding: 6px 0;
          border-bottom: 1.5px solid var(--accent-primary);
          transition: color 180ms ease;
        }

        .action-btn-editorial:hover {
          color: var(--accent-primary);
        }

        /* Right Visual Blueprint Frame */
        .project-visual-frame {
          background: rgba(10, 12, 18, 0.90);
          border: 1px solid var(--border-prominent);
          border-radius: var(--radius-sm);
          overflow: hidden;
          cursor: pointer;
          transition: border-color 240ms ease, box-shadow 240ms ease, transform 240ms ease;
        }

        .project-visual-frame:hover {
          border-color: var(--accent-primary);
          box-shadow: var(--shadow-prominent);
          transform: translateY(-4px);
        }

        .frame-image-wrapper {
          position: relative;
          width: 100%;
          height: clamp(230px, 28vh, 300px);
          background: #07090D;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
        }

        .frame-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          transition: transform 450ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .project-visual-frame:hover .frame-image {
          transform: scale(1.025);
        }

        .frame-hover-cue {
          position: absolute;
          inset: 0;
          background: rgba(8, 9, 13, 0.74);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: var(--text-primary);
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          opacity: 0;
          transition: opacity 220ms ease;
        }

        .project-visual-frame:hover .frame-hover-cue {
          opacity: 1;
        }

        .frame-metrics-bar {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          padding: 14px 20px;
          background: rgba(14, 17, 24, 0.96);
          border-top: 1px solid var(--border-subtle);
          gap: 16px;
        }

        .metric-item {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .metric-label {
          font-size: 0.625rem;
          color: var(--text-muted);
          letter-spacing: 0.08em;
        }

        .metric-value {
          font-size: 0.875rem;
          color: var(--accent-primary);
          letter-spacing: 0.04em;
          font-weight: 700;
        }

        /* Breathable Research Archive Switcher */
        .research-archive-strip {
          margin-top: clamp(3.5rem, 7vh, 5rem);
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .archive-tabs-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .archive-strip-label {
          font-size: 0.75rem;
          color: var(--accent-primary);
          letter-spacing: 0.18em;
          font-weight: 700;
        }

        .switcher-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .switcher-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 9px 18px;
          background: rgba(245, 239, 230, 0.04);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          color: var(--text-secondary);
          transition: all 180ms ease;
        }

        .switcher-tab-btn:hover {
          color: var(--text-primary);
          border-color: var(--border-prominent);
        }

        .switcher-tab-btn.is-active {
          color: var(--text-primary);
          background: var(--accent-subtle);
          border-color: var(--accent-primary);
        }

        .tab-idx {
          color: var(--accent-primary);
          font-weight: 700;
        }

        .archive-compact-preview {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          padding: clamp(1.75rem, 3.5vw, 2.5rem);
          background: rgba(12, 14, 20, 0.78);
          border: 1px solid var(--border-subtle);
          border-left: 3px solid var(--accent-primary);
          border-radius: var(--radius-sm);
        }

        .archive-preview-text {
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-width: 680px;
        }

        .archive-cat {
          font-size: 0.6875rem;
          color: var(--accent-primary);
          letter-spacing: 0.14em;
          font-weight: 700;
        }

        .archive-preview-title {
          font-family: var(--font-heading);
          font-size: clamp(1.35rem, 1.9vw, 1.65rem);
          color: var(--text-primary);
        }

        .archive-preview-desc {
          font-size: 1.025rem;
          color: var(--text-secondary);
          line-height: 1.78;
        }

        .archive-preview-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 18px;
          flex-shrink: 0;
        }

        .archive-key-stat {
          display: flex;
          flex-direction: column;
          text-align: right;
          gap: 2px;
        }

        .stat-lbl {
          font-size: 0.625rem;
          color: var(--text-muted);
          letter-spacing: 0.08em;
        }

        .stat-val {
          font-size: 1.1rem;
          color: var(--accent-primary);
        }

        @media (max-width: 900px) {
          .project-row {
            grid-template-columns: 1fr;
            gap: 28px;
          }

          .archive-compact-preview {
            flex-direction: column;
            align-items: flex-start;
          }

          .archive-preview-actions {
            width: 100%;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }

          .archive-key-stat {
            text-align: left;
          }
        }
      `}</style>
    </section>
  );
};

export default ProjectGallery;
