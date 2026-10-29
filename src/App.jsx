import React, { useState, useEffect } from 'react';
import FlowShaderCanvas from './components/FlowShaderCanvas';
import UnderwaterShaderCanvas from './components/UnderwaterShaderCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
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

  const isAnyModalOpen = Boolean(selectedProject || designTokensOpen);

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
      />

      <main>
        {/* Hero Section with Zoe's Story & Accolades */}
        <Hero />

        {/* Featured Case Studies Grid with Category Filtering */}
        <ProjectGrid onSelectProject={setSelectedProject} />


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
