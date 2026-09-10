import React, { useState } from 'react';
import resumeData from '../../../data/resume_data.json';
import { ProjectModal } from './ProjectModal.jsx';
import { ArrowUpRight, Database, Terminal, Cpu, Sparkles, ZoomIn } from 'lucide-react';
import { ParallaxLayer } from '../parallax/ParallaxLayer.jsx';

export const ProjectGallery = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const getProjectImage = (id) => {
    switch (id) {
      case 'retailsink':
        return '/images/retailsink-architecture.svg';
      case 'frame-order-restoration':
        return '/images/video-frame-tsp.jpg';
      case 'opendesign':
        return '/images/pinn-thermal-twin.jpg'; // high-tech cloud infrastructure schematic
      default:
        return '/images/pinn-thermal-twin.jpg';
    }
  };

  const getProjectIcon = (id) => {
    switch (id) {
      case 'retailsink': return <Database size={18} />;
      case 'opendesign': return <Terminal size={18} />;
      case 'frame-order-restoration': return <Cpu size={18} />;
      default: return <Sparkles size={18} />;
    }
  };

  const getInspectLabel = (id) => {
    switch (id) {
      case 'retailsink': return 'View Lakehouse Architecture';
      case 'frame-order-restoration': return 'Inspect TSP Algorithm';
      case 'opendesign': return 'View Infrastructure State Machine';
      default: return 'Explore System Case Study';
    }
  };

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = -(y / (rect.height / 2)) * 5;
    const rotY = (x / (rect.width / 2)) * 5;
    e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.015, 1.015, 1.015)`;
  };

  const handleCardMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    e.currentTarget.style.transition = 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1), border-color 200ms ease';
  };

  const handleCardMouseEnter = (e) => {
    e.currentTarget.style.transition = 'transform 60ms ease-out, border-color 200ms ease';
  };

  return (
    <section id="projects" className="projects-section">
      {/* Localized Section Watermark (Physically bounded to this section) */}
      <div className="section-backdrop-watermark" aria-hidden="true">
        <span className="wm-japanese">匠</span>
        <span className="wm-number mono">03</span>
        <div className="wm-equation mono">
          min ∑ d(c_i, c_i+1) | Beam-Search 2-Opt  // TSP Reorder
        </div>
      </div>

      <div className="container relative-content">
        
        {/* Section Header */}
        <div className="section-head">
          <div className="section-tag">
            <span className="mono">// SYSTEMS INDEX · 3 PRODUCTION BUILDS</span>
          </div>
          <h2 className="section-title">
            Selected Systems &amp; Open Works
          </h2>
          <p className="section-subtitle">
            Engineered systems spanning real-time analytical lakehouses, heuristic video reconstruction, and production deployment automation.
          </p>
        </div>

        {/* Project Grid with Rich Visual Schematics */}
        <div className="projects-grid">
          {resumeData.projects.map((project, idx) => {
            const isFeatured = idx === 0;
            const projectImg = getProjectImage(project.id);

            return (
              <ParallaxLayer
                key={project.id}
                speed={idx % 2 === 0 ? 0.98 : 1.02}
                mouseFactor={8}
                className={`project-card-parallax-wrap ${isFeatured ? 'is-featured' : ''}`}
              >
                <div
                  className={`project-card ${isFeatured ? 'is-featured' : 'standard-card'}`}
                  onClick={() => setSelectedProject(project)}
                  onMouseMove={isFeatured ? handleCardMouseMove : undefined}
                  onMouseEnter={isFeatured ? handleCardMouseEnter : undefined}
                  onMouseLeave={isFeatured ? handleCardMouseLeave : undefined}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedProject(project);
                    }
                  }}
                  aria-label={`Open case study for ${project.title}`}
                >
                {/* Visual Architecture Image Banner */}
                <div className="card-visual-media">
                  <img
                    src={projectImg}
                    alt={`${project.title} Architectural Schematic`}
                    className="card-media-img"
                    loading="lazy"
                  />
                  <div className="media-overlay">
                    <div className="media-inspect-btn mono">
                      <ZoomIn size={14} />
                      <span>{getInspectLabel(project.id)}</span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="card-body-content">
                  {/* Top Meta */}
                  <div className="card-top">
                    <div className="card-category mono">
                      <span className="category-icon">{getProjectIcon(project.id)}</span>
                      <span>{project.category}</span>
                    </div>
                    <div className="card-arrow" aria-hidden="true">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>

                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-summary">{project.summary}</p>

                  {/* Highlights preview */}
                  <ul className="card-features">
                    {project.key_features.slice(0, isFeatured ? 3 : 2).map((feat, fIdx) => (
                      <li key={fIdx} className="feature-line">
                        <span className="bullet">›</span> {feat}
                      </li>
                    ))}
                  </ul>

                  {/* Tech Pills */}
                  <div className="card-tech">
                    {project.tech.map((t) => (
                      <span key={t} className="tech-badge mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
              </ParallaxLayer>
            );
          })}
        </div>

      </div>

      {/* Deep-Dive Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          projectImage={getProjectImage(selectedProject.id)}
          onClose={() => setSelectedProject(null)}
        />
      )}

      <style>{`
        .projects-section {
          position: relative;
          padding: var(--space-20) 0;
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
          left: auto;
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

        /* Project Grid */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-8);
        }

        .project-card-parallax-wrap.is-featured {
          grid-column: span 2;
        }

        .project-card {
          display: flex;
          flex-direction: column;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          overflow: hidden;
          cursor: pointer;
          transform-style: preserve-3d;
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast), transform 200ms ease;
        }

        .project-card.standard-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent-primary);
          box-shadow: var(--shadow-prominent), 0 0 25px rgba(200, 50, 38, 0.15);
        }

        .project-card:hover {
          border-color: var(--accent-primary);
          box-shadow: var(--shadow-prominent), 0 0 35px rgba(200, 50, 38, 0.15);
        }

        .project-card.is-featured {
          width: 100%;
        }

        /* Visual Media Banner with 3D Float */
        .card-visual-media {
          position: relative;
          width: 100%;
          height: 240px;
          background: var(--bg-primary);
          overflow: hidden;
          transform: translateZ(26px);
        }

        .card-body-content {
          transform: translateZ(34px);
        }

        .card-tech {
          transform: translateZ(46px);
        }

        .project-card.is-featured .card-visual-media {
          height: 340px;
        }

        .card-media-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 500ms ease;
        }

        .project-card:hover .card-media-img {
          transform: scale(1.03);
        }

        .media-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(14, 16, 22, 0.95) 0%, transparent 60%);
          display: flex;
          align-items: flex-end;
          padding: var(--space-4);
          opacity: 0.85;
          transition: opacity var(--transition-fast);
        }

        .project-card:hover .media-overlay {
          opacity: 1;
        }

        .media-inspect-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: rgba(10, 11, 14, 0.75);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border-prominent);
          border-radius: var(--radius-sm);
          font-size: 0.6875rem;
          color: var(--text-primary);
        }

        /* Body Content */
        .card-body-content {
          padding: var(--space-6) var(--space-8) var(--space-8);
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          flex: 1;
        }

        .card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .card-category {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          color: var(--accent-primary);
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .category-icon {
          display: flex;
          align-items: center;
        }

        .card-arrow {
          color: var(--text-muted);
          transition: transform var(--transition-fast), color var(--transition-fast);
        }

        .project-card:hover .card-arrow {
          color: var(--accent-primary);
          transform: translate(2px, -2px);
        }

        .card-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.25;
        }

        .card-summary {
          font-size: 0.9375rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .card-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: var(--space-2);
        }

        .feature-line {
          font-size: 0.875rem;
          color: var(--text-muted);
          line-height: 1.45;
        }

        .bullet {
          color: var(--accent-primary);
          font-weight: bold;
        }

        .card-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: auto;
          padding-top: var(--space-4);
        }

        .tech-badge {
          font-size: 0.75rem;
          padding: 3px 9px;
          background: var(--bg-primary);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          border-radius: var(--radius-sm);
        }

        @media (max-width: 860px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
          .project-card.is-featured {
            grid-column: span 1;
          }
          .card-visual-media,
          .project-card.is-featured .card-visual-media {
            height: 200px;
          }
          .card-body-content {
            padding: var(--space-5);
          }
        }
      `}</style>
    </section>
  );
};
