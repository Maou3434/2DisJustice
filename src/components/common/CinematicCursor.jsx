import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../context/ThemeContext.jsx';

export const CinematicCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on pointer-fine devices (desktops)
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let animId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);

    // Track hover on interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest('a, button, [role="button"], input, textarea, .project-card, .patent-card, .timeline-card')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
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
  }, [isVisible]);

  return (
    <>
      {/* Precision Core Dot */}
      <div
        ref={dotRef}
        className={`cinematic-cursor-dot ${isVisible ? 'is-visible' : ''} ${isClicked ? 'is-clicked' : ''}`}
        aria-hidden="true"
      />
      {/* Atmospheric Trailing Aura Ring */}
      <div
        ref={ringRef}
        className={`cinematic-cursor-ring ${isVisible ? 'is-visible' : ''} ${isHovered ? 'is-hovered' : ''} ${isClicked ? 'is-clicked' : ''}`}
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
          transition: opacity 200ms ease, transform 0ms linear, scale 150ms ease;
          box-shadow: 0 0 10px var(--accent-primary);
        }

        .cinematic-cursor-dot.is-visible {
          opacity: 1;
        }

        .cinematic-cursor-dot.is-clicked {
          transform: scale(0.5);
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
          transition: width 250ms cubic-bezier(0.16, 1, 0.3, 1),
                      height 250ms cubic-bezier(0.16, 1, 0.3, 1),
                      margin 250ms cubic-bezier(0.16, 1, 0.3, 1),
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
          transform: scale(0.85);
          background: rgba(200, 50, 38, 0.25);
        }

        @media (pointer: coarse) {
          .cinematic-cursor-dot,
          .cinematic-cursor-ring {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
