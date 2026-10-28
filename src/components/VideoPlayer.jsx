import React, { useState, useRef, useEffect } from 'react';
import { Play, X, ExternalLink, Maximize2, Film } from 'lucide-react';

/**
 * Extracts YouTube video ID from various URL patterns:
 * - https://youtu.be/uw7a4uLSDmM
 * - https://www.youtube.com/watch?v=uw7a4uLSDmM
 * - https://www.youtube.com/embed/uw7a4uLSDmM
 * - uw7a4uLSDmM (raw 11-char ID)
 */
export function extractYouTubeId(url) {
  if (!url) return null;
  const str = String(url).trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(str)) return str;
  const match = str.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : null;
}

/**
 * Reusable VideoPlayer Component
 * 
 * Modes:
 * - 'card': Optimized for inline display inside project cards. Shows interactive play overlay,
 *           prevents card click propagation, and mounts player on demand.
 * - 'modal': Optimized for full case study deep dives with full-bleed dimensions and status header.
 */
export default function VideoPlayer({
  youtubeUrl,
  youtubeId,
  videoSrc,
  poster,
  title = 'Gameplay Video Demo',
  autoPlay = false,
  mode = 'card',
  badge = null,
  onOpenModal = null,
  className = ''
}) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const videoRef = useRef(null);

  const resolvedYoutubeId = extractYouTubeId(youtubeUrl || youtubeId || (videoSrc?.includes('youtu') ? videoSrc : null));
  const hasValidVideo = Boolean(resolvedYoutubeId || videoSrc);

  // Sync autoplay state if prop changes
  useEffect(() => {
    if (autoPlay) {
      setIsPlaying(true);
    }
  }, [autoPlay]);

  // Autoplay local video tag when playing
  useEffect(() => {
    if (isPlaying && videoRef.current && !resolvedYoutubeId) {
      const vid = videoRef.current;
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Video autoplay suppressed by browser:', err);
        });
      }
    }
  }, [isPlaying, resolvedYoutubeId]);

  if (!hasValidVideo) {
    return (
      <div className={`video-player-fallback ${className}`}>
        {poster && <img src={poster} alt={title} className="card-media-img" />}
      </div>
    );
  }

  // =========================================================================
  // MODAL / SHOWCASE MODE (Full Case Study View)
  // =========================================================================
  if (mode === 'modal' || mode === 'showcase') {
    return (
      <div className={`modal-video-showcase-container ${className}`}>
        <div className="modal-video-header-bar">
          <div className="modal-video-live-tag">
            <span className="live-rec-dot"></span>
            <span className="live-rec-text">{title}</span>
          </div>
          <span className="modal-video-hint">
            {resolvedYoutubeId ? 'YouTube HD Player' : 'Autoplaying • Unmute for Sound'}
          </span>
        </div>

        <div className="modal-video-frame">
          {resolvedYoutubeId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${resolvedYoutubeId}?autoplay=1&mute=1&loop=1&playlist=${resolvedYoutubeId}&rel=0&modestbranding=1`}
              title={title}
              className="modal-embedded-iframe"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              loop
              controls
              preload="auto"
              className="modal-embedded-video"
              poster={poster}
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // CARD MODE (Inline inside Project Card)
  // =========================================================================
  return (
    <div className={`card-video-player-root ${className} ${isPlaying ? 'is-active' : ''}`}>
      {isPlaying ? (
        <div
          className="card-video-playing-container"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mini Top Control Bar */}
          <div className="card-video-top-bar">
            <div className="card-video-top-title">
              <span className="live-rec-dot"></span>
              <span className="card-video-title-text">{title}</span>
            </div>
            <div className="card-video-top-actions">
              {onOpenModal && (
                <button
                  type="button"
                  className="card-video-action-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenModal();
                  }}
                  title="Expand to Full Case Study"
                  aria-label="Expand Case Study"
                >
                  <Maximize2 size={13} />
                </button>
              )}
              <button
                type="button"
                className="card-video-action-icon close"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlaying(false);
                }}
                title="Close Video Preview"
                aria-label="Close Video"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Embedded Frame */}
          <div className="card-video-embed-box">
            {resolvedYoutubeId ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${resolvedYoutubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={title}
                className="card-embedded-iframe"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <video
                ref={videoRef}
                autoPlay
                controls
                playsInline
                className="card-embedded-video"
                poster={poster}
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      ) : (
        /* Poster Preview with Glassmorphic Interactive Play Overlay */
        <div className="card-video-thumbnail-container">
          {poster && (
            <img
              src={poster}
              alt={title}
              className="card-media-img"
              loading="eager"
            />
          )}

          {/* Video Demo Badge */}
          <div className="card-video-pill">
            <Play size={10} fill="currentColor" />
            <span>Video Demo</span>
          </div>

          {/* Optional Project Badge */}
          {badge && (
            <div className={`card-badge-pill ${badge.includes('Best') ? 'award' : ''}`}>
              <span>{badge}</span>
            </div>
          )}

          {/* Interactive Play Button CTA */}
          <div className="card-play-cta-wrapper">
            <button
              type="button"
              className="card-play-video-btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying(true);
              }}
              aria-label={`Play video: ${title}`}
            >
              <span className="card-play-glow-ring"></span>
              <span className="card-play-icon-disc">
                <Play size={18} fill="currentColor" />
              </span>
              <span className="card-play-text">Watch Gameplay Video</span>
            </button>
          </div>

          {/* Subtle Bottom Bar Hint */}
          <div className="card-video-bottom-hint">
            <Film size={12} className="inline-icon" />
            <span>Click play for live mechanics or card for case study</span>
          </div>
        </div>
      )}
    </div>
  );
}
