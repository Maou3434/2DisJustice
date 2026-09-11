import React, { useState } from 'react';
import resumeData from '../../../data/resume_data.json';
import { Mail, Phone, MapPin, Copy, Check, ArrowUp, ExternalLink } from 'lucide-react';
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
      {/* Deep Obsidian Mist Backdrop */}
      <div className="contact-dark-backdrop" aria-hidden="true" />

      {/* Side Numbered Chapter Watermark */}
      <div className="section-backdrop-watermark" aria-hidden="true">
        <span className="wm-number mono">07</span>
        <div className="wm-equation mono">DISPATCH // DIRECT ENCRYPTED CHANNELS</div>
      </div>

      <div className="container scene-content footer-content">
        
        {/* Editorial Scene Header */}
        <div className="scene-head-editorial">
          <div className="scene-head-top">
            <div className="scene-head-left">
              <span className="scene-eyebrow">07 // TERMINAL DISPATCH &amp; CONTACT</span>
              <h2 className="scene-title-editorial">
                Initiate Connection
              </h2>
            </div>
            <p className="scene-head-right-subtext">
              DIRECT COMMUNICATION CHANNELS, REPOSITORY ARCHIVES, AND RESEARCH INQUIRIES. DISPATCH VIA ENCRYPTED TELEMETRY.
            </p>
          </div>
          <div className="scene-divider-rule" />
        </div>

        {/* 2-Column Contact Layout */}
        <div className="footer-main-grid">
          
          {/* Left Column: Identity & Bio */}
          <div className="footer-identity-col">
            <div className="footer-brand-lockup">
              <div className="footer-seal mono">
                <span>AJ</span>
              </div>
              <div className="footer-name-group">
                <h3 className="footer-name">{resumeData.personal.name}</h3>
                <span className="footer-tagline mono">{resumeData.personal.headline}</span>
              </div>
            </div>

            <p className="footer-bio-text">
              Computer Science Engineer and researcher investigating Physics-Informed ML, thermal digital twins, high-throughput analytical lakehouses, and GPU pipelines.
            </p>

            <div className="footer-location-row mono">
              <MapPin size={14} className="location-icon" />
              <span>{resumeData.personal.location}</span>
              <span className="location-dot">•</span>
              <span className="availability-tag">OPEN FOR HIGH-COMPUTE ROLES</span>
            </div>

            <div className="footer-copyright-row mono">
              <span>© {new Date().getFullYear()} ABIMANYU JAYAGANESH · ALL RIGHTS RESERVED</span>
            </div>
          </div>

          {/* Right Column: Interactive Direct Channels */}
          <div className="footer-actions-col">
            <h4 className="channels-title mono">// DIRECT_COMMUNICATION_CHANNELS</h4>

            <div className="channels-card-list">
              
              {/* Email Box */}
              <div className="direct-channel-card">
                <div className="channel-icon-col">
                  <Mail size={16} />
                </div>
                <div className="channel-meta-col">
                  <span className="channel-label mono">EMAIL DISPATCH</span>
                  <a href={`mailto:${resumeData.personal.email}`} className="channel-val mono">
                    {resumeData.personal.email}
                  </a>
                </div>
                <button
                  onClick={() => copyToClipboard(resumeData.personal.email, 'email')}
                  className="channel-copy-btn"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copiedField === 'email' ? <Check size={14} className="copied-icon" /> : <Copy size={14} />}
                </button>
              </div>

              {/* Phone Box */}
              <div className="direct-channel-card">
                <div className="channel-icon-col">
                  <Phone size={16} />
                </div>
                <div className="channel-meta-col">
                  <span className="channel-label mono">VOICE / TELEPHONE</span>
                  <a href={`tel:${resumeData.personal.phone.replace(/[^0-9+]/g, '')}`} className="channel-val mono">
                    {resumeData.personal.phone}
                  </a>
                </div>
                <button
                  onClick={() => copyToClipboard(resumeData.personal.phone, 'phone')}
                  className="channel-copy-btn"
                  title="Copy phone to clipboard"
                  aria-label="Copy phone"
                >
                  {copiedField === 'phone' ? <Check size={14} className="copied-icon" /> : <Copy size={14} />}
                </button>
              </div>

            </div>

            {/* Social Links & Back to Top */}
            <div className="footer-bottom-actions">
              <div className="social-links-group">
                <a
                  href={resumeData.personal.links.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="social-btn mono"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  <span>GITHUB</span>
                  <ExternalLink size={12} />
                </a>

                <a
                  href={resumeData.personal.links.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="social-btn mono"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  <span>LINKEDIN</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              <button onClick={scrollToTop} className="scroll-top-btn mono" aria-label="Return to Prologue">
                <span>PROLOGUE</span>
                <ArrowUp size={14} />
              </button>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        .site-footer {
          background-color: #06070A;
        }

        .contact-dark-backdrop {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 60% at 50% 50%, rgba(200, 50, 38, 0.08) 0%, transparent 60%), #06070A;
          pointer-events: none;
          z-index: 0;
        }

        .footer-content {
          padding-top: clamp(1rem, 2.5vh, 2rem);
          padding-bottom: clamp(1rem, 2.5vh, 2rem);
        }

        .footer-main-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: clamp(1.5rem, 4vw, 3.5rem);
          margin-top: clamp(0.75rem, 2vh, 1.5rem);
        }

        /* Left Column */
        .footer-identity-col {
          display: flex;
          flex-direction: column;
          gap: clamp(0.6rem, 1.5vh, 1rem);
        }

        .footer-brand-lockup {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .footer-seal {
          width: 32px;
          height: 32px;
          background: var(--accent-primary);
          color: #FFF;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-sm);
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
          box-shadow: 0 0 16px rgba(200, 50, 38, 0.4);
        }

        .footer-name-group {
          display: flex;
          flex-direction: column;
        }

        .footer-name {
          font-family: var(--font-body);
          font-size: clamp(1.15rem, 1.5vw, 1.45rem);
          font-weight: 700;
          color: #FFFFFF;
          line-height: 1.1;
        }

        .footer-tagline {
          font-size: 0.6875rem;
          color: #9CA3AF;
          margin-top: 2px;
        }

        .footer-bio-text {
          font-size: clamp(0.78125rem, 0.95vw, 0.875rem);
          line-height: 1.55;
          color: #D1D5DB;
          max-width: 540px;
        }

        .footer-location-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          color: #9CA3AF;
        }

        .location-icon {
          color: #F59E0B;
        }

        .location-dot {
          color: #4B5563;
        }

        .availability-tag {
          color: #10B981;
          font-weight: 700;
        }

        .footer-copyright-row {
          font-size: 0.625rem;
          color: #6B7280;
          letter-spacing: 0.08em;
          margin-top: auto;
          padding-top: 8px;
        }

        /* Right Column */
        .footer-actions-col {
          display: flex;
          flex-direction: column;
          gap: clamp(0.6rem, 1.5vh, 1rem);
        }

        .channels-title {
          font-size: 0.6875rem;
          color: var(--accent-primary);
          letter-spacing: 0.1em;
        }

        .channels-card-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .direct-channel-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 14px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-sm);
          transition: border-color 180ms ease, background 180ms ease;
        }

        .direct-channel-card:hover {
          border-color: rgba(200, 50, 38, 0.4);
          background: rgba(255, 255, 255, 0.06);
        }

        .channel-icon-col {
          color: var(--accent-primary);
          display: flex;
          align-items: center;
        }

        .channel-meta-col {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .channel-label {
          font-size: 0.5625rem;
          color: #6B7280;
          letter-spacing: 0.08em;
        }

        .channel-val {
          font-size: clamp(0.75rem, 0.95vw, 0.8125rem);
          color: #F5EFE6;
          transition: color 150ms ease;
        }

        .channel-val:hover {
          color: var(--accent-primary);
        }

        .channel-copy-btn {
          color: #9CA3AF;
          padding: 6px;
          border-radius: var(--radius-sm);
          transition: color 150ms ease, background 150ms ease;
        }

        .channel-copy-btn:hover {
          color: #FFFFFF;
          background: rgba(255, 255, 255, 0.08);
        }

        .copied-icon {
          color: var(--accent-primary);
        }

        .footer-bottom-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 4px;
          gap: 12px;
        }

        .social-links-group {
          display: flex;
          gap: 10px;
        }

        .social-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.6875rem;
          font-weight: 700;
          color: #9CA3AF;
          padding: 6px 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-sm);
          transition: all 150ms ease;
        }

        .social-btn:hover {
          color: #F5EFE6;
          border-color: var(--accent-primary);
          background: rgba(200, 50, 38, 0.08);
        }

        .scroll-top-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.6875rem;
          font-weight: 700;
          color: var(--accent-primary);
          padding: 6px 12px;
          border: 1px solid rgba(200, 50, 38, 0.35);
          border-radius: var(--radius-sm);
          transition: all 150ms ease;
        }

        .scroll-top-btn:hover {
          background: var(--accent-primary);
          color: #FFFFFF;
          box-shadow: 0 0 16px var(--accent-glow);
        }

        @media (max-width: 900px) {
          .footer-main-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
