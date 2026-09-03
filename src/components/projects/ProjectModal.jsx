import React, { useEffect } from 'react';
import { X, CheckCircle2, Layers, Cpu, Database, ExternalLink } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';

export const ProjectModal = ({ project, projectImage, onClose }) => {
  const { theme } = useTheme();

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

        {/* High-Resolution Architectural Media Display */}
        {projectImage && (
          <div className="modal-media-wrap">
            <img
              src={projectImage}
              alt={`${project.title} High-Resolution Topology`}
              className="modal-schematic-img"
            />
            <div className="modal-media-caption mono">
              <span>SYSTEM ARCHITECTURE SCHEMATIC &amp; EMPIRICAL PIPELINE TOPOLOGY</span>
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
          {/* Executive Overview */}
          <div className="modal-section">
            <h4 className="section-heading">Executive Overview</h4>
            <p className="section-text">{project.summary}</p>
          </div>

          {/* Architectural Pillars */}
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

          {/* Technical Implementation Breakdown */}
          <div className="modal-section">
            <h4 className="section-heading">System Topology</h4>
            <div className="topology-box mono">
              {project.id === 'retailsink' && (
                <pre>{`[Retail Sources: POS, ERP, Web Clickstream]
       │
       ▼ (FastAPI Ingestion Engine)
[Bronze Layer: Raw Parquet Events / Append-Only]
       │
       ▼ (Vectorized DuckDB Transformations)
[Silver Layer: Cleansed, Conformed, SCD Type 2 History]
       │
       ▼ (Delta Lake Acid Transactions)
[Gold Layer: Aggregated Business Metrics & Analytics]
       │
       ▼
[React Executive Dashboard: Sub-second OLAP Queries]`}</pre>
              )}

              {project.id === 'frame-order-restoration' && (
                <pre>{`[Shuffled Video Frames Input]
       │
       ▼ (Parallel CPU Workers)
[Feature Fusion: ORB Descriptors + HSV Histograms + pHash]
       │
       ▼ (DirectML GPU Execution Provider)
[N x N Distance Matrix Calculation]
       │
       ▼ (Heuristic Combinatorial Search)
[Traveling Salesperson Formulation: Beam Search + 2-Opt]
       │
       ▼
[Restored Temporal Sequence (>99% Frame Similarity)]`}</pre>
              )}

              {project.id === 'opendesign' && (
                <pre>{`[OpenDesign Platform Canvas]
       │
       ▼ (OAuth Authentication & Encrypted Storage)
[Automated GitHub Repository & Deploy-Key Provisioning]
       │
       ▼ (Cloud Provider Orchestration Layer)
┌──────────────┬──────────────┬──────────────┐
▼              ▼              ▼              ▼
[Netlify API]  [Render API]   [Railway API]  [Webhooks]
└──────────────┴──────────────┴──────────────┘
       │
       ▼
[Live Production URL Deployment State Machine]`}</pre>
              )}

              {project.id === 'emotional-dependency-detection' && (
                <pre>{`[4,000+ Annotated Human-LLM Interaction Prompts]
       │
       ▼ (Sentence Transformers Embedding Pipeline)
[Dense Semantic Vector Embeddings + Psycholinguistic Lexicon]
       │
       ▼ (Feature Engineering & Regularization)
[Attachment Signal Extraction + Temporal Turn Tracking]
       │
       ▼ (XGBoost Gradient Boosted Regression)
[Trained Dependency Quantifier: Cross-Validated R² ≈ 0.81]`}</pre>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <span className="mono footer-note">DATA VERIFIED FROM GROUND-TRUTH REPOSITORY ARCHIVES</span>
          <button onClick={onClose} className="footer-btn">
            Close Deep Dive
          </button>
        </div>

      </div>

      <style>{`
        .project-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.82);
          backdrop-filter: blur(12px);
          z-index: var(--z-modal);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-4);
          animation: modalFadeIn 200ms ease;
        }

        .project-modal-card {
          width: 100%;
          max-width: 860px;
          max-height: 92vh;
          overflow-y: auto;
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-prominent);
          border-radius: var(--radius-lg);
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
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .modal-title {
          font-size: 1.625rem;
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
          background: var(--bg-primary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          overflow: hidden;
        }

        .modal-schematic-img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
        }

        .modal-media-caption {
          padding: 8px 12px;
          font-size: 0.6875rem;
          color: var(--text-muted);
          background: var(--bg-primary);
          border-top: 1px solid var(--border-subtle);
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
          font-size: 0.8125rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .section-text {
          font-size: 1rem;
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
          line-height: 1.5;
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
          border-radius: var(--radius-sm);
          padding: var(--space-4);
          overflow-x: auto;
          font-size: 0.75rem;
          line-height: 1.45;
          color: var(--accent-primary);
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
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
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
