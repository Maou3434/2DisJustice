import React, { useEffect, useState } from 'react';

const CRITICAL_ASSETS = [
  '/images/cinematic_maple.png',
  '/images/momiji-leaf-red.png',
  '/images/momiji-leaf-gold.png',
  '/images/cinematic_sea.png',
  '/images/retailsink-architecture.svg',
  '/images/frame-order-tsp.svg'
];

// 14 choreographed Momiji leaves caught in cyclic wind gusts across the preloader canvas
const WIND_LEAVES = [
  { id: 1, y: '18%', size: 24, delay: '0s', duration: '2.4s', color: '#C83226', sway: 32, rot: 240 },
  { id: 2, y: '34%', size: 18, delay: '0.35s', duration: '2.1s', color: '#E09F3E', sway: -28, rot: -300 },
  { id: 3, y: '52%', size: 28, delay: '0.15s', duration: '2.6s', color: '#D63A2D', sway: 40, rot: 320 },
  { id: 4, y: '68%', size: 20, delay: '0.65s', duration: '2.2s', color: '#C83226', sway: -34, rot: 210 },
  { id: 5, y: '26%', size: 15, delay: '0.9s', duration: '1.95s', color: '#E09F3E', sway: 22, rot: -260 },
  { id: 6, y: '46%', size: 22, delay: '1.1s', duration: '2.3s', color: '#C83226', sway: -38, rot: 290 },
  { id: 7, y: '78%', size: 25, delay: '0.45s', duration: '2.5s', color: '#D63A2D', sway: 30, rot: -240 },
  { id: 8, y: '14%', size: 19, delay: '1.35s', duration: '2.15s', color: '#E09F3E', sway: -25, rot: 270 },
  { id: 9, y: '58%', size: 16, delay: '1.55s', duration: '2.0s', color: '#C83226', sway: 28, rot: -310 },
  { id: 10, y: '40%', size: 26, delay: '0.75s', duration: '2.45s', color: '#D63A2D', sway: -42, rot: 350 },
  { id: 11, y: '84%', size: 17, delay: '1.2s', duration: '2.05s', color: '#E09F3E', sway: 24, rot: -220 },
  { id: 12, y: '30%', size: 21, delay: '1.7s', duration: '2.25s', color: '#C83226', sway: -30, rot: 280 }
];

// Reusable Japanese Momiji (Maple Leaf) Vector Silhouette
const MomijiSvg = ({ color, size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ filter: `drop-shadow(0 0 8px ${color}66)` }}
  >
    <path
      d="M16 2L18.6 9.8L25.5 6.2L22.2 13.4L30 15.5L22.5 19.2L25.2 25.8L18.2 22.8L16 30L13.8 22.8L6.8 25.8L9.5 19.2L2 15.5L9.8 13.4L6.5 6.2L13.4 9.8L16 2Z"
      fill={color}
      fillOpacity="0.92"
    />
  </svg>
);

