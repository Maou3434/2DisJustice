import React, { useState } from 'react';
import resumeData from '../../../data/resume_data.json';
import { Mail, Phone, Copy, Check, ArrowUp, ExternalLink } from 'lucide-react';
import { SceneBackdrop } from './SceneBackdrop.jsx';

export const Footer = () => {
  const [copiedField, setCopiedField] = useState(null);

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="scene-section site-footer">
      {/* Vivid Evening Shrine & Lantern Backdrop */}
      <SceneBackdrop
        image="/images/cinematic_shrine.png"
        position="center 70%"
        opacity={0.88}
        overlayDarkness={0.48}
      />

      {/* Restrained Chapter Number Watermark */}
      <div className="section-backdrop-watermark" aria-hidden="true">
        <span className="wm-number">07</span>
      </div>

      <div className="container scene-content footer-content">
        
        {/* Clean Editorial Scene Header */}
        <div className="scene-head-editorial">
          <div className="scene-head-top">
            <div className="scene-head-left">
              <span className="scene-eyebrow">07 // EPILOGUE</span>
              <h2 className="scene-title-editorial">Contact</h2>
            </div>
          </div>
          <div className="scene-divider-rule" />
        </div>

        {/* Frosted Contact Card Deck */}
        <div className="footer-glass-deck reveal-item reveal-delay-1">
          
          {/* Left Column: Concise Identity */}
          <div className="footer-identity-col">
            <h3 className="footer-name">{resumeData.personal.name}</h3>
            <p className="footer-bio-text">
              {resumeData.personal.summary}
            </p>

            <div className="footer-copyright-row mono">
              <span>© {new Date().getFullYear()} ABIMANYU JAYAGANESH · COIMBATORE / VELLORE, IN</span>
            </div>
          </div>

          {/* Right Column: Direct Channels */}
          <div className="footer-actions-col">
            <div className="channels-card-list">
              
              {/* Email Row */}
              <div className="direct-channel-card">
                <Mail size={18} className="channel-icon-col" />
                <div className="channel-meta-col">
                  <a href={`mailto:${resumeData.personal.email}`} className="channel-val mono">
                    {resumeData.personal.email}
                  </a>
                </div>
                <button
                  onClick={() => copyToClipboard(resumeData.personal.email, 'email')}
                  className="channel-copy-btn mono"
                  aria-label="Copy email"
                >
                  {copiedField === 'email' ? (
                    <span className="copied-badge"><Check size={14} /> COPIED</span>
                  ) : (
                    <Copy size={15} />
                  )}
                </button>
              </div>

              {/* Phone Row */}
              <div className="direct-channel-card">
                <Phone size={18} className="channel-icon-col" />
                <div className="channel-meta-col">
                  <a href={`tel:${resumeData.personal.phone.replace(/[^0-9+]/g, '')}`} className="channel-val mono">
                    {resumeData.personal.phone}
                  </a>
                </div>
                <button
                  onClick={() => copyToClipboard(resumeData.personal.phone, 'phone')}
                  className="channel-copy-btn mono"
                  aria-label="Copy phone"
                >
                  {copiedField === 'phone' ? (
                    <span className="copied-badge"><Check size={14} /> COPIED</span>
                  ) : (
                    <Copy size={15} />
                  )}
                </button>
              </div>

            </div>

            <div className="footer-bottom-actions">
              <div className="social-links-group">
                <a
                  href={resumeData.personal.links.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="social-btn mono"
                >
                  <span>GITHUB (@Maou3434)</span>
                  <ExternalLink size={13} />
                </a>

                <a
                  href={resumeData.personal.links.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="social-btn mono"
                >
                  <span>LINKEDIN</span>
                  <ExternalLink size={13} />
                </a>
              </div>

              <button onClick={scrollToTop} className="scroll-top-btn mono" aria-label="Return to Prologue">
                <span>RETURN TO TOP</span>
                <ArrowUp size={14} />
              </button>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        .site-footer {
          background-color: var(--bg-primary);
        }

        .footer-glass-deck {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: clamp(2.5rem, 5vw, 4rem);
          align-items: center;
          padding: clamp(2rem, 4vw, 3.25rem);
          background: rgba(10, 12, 18, 0.78);
          backdrop-filter: blur(18px);
          border: 1px solid rgba(245, 239, 230, 0.16);
          border-radius: var(--radius-md);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.65);
        }

        .footer-identity-col {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .footer-name {
          font-family: var(--font-heading);
          font-size: clamp(1.75rem, 2.4vw, 2.25rem);
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.15;
        }

        .footer-bio-text {
          font-size: 1.05rem;
          line-height: 1.8;
          color: var(--text-secondary);
          max-width: 54ch;
        }

        .footer-copyright-row {
          font-size: 0.75rem;
          color: var(--text-muted);
          letter-spacing: 0.08em;
          padding-top: 12px;
        }

        .footer-actions-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .channels-card-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .direct-channel-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          background: rgba(18, 22, 32, 0.85);
          border: 1px solid var(--border-prominent);
          border-radius: var(--radius-sm);
          transition: border-color 180ms ease;
        }

        .direct-channel-card:hover {
          border-color: var(--accent-primary);
        }

        .channel-icon-col {
          color: var(--accent-primary);
          flex-shrink: 0;
        }

        .channel-meta-col {
          flex: 1;
        }

        .channel-val {
          font-size: 0.95rem;
          color: var(--text-primary);
          transition: color 150ms ease;
        }

        .channel-val:hover {
          color: var(--accent-primary);
        }

        .channel-copy-btn {
          color: var(--text-secondary);
          padding: 6px 10px;
          border-radius: var(--radius-sm);
          font-size: 0.6875rem;
        }

        .copied-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: var(--accent-primary);
          font-weight: 700;
        }

        .footer-bottom-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          margin-top: 6px;
          gap: 16px;
        }

        .social-links-group {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }

        .social-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--text-secondary);
          padding: 6px 0;
          border-bottom: 1.5px solid var(--border-prominent);
          transition: all 150ms ease;
        }

        .social-btn:hover {
          color: var(--text-primary);
          border-color: var(--accent-primary);
        }

        .scroll-top-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--accent-primary);
          padding: 8px 16px;
          border: 1px solid var(--border-accent);
          border-radius: var(--radius-sm);
          transition: all 150ms ease;
        }

        .scroll-top-btn:hover {
          background: var(--accent-primary);
          color: #FFFFFF;
        }

        @media (max-width: 900px) {
          .footer-glass-deck {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
