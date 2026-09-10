import React from 'react';

export const HeroBackdrop = () => {
  return (
    <div className="hero-backdrop-container" aria-hidden="true">
      <div className="hero-backdrop-image" />
      <div className="hero-backdrop-vignette" />
      <div className="hero-backdrop-bottom-fade" />

      <style>{`
        .hero-backdrop-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .hero-backdrop-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background-image: url('/images/tsushima-hero-bg.jpg');
          background-size: cover;
          background-position: center 25%;
          background-repeat: no-repeat;
          filter: contrast(1.05) brightness(0.96);
        }

        .hero-backdrop-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, rgba(10, 11, 14, 0.12) 0%, rgba(10, 11, 14, 0.55) 70%, var(--bg-primary) 100%);
        }

        .hero-backdrop-bottom-fade {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 240px;
          background: linear-gradient(to bottom, transparent 0%, rgba(10, 11, 14, 0.4) 40%, rgba(10, 11, 14, 0.85) 75%, var(--bg-primary) 100%);
        }
      `}</style>
    </div>
  );
};
