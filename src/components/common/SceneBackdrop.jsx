import React from 'react';

/**
 * SceneBackdrop Component
 * Provides a full-screen atmospheric backdrop with seamless top/bottom Sumi-ink
 * crossfade transitions and a dedicated reading-zone contrast gradient.
 */
export const SceneBackdrop = ({
  image,
  position = 'center',
  opacity = 0.78,
  overlayDarkness = 0.82
}) => {
  return (
    <div className="scene-backdrop" aria-hidden="true">
      <div
        className="scene-backdrop-img"
        style={{
          backgroundImage: `url('${image}')`,
          backgroundPosition: position,
          opacity: opacity
        }}
      />
      <div
        className="scene-backdrop-overlay"
        style={{
          background: `rgba(10, 11, 14, ${overlayDarkness})`
        }}
      />
      <div className="scene-backdrop-reading-shield" />
      <div className="scene-backdrop-vignette" />
      <div className="scene-backdrop-edge-blend" />

      <style>{`
        .scene-backdrop {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .scene-backdrop-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-repeat: no-repeat;
          filter: contrast(1.06) saturate(1.02) brightness(0.88);
          transform: scale(1.04);
          will-change: transform;
          transition: transform 1400ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .scene-section.is-inview .scene-backdrop-img {
          transform: scale(1.0);
        }

        .scene-backdrop-overlay {
          position: absolute;
          inset: 0;
        }

        /* Calm left-to-right reading shield so typography never fights background details */
        .scene-backdrop-reading-shield {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(10, 11, 14, 0.75) 0%,
            rgba(10, 11, 14, 0.45) 55%,
            rgba(10, 11, 14, 0.25) 100%
          );
        }

        .scene-backdrop-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 85% 75% at 50% 50%,
            transparent 0%,
            rgba(10, 11, 14, 0.45) 55%,
            rgba(10, 11, 14, 0.94) 100%
          );
        }

        /* Deep seamless crossfade into pure #0A0B0E Sumi ink at top & bottom of every page */
        .scene-backdrop-edge-blend {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            #0A0B0E 0%,
            rgba(10, 11, 14, 0.75) 9%,
            transparent 24%,
            transparent 76%,
            rgba(10, 11, 14, 0.78) 91%,
            #0A0B0E 100%
          );
        }
      `}</style>
    </div>
  );
};

export default SceneBackdrop;
