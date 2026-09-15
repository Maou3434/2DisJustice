import React, { useEffect, useRef } from 'react';
import { SceneBackdrop } from '../common/SceneBackdrop.jsx';

export const HeroSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Only enable continuous 3D tilt tracking on pointer-fine desktop devices
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const section = sectionRef.current;
    if (!section) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let targetPxX = window.innerWidth / 2;
    let targetPxY = window.innerHeight / 2;
    let currentPxX = targetPxX;
    let currentPxY = targetPxY;
    let animId;

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetPxX = e.clientX - rect.left;
      targetPxY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
      targetPxX = section.clientWidth / 2;
      targetPxY = section.clientHeight / 2;
    };

    const tick = () => {
      // Weighted luxury lag (lerp)
      currentX += (targetX - currentX) * 0.07;
      currentY += (targetY - currentY) * 0.07;
      currentPxX += (targetPxX - currentPxX) * 0.09;
      currentPxY += (targetPxY - currentPxY) * 0.09;

      section.style.setProperty('--mouse-x', currentX.toFixed(4));
      section.style.setProperty('--mouse-y', currentY.toFixed(4));
      section.style.setProperty('--cursor-px-x', `${currentPxX.toFixed(1)}px`);
      section.style.setProperty('--cursor-px-y', `${currentPxY.toFixed(1)}px`);

      animId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="top" 
      className="scene-section hero-section" 
      aria-label="Prologue"
    >
      {/* Dominant Atmospheric Environment: Sunrise Maple Grove & Torii Gate */}
      <SceneBackdrop
        image="/images/cinematic_maple.png"
        position="center 30%"
        opacity={0.88}
        overlayDarkness={0.70}
      />

      {/* Controlled Atmosphere Mask with Interactive Lantern Glint */}
      <div className="hero-atmosphere-mask" aria-hidden="true" />

      {/* Dynamic Specular Sheen Over Typography */}
      <div className="hero-specular-light" aria-hidden="true" />

      <div className="container hero-container">
        {/* Layered Monumental Title: Exact Viewport Center with 3D Spatial Tilt */}
        <h1 className="hero-layered-title" aria-label="Abimanyu Jayaganesh">
          <span className="layer-word layer-abimanyu">
            <span className="swash-cap">A</span>bimanyu
          </span>
          <span className="layer-word layer-jayaganesh">
            <span className="swash-cap">J</span>ayaganes<span className="swash-term">h</span>
          </span>
        </h1>

        {/* Bottom Center Descriptor Masthead */}
        <div className="hero-bottom-masthead">
          <div className="specimen-sub-primary mono">
            SOFTWARE ENGINEER · ML · SYSTEMS
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          z-index: var(--z-content);
          overflow: hidden;
        }

        /* Inverse Backdrop Parallax */
        .hero-section .scene-backdrop-img {
          transform: scale(1.06) translate3d(calc(var(--mouse-x, 0) * -14px), calc(var(--mouse-y, 0) * -10px), 0);
          transition: transform 120ms linear;
        }

        /* Controlled Radial Atmosphere Vignette with Dynamic Lantern Glint */
        .hero-atmosphere-mask {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(
              circle 520px at var(--cursor-px-x, 50%) var(--cursor-px-y, 50%),
              rgba(200, 50, 38, 0.08) 0%,
              rgba(245, 239, 230, 0.03) 35%,
              transparent 70%
            ),
            radial-gradient(
              ellipse 80% 65% at 50% 50%,
              rgba(10, 11, 14, 0.72) 0%,
              rgba(10, 11, 14, 0.46) 45%,
              rgba(10, 11, 14, 0.10) 80%,
              transparent 100%
            );
          pointer-events: none;
          z-index: 1;
        }

        /* Dynamic Specular Sheen Over Typography */
        .hero-specular-light {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
            circle 420px at var(--cursor-px-x, 50%) var(--cursor-px-y, 50%),
            rgba(255, 255, 255, 0.14) 0%,
            rgba(245, 239, 230, 0.05) 40%,
            transparent 70%
          );
          mix-blend-mode: overlay;
          z-index: 5;
        }

        .hero-container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 100%;
          height: 100%;
          padding: 0 3vw;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1200px;
          transform-style: preserve-3d;
        }

        /* Page-Filling Layered Title: Exactly Dead-Center with 3D Spatial Tilt */
        .hero-layered-title {
          font-family: var(--font-display);
          font-size: clamp(4.5rem, 14.5vw, 15.0rem);
          font-weight: 400;
          line-height: 0.82;
          letter-spacing: -0.01em;
          color: #F5EFE6;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          margin: 0;
          padding: 0;
          text-align: center;
          user-select: none;
          transform-style: preserve-3d;
          transform: 
            rotateX(calc(var(--mouse-y, 0) * -4.5deg))
            rotateY(calc(var(--mouse-x, 0) * 6.5deg))
            translate3d(calc(var(--mouse-x, 0) * 8px), calc(var(--mouse-y, 0) * -5px), 0);
          transition: transform 80ms linear;
        }

        /* Surgical OpenType Stylistic Sets for Haute Couture Editorial Elegance */
        .swash-cap {
          font-feature-settings: "ss01" 1;
          display: inline-block;
        }

        .swash-term {
          font-feature-settings: "ss03" 1;
          display: inline-block;
        }

        .layer-word {
          display: block;
          white-space: nowrap;
          transform-style: preserve-3d;
        }

        /* Abimanyu Layered Over Jayaganesh in 3D Space with Shifting Shadow */
        .layer-abimanyu {
          position: relative;
          z-index: 3;
          margin-bottom: -0.07em; /* Controlled luxury layering overlap */
          transform: translateZ(26px);
          text-shadow: 
            calc(var(--mouse-x, 0) * -16px) calc(var(--mouse-y, 0) * -14px + 10px) 35px rgba(0, 0, 0, 0.96),
            0 2px 12px rgba(0, 0, 0, 0.98);
          transition: text-shadow 80ms linear;
        }

        .layer-jayaganesh {
          position: relative;
          z-index: 2;
          transform: translateZ(10px);
          text-shadow: 
            calc(var(--mouse-x, 0) * -10px) calc(var(--mouse-y, 0) * -10px + 6px) 28px rgba(0, 0, 0, 0.94),
            0 2px 10px rgba(0, 0, 0, 0.98);
          transition: text-shadow 80ms linear;
        }

        /* Descriptor Masthead: Centered between Name and Bottom of Viewport */
        .hero-bottom-masthead {
          position: absolute;
          bottom: clamp(84px, 13.5vh, 140px);
          left: 50%;
          transform: translateX(-50%) translate3d(calc(var(--mouse-x, 0) * 4px), 0, 0);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          z-index: 4;
          width: 100%;
          pointer-events: auto;
          transition: transform 120ms linear;
        }

        /* Subtitle: Refined Bottom Ground Line */
        .specimen-sub-primary {
          color: var(--accent-primary);
          font-family: var(--font-mono);
          font-size: clamp(0.85rem, 1.2vw, 1.15rem);
          font-weight: 700;
          letter-spacing: 0.32em;
          text-indent: 0.32em;
          text-transform: uppercase;
          text-shadow: 0 2px 18px rgba(0, 0, 0, 0.95);
        }

        @media (max-width: 768px) {
          .hero-layered-title {
            font-size: clamp(3.0rem, 16vw, 5.5rem);
            line-height: 0.80;
          }

          .layer-abimanyu {
            margin-bottom: -0.10em;
          }

          .hero-specimen-subtitles {
            margin-top: clamp(32px, 6vh, 48px);
          }

          .specimen-sub-primary {
            letter-spacing: 0.22em;
            text-indent: 0.22em;
            font-size: 0.82rem;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
