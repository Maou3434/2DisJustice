import React, { useState, useEffect } from 'react';
import { AudioController } from '../common/AudioController.jsx';
import { Menu, X } from 'lucide-react';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Clean appearance after scrolling past hero
      setIsScrolled(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Patents', href: '#patents' },
    { label: 'Capabilities', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="container header-container">
        {/* Brand Stamp */}
        <a href="#top" className="brand-stamp" aria-label="Abimanyu Jayaganesh Home">
          <div className="hanko-seal" title="Abimanyu Jayaganesh">
            <span className="hanko-text">AJ</span>
          </div>
          <div className="brand-meta">
            <span className="brand-name">Abimanyu Jayaganesh</span>
            <span className="brand-sub">Physics-ML &amp; Systems Engineering</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="header-actions">
          <AudioController />

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="mobile-drawer" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-drawer-content" onClick={e => e.stopPropagation()}>
            <nav className="mobile-nav">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      <style>{`
        .site-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: var(--z-header);
          padding: 12px 0;
          transform: translateY(-100%);
          opacity: 0;
          pointer-events: none;
          transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms ease, background-color 300ms ease;
        }

        .site-header.is-scrolled {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
          background: rgba(10, 11, 14, 0.96);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.45);
        }

        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          height: 44px;
        }

        .brand-stamp {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .hanko-seal {
          width: 32px;
          height: 32px;
          background: var(--accent-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-sm);
          box-shadow: var(--shadow-accent);
          transition: transform var(--transition-fast);
        }

        .brand-stamp:hover .hanko-seal {
          transform: scale(1.05);
        }

        .hanko-text {
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 0.8125rem;
          color: var(--text-primary);
          line-height: 1;
          letter-spacing: 0.05em;
        }

        .brand-meta {
          display: flex;
          flex-direction: column;
        }

        .brand-name {
          font-family: var(--font-heading);
          font-size: 0.9375rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
          letter-spacing: -0.01em;
        }

        .brand-sub {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--text-muted);
          letter-spacing: 0.03em;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .nav-link {
          font-family: var(--font-mono);
          font-size: 0.8125rem;
          color: var(--text-secondary);
          transition: color var(--transition-fast);
          position: relative;
          padding: 4px 0;
        }

        .nav-link:hover {
          color: var(--accent-primary);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .mobile-menu-toggle {
          display: none;
          padding: 8px;
          color: var(--text-primary);
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
        }

        .mobile-drawer {
          position: fixed;
          inset: 0;
          top: 60px;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          z-index: 45;
          display: flex;
          flex-direction: column;
        }

        .mobile-drawer-content {
          background: var(--bg-surface-elevated);
          border-bottom: 1px solid var(--border-prominent);
          padding: 24px;
        }

        .mobile-nav {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .mobile-nav-link {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          color: var(--text-primary);
          padding: 8px 0;
          border-bottom: 1px solid var(--border-subtle);
        }

        @media (max-width: 900px) {
          .desktop-nav {
            display: none;
          }
          .mobile-menu-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      `}</style>
    </header>
  );
};
