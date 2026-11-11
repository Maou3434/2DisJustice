import React, { useState } from 'react';
import resumeData from '../../../data/resume_data.json';
import { ArrowUpRight, ZoomIn, X, CheckCircle2, ShieldCheck } from 'lucide-react';
import { SceneBackdrop } from '../common/SceneBackdrop.jsx';

export const PatentExhibition = () => {
  const [selectedPatent, setSelectedPatent] = useState(null);

  React.useEffect(() => {
    if (!selectedPatent) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedPatent(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedPatent]);

  const getPatentDrawing = (appNum) => {
    if (appNum === '202641027735') {
      return {
        src: '/images/patent-cvd-colour.svg',
        alt: 'Patent Specification Schematic: Garment Colour Matching System for Colour Vision Deficiency (FIG. 1-3)',
        caption: 'IP INDIA #202641027735 · CVD CONE PROFILING, CIELAB SEGMENTATION & FUZZY-LOGIC HARMONY'
      };
    }
    return {
      src: '/images/patent-physiological-control.svg',
      alt: 'Patent Specification Schematic: Hardware-Integrated Closed-Loop Physiological Control Apparatus (FIG. 1-4)',
      caption: 'IP INDIA #202641068237 · HARDWARE COMPARATOR INTERRUPT & ADAPTIVE EDGE BIOFEEDBACK'
    };
  };

  return (
    <section id="patents" className="scene-section patents-section">
      {/* Vivid Windswept Golden Pampas Meadow Backdrop */}
      <SceneBackdrop
        image="/images/cinematic_pampas.png"
        position="center 30%"
        opacity={0.92}
        overlayDarkness={0.44}
      />

      {/* Restrained Chapter Number Watermark */}
      <div className="section-backdrop-watermark" aria-hidden="true">
        <span className="wm-number">04</span>
      </div>

      <div className="container scene-content patents-content">
        
        {/* Clean Editorial Scene Header */}
        <div className="scene-head-editorial">
          <div className="scene-head-top">
            <div className="scene-head-left">
              <span className="scene-eyebrow">04 // INTELLECTUAL PROPERTY</span>
              <h2 className="scene-title-editorial">Published Patents</h2>
            </div>
          </div>
          <div className="scene-divider-rule" />
        </div>

        {/* 2 Side-by-Side Frosted Orthographic Blueprint Vault Cards */}
        <div className="patents-vault-grid">
          {resumeData.patents.map((patent, idx) => {
            const drawing = getPatentDrawing(patent.application_number);

            return (
              <article
                key={patent.application_number}
                className={`patent-vault-card reveal-item reveal-delay-${idx + 1}`}
              >
                {/* Top Blueprint Frame */}
                <div
                  className="patent-blueprint-frame"
                  onClick={() => setSelectedPatent({ patent, drawing })}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedPatent({ patent, drawing });
                    }
                  }}
                  aria-label={`Inspect patent specification for ${patent.title}`}
                >
                  <div className="blueprint-top-bar mono">
                    <span className="blueprint-status">
                      <ShieldCheck size={13} />
                      <span>IP INDIA GAZETTE · {patent.status.toUpperCase()}</span>
                    </span>
                    <span className="blueprint-app-num">#{patent.application_number}</span>
                  </div>

                  <div className="blueprint-media-wrap">
                    <img
                      src={drawing.src}
                      alt={drawing.alt}
                      className="blueprint-img"
                      loading="lazy"
                    />
                    <div className="blueprint-hover-overlay mono">
                      <ZoomIn size={16} />
                      <span>INSPECT BLUEPRINT &amp; CLAIMS</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Frosted Narrative Body */}
                <div className="patent-card-body">
                  <div className="patent-seal-row mono">
                    <span className="patent-year-badge">FILED &amp; PUBLISHED · {patent.filing_year || '2026'}</span>
                    <span className="patent-hanko-stamp">特許 // 0{idx + 1}</span>
                  </div>

                  <h3 className="patent-title-editorial">{patent.title}</h3>

                  <p className="patent-summary-text">{patent.summary}</p>

                  <div className="patent-action-row">
                    <button
                      onClick={() => setSelectedPatent({ patent, drawing })}
                      className="patent-inspect-btn mono"
                    >
                      <span>READ TECHNICAL CLAIMS</span>
                      <ArrowUpRight size={15} />
                    </button>
                  </div>
                </div>

              </article>
            );
          })}
        </div>

      </div>

      {/* Progressive Disclosure: Full Patent Specification & Claims Modal */}
      {selectedPatent && (
        <div
          className="drawing-lightbox-backdrop"
          onClick={() => setSelectedPatent(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="drawing-lightbox-card" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-header">
              <div>
                <span className="mono lightbox-eyebrow">{selectedPatent.drawing.caption}</span>
                <h3 className="lightbox-heading">{selectedPatent.patent.title}</h3>
              </div>
              <button onClick={() => setSelectedPatent(null)} className="lightbox-close-btn" aria-label="Close">
                <X size={20} />
              </button>
            </div>

            <div className="lightbox-body">
              <img
                src={selectedPatent.drawing.src}
                alt={selectedPatent.drawing.alt}
                className="lightbox-img"
              />

              {selectedPatent.patent.claims && (
                <div className="lightbox-claims-block">
                  <h4 className="claims-heading mono">KEY TECHNICAL CLAIMS &amp; ARCHITECTURE</h4>
                  <ul className="claims-list">
                    {selectedPatent.patent.claims.map((claim, cIdx) => (
                      <li key={cIdx} className="claim-row">
                        <CheckCircle2 size={15} className="claim-icon" />
                        <span>{claim}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .patents-section {
          background-color: var(--bg-primary);
        }

        .patents-vault-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(2rem, 3.5vw, 3rem);
        }

        .patent-vault-card {
          background: rgba(10, 12, 18, 0.78);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(245, 239, 230, 0.16);
          border-radius: var(--radius-md);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
          transition: transform 280ms cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 280ms ease,
                      box-shadow 280ms ease;
        }

        .patent-vault-card:hover {
          transform: translateY(-6px);
          border-color: rgba(200, 50, 38, 0.6);
          box-shadow: 0 24px 56px rgba(0, 0, 0, 0.75), 0 0 28px rgba(200, 50, 38, 0.2);
        }

        .patent-blueprint-frame {
          cursor: pointer;
          border-bottom: 1px solid var(--border-subtle);
        }

        .blueprint-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 18px;
          background: rgba(16, 19, 28, 0.94);
          border-bottom: 1px solid var(--border-subtle);
          font-size: 0.6875rem;
        }

        .blueprint-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--accent-primary);
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        .blueprint-app-num {
          color: var(--text-primary);
          font-weight: 700;
          letter-spacing: 0.06em;
        }

        .blueprint-media-wrap {
          position: relative;
          width: 100%;
          height: clamp(220px, 26vh, 275px);
          background: #07090E;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
        }

        .blueprint-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          transition: transform 450ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .patent-vault-card:hover .blueprint-img {
          transform: scale(1.03);
        }

        .blueprint-hover-overlay {
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
          letter-spacing: 0.12em;
          opacity: 0;
          transition: opacity 220ms ease;
        }

        .patent-blueprint-frame:hover .blueprint-hover-overlay {
          opacity: 1;
        }

        .patent-card-body {
          padding: clamp(1.75rem, 3vw, 2.25rem);
          display: flex;
          flex-direction: column;
          gap: 14px;
          flex: 1;
        }

        .patent-seal-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.6875rem;
        }

        .patent-year-badge {
          color: var(--text-muted);
          letter-spacing: 0.12em;
        }

        .patent-hanko-stamp {
          padding: 2px 10px;
          background: rgba(200, 50, 38, 0.18);
          border: 1px solid var(--border-accent);
          color: var(--accent-primary);
          font-weight: 700;
          border-radius: var(--radius-sm);
        }

        .patent-title-editorial {
          font-family: var(--font-heading);
          font-size: clamp(1.4rem, 1.9vw, 1.75rem);
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.24;
        }

        .patent-summary-text {
          font-size: 1.025rem;
          line-height: 1.78;
          color: var(--text-secondary);
          flex: 1;
        }

        .patent-action-row {
          margin-top: 8px;
          padding-top: 14px;
          border-top: 1px solid rgba(245, 239, 230, 0.08);
        }

        .patent-inspect-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--text-primary);
          transition: color 180ms ease;
        }

        .patent-inspect-btn:hover {
          color: var(--accent-primary);
        }

        /* Lightbox Modal */
        .drawing-lightbox-backdrop {
          position: fixed;
          inset: 0;
          z-index: var(--z-modal);
          background: rgba(6, 7, 10, 0.90);
          backdrop-filter: blur(16px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-6);
        }

        .drawing-lightbox-card {
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-prominent);
          border-radius: var(--radius-md);
          width: 100%;
          max-width: 960px;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          box-shadow: var(--shadow-prominent);
        }

        .lightbox-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          padding: 18px 24px;
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border-subtle);
        }

        .lightbox-eyebrow {
          font-size: 0.6875rem;
          color: var(--accent-primary);
          font-weight: 700;
          letter-spacing: 0.08em;
          display: block;
        }

        .lightbox-heading {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          color: var(--text-primary);
          margin-top: 4px;
        }

        .lightbox-close-btn {
          color: var(--text-secondary);
          padding: 6px;
        }

        .lightbox-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .lightbox-img {
          width: 100%;
          max-height: 460px;
          object-fit: contain;
          background: #07090E;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
        }

        .lightbox-claims-block {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .claims-heading {
          font-size: 0.75rem;
          color: var(--accent-primary);
          letter-spacing: 0.1em;
        }

        .claims-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .claim-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.95rem;
          line-height: 1.65;
          color: var(--text-secondary);
        }

        .claim-icon {
          color: var(--accent-primary);
          margin-top: 3px;
          flex-shrink: 0;
        }

        @media (max-width: 900px) {
          .patents-vault-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .blueprint-top-bar {
            padding: 10px 12px;
            font-size: 0.625rem;
            flex-wrap: wrap;
            gap: 6px;
          }

          .blueprint-media-wrap {
            height: clamp(180px, 24vh, 220px);
          }

          .patent-card-body {
            padding: 1.35rem 1.15rem;
            gap: 12px;
          }

          .patent-seal-row {
            flex-wrap: wrap;
            gap: 8px;
          }

          .patent-title-editorial {
            font-size: 1.3rem;
          }

          .patent-summary-text {
            font-size: 0.95rem;
            line-height: 1.68;
          }

          .drawing-lightbox-backdrop {
            padding: 10px;
          }

          .drawing-lightbox-card {
            max-height: 90dvh;
          }

          .lightbox-header {
            padding: 14px 16px;
          }

          .lightbox-heading {
            font-size: 1.15rem;
          }

          .lightbox-body {
            padding: 16px;
            gap: 16px;
          }
        }
      `}</style>
    </section>
  );
};

export default PatentExhibition;
