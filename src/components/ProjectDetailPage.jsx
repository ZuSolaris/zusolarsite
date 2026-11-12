import React, { useEffect, useState } from 'react';
import {
  ArrowLeft, Calendar, CheckCircle2, Quote,
  ZoomIn, ChevronLeft, ChevronRight, FileText, ExternalLink,
  Layers, Cpu, Star, Home
} from 'lucide-react';
import VideoPlayer, { extractYouTubeId } from './VideoPlayer';
import ImageCarousel from './ImageCarousel';
import './ProjectDetailPage.css';

export default function ProjectDetailPage({
  project,
  projects = [],
  onSelectProject,
  onBack
}) {
  const [selectedImage, setSelectedImage] = useState(null);

  // Look up fresh project from projects array
  const currentProject = projects.find(p => p.id === project?.id) || project;

  // Video metadata
  const rawYoutubeUrl = currentProject?.youtubeUrl || (currentProject?.id === 'melon' ? 'https://youtu.be/uw7a4uLSDmM' : null);
  const youtubeId = extractYouTubeId(rawYoutubeUrl || currentProject?.youtubeId || (currentProject?.video?.includes('youtu') ? currentProject.video : null)) || (currentProject?.id === 'melon' ? 'uw7a4uLSDmM' : null);
  const hasVideo = Boolean(youtubeId || currentProject?.video || currentProject?.id === 'melon');
  const videoSrc = currentProject?.video;
  const videoTitle = currentProject?.videoTitle || (currentProject?.id === 'melon' ? 'Live Gameplay & Mechanics Evaluation (MLDA)' : `${currentProject?.title || 'Project'} Demo Video`);

  // Scroll to top when project loads or changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = `${currentProject.title} • Zoe Solaris IxD Case Study`;
    return () => {
      document.title = 'Zoe Solaris • Interaction Designer & Systems Researcher';
    };
  }, [currentProject.id, currentProject.title]);

  // Project navigation indices
  const currentIndex = projects.findIndex(p => p.id === currentProject.id);
  const hasProjectsList = projects && projects.length > 1 && currentIndex !== -1;
  const prevProject = hasProjectsList ? (currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1]) : null;
  const nextProject = hasProjectsList ? (currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0]) : null;

  const handleNavigate = (targetProject) => {
    if (targetProject && onSelectProject) {
      setSelectedImage(null);
      onSelectProject(targetProject);
    }
  };

  // Separate gallery images: avoid repeating images in multiple places
  const spotlightImages = currentProject.spotlightArtifacts || [];
  const spotlightUrls = spotlightImages.map(a => a.image);
  const generalGalleryImages = (currentProject.galleryImages || []).filter(img => !spotlightUrls.includes(img));

  return (
    <div className="project-detail-page">

      {/* Sticky Sub-Navigation Toolbar */}
      <div className="detail-sticky-toolbar">
        <div className="container toolbar-content">
          <div className="toolbar-left">
            <button
              onClick={onBack}
              className="btn btn-frutiger-solar btn-sm toolbar-back-btn"
              title="Return to Portfolio Home"
            >
              <ArrowLeft size={16} />
              <span>Back to Portfolio</span>
            </button>
            <div className="toolbar-breadcrumbs">
              <span className="crumb-root" onClick={onBack}>Case Studies</span>
              <span className="crumb-sep">/</span>
              <span className="crumb-current">{currentProject.title}</span>
            </div>
          </div>

          {hasProjectsList && (
            <div className="toolbar-right">
              <div className="project-quick-switcher">
                <button
                  onClick={() => handleNavigate(prevProject)}
                  className="quick-switch-btn prev"
                  title={`Previous: ${prevProject?.title}`}
                  aria-label="Previous Case Study"
                >
                  <ChevronLeft size={18} />
                  <span className="quick-switch-label">Prev</span>
                </button>
                <span className="project-counter-pill">
                  {currentIndex + 1} of {projects.length}
                </span>
                <button
                  onClick={() => handleNavigate(nextProject)}
                  className="quick-switch-btn next"
                  title={`Next: ${nextProject?.title}`}
                  aria-label="Next Case Study"
                >
                  <span className="quick-switch-label">Next</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container detail-container">

        {/* Hero Section */}
        <header className="detail-hero-header">
          <div className="detail-meta-row">
            <span className="pill-badge subtle">{currentProject.category}</span>
            {currentProject.badge && (
              <span className={`pill-badge ${currentProject.badge.includes('Best') || currentProject.badge.includes('Featured') ? 'award' : ''}`}>
                <Star size={12} className="inline-icon" />
                <span>{currentProject.badge}</span>
              </span>
            )}
            <span className="detail-timeframe">
              <Calendar size={13} className="inline-icon" />
              {currentProject.timeframe}
            </span>
          </div>

          <h1 className="detail-title">{currentProject.title}</h1>
          <p className="detail-subtitle">{currentProject.subtitle}</p>

          {/* Action CTAs */}
          <div className="detail-hero-actions">
            {currentProject.id === 'husk-e' && (
              <a
                href="/husk_e_deck.pdf"
                target="_blank"
                rel="noreferrer"
                className="btn btn-frutiger-solar btn-md"
              >
                <FileText size={16} />
                <span>View Hardware Deck (PDF)</span>
              </a>
            )}
            {currentProject.id === 'melon' && (
              <a
                href="https://zusolaris.itch.io/melon-laughs-at-dopamine-addicts"
                target="_blank"
                rel="noreferrer"
                className="btn btn-frutiger-solar btn-md"
              >
                <ExternalLink size={16} />
                <span>Play Live on Itch.io</span>
              </a>
            )}
          </div>
        </header>

        {/* Primary Media Feature (Video or Hero Schematic) */}
        <section className="detail-media-feature">
          {hasVideo ? (
            <div className="detail-video-wrapper glass-panel">
              <VideoPlayer
                youtubeUrl={rawYoutubeUrl}
                youtubeId={youtubeId}
                videoSrc={videoSrc}
                poster={currentProject.heroImage}
                title={videoTitle}
                mode="modal"
                autoPlay={false}
              />
            </div>
          ) : (
            <div
              className="detail-hero-image-wrapper glass-panel"
              onClick={() => setSelectedImage(currentProject.heroImage)}
              title="Click to expand high-resolution schematic"
            >
              <img
                src={currentProject.heroImage}
                alt={currentProject.title}
                className="detail-hero-image"
                loading="eager"
              />
              <div className="detail-image-zoom-hint">
                <ZoomIn size={16} />
                <span>Click to Expand High-Resolution Schematic</span>
              </div>
            </div>
          )}
        </section>

        {/* Layout Grid: Main Content + Sidebar */}
        <div className="detail-layout-grid">

          {/* Left Column: Deep Dive Narrative */}
          <main className="detail-main-flow">

            {/* Executive Summary */}
            {currentProject.summary && (
              <section className="detail-card glass-panel summary-card">
                <span className="card-eyebrow">Executive Brief & Systems Overview</span>
                <p className="summary-body-text">{currentProject.summary}</p>
              </section>
            )}



            {/* How Might We & Jobs To Be Done */}
            {(currentProject.howMightWe || currentProject.jobsToBeDone) && (
              <section className="hmw-jtbd-section">
                {currentProject.howMightWe && (
                  <div className="detail-callout-card hmw-card glass-panel">
                    <span className="callout-label">How Might We:</span>
                    <p className="callout-text">{currentProject.howMightWe}</p>
                  </div>
                )}
                {currentProject.jobsToBeDone && (
                  <div className="detail-callout-card jtbd-card glass-panel">
                    <span className="callout-label">Jobs To Be Done (JTBD):</span>
                    <p className="callout-text">{currentProject.jobsToBeDone}</p>
                  </div>
                )}
              </section>
            )}

            {/* Friendship Phases Supported */}
            {currentProject.friendshipPhases && (
              <section className="detail-card glass-panel phases-card">
                <span className="card-eyebrow">Friendship Phases Supported:</span>
                <div className="phases-pill-row">
                  {currentProject.friendshipPhases.map(phase => (
                    <span key={phase} className="pill-badge phase-pill">✦ {phase}</span>
                  ))}
                </div>
              </section>
            )}

            {/* Core Narrative: Problem & Interaction Solution */}
            <section className="narrative-grid">
              <div className="narrative-card problem-card glass-panel">
                <div className="narrative-header">
                  <span className="dot error"></span>
                  <h4>The Core Problem & Context</h4>
                </div>
                <p className="narrative-text">{currentProject.problem}</p>
              </div>

              <div className="narrative-card solution-card glass-panel">
                <div className="narrative-header">
                  <span className="dot success"></span>
                  <h4>The Interaction & Systems Solution</h4>
                </div>
                <p className="narrative-text">{currentProject.solution}</p>
              </div>
            </section>

            {/* Spotlight Artifacts Carousel (Storyboard & Interaction Architecture) */}
            {spotlightImages.length > 0 && (
              <section className="detail-carousel-block">
                <ImageCarousel
                  images={spotlightImages}
                  title="Interaction Architecture & Storyboards"
                  subtitle="Curated storyboard narrative and behavioral state machine architecture."
                  aspectRatio="16/9"
                />
              </section>
            )}

            {/* General Process Artifacts Carousel (Prevents photo overwhelm!) */}
            {generalGalleryImages.length > 0 && (
              <section className="detail-carousel-block">
                <ImageCarousel
                  images={generalGalleryImages}
                  title="Process Artifacts & Engineering Schematics"
                  subtitle={`${generalGalleryImages.length} high-resolution blueprints, 3D slices, and design notebook pages in an interactive slider.`}
                  aspectRatio="16/10"
                />
              </section>
            )}

            {/* Feasibility & BOM Analysis */}
            {currentProject.feasibility && (
              <section className="detail-card glass-panel feasibility-section">
                <div className="feasibility-title-row">
                  <h4>Target BOM Analysis & Production Feasibility</h4>
                  <span className="pill-badge subtle">Under $20 Constraint</span>
                </div>
                <div className="feasibility-grid">
                  <div className="feasibility-stat-card">
                    <span className="stat-label">BOM per Unit</span>
                    <span className="stat-val">{currentProject.feasibility.unitCost}</span>
                    <span className="stat-sub">Under $20 target ($0.62 support margin)</span>
                  </div>
                  <div className="feasibility-stat-card">
                    <span className="stat-label">UW Cohort Scale Model</span>
                    <p className="stat-desc">{currentProject.feasibility.cohortScale}</p>
                  </div>
                  <div className="feasibility-stat-card">
                    <span className="stat-label">Rapid 30-Day Pilot Protocol</span>
                    <p className="stat-desc">{currentProject.feasibility.pilotTest}</p>
                  </div>
                </div>
              </section>
            )}

            {/* Behavioral & Technical Pitfalls */}
            {currentProject.pitfalls && (
              <section className="detail-card glass-panel pitfalls-section">
                <div className="pitfalls-title-row">
                  <h4>Anticipating Behavioral & Technical Pitfalls</h4>
                </div>
                <div className="pitfalls-grid">
                  {currentProject.pitfalls.map((p, idx) => (
                    <div key={idx} className="pitfall-card">
                      <span className="pitfall-name">{p.risk}</span>
                      <p className="pitfall-body">{p.detail}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Authentic Reflection Quote */}
            {currentProject.quote && (
              <section className="detail-quote-card">
                <Quote size={32} className="quote-glyph" />
                <blockquote className="quote-content">
                  "{currentProject.quote}"
                </blockquote>
                <cite className="quote-byline">— Zoe Solaris, Design Systems Reflection</cite>
              </section>
            )}

            {/* Reflection Body */}
            {currentProject.reflection && (
              <section className="detail-card glass-panel reflection-card">
                <span className="card-eyebrow">Interaction Design Reflection & Craft</span>
                <p className="reflection-text">{currentProject.reflection}</p>
              </section>
            )}

          </main>

          {/* Right Column: Sidebar Metadata & Project Spec */}
          <aside className="detail-sidebar">

            {/* Project Metrology Spec Card */}
            <div className="sidebar-card glass-panel">
              <h4 className="sidebar-title">
                <Cpu size={16} className="inline-icon" />
                <span>Project Metrology</span>
              </h4>

              <div className="sidebar-meta-list">
                <div className="meta-item">
                  <span className="meta-label">Domain</span>
                  <span className="meta-value">{currentProject.category}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Timeline</span>
                  <span className="meta-value">{currentProject.timeframe}</span>
                </div>
                {currentProject.badge && (
                  <div className="meta-item">
                    <span className="meta-label">Distinction</span>
                    <span className="meta-value highlight">{currentProject.badge}</span>
                  </div>
                )}
                {currentProject.feasibility?.unitCost && (
                  <div className="meta-item">
                    <span className="meta-label">Hardware BOM</span>
                    <span className="meta-value highlight">{currentProject.feasibility.unitCost}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Deliverables Checklist Card */}
            {currentProject.deliverables && currentProject.deliverables.length > 0 && (
              <div className="sidebar-card glass-panel">
                <h4 className="sidebar-title">
                  <CheckCircle2 size={16} className="inline-icon" />
                  <span>Key Deliverables</span>
                </h4>
                <ul className="sidebar-deliverables-list">
                  {currentProject.deliverables.map((item, idx) => (
                    <li key={idx} className="deliverable-entry">
                      <CheckCircle2 size={15} className="check-bullet" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Keywords & Technologies Card */}
            {currentProject.tags && currentProject.tags.length > 0 && (
              <div className="sidebar-card glass-panel">
                <h4 className="sidebar-title">
                  <Layers size={16} className="inline-icon" />
                  <span>Keywords &amp; Stack</span>
                </h4>
                <div className="sidebar-tags-cloud">
                  {currentProject.tags.map(tag => (
                    <span key={tag} className="sidebar-tag-pill">{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Return / Quick Navigation */}
            <div className="sidebar-card glass-panel sidebar-actions-card">
              <button
                onClick={onBack}
                className="btn btn-frutiger-solar btn-md w-full"
              >
                <ArrowLeft size={16} />
                <span>Back to Portfolio</span>
              </button>
            </div>

          </aside>

        </div>

        {/* Bottom Pagination & Next Case Study Teaser */}
        {hasProjectsList && (
          <footer className="detail-bottom-footer">
            <div className="bottom-nav-row">
              <button
                onClick={() => handleNavigate(prevProject)}
                className="bottom-nav-card prev glass-panel"
              >
                <div className="nav-card-sub">
                  <ChevronLeft size={16} />
                  <span>Previous Case Study</span>
                </div>
                <h4 className="nav-card-title">{prevProject?.title}</h4>
                <p className="nav-card-category">{prevProject?.category}</p>
              </button>

              <button
                onClick={() => handleNavigate(nextProject)}
                className="bottom-nav-card next glass-panel"
              >
                <div className="nav-card-sub">
                  <span>Next Case Study</span>
                  <ChevronRight size={16} />
                </div>
                <h4 className="nav-card-title">{nextProject?.title}</h4>
                <p className="nav-card-category">{nextProject?.category}</p>
              </button>
            </div>

            <div className="bottom-back-home">
              <button onClick={onBack} className="btn btn-outline btn-md">
                <Home size={16} />
                <span>Return to Portfolio Home</span>
              </button>
            </div>
          </footer>
        )}

      </div>

      {/* Lightbox Modal for Hero Image Zoom */}
      {selectedImage && (
        <div
          className="lightbox-overlay"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-label="Expanded Schematic Lightbox"
        >
          <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-header">
              <span className="lightbox-title">{currentProject.title} Schematic</span>
              <button
                className="lightbox-close-btn"
                onClick={() => setSelectedImage(null)}
                aria-label="Close Lightbox"
              >
                &times;
              </button>
            </div>
            <div className="lightbox-viewport">
              <img
                src={selectedImage}
                alt="Expanded schematic"
                className="lightbox-image"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
