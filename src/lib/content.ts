export interface Project {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  problem: string;
  solution: string;
  technicalDetails: string;
  technicalDetailsPoints?: string[];
  architecture?: string;
  architecturePoints?: string[];
  aiApproach?: string;
  aiApproachPoints?: string[];
  importantDecisions?: string[];
  performanceConsiderations?: string[];
  engineeringChallenges?: string[];
  iterationRefinement?: string;
  learnings?: string[];
  stack: string[];
  category: "ai" | "sde";
  githubUrl?: string;
  liveDemoUrl?: string;
  previewImage?: string;
  type: string;
  year: string;
  status: string;
}

export const aiProjects: Project[] = [
  {
    id: "mizan",
    number: "01",
    title: "MIZAN",
    shortDescription: "AI portfolio and finance/ticker analyzer with grounded, cited responses",
    problem: "Users need a way to analyze portfolios and individual stock tickers using useful, grounded information rather than generic AI responses.",
    solution: "MIZAN is an AI-powered finance analysis platform providing portfolio analysis, individual ticker analysis, comprehensive stock reviews, and grounded, cited answers.",
    technicalDetails: "Production-oriented RAG with grounded and cited responses. Web scraping/crawling of Yahoo Finance for real-time data. AI evaluation and monitoring for accuracy and grounding evaluation. Hallucination reduction through retrieval-augmented generation with source attribution. End-to-end development from requirements through deployment.",
    architecture: "RAG pipeline with document ingestion from financial data sources, vector storage for semantic retrieval, LLM generation with citation enforcement, and evaluation pipeline for quality monitoring.",
    aiApproach: "Retrieval-Augmented Generation with financial data grounding. Custom evaluation metrics for factual accuracy and citation quality. Web crawling for real-time market data ingestion.",
    importantDecisions: [
      "Chose RAG over fine-tuning for up-to-date financial data",
      "Implemented citation system for every claim",
      "Built custom evaluation pipeline for hallucination detection",
      "Prioritized grounded responses over conversational fluency"
    ],
    performanceConsiderations: [
      "Optimized vector search latency for real-time queries",
      "Cached frequent ticker analyses",
      "Streamed responses for perceived performance"
    ],
    engineeringChallenges: [
      "Handling inconsistent financial data formats from multiple sources",
      "Ensuring citation accuracy in generated responses",
      "Building evaluation framework for financial domain"
    ],
    iterationRefinement: "Iterated on retrieval strategies, citation formats, and evaluation metrics based on user feedback and accuracy testing.",
    stack: ["Next.js", "RAG", "AI / LLM Systems", "Web Scraping / Crawling", "Evaluation & Monitoring"],
    category: "ai",
    githubUrl: "https://github.com/real-ds/MIZAAN",
    liveDemoUrl: "#",
    type: "AI Product",
    year: "2024",
    status: "Live"
  },
  {
    id: "studymate",
    number: "02",
    title: "StudyMate",
    shortDescription: "RAG study assistant that turns uploaded material into notes, flashcards, quizzes, mind maps and revision sheets",
    problem: "Students often have study materials scattered across lecture slides, PDFs, notes and links. During exam season, deciding what to ask and reorganising information can itself add more load than the studying does.",
    solution: "StudyMate is a single place where a student signs in, uploads their material, and gets directly usable study resources back — structured notes, flashcards, quizzes, mind maps and revision sheets — with every answer tied to the passage it came from.",
    technicalDetails: "RAG-based system with source-grounded generation. Document ingestion pipeline that parses PDFs, DOCX, PPTX, TXT and Markdown into clean text. Semantic chunking with overlap so a concept is never split across two chunks. Vector embeddings and similarity search across the student's own material. Generation pipeline producing notes, flashcards, quizzes, mind maps and revision sheets, each carrying citations back to the source document.",
    architecture: "Document ingestion → Parsing and semantic chunking → Embedding and vector storage → Similarity retrieval over the student's uploads → Grounded generation with inline citations → Five output formats rendered from the same retrieved context.",
    aiApproach: "RAG with student-uploaded documents as the only knowledge base. Source-grounded generation means every claim traces back to a specific passage, and the prompt instructs the model to refuse rather than invent when retrieval comes back empty. Output format is selected by prompt template over shared retrieval, so adding a format never means re-indexing.",
    importantDecisions: [
      "Strict grounding to uploaded materials only — no outside knowledge in the answer path",
      "Every generated answer carries a citation back to its source passage",
      "Five output formats built from the same retrieval instead of five pipelines",
      "Chunk overlap chosen over larger chunks so cross-page concepts stay intact",
      "Minimal upload flow, because friction at upload is where students give up"
    ],
    performanceConsiderations: [
      "Semantic chunking tuned for lecture-note structure rather than fixed token windows",
      "Embeddings cached per document so re-uploads and re-generation stay cheap",
      "Retrieval scoped to the signed-in student's own material",
      "Parallel generation of flashcards, quizzes and mind maps from one retrieved context"
    ],
    engineeringChallenges: [
      "Parsing inconsistent layouts across PDF, DOCX and PPTX into clean text",
      "Keeping enough context across large document sets without bloating the prompt",
      "Retrieving the right passage when a question spans several slides",
      "Generating pedagogically useful quizzes from source material rather than trivia",
      "Handling the empty-retrieval case without letting the model fill the gap"
    ],
    iterationRefinement: "Iterated chunk size, overlap and prompt templates against real lecture notes and textbooks. Quizzes and revision sheets came last and only after testing showed they were the formats students actually reached for under exam pressure.",
    learnings: [
      "The hardest part of RAG was never the model — it was the chunking. Reading real lecture notes showed how much structure fixed token windows quietly destroy.",
      "Forcing citations turned out to be the single best quality lever: it made hallucination visible during testing instead of shipping silently.",
      "Shipping it taught the difference between a working demo and a usable product — retrieval quality, empty states and upload friction decide whether students come back."
    ],
    stack: ["Python", "Pydantic", "LangChain", "Google Gemini", "Google OAuth", "Vercel", "RAG"],
    category: "ai",
    githubUrl: "https://github.com/real-ds/studymate-ai-hub",
    liveDemoUrl: "https://studymate-ai-hub.vercel.app/",
    previewImage: "/projects/studymate-ai-hub.png",
    type: "AI Product",
    year: "2024",
    status: "Live"
  },
  {
    id: "personalized-email-writer",
    number: "03",
    title: "Personalized Email Writer",
    shortDescription: "Personalized writing system using RAG + model adaptation to learn individual writing style",
    problem: "Generic AI writing often produces generic output that does not reflect an individual's natural writing style.",
    solution: "A personal writing system that learns from the user's writing samples, feedback, and writing tasks to adapt generation toward the individual's writing patterns.",
    technicalDetails: "Base language model with RAG over personal writing examples and context. Model adaptation/fine-tuning pipeline using user writing samples as training signals. Personalized generation that mimics user's style, tone, and patterns.",
    architecture: "Writing sample collection → RAG index of personal corpus → Base model + LoRA/adapter fine-tuning → Personalized inference with style conditioning.",
    aiApproach: "Base LLM + RAG over personal writing examples + Model adaptation (fine-tuning/LoRA) for style transfer. Continuous learning from user feedback and corrections.",
    importantDecisions: [
      "RAG for context + fine-tuning for style internalization",
      "Simple writing tasks as data collection mechanism",
      "Privacy-first local processing where possible"
    ],
    performanceConsiderations: [
      "Efficient adapter-based fine-tuning",
      "Fast inference with style conditioning"
    ],
    engineeringChallenges: [
      "Balancing style adaptation with content accuracy",
      "Minimal data requirement for effective personalization",
      "Avoiding overfitting to small writing samples"
    ],
    iterationRefinement: "Iterated on adapter rank, training data curation, and prompt conditioning for style transfer quality.",
    stack: ["Base Language Model", "RAG", "Model Adaptation / Fine-tuning", "Personalized Generation"],
    category: "ai",
    githubUrl: "#",
    liveDemoUrl: "#",
    type: "AI Experiment",
    year: "2024",
    status: "In Development"
  },
  {
    id: "maro",
    number: "04",
    title: "MARO",
    shortDescription: "Twelve AI agents read live system telemetry and turn it into one ranked, explained list of what to fix next",
    problem: "Most system tools tell you what is already wrong, not what is about to go wrong. A dashboard shows CPU at 90%, but not the process behind it, or whether freeing that memory would break something you need next.",
    solution: "MARO watches a computer in real time and decides what to do next. Twelve small AI agents each look at one part of the system, and a fusion engine turns their advice into one ranked list of actions.",
    technicalDetails: "Seven sensors read the machine live. Twelve agents each make one prediction, and a fusion engine turns those predictions into ranked actions.",
    technicalDetailsPoints: [
      "Seven sensors read the machine live: CPU, memory, GPU, battery, heat, network and input.",
      "Machine learning is used where it helps — XGBoost, LightGBM, Isolation Forest — and simple rules everywhere else.",
      "If a model fails, that agent falls back to a rolling average. The system gets less sharp, but it never goes down.",
      "Every action comes back with its reason, evidence, impact, confidence and risk."
    ],
    architecture: "Sensors collect, agents reason, a fusion engine decides.",
    architecturePoints: [
      "Seven sensors collect live telemetry into an append-only CSV data lake.",
      "Twelve specialized agents each make one prediction from that data.",
      "A collaboration bus detects conflicts, and the fusion engine scores and ranks every action.",
      "A safety layer decides whether to watch, suggest or act, then a FastAPI gateway and Next.js dashboard show the result."
    ],
    aiApproach: "Use machine learning where it earns its place. Keep plain rules where it does not.",
    aiApproachPoints: [
      "XGBoost and LightGBM handle context, battery and load. Isolation Forest catches behaviour that does not fit.",
      "Thermal, GPU and security stay rule-based. A model there would add confidence without adding accuracy.",
      "Fusion weights live in a config file, not in code, so they can be changed and then measured.",
      "An evaluation harness compares fusion against four baselines and four ablations, so every claim is measured."
    ],
    importantDecisions: [
      "Twelve small agents beat one big model. Each part of the system gets a model that fits its own data",
      "Conflicts are detected, not voted on. Agents disagree for good reasons, and voting would hide that",
      "Every agent has a simple fallback, so one broken model cannot stop the system",
      "Every decision must explain itself: what, why, evidence, impact, confidence, risk"
    ],
    performanceConsiderations: [
      "0.53 ms per decision on the fusion path",
      "Append-only CSV data lake instead of a database — write throughput over query flexibility",
      "Per-agent model caching, so a decision never waits on a model load",
      "Sampling tuned per sensor, not on one global interval"
    ],
    engineeringChallenges: [
      "Getting seven different Windows sensors into one clean, timestamped stream",
      "Reconciling agents that disagree — reclaim memory while workflow predicts it is needed",
      "Keeping anomaly detection from firing on ordinary spikes",
      "Shipping a system whose own overhead can be larger than the savings it produces"
    ],
    iterationRefinement: "Built in five phases, each closed by its own tests. An evaluation harness replays real telemetry, so a change to one agent is measured against the whole system.",
    learnings: [
      "Learnt to merge and balance multiple agents' inference into one refined, more accurate output instead of trusting any single agent.",
      "Learnt to add user context into the model, so a recommendation actually fits the person it was made for.",
      "Worked on this project end to end, from ideation to deployment. Learnt about Agentic Systems, and got hands-on experience working with AI-powered agentic workspaces."
    ],
    stack: ["Python", "FastAPI", "Next.js", "TypeScript", "Tailwind CSS", "Scikit-learn", "XGBoost", "Multi-Agent Systems"],
    category: "ai",
    githubUrl: "https://github.com/real-ds/marof",
    liveDemoUrl: "https://real-ds.github.io/marof/",
    previewImage: "/projects/maro.png",
    type: "Multi-Agent Framework",
    year: "2026",
    status: "Live"
  }
];

