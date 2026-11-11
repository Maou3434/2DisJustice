import React, { useState } from 'react';
import resumeData from '../../../data/resume_data.json';
import { ArrowUpRight, ZoomIn, X, CheckCircle2 } from 'lucide-react';
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
      {/* Dedicated Windswept Pampas Meadow Backdrop */}
      <SceneBackdrop
        image="/images/cinematic_pampas.png"
        position="center 30%"
        opacity={0.78}
        overlayDarkness={0.84}
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

        {/* Guided Full-Width Horizontal Showcase Rows (Left Narrative -> Right Blueprint) */}
        <div className="patents-rows-flow">
          {resumeData.patents.map((patent, idx) => {
            const drawing = getPatentDrawing(patent.application_number);

            return (
              <article
                key={patent.application_number}
                className={`patent-showcase-row reveal-item reveal-delay-${idx + 1}`}
              >
                {/* Left Column: Consistent Eye-Tracking Narrative */}
                <div className="patent-editorial-body">
                  <div className="patent-meta-line mono">
                    <span className="patent-app-id">0{idx + 1} // IP INDIA #{patent.application_number}</span>
                    <span>•</span>
                    <span>{patent.status.toUpperCase()} ({patent.filing_year || '2026'})</span>
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

                {/* Right Column: Large Orthographic Patent Blueprint */}
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
                  <div className="blueprint-media-wrap">
                    <img
                      src={drawing.src}
                      alt={drawing.alt}
                      className="blueprint-img"
                      loading="lazy"
                    />
                    <div className="blueprint-hover-overlay mono">
                      <ZoomIn size={16} />
                      <span>INSPECT SPECIFICATION &amp; CLAIMS</span>
                    </div>
                  </div>
                  <div className="blueprint-caption-bar mono">
                    {drawing.caption}
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

        .patents-rows-flow {
          display: flex;
          flex-direction: column;
        }

        .patent-showcase-row {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: clamp(2.5rem, 5vw, 4.75rem);
          align-items: center;
          padding: clamp(3.25rem, 6.5vh, 5rem) 0;
          border-bottom: 1px solid var(--border-subtle);
        }

        .patent-showcase-row:first-child {
          padding-top: 0.5rem;
        }

        .patent-editorial-body {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .patent-meta-line {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          font-size: 0.75rem;
          letter-spacing: 0.14em;
          color: var(--text-muted);
        }

        .patent-app-id {
          color: var(--accent-primary);
          font-weight: 700;
        }

        .patent-title-editorial {
          font-family: var(--font-heading);
          font-size: clamp(1.65rem, 2.3vw, 2.2rem);
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.22;
          letter-spacing: -0.015em;
        }

        .patent-summary-text {
          font-size: clamp(1.05rem, 1.15vw, 1.125rem);
          line-height: 1.82;
          color: var(--text-secondary);
          max-width: 58ch;
        }

        .patent-action-row {
          margin-top: 6px;
        }

        .patent-inspect-btn {
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

        .patent-inspect-btn:hover {
          color: var(--accent-primary);
        }

        .patent-blueprint-frame {
          background: rgba(8, 10, 15, 0.90);
          border: 1px solid var(--border-prominent);
          border-radius: var(--radius-sm);
          overflow: hidden;
          cursor: pointer;
          transition: border-color 240ms ease, box-shadow 240ms ease, transform 240ms ease;
        }

        .patent-blueprint-frame:hover {
          border-color: var(--accent-primary);
          box-shadow: var(--shadow-prominent);
          transform: translateY(-4px);
        }

        .blueprint-media-wrap {
          position: relative;
          width: 100%;
          height: clamp(230px, 28vh, 295px);
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

        .patent-blueprint-frame:hover .blueprint-img {
          transform: scale(1.025);
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
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          opacity: 0;
          transition: opacity 220ms ease;
        }

        .patent-blueprint-frame:hover .blueprint-hover-overlay {
          opacity: 1;
        }

        .blueprint-caption-bar {
          padding: 12px 18px;
          background: rgba(12, 15, 22, 0.96);
          border-top: 1px solid var(--border-subtle);
          font-size: 0.6875rem;
          letter-spacing: 0.08em;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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
          .patent-showcase-row {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }
      `}</style>
    </section>
  );
};

export default PatentExhibition;
