import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, X } from 'lucide-react';
import FlowShaderCanvas from './components/FlowShaderCanvas';
import UnderwaterShaderCanvas from './components/UnderwaterShaderCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import BioStory from './components/BioStory';
import Footer from './components/Footer';
import CaseStudyModal from './components/CaseStudyModal';
import DesignTokensViewer from './components/DesignTokensViewer';
import HuskEShowcase from './components/HuskEShowcase';
import { projects } from './data/projects';
import './App.css';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('solaris_theme') || 'dark';
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const [designTokensOpen, setDesignTokensOpen] = useState(false);
  const [huskShowcaseOpen, setHuskShowcaseOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('solaris_theme', theme);
  }, [theme]);

  // Escape key listener for the HUSK-E showcase modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && huskShowcaseOpen) {
        setHuskShowcaseOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [huskShowcaseOpen]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const isAnyModalOpen = Boolean(selectedProject || designTokensOpen || huskShowcaseOpen);

  return (
    <div className="portfolio-app">
      {/* High-Performance Underwater Caustics & Oceanic Depth Shader (Universal Global Backdrop) */}
      <UnderwaterShaderCanvas theme={theme} isModalOpen={isAnyModalOpen} />

      {/* Surface Fluid Flow Shader (Runs exclusively at the Hero section; auto-pauses when scrolled past) */}
      <FlowShaderCanvas theme={theme} isModalOpen={isAnyModalOpen} />

      <div className="ambient-grid"></div>

      {/* Main Navigation */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenDesignTokens={() => setDesignTokensOpen(true)}
        onOpenHuskShowcase={() => setHuskShowcaseOpen(true)}
      />

      <main>
        {/* Hero Section with Zoe's Story & Accolades */}
        <Hero />

        {/* Spotlight Teaser: HUSK-E Interactive Companion */}
        <section className="husk-teaser-strip">
          <div className="container">
            <div className="husk-teaser-card glass-panel">
              <div className="husk-teaser-left">
                <div className="pill-badge award">
                  <Sparkles size={13} className="inline-icon" />
                  <span>Interactive Systems Spotlight</span>
                </div>
                <h3 className="husk-teaser-title">
                  HUSK-E <span className="title-divider">•</span> <span className="gradient-text">The Physical AND Gate</span>
                </h3>
                <p className="husk-teaser-desc">
                  Handheld pro-social companion for UW freshmen. Engineered with ESP32-S3 ($19.38 BOM), zero-app NFC pairing, and a 6-phase friendship state machine.
                </p>
              </div>
              <div className="husk-teaser-actions">
                <button 
                  onClick={() => setHuskShowcaseOpen(true)}
                  className="btn btn-frutiger-solar btn-md"
                >
                  <Sparkles size={16} />
                  <span>Launch 1:1 Simulator</span>
                </button>
                <button 
                  onClick={() => {
                    const huskE = projects.find(p => p.id === 'husk-e');
                    if (huskE) setSelectedProject(huskE);
                  }}
                  className="btn btn-frutiger-outline btn-md"
                >
                  <span>View Case Study</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Case Studies Grid with Category Filtering */}
        <ProjectGrid 
          onSelectProject={setSelectedProject} 
          onOpenHuskShowcase={() => setHuskShowcaseOpen(true)}
        />

        {/* Bio, Military Experience, Neurodiversity, and Skills Matrix */}
        <BioStory />
      </main>

      {/* Footer with Contact and Links */}
      <Footer />

      {/* Full-Bleed Interactive Case Study Modal */}
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          projects={projects}
          onSelectProject={setSelectedProject}
          onClose={() => setSelectedProject(null)}
          onOpenHuskShowcase={() => setHuskShowcaseOpen(true)}
        />
      )}

      {/* Design System Tokens Spec Viewer */}
      <DesignTokensViewer
        isOpen={designTokensOpen}
        onClose={() => setDesignTokensOpen(false)}
      />

      {/* 1:1 Interactive HUSK-E Showcase Fullscreen Modal Overlay */}
      {huskShowcaseOpen && (
        <div 
          className="modal-overlay" 
          onClick={() => setHuskShowcaseOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="HUSK-E Interactive Showcase"
        >
          <div 
            className="modal-container glass-panel" 
            style={{ maxWidth: '1180px', maxHeight: '92vh', width: '96%' }}
            onClick={(e) => e.stopPropagation()}
          >
            <header className="modal-sticky-header">
              <div className="modal-header-meta">
                <span className="pill-badge subtle">Hardware &amp; AI IxD</span>
                <span className="pill-badge award">
                  <Sparkles size={13} className="inline-icon" />
                  <span>1:1 Interactive Simulator</span>
                </span>
              </div>
              <button 
                onClick={() => setHuskShowcaseOpen(false)} 
                className="modal-close-btn" 
                aria-label="Close Showcase"
              >
                <X size={20} />
              </button>
            </header>
            <div className="modal-body-scroll" style={{ padding: '0 0 2rem' }}>
              <HuskEShowcase 
                onOpenCaseStudy={() => {
                  setHuskShowcaseOpen(false);
                  const huskE = projects.find(p => p.id === 'husk-e');
                  if (huskE) setSelectedProject(huskE);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
