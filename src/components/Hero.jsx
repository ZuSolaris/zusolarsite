import React from 'react';
import { Sparkles, Terminal, Award, Cpu, ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="container hero-container">

        {/* Availability / Status Pill */}
        <div className="hero-pill-row">
          <div className="status-badge">
            <span className="status-indicator"></span>
            <span>Research Oriented and Multi-Modal Designer</span>
          </div>
          <div className="identity-pills">
            <span className="tag-pill">Hardware & AI</span>
            <span className="tag-pill">Cognitive Based Design</span>
            <span className="tag-pill">Impact Based Results</span>
          </div>
        </div>

        {/* Hero Title & Logo Row */}
        <div className="hero-main-layout">
          <div className="hero-heading-group">
            <p className="hero-eyebrow">
              <Terminal size={16} className="inline-icon" />
              <span>From Submarine Data Specialist <span className="text-muted">➔</span> Interaction Designer</span>
            </p>
            <h1 className="hero-title">
              The future has a first draft,<br />
              and <span className="gradient-text">I am part of it.</span>
            </h1>
            <p className="hero-description">
              I’m <strong>Zoe Unica Solaris</strong> an Interaction Designer and systems researcher bridging
              physical hardware, large language models, and human dignity. From operating secure communication systems on nuclear submarines
              to physics research and publishing media, such as working game demos and children's books, I build interfaces that encourage agency.
            </p>
          </div>

          <div className="hero-logo-showcase">
            <div className="hero-logo-halo"></div>
            <img src="/logo.png" alt="Zoe Solaris Emblem" className="hero-emblem-img" />
          </div>
        </div>

        {/* Highlight Highlights */}
        <div className="hero-stats-grid">
          <div className="hero-stat-card glass-panel">
            <div className="stat-icon award">
              <Award size={20} />
            </div>
            <div className="stat-body">
              <span className="stat-number">Best in Engineering</span>
              <span className="stat-label">Oregon State Univ. PNW LSAMP 2025</span>
            </div>
          </div>

          <div className="hero-stat-card glass-panel">
            <div className="stat-icon tech">
              <Cpu size={20} />
            </div>
            <div className="stat-body">
              <span className="stat-number">0.67 nm / px</span>
              <span className="stat-label">Custom GNU Octave Metrology Tool</span>
            </div>
          </div>

          <div className="hero-stat-card glass-panel">
            <div className="stat-icon creative">
              <Sparkles size={20} />
            </div>
            <div className="stat-body">
              <span className="stat-number">Published Works</span>
              <span className="stat-label">Game on Itch.io & Children’s Book</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="hero-actions">
          <a href="#projects" className="btn btn-frutiger-solar btn-lg">
            <span>Explore Case Studies</span>
            <ArrowDown size={18} />
          </a>
          <a href="#bio" className="btn btn-frutiger-outline btn-lg">
            <Terminal size={18} />
            <span>About & Story</span>
          </a>
        </div>

      </div>

    </section>
  );
}
