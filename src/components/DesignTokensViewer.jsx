import React from 'react';
import { X, Copy, Check, Sliders, Layers, Palette, Type, Box } from 'lucide-react';

export default function DesignTokensViewer({ isOpen, onClose }) {
  const [copiedToken, setCopiedToken] = React.useState(null);

  if (!isOpen) return null;

  const handleCopy = (token) => {
    navigator.clipboard?.writeText(token);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 1800);
  };

  const tokens = {
    colors: [
      { name: '--bg-primary', val: '#090c14', role: 'Deep Void Background' },
      { name: '--bg-secondary', val: '#0f1523', role: 'Card / Surface Level 1' },
      { name: '--bg-glass', val: 'rgba(15,21,35,0.75)', role: 'Glassmorphism Backdrop' },
      { name: '--accent-cyan', val: '#5362FF', role: 'Primary Cyan Accent' },
      { name: '--accent-indigo', val: '#82D1F5', role: 'Secondary Indigo Accent' },
      { name: '--accent-violet', val: '#E6EDF2', role: 'Tertiary Violet Accent' },
      { name: '--border-subtle', val: 'rgba(255,255,255,0.08)', role: 'Subtle Hairline Borders' }
    ],
    typography: [
      { name: '--font-sans', val: 'Plus Jakarta Sans', role: 'Body & Microcopy' },
      { name: '--font-display', val: 'Space Grotesk', role: 'Headings & Hero Titles' },
      { name: '--font-mono', val: 'JetBrains Mono', role: 'Code & Technical Metrology' }
    ],
    material: [
      { name: '--shadow-polycarbonate-lip', val: 'Layered Insets (0 1.5px / 0 -2px / 1px / -1px)', role: 'Injection-Molded Lip (Bevels)' },
      { name: '--gradient-milky-wash', val: '180deg (0.14 -> 0.08 -> 0.48 -> 0.65)', role: 'Subsurface Scattering Wash' },
      { name: '--gradient-pill-cap', val: 'radial-gradient(ellipse at 50% 12%)', role: 'Curved Plastic Light-Tube Cap' },
      { name: '--texture-noise-tooth', val: 'SVG Fractal Noise at ~3.5% Opacity', role: 'Bead-Blasted Surface Tooth' }
    ],
    curves: [
      { name: '--ease-spring', val: 'cubic-bezier(0.16, 1, 0.3, 1)', role: 'Physics Spring Easing' },
      { name: '--duration-normal', val: '250ms', role: 'Default Micro-interaction' }
    ]
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="tokens-modal-container glass-panel" onClick={(e) => e.stopPropagation()}>

        <div className="tokens-modal-header">
          <div className="tokens-header-title">
            <Sliders size={20} className="inline-icon" />
            <div>
              <h3>Solar Aero Design System Tokens</h3>
              <p className="text-secondary text-sm">Inspecting the living Solar Aero tokens powering this portfolio.</p>
            </div>
          </div>
          <button onClick={onClose} className="modal-close-btn">
            <X size={20} />
          </button>
        </div>

        <div className="tokens-modal-body">

          {/* Colors */}
          <div className="token-group">
            <h4 className="token-group-title">
              <Palette size={16} />
              <span>Color Ramps & Plastic Surfaces</span>
            </h4>
            <div className="tokens-grid">
              {tokens.colors.map(t => (
                <div
                  key={t.name}
                  className="token-item"
                  onClick={() => handleCopy(`var(${t.name})`)}
                  title="Click to copy CSS var"
                >
                  <div className="token-swatch" style={{ background: t.val.includes('rgba') ? t.val : t.val }}></div>
                  <div className="token-info">
                    <span className="token-var">{t.name}</span>
                    <span className="token-val">{t.val}</span>
                    <span className="token-role">{t.role}</span>
                  </div>
                  <span className="copy-indicator">
                    {copiedToken === `var(${t.name})` ? <Check size={14} /> : <Copy size={14} />}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="token-group">
            <h4 className="token-group-title">
              <Type size={16} />
              <span>Typography Hierarchy</span>
            </h4>
            <div className="tokens-grid">
              {tokens.typography.map(t => (
                <div
                  key={t.name}
                  className="token-item"
                  onClick={() => handleCopy(`var(${t.name})`)}
                >
                  <div className="token-info">
                    <span className="token-var">{t.name}</span>
                    <span className="token-val" style={{ fontFamily: t.val }}>{t.val}</span>
                    <span className="token-role">{t.role}</span>
                  </div>
                  <span className="copy-indicator">
                    {copiedToken === `var(${t.name})` ? <Check size={14} /> : <Copy size={14} />}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Solar Aero Material Engineering */}
          <div className="token-group">
            <h4 className="token-group-title">
              <Layers size={16} />
              <span>Solar Aero Material Engineering (Molded Polycarbonate)</span>
            </h4>
            <div className="tokens-grid">
              {tokens.material.map(t => (
                <div
                  key={t.name}
                  className="token-item"
                  onClick={() => handleCopy(`var(${t.name})`)}
                  title="Click to copy CSS var"
                >
                  <div className="token-info">
                    <span className="token-var">{t.name}</span>
                    <span className="token-val">{t.val}</span>
                    <span className="token-role">{t.role}</span>
                  </div>
                  <span className="copy-indicator">
                    {copiedToken === `var(${t.name})` ? <Check size={14} /> : <Copy size={14} />}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Motion */}
          <div className="token-group">
            <h4 className="token-group-title">
              <Box size={16} />
              <span>Physics & Spring Easing Tokens</span>
            </h4>
            <div className="tokens-grid">
              {tokens.curves.map(t => (
                <div
                  key={t.name}
                  className="token-item"
                  onClick={() => handleCopy(`var(${t.name})`)}
                >
                  <div className="token-info">
                    <span className="token-var">{t.name}</span>
                    <span className="token-val">{t.val}</span>
                    <span className="token-role">{t.role}</span>
                  </div>
                  <span className="copy-indicator">
                    {copiedToken === `var(${t.name})` ? <Check size={14} /> : <Copy size={14} />}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="tokens-modal-footer">
          <p className="text-muted text-xs">
          </p>
          <button onClick={onClose} className="btn btn-secondary btn-sm">Close Spec</button>
        </div>

      </div>
    </div>
  );
}
