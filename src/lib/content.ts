export interface Project {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  problem: string;
  solution: string;
  technicalDetails: string;
  architecture?: string;
  aiApproach?: string;
  importantDecisions?: string[];
  performanceConsiderations?: string[];
  engineeringChallenges?: string[];
  iterationRefinement?: string;
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
    shortDescription: "Grounded RAG academic assistant that reduces cognitive load for students",
    problem: "Students often have study materials distributed across files and sources. During academic stress, creating prompts and organizing information can itself add cognitive load.",
    solution: "StudyMate provides a centralized platform where students can upload study materials and generate cleaner, directly usable academic resources including notes, grounded Q&A, and quizzes.",
    technicalDetails: "RAG-based system with source-grounded generation. Document ingestion pipeline for various file formats. Vector embeddings for semantic search across student materials. Generation pipeline for notes, Q&A, and quizzes with citations back to source documents.",
    architecture: "Document processing pipeline → Vector storage → Retrieval → Grounded generation with source citations → Multiple output formats (notes, Q&A, quizzes).",
    aiApproach: "RAG with student-uploaded documents as knowledge base. Source-grounded generation ensures all outputs trace back to original materials. No external knowledge hallucination.",
    importantDecisions: [
      "Strict grounding to uploaded materials only",
      "Multiple output formats from same retrieval",
      "Simple upload flow to minimize friction"
    ],
    performanceConsiderations: [
      "Efficient document chunking for retrieval",
      "Parallel generation of different output types"
    ],
    engineeringChallenges: [
      "Handling diverse document formats (PDF, DOCX, TXT, etc.)",
      "Maintaining context across large document sets",
      "Generating pedagogically useful quizzes from source material"
    ],
    iterationRefinement: "Refined chunking strategy and prompt engineering based on student feedback on output quality.",
    stack: ["RAG", "Source-Grounded Generation", "End-to-End Application Development"],
    category: "ai",
    githubUrl: "https://github.com/real-ds/studymate-ai-hub",
    liveDemoUrl: "#",
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
    technicalDetails: "Full-stack social platform with real-time features. Firebase for authentication and real-time database. Google OAuth for seamless student login. Neon Postgres for relational data (clubs, posts, comments, users).",
    architecture: "Firebase Auth + Firestore for real-time social features. Neon Postgres for structured data and complex queries. Serverless functions for business logic.",
    importantDecisions: [
      "Firebase for real-time social features",
      "Neon Postgres for relational integrity",
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
    iterationRefinement: "Migrated from pure Firebase to hybrid Firebase + Neon for better query flexibility. Added club analytics dashboard.",
    stack: ["Firebase", "Google OAuth", "Neon Postgres"],
    category: "sde",
    githubUrl: "https://github.com/real-ds/vit-connect",
    liveDemoUrl: "#",
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