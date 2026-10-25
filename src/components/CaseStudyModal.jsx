import React, { useEffect, useState } from 'react';
import { X, Award, ExternalLink, Calendar, Tag, CheckCircle2, Quote, ArrowLeft, ArrowRight, ZoomIn } from 'lucide-react';

export default function CaseStudyModal({ project, onClose, onSelectNext }) {
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

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container glass-panel" onClick={(e) => e.stopPropagation()}>
        
        {/* Sticky Header */}
        <div className="modal-sticky-header">
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
          <button onClick={onClose} className="modal-close-btn" aria-label="Close Case Study">
            <X size={20} />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="modal-body-scroll">
          
          {/* Title Area */}
          <div className="modal-title-area">
            <h2 className="modal-title">{project.title}</h2>
            <p className="modal-subtitle">{project.subtitle}</p>
          </div>

          {/* Hero Image */}
          <div className="modal-hero-wrapper" onClick={() => setSelectedImage(project.heroImage)}>
            <img src={project.heroImage} alt={project.title} className="modal-hero-img" />
            <div className="modal-hero-hint">
              <ZoomIn size={16} />
              <span>Click to enlarge diagram</span>
            </div>
          </div>

          {/* How Might We Callout */}
          <div className="modal-callout-box">
            <span className="modal-callout-label">How Might We:</span>
            <p className="modal-callout-text">{project.howMightWe}</p>
          </div>

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
                The Core Problem & Context
              </h4>
              <p className="narrative-text">{project.problem}</p>
            </div>

            <div className="narrative-column glass-panel">
              <h4 className="narrative-heading">
                <span className="dot success"></span>
                The Interaction & Systems Solution
              </h4>
              <p className="narrative-text">{project.solution}</p>
            </div>
          </div>

          {/* Feasibility & BOM Analysis */}
          {project.feasibility && (
            <div className="modal-feasibility-section glass-panel">
              <h4 className="section-mini-heading">Feasibility & Target BOM Analysis (&lt;$20 / Student)</h4>
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
                    <span className="pitfall-risk">⚠️ {p.risk}</span>
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
          <div className="modal-reflection-section">
            <h4 className="section-mini-heading">Interaction Design Reflection & Craft</h4>
            <p className="reflection-text">{project.reflection}</p>
          </div>

          {/* Image Gallery / Artifacts */}
          <div className="modal-gallery-section">
            <h4 className="section-mini-heading">Process Artifacts & Schematics</h4>
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
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables Checklist */}
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

          {/* Tags */}
          <div className="modal-tags-section">
            <span className="tags-label">Keywords & Domains:</span>
            <div className="modal-tags-list">
              {project.tags.map(t => (
                <span key={t} className="pill-badge subtle">{t}</span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button onClick={onClose} className="btn btn-secondary">
            Close Case Study
          </button>
          <a 
            href="/Zoe_Solaris_IxD_Portfolio.pdf" 
            target="_blank" 
            rel="noreferrer"
            className="btn btn-outline"
          >
            <ExternalLink size={16} />
            <span>View in Original 25p Deck</span>
          </a>
        </div>

      </div>

      {/* Lightbox / High Res Image Zoom */}
      {selectedImage && (
        <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close-btn" onClick={() => setSelectedImage(null)}>
              <X size={24} />
            </button>
            <img src={selectedImage} alt="Expanded schematic" className="lightbox-image" />
          </div>
        </div>
      )}
    </div>
  );
}
