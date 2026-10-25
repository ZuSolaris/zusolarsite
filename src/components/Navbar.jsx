import React, { useState, useEffect } from 'react';
import { Sparkles, Sun, Moon, FileText, Download, Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ theme, toggleTheme, onOpenDesignTokens }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} frutiger-solar-nav`}>
      <div className="container nav-content">
        <a href="#hero" className="nav-brand">
          <img src="/logo.png" alt="Zoe Solaris Logo" className="nav-brand-logo frutiger-solar-badge" />
          <div className="brand-text">
            <span className="brand-name">Zoe Solaris</span>
            <span className="brand-title">IxD & Systems • Solar Aero</span>
          </div>
        </a>

        {/* Desktop Navigation Links inside Recessed Chassis Tray */}
        <div className="nav-links nav-socket-tray">
          <a href="#projects" className="nav-link nav-keycap">Case Studies</a>
          <a href="#sandboxes" className="nav-link nav-keycap">Interactive Labs</a>
          <a href="#bio" className="nav-link nav-keycap">About & Story</a>
          <button onClick={onOpenDesignTokens} className="nav-link nav-keycap tokens-btn" title="View Design System Tokens">
            Design Tokens <span className="mono-tag">Solar Aero</span>
          </button>
        </div>

        {/* Desktop Actions inside Distinct Socket Cutouts */}
        <div className="nav-actions">
          <div className="button-socket">
            <button 
              onClick={toggleTheme} 
              className="icon-btn theme-toggle btn-frutiger-outline btn-socket-inner" 
              aria-label="Toggle Theme"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </div>

          <div className="button-socket">
            <a 
              href="/Zoe_Solaris_Resume.pdf" 
              download 
              className="btn btn-frutiger-outline btn-sm btn-socket-inner"
              title="Download Zoe Solaris Resume PDF"
            >
              <Download size={14} />
              <span>Resume</span>
            </a>
          </div>

          <div className="button-socket">
            <a 
              href="#contact" 
              className="btn btn-frutiger-solar btn-sm btn-socket-inner"
            >
              <span>Get in Touch</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="icon-btn mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="mobile-link">Case Studies</a>
          <a href="#sandboxes" onClick={() => setMobileMenuOpen(false)} className="mobile-link">Interactive Labs</a>
          <a href="#bio" onClick={() => setMobileMenuOpen(false)} className="mobile-link">About & Story</a>
          <button 
            onClick={() => { onOpenDesignTokens(); setMobileMenuOpen(false); }} 
            className="mobile-link text-left"
          >
            Design Tokens Spec
          </button>
          <div className="mobile-actions">
            <a 
              href="/Zoe_Solaris_Resume.pdf" 
              download 
              className="btn btn-outline"
            >
              <Download size={16} />
              <span>Download Resume</span>
            </a>
            <a 
              href="/Zoe_Solaris_IxD_Portfolio.pdf" 
              download 
              className="btn btn-outline"
            >
              <FileText size={16} />
              <span>Original PDF Portfolio</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
