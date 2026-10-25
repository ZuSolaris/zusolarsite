# Zoe Solaris — Interaction Design & Systems Engineering Portfolio

> **Solar Aero Aesthetic**: Translucent injection-molded acrylic casings, physical bevel catch-lights, and an interactive domain-warped GLSL fluid shader paired with engineering-grade systems case studies.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![WebGL](https://img.shields.io/badge/WebGL-GLSL%20Shader-990000?logo=opengl&logoColor=white)](https://www.khronos.org/webgl/)
[![CSS3](https://img.shields.io/badge/Styling-Solar%20Aero%20Design%20Tokens-1572B6?logo=css3&logoColor=white)](src/index.css)

---

## 🌊 Overview & Design Philosophy

This portfolio showcases the intersection of **hardware prototyping, physical computing, and complex systems interaction design (IxD)**. Rather than relying on flat minimalist templates, the interface is engineered around the **Solar Aero** design language—inspired by translucent 90s/2000s consumer electronics (Bondi Blue iMac G3, Nintendo transparent casings, 8BitDo industrial design) with modern WebGL graphics and AAA typography contrast.

### Key Highlights

1. **Interactive GLSL Fluid Flow Shader (`FlowShaderCanvas.jsx`)**:
   - 60fps fullscreen WebGL canvas using Fractional Brownian Motion (fBm) and domain warping.
   - Real-time mouse physics and wave distortion.
   - Dynamic dark/light color interpolation matching Zoe's brand logo palette (Electric Cobalt `#5663ff`, Sky Azure `#67a8ff`, Lavender `#91bafe`, and Pearlescent Ice `#eff6fb`).

2. **Solar Aero Design System**:
   - Compound layered inner shadows simulating injection-molded polycarbonate wall bevels.
   - Subsurface scattering milkiness and specular ambient catch-lights.
   - Tactile gumdrop pill navigation and recessed socket trays.
   - Built-in interactive **Design Tokens Viewer** for inspecting live CSS variables.

3. **Featured Case Studies**:
   - **HUSK-E Companion**: Handheld pro-social study companion featuring BUD-E system logic, multi-phase friendship state machine, CAD dimension blueprints, 3D PLA print cross-section slices, and an exact **$19.38 Bill of Materials (BOM)** feasibility analysis.
   - **Bioluminescent UI System**: Deep-sea organic telemetry HUD designed for extreme dark environments.
   - **Parametric 3D-Printed Housing**: Rapid emergency modular shelter assembly and field robotics interface.
   - **Tactile Neurodiversity Controller**: Sensory-adaptive input ergonomics for neurodiverse tactile focus.

4. **Interactive IxD Labs**:
   - **Fitts's Law Target Acquisition Tester**: Live mathematical testing of target width ($W$), distance ($D$), and Index of Difficulty ($ID$).
   - **Haptic Timing & Easing Curve Studio**: Interactive cubic-bezier motion editor with live velocity telemetry.
   - **Sonic Interaction Wave Simulator**: Real-time multi-frequency synthesis simulator.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/ZuSolaris/zusolarsite.git
cd zusolarsite

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Building for Production

```bash
# Type check & build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Structure

```
Portfolio/
├── public/
│   ├── projects/          # High-res CAD, 3D prints, renders & diagrams
│   │   ├── husk-e/        # HUSK-E hardware, logic & BOM assets
│   │   ├── jellyfish/     # Bioluminescent UI assets
│   │   └── printed-home/  # 3D printed housing schematics
│   ├── logo.png           # Brand emblem
│   └── Zoe_Solaris_Resume.pdf
├── src/
│   ├── components/
│   │   ├── FlowShaderCanvas.jsx    # WebGL GLSL fluid shader
│   │   ├── Navbar.jsx              # Recessed chassis navigation
│   │   ├── Hero.jsx                # Hero section & quick stats
│   │   ├── ProjectGrid.jsx         # Case studies & category filters
│   │   ├── CaseStudyModal.jsx      # Full-bleed deep-dive modal
│   │   ├── IxDSandbox.jsx          # Interactive interaction design labs
│   │   ├── BioStory.jsx            # Navy veteran background & skills matrix
│   │   ├── DesignTokensViewer.jsx  # Live design token inspector
│   │   └── Footer.jsx              # Downloads, contact & accolades
│   ├── data/
│   │   └── projects.js             # Detailed project data, BOM, JTBD & flows
│   ├── App.css                     # Component styles & Solar Aero styling
│   ├── index.css                   # Global tokens, typography & theme overrides
│   └── main.jsx
├── index.html
└── vite.config.js
```

---

## 📄 License & Credits

Designed & engineered by **Zoe Solaris**.  
All design systems, renders, schematics, and code are proprietary to Zoe Solaris.
