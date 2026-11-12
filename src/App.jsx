import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles, ArrowRight, X } from 'lucide-react';
import FlowShaderCanvas from './components/FlowShaderCanvas';
import UnderwaterShaderCanvas from './components/UnderwaterShaderCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import BioStory from './components/BioStory';
import Footer from './components/Footer';
import ProjectDetailPage from './components/ProjectDetailPage';
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

  // Sync state with URL hash (e.g. #/project/husk-e or #project-husk-e)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const match = hash.match(/#\/?project[/-]([a-z0-9-]+)/i);
      if (match && match[1]) {
        const found = projects.find(p => p.id === match[1]);
        if (found) {
          setSelectedProject(found);
          return;
        }
      }
      // If returning to home anchors, close the project page
      if (!hash || hash === '#projects' || hash === '#hero' || hash === '#bio' || hash === '#contact') {
        setSelectedProject(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const handleSelectProject = useCallback((project) => {
    setSelectedProject(project);
    if (project) {
      window.location.hash = `#/project/${project.id}`;
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      if (window.location.hash.includes('project')) {
        window.history.pushState(null, '', window.location.pathname + '#projects');
      }
    }
  }, []);

  const handleBackToHome = useCallback(() => {
    setSelectedProject(null);
    if (window.location.hash.includes('project')) {
      window.history.pushState(null, '', window.location.pathname + '#projects');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Escape key listener for the HUSK-E showcase modal & tokens viewer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (huskShowcaseOpen) setHuskShowcaseOpen(false);
        else if (designTokensOpen) setDesignTokensOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [huskShowcaseOpen, designTokensOpen]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const isModalActive = Boolean(designTokensOpen || huskShowcaseOpen);

  return (
    <div className="portfolio-app">
      {/* High-Performance Underwater Caustics & Oceanic Depth Shader (Universal Global Backdrop) */}
      <UnderwaterShaderCanvas theme={theme} isModalOpen={isModalActive} />

      {/* Surface Fluid Flow Shader (Runs exclusively when on the Hero section) */}
      {!selectedProject && (
        <FlowShaderCanvas theme={theme} isModalOpen={isModalActive} />
      )}

      <div className="ambient-grid"></div>

      {/* Main Navigation */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenDesignTokens={() => setDesignTokensOpen(true)}
        onOpenHuskShowcase={() => setHuskShowcaseOpen(true)}
        selectedProject={selectedProject}
        onBackToHome={handleBackToHome}
      />

      <main>
        {selectedProject ? (
          /* Dedicated Project Case Study Page */
          <ProjectDetailPage
            project={selectedProject}
            projects={projects}
            onSelectProject={handleSelectProject}
            onBack={handleBackToHome}
            onOpenHuskShowcase={() => setHuskShowcaseOpen(true)}
          />
        ) : (
          /* Portfolio Main Landing Page */
          <>
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
                      Handheld adaptive companion for UW freshmen. Designed around the ESP32 microcontroller, zero-app NFC pairing, and a 6-phase friendship state machine.
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
                        if (huskE) handleSelectProject(huskE);
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
              onSelectProject={handleSelectProject}
              onOpenHuskShowcase={() => setHuskShowcaseOpen(true)}
            />

            {/* Bio, Military Experience, Neurodiversity, and Skills Matrix */}
            <BioStory />
          </>
        )}
      </main>

      {/* Footer with Contact and Links */}
      <Footer onBackToHome={handleBackToHome} />

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
            className="modal-container glass-panel husk-simulator-modal"
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
                  if (huskE) handleSelectProject(huskE);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