export const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusLabel, setStatusLabel] = useState('SUMMONING GUIDING WIND...');
  const [isExiting, setIsExiting] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    let rafId = null;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    let loadedCount = 0;
    const totalTasks = CRITICAL_ASSETS.length + 1;
    let assetRatio = 0;

    const markTaskComplete = (label) => {
      if (isCancelled) return;
      loadedCount += 1;
      assetRatio = Math.min(1, loadedCount / totalTasks);
      if (label) setStatusLabel(label);
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready
        .then(() => markTaskComplete('BRUSH TYPOGRAPHY READY'))
        .catch(() => markTaskComplete());
    } else {
      markTaskComplete();
    }

    CRITICAL_ASSETS.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        if (src.includes('momiji')) {
          markTaskComplete('AWAKENING MOMIJI WIND PARTICLES...');
        } else if (src.includes('cinematic')) {
          markTaskComplete('RENDERING ATMOSPHERIC HORIZONS...');
        } else {
          markTaskComplete('PREPARING ARCHITECTURE BLUEPRINTS...');
        }
      };
      img.onerror = () => markTaskComplete();
      img.src = src;
    });

    const startTime = performance.now();
    const minDuration = 1650; // Allows 1 full wind-gust & Enso brush cycle to be appreciated
    const maxTimeout = 4000;

    const tick = (now) => {
      if (isCancelled) return;
      const elapsed = now - startTime;
      const timeRatio = Math.min(1, elapsed / minDuration);

      const effectiveAssetRatio = elapsed > maxTimeout ? 1 : Math.max(assetRatio, timeRatio * 0.45);
      const combined = Math.min(1, timeRatio * 0.45 + effectiveAssetRatio * 0.55);
      const displayPct = Math.round(combined * 100);

      setProgress(displayPct);

      if ((combined >= 0.99 && assetRatio >= 0.85 && timeRatio >= 1) || elapsed > maxTimeout) {
        setProgress(100);
        setStatusLabel('ENTERING ARCHIVE');
        setIsExiting(true);
        document.body.style.overflow = originalOverflow;

        setTimeout(() => {
          if (!isCancelled) {
            setIsUnmounted(true);
            if (onComplete) onComplete();
          }
        }, 850);
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

  // Enso circle circumference for r = 64 -> 2 * pi * 64 = 402.12
  const circumference = 402.12;
  const dashOffset = circumference - (progress / 100) * circumference;
  // Angle in degrees for the orbiting leaf on the Enso rim
  const orbitAngle = (progress / 100) * 360 - 90;

  return (
    <div
      className={`tsushima-wind-preloader ${isExiting ? 'is-gust-exiting' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      {/* Layer 1: Sweeping Calligraphic Guiding Wind Streams (SVG) */}
      <svg
        className="wind-streams-svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="windGradCream" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F5EFE6" stopOpacity="0" />
            <stop offset="45%" stopColor="#F5EFE6" stopOpacity="0.32" />
            <stop offset="80%" stopColor="#C83226" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#F5EFE6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="windGradCrimson" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C83226" stopOpacity="0" />
            <stop offset="50%" stopColor="#C83226" stopOpacity="0.45" />
            <stop offset="85%" stopColor="#E09F3E" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#C83226" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 5 Undulating Guiding Wind Ribbons */}
        <path
          className="wind-ribbon ribbon-1"
          d="M -200,220 C 260,120 580,340 980,210 C 1220,130 1420,240 1680,170"
          stroke="url(#windGradCream)"
          strokeWidth="1.8"
          fill="none"
        />
        <path
          className="wind-ribbon ribbon-2"
          d="M -180,450 C 310,360 640,560 1060,420 C 1310,335 1480,450 1700,390"
          stroke="url(#windGradCrimson)"
          strokeWidth="2.2"
          fill="none"
        />
        <path
          className="wind-ribbon ribbon-3"
          d="M -220,660 C 220,570 590,740 1020,610 C 1280,530 1460,640 1680,580"
          stroke="url(#windGradCream)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          className="wind-ribbon ribbon-4"
          d="M -150,330 C 380,430 760,250 1140,360 C 1380,430 1520,310 1720,350"
          stroke="url(#windGradCream)"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          className="wind-ribbon ribbon-5"
          d="M -190,550 C 340,650 720,460 1120,560 C 1360,620 1510,500 1710,540"
          stroke="url(#windGradCrimson)"
          strokeWidth="1.4"
          fill="none"
        />
      </svg>

      {/* Layer 2: Cyclic Wind-Borne Momiji Leaves Blowing & Resetting */}
      <div className="wind-leaves-stage" aria-hidden="true">
        {WIND_LEAVES.map((leaf) => (
          <div
            key={leaf.id}
            className="gusting-leaf-wrapper"
            style={{
              top: leaf.y,
              animationDelay: leaf.delay,
              animationDuration: leaf.duration,
              '--sway-y': `${leaf.sway}px`,
              '--rot-deg': `${leaf.rot}deg`
            }}
          >
            <div className="gusting-leaf-inner">
              <MomijiSvg color={leaf.color} size={leaf.size} />
            </div>
          </div>
        ))}
      </div>

      {/* Layer 3: Centerpiece — Zen Enso Brush Circle, Orbiting Leaf & Hanko Seal */}
      <div className="preloader-centerpiece">
        <div className="enso-emblem-container">
          {/* Ambient Crimson Glow */}
          <div className="enso-ambient-glow" aria-hidden="true" />

          {/* Progressive Enso Brush SVG */}
          <svg className="enso-svg" viewBox="0 0 148 148" aria-hidden="true">
            {/* Subtle background track */}
            <circle
              cx="74"
              cy="74"
              r="64"
              stroke="rgba(245, 239, 230, 0.08)"
              strokeWidth="2"
              fill="none"
            />
            {/* Spinning wind vortex arc */}
            <circle
              className="enso-wind-arc"
              cx="74"
              cy="74"
              r="56"
              stroke="rgba(245, 239, 230, 0.16)"
              strokeWidth="1"
              strokeDasharray="48 140"
              strokeLinecap="round"
              fill="none"
            />
            {/* Progressively drawn Cinnabar Enso stroke */}
            <circle
              cx="74"
              cy="74"
              r="64"
              stroke="var(--accent-primary)"
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 74 74)"
              style={{
                filter: 'drop-shadow(0 0 10px rgba(200, 50, 38, 0.65))',
                transition: 'stroke-dashoffset 90ms linear'
              }}
            />
          </svg>

          {/* Orbiting Momiji Leaf riding the Enso Brush Tip */}
          <div
            className="enso-orbit-carrier"
            style={{ transform: `rotate(${orbitAngle}deg)` }}
            aria-hidden="true"
          >
            <div className="enso-orbit-leaf">
              <MomijiSvg color="#C83226" size={18} />
            </div>
          </div>

          {/* Central Cinnabar Hanko Stamp */}
          <div className="preloader-hanko">
            <span className="hanko-kanji">風</span>
            <span className="hanko-initials mono">AJ</span>
          </div>
        </div>

        {/* Editorial Typography & Progress Readout */}
        <div className="preloader-meta">
          <span className="preloader-name">Abimanyu Jayaganesh</span>
          <div className="preloader-telemetry-row mono">
            <span className="preloader-status">{statusLabel}</span>
            <span className="preloader-divider">//</span>
            <span className="preloader-counter">{String(progress).padStart(3, '0')}%</span>
          </div>
        </div>
      </div>

      <style>{`
        .tsushima-wind-preloader {
          position: fixed;
          inset: 0;
          z-index: 10000;
          background: radial-gradient(
            ellipse 80% 70% at 50% 50%,
            #101219 0%,
            #07080B 100%
          );
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: opacity 780ms cubic-bezier(0.16, 1, 0.3, 1),
                      transform 820ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Final Wind Gust Exit Transition */
        .tsushima-wind-preloader.is-gust-exiting {
          opacity: 0;
          transform: scale(1.04);
          pointer-events: none;
        }

        .tsushima-wind-preloader.is-gust-exiting .gusting-leaf-wrapper {
          transform: translate3d(120vw, -40px, 0) rotate(540deg) !important;
          transition: transform 750ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .tsushima-wind-preloader.is-gust-exiting .preloader-centerpiece {
          transform: translateY(-16px) scale(0.96);
          opacity: 0;
          transition: transform 550ms cubic-bezier(0.16, 1, 0.3, 1), opacity 500ms ease;
        }

        /* Layer 1: Sweeping Wind Ribbons */
        .wind-streams-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .wind-ribbon {
          stroke-dasharray: 420 900;
          stroke-dashoffset: 1320;
          animation: windRibbonSweep 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .ribbon-1 { animation-duration: 2.3s; animation-delay: 0s; }
        .ribbon-2 { animation-duration: 2.0s; animation-delay: 0.3s; }
        .ribbon-3 { animation-duration: 2.6s; animation-delay: 0.6s; }
        .ribbon-4 { animation-duration: 2.1s; animation-delay: 0.9s; }
        .ribbon-5 { animation-duration: 2.5s; animation-delay: 0.45s; }

        @keyframes windRibbonSweep {
          0% {
            stroke-dashoffset: 1320;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: -420;
            opacity: 0;
          }
        }

        /* Layer 2: Cyclic Blowing & Resetting Momiji Leaves */
        .wind-leaves-stage {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
          overflow: hidden;
        }

        .gusting-leaf-wrapper {
          position: absolute;
          left: -8%;
          will-change: transform, opacity;
          animation-name: windLeafBlowAndReset;
          animation-timing-function: cubic-bezier(0.35, 0.05, 0.55, 0.95);
          animation-iteration-count: infinite;
        }

        .gusting-leaf-inner {
          animation: leafFlutter3D 1.1s ease-in-out infinite alternate;
        }

        @keyframes windLeafBlowAndReset {
          0% {
            transform: translate3d(-5vw, 0px, 0) rotate(0deg) scale(0.75);
            opacity: 0;
          }
          12% {
            opacity: 0.95;
          }
          50% {
            transform: translate3d(52vw, var(--sway-y, 28px), 0) rotate(calc(var(--rot-deg, 240deg) * 0.5)) scale(1.08);
            opacity: 1;
          }
          88% {
            opacity: 0.9;
          }
          100% {
            transform: translate3d(112vw, calc(var(--sway-y, 28px) * -0.6), 0) rotate(var(--rot-deg, 240deg)) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes leafFlutter3D {
          0% {
            transform: rotateX(15deg) rotateY(-25deg);
          }
          100% {
            transform: rotateX(-25deg) rotateY(35deg);
          }
        }

        /* Layer 3: Centerpiece Emblem & Telemetry */
        .preloader-centerpiece {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
          padding: 32px;
        }

        .enso-emblem-container {
          position: relative;
          width: 148px;
          height: 148px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .enso-ambient-glow {
          position: absolute;
          inset: 12px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(200, 50, 38, 0.22) 0%,
            rgba(200, 50, 38, 0.04) 60%,
            transparent 100%
          );
          animation: ambientPulse 2.2s ease-in-out infinite alternate;
        }

        @keyframes ambientPulse {
          0% { transform: scale(0.92); opacity: 0.7; }
          100% { transform: scale(1.08); opacity: 1; }
        }

        .enso-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .enso-wind-arc {
          transform-origin: 74px 74px;
          animation: arcSpin 1.8s linear infinite;
        }

        @keyframes arcSpin {
          to { transform: rotate(360deg); }
        }

        /* Orbiting Leaf on the Enso Brush Tip */
        .enso-orbit-carrier {
          position: absolute;
          inset: 0;
          pointer-events: none;
          transition: transform 90ms linear;
        }

        .enso-orbit-leaf {
          position: absolute;
          top: 50%;
          right: 1px;
          margin-top: -9px;
          animation: leafTipSpin 1.4s linear infinite;
        }

        @keyframes leafTipSpin {
          to { transform: rotate(360deg); }
        }

        .preloader-hanko {
          position: relative;
          width: 58px;
          height: 58px;
          border: 1.5px solid var(--accent-primary);
          background: rgba(16, 18, 24, 0.88);
          backdrop-filter: blur(8px);
          border-radius: var(--radius-sm);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          box-shadow: 0 0 32px rgba(200, 50, 38, 0.35), inset 0 0 14px rgba(200, 50, 38, 0.18);
        }

        .hanko-kanji {
          font-family: var(--font-heading);
          font-size: 0.75rem;
          color: var(--accent-primary);
          line-height: 1;
        }

        .hanko-initials {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: 0.1em;
          line-height: 1.1;
        }

        .preloader-meta {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          text-align: center;
        }

        .preloader-name {
          font-family: var(--font-heading);
          font-size: clamp(1.35rem, 2vw, 1.6rem);
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: 0.04em;
        }

        .preloader-telemetry-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.75rem;
          letter-spacing: 0.18em;
        }

        .preloader-status {
          color: var(--text-secondary);
        }

        .preloader-divider {
          color: var(--accent-primary);
          opacity: 0.7;
        }

        .preloader-counter {
          color: var(--accent-primary);
          font-weight: 700;
          min-width: 44px;
        }

        @media (max-width: 640px) {
          .preloader-telemetry-row {
            flex-direction: column;
            gap: 4px;
          }
          .preloader-divider {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
