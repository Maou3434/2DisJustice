import React, { useState, useEffect } from 'react';
import { VariationSwitcher } from './VariationSwitcher.jsx';
import { AudioController } from '../common/AudioController.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import { Menu, X } from 'lucide-react';

export const Header = () => {
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Research', href: '#research' },
    { label: 'Lakehouse & Projects', href: '#projects' },
    { label: 'Patents', href: '#patents' },
    { label: 'Competencies', href: '#skills' },
    { label: 'Accolades', href: '#honors' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="container header-container">
        {/* Brand Stamp */}
        <a href="#top" className="brand-stamp" aria-label="Abimanyu Jayaganesh Home">
          {theme === 'tsushima' ? (
            <div className="hanko-seal" title="Abimanyu Jayaganesh (印)">
              <span className="hanko-text">志</span>
            </div>
          ) : (
            <div className="blueprint-stamp">
              <span className="mono">[AJ.SYS]</span>
            </div>
          )}
          <div className="brand-meta">
            <span className="brand-name">Abimanyu Jayaganesh</span>
            <span className="brand-sub">Physics-ML & Data Systems</span>
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
          <VariationSwitcher />

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
          padding: 16px 0;
          transition: background-color 300ms ease, border-color 300ms ease, padding 300ms ease, backdrop-filter 300ms ease;
        }

        .site-header.is-scrolled {
          padding: 10px 0;
          background: var(--bg-overlay);
          backdrop-filter: var(--bg-blur);
          border-bottom: 1px solid var(--border-subtle);
        }

        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
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
          font-family: serif;
          font-weight: 900;
          font-size: 1.15rem;
          color: var(--text-primary);
          line-height: 1;
        }

        .blueprint-stamp {
          padding: 4px 8px;
          border: 1px solid var(--accent-primary);
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--accent-primary);
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
          gap: 12px;
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
