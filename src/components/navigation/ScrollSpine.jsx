import React, { useEffect, useState } from 'react';

const CHAPTERS = [
  { id: 'top', label: 'PROLOGUE', num: '01' },
  { id: 'experience', label: 'EXPERIENCE', num: '02' },
  { id: 'projects', label: 'PROJECTS', num: '03' },
  { id: 'patents', label: 'PATENTS', num: '04' },
  { id: 'skills', label: 'SKILLS', num: '05' },
  { id: 'education', label: 'EDUCATION', num: '06' },
  { id: 'contact', label: 'CONTACT', num: '07' }
];

export const ScrollSpine = () => {
  const [activeSection, setActiveSection] = useState('top');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);

      // Determine active section based on scroll position
      const triggerY = window.innerHeight * 0.45;
      for (let i = CHAPTERS.length - 1; i >= 0; i--) {
        const el = document.getElementById(CHAPTERS[i].id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerY) {
          setActiveSection(CHAPTERS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className="scroll-spine-nav" 
      aria-label="Vertical Section Counter"
    >
      {/* Background Track Hairline */}
      <div className="spine-track">
        <div
          className="spine-progress-fill"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      {/* Chapter Nodes (Expanding Horizontal Pill on Hover) */}
      <div className="spine-chapters">
        {CHAPTERS.map((ch) => {
          const isActive = activeSection === ch.id;
          return (
            <button
              key={ch.id}
              onClick={() => scrollTo(ch.id)}
              className={`spine-node-pill ${isActive ? 'is-active' : ''}`}
              aria-label={`Jump to Section ${ch.num}: ${ch.label}`}
              title={`Section ${ch.num}: ${ch.label}`}
            >
              <span className="pill-num mono">{ch.num}</span>
              <span className="pill-expansion">
                <span className="pill-divider mono">//</span>
                <span className="pill-label mono">{ch.label}</span>
              </span>
            </button>
          );
        })}
      </div>

      <style>{`
        .scroll-spine-nav {
          position: fixed;
          right: 24px;
          top: 50%;
          transform: translateY(-50%);
          z-index: var(--z-nav);
          display: flex;
          align-items: center;
          height: 390px;
          pointer-events: auto;
        }

        .spine-track {
          position: absolute;
          right: 17px;
          top: 12px;
          bottom: 12px;
          width: 2px;
          background: rgba(255, 255, 255, 0.12);
          border-radius: 1px;
        }

        .spine-progress-fill {
          width: 100%;
          background: var(--accent-primary);
          box-shadow: 0 0 8px var(--accent-primary);
          border-radius: 1px;
          transition: height 80ms linear;
        }

        .spine-chapters {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-end;
          height: 100%;
          position: relative;
          z-index: 2;
        }

        /* Expanding Pill Button */
        .spine-node-pill {
          position: relative;
          display: inline-flex;
          align-items: center;
          height: 34px;
          width: 36px;
          padding: 0 9px;
          background: rgba(12, 14, 20, 0.88);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 17px;
          color: #9CA3AF;
          cursor: pointer;
          overflow: hidden;
          white-space: nowrap;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
          transform-origin: right center;
          transition: width 280ms cubic-bezier(0.16, 1, 0.3, 1),
                      background-color 200ms ease,
                      border-color 200ms ease,
                      box-shadow 200ms ease;
        }

        .pill-num {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: #9CA3AF;
          flex-shrink: 0;
          width: 18px;
          text-align: center;
          transition: color 200ms ease;
        }

        .pill-expansion {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin-left: 6px;
          opacity: 0;
          transform: translateX(8px);
          pointer-events: none;
          transition: opacity 180ms ease 40ms, transform 240ms cubic-bezier(0.16, 1, 0.3, 1) 40ms;
        }

        .pill-divider {
          color: var(--accent-primary);
          font-size: 0.625rem;
          font-weight: 700;
        }

        .pill-label {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.09em;
          color: #FFFFFF;
          text-transform: uppercase;
        }

        /* Hover Expansion: Smoothly reveals section name */
        .spine-node-pill:hover {
          width: 162px;
          background: rgba(18, 20, 28, 0.96);
          border-color: var(--accent-primary);
          box-shadow: 0 0 16px rgba(200, 50, 38, 0.4), 0 4px 20px rgba(0, 0, 0, 0.7);
        }

        .spine-node-pill:hover .pill-num {
          color: var(--accent-primary);
        }

        .spine-node-pill:hover .pill-expansion {
          opacity: 1;
          transform: translateX(0);
        }

        /* Active Section Highlight */
        .spine-node-pill.is-active {
          border-color: var(--accent-primary);
          background: rgba(200, 50, 38, 0.2);
          box-shadow: 0 0 12px rgba(200, 50, 38, 0.45);
        }

        .spine-node-pill.is-active .pill-num {
          color: #FFFFFF;
          font-weight: 800;
        }

        @media (max-width: 768px) {
          .scroll-spine-nav {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default ScrollSpine;