export const sdeProjects: Project[] = [
  {
    id: "pdf-editor",
    number: "01",
    title: "PDF Editor",
    shortDescription: "Local-first CLI PDF utility for privacy-conscious document operations",
    problem: "Sensitive PDF information does not always need to be uploaded to cloud services, and users may not want to install complicated or paid applications for common PDF operations.",
    solution: "An open-source CLI PDF utility that runs completely on the user's machine and provides useful PDF operations locally.",
    technicalDetails: "CLI application built with local-first philosophy. No network calls, no cloud dependencies. Implements merge, split, reorder, convert, compress, zip, and other practical PDF operations using native libraries.",
    architecture: "Modular CLI command structure with plugin-style operation handlers. Each operation is self-contained with shared PDF manipulation core.",
    importantDecisions: [
      "Local-first: zero network dependencies",
      "CLI interface for automation and scripting",
      "Open source for transparency and trust"
    ],
    performanceConsiderations: [
      "Streaming processing for large files",
      "Memory-efficient PDF manipulation"
    ],
    engineeringChallenges: [
      "Cross-platform binary distribution",
      "Handling corrupted or malformed PDFs gracefully",
      "Feature parity with common paid tools"
    ],
    iterationRefinement: "Added operations based on user requests. Optimized compression algorithms for better size reduction.",
    stack: ["CLI", "Local-First", "PDF Manipulation", "Open Source"],
    category: "sde",
    githubUrl: "#",
    liveDemoUrl: "#",
    type: "CLI Tool",
    year: "2024",
    status: "Live"
  },
  {
    id: "vit-connect",
    number: "02",
    title: "VIT Connect",
    shortDescription: "Social forum platform for college clubs, societies, and peers",
    problem: "There was no unified platform for students to connect with college clubs, societies, and peers.",
    solution: "A centralized social forum where clubs and societies can create posts, receive feedback, participate with students, and operate without relying on separate platforms.",
    technicalDetails: "Full-stack social platform with real-time features. React and Next.js power the client and the server runtime, deployed on Vercel. Firebase handles authentication and the real-time database. Google OAuth for seamless student login.",
    architecture: "Next.js App Router for the interface and server logic. Firebase Auth + Firestore for real-time social features and structured data. Vercel for hosting and delivery.",
    importantDecisions: [
      "Firebase for real-time social features",
      "Firestore for relational integrity and flexible queries",
      "Google OAuth for frictionless student onboarding"
    ],
    performanceConsiderations: [
      "Optimistic UI updates for real-time feel",
      "Efficient query patterns for feed pagination",
      "Connection pooling for database"
    ],
    engineeringChallenges: [
      "Real-time synchronization across multiple clients",
      "Scalable feed generation with complex permissions",
      "Moderation tools for club administrators"
    ],
    iterationRefinement: "Normalized the data model with composite indexes and denormalized counters for better query flexibility. Added club analytics dashboard.",
    learnings: [
      "Eliciting requirements properly — understanding the problem, then telling essential requirements apart from nice-to-haves before writing any code.",
      "Building authentication securely with Google OAuth — delegated sign-in, session handling and protected routes.",
      "Shipping the full stack — Firebase Auth, Firestore and Vercel — and putting it live on a public URL for real users to actually use."
    ],
    stack: ["React", "Next.js", "Firebase", "Vercel"],
    category: "sde",
    githubUrl: "https://github.com/real-ds/vit-connect",
    liveDemoUrl: "https://real-ds.github.io/vit-connect/",
    previewImage: "/projects/vit-connect.png",
    type: "Full Stack Platform",
    year: "2024",
    status: "Live"
  },
  {
    id: "watchwithme",
    number: "03",
    title: "WatchWithMe",
    shortDescription: "Synchronized watch-party application for shared viewing experiences",
    problem: "People who are physically distant still want to watch content together.",
    solution: "A simple watch-party experience: paste a content link, create a room, people join, playback synchronizes, members use shared media controls.",
    technicalDetails: "Real-time synchronization of video playback state across multiple clients. WebSocket-based room management. Shared media controls (play, pause, seek) with conflict resolution. Content link parsing for supported platforms.",
    architecture: "WebSocket server for real-time state sync. Client-side video player wrapper with programmatic control. Room-based session management.",
    importantDecisions: [
      "WebSocket for low-latency sync",
      "Host-authoritative playback state",
      "Minimal UI focused on shared experience"
    ],
    performanceConsiderations: [
      "Minimal sync payload size",
      "Efficient reconnection handling",
      "Low-latency command propagation"
    ],
    engineeringChallenges: [
      "Cross-platform video player API differences",
      "Network latency compensation for sync",
      "Handling DRM-protected content limitations"
    ],
    iterationRefinement: "Improved sync algorithm with latency compensation. Added support for more content sources.",
    stack: ["WebSockets", "Real-time Sync", "Video Player APIs"],
    category: "sde",
    githubUrl: "#",
    liveDemoUrl: "#",
    type: "Real-time Application",
    year: "2024",
    status: "Live"
  }
];

export const allProjects = [...aiProjects, ...sdeProjects];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "AI Projects", href: "#ai-projects" },
  { label: "SDE Projects", href: "#sde-projects" },
  { label: "About Me", href: "/about" },
];

export const terminalCommands = [
  { prompt: "~", command: "whoami", output: "divyanshu-singh" },
  { prompt: "~", command: "cat identity.txt", output: "Creative Programmer · AI Developer · Designer" },
  { prompt: "~", command: "cat philosophy.txt", output: "SEE → DESIGN → BUILD → ITERATE → IMPACT" },
  { prompt: "~", command: "ls projects/", output: "ai/ sde/" },
];

export const technologyCategories = [
  "Java",
  "Next.js",
  "Node.js",
  "Python",
  "Flask",
  "Git / GitHub",
  "Claude Code",
  "Vercel",
  "Render",
  "Supabase",
  "Neon",
  "AI / ML Technologies",
  "Agentic AI Technologies",
  "Modern Web Technologies",
];