import React from 'react';
import { Award, GraduationCap, Briefcase, Download, FileText, CheckCircle2, UserCheck, Mail, Globe } from 'lucide-react';
import { personalBio } from '../data/projects';

export default function BioStory() {
  return (
    <section id="bio" className="section bio-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <UserCheck size={16} />
            <span>Background & Experience</span>
          </div>
          <h2 className="section-title">
            Lived Experience as a <span className="gradient-text">Design Superpower</span>
          </h2>
          <p className="section-description">
            The best interfaces aren’t built from textbook theories or asset stripping from dribbble or behance, they are shaped by navigating 
            extreme constraints, high-pressure environments, and diverse human realities.
          </p>
        </div>

        {/* Top Info & Summary Card */}
        <div className="bio-story-card glass-panel" style={{ marginBottom: '2.5rem' }}>
          <div className="bio-avatar-banner">
            <img src="/logo.png" alt="Zoe Solaris" className="bio-initials-badge-logo" />
            <div>
              <h3 className="bio-name">{personalBio.name}</h3>
              <p className="bio-role">{personalBio.role} • {personalBio.location}</p>
              <div className="bio-contact-links">
                {personalBio.email && (
                  <a href={`mailto:${personalBio.email}`} className="contact-link-pill">
                    <Mail size={13} />
                    <span>{personalBio.email}</span>
                  </a>
                )}
                {personalBio.linkedin && (
                  <a href={personalBio.linkedin} target="_blank" rel="noreferrer" className="contact-link-pill">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    <span>linkedin.com/in/zusolaris</span>
                  </a>
                )}
                {personalBio.website && (
                  <a href={personalBio.website} target="_blank" rel="noreferrer" className="contact-link-pill">
                    <Globe size={13} />
                    <span>zusolaris.space</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="bio-prose">
            <p>{personalBio.statement}</p>
            <div className="bio-quote-highlight">
              <strong>“You don’t solve people. You create an experience that respects and encourages their agency.”</strong>
            </div>
          </div>

          {/* Resume & Portfolio Download Row */}
          <div className="bio-cta-row">
            <a 
              href="/Zoe_Solaris_Resume.pdf" 
              download 
              className="btn btn-primary"
            >
              <Download size={17} />
              <span>Download Resume (PDF)</span>
            </a>
            <a 
              href="/Zoe_Solaris_IxD_Portfolio.pdf" 
              download 
              className="btn btn-outline"
            >
              <FileText size={17} />
              <span>Original 25-Page Slide Deck</span>
            </a>
          </div>
        </div>

        {/* Experience & Education 2-Column Grid */}
        <div className="bio-content-grid">
          
          {/* Experience Column */}
          <div className="bio-column">
            <h4 className="journey-heading">
              <Briefcase size={18} className="inline-icon" />
              <span>Experience</span>
            </h4>
            
            <div className="experience-list">
              {(personalBio.experience || []).map((exp, idx) => (
                <div key={idx} className="experience-card glass-panel">
                  <div className="exp-header">
                    <div>
                      <h5 className="exp-role">{exp.role}</h5>
                      <span className="exp-org">{exp.org}</span>
                    </div>
                    <div className="exp-meta">
                      <span className="exp-time">{exp.timeline}</span>
                      <span className="exp-loc">{exp.location}</span>
                    </div>
                  </div>
                  <ul className="exp-points">
                    {(exp.points || []).map((pt, pIdx) => (
                      <li key={pIdx} className="exp-point-item">
                        <span className="point-bullet">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Honors Column */}
          <div className="bio-column">
            
            {/* Education */}
            <h4 className="journey-heading">
              <GraduationCap size={18} className="inline-icon" />
              <span>Education</span>
            </h4>
            <div className="education-list" style={{ marginBottom: '2rem' }}>
              {(personalBio.education || []).map((edu, idx) => (
                <div key={idx} className="education-card glass-panel">
                  <div className="edu-top">
                    <h5 className="edu-school">{edu.institution}</h5>
                    <span className="edu-time">{edu.timeline}</span>
                  </div>
                  <p className="edu-degree">{edu.degree}</p>
                  {edu.detail && <span className="edu-detail">{edu.detail}</span>}
                  <span className="edu-loc">{edu.location}</span>
                </div>
              ))}
            </div>

            {/* Honors & Leadership */}
            <h4 className="journey-heading">
              <Award size={18} className="inline-icon" />
              <span>Honors & Leadership</span>
            </h4>
            <div className="honors-card glass-panel">
              <ul className="honors-list">
                {(personalBio.honors || []).map((h, idx) => (
                  <li key={idx} className="honor-item">
                    <Award size={15} className="honor-icon" />
                    <div>
                      <strong className="honor-title">{h.title}</strong>
                      <span className="honor-org">{h.org}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Skills & Tools Matrix */}
        <div className="skills-matrix-section" style={{ marginTop: '3rem' }}>
          <h4 className="matrix-title">Skills & Tools Matrix</h4>
          <div className="skills-category-grid">
            {(personalBio.skills || []).map((cat, idx) => (
              <div key={idx} className="skill-cat-card glass-panel">
                <h5 className="cat-title">{cat.category}</h5>
                <ul className="cat-list">
                  {(cat.items || []).map(item => (
                    <li key={item} className="cat-item">
                      <CheckCircle2 size={14} className="cat-check" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
