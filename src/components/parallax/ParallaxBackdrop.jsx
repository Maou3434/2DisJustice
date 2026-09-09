import React from 'react';
import { ParallaxLayer } from './ParallaxLayer.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';

/**
 * ParallaxBackdrop
 * 
 * Deep spatial world behind and between content sections:
 * - Far Horizon Layer (speed: 0.22)
 * - Research, Craft & Patent Equation Watermark Layer (speed: 0.38)
 * - Sumi-e Ink Ribbon Layer (speed: 0.65)
 * - Foreground Floating Autumn Leaves Layer (speed: 1.45)
 */
export const ParallaxBackdrop = () => {
  const { theme } = useTheme();
  const isTsushima = theme === 'tsushima';

  return (
    <div className="parallax-backdrop-container" aria-hidden="true">
      {/* 1. Deep Horizon Layer (Speed: 0.20) */}
      <ParallaxLayer speed={0.20} mouseFactor={16} zDepth={-450} isGlobal={true} className="backdrop-horizon-plane">
        <div className="horizon-silhouette-glow" />
        <div className="horizon-mountain-crests" />
      </ParallaxLayer>

      {/* 2. Deep Editorial Chapter Watermarks & Research Equations (Speed: 0.36) */}
      <ParallaxLayer speed={0.36} mouseFactor={24} zDepth={-280} isGlobal={true} className="backdrop-watermark-plane">
        
        {/* Research Chapter Watermark & Physics Equation */}
        <div className="parallax-watermark wm-research">
          <span className="wm-japanese">{isTsushima ? '鍛錬' : 'RESEARCH'}</span>
          <span className="wm-number mono">01</span>
          <div className="wm-equation mono">
            ρ·c_p·(∂T/∂t) = k·∇²T + q̇_gen  // PINN Thermal Twin ODE
          </div>
        </div>

        {/* Projects Chapter Watermark & Lakehouse/Algorithm Formula */}
        <div className="parallax-watermark wm-projects">
          <span className="wm-japanese">{isTsushima ? '匠' : 'SYSTEMS'}</span>
          <span className="wm-number mono">02</span>
          <div className="wm-equation mono">
            min ∑ d(c_i, c_i+1) | Beam-Search 2-Opt  // TSP Reorder
          </div>
        </div>

        {/* Patents Chapter Watermark */}
        <div className="parallax-watermark wm-patents">
          <span className="wm-japanese">{isTsushima ? '特許' : 'PATENTS'}</span>
          <span className="wm-number mono">03</span>
          <div className="wm-equation mono">
            IN 202641027735 · Spectral CIELAB Matching System
          </div>
        </div>

        {/* Capabilities Chapter Watermark */}
        <div className="parallax-watermark wm-skills">
          <span className="wm-japanese">{isTsushima ? '技術' : 'CORE'}</span>
          <span className="wm-number mono">04</span>
          <div className="wm-equation mono">
            __global__ void gemm_kernel(float* A, float* B, float* C)
          </div>
        </div>

      </ParallaxLayer>

      {/* 3. Midground Atmospheric Ink Washes (Speed: 0.65) */}
      <ParallaxLayer speed={0.65} mouseFactor={36} zDepth={-120} direction="lateral" isGlobal={true} className="backdrop-ink-plane">
        <img
          src="/images/brush-stroke-1.png"
          alt=""
          className="ink-wash-splatter wash-1"
          style={{ top: '135vh', right: '4%', width: '420px', opacity: isTsushima ? 0.22 : 0.08 }}
        />
        <img
          src="/images/brush-stroke-2.png"
          alt=""
          className="ink-wash-splatter wash-2"
          style={{ top: '275vh', left: '-5%', width: '480px', opacity: isTsushima ? 0.18 : 0.07 }}
        />
        <img
          src="/images/brush-stroke-3.png"
          alt=""
          className="ink-wash-splatter wash-3"
          style={{ top: '440vh', right: '-2%', width: '520px', opacity: isTsushima ? 0.20 : 0.09 }}
        />
      </ParallaxLayer>

      {/* 4. Foreground Floating Depth Elements (Speed: 1.48, moves faster than page scroll!) */}
      {isTsushima && (
        <ParallaxLayer speed={1.48} mouseFactor={55} rotateFactor={12} zDepth={180} direction="lateral" isGlobal={true} className="backdrop-foreground-plane">
          {/* Floating authentic Momiji leaves passing in front of content */}
          <img
            src="/images/momiji-leaf-red.png"
            alt=""
            className="fg-leaf fg-leaf-1"
            style={{ top: '110vh', left: '12%', width: '64px' }}
          />
          <img
            src="/images/momiji-leaf-gold.png"
            alt=""
            className="fg-leaf fg-leaf-2"
            style={{ top: '210vh', right: '14%', width: '78px' }}
          />
          <img
            src="/images/momiji-leaf-red.png"
            alt=""
            className="fg-leaf fg-leaf-3"
            style={{ top: '350vh', left: '8%', width: '82px' }}
          />
          <img
            src="/images/momiji-leaf-gold.png"
            alt=""
            className="fg-leaf fg-leaf-4"
            style={{ top: '480vh', right: '10%', width: '70px' }}
          />
        </ParallaxLayer>
      )}

      <style>{`
        .parallax-backdrop-container {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 1;
        }

        .backdrop-horizon-plane,
        .backdrop-watermark-plane,
        .backdrop-ink-plane,
        .backdrop-foreground-plane {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        /* Far Horizon Silhouette */
        .horizon-silhouette-glow {
          position: absolute;
          top: 60vh;
          left: 50%;
          transform: translateX(-50%);
          width: 90vw;
          height: 600px;
          background: radial-gradient(ellipse at center, rgba(200, 50, 38, 0.06) 0%, rgba(10, 11, 14, 0) 70%);
          filter: blur(80px);
        }

        /* Chapter Watermarks */
        .parallax-watermark {
          position: absolute;
          display: flex;
          flex-direction: column;
          user-select: none;
          opacity: 0.22;
          line-height: 0.85;
          letter-spacing: -0.04em;
          filter: drop-shadow(0 0 40px rgba(0, 0, 0, 0.9));
          transition: opacity var(--transition-normal);
        }

        .parallax-watermark:hover {
          opacity: 0.35;
        }

        .wm-research {
          top: 100vh;
          right: 6vw;
          text-align: right;
        }

        .wm-projects {
          top: 235vh;
          left: 4vw;
          text-align: left;
        }

        .wm-patents {
          top: 375vh;
          right: 5vw;
          text-align: right;
        }

        .wm-skills {
          top: 505vh;
          left: 5vw;
          text-align: left;
        }

        .wm-japanese {
          font-family: var(--font-heading);
          font-size: clamp(6.5rem, 15vw, 15rem);
          font-weight: 800;
          color: var(--text-primary);
          text-shadow: 0 0 60px rgba(0, 0, 0, 0.95);
        }

        .wm-number {
          font-size: clamp(3.2rem, 7vw, 7rem);
          color: var(--accent-primary);
          opacity: 0.9;
          margin-top: -15px;
          font-weight: 700;
          text-shadow: 0 0 35px rgba(200, 50, 38, 0.4);
        }

        .wm-equation {
          font-size: 0.88rem;
          color: var(--text-secondary);
          letter-spacing: 0.08em;
          margin-top: 18px;
          opacity: 0.75;
          background: rgba(18, 20, 26, 0.4);
          padding: 6px 14px;
          border-left: 2px solid var(--accent-primary);
          border-radius: var(--radius-sm);
        }

        /* Ink washes */
        .ink-wash-splatter {
          position: absolute;
          pointer-events: none;
          filter: contrast(1.2) drop-shadow(0 15px 30px rgba(0, 0, 0, 0.6));
          mix-blend-mode: luminosity;
        }

        /* Foreground Leaves (High Speed 3D Pass-Through) */
        .fg-leaf {
          position: absolute;
          pointer-events: none;
          filter: drop-shadow(0 20px 25px rgba(0, 0, 0, 0.85)) drop-shadow(0 5px 10px rgba(200, 50, 38, 0.25));
          z-index: 10;
        }

        @media (max-width: 768px) {
          .wm-japanese {
            font-size: 5rem;
          }
          .wm-number {
            font-size: 2.5rem;
          }
          .wm-equation {
            display: none;
          }
          .fg-leaf {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};
