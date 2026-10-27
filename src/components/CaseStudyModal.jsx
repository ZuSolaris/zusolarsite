import React, { useEffect, useState } from 'react';
import { X, Calendar, CheckCircle2, Quote, ArrowLeft, ArrowRight, ZoomIn, ChevronLeft, ChevronRight, FileText } from 'lucide-react';

export default function CaseStudyModal({ project, projects = [], onSelectProject, onClose }) {
  const [selectedImage, setSelectedImage] = useState(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedImage) {
          setSelectedImage(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [selectedImage, onClose]);

  if (!project) return null;

  const currentIndex = projects.findIndex(p => p.id === project.id);
  const hasProjectsList = projects && projects.length > 1 && currentIndex !== -1;
  const prevProject = hasProjectsList ? (currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1]) : null;
  const nextProject = hasProjectsList ? (currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0]) : null;

  const handleNavigate = (targetProject) => {
    if (targetProject && onSelectProject) {
      setSelectedImage(null);
      onSelectProject(targetProject);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={project.title}>
      <div className="modal-container glass-panel" onClick={(e) => e.stopPropagation()}>
        
        {/* Sticky Header */}
        <header className="modal-sticky-header">
          <div className="modal-header-meta">
            <span className="pill-badge subtle">{project.category}</span>
            {project.badge && (
              <span className={`pill-badge ${project.badge.includes('Best') ? 'award' : ''}`}>
                {project.badge}
              </span>
            )}
            <span className="modal-timeframe">
              <Calendar size={13} className="inline-icon" />
              {project.timeframe}
            </span>
          </div>

          <div className="modal-header-actions">
            {hasProjectsList && (
              <div className="modal-nav-arrows">
                <button 
                  onClick={() => handleNavigate(prevProject)}
                  className="modal-icon-arrow"
                  aria-label="Previous Case Study"
                  title={`Previous: ${prevProject?.title}`}
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="modal-nav-counter">
                  {currentIndex + 1} / {projects.length}
                </span>
                <button 
                  onClick={() => handleNavigate(nextProject)}
                  className="modal-icon-arrow"
                  aria-label="Next Case Study"
                  title={`Next: ${nextProject?.title}`}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
            <button onClick={onClose} className="modal-close-btn" aria-label="Close Case Study">
              <X size={20} />
            </button>
          </div>
        </header>

        {/* Modal Scroll Content */}
        <div className="modal-body-scroll">
          
          {/* Title Area */}
          <div className="modal-title-area">
            <h2 className="modal-title">{project.title}</h2>
            <p className="modal-subtitle">{project.subtitle}</p>
          </div>

          {/* Hero Image */}
          <div 
            className="modal-hero-wrapper" 
            onClick={() => setSelectedImage(project.heroImage)}
            title="Click to view full schematic"
          >
            <img 
              src={project.heroImage} 
              alt={project.title} 
              className="modal-hero-img" 
              loading="eager"
            />
            <div className="modal-hero-hint">
              <ZoomIn size={15} />
              <span>Enlarge Diagram</span>
            </div>
          </div>

          {/* Executive Summary */}
          {project.summary && (
            <div className="modal-summary-box glass-panel">
              <span className="modal-callout-label">Executive Brief & Systems Overview:</span>
              <p className="modal-summary-text">{project.summary}</p>
            </div>
          )}

          {/* How Might We Callout */}
          {project.howMightWe && (
            <div className="modal-callout-box">
              <span className="modal-callout-label">How Might We:</span>
              <p className="modal-callout-text">{project.howMightWe}</p>
            </div>
          )}

          {/* Jobs To Be Done (JTBD) Callout */}
          {project.jobsToBeDone && (
            <div className="modal-callout-box jtbd-box">
              <span className="modal-callout-label">Jobs To Be Done (JTBD):</span>
              <p className="modal-callout-text">{project.jobsToBeDone}</p>
            </div>
          )}

          {/* Friendship Phases Focus */}
          {project.friendshipPhases && (
            <div className="modal-phases-row">
              <span className="tags-label">Friendship Phases Supported:</span>
              <div className="modal-tags-list">
                {project.friendshipPhases.map(phase => (
                  <span key={phase} className="pill-badge phase-pill">✦ {phase}</span>
                ))}
              </div>
            </div>
          )}

          {/* Core Problem & Solution Grid */}
          <div className="modal-narrative-grid">
            <div className="narrative-column glass-panel">
              <h4 className="narrative-heading">
                <span className="dot error"></span>
                <span>The Core Problem & Context</span>
              </h4>
              <p className="narrative-text">{project.problem}</p>
            </div>

            <div className="narrative-column glass-panel">
              <h4 className="narrative-heading">
                <span className="dot success"></span>
                <span>The Interaction & Systems Solution</span>
              </h4>
              <p className="narrative-text">{project.solution}</p>
            </div>
          </div>

          {/* Feasibility & BOM Analysis */}
          {project.feasibility && (
            <div className="modal-feasibility-section glass-panel">
              <div className="feasibility-header">
                <h4 className="section-mini-heading">Target BOM Analysis & Production Feasibility</h4>
                <span className="pill-badge subtle">Under $20 Target</span>
              </div>
              <div className="feasibility-stats-grid">
                <div className="feasibility-card">
                  <span className="fea-label">Exact BOM per Unit</span>
                  <span className="fea-val">{project.feasibility.unitCost}</span>
                  <span className="fea-sub">Under $20 constraint ($0.62 support margin)</span>
                </div>
                <div className="feasibility-card">
                  <span className="fea-label">UW Cohort Scale Model</span>
                  <p className="fea-text">{project.feasibility.cohortScale}</p>
                </div>
                <div className="feasibility-card">
                  <span className="fea-label">Rapid 30-Day Pilot Protocol</span>
                  <p className="fea-text">{project.feasibility.pilotTest}</p>
                </div>
              </div>
            </div>
          )}

          {/* Anticipated Pitfalls & Mitigations */}
          {project.pitfalls && (
            <div className="modal-pitfalls-section glass-panel">
              <h4 className="section-mini-heading">Anticipating Behavioral & Technical Pitfalls</h4>
              <div className="pitfalls-grid">
                {project.pitfalls.map((p, idx) => (
                  <div key={idx} className="pitfall-item">
                    <span className="pitfall-risk">{p.risk}</span>
                    <p className="pitfall-detail">{p.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Authentic Reflection Quote */}
          {project.quote && (
            <div className="modal-quote-card">
              <Quote size={28} className="quote-icon" />
              <blockquote className="quote-text">
                "{project.quote}"
              </blockquote>
              <cite className="quote-author">— Zoe Solaris, Design Reflection</cite>
            </div>
          )}

          {/* Reflection Body */}
          <div className="modal-reflection-section glass-panel">
            <h4 className="section-mini-heading">Interaction Design Reflection & Craft</h4>
            <p className="reflection-text">{project.reflection}</p>
          </div>

          {/* Image Gallery / Artifacts */}
          {project.galleryImages && project.galleryImages.length > 0 && (
            <div className="modal-gallery-section">
              <div className="gallery-header-row">
                <h4 className="section-mini-heading">Process Artifacts & Schematics</h4>
                <span className="gallery-count-badge">{project.galleryImages.length} Artifacts</span>
              </div>
              <div className="modal-gallery-grid">
                {project.galleryImages.map((img, idx) => (
                  <div 
                    key={idx} 
                    className="gallery-thumb-card" 
                    onClick={() => setSelectedImage(img)}
                    title="Click to view full resolution"
                  >
                    <img src={img} alt={`${project.title} schematic ${idx + 1}`} loading="lazy" />
                    <div className="gallery-thumb-overlay">
                      <ZoomIn size={18} />
                      <span className="zoom-text">Enlarge</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deliverables Checklist */}
          {project.deliverables && project.deliverables.length > 0 && (
            <div className="modal-deliverables-section glass-panel">
              <h4 className="section-mini-heading">Key Project Deliverables</h4>
              <div className="deliverables-grid">
                {project.deliverables.map((item, idx) => (
                  <div key={idx} className="deliverable-item">
                    <CheckCircle2 size={16} className="check-icon" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="modal-tags-section">
              <span className="tags-label">Keywords & Domains:</span>
              <div className="modal-tags-list">
                {project.tags.map(t => (
                  <span key={t} className="pill-badge subtle">{t}</span>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <footer className="modal-footer">
          <div className="modal-footer-nav">
            {hasProjectsList && (
              <>
                <button 
                  onClick={() => handleNavigate(prevProject)}
                  className="btn btn-outline btn-sm modal-prev-btn"
                  title={`Previous: ${prevProject?.title}`}
                >
                  <ArrowLeft size={14} />
                  <span>Prev Case Study</span>
                </button>
                <button 
                  onClick={() => handleNavigate(nextProject)}
                  className="btn btn-outline btn-sm modal-next-btn"
                  title={`Next: ${nextProject?.title}`}
                >
                  <span>Next Case Study</span>
                  <ArrowRight size={14} />
                </button>
              </>
            )}
          </div>

          <div className="modal-footer-actions">
            {project.id === 'husk-e' && (
              <a 
                href="/husk_e_deck.pdf" 
                target="_blank" 
                rel="noreferrer"
                className="btn btn-frutiger-solar btn-sm"
              >
                <FileText size={15} />
                <span>View Hardware Deck (PDF)</span>
              </a>
            )}
            <button onClick={onClose} className="btn btn-secondary btn-sm">
              Close Case Study
            </button>
          </div>
        </footer>

      </div>

      {/* Lightbox / High Res Image Zoom */}
      {selectedImage && (
        <div className="lightbox-overlay" onClick={() => setSelectedImage(null)} role="dialog" aria-label="Expanded Image Preview">
          <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
            <button 
              className="lightbox-close-btn" 
              onClick={() => setSelectedImage(null)}
              aria-label="Close Lightbox"
            >
              <X size={20} />
            </button>
            <img src={selectedImage} alt="Expanded schematic" className="lightbox-image" />
          </div>
        </div>
      )}
    </div>
  );
}

