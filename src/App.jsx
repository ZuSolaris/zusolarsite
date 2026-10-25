import React, { useState, useEffect } from 'react';
import FlowShaderCanvas from './components/FlowShaderCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import IxDSandbox from './components/IxDSandbox';
import BioStory from './components/BioStory';
import Footer from './components/Footer';
import CaseStudyModal from './components/CaseStudyModal';
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

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="portfolio-app">
      {/* Interactive GLSL Fluid Flow Shader & Ambient Grid */}
      <FlowShaderCanvas theme={theme} />
      <div className="ambient-grid"></div>

      {/* Main Navigation */}
      <Navbar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        onOpenDesignTokens={() => setDesignTokensOpen(true)} 
      />

      <main>
        {/* Hero Section with Zoe's Story & Accolades */}
        <Hero onOpenCaseStudy={setSelectedProject} />

        {/* Featured Case Studies Grid with Category Filtering */}
        <ProjectGrid onSelectProject={setSelectedProject} />

        {/* Interactive Interaction Design Labs / Prototypes */}
        <IxDSandbox />

        {/* Bio, Military Experience, Neurodiversity, and Skills Matrix */}
        <BioStory />
      </main>

      {/* Footer with Contact, Resume, and Original PDF Downloads */}
      <Footer />

      {/* Full-Bleed Interactive Case Study Modal */}
      {selectedProject && (
        <CaseStudyModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

      {/* Design System Tokens Spec Viewer */}
      <DesignTokensViewer 
        isOpen={designTokensOpen} 
        onClose={() => setDesignTokensOpen(false)} 
      />
    </div>
  );
}
