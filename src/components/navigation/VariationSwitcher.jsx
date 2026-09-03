import React from 'react';
import { useTheme } from '../../context/ThemeContext.jsx';
import { Compass, Terminal } from 'lucide-react';

export const VariationSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  const isTsushima = theme === 'tsushima';

  return (
    <button
      onClick={toggleTheme}
      className="variation-switcher"
      aria-label={`Current visual direction: ${isTsushima ? 'Ghost of Tsushima Cinematic' : 'Architectural Editorial'}. Click to switch.`}
      title="Switch Creative Direction (Hotkey: T)"
    >
      <div className="switcher-track">
        <span className={`switcher-pill ${isTsushima ? 'is-left' : 'is-right'}`} />
        <span className={`switcher-label ${isTsushima ? 'is-active' : ''}`}>
          <Compass size={13} className="switcher-icon" />
          <span className="switcher-text">Tsushima</span>
        </span>
        <span className={`switcher-label ${!isTsushima ? 'is-active' : ''}`}>
          <Terminal size={13} className="switcher-icon" />
          <span className="switcher-text">Architectural</span>
        </span>
      </div>

      <style>{`
        .variation-switcher {
          display: inline-flex;
          align-items: center;
          background: var(--bg-surface);
          border: 1px solid var(--border-prominent);
          border-radius: var(--radius-full);
          padding: 3px;
          cursor: pointer;
          transition: border-color var(--transition-fast), background-color var(--transition-fast);
        }

        .variation-switcher:hover {
          border-color: var(--accent-primary);
        }

        .switcher-track {
          position: relative;
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .switcher-pill {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 50%;
          background: var(--accent-primary);
          border-radius: var(--radius-full);
          transition: transform 300ms var(--ease-out-expo);
          z-index: 1;
        }

        .switcher-pill.is-left {
          transform: translateX(0%);
        }

        .switcher-pill.is-right {
          transform: translateX(100%);
        }

        .switcher-label {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: var(--text-muted);
          transition: color 250ms ease;
          user-select: none;
        }

        .switcher-label.is-active {
          color: var(--text-inverse);
          font-weight: 700;
        }

        .switcher-icon {
          flex-shrink: 0;
        }

        @media (max-width: 640px) {
          .switcher-text {
            display: none;
          }
          .switcher-label {
            padding: 6px 8px;
          }
        }
      `}</style>
    </button>
  );
};
