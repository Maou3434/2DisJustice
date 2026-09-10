import React, { useEffect, useState } from 'react';

const CHAPTERS = [
  { id: 'top', kanji: '序', label: 'PROLOGUE', num: '01' },
  { id: 'research', kanji: '研', label: 'RESEARCH', num: '02' },
  { id: 'projects', kanji: '匠', label: 'SYSTEMS', num: '03' },
  { id: 'patents', kanji: '許', label: 'PATENTS', num: '04' },
  { id: 'skills', kanji: '術', label: 'CAPABILITIES', num: '05' },
  { id: 'honors', kanji: '誉', label: 'HONORS', num: '06' },
  { id: 'contact', kanji: '結', label: 'CONTACT', num: '07' }
];

export const ScrollSpine = () => {
  const [activeSection, setActiveSection] = useState('top');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isRetracted, setIsRetracted] = useState(false);

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

      // Smoothly retract spine before it encroaches on the footer/contact zone
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        const contactTop = contactEl.getBoundingClientRect().top;
        setIsRetracted(contactTop < window.innerHeight * 0.65);
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
      className={`scroll-spine-nav ${isRetracted ? 'is-retracted' : ''}`} 
      aria-label="Chapter progress spine"
      aria-hidden={isRetracted}
    >
      {/* Background Track Hairline */}
      <div className="spine-track">
        <div
          className="spine-progress-fill"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      {/* Chapter Nodes */}
      <div className="spine-chapters">
        {CHAPTERS.map((ch) => {
          const isActive = activeSection === ch.id;
          return (
            <button
              key={ch.id}
              onClick={() => scrollTo(ch.id)}
              className={`spine-node ${isActive ? 'is-active' : ''}`}
              aria-label={`Jump to ${ch.label}`}
            >
              <span className="node-kanji">{ch.kanji}</span>
              <div className="node-tooltip mono">
                <span className="tooltip-num">{ch.num}</span>
                <span className="tooltip-label">{ch.label}</span>
              </div>
            </button>
          );
        })}
      </div>

      <style>{`
        .scroll-spine-nav {
          position: fixed;
          right: 28px;
          top: 50%;
          transform: translateY(-50%);
          z-index: var(--z-nav);
          display: flex;
          align-items: center;
          height: 380px;
          pointer-events: auto;
          transition: opacity 300ms cubic-bezier(0.16, 1, 0.3, 1), transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .scroll-spine-nav.is-retracted {
          opacity: 0;
          pointer-events: none;
          transform: translateY(-50%) translateX(16px);
        }

        .spine-track {
          position: absolute;
          right: 14px;
          top: 0;
          bottom: 0;
          width: 1px;
          background: var(--border-subtle);
        }

        .spine-progress-fill {
          width: 100%;
          background: var(--accent-primary);
          box-shadow: 0 0 8px var(--accent-primary);
          transition: height 80ms linear;
        }

        .spine-chapters {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          position: relative;
          z-index: 2;
        }

        .spine-node {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          background: rgba(18, 20, 26, 0.75);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          color: var(--text-muted);
          font-family: var(--font-heading);
          font-size: 0.8125rem;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .spine-node:hover,
        .spine-node.is-active {
          color: #FFF;
          background: var(--accent-primary);
          border-color: var(--accent-primary);
          transform: scale(1.15);
          box-shadow: var(--shadow-accent);
        }

        .node-tooltip {
          position: absolute;
          right: 38px;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          background: rgba(10, 11, 14, 0.92);
          backdrop-filter: blur(10px);
          border: 1px solid var(--border-prominent);
          border-radius: var(--radius-sm);
          font-size: 0.6875rem;
          color: var(--text-secondary);
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transform: translateX(6px);
          transition: opacity 180ms ease, transform 180ms ease;
        }

        .spine-node:hover .node-tooltip {
          opacity: 1;
          transform: translateX(0);
        }

        .tooltip-num {
          color: var(--accent-primary);
        }

        @media (max-width: 1024px) {
          .scroll-spine-nav {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};
