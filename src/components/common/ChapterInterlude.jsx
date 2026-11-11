import React from 'react';

/**
 * ChapterInterlude Component
 * Scroll-interactive Tsushima Act transition banner placed between sections.
 * Driven by CSS custom properties (--interlude-progress) updated on scroll.
 */
export const ChapterInterlude = ({ actNumber, kanji, title, subtitle }) => {
  return (
    <div className="chapter-interlude" aria-hidden="true">
      {/* Scroll-Driven Sweeping Wind Slash */}
      <svg
        className="interlude-wind-svg"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`slashGrad-${actNumber}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C83226" stopOpacity="0" />
            <stop offset="35%" stopColor="#C83226" stopOpacity="0.65" />
            <stop offset="65%" stopColor="#F5EFE6" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#F5EFE6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          className="interlude-slash-path"
          d="M -100,110 C 360,30 820,130 1540,45"
          stroke={`url(#slashGrad-${actNumber})`}
          strokeWidth="2"
          fill="none"
        />
        <path
          className="interlude-slash-sub"
          d="M -100,65 C 480,125 960,25 1540,95"
          stroke="rgba(245, 239, 230, 0.14)"
          strokeWidth="1"
          fill="none"
        />
      </svg>

      {/* Center Scroll-Reactive Act Seal & Kanji */}
      <div className="interlude-center">
        <span className="interlude-kanji">{kanji}</span>
        <div className="interlude-pill mono">
          <span className="interlude-act">ACT {actNumber}</span>
          <span className="interlude-dot">•</span>
          <span className="interlude-title">{title}</span>
        </div>
        {subtitle && <span className="interlude-sub mono">{subtitle}</span>}
      </div>

      <style>{`
        .chapter-interlude {
          position: relative;
          height: clamp(140px, 20vh, 200px);
          width: 100%;
          background: #0A0B0E;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          z-index: 5;
          user-select: none;
          pointer-events: none;
        }

        .interlude-wind-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          transform: translate3d(var(--wind-shift, 0px), 0, 0);
          transition: transform 80ms linear;
        }

        .interlude-center {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          transform: translate3d(0, var(--interlude-y, 0px), 0) scale(var(--interlude-scale, 1));
          transition: transform 80ms linear;
        }

        .interlude-kanji {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) translateX(var(--kanji-shift, 0px));
          font-family: var(--font-heading);
          font-size: clamp(4.5rem, 8vw, 7rem);
          font-weight: 800;
          color: rgba(245, 239, 230, 0.05);
          white-space: nowrap;
          letter-spacing: 0.18em;
          pointer-events: none;
        }

        .interlude-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 6px 18px;
          background: rgba(18, 20, 28, 0.85);
          border: 1px solid rgba(200, 50, 38, 0.45);
          border-radius: 999px;
          box-shadow: 0 0 28px rgba(200, 50, 38, 0.22);
          font-size: 0.75rem;
          letter-spacing: 0.2em;
        }

        .interlude-act {
          color: var(--accent-primary);
          font-weight: 700;
        }

        .interlude-dot {
          color: var(--text-muted);
        }

        .interlude-title {
          color: var(--text-primary);
          font-weight: 700;
        }

        .interlude-sub {
          font-size: 0.625rem;
          color: var(--text-muted);
          letter-spacing: 0.24em;
          text-align: center;
          padding: 0 16px;
        }

        @media (max-width: 640px) {
          .chapter-interlude {
            height: clamp(108px, 14vh, 140px);
          }

          .interlude-kanji {
            font-size: clamp(2.35rem, 11vw, 3.8rem);
            letter-spacing: 0.1em;
          }

          .interlude-pill {
            gap: 7px;
            padding: 5px 14px;
            font-size: 0.65rem;
            letter-spacing: 0.12em;
            max-width: 92vw;
          }

          .interlude-sub {
            font-size: 0.5625rem;
            letter-spacing: 0.12em;
            line-height: 1.45;
            max-width: 90vw;
          }
        }
      `}</style>
    </div>
  );
};

export default ChapterInterlude;
