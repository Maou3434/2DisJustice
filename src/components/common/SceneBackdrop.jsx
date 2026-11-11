import React from 'react';

/**
 * SceneBackdrop Component
 * Renders vivid, high-contrast Tsushima landscape paintings with live scroll parallax
 * and smooth top/bottom vignette blending so the artwork shines clearly.
 */
export const SceneBackdrop = ({
  image,
  position = 'center',
  opacity = 0.92,
  overlayDarkness = 0.44
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
          background: `rgba(8, 9, 13, ${overlayDarkness})`
        }}
      />
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
          inset: -8% 0;
          width: 100%;
          height: 116%;
          background-size: cover;
          background-repeat: no-repeat;
          filter: contrast(1.12) saturate(1.18) brightness(1.05);
          transform: translate3d(0, var(--bg-parallax, 0px), 0) scale(var(--bg-scale, 1.04));
          will-change: transform;
          transition: transform 90ms linear;
        }

        .scene-backdrop-overlay {
          position: absolute;
          inset: 0;
        }

        .scene-backdrop-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 90% 80% at 50% 50%,
            rgba(8, 9, 13, 0.10) 0%,
            rgba(8, 9, 13, 0.38) 65%,
            rgba(8, 9, 13, 0.82) 100%
          );
        }

        /* Smooth feather at top & bottom edges without crushing the middle image brightness */
        .scene-backdrop-edge-blend {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            #0A0B0E 0%,
            rgba(10, 11, 14, 0.55) 7%,
            transparent 18%,
            transparent 82%,
            rgba(10, 11, 14, 0.58) 93%,
            #0A0B0E 100%
          );
        }
      `}</style>
    </div>
  );
};

export default SceneBackdrop;
