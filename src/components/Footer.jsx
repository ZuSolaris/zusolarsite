import React from 'react';
import { Mail, Download, FileText, ArrowUp, Heart, Terminal, ExternalLink, Globe, Code2 } from 'lucide-react';
import { personalBio } from '../data/projects';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="portfolio-footer frutiger-solar-footer">
      <div className="frutiger-grill-pattern"></div>
      <div className="container footer-container">
        
        {/* Contact Banner */}
        <div className="footer-cta-card">
          <div className="footer-cta-text">
            <span className="pill-badge award">Solar Aero Design System</span>
            <h3 className="footer-cta-heading">
              Let’s build human-first futures <span className="gradient-text">together</span>.
            </h3>
            <p className="footer-cta-sub">
              Seeking Interaction Design (IxD), UI/UX, or Systems Design roles where rigor, 
              curiosity, and lived experience matter.
            </p>
          </div>

          <div className="footer-cta-actions">
            <a 
              href={`mailto:${personalBio.email}`} 
              className="btn btn-frutiger-solar btn-lg"
            >
              <Mail size={18} />
              <span>{personalBio.email}</span>
            </a>
            <a 
              href={personalBio.linkedin} 
              target="_blank" 
              rel="noreferrer" 
              className="btn btn-frutiger-outline btn-lg"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span>LinkedIn</span>
            </a>
            <a 
              href={personalBio.website} 
              target="_blank" 
              rel="noreferrer" 
              className="btn btn-outline btn-lg"
            >
              <Globe size={18} />
              <span>zusolaris.space</span>
            </a>
          </div>
        </div>

        {/* Footer Meta Row */}
        <div className="footer-bottom-row">
          
          <div className="footer-brand-info">
            <div className="footer-brand-title">{personalBio.name}</div>
            <p className="footer-tagline">“The future has a first draft, and I’m part of it.”</p>
            <p className="footer-copyright">
              Seattle, WA • {personalBio.phone} • {personalBio.email}
            </p>
          </div>

          <div className="footer-links-group">
            <div className="footer-links-col">
              <span className="col-header">Quick Downloads</span>
              <a href="/Zoe_Solaris_Resume.pdf" download className="footer-link">
                <Download size={14} />
                <span>Resume (PDF)</span>
              </a>
              <a href="/Zoe_Solaris_IxD_Portfolio.pdf" download className="footer-link">
                <FileText size={14} />
                <span>25p Portfolio Slide Deck</span>
              </a>
            </div>

            <div className="footer-links-col">
              <span className="col-header">Connect</span>
              <a href={personalBio.linkedin} target="_blank" rel="noreferrer" className="footer-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span>linkedin.com/in/zusolaris</span>
              </a>
              <a href="https://itch.io" target="_blank" rel="noreferrer" className="footer-link">
                <ExternalLink size={14} />
                <span>Melon on Itch.io</span>
              </a>
            </div>

            <div className="footer-scroll-top">
              <button onClick={scrollToTop} className="scroll-top-btn" title="Back to top">
                <ArrowUp size={18} />
                <span>Back to Top</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
