import React from 'react';
import resumeData from '../../../data/resume_data.json';
import { Award, ShieldCheck, FileCheck2, ExternalLink } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';

export const PatentExhibition = () => {
  const { theme } = useTheme();
  const isTsushima = theme === 'tsushima';

  return (
    <section id="patents" className="patents-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-head">
          <div className="section-tag">
            <span className="mono">{isTsushima ? '// 特許 — INTELLECTUAL PROPERTY' : '// PATENT_PUBLICATIONS.REGISTRY'}</span>
          </div>
          <h2 className="section-title">
            {isTsushima ? 'Published Inventions & Patents' : 'Published Intellectual Property'}
          </h2>
          <p className="section-subtitle">
            Formal patent publications registered with the Patent Office of India (IP India), validating novel algorithmic and embedded biomedical systems.
          </p>
        </div>

        {/* Patents Grid */}
        <div className="patents-grid">
          {resumeData.patents.map((patent, idx) => (
            <article key={patent.application_number} className="patent-card">
              
              {/* Card Header & Seal */}
              <div className="patent-card-head">
                <div className="patent-badges">
                  <span className="jurisdiction-badge mono">
                    <ShieldCheck size={14} className="badge-icon" />
                    {patent.jurisdiction}
                  </span>
                  <span className="status-badge mono">
                    {patent.status}
                  </span>
                </div>
                
                {isTsushima ? (
                  <div className="inkan-stamp" title="Official Published Patent">
                    <span>特</span>
                  </div>
                ) : (
                  <div className="ip-stamp mono">
                    <span>PAT.PEND/PUB</span>
                  </div>
                )}
              </div>

              {/* Title & App Number */}
              <div className="patent-body">
                <h3 className="patent-title">{patent.title}</h3>
                <div className="patent-app-num mono">
                  <span>Application No:</span>
                  <strong className="app-id">{patent.application_number}</strong>
                </div>
                <p className="patent-summary">{patent.summary}</p>
              </div>

              {/* Card Footer */}
              <div className="patent-card-footer">
                <div className="footer-meta mono">
                  <FileCheck2 size={15} className="meta-icon" />
                  <span>Gazette Publication Published</span>
                </div>
                <span className="verify-link mono">
                  IP India Registry Verified
                </span>
              </div>

            </article>
          ))}
        </div>

      </div>

      <style>{`
        .patents-section {
          position: relative;
          padding: var(--space-16) 0;
          z-index: var(--z-content);
          border-top: 1px solid var(--border-subtle);
        }

        .section-head {
          margin-bottom: var(--space-12);
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

        .patents-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-6);
        }

        .patent-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: var(--space-8);
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          transition: border-color var(--transition-fast), transform var(--transition-fast);
          position: relative;
        }

        .patent-card:hover {
          border-color: var(--border-prominent);
          transform: translateY(-2px);
        }

        .patent-card-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-4);
        }

        .patent-badges {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .jurisdiction-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          padding: 3px 8px;
          background: var(--bg-primary);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          border-radius: var(--radius-sm);
        }

        .status-badge {
          font-size: 0.75rem;
          padding: 3px 8px;
          background: var(--accent-subtle);
          color: var(--accent-primary);
          border: 1px solid var(--border-accent);
          border-radius: var(--radius-sm);
          font-weight: 600;
        }

        .inkan-stamp {
          width: 30px;
          height: 30px;
          background: var(--accent-primary);
          color: #FFF;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-sm);
          font-family: serif;
          font-weight: 900;
          font-size: 1rem;
          box-shadow: var(--shadow-accent);
        }

        .ip-stamp {
          padding: 2px 6px;
          border: 1px solid var(--accent-primary);
          font-size: 0.6875rem;
          color: var(--accent-primary);
          font-weight: 700;
        }

        .patent-body {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          margin-bottom: var(--space-6);
        }

        .patent-title {
          font-size: 1.375rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.3;
        }

        .patent-app-num {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8125rem;
          color: var(--text-muted);
        }

        .app-id {
          color: var(--accent-primary);
        }

        .patent-summary {
          font-size: 0.9375rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .patent-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: var(--space-4);
          border-top: 1px solid var(--border-subtle);
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .footer-meta {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .meta-icon {
          color: var(--accent-primary);
        }

        .verify-link {
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .patents-grid {
            grid-template-columns: 1fr;
          }
          .patent-card {
            padding: var(--space-6);
          }
        }
      `}</style>
    </section>
  );
};
