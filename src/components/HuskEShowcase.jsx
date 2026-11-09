import React, { useState } from 'react';
import {
  Users, Sparkles, Zap, Heart, Clock, Shield, Cpu,
  ChevronRight, ArrowRight, Terminal, Wifi, Award
} from 'lucide-react';
import './HuskEShowcase.css';

export default function HuskEShowcase({ onOpenCaseStudy }) {
  // Device Interactive State
  const [studentA, setStudentA] = useState(false);
  const [studentB, setStudentB] = useState(false);
  const [isDocked, setIsDocked] = useState(false);
  const [activeScenario, setActiveScenario] = useState('lecture-silence');
  const [activeTab, setActiveTab] = useState('story'); // 'story' | 'matrix' | 'hardware'
  const [activeMatrixPhase, setActiveMatrixPhase] = useState(0);
  const [hardwareDrawerOpen, setHardwareDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState('interactive'); // 'interactive' | 'render'
  const [debugCode, setDebugCode] = useState('');
  const [debugActive, setDebugActive] = useState(false);
  const [hapticFeedback, setHapticFeedback] = useState(false);
  const [deviceMessage, setDeviceMessage] = useState('System Idle: Student A & B separated in lecture hall.');

  // AND Logic Gate calculation: both must be present (or docked)
  const isAndGateSatisfied = (studentA && studentB) || isDocked;

  // Trigger brief haptic visual feedback
  const triggerHaptic = (msg) => {
    setHapticFeedback(true);
    if (msg) setDeviceMessage(msg);
    setTimeout(() => setHapticFeedback(false), 450);
  };

  // Quick scenario presets
  const handleScenarioSelect = (scenarioKey) => {
    setActiveScenario(scenarioKey);
    if (scenarioKey === 'lecture-silence') {
      setStudentA(false);
      setStudentB(false);
      setIsDocked(false);
      triggerHaptic('Scenario 1: Sitting in silence. Units separated. AND gate is OPEN (0 & 0 = 0).');
    } else if (scenarioKey === 'solo-attempt') {
      setStudentA(true);
      setStudentB(false);
      setIsDocked(false);
      triggerHaptic('Scenario 2: Student A alone. Husk-E remains asleep (1 & 0 = 0).');
    } else if (scenarioKey === 'nfc-bump') {
      setStudentA(true);
      setStudentB(true);
      setIsDocked(true);
      triggerHaptic('Scenario 3: Zero-App NFC Snap! Both present. Husk-E awakens (1 & 1 = 1)!');
    } else if (scenarioKey === 'tomato-study') {
      setStudentA(true);
      setStudentB(true);
      setIsDocked(true);
      triggerHaptic('Scenario 4: 25-Min Tomato Mode locked in. Co-presence Pomodoro study.');
    } else if (scenarioKey === 'semester-prestige') {
      setStudentA(true);
      setStudentB(true);
      setIsDocked(true);
      triggerHaptic('Scenario 5: 42 Co-Study Hours Logged! Husk-E ascends to Prestige Orbit.');
    }
  };

  // Handle D-pad clicks
  const handleDpad = (direction) => {
    if (!isAndGateSatisfied) {
      triggerHaptic(`D-Pad ${direction}: Creature is asleep. Partner required to interact.`);
      return;
    }
    const actions = {
      up: 'Feed Shared Bento (+5 Affirmation)',
      down: 'Nap Mode (Synchronized rest)',
      left: 'Check Study Streak (Day 7)',
      right: 'Explore Campus Map (Suzzallo Library)'
    };
    triggerHaptic(`D-Pad ${direction}: ${actions[direction]}`);
  };

  // Handle Action Buttons
  const handleButtonA = () => {
    if (isAndGateSatisfied) {
      triggerHaptic('Button (A): Shared Petting! Both students feel synchronized haptic tick.');
    } else if (studentA && !studentB) {
      triggerHaptic('Button (A): Waiting for partner... Cannot nurture creature alone.');
    } else {
      triggerHaptic('Button (A): Device offline. Sit next to a classmate and dock NFC wing.');
    }
  };

  const handleButtonB = () => {
    setStudentA(false);
    setStudentB(false);
    setIsDocked(false);
    setActiveScenario('lecture-silence');
    setDebugActive(false);
    triggerHaptic('Button (B): Disconnected. Returning to idle lecture state.');
  };

  // Check Easter egg code
  const handleDebugInput = (e) => {
    const val = e.target.value;
    setDebugCode(val);
    if (val === '261911011999') {
      setDebugActive(true);
      triggerHaptic('SECRET UNLOCKED: Zoe Solaris Root Engineering & Diagnostics Menu!');
    }
  };

  // Friendship Matrix Phases (From UX Research)
  const friendshipPhases = [
    {
      phase: '01. Propinquity & Exposure',
      theory: 'Familiarity through Repeated Proximity',
      dilemma: 'Sitting 2 seats apart in a 400-seat lecture hall every Tuesday. Mutual awareness, but zero excuse to speak.',
      deviceRule: 'Passive NFC discovery beacon quietly pings compatible peers without alerting or creating social pressure.'
    },
    {
      phase: '02. The First Spark (NFC Bump)',
      theory: 'Safe Micro-Risk Catalysts',
      dilemma: 'Approaching a stranger carries fear of rejection or feeling awkward.',
      deviceRule: 'Zero-App NFC Bump: "Hey, want to pair our Husk-E for the class bonus?" The vulnerability is outsourced to the creature.'
    },
    {
      phase: '03. Reciprocity (The AND Gate)',
      theory: 'Mutual Investment & Interdependence',
      dilemma: 'Friendships fail when one person does all the emotional heavy lifting.',
      deviceRule: 'Physical AND Logic Gate: Creature only nurtures when BOTH show up. If one ghosts, growth halts without guilt-tripping.'
    },
    {
      phase: '04. Shared Ritual (Tomato Mode)',
      theory: 'Structured Time-in-Presence',
      dilemma: 'Awkward small talk runs out quickly if students don\'t have a shared task.',
      deviceRule: 'Built-in 25/5 Pomodoro co-study timers. The shared activity is the conversation anchor.'
    },
    {
      phase: '05. Self-Disclosure & Breaks',
      theory: 'Vulnerability in Low-Stakes Intervals',
      dilemma: 'Transitioning from study partners to real friends requires personal sharing.',
      deviceRule: '5-minute OLED rest animations prompt casual low-stakes conversation ("What major are you declaring?").'
    },
    {
      phase: '06. Prestige & Real Friendship',
      theory: 'Enduring Organic Bonds',
      dilemma: 'Will they remain friends after the semester ends and the class is over?',
      deviceRule: 'Prestige Rank: Device unlocks lifetime badge. The training wheels come off—the real-world friendship remains.'
    }
  ];

  return (
    <section id="husk-e-showcase" className="husk-showcase-section">
      <div className="container">

        {/* Showcase Header */}
        <div className="showcase-header">
          <div className="showcase-pill-badge">
            <Sparkles size={14} className="accent-sparkle" />
            <span>Interactive Systems & Emotional UX Showcase</span>
          </div>

          <h2 className="showcase-title">
            HUSK-E <span className="title-divider">•</span> <span className="gradient-text">The Physical AND Gate</span>
          </h2>

          <p className="showcase-quote">
            "They don’t need to learn how to make friends...<strong>they just need a spark.</strong>"
          </p>

          <p className="showcase-subtext">
            Every semester, thousands of college freshmen sit in crowded lecture halls surrounded by potential friends,
            paralyzed by the social risk of putting themselves out there alone. <strong>HUSK-E</strong> borrows the proven ergonomics
            of the <em>Game Boy</em> and the cognitive bonding loop of the <em>Tamagotchi</em>, but alters the core rule:
            <strong> it runs on a physical AND logic gate. Neither student can do it alone.</strong>
          </p>
        </div>

        {/* View Switcher: Interactive CAD Model vs 3D Spline Render */}
        <div className="model-view-switch-row">
          <div className="view-toggle-pills">
            <button
              className={`view-pill ${viewMode === 'interactive' ? 'active' : ''}`}
              onClick={() => setViewMode('interactive')}
            >
              <span>1:1 Interactive Device Prototype</span>
            </button>
            <button
              className={`view-pill ${viewMode === 'render' ? 'active' : ''}`}
              onClick={() => setViewMode('render')}
            >
              <span>Original 3D Fusion / Spline Render</span>
            </button>
          </div>
        </div>

        {/* Quick Scenario Jumps Strip */}
        <div className="scenario-nav-strip">
          <span className="strip-label">Simulate Student Journey:</span>
          <div className="scenario-buttons">
            <button
              className={`scenario-btn ${activeScenario === 'lecture-silence' ? 'active' : ''}`}
              onClick={() => handleScenarioSelect('lecture-silence')}
            >
              <span className="step-num">1</span>
              <span>Lecture Silence (Husk)</span>
            </button>
            <button
              className={`scenario-btn ${activeScenario === 'solo-attempt' ? 'active' : ''}`}
              onClick={() => handleScenarioSelect('solo-attempt')}
            >
              <span className="step-num">2</span>
              <span>Solo Attempt (Gate Fails)</span>
            </button>
            <button
              className={`scenario-btn ${activeScenario === 'nfc-bump' ? 'active' : ''}`}
              onClick={() => handleScenarioSelect('nfc-bump')}
            >
              <span className="step-num">3</span>
              <span>NFC Snap & Bloom!</span>
            </button>
            <button
              className={`scenario-btn ${activeScenario === 'tomato-study' ? 'active' : ''}`}
              onClick={() => handleScenarioSelect('tomato-study')}
            >
              <span className="step-num">4</span>
              <span>Tomato Mode (Co-Study)</span>
            </button>
            <button
              className={`scenario-btn ${activeScenario === 'semester-prestige' ? 'active' : ''}`}
              onClick={() => handleScenarioSelect('semester-prestige')}
            >
              <span className="step-num">5</span>
              <span>Semester Prestige</span>
            </button>
          </div>
        </div>

        {/* Main Stage: Device Pod + Right Narrative Column */}
        <div className="showcase-stage-grid">

          {/* LEFT: The Exact 2-Piece HUSK-E Physical Device */}
          <div className="device-pod-container">
            <div className="device-pod-header">
              <span className="pod-tag">Half Slice is a mock of another Device for demo purposes.</span>
              <span className="pod-dim">UW Purple 3D printed Shell Form!</span>
            </div>

            {viewMode === 'render' ? (
              /* High-Res 3D Spline Render View */
              <div className="device-render-photo-wrapper showcase-glass-card">
                <img
                  src="/projects/husk-e/hero_spline_render.png"
                  alt="HUSK-E Spline 3D Render"
                  className="spline-render-preview-img"
                />
                <div className="render-overlay-caption">
                  <div className="caption-title">HUSK-E 3D CAD & Spline Model</div>
                  <div className="caption-sub">Modeled in Autodesk Fusion 360 & rendered in Spline 3D. Features two-part modular interlocking assembly with zero-app NFC contact surface.</div>
                  <button
                    className="btn btn-sm btn-frutiger-solar switch-back-btn"
                    onClick={() => setViewMode('interactive')}
                  >
                    Switch to Interactive Simulator
                  </button>
                </div>
              </div>
            ) : (
              /* Interactive 1:1 Device Mockup matching the exact CAD blueprint and render */
              <div className={`husk-modular-assembly ${isDocked ? 'is-docked' : 'is-separated'} ${hapticFeedback ? 'haptic-pulse' : ''}`}>

                {/* 1. LEFT PIECE: NFC TARGET WING (STUDENT B / DOCK) */}
                <div
                  className={`husk-nfc-wing ${studentB || isDocked ? 'connected' : 'disconnected'}`}
                  onClick={() => {
                    const nextDocked = !isDocked;
                    setIsDocked(nextDocked);
                    setStudentB(nextDocked);
                    triggerHaptic(nextDocked ? 'NFC Wing Docked! Student B joined.' : 'NFC Wing Separated.');
                  }}
                  title="Click to Dock / Undock the NFC Wing"
                >
                  <div className="wing-inner-glow"></div>

                  {/* Large Charcoal Circular NFC Target Puck */}
                  <div className="nfc-target-puck">
                    <div className="nfc-puck-outer-ring">
                      <div className="nfc-puck-center">
                        <div className="nfc-waves-icon">(((•)))</div>
                        <div className="nfc-label-text">NFC</div>
                      </div>
                    </div>
                  </div>

                  {/* Regulatory Markings (FCC / Trashcan from render) */}
                  <div className="wing-regulatory-strip">
                    <span className="reg-fcc">FCC</span>
                    <span className="reg-trash">🗑</span>
                    <div className="reg-micro-text">Model HE-1 • 500mAh LiPo • ESP32-S3</div>
                  </div>

                  {/* Visual Mating Seam Prompt */}
                  <div className="wing-dock-indicator">
                    <span>{isDocked ? 'CONNECTED!' : 'TAP TO DOCK'}</span>
                  </div>
                </div>

                {/* 2. RIGHT PIECE: MAIN HUSK-E CONSOLE (STUDENT A) */}
                <div className="husk-main-console">
                  <div className="console-inner-glare"></div>

                  {/* 4 Corner Recessed Screws from the CAD Blueprint & Physical Print */}
                  <div className="corner-screw screw-top-left"><div className="screw-cross"></div></div>
                  <div className="corner-screw screw-top-right"><div className="screw-cross"></div></div>
                  <div className="corner-screw screw-bottom-left"><div className="screw-cross"></div></div>
                  <div className="corner-screw screw-bottom-right"><div className="screw-cross"></div></div>

                  {/* Hooded Screen Visor Bracket (Moved high up, clean chamfered window without vertical stripes or printed logo) */}
                  <div className="screen-visor-bracket">
                    {/* Recessed OLED Screen (128x64 aspect ratio) */}
                    <div className="recessed-oled-aperture">
                      <div className="pixel-scanlines"></div>

                      {/* Display Screen Routing */}
                      {debugActive ? (
                        <div className="oled-screen-content oled-debug">
                          <div className="debug-header">== ZOES DIAGNOSTICS ==</div>
                          <div className="debug-row">CORE: ESP32-S3 ZERO 240MHz</div>
                          <div className="debug-row">NFC: RC522 13.56MHz READY</div>
                          <div className="debug-row">BOM: $19.38 / $20.00 BUDGET</div>
                          <div className="debug-row">AUTH: 261911011999 (Z.S.)</div>
                          <button className="debug-exit-btn" onClick={() => setDebugActive(false)}>[EXIT]</button>
                        </div>
                      ) : activeScenario === 'lecture-silence' && !isAndGateSatisfied ? (
                        <div className="oled-screen-content oled-screen-wilting">
                          <div className="oled-top-label">Husk-E</div>
                          {/* Sleeping / Wilting Husk Dog */}
                          <div className="pixel-dog-scene">
                            <div className="pixel-husky husky-sleeping">
                              <span className="husky-face">( ˘ - ˘ )</span>
                              <span className="husky-sleep-z">z Z</span>
                            </div>
                            <div className="pixel-ground-line"></div>
                          </div>
                          <div className="oled-subtext">Waiting for partner...</div>
                        </div>
                      ) : activeScenario === 'solo-attempt' || (studentA && !studentB && !isDocked) ? (
                        <div className="oled-screen-content oled-screen-solo">
                          <div className="oled-top-label">Husk-E</div>
                          <div className="pixel-dog-scene">
                            <div className="pixel-husky husky-alert">
                              <span className="husky-face">( • _ • )?</span>
                            </div>
                            <div className="pixel-ground-line"></div>
                          </div>
                          <div className="oled-subtext">AND Gate: [1 & 0 = 0]</div>
                        </div>
                      ) : activeScenario === 'tomato-study' ? (
                        <div className="oled-screen-content oled-screen-tomato">
                          <div className="oled-top-label">Tomato Mode</div>
                          <div className="pixel-dog-scene">
                            <div className="pixel-husky husky-study">
                              <span className="husky-face">🍅 23:48</span>
                              <span className="husky-mug">☕</span>
                            </div>
                            <div className="pixel-ground-line"></div>
                          </div>
                          <div className="oled-subtext">Peer 1 & 2 Co-Focus</div>
                        </div>
                      ) : activeScenario === 'semester-prestige' ? (
                        <div className="oled-screen-content oled-screen-prestige">
                          <div className="oled-top-label">Prestige Buddy</div>
                          <div className="pixel-dog-scene">
                            <div className="pixel-husky husky-flying">
                              <span className="husky-face">★( ^ ▽ ^ )★</span>
                            </div>
                            <div className="pixel-ground-line orbit"></div>
                          </div>
                          <div className="oled-subtext">42 Hrs • Real Friends</div>
                        </div>
                      ) : (
                        /* Exact Awake / Blooming Husky Dog from User's Render */
                        <div className="oled-screen-content oled-screen-awake">
                          <div className="oled-top-label">Husk-E</div>
                          <div className="pixel-dog-scene">
                            <div className="pixel-husky husky-awake">
                              <svg className="husky-pixel-svg" viewBox="0 0 48 32" width="60" height="40">
                                {/* Ground Line */}
                                <line x1="0" y1="28" x2="48" y2="28" stroke="#ffffff" strokeWidth="1.5" />
                                {/* Dog Body Outline */}
                                <rect x="14" y="14" width="22" height="11" fill="none" stroke="#ffffff" strokeWidth="1.5" rx="2" />
                                {/* Head */}
                                <rect x="22" y="6" width="14" height="12" fill="none" stroke="#ffffff" strokeWidth="1.5" rx="2" />
                                {/* Left Ear */}
                                <polygon points="23,6 26,1 28,6" fill="#ffffff" />
                                {/* Right Ear */}
                                <polygon points="31,6 34,1 36,6" fill="#ffffff" />
                                {/* Eyes */}
                                <circle cx="27" cy="11" r="1.5" fill="#ffffff" />
                                <circle cx="32" cy="11" r="1.5" fill="#ffffff" />
                                {/* Smiling Mouth */}
                                <path d="M28 14 Q30 16 32 14" fill="none" stroke="#ffffff" strokeWidth="1.2" />
                                {/* 4 Legs */}
                                <line x1="16" y1="25" x2="16" y2="28" stroke="#ffffff" strokeWidth="1.5" />
                                <line x1="20" y1="25" x2="20" y2="28" stroke="#ffffff" strokeWidth="1.5" />
                                <line x1="28" y1="25" x2="28" y2="28" stroke="#ffffff" strokeWidth="1.5" />
                                <line x1="32" y1="25" x2="32" y2="28" stroke="#ffffff" strokeWidth="1.5" />
                                {/* Perky Tail */}
                                <path d="M14 16 Q10 13 11 9" fill="none" stroke="#ffffff" strokeWidth="1.5" />
                              </svg>
                            </div>
                          </div>
                          <div className="oled-subtext">Both Present • Bloom!</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Physical Controls Row (Moved UP into the upper-middle thumb zone) */}
                  <div className="console-controls-area">

                    {/* White D-Pad with Center Dimple Hole */}
                    <div className="exact-white-dpad" title="Tactile Directional Switch">
                      <button className="white-dpad-arm dpad-top" onClick={() => handleDpad('up')} aria-label="Up"></button>
                      <button className="white-dpad-arm dpad-bottom" onClick={() => handleDpad('down')} aria-label="Down"></button>
                      <button className="white-dpad-arm dpad-left" onClick={() => handleDpad('left')} aria-label="Left"></button>
                      <button className="white-dpad-arm dpad-right" onClick={() => handleDpad('right')} aria-label="Right"></button>
                      <div className="white-dpad-center">
                        <div className="dpad-center-dimple"></div>
                      </div>
                    </div>

                    {/* Two Dark Slate Convex Dome Buttons (Asymmetric Sizes on Diagonal) */}
                    <div className="exact-slate-buttons">
                      {/* Lower Button: Diameter 0.51" (Reset / Disconnect) */}
                      <button
                        className="slate-dome-button button-lower"
                        onClick={handleButtonB}
                        title="Button (B): Disconnect / Reset"
                      >
                        <div className="dome-specular-highlight"></div>
                      </button>

                      {/* Upper Button: Diameter 0.65" (Nurture / Co-Pet) */}
                      <button
                        className="slate-dome-button button-upper"
                        onClick={handleButtonA}
                        title="Button (A): Shared Nurture"
                      >
                        <div className="dome-specular-highlight"></div>
                      </button>
                    </div>

                  </div>

                  {/* Ergonomic Lower Palm Rest (Uninterrupted smooth chassis surface) */}
                  <div className="console-palm-rest"></div>

                </div>

              </div>
            )}

            {/* Bottom Physical Touchpoints & Quick Actions */}
            <div className="physical-interact-controls">

              <div className="touchpoints-strip">
                <button
                  className={`touchpoint-toggle ${studentA ? 'engaged' : ''}`}
                  onClick={() => {
                    setStudentA(!studentA);
                    triggerHaptic(`Student A ${!studentA ? 'present' : 'left'}.`);
                  }}
                >
                  <div className="toggle-dot"></div>
                  <span>Student A Console ({studentA ? 'Active' : 'Offline'})</span>
                </button>

                <div className="and-symbol">∧</div>

                <button
                  className={`touchpoint-toggle ${studentB || isDocked ? 'engaged' : ''}`}
                  onClick={() => {
                    const next = !studentB;
                    setStudentB(next);
                    setIsDocked(next);
                    triggerHaptic(`Student B NFC Wing ${next ? 'Docked' : 'Separated'}.`);
                  }}
                >
                  <div className="toggle-dot"></div>
                  <span>Student B NFC Wing ({studentB || isDocked ? 'Docked' : 'Uncoupled'})</span>
                </button>
              </div>

              {/* Status Ticker */}
              <div className="console-status-ticker">
                <Terminal size={12} className="ticker-icon" />
                <span className="ticker-text">{deviceMessage}</span>
              </div>

            </div>

          </div>

          {/* RIGHT: Cognitive Architecture & The Story Cards */}
          <div className="showcase-content-pod">

            {/* View Selector Tabs */}
            <div className="pod-tab-nav">
              <button
                className={`pod-tab-btn ${activeTab === 'story' ? 'active' : ''}`}
                onClick={() => setActiveTab('story')}
              >
                <Heart size={15} />
                <span>The Emotional Hook</span>
              </button>
              <button
                className={`pod-tab-btn ${activeTab === 'matrix' ? 'active' : ''}`}
                onClick={() => setActiveTab('matrix')}
              >
                <Users size={15} />
                <span>6 Phases of Friendship</span>
              </button>
              <button
                className={`pod-tab-btn ${activeTab === 'hardware' ? 'active' : ''}`}
                onClick={() => setActiveTab('hardware')}
              >
                <Cpu size={15} />
                <span>$19.38 Hardware & BOM</span>
              </button>
            </div>

            {/* TAB 1: THE EMOTIONAL HOOK & BEHAVIORAL LOGIC */}
            {activeTab === 'story' && (
              <div className="tab-pane-content fade-in">

                <div className="story-card-highlight showcase-glass-card">
                  <div className="story-card-top">
                    <span className="story-pill">Core Psychological Insight</span>
                    <span className="story-author">Zoe Solaris IxD Framework</span>
                  </div>
                  <h3 className="story-heading">
                    Overcoming the Fear of Rejection Through a Shared Third Object
                  </h3>
                  <p className="story-body">
                    Freshmen and transfer students in lecture halls don't lack social skills—they lack a
                    <strong> risk-free catalyst</strong>. Introducing oneself to a stranger feels vulnerable.
                    By introducing a companion pet that requires two humans to nurture, the social vulnerability
                    is outsourced:
                  </p>

                  <div className="quote-callout">
                    <p className="quote-text">
                      "Pokemon proved that shared creature-raising creates real social bonds between strangers.
                      Tamagotchis create a bond through care and feeding. Husk-E turns showing up for your pet
                      into showing up for each other."
                    </p>
                  </div>
                </div>

                {/* Behavioral Rules Grid */}
                <div className="behavioral-rules-grid">
                  <div className="rule-card">
                    <div className="rule-icon and-gate">
                      <Zap size={18} />
                    </div>
                    <div className="rule-info">
                      <h4>The Physical AND Gate</h4>
                      <p>
                        Neither student can play alone. If one attends class without the other, the creature stays a "Husk".
                        Both must commit for the creature to awaken.
                      </p>
                    </div>
                  </div>

                  <div className="rule-card">
                    <div className="rule-icon zero-app">
                      <Wifi size={18} />
                    </div>
                    <div className="rule-info">
                      <h4>Zero-App NFC Pairing</h4>
                      <p>
                        No QR codes, no app stores, no account signups. A single physical bump creates an encrypted
                        peer-to-peer pairing in 400 milliseconds.
                      </p>
                    </div>
                  </div>

                  <div className="rule-card">
                    <div className="rule-icon tomato">
                      <Clock size={18} />
                    </div>
                    <div className="rule-info">
                      <h4>Tomato Co-Study Rituals</h4>
                      <p>
                        Built-in 25-minute Pomodoro study cycles. The device provides a natural conversational boundary:
                        intense quiet focus during study, natural low-pressure conversation during breaks.
                      </p>
                    </div>
                  </div>

                  <div className="rule-card">
                    <div className="rule-icon human-first">
                      <Shield size={18} />
                    </div>
                    <div className="rule-info">
                      <h4>Human-First Fallback</h4>
                      <p>
                        Designed never to be more interesting than the human sitting beside you. Once the organic friendship
                        stabilizes, the device gracefully recedes.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: THE 6 PHASES OF FRIENDSHIP MATRIX */}
            {activeTab === 'matrix' && (
              <div className="tab-pane-content fade-in">
                <div className="matrix-explainer showcase-glass-card">
                  <p className="matrix-summary">
                    Psychological research shows that adult friendships require roughly <strong>50 hours of co-presence</strong>
                    to transition from acquaintance to casual friend, and <strong>200 hours</strong> for a close friend.
                    HUSK-E's interaction engine maps directly to these 6 psychological milestones:
                  </p>
                </div>

                <div className="matrix-steps-list">
                  {friendshipPhases.map((phase, idx) => (
                    <div
                      key={idx}
                      className={`matrix-step-card ${activeMatrixPhase === idx ? 'expanded' : ''}`}
                      onClick={() => setActiveMatrixPhase(idx)}
                    >
                      <div className="matrix-step-header">
                        <span className="step-badge">{phase.phase}</span>
                        <span className="step-theory">{phase.theory}</span>
                        <ChevronRight size={16} className="chevron-toggle" />
                      </div>

                      <div className="matrix-step-details">
                        <div className="detail-row">
                          <span className="detail-tag dilemma">Human Dilemma:</span>
                          <span className="detail-val">{phase.dilemma}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-tag rule">HUSK-E System Rule:</span>
                          <span className="detail-val highlight">{phase.deviceRule}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: $19.38 BOM & FEASIBILITY */}
            {activeTab === 'hardware' && (
              <div className="tab-pane-content fade-in">
                <div className="hardware-hero-card showcase-glass-card">
                  <div className="bom-highlight-badge">
                    <Award size={16} />
                    <span>Feasibility Score: $19.38 Actual BOM / $20.00 Target</span>
                  </div>
                  <h3>Engineered for University-Scale Deployment</h3>
                  <p>
                    Most academic design concepts die because they require $120 custom PCBs.
                    HUSK-E was cost-engineered to be gifted to all <strong>7,129 incoming University of Washington freshmen</strong>
                    within a standard $20 orientation tech budget ($142,580 cohort allocation with $4,419 contingency reserve).
                  </p>
                </div>

                {/* Itemized BOM Table */}
                <div className="bom-table-wrap">
                  <table className="bom-table">
                    <thead>
                      <tr>
                        <th>Sub-Component</th>
                        <th>Specific Part Spec</th>
                        <th>Dimensions</th>
                        <th>Unit Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Processing Core</strong></td>
                        <td>ESP32-S3 Zero (240MHz, BLE/Wi-Fi)</td>
                        <td>22 x 18 mm</td>
                        <td className="cost-num">$3.80</td>
                      </tr>
                      <tr>
                        <td><strong>Display Screen</strong></td>
                        <td>SSD1306 OLED (128x64 Monochrome)</td>
                        <td>35 x 28 mm</td>
                        <td className="cost-num">$2.10</td>
                      </tr>
                      <tr>
                        <td><strong>Proximity / Pairing</strong></td>
                        <td>RC522 RFID / Zero-App NFC Module</td>
                        <td>40 x 30 mm</td>
                        <td className="cost-num">$1.65</td>
                      </tr>
                      <tr>
                        <td><strong>Battery & Power</strong></td>
                        <td>LiPo 3.7V 500mAh + TP4056 USB-C Charger</td>
                        <td>40 x 30 x 5 mm</td>
                        <td className="cost-num">$4.15</td>
                      </tr>
                      <tr>
                        <td><strong>Haptics & Switches</strong></td>
                        <td>10mm Coin Motor + 6x Tactile Microswitches</td>
                        <td>10 mm dia</td>
                        <td className="cost-num">$2.85</td>
                      </tr>
                      <tr>
                        <td><strong>Chassis & Lens</strong></td>
                        <td>Bio-Resin 3D Print + Polycarbonate Filter</td>
                        <td>Custom Shell</td>
                        <td className="cost-num">$4.83</td>
                      </tr>
                      <tr className="bom-total-row">
                        <td colSpan={3}><strong>TOTAL BILL OF MATERIALS (BOM)</strong></td>
                        <td className="cost-total"><strong>$19.38</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="easter-egg-debug-box">
                  <div className="debug-input-label">
                    <Terminal size={14} />
                    <span>Secret Admin / Diagnostics Terminal:</span>
                  </div>
                  <div className="debug-input-row">
                    <input
                      type="text"
                      placeholder="Enter Admin Code (Hint: 2026)"
                      value={debugCode}
                      onChange={handleDebugInput}
                      className="debug-code-input"
                    />
                    <button
                      className="debug-quick-fill-btn"
                      onClick={() => {
                        setDebugCode('2026');
                        setDebugActive(true);
                        triggerHaptic('SECRET UNLOCKED: Diagnostics Menu Activated!');
                      }}
                    >
                      Fill Easter Egg Code
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* Bottom Actions Row: Modal trigger + CAD Drawer toggle */}
            <div className="showcase-bottom-actions">
              <button
                className="btn btn-frutiger-solar btn-md"
                onClick={onOpenCaseStudy}
              >
                <span>Read Full HUSK-E Case Study</span>
                <ArrowRight size={16} />
              </button>
              <button
                className="btn btn-frutiger-outline btn-md"
                onClick={() => setHardwareDrawerOpen(!hardwareDrawerOpen)}
              >
                <Cpu size={16} />
                <span>{hardwareDrawerOpen ? 'Hide CAD Blueprints' : 'View CAD Blueprints & Slices'}</span>
              </button>
            </div>

          </div>

        </div>

        {/* EXPANDABLE PHYSICAL CAD & BLUEPRINT DRAWER */}
        {hardwareDrawerOpen && (
          <div className="hardware-cad-drawer showcase-glass-card fade-in">
            <div className="cad-drawer-header">
              <div>
                <span className="cad-tag">Industrial Design & Physical Slices</span>
                <h3 className="cad-title">Fusion 360 Blueprints & Assembly Breakdown</h3>
              </div>
              <button
                className="close-drawer-btn"
                onClick={() => setHardwareDrawerOpen(false)}
              >
                ✕ Close Blueprints
              </button>
            </div>

            <div className="cad-images-grid">
              <div className="cad-artifact-card">
                <img
                  src="/projects/husk-e/prototype_3d_print.png"
                  alt="HUSK-E Purple 3D Printed Front Chassis"
                  className="cad-img"
                />
                <div className="cad-caption">
                  <strong>3D Printed Ergonomic Shell:</strong> SLA resin print in UW purple, modeled in Fusion 360 with recessed OLED bezel and chamfered button wells.
                </div>
              </div>

              <div className="cad-artifact-card">
                <img
                  src="/projects/husk-e/prototype_internal_slice.png"
                  alt="Internal Assembly & Component Stacking Slice"
                  className="cad-img"
                />
                <div className="cad-caption">
                  <strong>Internal Component Stacking:</strong> Engineered to keep overall thickness under 16mm while nesting the LiPo cell beneath the logic board.
                </div>
              </div>

              <div className="cad-artifact-card">
                <img
                  src="/projects/husk-e/storyboard_9_panel.png"
                  alt="9-Panel User Journey Storyboard"
                  className="cad-img"
                />
                <div className="cad-caption">
                  <strong>9-Panel Co-Presence Storyboard:</strong> Visualizing how two unfamiliar students transition from awkward proximity to shared micro-rituals.
                </div>
              </div>

              <div className="cad-artifact-card">
                <img
                  src="/projects/husk-e/ux_flow_emotion_engine.png"
                  alt="Emotion Engine & State Machine Architecture"
                  className="cad-img"
                />
                <div className="cad-caption">
                  <strong>Emotion Engine State Machine:</strong> The complete behavioral flow mapping idle intervals, neglect thresholds, and revival loops.
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
