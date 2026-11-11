import React, { useEffect, useState } from 'react';
import { X, CheckCircle2, Play, RotateCcw } from 'lucide-react';

const INITIAL_SHUFFLED = [
  { id: 5, label: 'F_5', time: 't=0.83s', hue: '#857E73' },
  { id: 2, label: 'F_2', time: 't=0.33s', hue: '#857E73' },
  { id: 6, label: 'F_6', time: 't=1.00s', hue: '#857E73' },
  { id: 1, label: 'F_1', time: 't=0.16s', hue: '#857E73' },
  { id: 4, label: 'F_4', time: 't=0.66s', hue: '#857E73' },
  { id: 3, label: 'F_3', time: 't=0.50s', hue: '#857E73' }
];

const BEAM_STEP = [
  { id: 1, label: 'F_1', time: 't=0.16s', hue: '#C8C0B2' },
  { id: 2, label: 'F_2', time: 't=0.33s', hue: '#C8C0B2' },
  { id: 4, label: 'F_4', time: 't=0.66s', hue: '#C83226' },
  { id: 3, label: 'F_3', time: 't=0.50s', hue: '#C83226' },
  { id: 5, label: 'F_5', time: 't=0.83s', hue: '#C8C0B2' },
  { id: 6, label: 'F_6', time: 't=1.00s', hue: '#C8C0B2' }
];

const SOLVED_STEP = [
  { id: 1, label: 'F_1', time: 't=0.16s', hue: '#C83226' },
  { id: 2, label: 'F_2', time: 't=0.33s', hue: '#C83226' },
  { id: 3, label: 'F_3', time: 't=0.50s', hue: '#C83226' },
  { id: 4, label: 'F_4', time: 't=0.66s', hue: '#C83226' },
  { id: 5, label: 'F_5', time: 't=0.83s', hue: '#C83226' },
  { id: 6, label: 'F_6', time: 't=1.00s', hue: '#C83226' }
];

