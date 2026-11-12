import React, { useState, useEffect, useCallback } from 'react';
import FlowShaderCanvas from './components/FlowShaderCanvas';
import UnderwaterShaderCanvas from './components/UnderwaterShaderCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import BioStory from './components/BioStory';
import Footer from './components/Footer';
import ProjectDetailPage from './components/ProjectDetailPage';
import DesignTokensViewer from './components/DesignTokensViewer';
import { projects } from './data/projects';
import './App.css';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('solaris_theme') || 'dark';
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const [designTokensOpen, setDesignTokensOpen] = useState(false);

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

  // Escape key listener for tokens viewer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && designTokensOpen) {
        setDesignTokensOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [designTokensOpen]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const isModalActive = Boolean(designTokensOpen);

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
          />
        ) : (
          /* Portfolio Main Landing Page */
          <>
            {/* Hero Section with Zoe's Story & Accolades */}
            <Hero />


            {/* Featured Case Studies Grid with Category Filtering */}
            <ProjectGrid
              onSelectProject={handleSelectProject}
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
    </div>
  );
}
