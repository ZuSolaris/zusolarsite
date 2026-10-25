import React, { useState } from 'react';
import { ArrowRight, Sparkles, Filter, ExternalLink, Layers, Award } from 'lucide-react';
import { projects } from '../data/projects';

const categories = [
  'All',
  'Interaction & Systems',
  'Physical & Hardware',
  'Spatial & 3D',
  'Editorial & Participatory',
  'Web & UI'
];

export default function ProjectGrid({ onSelectProject }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="section projects-section">
      <div className="container">

        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <Layers size={16} />
            <span>Curated Case Studies</span>
          </div>
          <h2 className="section-title">
            Featured Works in <span className="gradient-text">Interaction & Systems</span>
          </h2>
          <p className="section-description">
            Each project explores a fundamental question of human autonomy, spatial justice, or physical computing.
          </p>
        </div>

        {/* Category Filters */}
        <div className="category-filter-row">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
            >
              <span>{cat}</span>
              <span className="count-badge">
                {cat === 'All' ? projects.length : projects.filter(p => p.category === cat).length}
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="project-card glass-panel"
              onClick={() => onSelectProject(project)}
            >
              {/* Media Preview */}
              <div className="card-media-wrapper">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="card-media-img"
                  loading="lazy"
                />
                <div className="card-media-overlay">
                  <span className="view-case-study-badge">
                    <span>Read Deep Dive</span>
                    <ArrowRight size={14} />
                  </span>
                </div>

                {project.badge && (
                  <div className={`card-badge-pill ${project.badge.includes('Best') ? 'award' : ''}`}>
                    {project.badge.includes('Best') && <Award size={12} className="inline-icon" />}
                    <span>{project.badge}</span>
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="card-body">
                <div className="card-meta-row">
                  <span className="card-category">{project.category}</span>
                  <span className="card-timeframe">{project.timeframe}</span>
                </div>

                <h3 className="card-title">{project.title}</h3>
                <p className="card-subtitle">{project.subtitle}</p>

                {/* How Might We Quote */}
                <div className="card-hmw-box">
                  <span className="hmw-tag">How Might We:</span>
                  <p className="hmw-text">{project.howMightWe}</p>
                </div>

                {/* Tags */}
                <div className="card-tags-row">
                  {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="card-tag">{tag}</span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="card-tag more">+{project.tags.length - 3}</span>
                  )}
                </div>

                {/* Footer Action */}
                <div className="card-footer">
                  <button className="card-action-btn">
                    <span>Inspect Case Study</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