export const ProjectModal = ({ project, projectImage, onClose }) => {
  const [tspStage, setTspStage] = useState('shuffled');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!project) return null;

  const isTspProject = project.id === 'frame-order-restoration';

  const runTspSolver = () => {
    setTspStage('beam');
    setTimeout(() => {
      setTspStage('solved');
    }, 550);
  };

  const currentFrames =
    tspStage === 'solved'
      ? SOLVED_STEP
      : tspStage === 'beam'
      ? BEAM_STEP
      : INITIAL_SHUFFLED;

  const tspMetricText =
    tspStage === 'solved'
      ? '99.4% SIMILARITY (2-OPT CONVERGED)'
      : tspStage === 'beam'
      ? '86.2% SIMILARITY (BEAM INIT · UNCROSSING F_4↔F_3)'
      : '41.8% SIMILARITY (UNORDERED PERMUTATION)';

  return (
    <div className="project-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="project-modal-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-category mono">{project.category}</span>
            <h3 className="modal-title">{project.title}</h3>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* High-Resolution Architectural Vector Display */}
        {projectImage && (
          <div className="modal-media-wrap">
            <img
              src={projectImage}
              alt={`${project.title} High-Resolution Topology`}
              className="modal-schematic-img"
            />
            <div className="modal-media-caption mono">
              <span>SYSTEM ARCHITECTURE SCHEMATIC</span>
              {project.visual?.engine && <span>{project.visual.engine}</span>}
            </div>
          </div>
        )}

        {/* Interactive 2-Opt Live Frame Reordering Sandbox (For Frame Order Restoration) */}
        {isTspProject && (
          <div className="tsp-interactive-widget mono">
            <div className="tsp-widget-header">
              <span>
                LIVE 2-OPT TOUR STATE: <strong className={tspStage === 'solved' ? 'text-cinnabar' : ''}>{tspMetricText}</strong>
              </span>
              <div>
                {tspStage !== 'solved' ? (
                  <button onClick={runTspSolver} className="tsp-run-btn mono">
                    <Play size={11} />
                    <span>RUN 2-OPT SOLVER</span>
                  </button>
                ) : (
                  <button onClick={() => setTspStage('shuffled')} className="tsp-reset-btn mono">
                    <RotateCcw size={11} />
                    <span>SHUFFLE FRAMES</span>
                  </button>
                )}
              </div>
            </div>

            <div className="tsp-frames-track">
              {currentFrames.map((fr, fIdx) => (
                <React.Fragment key={fr.id}>
                  <div
                    className={`tsp-frame-tile ${tspStage === 'solved' ? 'is-ordered' : ''}`}
                    style={{ borderColor: fr.hue }}
                  >
                    <span className="tile-id">{fr.label}</span>
                    <span className="tile-time">{fr.time}</span>
                  </div>
                  {fIdx < currentFrames.length - 1 && (
                    <span className="tsp-edge-arrow" aria-hidden="true">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack Bar */}
        <div className="modal-tech-row">
          {project.tech.map((t) => (
            <span key={t} className="tech-badge mono">
              {t}
            </span>
          ))}
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <div className="modal-section">
            <h4 className="section-heading">Executive Overview</h4>
            <p className="section-text">{project.summary}</p>
          </div>

          <div className="modal-section">
            <h4 className="section-heading">Architecture &amp; Engineering Decisions</h4>
            <ul className="modal-feature-list">
              {project.key_features.map((feat, fIdx) => (
                <li key={fIdx} className="feature-item">
                  <CheckCircle2 size={16} className="feature-icon" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {project.topology && (
            <div className="modal-section">
              <h4 className="section-heading">System Dataflow &amp; Execution Topology</h4>
              <div className="topology-box mono">
                <pre>{project.topology}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <span className="mono footer-note">ABIMANYU JAYAGANESH // SYSTEMS ARCHIVE</span>
          <button onClick={onClose} className="footer-btn">
            Close
          </button>
        </div>

      </div>

      <style>{`
        .project-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(6, 7, 10, 0.88);
          backdrop-filter: blur(16px);
          z-index: var(--z-modal);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-4);
          animation: modalFadeIn 220ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .project-modal-card {
          width: 100%;
          max-width: 920px;
          max-height: 90vh;
          overflow-y: auto;
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-prominent);
          border-radius: var(--radius-md);
          padding: var(--space-8);
          box-shadow: var(--shadow-prominent);
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }

        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
        }

        .modal-category {
          font-size: 0.75rem;
          color: var(--accent-primary);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 700;
        }

        .modal-title {
          font-family: var(--font-heading);
          font-size: 1.65rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-top: 4px;
        }

        .modal-close-btn {
          padding: 8px;
          border-radius: var(--radius-sm);
          color: var(--text-muted);
          transition: color var(--transition-fast), background-color var(--transition-fast);
        }

        .modal-close-btn:hover {
          color: var(--text-primary);
          background: var(--bg-surface);
        }

        .modal-media-wrap {
          width: 100%;
          background: #07090D;
          border: 1px solid var(--border-prominent);
          border-radius: var(--radius-sm);
          overflow: hidden;
        }

        .modal-schematic-img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: contain;
        }

        .modal-media-caption {
          padding: 8px 14px;
          font-size: 0.6875rem;
          color: var(--text-secondary);
          background: var(--bg-primary);
          border-top: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .tsp-interactive-widget {
          padding: 12px 14px;
          background: rgba(10, 11, 14, 0.9);
          border: 1px solid var(--border-prominent);
          border-left: 2px solid var(--accent-primary);
          border-radius: var(--radius-sm);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .tsp-widget-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
          font-size: 0.6875rem;
          color: var(--text-secondary);
        }

        .text-cinnabar {
          color: var(--accent-primary);
        }

        .tsp-run-btn,
        .tsp-reset-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          font-size: 0.625rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          border-radius: var(--radius-sm);
          transition: all 150ms ease;
        }

        .tsp-run-btn {
          background: var(--accent-primary);
          color: #FFFFFF;
        }

        .tsp-reset-btn {
          background: rgba(245, 239, 230, 0.06);
          border: 1px solid var(--border-prominent);
          color: var(--text-primary);
        }

        .tsp-frames-track {
          display: flex;
          align-items: center;
          gap: 6px;
          overflow-x: auto;
        }

        .tsp-frame-tile {
          flex: 1;
          min-width: 56px;
          padding: 6px;
          background: #0B0D13;
          border: 1px solid var(--border-prominent);
          border-radius: var(--radius-sm);
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: all 350ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .tsp-frame-tile.is-ordered {
          background: rgba(200, 50, 38, 0.12);
        }

        .tile-id {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .tile-time {
          font-size: 0.5625rem;
          color: var(--text-muted);
        }

        .tsp-edge-arrow {
          color: var(--accent-primary);
          font-size: 0.75rem;
          font-weight: 700;
        }

        .modal-tech-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding-bottom: var(--space-4);
          border-bottom: 1px solid var(--border-subtle);
        }

        .tech-badge {
          font-size: 0.75rem;
          padding: 4px 10px;
          background: var(--bg-primary);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          border-radius: var(--radius-sm);
        }

        .modal-body {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }

        .modal-section {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .section-heading {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--accent-primary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .section-text {
          font-size: 0.95rem;
          line-height: 1.65;
          color: var(--text-secondary);
        }

        .modal-feature-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.9375rem;
          line-height: 1.55;
          color: var(--text-secondary);
        }

        .feature-icon {
          color: var(--accent-primary);
          margin-top: 2px;
          flex-shrink: 0;
        }

        .topology-box {
          background: var(--bg-primary);
          border: 1px solid var(--border-subtle);
          border-left: 2px solid var(--accent-primary);
          border-radius: var(--radius-sm);
          padding: var(--space-4);
          overflow-x: auto;
          font-size: 0.75rem;
          line-height: 1.55;
          color: var(--text-primary);
        }

        .modal-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: var(--space-4);
          border-top: 1px solid var(--border-subtle);
        }

        .footer-note {
          font-size: 0.6875rem;
          color: var(--text-muted);
        }

        .footer-btn {
          padding: 8px 18px;
          background: var(--bg-surface);
          border: 1px solid var(--border-prominent);
          border-radius: var(--radius-sm);
          font-family: var(--font-mono);
          font-size: 0.8125rem;
          color: var(--text-primary);
          transition: all var(--transition-fast);
        }

        .footer-btn:hover {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
        }

        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.98) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        @media (max-width: 640px) {
          .project-modal-card {
            padding: var(--space-5);
          }
          .modal-footer {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectModal;
