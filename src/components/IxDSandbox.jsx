import React, { useState } from 'react';
import { Terminal, Volume2, Play, Cpu, Activity, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function IxDSandbox() {
  const [activeLab, setActiveLab] = useState('solari');

  // Lab 1: Solari Voice State
  const [activeModel, setActiveModel] = useState('Gemma 2B (Local)');
  const [activePersonality, setActivePersonality] = useState('GLaDOS');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [dialogueIndex, setDialogueIndex] = useState(0);

  const solariDialogues = {
    GLaDOS: [
      "Local server initialized on Legion Go. Notice the absence of corporate telemetry. How refreshing.",
      "Audio distortion masked via synthesized cadence. Your local neural weights are functioning optimally.",
      "Classified submarine communication protocols detected. Welcome back, specialist Solaris."
    ],
    Empathetic: [
      "Hey Zoe! We are running completely offline. Your thoughts remain entirely yours.",
      "Take your time. Good interaction design emerges from listening, not rushing.",
      "How are you feeling about the 3D housing module today?"
    ],
    Analytical: [
      "Metrology matrix engaged: 0.67 nanometers per pixel calibrated. Van der Waals stress tensor loaded.",
      "Diffusion rate calculation: Tesla Valve geometry shows 38.4% reduction in directional turbulence.",
      "Model latency: 12ms. Zero remote cloud dependencies."
    ]
  };

  const handleSpeak = () => {
    setIsSpeaking(true);
    setTimeout(() => {
      setIsSpeaking(false);
      setDialogueIndex((prev) => (prev + 1) % solariDialogues[activePersonality].length);
    }, 2800);
  };

  // Lab 2: Melon Loop State
  const [coinCount, setCoinCount] = useState(0);
  const [compulsionPhase, setCompulsionPhase] = useState(1);
  const [viewMode, setViewMode] = useState('dark-pattern'); // 'dark-pattern' | 'ethical'

  const handleTapCoin = () => {
    setCoinCount(prev => prev + (viewMode === 'dark-pattern' ? 10 : 1));
    setCompulsionPhase(prev => (prev % 4) + 1);
  };

  // Lab 3: Metrology Slider State
  const [magnification, setMagnification] = useState(1);
  const [circuitType, setCircuitType] = useState('tesla'); // 'tesla' | 'spider'

  return (
    <section id="sandboxes" className="section sandboxes-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <Terminal size={16} />
            <span>Interactive Interaction Design Labs</span>
          </div>
          <h2 className="section-title">
            Test & Touch <span className="gradient-text">Live Prototypes</span>
          </h2>
          <p className="section-description">
            Great interaction design isn’t demonstrated with static mockups. Interact with these live 
            simulations of key project concepts directly in your browser.
          </p>
        </div>

        {/* Lab Switcher Tabs */}
        <div className="sandbox-tab-bar">
          <button
            onClick={() => setActiveLab('solari')}
            className={`sandbox-tab ${activeLab === 'solari' ? 'active' : ''}`}
          >
            <Volume2 size={16} />
            <span>Lab 1: Solari Cybernetic Voice I/O</span>
          </button>
          <button
            onClick={() => setActiveLab('melon')}
            className={`sandbox-tab ${activeLab === 'melon' ? 'active' : ''}`}
          >
            <Activity size={16} />
            <span>Lab 2: Dopamine Loop Deconstructor</span>
          </button>
          <button
            onClick={() => setActiveLab('metrology')}
            className={`sandbox-tab ${activeLab === 'metrology' ? 'active' : ''}`}
          >
            <Cpu size={16} />
            <span>Lab 3: 0.67nm Nano-Metrology Tool</span>
          </button>
        </div>

        {/* LAB 1: SOLARI CYBERNETIC VOICE SIMULATOR */}
        {activeLab === 'solari' && (
          <div className="sandbox-card glass-panel">
            <div className="sandbox-header">
              <div className="sandbox-title-group">
                <span className="pill-badge">Cybernetic Interface Simulation</span>
                <h3>Project Solari: Local Voice & Personality Engine</h3>
                <p className="text-secondary">
                  Testing Zoe's Legion Go hardware stack: Gemma 2B local weights, Whisper STT, and voice routing through OpenShokz bone conduction.
                </p>
              </div>
              <div className="sandbox-hardware-badge">
                <span className="dot success"></span>
                <span>Hardware: Legion Go (16GB RAM) • Local Server</span>
              </div>
            </div>

            <div className="solari-ui-grid">
              
              {/* Controls Column */}
              <div className="solari-controls">
                <div className="control-group">
                  <label className="control-label">Local Model Architecture:</label>
                  <div className="btn-group-row">
                    {['Gemma 2B (Local)', 'Whisper V3', 'Piper TTS'].map(m => (
                      <button
                        key={m}
                        onClick={() => setActiveModel(m)}
                        className={`mini-pill-btn ${activeModel === m ? 'active' : ''}`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="control-group">
                  <label className="control-label">Voice Personality Routing:</label>
                  <div className="btn-group-row">
                    {[
                      { id: 'GLaDOS', label: 'GLaDOS (Masks Distortion)' },
                      { id: 'Empathetic', label: 'Empathetic Co-Designer' },
                      { id: 'Analytical', label: '0.67nm Lab Metrology' }
                    ].map(p => (
                      <button
                        key={p.id}
                        onClick={() => { setActivePersonality(p.id); setDialogueIndex(0); }}
                        className={`mini-pill-btn ${activePersonality === p.id ? 'active' : ''}`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="solari-privacy-callout">
                  <ShieldCheck size={18} className="shield-icon" />
                  <div>
                    <strong>100% Air-Gapped Local Inference</strong>
                    <p className="text-muted text-sm">Zero cloud logs, zero subscription lock-in, zero privacy compromises.</p>
                  </div>
                </div>
              </div>

              {/* Terminal & Audio Display */}
              <div className="solari-terminal-panel">
                <div className="terminal-topbar">
                  <div className="term-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <span className="term-title">solari-core://legion-go/local-bus</span>
                  <span className="term-status">{isSpeaking ? 'TRANSMITTING' : 'LISTENING'}</span>
                </div>

                <div className="terminal-screen">
                  
                  {/* Waveform Visualizer */}
                  <div className={`audio-waveform ${isSpeaking ? 'active' : ''}`}>
                    {[40, 75, 20, 90, 60, 30, 85, 45, 95, 65, 35, 80, 50, 70, 25, 90].map((h, i) => (
                      <span 
                        key={i} 
                        className="wave-bar" 
                        style={{ height: isSpeaking ? `${h}%` : '15%' }}
                      ></span>
                    ))}
                  </div>

                  {/* Dialogue Bubble */}
                  <div className="solari-speech-bubble">
                    <span className="personality-tag">[{activePersonality}]</span>
                    <p className="speech-text">
                      "{solariDialogues[activePersonality][dialogueIndex]}"
                    </p>
                  </div>

                  {/* Trigger Button */}
                  <div className="terminal-actions">
                    <button 
                      onClick={handleSpeak} 
                      disabled={isSpeaking}
                      className="btn btn-primary"
                    >
                      <Play size={16} />
                      <span>{isSpeaking ? 'Transmitting Audio...' : 'Test Speech I/O Prompt'}</span>
                    </button>
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}

        {/* LAB 2: MELON LOOP DECONSTRUCTOR */}
        {activeLab === 'melon' && (
          <div className="sandbox-card glass-panel">
            <div className="sandbox-header">
              <div className="sandbox-title-group">
                <span className="pill-badge award">Game IxD Mechanics</span>
                <h3>Melon Laughs At Dopamine Addicts: Loop Deconstructor</h3>
                <p className="text-secondary">
                  Investigate how manipulative digital mechanics trigger human dopamine pathways, and compare them with transparent IxD.
                </p>
              </div>

              <div className="mode-toggle-group">
                <button 
                  onClick={() => setViewMode('dark-pattern')}
                  className={`mode-btn ${viewMode === 'dark-pattern' ? 'active alert' : ''}`}
                >
                  <AlertTriangle size={14} />
                  <span>Exploitative Dark Pattern</span>
                </button>
                <button 
                  onClick={() => setViewMode('ethical')}
                  className={`mode-btn ${viewMode === 'ethical' ? 'active success' : ''}`}
                >
                  <ShieldCheck size={14} />
                  <span>Ethical Transparent Design</span>
                </button>
              </div>
            </div>

            <div className="melon-interactive-grid">
              
              {/* Interactive Melon Tap Box */}
              <div className="melon-tap-card">
                <div className="melon-avatar-box">
                  <div className={`melon-avatar ${isSpeaking ? 'bounce' : ''}`}>
                    🍉
                  </div>
                  <div className="melon-counter">
                    <span className="counter-value">{coinCount}</span>
                    <span className="counter-label">Pulp Coins Minted</span>
                  </div>
                </div>

                <button onClick={handleTapCoin} className="btn btn-primary btn-block">
                  <span>Tap to Feed Dopamine Engine</span>
                </button>
                <p className="tap-hint">Every click advances the 4-phase behavioral compulsion loop.</p>
              </div>

              {/* 4-Phase Compulsion Loop Map */}
              <div className="compulsion-loop-grid">
                {[
                  {
                    step: 1,
                    title: '1. Trigger (FOMO / Notification)',
                    dark: 'Unpredictable chime signals you will lose rank if you ignore the CEO melon.',
                    ethical: 'Calm, non-intrusive notification badge honoring your quiet focus hours.'
                  },
                  {
                    step: 2,
                    title: '2. Action (Frictionless Tap)',
                    dark: 'Zero physical resistance; taps feel instantly satisfying and frictionless.',
                    ethical: 'Transparent effort indicator and natural stopping cues.'
                  },
                  {
                    step: 3,
                    title: '3. Variable Reward (Dopamine Spike)',
                    dark: 'Slot-machine randomness: sometimes 10 coins, sometimes 1000! Keeps brain hooked.',
                    ethical: 'Predictable, direct output matching exact user input without artificial gambling.'
                  },
                  {
                    step: 4,
                    title: '4. Sunk Cost Investment',
                    dark: 'Forces player to buy upgrades so walking away feels like losing past effort.',
                    ethical: 'Easy data export, clean exit, and zero penalty for closing the tab.'
                  }
                ].map(item => (
                  <div 
                    key={item.step} 
                    className={`loop-step-card ${compulsionPhase === item.step ? 'active-step' : ''}`}
                  >
                    <div className="step-num-badge">Phase {item.step}</div>
                    <h5 className="step-title">{item.title}</h5>
                    <p className="step-desc">
                      {viewMode === 'dark-pattern' ? item.dark : item.ethical}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* LAB 3: PALLADIUM NANO-METROLOGY TOOL */}
        {activeLab === 'metrology' && (
          <div className="sandbox-card glass-panel">
            <div className="sandbox-header">
              <div className="sandbox-title-group">
                <span className="pill-badge award">Best in Engineering (OSU LSAMP 2025)</span>
                <h3>Palladium Diffusion Circuit: 0.67 nm / Pixel Metrology</h3>
                <p className="text-secondary">
                  Zoe’s custom GNU Octave measurement algorithm comparing Tesla Valve directional fluidics against traditional spider electrodes.
                </p>
              </div>

              <div className="btn-group-row">
                <button
                  onClick={() => setCircuitType('tesla')}
                  className={`mini-pill-btn ${circuitType === 'tesla' ? 'active' : ''}`}
                >
                  Nikola Tesla Valve Geometry (Proposed)
                </button>
                <button
                  onClick={() => setCircuitType('spider')}
                  className={`mini-pill-btn ${circuitType === 'spider' ? 'active' : ''}`}
                >
                  Traditional Spider Geometry (Flawed)
                </button>
              </div>
            </div>

            <div className="metrology-grid">
              
              {/* Microscope Calibration Box */}
              <div className="microscope-viewport glass-panel">
                <div className="viewport-overlay">
                  <span className="scale-legend">Scale: 0.67 nm / px (Calibrated)</span>
                  <span className="scale-zoom">Zoom: {magnification}x</span>
                </div>

                <div className="schematic-display">
                  <div className={`circuit-render ${circuitType}`}>
                    {circuitType === 'tesla' ? (
                      <div className="tesla-diagram-preview">
                        <div className="flow-arrow right"></div>
                        <div className="valve-fin fin-1"></div>
                        <div className="valve-fin fin-2"></div>
                        <div className="valve-fin fin-3"></div>
                        <span className="circuit-caption">Directional Diffusion Isolated • Zero Moving Parts</span>
                      </div>
                    ) : (
                      <div className="spider-diagram-preview">
                        <div className="spider-leg leg-1"></div>
                        <div className="spider-leg leg-2"></div>
                        <div className="spider-leg leg-3"></div>
                        <div className="spider-leg leg-4"></div>
                        <span className="circuit-caption">Chaotic Multi-Vector Interference • Uncalculable Rates</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="slider-control-bar">
                  <label className="text-sm">Adjust Metrology Magnification:</label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="0.5"
                    value={magnification}
                    onChange={(e) => setMagnification(parseFloat(e.target.value))}
                    className="range-slider"
                  />
                </div>
              </div>

              {/* Data & Insights */}
              <div className="metrology-data-card">
                <h4 className="data-heading">GNU Octave Metrology Readout</h4>
                
                <div className="data-metrics-list">
                  <div className="data-metric-row">
                    <span className="metric-label">Calculated Diffusion Efficiency:</span>
                    <strong className="metric-val">{circuitType === 'tesla' ? '+38.4% Precision' : '-62.1% Noise'}</strong>
                  </div>
                  <div className="data-metric-row">
                    <span className="metric-label">Fickian Pressure Tolerance:</span>
                    <strong className="metric-val">{circuitType === 'tesla' ? 'High (Isolated Channels)' : 'Unstable (Cross-interference)'}</strong>
                  </div>
                  <div className="data-metric-row">
                    <span className="metric-label">Van der Waals Simulation Time:</span>
                    <strong className="metric-val">Saved ~1,200 lab hours</strong>
                  </div>
                </div>

                <div className="quote-box-mini">
                  <p>
                    "Integrating machine learning to model stress behaviors before fabrication prevents catastrophic chip failures. Smarter material design is the missing bridge to future AI compute demand."
                  </p>
                  <cite>— From Zoe's OSU LSAMP Research Poster</cite>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
