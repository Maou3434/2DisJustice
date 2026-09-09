import React, { useState } from 'react';
import resumeData from '../../../data/resume_data.json';
import { Award, ShieldCheck, FileCheck2, ExternalLink, ZoomIn, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';
import { ParallaxLayer } from '../parallax/ParallaxLayer.jsx';

export const PatentExhibition = () => {
  const { theme } = useTheme();
  const isTsushima = theme === 'tsushima';
  const [zoomedImage, setZoomedImage] = useState(null);

  React.useEffect(() => {
    if (!zoomedImage) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setZoomedImage(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [zoomedImage]);

  const getPatentDrawing = (appNum) => {
    if (appNum === '202641027735') {
      return {
        src: '/images/patent-garment-colour.jpg',
        alt: 'Patent Drawing: Garment Colour Matching System (FIG. 1)',
        caption: 'OFFICIAL PATENT DRAWING · FIG. 1: SPECTRAL SENSOR ILLUMINATION CHAMBER'
      };
    }
    return {
      src: '/images/patent-physiological-iot.jpg',
      alt: 'Patent Drawing: Closed-Loop Physiological Monitoring System (FIG. 1-4)',
      caption: 'OFFICIAL PATENT DRAWING · FIG. 1-4: SYSTEM ARCHITECTURE & EDGE BIOFEEDBACK LOOP'
    };
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
    <section id="patents" className="patents-section">
      {/* Localized Section Watermark (Guaranteed Zero Global Drift) */}
      <div className="section-backdrop-watermark" aria-hidden="true">
        <div className="watermark-kanji-wrap">
          <span className="wm-kanji">{isTsushima ? '特許' : 'PATENTS'}</span>
          <span className="wm-num mono">04</span>
        </div>
        <div className="wm-equation mono">
          {isTsushima ? 'IN 202641027735 · Spectral CIELAB Matching System' : 'IP.REGISTRY // IN_202641027735_CIELAB'}
        </div>
      </div>

      <div className="container">
        
        {/* Section Header */}
        <div className="section-head">
          <div className="section-tag">
            <span className="mono">{isTsushima ? '// IP REGISTRY · 2 PUBLISHED SPECIFICATIONS' : '// INTELLECTUAL_PROPERTY.REGISTRY // 2_PATENTS'}</span>
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
          {resumeData.patents.map((patent, idx) => {
            const drawing = getPatentDrawing(patent.application_number);

            return (
              <ParallaxLayer
                key={patent.application_number}
                speed={idx === 0 ? 0.98 : 1.02}
                mouseFactor={10}
                className="patent-parallax-wrap"
              >
                <article
                  className="patent-card"
                  onMouseMove={handleCardMouseMove}
                  onMouseEnter={handleCardMouseEnter}
                  onMouseLeave={handleCardMouseLeave}
                >
                
                {/* Embedded Patent Drawing Banner */}
                <div
                  className="patent-drawing-frame"
                  onClick={() => setZoomedImage(drawing)}
                  role="button"
                  tabIndex={0}
                  title="Click to zoom patent blueprint"
                >
                  <img
                    src={drawing.src}
                    alt={drawing.alt}
                    className="patent-drawing-img"
                    loading="lazy"
                  />
                  <div className="drawing-overlay">
                    <span className="drawing-caption mono">{drawing.caption}</span>
                    <span className="drawing-zoom mono">
                      <ZoomIn size={14} />
                      <span>Expand Blueprint</span>
                    </span>
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="patent-card-body">
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
                      <span>Official Patent Gazette Publication</span>
                    </div>
                    <span className="verify-link mono">
                      IP India Registry Verified
                    </span>
                  </div>
                </div>

              </article>
            </ParallaxLayer>
          );
        })}
        </div>

      </div>

      {/* Lightbox / Zoom Modal */}
      {zoomedImage && (
        <div 
          className="drawing-lightbox-backdrop" 
          onClick={() => setZoomedImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="drawing-lightbox-card" onClick={e => e.stopPropagation()}>
            <div className="lightbox-header">
              <span className="mono lightbox-title">{zoomedImage.caption}</span>
              <button onClick={() => setZoomedImage(null)} className="lightbox-close-btn" aria-label="Close">
                <X size={20} />
              </button>
            </div>
            <img src={zoomedImage.src} alt={zoomedImage.alt} className="lightbox-img" />
          </div>
        </div>
      )}

      <style>{`
        .patents-section {
          position: relative;
          padding: var(--space-20) 0;
          z-index: var(--z-content);
          border-top: 1px solid var(--border-subtle);
          overflow: hidden;
        }

        .section-backdrop-watermark {
          position: absolute;
          top: 5%;
          right: 3%;
          pointer-events: none;
          opacity: 0.12;
          z-index: 0;
          user-select: none;
          text-align: right;
        }

        .watermark-kanji-wrap {
          display: flex;
          align-items: baseline;
          justify-content: flex-end;
          gap: 16px;
        }

        .wm-kanji {
          font-family: var(--font-display);
          font-size: clamp(4.5rem, 9vw, 8.5rem);
          font-weight: 900;
          color: var(--text-muted);
          line-height: 0.85;
          letter-spacing: -0.02em;
        }

        .wm-num {
          font-size: clamp(3rem, 6vw, 5.5rem);
          font-weight: 800;
          color: var(--accent-primary);
          opacity: 0.85;
          line-height: 0.85;
        }

        .wm-equation {
          font-size: 0.75rem;
          letter-spacing: 0.18em;
          color: var(--text-secondary);
          margin-top: 8px;
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
          gap: var(--space-8);
        }

        .patent-card {
          display: flex;
          flex-direction: column;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          overflow: hidden;
          transform-style: preserve-3d;
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        }

        .patent-card:hover {
          border-color: var(--accent-primary);
          box-shadow: var(--shadow-prominent), 0 0 35px rgba(200, 50, 38, 0.15);
        }

        /* Patent Blueprint Frame with 3D Float */
        .patent-drawing-frame {
          position: relative;
          width: 100%;
          height: 260px;
          background: #060912;
          border-bottom: 1px solid var(--border-subtle);
          overflow: hidden;
          cursor: pointer;
          transform: translateZ(26px);
        }

        .patent-body {
          transform: translateZ(36px);
        }

        .patent-drawing-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 500ms ease;
        }

        .patent-drawing-frame:hover .patent-drawing-img {
          transform: scale(1.03);
        }

        .drawing-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(8, 10, 16, 0.92) 0%, rgba(8, 10, 16, 0.4) 40%, transparent 70%);
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 12px;
          padding: var(--space-3) var(--space-4);
          flex-wrap: wrap;
        }

        .drawing-caption {
          font-size: 0.6875rem;
          color: var(--text-muted);
          max-width: calc(100% - 140px);
          line-height: 1.35;
        }

        .drawing-zoom {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.6875rem;
          color: var(--accent-primary);
          background: rgba(10, 12, 18, 0.85);
          padding: 4px 8px;
          border: 1px solid var(--border-prominent);
          border-radius: var(--radius-sm);
          flex-shrink: 0;
          margin-left: auto;
        }

        /* Card Content Area */
        .patent-card-body {
          padding: var(--space-6) var(--space-8) var(--space-8);
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
          flex: 1;
        }

        .patent-card-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
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
          gap: var(--space-2);
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
          margin-top: 4px;
        }

        .patent-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: var(--space-4);
          border-top: 1px solid var(--border-subtle);
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: auto;
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

        /* Lightbox Modal */
        .drawing-lightbox-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.88);
          backdrop-filter: blur(14px);
          z-index: var(--z-modal);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-6);
        }

        .drawing-lightbox-card {
          width: 100%;
          max-width: 1000px;
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-prominent);
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-prominent);
        }

        .lightbox-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 20px;
          background: var(--bg-primary);
          border-bottom: 1px solid var(--border-subtle);
        }

        .lightbox-title {
          font-size: 0.75rem;
          color: var(--accent-primary);
        }

        .lightbox-close-btn {
          color: var(--text-muted);
          transition: color var(--transition-fast);
        }

        .lightbox-close-btn:hover {
          color: var(--text-primary);
        }

        .lightbox-img {
          width: 100%;
          height: auto;
          display: block;
        }

        @media (max-width: 860px) {
          .patents-grid {
            grid-template-columns: 1fr;
          }
          .patent-drawing-frame {
            height: 200px;
          }
          .patent-card-body {
            padding: var(--space-5);
          }
        }
      `}</style>
    </section>
  );
};
