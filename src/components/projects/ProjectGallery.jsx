import React, { useState } from 'react';
import resumeData from '../../../data/resume_data.json';
import { ProjectModal } from './ProjectModal.jsx';
import { ArrowUpRight, ZoomIn } from 'lucide-react';
import { SceneBackdrop } from '../common/SceneBackdrop.jsx';

export const ProjectGallery = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  // We feature the two flagship systems in the alternating composition (matching Reference 2)
  const flagshipProjects = resumeData.projects.slice(0, 2);
  const remainingProjects = resumeData.projects.slice(2);

  const getProjectVisual = (id) => {
    switch (id) {
      case 'retailsink':
        return {
          src: '/images/retailsink-architecture.svg',
          alt: 'RetailSink Medallion Lakehouse Architecture',
          filename: 'retailsink_lakehouse.py',
          engine: 'DuckDB 1.0 • Delta Lake',
          metrics: [
            { label: 'INGEST LATENCY', val: '0.18s' },
            { label: 'QUERY SPEEDUP', val: '10×' },
            { label: 'STORAGE FORMAT', val: 'DELTA LAKE' }
          ]
        };
      case 'frame-order-restoration':
      default:
        return {
          src: '/images/video-frame-tsp.jpg',
          alt: 'Frame Order Restoration TSP Reconstruction Matrix',
          filename: 'video_frame_tsp_solver.py',
          engine: 'PyTorch • DirectML GPU',
          metrics: [
            { label: 'FRAME SIMILARITY', val: '> 99%' },
            { label: 'OPTIMIZER', val: 'BEAM 2-OPT' },
            { label: 'GPU BACKEND', val: 'DIRECTML' }
          ]
        };
    }
  };

  return (
    <section id="projects" className="scene-section projects-section">
      {/* Dedicated River Valley Backdrop */}
      <SceneBackdrop
        image="/images/cinematic_forest.png"
        position="center 35%"
        opacity={0.82}
        overlayDarkness={0.78}
      />

      {/* Side Numbered Equation & Chapter Watermark */}
      <div className="section-backdrop-watermark" aria-hidden="true">
        <span className="wm-number mono">02</span>
        <div className="wm-equation mono">min ∑ d(c_i, c_i+1) | Beam-Search 2-Opt // TSP Reorder</div>
      </div>

      <div className="container scene-content projects-content">
        
        {/* Editorial Scene Header */}
        <div className="scene-head-editorial">
          <div className="scene-head-top">
            <div className="scene-head-left">
              <span className="scene-eyebrow">02 // SYSTEMS ARCHITECTURE &amp; RESEARCH</span>
              <h2 className="scene-title-editorial">
                Projects
              </h2>
            </div>
            <p className="scene-head-right-subtext">
              LAKEHOUSE PIPELINES, HEURISTIC VIDEO RECONSTRUCTION, AND DISTRIBUTED CLOUD AUTOMATION.
            </p>
          </div>
          <div className="scene-divider-rule" />
        </div>

        {/* Alternating Asymmetric Editorial Composition (Matching Reference 2) */}
        <div className="projects-composition-flow">
          
          {/* Project 1: Visual Left | Editorial Right */}
          {(() => {
            const project = flagshipProjects[0];
            const visual = getProjectVisual(project.id);

            return (
              <div key={project.id} className="project-row row-visual-left">
                
                {/* Visual Technical Frame */}
                <div
                  className="project-visual-frame"
                  onClick={() => setSelectedProject(project)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Inspect ${project.title} architecture`}
                >
                  <div className="frame-top-bar mono">
                    <span className="file-indicator">● {visual.filename}</span>
                    <span className="engine-indicator">{visual.engine}</span>
                  </div>

                  <div className="frame-image-wrapper">
                    <img
                      src={visual.src}
                      alt={visual.alt}
                      className="frame-image"
                      loading="lazy"
                    />
                    <div className="frame-hover-cue mono">
                      <ZoomIn size={14} />
                      <span>EXPAND ARCHITECTURE</span>
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

                {/* Editorial Content */}
                <div className="project-editorial-side">
                  <div className="project-category mono">
                    {project.category} • {project.tech.slice(0, 3).join(' / ')}
                  </div>

                  <h3 className="project-title">{project.title}</h3>
                  
                  <p className="project-summary">{project.summary}</p>

                  <ul className="project-key-points">
                    {project.key_features.slice(0, 3).map((feat, fIdx) => (
                      <li key={fIdx} className="point-item">
                        <span className="point-bullet">▪</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="project-action-links">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="action-btn-editorial mono"
                    >
                      <span>VIEW LAKEHOUSE ARCHITECTURE</span>
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>

              </div>
            );
          })()}

          {/* Project 2: Editorial Left | Visual Right */}
          {(() => {
            const project = flagshipProjects[1];
            const visual = getProjectVisual(project.id);

            return (
              <div key={project.id} className="project-row row-visual-right">
                
                {/* Editorial Content */}
                <div className="project-editorial-side">
                  <div className="project-category mono">
                    {project.category} • {project.tech.slice(0, 3).join(' / ')}
                  </div>

                  <h3 className="project-title">{project.title}</h3>
                  
                  <p className="project-summary">{project.summary}</p>

                  <ul className="project-key-points">
                    {project.key_features.slice(0, 3).map((feat, fIdx) => (
                      <li key={fIdx} className="point-item">
                        <span className="point-bullet">▪</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="project-action-links">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="action-btn-editorial mono"
                    >
                      <span>INSPECT TSP ALGORITHM</span>
                      <ArrowUpRight size={14} />
                    </button>
                    {remainingProjects.length > 0 && (
                      <button
                        onClick={() => setSelectedProject(remainingProjects[0])}
                        className="action-btn-secondary mono"
                      >
                        <span>MORE SYSTEMS ({remainingProjects.length}) ↗</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Visual Technical Frame */}
                <div
                  className="project-visual-frame"
                  onClick={() => setSelectedProject(project)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Inspect ${project.title} algorithm`}
                >
                  <div className="frame-top-bar mono">
                    <span className="file-indicator">● {visual.filename}</span>
                    <span className="engine-indicator">{visual.engine}</span>
                  </div>

                  <div className="frame-image-wrapper">
                    <img
                      src={visual.src}
                      alt={visual.alt}
                      className="frame-image"
                      loading="lazy"
                    />
                    <div className="frame-hover-cue mono">
                      <ZoomIn size={14} />
                      <span>INSPECT ALGORITHM</span>
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

              </div>
            );
          })()}

        </div>

      </div>

      {/* Deep Dive Case Study Lightbox / Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          projectImage={getProjectVisual(selectedProject.id).src}
          onClose={() => setSelectedProject(null)}
        />
      )}

      <style>{`
        .projects-section {
          background-color: #0A0B0E;
        }

        .projects-content {
          padding-top: clamp(1rem, 2vh, 1.75rem);
          padding-bottom: clamp(1rem, 2vh, 1.75rem);
        }

        /* Alternating Composition Flow */
        .projects-composition-flow {
          display: flex;
          flex-direction: column;
          gap: clamp(1rem, 2.2vh, 1.75rem);
          margin-top: clamp(0.5rem, 1.5vh, 1.25rem);
        }

        .project-row {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: clamp(1.5rem, 3.5vw, 3rem);
          align-items: center;
        }

        .row-visual-right {
          grid-template-columns: 1.15fr 1fr;
        }

        /* Visual Technical Frame (Replaces code block with technical diagram) */
        .project-visual-frame {
          background: rgba(8, 10, 15, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: var(--radius-sm);
          overflow: hidden;
          cursor: pointer;
          transition: border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
        }

        .project-visual-frame:hover {
          border-color: var(--accent-primary);
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.8), 0 0 24px rgba(200, 50, 38, 0.35);
          transform: translateY(-2px);
        }

        .frame-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 12px;
          background: rgba(14, 17, 24, 0.95);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.6875rem;
        }

        .file-indicator {
          color: var(--accent-primary);
        }

        .engine-indicator {
          color: #9CA3AF;
        }

        .frame-image-wrapper {
          position: relative;
          width: 100%;
          height: clamp(110px, 14.5vh, 150px);
          background: #050608;
          overflow: hidden;
        }

        .frame-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 400ms ease;
          opacity: 0.92;
        }

        .project-visual-frame:hover .frame-image {
          transform: scale(1.03);
          opacity: 1;
        }

        .frame-hover-cue {
          position: absolute;
          inset: 0;
          background: rgba(8, 9, 13, 0.65);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          color: #F5EFE6;
          font-size: 0.6875rem;
          letter-spacing: 0.08em;
          opacity: 0;
          transition: opacity 180ms ease;
        }

        .project-visual-frame:hover .frame-hover-cue {
          opacity: 1;
        }

        .frame-metrics-bar {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          padding: 6px 10px;
          background: rgba(12, 15, 20, 0.95);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          gap: 8px;
        }

        .metric-item {
          display: flex;
          flex-direction: column;
        }

        .metric-label {
          font-size: 0.5625rem;
          color: #6B7280;
          letter-spacing: 0.05em;
        }

        .metric-value {
          font-size: 0.75rem;
          color: var(--accent-primary);
          letter-spacing: 0.04em;
          font-weight: 700;
        }

        /* Editorial Side */
        .project-editorial-side {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .project-category {
          font-size: clamp(0.625rem, 0.85vw, 0.6875rem);
          color: var(--accent-primary);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 700;
        }

        .project-title {
          font-family: var(--font-body);
          font-size: clamp(1.25rem, 1.8vw, 1.65rem);
          font-weight: 700;
          color: #FFFFFF;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }

        .project-summary {
          font-size: clamp(0.75rem, 0.95vw, 0.85rem);
          line-height: 1.5;
          color: #D1D5DB;
          margin-top: 2px;
        }

        .project-key-points {
          list-style: none;
          margin: 4px 0 6px;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .point-item {
          display: flex;
          align-items: baseline;
          gap: 8px;
          font-size: clamp(0.6875rem, 0.9vw, 0.78125rem);
          line-height: 1.45;
          color: #9CA3AF;
        }

        .point-bullet {
          color: var(--accent-primary);
          font-size: 0.55rem;
        }

        .project-action-links {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 2px;
        }

        .action-btn-editorial {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #F5EFE6;
          padding: 4px 0;
          border-bottom: 1px solid var(--accent-primary);
          transition: color 150ms ease, border-color 150ms ease;
        }

        .action-btn-editorial:hover {
          color: var(--accent-primary);
          border-color: var(--accent-hover);
        }

        .action-btn-secondary {
          font-size: 0.6875rem;
          color: #9CA3AF;
          transition: color 150ms ease;
        }

        .action-btn-secondary:hover {
          color: #FFFFFF;
        }

        @media (max-width: 900px) {
          .project-row,
          .row-visual-right {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .row-visual-right .project-editorial-side {
            order: 2;
          }
          .row-visual-right .project-visual-frame {
            order: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default ProjectGallery;
