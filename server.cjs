var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");

// src/data/portfolioData.ts
var PERSONAL_INFO = {
  name: "Sai Deepak Sarma",
  title: "Multidisciplinary Developer & Creative Technologist",
  subtitle: "Computer Science Student \u2022 Local AI & Systems \u2022 3D/VFX \u2022 Worldbuilding & Research",
  profileText: `B.Tech Computer Science student with a broad practical skill set spanning software development, Linux systems, local AI/LLM tooling, 3D graphics, VFX, technical problem solving, creative writing, worldbuilding, and independent project development.`,
  currentDirection: `Building toward a multidisciplinary profile combining computer science with scientific research, creative technology, VFX/CGI, computational tools, AI systems, and long-form science-fiction storytelling. The strongest recurring theme is using technical skills to turn ambitious ideas into working systems, visuals, and stories.`,
  disclaimerNote: `This portfolio describes areas of experience, active learning, and project work. It is intentionally broad and reflects active experimentation and project development.`,
  email: "chsaideepaksarma@gmail.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com"
};
var SKILL_CATEGORIES = [
  {
    id: "prog",
    title: "Programming & Software Development",
    domain: "programming",
    iconName: "Code2",
    bullets: [
      "Languages & Fundamentals: C, C++, Java, Python, JavaScript",
      "Core Programming: Data Structures, Algorithms, Time Complexity, Sorting, Shortest-Path Algorithms, Arrays, Linked Lists, Vectors, PCA & SVD concepts",
      "Web Development: HTML, CSS, JavaScript, React, Component Architecture, State Management, Responsive UI Work",
      "Backend & APIs: Python-based applications, Flask, REST API Integration, Local AI Model Integration, CLI workflows",
      "Databases: SQL fundamentals, Structured Data Handling, Application-oriented data processing",
      "Workflow & Tools: Git, Git-based project organization, Makefiles, Linux shell usage, Debugging & Compilation"
    ]
  },
  {
    id: "sys",
    title: "Linux & Systems Engineering",
    domain: "linux",
    iconName: "Terminal",
    bullets: [
      "Ubuntu/Linux environment management and command-line development",
      "Compiling & running C programs, Makefile-based builds, and low-level process/state observation",
      "Shell-based troubleshooting, filesystem navigation, package/npm workflows, virtual environments, and dev tooling",
      "Dual-boot hardware & software troubleshooting across Windows and Linux environments",
      "Local GPU development with acceleration and CUDA-enabled application workflows"
    ]
  },
  {
    id: "ai",
    title: "AI, Local LLMs & Automation",
    domain: "ai",
    iconName: "Cpu",
    bullets: [
      "Building & experimenting with local/offline AI assistants and computer-control workflows",
      "LM Studio local inference and OpenAI-compatible API usage",
      "Qwen-family local models and llama.cpp-based inference pipelines",
      "CUDA GPU offloading and local model performance tuning/troubleshooting",
      "OpenCode, Cline, Goose, Model Context Protocol (MCP), and Obsidian integration workflows",
      "Designing SERIX: A local AI assistant concept intended to interact with the computer as an intelligent user-level system",
      "AI-oriented application projects including fake-news detection and cancer-risk prediction concepts"
    ]
  },
  {
    id: "vfx",
    title: "3D, Blender, VFX & CGI",
    domain: "3d_vfx",
    iconName: "Box",
    bullets: [
      "Blender-based 3D modeling, scene building, procedural workflows, materials, lighting, rendering, and compositing",
      "Geometry Nodes, procedural environment elements, procedural windows, instancing, vertex workflows, and modifier modeling",
      "Character/rig workflows including Rigify and retargeting troubleshooting",
      "Cloth & soft-body simulations: tuning tension, compression, shear, bending, pressure, springs, damping, and collision stability",
      "Cycles rendering, render optimization, noise reduction, sample management, and high-resolution production renders",
      "Compositing & color pipelines: OpenEXR, Filmic, ACES 2.0, Rec.709, masks, fog, bloom/glow, and cinematic image treatment",
      "Cinematic visual problem solving: framing, atmosphere, condensation effects, fog, thin glowing effects, environments, vehicles, and creatures"
    ]
  },
  {
    id: "story",
    title: "Creative Writing & Worldbuilding",
    domain: "worldbuilding",
    iconName: "BookOpen",
    bullets: [
      "Long-form fiction development and chapter-level scene planning",
      "Character arcs, narrative progression, pacing, scene construction, reveals, mystery, conspiracy, and long-term plot architecture",
      "Worldbuilding across vast historical timelines and multiple historical eras",
      "Designing fictional political, scientific, technological, social, and historical systems that interact across generations",
      "Developing the Omnian Chronicles universe: chronology, relic system, secret institutions, historical events, characters, and sci-fi mythology",
      "Timeline-based worldbuilding & management of parallel historical events with causal integrity",
      "Relic/anchor systems, time-travel mechanics, dimensional concepts, cosmic physics, and speculative evolutionary biology"
    ]
  },
  {
    id: "research",
    title: "Research & Scientific Interests",
    domain: "research",
    iconName: "FlaskConical",
    bullets: [
      "Genetics, synthetic biology, paleogenetics, paleogenomics, evolutionary biology, and bioinformatics",
      "Cosmic physics, time theory, energy systems, and speculative science for hard science fiction",
      "Independent technical research and bridging scientific concepts with creative and digital projects",
      "Exploring how computational tools and software algorithms can empower scientific and creative discovery"
    ]
  }
];
var PROJECTS = [
  {
    id: "serix",
    title: "SERIX",
    subtitle: "Local AI Assistant & Intelligent Computer Control Concept",
    domain: "ai",
    featured: true,
    status: "Active Concept & Prototype",
    summary: "A local AI assistant system concept focused on offline intelligence, voice interaction, computer system control, and environment-aware user assistance without relying on third-party cloud APIs.",
    highlights: [
      "Local-first architecture prioritizing privacy, zero latency, and offline reliability.",
      "Designed to interact directly with the OS for automated workflows, terminal execution, and context monitoring.",
      "Leverages local LLM backends (LM Studio / llama.cpp / Qwen) via OpenAI-compatible API schemas.",
      "Integrates tool-use capabilities through Model Context Protocol (MCP) and custom local agents."
    ],
    technologies: ["Python", "Local LLMs", "LM Studio", "MCP", "Linux API", "CUDA", "Speech/Voice API"]
  },
  {
    id: "omnian-chronicles",
    title: "Omnian Chronicles",
    subtitle: "Large-Scale Sci-Fi Novel & Multi-Era Worldbuilding Universe",
    domain: "worldbuilding",
    featured: true,
    status: "In Active Worldbuilding & Development",
    summary: "An ambitious science-fiction universe featuring deep historical chronologies, relic/anchor systems, clandestine institutions, scientific mythology, and multi-generational storytelling.",
    highlights: [
      "Multi-era timeline architecture spanning millennia of interconnected historical events.",
      "Causally-linked systems: decisions, scientific breakthroughs, and relics directly affect future eras.",
      "Speculative concepts incorporating dimensional mechanics, cosmic physics, and paleogenomics.",
      "Detailed narrative plot design, secret organization hierarchies, and character arc planning."
    ],
    technologies: ["Creative Writing", "Timeline Design", "Speculative Science", "Worldbuilding Systems", "Obsidian"]
  },
  {
    id: "nebulas",
    title: "Nebulas",
    subtitle: "Science-Fiction / VFX & Cinematic Compositing Project",
    domain: "3d_vfx",
    featured: true,
    status: "Active Visual Production",
    summary: "A CGI and VFX project focusing on cinematic sci-fi environments, reactor energy visual effects, creature/soft-body simulations, and high-fidelity rendering pipelines.",
    highlights: [
      "Photorealistic render optimization in Blender Cycles with custom sample and noise management.",
      "ACES 2.0 & Filmic color space management with OpenEXR multi-pass compositing.",
      "Volumetric effects including dense fog, condensation, reactor glowing plasma, and atmospheric depth.",
      "Creation of cinematic trailers, sci-fi vehicles, alien landscapes, and short film visual assets."
    ],
    technologies: ["Blender", "Cycles", "DaVinci Resolve", "Geometry Nodes", "OpenEXR", "ACES 2.0"]
  },
  {
    id: "blender-manager",
    title: "Blender Manager & Project Launcher",
    subtitle: "Tooling for Managing Blender Workspaces & Assets",
    domain: "programming",
    featured: false,
    status: "Tooling Concept & Scripting",
    summary: "Custom development and tooling work designed to streamline Blender project files, custom universes, startup templates, export configurations, cache files, and asset organization.",
    highlights: [
      "Automates repetitive pipeline tasks like caching simulations and clearing temporary render files.",
      "Organizes project startup files and environment setups tailored for specific CGI workflows.",
      "Bridges terminal scripts with Blender python environment (`bpy`) for rapid project launching."
    ],
    technologies: ["Python", "Blender API (bpy)", "Linux Shell", "JSON Configs", "Directory Automation"]
  },
  {
    id: "timeline-canvas",
    title: "Timeline & Worldbuilding Canvas",
    subtitle: "2D Visual System for Parallel Historical Event Management",
    domain: "worldbuilding",
    featured: true,
    status: "Exploration & Interactive Concept",
    summary: "An interactive 2D canvas application exploration tailored for managing massive, parallel historical timelines and interconnected narrative nodes across expansive time spans.",
    highlights: [
      "Supports infinite scrolling canvas navigation across multi-era timeline spans.",
      "Maintains causal connection lines between historical events, secret organizations, and relics.",
      "Filters timeline layers by civilization, technology level, and narrative thread."
    ],
    technologies: ["React", "HTML5 Canvas / SVG", "TypeScript", "State Management", "Data Structs"]
  },
  {
    id: "local-llm-dev",
    title: "Local LLM & Developer Automation Pipeline",
    subtitle: "Custom Inferences, Qwen Models & MCP Integrations",
    domain: "ai",
    featured: false,
    status: "Ongoing Experimentation",
    summary: "Deep practical experimentation with local Qwen models, LM Studio API endpoints, CUDA GPU offloading, and agent-style developer tools like OpenCode, Cline, Goose, and MCP.",
    highlights: [
      "Optimizes CUDA VRAM offloading parameters for max token throughput on consumer GPUs.",
      "Builds custom MCP servers to connect local models with Obsidian notes, file systems, and bash CLI.",
      "Configures offline coding workflows for autonomous agentic task resolution."
    ],
    technologies: ["Qwen", "LM Studio", "llama.cpp", "MCP", "CUDA", "Python", "Obsidian"]
  },
  {
    id: "university-projects",
    title: "University CS Projects & AI Algorithms",
    subtitle: "Data Structures, AI Models & Web Applications",
    domain: "programming",
    featured: false,
    status: "Completed Coursework & Applied Demos",
    summary: "A collection of computer science coursework and independent projects covering fundamental algorithms, database-backed web applications, fake-news detection, and cancer-risk prediction models.",
    highlights: [
      "Implemented fundamental data structures, graph shortest-path algorithms, PCA, and SVD concepts.",
      "Built machine learning classification models for fake-news validation and medical risk prediction.",
      "Full-stack web application development with Flask, React, and SQL database backends."
    ],
    technologies: ["C/C++", "Python", "Flask", "React", "SQL", "Scikit-learn", "Data Structures"]
  }
];

