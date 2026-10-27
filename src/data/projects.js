export const projects = [
  {
    id: 'husk-e',
    title: 'HUSK-E',
    subtitle: 'Handheld Pro-Social Study Companion | BUD-E Logic & Hardware Prototyping',
    category: 'Interaction & Systems',
    timeframe: 'Apr - May 2026',
    featured: true,
    badge: 'Featured UX Case Study',
    heroImage: '/projects/husk-e/hero_1.png',
    galleryImages: [
      '/projects/husk-e/hero_spline_render.png',
      '/projects/husk-e/prototype_3d_print.png',
      '/projects/husk-e/prototype_internal_slice.png',
      '/projects/husk-e/storyboard_9_panel.png',
      '/projects/husk-e/cad_blueprint_front.png',
      '/projects/husk-e/cad_blueprint_back.png',
      '/projects/husk-e/cad_frame_dimensions.png',
      '/projects/husk-e/ux_flow_emotion_engine.png',
      '/projects/husk-e/ux_flow_activities_module.png',
      '/projects/husk-e/ux_flow_nfc_handshake.png',
      '/projects/husk-e/bom_cost_table.png',
      '/projects/husk-e/concept_stude_sketch.png',
      '/projects/husk-e/process_notebook_draft.png'
    ],
    howMightWe: 'How might we bridge the gap between familiarity and friendship so that the daily rituals of college life become intentional moments of connection?',
    jobsToBeDone: 'When I keep seeing the same person in class, we become familiar with each other. But social pressure and overwhelm keep us from acting on it, I want a natural excuse to turn that familiarity into actual connection so I can stop letting potential friendships quietly pass.',
    summary: 'A handheld study companion device that requires two or more students to bond and nurture a virtual creature through shared rituals. Engineered like a hardware AND logic gate—both students have to show up, or the creature degrades into a "Husk". Features an exact $19.38 BOM, ESP32-S3 microcontroller, zero-app NFC pairing, haptic feedback, and a faculty steward administration mode.',
    problem: 'Overwhelmed freshmen and transfer college students frequently leave their friendships at old institutions. While sitting in the same lectures and becoming familiar with peers, social overwhelm and fear of awkwardness create friction, letting budding friendships quietly pass.',
    solution: 'Designed the "BUD-E" system: a physical device pair operating like an AND logic gate. Neither student is enough alone. Paired via zero-app NFC handshakes, both students must show up to raise their virtual companion. Consistent co-presence unlocks animations, outfits, and prestige ranks, while neglect triggers the "Husk" degradation state—recoverable only through shared real-world interaction.',
    reflection: 'The most complex part isn\'t technical—it\'s behavioral. If Husk-E demands too much attention it becomes another screen distraction; too little and it\'s a gimmick forgotten by week two. The creature has to create a genuine function of need that requires both students to show up, but never becomes more interesting than the human being sitting next to you. The goal was never the creature—it was always the friendship.',
    quote: 'Each device runs on a BUD-E system—think of it like an AND logic gate. Both students have to show up. Neither one is enough alone. The BUD-E system turns showing up for your pet into showing up for each other.',
    friendshipPhases: ['Exposure & Propinquity', 'Time Spent Together', 'Reciprocity', 'Self-Disclosure', 'Ritual', 'Tolerance'],
    feasibility: {
      unitCost: '$19.38',
      targetBudget: '$20.00',
      cohortScale: '7,129 UW Freshmen ($142,580 budget; $0.62 support margin + $4,419.98 packaging/onboarding reserve)',
      pilotTest: '3 pilot classes, 1 month, 60 devices (~$600). Core metric: "Did you make a friend, or just an acquaintance?"'
    },
    pitfalls: [
      { risk: 'Misplaced Attachment', detail: 'If students invest more in the virtual pet than each other, the design undermines its core human-centered purpose.' },
      { risk: 'Risk of Novelty', detail: 'Without active faculty stewardship and class ritual integration, the device risks being abandoned after week three.' },
      { risk: 'Asymmetrical Dependency', detail: 'In a 2-student system, one partner ghosting doesn\'t just halt creature growth—it unfairly punishes the student who showed up.' },
      { risk: 'Tech Vulnerability', detail: 'Embedded systems students might attempt to backdoor or overwrite the ESP32-S3 to bypass paired co-presence constraints.' }
    ],
    tags: ['ESP32-S3', 'Physical AND Gate', 'BUD-E System', 'NFC Handshake', 'Haptics', 'Fusion 360', 'Spline 3D', 'Faculty Stewardship'],
    deliverables: [
      'BUD-E Hardware AND Gate Architecture',
      'ESP32-S3 Functional Prototype ($19.38 BOM)',
      'Fusion 360 Ergonomic Split Enclosure',
      'Spline 3D Multi-State Companion Assets',
      'Faculty Administration Stewardship System'
    ]
  },
  {
    id: 'palladium',
    title: 'Palladium & 2D Computing Substrates',
    subtitle: 'Thermal Metrology Pipeline & Tesla Valve Circuit Architecture',
    category: 'Physical & Hardware',
    timeframe: 'Jun - Aug 2024',
    featured: true,
    badge: 'Best Research in Engineering (PNW LSAMP 2025)',
    heroImage: '/projects/palladium/hero_1.png',
    galleryImages: [
      '/projects/palladium/hero_1.png',
      '/projects/palladium/asset_2.png',
      '/projects/palladium/asset_3.png',
      '/projects/palladium/asset_4.png',
      '/projects/palladium/asset_5.png',
      '/projects/palladium/asset_6.png'
    ],
    howMightWe: 'Build an automated image-analysis pipeline to evaluate nanoscale material patterns and optimize thermal efficiency for next-generation computing substrates?',
    summary: 'Undergraduate research at University of Washington & Clean Energy Institute. Evaluated micro-scale material patterns (h-BN, Graphene, MoTe₂) to optimize thermal dissipation, built a 0.67 nm/pixel GNU Octave metrology pipeline, and proposed Tesla valve fluidic test geometry. Awarded Best Research in Engineering at PNW LSAMP.',
    problem: 'Traditional spider electrode geometries made it nearly impossible to isolate and calculate rates of Fickian diffusion under extreme temperature and pressure variations, slowing down semiconductor research by hundreds of lab hours.',
    solution: 'Engineered an image-analysis pipeline in GNU Octave converting raw microscope imagery to spatial data at 0.67 nanometers per pixel. Devised directional circuit geometry inspired by Nikola Tesla’s Tesla Valve to eliminate moving-part wear while channeling fluidic flow.',
    reflection: 'This kind of material-level optimization isn\'t just theoretical—it is mandatory for the future of AI and high-density computing. Presented findings at SACNAS and won Best in Engineering at PNW LSAMP.',
    quote: 'I built an image-analysis pipeline in GNU Octave, converting microscope imagery to spatial data at 0.67 nanometers per pixel.',
    tags: ['UW Research', 'GNU Octave Pipeline', 'Nano-Metrology', 'Thermal Efficiency', 'SACNAS / LSAMP'],
    deliverables: ['0.67 nm/px Octave Analysis Pipeline', 'Tesla Valve Circuit Blueprint', 'SACNAS Research Poster Presentation', 'Material Optimization Report']
  },
  {
    id: 'printed-home',
    title: 'Modular 3D-Printed Housing',
    subtitle: 'Human-Centered Spatial Design & Computer Vision Ergonomics | STEMTAC',
    category: 'Spatial & 3D',
    timeframe: 'Jan - Jun 2024',
    featured: true,
    badge: 'STEMTAC Design & Prototyping',
    heroImage: '/projects/printed-home/hero_1.png',
    galleryImages: [
      '/projects/printed-home/hero_1.png',
      '/projects/printed-home/asset_2.png',
      '/projects/printed-home/asset_3.png',
      '/projects/printed-home/asset_4.png',
      '/projects/printed-home/asset_5.png'
    ],
    howMightWe: 'Design modular, 3D-printable housing components that adapt dynamically to accessibility needs while keeping fabrication costs scalable for at-risk communities?',
    summary: 'Design & prototyping internship at STEMTAC Foundation (Bellevue, WA). Modeled modular 3D-printable housing components in Fusion 360 and Autodesk Inventor, applying computer vision tools (OpenFace, Roboflow) to analyze user interaction data and inform spatial ergonomics.',
    problem: '59% of Americans are one paycheck away from homelessness, with marginalized communities disproportionately impacted. Most affordable housing concepts ignore human dignity, wheelchair clearance, and real daily living routines.',
    solution: 'Designed multi-use modular components (slide-in table seating, under-bed storage, reconfigurable privacy partitions, decontamination mud rooms). Ran multi-disciplinary alignment sessions balancing additive manufacturing constraints with human-centered community needs.',
    reflection: 'The more it resembled an actual home, the more real constraints revealed themselves. Would I dread waking up in this? Would it feel livable? You don\'t solve people; you create an experience that respects their autonomy.',
    quote: 'Housing isn\'t just shelter. It\'s the foundation everything else is built on. Would you live in it for a week?',
    tags: ['Fusion 360', 'Autodesk Inventor', 'OpenFace / Roboflow', 'Spatial Ergonomics', 'STEMTAC Foundation'],
    deliverables: ['Fusion 360 / Inventor CAD Models', 'Computer Vision Ergonomics Study', 'Multi-Disciplinary Fabrication Blueprint', 'Community Feedback Synthesis']
  },
  {
    id: 'solari',
    title: 'Project Solari',
    subtitle: 'Privacy-First, Locally-Hosted Cybernetic AI Assistant',
    category: 'Interaction & Systems',
    timeframe: 'Apr - May 2026',
    featured: true,
    badge: 'Hardware & AI IxD',
    heroImage: '/projects/solari/hero_1.png',
    galleryImages: [
      '/projects/solari/hero_1.png',
      '/projects/solari/asset_2.png',
      '/projects/solari/asset_3.png',
      '/projects/solari/asset_4.png',
      '/projects/solari/asset_5.png'
    ],
    howMightWe: 'Make AI ownership feel as personal, local, and accessible as choosing your own favorite music player?',
    summary: 'A privacy-first, locally-run AI assistant co-built with AI, open-source models, and local hardware. Features multi-model switching, voice interaction, and cybernetic audio routing on a Legion Go.',
    problem: 'Commercial AI systems lock users into remote surveillance capitalism with rigid personalities and high network latency. Interacting with AI feels like querying a corporation, not using an intimate extension of oneself.',
    solution: 'Designed and deployed a modular local-first interface powered by Gemma 2B, Whisper voice-to-text, and Piper text-to-speech. Added zero-friction personality switching and paired with OpenShokz bone conduction headphones to feel like an ambient cybernetic second brain.',
    reflection: 'An AI-generated interface is great at mimicry, but terrible at understanding the human impact of its decisions. Designing Solari required deep human-first thinking about tactile latency, voice timbre, and frictionless mental ergonomics.',
    quote: 'I run a Legion Go with 16GB RAM and OpenShokz bone conduction headphones. Almost like a cybernetic implant! GLaDOS handles the voice output, masking distortion while making the whole thing feel crafted, not cobbled.',
    tags: ['Interaction Design', 'Local AI', 'Hardware Integration', 'Cybernetics', 'Systems Mapping'],
    deliverables: ['Custom UI Interface', 'Ollama/Gemma Integration', 'Voice I/O Pipeline', 'Batch Launcher System']
  },
  {
    id: 'melon',
    title: 'Melon Laughs At Dopamine Addicts',
    subtitle: 'Satirical Game Exposing Dark Interaction Patterns',
    category: 'Interaction & Systems',
    timeframe: 'Mar - Apr 2026',
    featured: false,
    badge: 'Published Game (Itch.io)',
    heroImage: '/projects/melon/hero_1.png',
    galleryImages: [
      '/projects/melon/hero_1.png',
      '/projects/melon/asset_2.png',
      '/projects/melon/asset_3.png',
      '/projects/melon/asset_4.png',
      '/projects/melon/asset_5.png',
      '/projects/melon/asset_6.png'
    ],
    howMightWe: 'Design a game that makes the player hooked on a loop on purpose, so they finally recognize manipulative digital mechanics everywhere else?',
    summary: 'A published satirical game on itch.io designed around the psychology of habit loops, variable rewards, and exploitative UI friction. Accompanied by full systems maps created in Figma before formal UX training.',
    problem: 'The average person checks their phone ~100 times a day, trapped in psychological dark patterns designed by platforms to extract attention and dopamine.',
    solution: 'Engineered an absurd yet pointed gameplay loop featuring a seemingly benign melon that progressively transforms into a dystopic corporate executive demanding ever-increasing pulp-coin investments.',
    reflection: 'I made this game on vacation because I had something urgent to say. The design language lives right inside the mechanics. Furthermore, navigating melon imagery required deliberate cultural mindfulness—balancing its historical and political weights with systems satire.',
    quote: 'Without a systems map, it\'s like building a home with a blindfold. I was doing IxD in Figma before I even had the formal vocabulary for it.',
    tags: ['Game Mechanics', 'Dark Patterns IxD', 'Psychology', 'Systems Architecture', 'Figma Flowcharts'],
    deliverables: ['Live Itch.io Demo', 'Systems Flow Diagram', 'DevLog & Changelog', 'Character Arc Mapping']
  },
  {
    id: 'jellyfish',
    title: 'Jellyfish, Jellyfish, I Have a Wish',
    subtitle: 'Published Storybook on Identity & Belonging | Featured on BookSmart',
    category: 'Editorial & Participatory',
    timeframe: 'Apr - May 2026',
    featured: false,
    badge: 'Published Author (BookSmart)',
    heroImage: '/projects/jellyfish/booksmart_feature.png',
    galleryImages: [
      '/projects/jellyfish/booksmart_feature.png',
      '/projects/jellyfish/hero_1.png',
      '/projects/jellyfish/asset_2.png',
      '/projects/jellyfish/asset_3.png',
      '/projects/jellyfish/asset_4.png',
      '/projects/jellyfish/asset_5.png'
    ],
    howMightWe: 'How can a children’s book hold emotional space for multiple life stages simultaneously, so every reader discovers their own belonging?',
    summary: 'Written by Zoe Solaris, illustrated by Noor Moiz, published by Young Authors Publishing, and featured on BookSmart as part of The Belonging Collection. Developed through iterative participatory co-design sessions with children and families.',
    problem: 'Many children\'s narratives either oversimplify emotional complexity or talk down to young minds, failing to validate complex life transitions, neurodiversity, and feeling like an outsider.',
    solution: 'Wrote and art-directed a luminous journey: a lonely jellyfish journeys through ocean reefs, skies, planets, and galaxies searching for a better world, only to discover that true belonging lives within. Co-designed with young readers aged 3–6 to refine cadence and emotional resonance.',
    reflection: 'Participatory design changes you. A child described the reading experience as "watching a balloon flying into fireworks." Belonging was never something to search for across the universe—it begins with seeing the beauty within yourself.',
    quote: 'At the edge of the universe, the jellyfish discovers a powerful truth: belonging was never something it had to search for.',
    tags: ['BookSmart Feature', 'Young Authors Publishing', 'Illustrated by Noor Moiz', 'Participatory Co-Design', 'Belonging Collection'],
    deliverables: ['Published Book (BookSmart • 450+ Opens)', 'Storyboards & Character Arc', 'Community Co-Design Sessions', 'Art Direction with Noor Moiz']
  },
  {
    id: 'app-dev',
    title: 'Application Development Site Redesign',
    subtitle: 'Brutalist-Glassmorphic Web Experience for College Curriculum',
    category: 'Web & UI',
    timeframe: 'Mar - Jun 2026',
    featured: false,
    badge: 'Web UI / Design System',
    heroImage: '/projects/app-dev/hero_1.png',
    galleryImages: [
      '/projects/app-dev/hero_1.png',
      '/projects/app-dev/asset_2.png',
      '/projects/app-dev/asset_3.png',
      '/projects/app-dev/asset_4.png',
      '/projects/app-dev/asset_5.png'
    ],
    howMightWe: 'Refresh an institutional website under rigid client constraints while honoring collegiate identity and making prospective students feel welcomed?',
    summary: 'Collaborative web overhaul for North Seattle College’s App Dev program. Led wireframing, branding identity, and design system synthesis combining brutalist architecture with tactile glassmorphism.',
    problem: 'The legacy site felt like an impenetrable administrative wall of text, intimidating prospective first-generation and non-traditional college applicants.',
    solution: 'Synthesized the physical brutalist concrete architecture of the campus with contemporary glassmorphic UI surfaces. Transformed cold bureaucratic phrasing into conversational invitations.',
    reflection: 'I don’t want users to be intimidated; I want them to feel like they are in the right place. Self-teaching modern UI/UX principles outside the formal classroom pushed my design system velocity.',
    quote: 'We paired the brutalism of our school’s architecture with glassmorphism based on contemporary digital trends—a rare but fresh combo.',
    tags: ['Design Systems', 'Brutalism', 'Glassmorphism', 'Information Architecture', 'Microcopy'],
    deliverables: ['Figma Component Library', 'Responsive Wireframes', 'Brand Identity Mascot Logo', 'Live Staging Refresh']
  }
];

