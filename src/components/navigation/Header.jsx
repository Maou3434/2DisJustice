import React, { useState } from 'react';
import { AudioController } from '../common/AudioController.jsx';
import { Menu, X } from 'lucide-react';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { num: '02', label: 'Experience', href: '#experience' },
    { num: '03', label: 'Systems', href: '#projects' },
    { num: '04', label: 'Patents', href: '#patents' },
    { num: '05', label: 'Disciplines', href: '#skills' },
    { num: '06', label: 'Honors', href: '#education' },
    { num: '07', label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Minimal Top-Right Controls (Audio Chime + Mobile Index Button on Small Screens Only) */}
      <div className="floating-top-controls">
        <AudioController />
        <button
          className="mobile-chapter-btn mono"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label={isMobileMenuOpen ? 'Close chapter menu' : 'Open chapter menu'}
        >
          {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          <span>INDEX</span>
        </button>
      </div>

      {/* Fullscreen Sumi-e Mobile Chapter Drawer */}
      {isMobileMenuOpen && (
        <div className="mobile-drawer" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header mono">
              <span>CHAPTER INDEX // 目次</span>
            </div>
            <nav className="mobile-nav">
              <a
                href="#top"
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mobile-num mono">01</span>
                <span>Prologue</span>
              </a>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="mobile-num mono">{link.num}</span>
                  <span>{link.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      <style>{`
        .floating-top-controls {
          position: fixed;
          top: 22px;
          right: 28px;
          z-index: 75;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .mobile-chapter-btn {
          display: none;
          align-items: center;
          gap: 6px;
          height: 32px;
          padding: 0 10px;
          background: rgba(18, 20, 26, 0.88);
          backdrop-filter: blur(10px);
          border: 1px solid var(--border-prominent);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        .mobile-drawer {
          position: fixed;
          inset: 0;
          background: rgba(6, 7, 10, 0.85);
          backdrop-filter: blur(12px);
          z-index: 70;
          display: flex;
          flex-direction: column;
          padding-top: 68px;
        }

        .mobile-drawer-content {
          background: var(--bg-surface-elevated);
          border-bottom: 1px solid var(--border-prominent);
          padding: 24px;
        }

        .drawer-header {
          font-size: 0.6875rem;
          color: var(--accent-primary);
          letter-spacing: 0.16em;
          margin-bottom: 16px;
          font-weight: 700;
        }

        .mobile-nav {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .mobile-nav-link {
          display: flex;
          align-items: baseline;
          gap: 12px;
          font-family: var(--font-heading);
          font-size: 1.25rem;
          color: var(--text-primary);
          padding: 8px 0;
          border-bottom: 1px solid var(--border-subtle);
        }

        .mobile-num {
          font-size: 0.75rem;
          color: var(--accent-primary);
          font-weight: 700;
        }

        @media (max-width: 900px) {
          .mobile-chapter-btn {
            display: inline-flex;
            height: 36px;
            padding: 0 12px;
          }
          .floating-top-controls {
            top: calc(14px + env(safe-area-inset-top, 0px));
            right: 16px;
          }
          .mobile-drawer {
            padding-top: calc(64px + env(safe-area-inset-top, 0px));
          }
          .mobile-drawer-content {
            padding: 20px 20px calc(24px + env(safe-area-inset-bottom, 0px));
            max-height: calc(100dvh - 64px);
            overflow-y: auto;
          }
          .mobile-nav-link {
            font-size: 1.15rem;
            padding: 10px 4px;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
