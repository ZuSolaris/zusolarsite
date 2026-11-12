import React, { useState, useMemo } from 'react';
import {
  X, Copy, Check, Sliders, Layers, Palette, Type, Box,
  Grid, Cpu, FileText, Search, Sparkles
} from 'lucide-react';

// Structured 3-Tier Design Tokens Registry (Static Module Constants)
const tokensData = [
  // =========================================================================
  // TIER 1: PRIMITIVES
  // =========================================================================
  {
    tier: 'tier1',
    tierLabel: 'Tier 1: Primitive',
    group: 'color-primitives',
    groupTitle: 'Color Palette Constants',
    groupIcon: Palette,
    groupDesc: 'Raw immutable hex values representing the physical chemistry and plastic dyes.',
    tokens: [
      { name: '--color-primitive-cobalt-500', val: '#5362ff', role: 'Cobalt Core (Primary electric brand accent)', type: 'color' },
      { name: '--color-primitive-azure-400', val: '#82d1f5', role: 'Sky Azure (Atmospheric specular reflection)', type: 'color' },
      { name: '--color-primitive-cyan-500', val: '#00bcd4', role: 'Bondi Cyan (iMac G3 jewel hue)', type: 'color' },
      { name: '--color-primitive-ice-100', val: '#e6edf2', role: 'High-altitude Ice Frost tint', type: 'color' },
      { name: '--color-primitive-violet-600', val: '#7c3aed', role: 'Royal Violet (Ultraviolet secondary accent)', type: 'color' },
      { name: '--color-primitive-violet-700', val: '#6d28d9', role: 'Deep Amethyst (Pressed tactile feedback)', type: 'color' },
      { name: '--color-primitive-void-950', val: '#090c14', role: 'Dark Space Void base surface', type: 'color' },
      { name: '--color-primitive-slate-900', val: '#0f1523', role: 'Polycarbonate Chassis substrate', type: 'color' },
      { name: '--color-primitive-slate-800', val: '#161e33', role: 'Elevated Well container background', type: 'color' },
      { name: '--color-primitive-white', val: '#ffffff', role: 'Pure Specular catch-light reflection', type: 'color' }
    ]
  },
  {
    tier: 'tier1',
    tierLabel: 'Tier 1: Primitive',
    group: 'spatial-grid',
    groupTitle: '4px Baseline Spatial Grid Scale',
    groupIcon: Grid,
    groupDesc: 'Strict mathematical 4px spatial units governing internal padding, gap, and rhythm.',
    tokens: [
      { name: '--space-1', val: '0.25rem (4px)', px: 4, role: 'Micro padding, pill borders, tight inline badges', type: 'space' },
      { name: '--space-2', val: '0.5rem (8px)', px: 8, role: 'Standard icon-to-text gap, button padding-y', type: 'space' },
      { name: '--space-3', val: '0.75rem (12px)', px: 12, role: 'Compact card padding, modal element gap', type: 'space' },
      { name: '--space-4', val: '1.0rem (16px)', px: 16, role: 'Base grid unit, form field height offset', type: 'space' },
      { name: '--space-6', val: '1.5rem (24px)', px: 24, role: 'Section container padding, card header gap', type: 'space' },
      { name: '--space-8', val: '2.0rem (32px)', px: 32, role: 'Major layout gutter, modal chassis padding', type: 'space' },
      { name: '--space-12', val: '3.0rem (48px)', px: 48, role: 'Hero section vertical rhythm and pod separation', type: 'space' },
      { name: '--space-16', val: '4.0rem (64px)', px: 64, role: 'Macro viewport block spacing', type: 'space' }
    ]
  },
  {
    tier: 'tier1',
    tierLabel: 'Tier 1: Primitive',
    group: 'typography-primitives',
    groupTitle: 'Typography Families & Hierarchy',
    groupIcon: Type,
    groupDesc: 'Font stacks and mathematical type scales for technical metrology and display titles.',
    tokens: [
      { name: '--font-sans', val: "'Plus Jakarta Sans', system-ui", role: 'Primary interface body and readable copy', type: 'font' },
      { name: '--font-display', val: "'Space Grotesk', sans-serif", role: 'Hero headers, futuristic logotypes and titles', type: 'font' },
      { name: '--font-mono', val: "'JetBrains Mono', monospace", role: 'Code blocks, coordinates, token names', type: 'font' },
      { name: '--radius-sm', val: '6px', role: 'Inner button badges and chip curves', type: 'radius' },
      { name: '--radius-md', val: '12px', role: 'Standard cards and token item containers', type: 'radius' },
      { name: '--radius-xl', val: '28px', role: 'Outer polycarbonate chassis corner radiuses', type: 'radius' },
      { name: '--radius-full', val: '9999px', role: 'Continuous Frutiger jelly pill buttons', type: 'radius' }
    ]
  },
  {
    tier: 'tier1',
    tierLabel: 'Tier 1: Primitive',
    group: 'motion-primitives',
    groupTitle: 'Physics Spring & Motion Primitives',
    groupIcon: Box,
    groupDesc: 'Subtle spring curves and millisecond timing mimicking real hardware switches.',
    tokens: [
      { name: '--motion-ease-spring', val: 'cubic-bezier(0.16, 1, 0.3, 1)', role: 'Organic tactile bounce for presses & popovers', type: 'text' },
      { name: '--motion-duration-fast', val: '150ms', role: 'Button state changes, hover catch-lights', type: 'text' },
      { name: '--motion-duration-normal', val: '250ms', role: 'Card expansion, tab sliding transitions', type: 'text' },
      { name: '--motion-duration-slow', val: '400ms', role: 'Modal fly-ins and fullscreen portal transitions', type: 'text' }
    ]
  },

  // =========================================================================
  // TIER 2: SEMANTIC ALIASES
  // =========================================================================
  {
    tier: 'tier2',
    tierLabel: 'Tier 2: Semantic',
    group: 'semantic-surfaces',
    groupTitle: 'Contextual Surfaces & Translucency',
    groupIcon: Layers,
    groupDesc: 'Theme-aware aliases adapting seamlessly between Dark Void and Bondi Jewel themes.',
    tokens: [
      { name: '--color-surface-base', val: 'var(--bg-primary)', role: 'Viewport foundation surface (Void / Ice tint)', type: 'color-alias' },
      { name: '--color-surface-elevated', val: 'var(--bg-secondary)', role: 'Chassis intermediate level (Slate / Bondi)', type: 'color-alias' },
      { name: '--color-surface-glass', val: 'var(--bg-glass)', role: 'Translucent polycarbonate optical backdrop', type: 'color-alias' },
      { name: '--color-surface-frosted-card', val: 'Dark: rgba(10,25,35,0.75) | Light: rgba(255,255,255,0.95)', role: 'High-contrast child card maintaining WCAG AAA', type: 'color-alias' },
      { name: '--color-text-brand', val: 'Dark: #5362FF | Light: #7c3aed', role: 'Primary brand heading accent color', type: 'color-alias' },
      { name: '--color-action-solar', val: 'linear-gradient(135deg, #5362ff, #82d1f5)', role: 'Interactive call-to-action gradient', type: 'gradient' },
      { name: '--color-action-active', val: 'Dark: #7c3aed | Light: #6d28d9', role: 'Tactile depressed button background', type: 'color-alias' }
    ]
  },
  {
    tier: 'tier2',
    tierLabel: 'Tier 2: Semantic',
    group: 'material-engineering',
    groupTitle: 'Solar Aero Material Engineering',
    groupIcon: Sparkles,
    groupDesc: 'Complex multi-layered bevels, subsurface scattering, and microscopic mold tooth.',
    tokens: [
      { name: '--shadow-polycarbonate-lip', val: 'Multi-stop inset & ambient drop', role: 'Compound injection-molded bevel lip', type: 'shadow' },
      { name: '--shadow-polycarbonate-hover', val: 'Intense specular catch-light + outer cyan glow', role: 'Excited hover elevation state', type: 'shadow' },
      { name: '--shadow-jelly-pill', val: 'Jelly cap highlight + soft downward shadow', role: 'Tactile gumdrop button idle state', type: 'shadow' },
      { name: '--shadow-jelly-pill-depressed', val: 'Deep inner depression shadow (inset 0 3px 6px)', role: 'Physically depressed switch feedback', type: 'shadow' },
      { name: '--gradient-milky-wash', val: 'linear-gradient(180deg, 0.14 -> 0.08 -> 0.65)', role: 'Subsurface scattering internal light diffusion', type: 'gradient' },
      { name: '--gradient-pill-cap', val: 'radial-gradient(ellipse 90% 55% at 50% 12%)', role: 'Overhead light tube specular highlight cap', type: 'gradient' },
      { name: '--texture-noise-tooth', val: 'SVG fractal noise filter at 3.5% opacity', role: 'Bead-blasted microscopic mold texture', type: 'text' }
    ]
  },

  // =========================================================================
  // TIER 3: COMPONENT SCOPED
  // =========================================================================
  {
    tier: 'tier3',
    tierLabel: 'Tier 3: Component Scoped',
    group: 'component-button',
    groupTitle: 'Button Component Tokens ({component}-{property}-{variant}-{state})',
    groupIcon: Sliders,
    groupDesc: 'Scoped directly to FrutigerSolarButton contracts for predictable styling.',
    tokens: [
      { name: '--button-radius-pill', val: 'var(--radius-full)', role: 'Border radius for jelly pills', type: 'component' },
      { name: '--button-shadow-solar-default', val: 'var(--shadow-jelly-pill)', role: 'Resting tactile bevel shadow', type: 'component' },
      { name: '--button-shadow-solar-active', val: 'var(--shadow-jelly-pill-depressed)', role: 'Depressed thumb-press shadow', type: 'component' },
      { name: '--button-padding-pill', val: 'var(--space-2) var(--space-4)', role: 'Compact pill button internal breathing room', type: 'component' },
      { name: '--button-min-touch-target', val: '44px x 44px', role: 'WCAG AAA minimum touch target boundary', type: 'component' }
    ]
  },
  {
    tier: 'tier3',
    tierLabel: 'Tier 3: Component Scoped',
    group: 'component-panel',
    groupTitle: 'Panel & Chassis Component Tokens',
    groupIcon: Cpu,
    groupDesc: 'Scoped to SolarGlassPanel and DeviceSimulatorPod modular assemblies.',
    tokens: [
      { name: '--panel-radius-chassis', val: 'var(--radius-xl)', role: 'Chassis outer perimeter corner radius', type: 'component' },
      { name: '--panel-lip-bevel-shadow', val: 'var(--shadow-polycarbonate-lip)', role: 'Physical outer edge highlight and rim', type: 'component' },
      { name: '--panel-lip-bevel-hover', val: 'var(--shadow-polycarbonate-hover)', role: 'Interactive focus / hover highlight rim', type: 'component' },
      { name: '--simulator-shell-chassis', val: '#875ede (Atomic Purple)', role: '1:1 Hardware simulator 3D printed shell', type: 'color' },
      { name: '--simulator-screen-bg', val: '#000000', role: 'Zero-nit OLED display black level', type: 'color' },
      { name: '--simulator-screen-text', val: '#ffffff / #6ef5fc', role: 'High-contrast LCD pixel glow color', type: 'color' }
    ]
  }
];

