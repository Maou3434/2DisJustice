import React, { useState } from 'react';
import resumeData from '../../../data/resume_data.json';
import { Mail, Phone, MapPin, Copy, Check, ArrowUp } from 'lucide-react';

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
    <footer id="contact" className="site-footer">
      <div className="container">
        
        {/* Main Footer Block */}
        <div className="footer-top-grid">
          
          {/* Identity & Mission */}
          <div className="footer-brand-col">
            <div className="footer-brand-header">
              <div className="footer-seal mono">
                <span>AJ</span>
              </div>
              <h3 className="footer-name">{resumeData.personal.name}</h3>
            </div>
            
            <p className="footer-bio">
              Computer Science Engineer and researcher investigating Physics-Informed ML, thermal digital twins, and high-throughput data lakehouses.
            </p>

            <div className="footer-location mono">
              <MapPin size={14} className="location-icon" />
              <span>{resumeData.personal.location}</span>
            </div>
          </div>

          {/* Direct Communication Channels */}
          <div className="footer-contact-col">
            <h4 className="contact-col-title mono">// DIRECT_CHANNELS</h4>

            <div className="contact-action-list">
              
              {/* Email Copy Card */}
              <div className="contact-box">
                <div className="contact-info">
                  <span className="contact-type mono">EMAIL</span>
                  <a href={`mailto:${resumeData.personal.email}`} className="contact-val mono">
                    {resumeData.personal.email}
                  </a>
                </div>
                <button
                  onClick={() => copyToClipboard(resumeData.personal.email, 'email')}
                  className="copy-btn"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copiedField === 'email' ? <Check size={16} className="copied-icon" /> : <Copy size={16} />}
                </button>
              </div>

              {/* Phone Copy Card */}
              <div className="contact-box">
                <div className="contact-info">
                  <span className="contact-type mono">TELEPHONE</span>
                  <a href={`tel:${resumeData.personal.phone.replace(/[^0-9+]/g, '')}`} className="contact-val mono">
                    {resumeData.personal.phone}
                  </a>
                </div>
                <button
                  onClick={() => copyToClipboard(resumeData.personal.phone, 'phone')}
                  className="copy-btn"
                  title="Copy phone number to clipboard"
                  aria-label="Copy phone"
                >
                  {copiedField === 'phone' ? <Check size={16} className="copied-icon" /> : <Copy size={16} />}
                </button>
              </div>

            </div>

            {/* Social Links: Symmetrical 2-Column Grid */}
            <div className="social-links-row">
              <a
                href={resumeData.personal.links.github}
                target="_blank"
                rel="noreferrer noopener"
                className="social-btn mono"
                aria-label="GitHub Profile"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                <span>GitHub</span>
              </a>
              <a
                href={resumeData.personal.links.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="social-btn mono"
                aria-label="LinkedIn Profile"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                <span>LinkedIn</span>
              </a>
            </div>

          </div>

        </div>

        {/* Bottom Colophon */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright mono">
            <span className="author-credit">© {new Date().getFullYear()} Abimanyu Jayaganesh.</span>
            <span className="colophon-divider">·</span>
            <span className="commit-note">BUILT WITH VITE · REACT 19 · THREE.JS</span>
          </div>

          <button onClick={scrollToTop} className="scroll-top-btn mono" aria-label="Scroll to top of page">
            <span>Return to Peak</span>
            <ArrowUp size={14} />
          </button>
        </div>

      </div>

      <style>{`
        .site-footer {
          position: relative;
          padding: var(--space-16) 0 var(--space-8);
          z-index: var(--z-content);
          background: var(--bg-surface);
          border-top: 1px solid var(--border-prominent);
        }

        .footer-top-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: var(--space-12);
          margin-bottom: var(--space-12);
        }

        .footer-brand-col {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
          max-width: 520px;
        }

        .footer-brand-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .footer-seal {
          width: 28px;
          height: 28px;
          background: var(--accent-primary);
          color: #FFF;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-sm);
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 0.6875rem;
          letter-spacing: 0.05em;
          box-shadow: var(--shadow-accent);
        }

        .footer-name {
          font-size: 1.375rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .footer-bio {
          font-size: 0.9375rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .footer-location {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8125rem;
          color: var(--text-muted);
        }

        .location-icon {
          color: var(--accent-primary);
        }

        .footer-contact-col {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .contact-col-title {
          font-size: 0.75rem;
          color: var(--accent-primary);
          letter-spacing: 0.05em;
        }

        .contact-action-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .contact-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-3) var(--space-4);
          background: var(--bg-primary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          transition: border-color var(--transition-fast);
        }

        .contact-box:hover {
          border-color: var(--border-prominent);
        }

        .contact-info {
          display: flex;
          flex-direction: column;
        }

        .contact-type {
          font-size: 0.6875rem;
          color: var(--text-muted);
          letter-spacing: 0.04em;
        }

        .contact-val {
          font-family: var(--font-mono);
          font-size: 0.875rem;
          color: var(--text-primary);
          letter-spacing: 0.02em;
          transition: color var(--transition-fast);
        }

        .contact-val:hover {
          color: var(--accent-primary);
        }

        .copy-btn {
          padding: 8px;
          color: var(--text-muted);
          transition: color var(--transition-fast);
          border-radius: var(--radius-sm);
        }

        .copy-btn:hover {
          color: var(--accent-primary);
        }

        .copied-icon {
          color: var(--accent-primary);
        }

        .social-links-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-3);
          margin-top: var(--space-2);
          width: 100%;
        }

        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          height: 42px;
          background: var(--bg-primary);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          font-size: 0.75rem;
          font-weight: 500;
          border-radius: var(--radius-sm);
          transition: border-color var(--transition-fast), color var(--transition-fast), background var(--transition-fast);
          width: 100%;
          box-sizing: border-box;
        }

        .social-btn:hover {
          border-color: var(--accent-primary);
          color: var(--text-primary);
          background: var(--bg-surface-elevated);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
        }

        .footer-bottom-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: var(--space-8);
          border-top: 1px solid var(--border-subtle);
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .footer-copyright {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .author-credit {
          color: var(--text-primary);
          font-weight: 600;
          letter-spacing: 0.03em;
        }

        .colophon-divider {
          color: var(--border-prominent);
          opacity: 0.6;
        }

        .commit-note {
          color: var(--text-muted);
          font-size: 0.6875rem;
          letter-spacing: 0.08em;
          opacity: 0.75;
        }

        .scroll-top-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--text-muted);
          transition: color var(--transition-fast);
        }

        .scroll-top-btn:hover {
          color: var(--accent-primary);
        }

        @media (max-width: 850px) {
          .footer-top-grid {
            grid-template-columns: 1fr;
            gap: var(--space-8);
          }
        }
      `}</style>
    </footer>
  );
};