export const personalBio = {
  name: 'Zoe Unica Solaris',
  location: 'Seattle, WA',
  email: 'z@zusolaris.space',
  phone: '206-532-7742',
  linkedin: 'https://linkedin.com/in/zusolaris',
  website: 'https://zusolaris.space',
  role: 'Interaction Designer & Systems Researcher',
  tagline: 'The future has a first draft, and I’m part of it.',
  statement: 'Research-oriented and multi-modal designer bridging physical hardware, cognitive-based design, and human dignity. From operating secure communication systems and human-system interfaces on nuclear submarines under extreme constraint to nano-metrology at UW, AI governance leadership, and tangible physical computing with ESP32-S3, I build interfaces that encourage human agency.',
  education: [
    {
      institution: 'University of Washington',
      degree: 'BDes in Interaction Design, Minor in Business',
      timeline: 'Expected June 2028',
      location: 'Seattle, WA'
    },
    {
      institution: 'North Seattle College',
      degree: 'Associate of Arts (AA)',
      detail: 'GPA: 3.51',
      timeline: 'June 2026',
      location: 'Seattle, WA'
    },
    {
      institution: 'Code Fellows',
      degree: 'Certificate, Full-Stack JS Development',
      timeline: 'Feb 2023',
      location: 'Seattle, WA'
    }
  ],
  experience: [
    {
      role: 'Student Body Vice President',
      org: 'North Seattle College',
      timeline: 'June 2025 – June 2026',
      location: 'Seattle, WA',
      points: [
        'Led institutional research for 5,000+ students, translating feedback into tech access and equitable resource initiatives.',
        'Spearheaded governance restructuring, including drafting and passing the college\'s first institutional AI Use Policy.',
        'Partnered with executive administration to improve service delivery for underrepresented student groups.'
      ]
    },
    {
      role: 'Undergraduate Researcher',
      org: 'University of Washington',
      timeline: 'June 2024 – August 2024',
      location: 'Seattle, WA',
      points: [
        'Evaluated micro-scale material patterns (h-BN, Graphene, MoTe₂) to optimize thermal efficiency in computing substrates.',
        'Built an image-analysis pipeline in GNU Octave, converting microscope imagery to spatial data at 0.67 nm/pixel.',
        'Presented findings at SACNAS; awarded Best Research in Engineering at PNW LSAMP.'
      ]
    },
    {
      role: 'Design & Prototyping Intern',
      org: 'STEMTAC Foundation',
      timeline: 'Jan 2024 – June 2024',
      location: 'Bellevue, WA',
      points: [
        'Designed modular 3D-printable housing components in Fusion 360 and Autodesk Inventor.',
        'Applied computer vision tools (OpenFace, Roboflow) to analyze user interaction data and inform spatial ergonomics.',
        'Coordinated multi-disciplinary sessions to align fabrication constraints with community-centered design.'
      ]
    },
    {
      role: 'Information Systems Technician (Submarines), ITS2',
      org: 'United States Navy',
      timeline: 'Jan 2019 – June 2022',
      location: 'Silverdale, WA',
      points: [
        'Managed human-system interfaces, virtualization, and network architecture across 4 high-security environments.',
        'Optimized operator workflows and system troubleshooting protocols to minimize cognitive load under constraint.',
        'Maintained 99.9% uptime for critical multi-platform infrastructure across air-gapped Linux and Windows systems.'
      ]
    }
  ],
  honors: [
    { title: 'Best Research in Engineering', org: 'PNW LSAMP Conference, Oregon State University (2025)' },
    { title: 'WA NASA Space Grant Consortium Scholar', org: 'North Seattle College (2025)' },
    { title: 'Student Leadership Service Award', org: 'North Seattle College (2026)' },
    { title: 'Submarine Warfare & Deep Submergence Insignias', org: 'United States Navy (2021, 2022)' },
    { title: 'Founder & President', org: 'SEDS, NSC Chapter (2024–2025)' },
    { title: 'Co-Leader', org: 'Queer Trans-Cooperative, North Seattle College (2025–2026)' }
  ],
  skills: [
    {
      category: 'Design & Prototyping',
      items: ['Figma / FigJam', 'Spline 3D', 'Adobe Illustrator / Photoshop', 'Fusion 360', 'Autodesk Inventor', 'Godot', 'Hardware Prototyping', '3D Printing']
    },
    {
      category: 'UX & Research',
      items: ['Journey Mapping', 'Wireframing', 'Usability Testing', 'Systems Thinking', 'Information Architecture', 'Heuristic Evaluation', 'Cognitive Load Optimization']
    },
    {
      category: 'Technical & Code',
      items: ['HTML5 / CSS3', 'JavaScript (ES6+)', 'React / Vite', 'Python', 'GNU Octave Pipeline', 'Git / GitHub', 'Air-Gapped Linux / Unix', 'ESP32-S3 / Microcontrollers']
    },
    {
      category: 'Agentic and LLM',
      items: ['Ollama', 'Google-Antigravity', 'Local LLM Workflows', 'Agentic Dev Environments & Tool Orchestration', 'Structured Output & Schema Enforcement', 'Context Architecture & System Instructions']
    }
  ]
};