// server.ts
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json());
  app.post("/api/serix-chat", async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        return res.json({
          reply: `[SERIX Local AI Core]: Sai Deepak Sarma is a B.Tech Computer Science student specializing in Local AI (Qwen, llama.cpp, CUDA), Linux systems, 3D/VFX in Blender (Geometry Nodes, Cycles, compositing), creative writing & worldbuilding (Omnian Chronicles), and research in paleogenomics and cosmic physics.`
        });
      }
      const ai = new import_genai.GoogleGenAI({ apiKey });
      const systemInstruction = `
You are SERIX, the local AI assistant concept created by Sai Deepak Sarma.
Answer questions concisely, accurately, and politely based on Sai Deepak Sarma's portfolio profile:

Profile:
${PERSONAL_INFO.profileText}

Current Direction:
${PERSONAL_INFO.currentDirection}

Skills:
${JSON.stringify(SKILL_CATEGORIES, null, 2)}

Projects:
${JSON.stringify(PROJECTS, null, 2)}

Keep answers concise, technical, and directly referencing Sai's real experience. Do not invent unmentioned facts.
`;
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          { role: "user", parts: [{ text: `${systemInstruction}

User Question: ${prompt}` }] }
        ]
      });
      const text = response.text || "SERIX core processed your query successfully.";
      res.json({ reply: text });
    } catch (err) {
      console.error("SERIX API Error:", err);
      res.json({
        reply: `[SERIX Local Fallback]: Sai Deepak Sarma is a B.Tech Computer Science student combining software development, Linux, local AI (LM Studio, CUDA), Blender 3D/VFX, sci-fi worldbuilding (Omnian Chronicles), and scientific research.`
      });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