// Component Specifications Registry (per component-spec skill)
const componentSpecs = {
  FrutigerSolarButton: {
    name: 'FrutigerSolarButton',
    version: '1.2.0',
    description: 'Tactile gumdrop button styled with multi-layered specular reflections, overhead light-tube pill caps, and realistic thumb depression physics.',
    anatomy: [
      { element: 'Base Container', desc: 'Continuous pill capsule with 9999px border radius and 44px minimum touch target' },
      { element: 'Specular Cap', desc: 'Curved radial highlight reflection simulating an overhead tubular light source' },
      { element: 'Internal Dye Wash', desc: 'Subsurface scattering gradient diffusing through translucent resin' },
      { element: 'Compound Bevel Lip', desc: '4-layer inset shadow delivering tactile 3D relief against dark or light substrates' }
    ],
    props: [
      { prop: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'danger'", default: "'primary'", desc: 'Visual prominence tier and resin colorway' },
      { prop: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", desc: 'Height, padding, and font-size spatial scale' },
      { prop: 'isDepressed', type: 'boolean', default: 'false', desc: 'Manual override for locked/pressed tactile state' },
      { prop: 'icon', type: 'ReactNode', default: 'null', desc: 'Leading or trailing icon aligned on 4px grid' },
      { prop: 'onClick', type: '() => void', default: 'undefined', desc: 'Tactile activation callback' }
    ],
    states: [
      { state: 'Default (Resting)', effect: 'Floating jelly pill with --shadow-jelly-pill elevation' },
      { state: 'Hover', effect: 'Brightened light tube cap, translateY(-1.5px), outer azure glow' },
      { state: 'Active (Pressed)', effect: 'translateY(1.5px), inset downward shadow (--shadow-jelly-pill-depressed)' },
      { state: 'Focus-Visible', effect: '2px solid #5362ff with 3px transparent outline offset' },
      { state: 'Disabled', effect: '40% opacity, desaturated resin, cursor not-allowed' }
    ],
    tokens: [
      '--button-radius-pill',
      '--button-shadow-solar-default',
      '--button-shadow-solar-active',
      '--gradient-pill-cap',
      '--motion-ease-spring'
    ],
    accessibility: [
      'WCAG 2.2 Level AAA compliant contrast (> 7:1) across text labels.',
      '44px touch targets on mobile viewports.',
      'Visible keyboard focus rings with outline-offset for keyboard navigators.'
    ]
  },
  SolarGlassPanel: {
    name: 'SolarGlassPanel',
    version: '1.1.0',
    description: 'Translucent polycarbonate structural chassis with compound injection-molded bevel lips, microscopic bead-blasted tooth, and frosted child card containment.',
    anatomy: [
      { element: 'Outer Chassis Frame', desc: 'Rounded 28px enclosure with compound specular lip' },
      { element: 'Tooth Noise Overlay', desc: 'Microscopic 3.5% fractal noise preventing banding and digital flatness' },
      { element: 'Backdrop Filter', desc: '14px gaussian blur + 160% saturation boost for liquid refraction' },
      { element: 'Sunken Well / Frosted Cards', desc: 'High-contrast child content containers isolating text from chassis color' }
    ],
    props: [
      { prop: 'elevation', type: "'flat' | 'chassis' | 'elevated' | 'modal'", default: "'chassis'", desc: 'Elevation tier controlling shadow depth' },
      { prop: 'blurLevel', type: "'sm' | 'md' | 'lg'", default: "'md'", desc: 'Gaussian backdrop blur intensity' },
      { prop: 'toothTexture', type: 'boolean', default: 'true', desc: 'Enables microscopic bead-blasted SVG noise' },
      { prop: 'interactive', type: 'boolean', default: 'false', desc: 'Enables hover lift and refraction shimmer' }
    ],
    states: [
      { state: 'Resting', effect: '--shadow-polycarbonate-lip compound bevel rim' },
      { state: 'Interactive Hover', effect: 'translateY(-4px), 24px cyan halo dispersion' },
      { state: 'Modal Backdrop Active', effect: 'Overlay dimming with rgba(0,0,0,0.7) and backdrop-filter' }
    ],
    tokens: [
      '--panel-radius-chassis',
      '--panel-lip-bevel-shadow',
      '--panel-lip-bevel-hover',
      '--color-surface-glass',
      '--texture-noise-tooth'
    ],
    accessibility: [
      'Strict modal contrast protection: In light mode, chassis uses Bondi Blue with pure white headings and luminous ice subtext.',
      'All child cards use high-opacity frosted white or dark wells to prevent low-contrast text bleed.'
    ]
  },
  DeviceSimulatorPod: {
    name: 'DeviceSimulatorPod',
    version: '1.0.0',
    description: '1:1 Interactive hardware simulator pod modeling the HUSK-E physical AND logic gate, dual-halves docking, tactile D-pad, and high-contrast retro LCD.',
    anatomy: [
      { element: 'Atomic Purple Shell', desc: 'Translucent injection-molded portable console chassis' },
      { element: 'OLED / LCD Screen Well', desc: 'Sunken matte bezel with zero-nit black display & green/white pixel matrix' },
      { element: 'Tactile Cross D-Pad', desc: 'Injection-molded mechanical silicone cross switch with depressed state' },
      { element: 'NFC Magnetic Dock', desc: 'Interactive docking rail with snap physics and visual logic spark' }
    ],
    props: [
      { prop: 'partnerConnected', type: 'boolean', default: 'false', desc: 'Simulates physical NFC latch with second student device' },
      { prop: 'activePhase', type: 'number', default: '0', desc: 'Simulation phase step (0 to 5)' },
      { prop: 'displayMode', type: "'interactive' | 'cad-render'", default: "'interactive'", desc: 'Toggles live 1:1 simulator or 3D render' }
    ],
    states: [
      { state: 'Lecture Silence', effect: 'Single half waiting alone, sleeping pixel face, gate disconnected' },
      { state: 'Solo Attempt', effect: 'Red warning pulse, physical AND gate prevents single-user completion' },
      { state: 'NFC Snap & Bloom', effect: 'Both halves locked, magnetic latch chime, blooming partner pet' }
    ],
    tokens: [
      '--simulator-shell-chassis',
      '--simulator-screen-bg',
      '--simulator-screen-text',
      '--motion-ease-spring'
    ],
    accessibility: [
      'Device screen text strictly verified at > 12:1 contrast ratio against OLED black.',
      'Sound and motion indicators paired with explicit text status readouts for assistive tech.'
    ]
  }
};

export default function DesignTokensViewer({ isOpen, onClose }) {
  const [copiedToken, setCopiedToken] = useState(null);
  const [activeTier, setActiveTier] = useState('all'); // 'all' | 'tier1' | 'tier2' | 'tier3' | 'specs'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSpecComponent, setActiveSpecComponent] = useState('FrutigerSolarButton');

  const handleCopy = (token) => {
    navigator.clipboard?.writeText(token);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 1800);
  };

  // Filter tokens based on tier tab and search query
  const filteredGroups = useMemo(() => {
    return tokensData
      .filter(g => activeTier === 'all' || g.tier === activeTier)
      .map(g => {
        if (!searchQuery.trim()) return g;
        const q = searchQuery.toLowerCase();
        const matchingTokens = g.tokens.filter(
          t => t.name.toLowerCase().includes(q) ||
               t.role.toLowerCase().includes(q) ||
               t.val.toLowerCase().includes(q)
        );
        return matchingTokens.length > 0 ? { ...g, tokens: matchingTokens } : null;
      })
      .filter(Boolean);
  }, [activeTier, searchQuery]);

  const totalTokensCount = useMemo(() => {
    return tokensData.reduce((acc, g) => acc + g.tokens.length, 0);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="tokens-modal-container glass-panel" onClick={(e) => e.stopPropagation()}>

        {/* Modal Header */}
        <div className="tokens-modal-header">
          <div className="tokens-header-title">
            <Sliders size={22} className="inline-icon" />
            <div>
              <h3>Solar Aero Design System & Component Specs</h3>
              <p className="text-secondary text-xs">
                3-Tier Token Taxonomy & Production Component Specifications (per @Owl-Listener/designer-skills)
              </p>
            </div>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close dialog">
            <X size={20} />
          </button>
        </div>

        {/* Search & Tier Filter Bar */}
        <div className="tokens-filter-bar">
          <div className="tokens-search-box">
            <Search size={16} className="tokens-search-icon" />
            <input
              type="text"
              placeholder="Search token name, role, or hex value..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="tokens-search-input"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="tokens-search-clear">
                <X size={14} />
              </button>
            )}
          </div>

          <div className="tokens-tier-tabs">
            <button
              className={`tokens-tier-tab ${activeTier === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTier('all')}
            >
              All Tiers <span className="tier-pill-count">{totalTokensCount}</span>
            </button>
            <button
              className={`tokens-tier-tab ${activeTier === 'tier1' ? 'active' : ''}`}
              onClick={() => setActiveTier('tier1')}
            >
              Tier 1: Primitives
            </button>
            <button
              className={`tokens-tier-tab ${activeTier === 'tier2' ? 'active' : ''}`}
              onClick={() => setActiveTier('tier2')}
            >
              Tier 2: Semantic
            </button>
            <button
              className={`tokens-tier-tab ${activeTier === 'tier3' ? 'active' : ''}`}
              onClick={() => setActiveTier('tier3')}
            >
              Tier 3: Component Scoped
            </button>
            <button
              className={`tokens-tier-tab ${activeTier === 'specs' ? 'active' : ''}`}
              onClick={() => setActiveTier('specs')}
            >
              <FileText size={14} /> Component Specs
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="tokens-modal-body">

          {activeTier === 'specs' ? (
            /* Component Specs View */
            <div className="specs-container">
              <div className="specs-component-selector">
                {Object.keys(componentSpecs).map(compKey => (
                  <button
                    key={compKey}
                    className={`spec-comp-btn ${activeSpecComponent === compKey ? 'active' : ''}`}
                    onClick={() => setActiveSpecComponent(compKey)}
                  >
                    <Box size={14} />
                    <span>{compKey}</span>
                  </button>
                ))}
              </div>

              {(() => {
                const spec = componentSpecs[activeSpecComponent];
                return (
                  <div className="spec-sheet card-sunken">
                    <div className="spec-sheet-header">
                      <div>
                        <div className="spec-eyebrow">Production Specification • v{spec.version}</div>
                        <h4 className="spec-title">{spec.name}</h4>
                      </div>
                      <span className="spec-badge">Solar Aero Certified</span>
                    </div>

                    <p className="spec-description">{spec.description}</p>

                    {/* Anatomy */}
                    <div className="spec-section">
                      <h5>1. Physical & Visual Anatomy</h5>
                      <div className="spec-anatomy-grid">
                        {spec.anatomy.map((a, idx) => (
                          <div key={idx} className="spec-anatomy-card">
                            <span className="anatomy-num">{idx + 1}</span>
                            <div>
                              <strong>{a.element}</strong>
                              <p>{a.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Props & API */}
                    <div className="spec-section">
                      <h5>2. Component API & Props</h5>
                      <div className="spec-table-wrapper">
                        <table className="spec-table">
                          <thead>
                            <tr>
                              <th>Prop</th>
                              <th>Type</th>
                              <th>Default</th>
                              <th>Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {spec.props.map((p, idx) => (
                              <tr key={idx}>
                                <td><code>{p.prop}</code></td>
                                <td><span className="spec-type">{p.type}</span></td>
                                <td><code>{p.default}</code></td>
                                <td>{p.desc}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* States Matrix */}
                    <div className="spec-section">
                      <h5>3. Interaction & States Matrix</h5>
                      <div className="spec-states-grid">
                        {spec.states.map((s, idx) => (
                          <div key={idx} className="spec-state-pill">
                            <span className="state-name">{s.state}</span>
                            <span className="state-effect">{s.effect}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Design Token Bindings */}
                    <div className="spec-section">
                      <h5>4. Bound Design Tokens</h5>
                      <div className="spec-tokens-tags">
                        {spec.tokens.map(t => (
                          <span
                            key={t}
                            className="spec-token-tag"
                            onClick={() => handleCopy(`var(${t})`)}
                            title="Click to copy CSS var"
                          >
                            <code>var({t})</code>
                            {copiedToken === `var(${t})` ? <Check size={12} /> : <Copy size={12} />}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Accessibility */}
                    <div className="spec-section">
                      <h5>5. Accessibility & Ergonomics</h5>
                      <ul className="spec-a11y-list">
                        {spec.accessibility.map((a11y, idx) => (
                          <li key={idx}>{a11y}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            /* Tokens Listing View */
            filteredGroups.length === 0 ? (
              <div className="tokens-empty-state">
                <p>No design tokens match &quot;{searchQuery}&quot;</p>
                <button onClick={() => setSearchQuery('')} className="btn btn-secondary btn-sm">Clear Search</button>
              </div>
            ) : (
              filteredGroups.map(group => {
                const GroupIcon = group.groupIcon || Palette;
                return (
                  <div key={group.group} className="token-group">
                    <div className="token-group-header">
                      <div className="token-group-title">
                        <GroupIcon size={18} className="token-group-icon" />
                        <div>
                          <div className="token-group-heading-row">
                            <h4>{group.groupTitle}</h4>
                            <span className="token-tier-tag">{group.tierLabel}</span>
                          </div>
                          <p className="token-group-desc">{group.groupDesc}</p>
                        </div>
                      </div>
                    </div>

                    <div className="tokens-grid">
                      {group.tokens.map(t => (
                        <div
                          key={t.name}
                          className="token-item"
                          onClick={() => handleCopy(`var(${t.name})`)}
                          title="Click to copy CSS var"
                        >
                          {/* Visual Swatch for different token types */}
                          {t.type === 'color' && (
                            <div className="token-swatch" style={{ background: t.val }}></div>
                          )}
                          {t.type === 'color-alias' && (
                            <div className="token-swatch color-alias" style={{ background: `var(${t.name})` }}></div>
                          )}
                          {t.type === 'gradient' && (
                            <div className="token-swatch gradient" style={{ background: `var(${t.name})` }}></div>
                          )}
                          {t.type === 'space' && (
                            <div className="token-swatch space-swatch" title={`${t.px}px width`}>
                              <div className="space-meter" style={{ width: `${Math.min(t.px * 1.5, 24)}px` }}></div>
                            </div>
                          )}
                          {t.type === 'radius' && (
                            <div className="token-swatch radius-swatch" style={{ borderRadius: `var(${t.name})` }}></div>
                          )}
                          {t.type === 'shadow' && (
                            <div className="token-swatch shadow-swatch" style={{ boxShadow: `var(${t.name})` }}></div>
                          )}
                          {t.type === 'component' && (
                            <div className="token-swatch component-swatch">
                              <Cpu size={14} />
                            </div>
                          )}
                          {t.type === 'font' && (
                            <div className="token-swatch font-swatch">
                              <Type size={14} />
                            </div>
                          )}

                          <div className="token-info">
                            <span className="token-var">{t.name}</span>
                            <span className="token-val">{t.val}</span>
                            <span className="token-role">{t.role}</span>
                          </div>

                          <span className="copy-indicator" title="Copy CSS variable">
                            {copiedToken === `var(${t.name})` ? <Check size={14} className="copied-icon" /> : <Copy size={14} />}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            )
          )}

        </div>

        {/* Modal Footer */}
        <div className="tokens-modal-footer">
          <div className="footer-system-meta">
            <span className="meta-badge">Solar Aero v2.4</span>
            <span className="text-secondary text-xs">
              Compliant with <strong>design-token</strong> & <strong>component-spec</strong> engineering standards.
            </span>
          </div>
          <button onClick={onClose} className="btn btn-secondary btn-sm">Close Spec</button>
        </div>

      </div>
    </div>
  );
}
