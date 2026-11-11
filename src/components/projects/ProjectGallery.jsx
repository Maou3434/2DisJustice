import React, { useState } from 'react';
import resumeData from '../../../data/resume_data.json';
import { ProjectModal } from './ProjectModal.jsx';
import { ArrowUpRight, ZoomIn, Layers } from 'lucide-react';
import { SceneBackdrop } from '../common/SceneBackdrop.jsx';

export const ProjectGallery = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFlagshipIdx, setActiveFlagshipIdx] = useState(0);
  const [activeArchiveIdx, setActiveArchiveIdx] = useState(0);

  const flagshipProjects = resumeData.projects.filter((p) => p.flagship);
  const archiveProjects = resumeData.projects.filter((p) => !p.flagship);

  const activeFlagship = flagshipProjects[activeFlagshipIdx] || flagshipProjects[0];
  const activeArchive = archiveProjects[activeArchiveIdx] || archiveProjects[0];

  return (
    <section id="projects" className="scene-section projects-section">
      {/* Vivid River Valley & Sunlit Forest Backdrop */}
      <SceneBackdrop
        image="/images/cinematic_forest.png"
        position="center 35%"
        opacity={0.92}
        overlayDarkness={0.44}
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

        {/* Interactive Flagship Stage Selector (Eliminates Long Vertical List Fatigue!) */}
        <div className="flagship-interactive-deck reveal-item reveal-delay-1">
          {/* Top Selector Rail for the 3 Flagships */}
          <div className="flagship-selector-rail" role="tablist" aria-label="Select Flagship System">
            {flagshipProjects.map((proj, idx) => {
              const isSelected = activeFlagshipIdx === idx;
              return (
                <button
                  key={proj.id}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveFlagshipIdx(idx)}
                  className={`flagship-selector-card ${isSelected ? 'is-selected' : ''}`}
                >
                  <div className="selector-top mono">
                    <span className="selector-idx">FLAGSHIP 0{idx + 1}</span>
                    <span className="selector-cat">{proj.category}</span>
                  </div>
                  <h3 className="selector-title">{proj.title.split('—')[0].trim()}</h3>
                </button>
              );
            })}
          </div>

          {/* Active Flagship Interactive Split Stage */}
          {activeFlagship && (
            <article className="flagship-active-stage" key={activeFlagship.id}>
              {/* Left Narrative Column */}
              <div className="stage-editorial-col">
                <div className="stage-eyebrow mono">
                  0{activeFlagshipIdx + 1} // {activeFlagship.category}
                </div>

                <h3 className="stage-title">{activeFlagship.title}</h3>

                <p className="stage-summary">{activeFlagship.summary}</p>

                <div className="stage-tags-row mono">
                  {activeFlagship.tech.map((t) => (
                    <span key={t} className="stage-tech-pill">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="stage-action-bar">
                  <button
                    onClick={() => setSelectedProject(activeFlagship)}
                    className="stage-cta-btn mono"
                  >
                    <span>INSPECT SYSTEM ARCHITECTURE</span>
                    <ArrowUpRight size={15} />
                  </button>
                </div>
              </div>

              {/* Right Interactive Blueprint Viewport */}
              <div
                className="stage-blueprint-frame"
                onClick={() => setSelectedProject(activeFlagship)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedProject(activeFlagship);
                  }
                }}
                aria-label={`Inspect ${activeFlagship.title} architecture`}
              >
                <div className="blueprint-top-bar mono">
                  <span className="file-dot">● {activeFlagship.visual.filename}</span>
                  <span className="engine-lbl">{activeFlagship.visual.engine}</span>
                </div>

                <div className="frame-image-wrapper">
                  <img
                    src={activeFlagship.visual.src}
                    alt={activeFlagship.visual.alt}
                    className="frame-image"
                  />
                  <div className="frame-hover-cue mono">
                    <ZoomIn size={16} />
                    <span>OPEN FULL TOPOLOGY &amp; INTERACTIVE SANDBOX</span>
                  </div>
                </div>

                <div className="frame-metrics-bar mono">
                  {activeFlagship.visual.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="metric-item">
                      <span className="metric-label">{m.label}</span>
                      <strong className="metric-value">{m.val}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          )}
        </div>

        {/* Secondary Research Archive Switcher */}
        {archiveProjects.length > 0 && (
          <div className="research-archive-strip reveal-item reveal-delay-2">
            <div className="archive-tabs-row">
              <div className="archive-label-group mono">
                <Layers size={15} className="archive-icon" />
                <span>RESEARCH ARCHIVE (04 – 06)</span>
              </div>
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
              <div className="archive-compact-preview" key={activeArchive.id}>
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
                    className="stage-cta-btn mono"
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

        /* Interactive Flagship Stage Deck */
        .flagship-interactive-deck {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .flagship-selector-rail {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .flagship-selector-card {
          text-align: left;
          padding: 18px 22px;
          background: rgba(10, 12, 18, 0.72);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(245, 239, 230, 0.14);
          border-top: 3px solid transparent;
          border-radius: var(--radius-sm);
          display: flex;
          flex-direction: column;
          gap: 8px;
          transition: all 240ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .flagship-selector-card:hover {
          background: rgba(18, 22, 32, 0.84);
          border-color: rgba(245, 239, 230, 0.28);
          transform: translateY(-2px);
        }

        .flagship-selector-card.is-selected {
          background: rgba(18, 20, 28, 0.90);
          border-color: rgba(200, 50, 38, 0.55);
          border-top-color: var(--accent-primary);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.55), 0 0 24px rgba(200, 50, 38, 0.18);
        }

        .selector-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.6875rem;
          letter-spacing: 0.12em;
        }

        .selector-idx {
          color: var(--accent-primary);
          font-weight: 700;
        }

        .selector-cat {
          color: var(--text-muted);
        }

        .selector-title {
          font-family: var(--font-heading);
          font-size: clamp(1.15rem, 1.5vw, 1.35rem);
          color: var(--text-primary);
          font-weight: 700;
        }

        /* Active Flagship Split Stage */
        .flagship-active-stage {
          display: grid;
          grid-template-columns: 1fr 1.18fr;
          gap: clamp(2rem, 4vw, 3.5rem);
          align-items: center;
          padding: clamp(2rem, 3.8vw, 3rem);
          background: rgba(10, 12, 18, 0.78);
          backdrop-filter: blur(18px);
          border: 1px solid rgba(245, 239, 230, 0.16);
          border-radius: var(--radius-md);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.65);
          animation: stageFadeSwap 320ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes stageFadeSwap {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .stage-editorial-col {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .stage-eyebrow {
          font-size: 0.75rem;
          color: var(--accent-primary);
          letter-spacing: 0.16em;
          font-weight: 700;
        }

        .stage-title {
          font-family: var(--font-heading);
          font-size: clamp(1.65rem, 2.3vw, 2.15rem);
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
        }

        .stage-summary {
          font-size: clamp(1.025rem, 1.12vw, 1.1rem);
          line-height: 1.8;
          color: var(--text-secondary);
        }

        .stage-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .stage-tech-pill {
          font-size: 0.75rem;
          color: var(--text-primary);
          padding: 4px 12px;
          background: rgba(245, 239, 230, 0.06);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
        }

        .stage-action-bar {
          margin-top: 6px;
        }

        .stage-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #FFFFFF;
          background: var(--accent-primary);
          border-radius: var(--radius-sm);
          box-shadow: 0 0 20px rgba(200, 50, 38, 0.35);
          transition: background 180ms ease, transform 180ms ease;
        }

        .stage-cta-btn:hover {
          background: var(--accent-hover);
          transform: translateY(-2px);
        }

        /* Blueprint Frame */
        .stage-blueprint-frame {
          background: #07090D;
          border: 1px solid var(--border-prominent);
          border-radius: var(--radius-sm);
          overflow: hidden;
          cursor: pointer;
          transition: border-color 240ms ease, box-shadow 240ms ease;
        }

        .stage-blueprint-frame:hover {
          border-color: var(--accent-primary);
          box-shadow: 0 0 32px rgba(200, 50, 38, 0.25);
        }

        .blueprint-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          background: rgba(16, 19, 28, 0.95);
          border-bottom: 1px solid var(--border-subtle);
          font-size: 0.6875rem;
        }

        .file-dot {
          color: var(--accent-primary);
          font-weight: 700;
        }

        .engine-lbl {
          color: var(--text-muted);
        }

        .frame-image-wrapper {
          position: relative;
          width: 100%;
          height: clamp(230px, 28vh, 295px);
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

        .stage-blueprint-frame:hover .frame-image {
          transform: scale(1.03);
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
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          opacity: 0;
          transition: opacity 220ms ease;
        }

        .stage-blueprint-frame:hover .frame-hover-cue {
          opacity: 1;
        }

        .frame-metrics-bar {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          padding: 12px 18px;
          background: rgba(14, 17, 24, 0.96);
          border-top: 1px solid var(--border-subtle);
          gap: 12px;
        }

        .metric-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .metric-label {
          font-size: 0.625rem;
          color: var(--text-muted);
          letter-spacing: 0.08em;
        }

        .metric-value {
          font-size: 0.875rem;
          color: var(--accent-primary);
          font-weight: 700;
        }

        /* Secondary Research Archive Strip */
        .research-archive-strip {
          margin-top: clamp(2.5rem, 5vh, 3.5rem);
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .archive-tabs-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .archive-label-group {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          color: var(--accent-primary);
          letter-spacing: 0.16em;
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
          padding: 9px 16px;
          background: rgba(10, 12, 18, 0.75);
          backdrop-filter: blur(10px);
          border: 1px solid var(--border-prominent);
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          color: var(--text-secondary);
          transition: all 180ms ease;
        }

        .switcher-tab-btn.is-active {
          color: var(--text-primary);
          background: rgba(200, 50, 38, 0.2);
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
          gap: 28px;
          padding: 24px 28px;
          background: rgba(10, 12, 18, 0.78);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(245, 239, 230, 0.14);
          border-left: 3px solid var(--accent-primary);
          border-radius: var(--radius-sm);
        }

        .archive-preview-text {
          display: flex;
          flex-direction: column;
          gap: 8px;
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
          font-size: 1.4rem;
          color: var(--text-primary);
        }

        .archive-preview-desc {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.75;
        }

        .archive-preview-actions {
          display: flex;
          align-items: center;
          gap: 24px;
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
          font-size: 1.05rem;
          color: var(--accent-primary);
        }

        @media (max-width: 900px) {
          .flagship-selector-rail,
          .flagship-active-stage {
            grid-template-columns: 1fr;
          }

          .archive-compact-preview {
            flex-direction: column;
            align-items: flex-start;
          }

          .archive-preview-actions {
            width: 100%;
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
