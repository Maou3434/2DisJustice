import React, { useEffect, useRef } from 'react';

export const CinematicCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Only enable on pointer-fine devices (desktops)
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isVisible = false;
    let animId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (dotRef.current) dotRef.current.classList.add('is-visible');
        if (ringRef.current) ringRef.current.classList.add('is-visible');
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const handleMouseDown = () => {
      if (dotRef.current) dotRef.current.classList.add('is-clicked');
      if (ringRef.current) ringRef.current.classList.add('is-clicked');
    };

    const handleMouseUp = () => {
      if (dotRef.current) dotRef.current.classList.remove('is-clicked');
      if (ringRef.current) ringRef.current.classList.remove('is-clicked');
    };

    const handleMouseLeave = () => {
      isVisible = false;
      if (dotRef.current) dotRef.current.classList.remove('is-visible');
      if (ringRef.current) ringRef.current.classList.remove('is-visible');
    };

    // Track hover on interactive elements via direct DOM class mutation
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!ringRef.current) return;

      if (
        target.closest('a, button, [role="button"], input, textarea, .project-card, .patent-card, .timeline-card')
      ) {
        ringRef.current.classList.add('is-hovered');
      } else {
        ringRef.current.classList.remove('is-hovered');
      }
    };

    // Smooth lerp loop for the trailing ring
    const render = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* Precision Core Dot */}
      <div
        ref={dotRef}
        className="cinematic-cursor-dot"
        aria-hidden="true"
      />
      {/* Atmospheric Trailing Aura Ring */}
      <div
        ref={ringRef}
        className="cinematic-cursor-ring"
        aria-hidden="true"
      />

      <style>{`
        .cinematic-cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 6px;
          height: 6px;
          background: var(--accent-primary);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          margin-top: -3px;
          margin-left: -3px;
          opacity: 0;
          will-change: transform;
          transform: translate3d(-100px, -100px, 0);
          transition: opacity 200ms ease, scale 150ms cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 0 10px var(--accent-primary);
        }

        .cinematic-cursor-dot.is-visible {
          opacity: 1;
        }

        .cinematic-cursor-dot.is-clicked {
          scale: 0.5;
        }

        .cinematic-cursor-ring {
          position: fixed;
          top: 0;
          left: 0;
          width: 32px;
          height: 32px;
          border: 1px solid var(--accent-primary);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          margin-top: -16px;
          margin-left: -16px;
          opacity: 0;
          will-change: transform;
          transform: translate3d(-100px, -100px, 0);
          transition: width 250ms cubic-bezier(0.16, 1, 0.3, 1),
                      height 250ms cubic-bezier(0.16, 1, 0.3, 1),
                      margin 250ms cubic-bezier(0.16, 1, 0.3, 1),
                      scale 150ms cubic-bezier(0.16, 1, 0.3, 1),
                      background-color 250ms ease,
                      border-color 250ms ease,
                      opacity 200ms ease;
          background: rgba(200, 50, 38, 0.04);
        }

        .cinematic-cursor-ring.is-visible {
          opacity: 0.65;
        }

        .cinematic-cursor-ring.is-hovered {
          width: 54px;
          height: 54px;
          margin-top: -27px;
          margin-left: -27px;
          background: rgba(200, 50, 38, 0.12);
          border-color: var(--accent-primary);
          box-shadow: 0 0 20px var(--accent-glow);
          opacity: 0.9;
        }

        .cinematic-cursor-ring.is-clicked {
          scale: 0.85;
          background: rgba(200, 50, 38, 0.25);
        }

        @media (pointer: coarse) {
          .cinematic-cursor-dot,
          .cinematic-cursor-ring {
            display: none !important;
          }
        }

        @media (pointer: fine) {
          body, body * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
};
