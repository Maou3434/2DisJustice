import React, { useState } from 'react';
import resumeData from '../../../data/resume_data.json';
import { ShieldCheck, FileCheck2, ZoomIn, X } from 'lucide-react';
import { SceneBackdrop } from '../common/SceneBackdrop.jsx';

export const PatentExhibition = () => {
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

  return (
    <section id="patents" className="scene-section patents-section">
      {/* Dedicated Windswept Pampas Meadow Backdrop */}
      <SceneBackdrop
        image="/images/cinematic_pampas.png"
        position="center 30%"
        opacity={0.82}
        overlayDarkness={0.8}
      />

      <div className="container scene-content patents-content">
        
        {/* Editorial Scene Header */}
        <div className="scene-head-editorial">
          <div className="scene-head-top">
            <div className="scene-head-left">
              <span className="scene-eyebrow">04 / INTELLECTUAL PROPERTY</span>
              <h2 className="scene-title-editorial">
                Published Inventions &amp; Patents
              </h2>
            </div>
            <p className="scene-head-right-subtext">
              FORMAL PATENT SPECIFICATIONS PUBLISHED IN THE GAZETTE OF THE PATENT OFFICE OF INDIA (IP INDIA) VALIDATING NOVEL ALGORITHMIC &amp; EMBEDDED SYSTEMS.
            </p>
          </div>
          <div className="scene-divider-rule" />
        </div>

        {/* 2-Column Symmetrical Patent Exhibition Grid */}
        <div className="patents-grid-editorial">
          {resumeData.patents.map((patent) => {
            const drawing = getPatentDrawing(patent.application_number);

            return (
              <article key={patent.application_number} className="patent-column-item">
                
                {/* Visual Patent Drawing Blueprint Frame */}
                <div
                  className="patent-blueprint-frame"
                  onClick={() => setZoomedImage(drawing)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Zoom patent drawing for ${patent.title}`}
                >
                  <div className="blueprint-top-bar mono">
                    <span className="blueprint-tag">IP INDIA · OFFICIAL DRAWING</span>
                    <span className="blueprint-app mono">#{patent.application_number}</span>
                  </div>

                  <div className="blueprint-media-wrap">
                    <img
                      src={drawing.src}
                      alt={drawing.alt}
                      className="blueprint-img"
                      loading="lazy"
                    />
                    <div className="blueprint-hover-overlay mono">
                      <ZoomIn size={14} />
                      <span>EXPAND BLUEPRINT</span>
                    </div>
                  </div>

                  <div className="blueprint-caption-bar mono">
                    {drawing.caption}
                  </div>
                </div>

                {/* Patent Editorial Body */}
                <div className="patent-editorial-body">
                  <div className="patent-badge-row">
                    <span className="patent-jurisdiction-pill mono">
                      <ShieldCheck size={13} />
                      <span>{patent.jurisdiction}</span>
                    </span>
                    <span className="patent-status-pill mono">
                      {patent.status}
                    </span>
                    <span className="patent-seal-monogram mono">PAT</span>
                  </div>

                  <h3 className="patent-title-editorial">{patent.title}</h3>

                  <div className="patent-app-line mono">
                    <span className="app-label">Application Number:</span>
                    <strong className="app-val">{patent.application_number}</strong>
                  </div>

                  <p className="patent-summary-text">{patent.summary}</p>

                  <div className="patent-footer-verify mono">
                    <FileCheck2 size={14} className="verify-icon" />
                    <span>Official Patent Office Gazette Publication Verified</span>
                  </div>
                </div>

              </article>
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
          <div className="drawing-lightbox-card" onClick={(e) => e.stopPropagation()}>
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
          background-color: #0A0B0E;
        }

        .patents-content {
          padding-top: clamp(1rem, 2.5vh, 2rem);
          padding-bottom: clamp(1rem, 2.5vh, 2rem);
        }

        .patents-grid-editorial {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(1.5rem, 3.5vw, 3rem);
          margin-top: clamp(0.75rem, 2vh, 1.5rem);
        }

        .patent-column-item {
          display: flex;
          flex-direction: column;
          gap: clamp(0.75rem, 1.8vh, 1.25rem);
        }

        /* Technical Blueprint Frame */
        .patent-blueprint-frame {
          background: rgba(8, 10, 15, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: var(--radius-sm);
          overflow: hidden;
          cursor: pointer;
          transition: border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
        }

        .patent-blueprint-frame:hover {
          border-color: #D4AF37;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.7), 0 0 20px rgba(212, 175, 55, 0.2);
          transform: translateY(-2px);
        }

        .blueprint-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 12px;
          background: rgba(14, 17, 24, 0.95);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.6875rem;
        }

        .blueprint-tag {
          color: #F59E0B;
          letter-spacing: 0.05em;
        }

        .blueprint-app {
          color: #9CA3AF;
        }

        .blueprint-media-wrap {
          position: relative;
          width: 100%;
          height: clamp(140px, 18vh, 185px);
          background: #040507;
          overflow: hidden;
        }

        .blueprint-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 400ms ease;
          opacity: 0.9;
        }

        .patent-blueprint-frame:hover .blueprint-img {
          transform: scale(1.03);
          opacity: 1;
        }

        .blueprint-hover-overlay {
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

        .patent-blueprint-frame:hover .blueprint-hover-overlay {
          opacity: 1;
        }

        .blueprint-caption-bar {
          padding: 6px 12px;
          background: rgba(12, 15, 22, 0.95);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.625rem;
          letter-spacing: 0.06em;
          color: #9CA3AF;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Editorial Body */
        .patent-editorial-body {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .patent-badge-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .patent-jurisdiction-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.6875rem;
          color: #94A3B8;
          border: 1px solid rgba(148, 163, 184, 0.25);
          background: rgba(148, 163, 184, 0.06);
          padding: 2px 8px;
          border-radius: var(--radius-sm);
        }

        .patent-status-pill {
          font-size: 0.6875rem;
          font-weight: 700;
          color: #10B981;
          border: 1px solid rgba(16, 185, 129, 0.35);
          background: rgba(16, 185, 129, 0.08);
          padding: 2px 8px;
          border-radius: var(--radius-sm);
        }

        .patent-seal-monogram {
          margin-left: auto;
          font-size: 0.625rem;
          font-weight: 700;
          color: #FFFFFF;
          background: #C83226;
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          box-shadow: 0 0 10px rgba(200, 50, 38, 0.4);
        }

        .patent-title-editorial {
          font-family: var(--font-body);
          font-size: clamp(1.2rem, 1.7vw, 1.55rem);
          font-weight: 700;
          color: #FFFFFF;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }

        .patent-app-line {
          font-size: 0.75rem;
          color: #9CA3AF;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .app-val {
          color: #F59E0B;
        }

        .patent-summary-text {
          font-size: clamp(0.75rem, 0.95vw, 0.85rem);
          line-height: 1.55;
          color: #D1D5DB;
        }

        .patent-footer-verify {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.6875rem;
          color: #6B7280;
          margin-top: 4px;
        }

        .verify-icon {
          color: #10B981;
        }

        /* Lightbox Modal */
        .drawing-lightbox-backdrop {
          position: fixed;
          inset: 0;
          z-index: var(--z-modal);
          background: rgba(4, 5, 8, 0.92);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-8);
        }

        .drawing-lightbox-card {
          background: #0A0B0E;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: var(--radius-sm);
          max-width: 90vw;
          max-height: 88vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.9);
        }

        .lightbox-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 18px;
          background: #101218;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .lightbox-title {
          font-size: 0.75rem;
          color: #D4AF37;
          letter-spacing: 0.08em;
        }

        .lightbox-close-btn {
          color: #9CA3AF;
          transition: color 150ms ease;
        }

        .lightbox-close-btn:hover {
          color: #FFFFFF;
        }

        .lightbox-img {
          max-width: 100%;
          max-height: 78vh;
          object-fit: contain;
          background: #050608;
        }

        @media (max-width: 768px) {
          .patents-grid-editorial {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
      `}</style>
    </section>
  );
};

export default PatentExhibition;
