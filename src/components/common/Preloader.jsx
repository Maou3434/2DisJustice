import React, { useEffect, useState } from 'react';

const CRITICAL_ASSETS = [
  '/images/cinematic_maple.png',
  '/images/momiji-leaf-red.png',
  '/images/momiji-leaf-gold.png',
  '/images/cinematic_sea.png',
  '/images/retailsink-architecture.svg',
  '/images/frame-order-tsp.svg'
];

export const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusLabel, setStatusLabel] = useState('INITIALIZING ENVIRONMENT...');
  const [isExiting, setIsExiting] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    let rafId = null;

    // Lock scroll while loading
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    let loadedCount = 0;
    const totalTasks = CRITICAL_ASSETS.length + 1; // +1 for fonts
    let assetRatio = 0;

    const markTaskComplete = (label) => {
      if (isCancelled) return;
      loadedCount += 1;
      assetRatio = Math.min(1, loadedCount / totalTasks);
      if (label) setStatusLabel(label);
    };

    // 1. Preload Fonts
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready
        .then(() => markTaskComplete('TYPOGRAPHY LOADED'))
        .catch(() => markTaskComplete());
    } else {
      markTaskComplete();
    }

    // 2. Preload Critical Images & 3D Leaf Textures
    CRITICAL_ASSETS.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        if (src.includes('momiji')) {
          markTaskComplete('PREPARING 3D WIND & LEAF ENGINE...');
        } else if (src.includes('cinematic')) {
          markTaskComplete('LOADING ATMOSPHERIC BACKDROPS...');
        } else {
          markTaskComplete('MOUNTING ARCHITECTURE SCHEMATICS...');
        }
      };
      img.onerror = () => markTaskComplete();
      img.src = src;
    });

    const startTime = performance.now();
    const minDuration = 1250; // Smooth minimum display time
    const maxTimeout = 3800;  // Safety fallback so user is never stuck

    const tick = (now) => {
      if (isCancelled) return;
      const elapsed = now - startTime;
      const timeRatio = Math.min(1, elapsed / minDuration);

      // Blend time curve with real asset completion
      const effectiveAssetRatio = elapsed > maxTimeout ? 1 : Math.max(assetRatio, timeRatio * 0.45);
      const combined = Math.min(1, timeRatio * 0.4 + effectiveAssetRatio * 0.6);
      const displayPct = Math.round(combined * 100);

      setProgress(displayPct);

      if ((combined >= 0.99 && assetRatio >= 0.85 && timeRatio >= 1) || elapsed > maxTimeout) {
        setProgress(100);
        setStatusLabel('READY');
        setIsExiting(true);
        document.body.style.overflow = originalOverflow;

        setTimeout(() => {
          if (!isCancelled) {
            setIsUnmounted(true);
            if (onComplete) onComplete();
          }
        }, 750);
      } else {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      isCancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      document.body.style.overflow = originalOverflow;
    };
  }, [onComplete]);

  if (isUnmounted) return null;

  return (
    <div
      className={`ceremonial-preloader ${isExiting ? 'is-exiting' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="preloader-inner">
        {/* Spinning Orbital Ring + Cinnabar Hanko Seal */}
        <div className="preloader-emblem-wrap">
          <div className="preloader-spinner-ring" aria-hidden="true" />
          <div className="preloader-hanko">
            <span className="hanko-kanji">印</span>
            <span className="hanko-initials mono">AJ</span>
          </div>
        </div>

        {/* Title & Status */}
        <div className="preloader-meta">
          <span className="preloader-name">Abimanyu Jayaganesh</span>
          <span className="preloader-status mono">{statusLabel}</span>
        </div>

        {/* Smooth Progress Bar */}
        <div className="preloader-bar-track">
          <div
            className="preloader-bar-fill"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>

        {/* Percentage Readout */}
        <div className="preloader-counter mono">
          {String(progress).padStart(3, '0')}%
        </div>
      </div>

      <style>{`
        .ceremonial-preloader {
          position: fixed;
          inset: 0;
          z-index: 10000;
          background: #08090C;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          transition: opacity 700ms cubic-bezier(0.16, 1, 0.3, 1),
                      transform 750ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .ceremonial-preloader.is-exiting {
          opacity: 0;
          transform: translateY(-4%) scale(1.02);
          pointer-events: none;
        }

        .preloader-inner {
          width: 100%;
          max-width: 360px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 22px;
        }

        .preloader-emblem-wrap {
          position: relative;
          width: 84px;
          height: 84px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .preloader-spinner-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1.5px solid rgba(245, 239, 230, 0.12);
          border-top-color: var(--accent-primary);
          border-right-color: rgba(200, 50, 38, 0.45);
          animation: preloaderRingSpin 1.1s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
        }

        @keyframes preloaderRingSpin {
          to { transform: rotate(360deg); }
        }

        .preloader-hanko {
          width: 50px;
          height: 50px;
          border: 1.5px solid var(--accent-primary);
          background: rgba(200, 50, 38, 0.12);
          border-radius: var(--radius-sm);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 28px rgba(200, 50, 38, 0.3);
        }

        .hanko-kanji {
          font-family: var(--font-heading);
          font-size: 0.65rem;
          color: var(--accent-primary);
          line-height: 1;
        }

        .hanko-initials {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: 0.08em;
          line-height: 1.15;
        }

        .preloader-meta {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          text-align: center;
        }

        .preloader-name {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: 0.02em;
        }

        .preloader-status {
          font-size: 0.6875rem;
          color: var(--text-muted);
          letter-spacing: 0.16em;
        }

        .preloader-bar-track {
          width: 100%;
          height: 2px;
          background: rgba(245, 239, 230, 0.10);
          border-radius: 2px;
          overflow: hidden;
        }

        .preloader-bar-fill {
          width: 100%;
          height: 100%;
          background: var(--accent-primary);
          transform-origin: left center;
          box-shadow: 0 0 12px var(--accent-primary);
          transition: transform 80ms linear;
        }

        .preloader-counter {
          font-size: 0.75rem;
          color: var(--accent-primary);
          font-weight: 700;
          letter-spacing: 0.14em;
        }
      `}</style>
    </div>
  );
};

export default Preloader;
