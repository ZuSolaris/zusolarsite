import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, X, Layers } from 'lucide-react';
import './ImageCarousel.css';

/**
 * ImageCarousel Component
 * Prevents image visual overload by presenting process artifacts, schematics,
 * and renders in an interactive, navigable slide presentation.
 *
 * Supports:
 * - Touch swipe gestures on mobile
 * - Keyboard arrow navigation (Left / Right)
 * - Interactive thumbnail scrub rail with active indication
 * - Fullscreen zoom lightbox for high-res inspection
 * - Formatted title & descriptive caption per slide
 */
export default function ImageCarousel({
  images = [],
  title = 'Process Artifacts & Engineering Schematics',
  subtitle = 'Interactive slide gallery — use arrows or thumbnails to explore.',
  aspectRatio = '16/10'
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const thumbnailRailRef = useRef(null);

  // Normalize image items to standard { image, title, caption, tag }
  const slides = images.map((item, idx) => {
    if (typeof item === 'string') {
      const fileName = item.split('/').pop().replace(/\.[^/.]+$/, '');
      const formattedTitle = fileName
        .split('_')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      return {
        image: item,
        title: formattedTitle,
        caption: `Engineering schematic & process artifact (${idx + 1} of ${images.length})`,
        tag: `Artifact 0${idx + 1}`
      };
    }
    return {
      image: item.image || item.url || item.src,
      title: item.title || `Artifact ${idx + 1}`,
      caption: item.caption || item.description || '',
      tag: item.tag || `Artifact 0${idx + 1}`
    };
  }).filter(s => Boolean(s.image));

  const total = slides.length;
  const currentSlide = slides[currentIndex] || slides[0];

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : total - 1));
  }, [total]);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev < total - 1 ? prev + 1 : 0));
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxOpen) {
        if (e.key === 'Escape') setLightboxOpen(false);
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'ArrowRight') handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, handlePrev, handleNext]);

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    if (thumbnailRailRef.current) {
      const activeThumb = thumbnailRailRef.current.children[currentIndex];
      if (activeThumb) {
        activeThumb.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [currentIndex]);

  // Touch swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const delta = touchStartX.current - touchEndX.current;
    if (Math.abs(delta) > 40) {
      if (delta > 0) handleNext();
      else handlePrev();
    }
  };

  if (!slides.length) return null;

  return (
    <div className="image-carousel-component">
      {/* Carousel Section Header */}
      <div className="carousel-header-row">
        <div>
          <h4 className="carousel-title">
            <Layers size={18} className="inline-icon" />
            <span>{title}</span>
          </h4>
          {subtitle && <p className="carousel-subtitle">{subtitle}</p>}
        </div>
        <div className="carousel-counter-badge">
          <span className="current-num">{String(currentIndex + 1).padStart(2, '0')}</span>
          <span className="counter-sep">/</span>
          <span className="total-num">{String(total).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Main Slide Stage */}
      <div
        className="carousel-stage glass-panel"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="carousel-img-frame"
          style={{ aspectRatio }}
          onClick={() => setLightboxOpen(true)}
          title="Click to zoom schematic in full resolution"
        >
          <img
            key={currentSlide.image}
            src={currentSlide.image}
            alt={currentSlide.title}
            className="carousel-active-img"
            loading="eager"
          />

          {/* Top Overlays */}
          <div className="carousel-stage-topbar" onClick={(e) => e.stopPropagation()}>
            <span className="carousel-tag-pill">{currentSlide.tag}</span>
            <button
              onClick={() => setLightboxOpen(true)}
              className="carousel-zoom-btn btn-frutiger-outline"
              title="Expand image in lightbox"
              aria-label="Zoom image"
            >
              <ZoomIn size={15} />
              <span>Inspect Fullscreen</span>
            </button>
          </div>
        </div>

        {/* Tactile Previous & Next Arrows */}
        <button
          onClick={handlePrev}
          className="carousel-nav-btn prev-btn btn-frutiger-solar"
          aria-label="Previous Slide"
          title="Previous (Left Arrow)"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={handleNext}
          className="carousel-nav-btn next-btn btn-frutiger-solar"
          aria-label="Next Slide"
          title="Next (Right Arrow)"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Slide Meta & Caption */}
      <div className="carousel-caption-card">
        <div className="caption-text-area">
          <h5 className="caption-title">{currentSlide.title}</h5>
          {currentSlide.caption && (
            <p className="caption-description">{currentSlide.caption}</p>
          )}
        </div>
      </div>

      {/* Interactive Thumbnail Scrub Rail */}
      {total > 1 && (
        <div className="carousel-thumb-rail-wrapper">
          <div className="carousel-thumb-rail" ref={thumbnailRailRef}>
            {slides.map((slide, idx) => (
              <button
                key={slide.image + idx}
                className={`carousel-thumb-btn ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Jump to slide ${idx + 1}: ${slide.title}`}
                title={slide.title}
              >
                <img src={slide.image} alt={slide.title} loading="lazy" />
                <span className="thumb-idx">{idx + 1}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* High-Resolution Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-label="Expanded Image Lightbox"
        >
          <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-header">
              <div className="lightbox-meta">
                <span className="lightbox-title">{currentSlide.title}</span>
                <span className="lightbox-counter">
                  {currentIndex + 1} of {total}
                </span>
              </div>
              <button
                className="lightbox-close-btn"
                onClick={() => setLightboxOpen(false)}
                aria-label="Close Lightbox"
              >
                <X size={20} />
              </button>
            </div>

            <div className="lightbox-viewport">
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="lightbox-image"
              />

              {/* Lightbox Nav Arrows */}
              <button
                onClick={handlePrev}
                className="lightbox-nav-btn prev-btn"
                aria-label="Previous Slide"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={handleNext}
                className="lightbox-nav-btn next-btn"
                aria-label="Next Slide"
              >
                <ChevronRight size={28} />
              </button>
            </div>

            {currentSlide.caption && (
              <div className="lightbox-caption">
                <p>{currentSlide.caption}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
