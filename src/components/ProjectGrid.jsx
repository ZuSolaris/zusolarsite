import React, { useState } from 'react';
import { ArrowRight, Layers, Award, Star, CheckCircle2, Play } from 'lucide-react';
import VideoPlayer from './VideoPlayer';
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

  // Top 3 Work specifically curated for Design Recruiters
  const topProjects = [
    projects.find(p => p.id === 'husk-e'),
    projects.find(p => p.id === 'melon'),
    projects.find(p => p.id === 'solari')
  ].filter(Boolean);

  // Archive / Category filtered projects
  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="section projects-section">
      <div className="container">

        {/* ====================================================================
            If your an engineer and you can read this congrats! Yes I can design, yes I can navigate react. :p
            ==================================================================== */}
        <div className="recruiter-spotlight-wrapper">
          <div className="section-header recruiter-header">
            <div className="recruiter-pill-row">
              <span className="pill-badge award">
                <Star size={13} className="inline-icon" />
                <span>Top 3 Showcase (Notice Me) ;)</span>
              </span>

            </div>
            <h2 className="section-title">
              Top 3 Works: <span className="gradient-text">Core IxD & Systems</span>
            </h2>
            <p className="section-description">
              If you have 3 minutes, start here. Curated specifically for design recruiters to evaluate end-to-end hardware-software logic, behavioral systems psychology, and cybernetic local-first AI.
            </p>
          </div>

          {/* Top 3 Work Cards Grid */}
          <div className="top-work-grid">
            {topProjects.map((project, idx) => (
              <article
                key={project.id}
                className="project-card top-work-card glass-panel"
                onClick={() => onSelectProject(project)}
              >
                {/* Top 3 Rank Header Ribbon */}
                <div className="top-work-banner">
                  <div className="rank-badge-pill">
                    <span className="rank-num">0{idx + 1}</span>
                    <span className="rank-divider">•</span>
                    <span className="rank-label">{project.recruiterTag || project.category}</span>
                  </div>
                </div>

                {/* Media Preview */}
                <div className="card-media-wrapper top-card-media">
                  {(project.video || project.youtubeUrl || project.youtubeId) ? (
                    <VideoPlayer
                      youtubeUrl={project.youtubeUrl}
                      youtubeId={project.youtubeId}
                      videoSrc={project.video}
                      poster={project.heroImage}
                      title={project.videoTitle || `${project.title} Video Demo`}
                      badge={project.badge}
                      mode="card"
                      onOpenModal={() => onSelectProject(project)}
                    />
                  ) : (
                    <>
                      <img
                        src={project.heroImage}
                        alt={project.title}
                        className="card-media-img"
                        loading="eager"
                      />
                      <div className="card-media-overlay">
                        <span className="view-case-study-badge">
                          <span>Read Full Deep Dive</span>
                          <ArrowRight size={14} />
                        </span>
                      </div>

                      {project.badge && (
                        <div className={`card-badge-pill ${project.badge.includes('Best') ? 'award' : ''}`}>
                          {project.badge.includes('Best') && <Award size={12} className="inline-icon" />}
                          <span>{project.badge}</span>
                        </div>
                      )}
                    </>
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

                  {/* Recruiter Competency Box */}
                  {project.recruiterTakeaway && (
                    <div className="recruiter-takeaway-box">
                      <span className="takeaway-label">
                        <CheckCircle2 size={12} className="inline-icon" />
                        <span>Core Competency Evaluated:</span>
                      </span>
                      <p className="takeaway-text">{project.recruiterTakeaway}</p>
                    </div>
                  )}

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
                    <button className="card-action-btn top-card-btn">
                      <span>Inspect Deep Dive</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ====================================================================
            ARCHIVE & SPECIALIZED DOMAINS
            ==================================================================== */}
        <div className="archive-section-divider">
          <div className="archive-header">
            <div className="section-eyebrow">
              <Layers size={16} />
              <span>Full Portfolio & Research Archive</span>
            </div>
            <h3 className="archive-title">All Works by Domain</h3>
            <p className="section-description">
              Explore additional specialized investigations in nano-metrology, 3D modular housing, participatory publishing, and institutional web systems.
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
                  {(project.video || project.youtubeUrl || project.youtubeId) ? (
                    <VideoPlayer
                      youtubeUrl={project.youtubeUrl}
                      youtubeId={project.youtubeId}
                      videoSrc={project.video}
                      poster={project.heroImage}
                      title={project.videoTitle || `${project.title} Video Demo`}
                      badge={project.badge}
                      mode="card"
                      onOpenModal={() => onSelectProject(project)}
                    />
                  ) : (
                    <>
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
                    </>
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

      </div>
    </section>
  );
}

