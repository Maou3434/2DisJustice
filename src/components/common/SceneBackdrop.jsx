import React from 'react';

/**
 * SceneBackdrop Component
 * Provides a dedicated, full-screen background image with atmospheric darkening,
 * radial vignette, and linear contrast gradient to guarantee typography legibility.
 *
 * @param {string} image - Path to the background image
 * @param {string} position - CSS background position (default: 'center')
 * @param {number} opacity - Background image opacity (default: 0.85)
 * @param {number} overlayDarkness - Opacity of dark overlay (default: 0.72)
 */
export const SceneBackdrop = ({
  image,
  position = 'center',
  opacity = 0.82,
  overlayDarkness = 0.75
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
          inset: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-repeat: no-repeat;
          filter: contrast(1.1) saturate(1.05) brightness(0.9);
          transform: scale(1.02);
          transition: transform 1200ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .scene-backdrop-overlay {
          position: absolute;
          inset: 0;
          mix-blend-mode: multiply;
        }

        .scene-backdrop-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 85% 75% at 50% 50%,
            transparent 0%,
            rgba(6, 7, 10, 0.45) 55%,
            rgba(6, 7, 10, 0.92) 100%
          );
        }

        .scene-backdrop-edge-blend {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(6, 7, 10, 0.75) 0%,
            transparent 12%,
            transparent 88%,
            rgba(6, 7, 10, 0.85) 100%
          );
        }
      `}</style>
    </div>
  );
};

export default SceneBackdrop;
