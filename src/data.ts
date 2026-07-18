import type { Skill, TimelineItem } from './types';

// NOTE: Les projets et articles de blog sont gérés via les collections de contenu
// (src/content/projets/*.md et src/content/blog/*.md), pas ce fichier.
// Ce fichier ne conserve que les données structurées réutilisées par plusieurs pages :
// compétences (page /expertise) et jalons de parcours (page /parcours).

export const SKILLS: Skill[] = [
  {
    id: 'ai-ml',
    category: {
      en: 'AI & Deep Learning',
      fr: 'IA & Deep Learning'
    },
    icon: '🧠',
    colorClass: 'text-violet-500',
    bgClass: 'bg-violet-500/10',
    description: {
      en: 'Deep learning architectures (Transformers, GPT) built from scratch with PyTorch, classical ML pushed to production with scikit-learn.',
      fr: 'Architectures deep learning (Transformers, GPT) implémentées de A à Z avec PyTorch, machine learning classique poussé en production avec scikit-learn.'
    },
    list: [
      { name: { fr: 'PyTorch', en: 'PyTorch' }, level: 'Advanced', percentage: 88 },
      { name: { fr: 'scikit-learn', en: 'scikit-learn' }, level: 'Expert', percentage: 95 },
      { name: { fr: 'NumPy / Pandas', en: 'NumPy / Pandas' }, level: 'Expert', percentage: 92 },
      { name: { fr: 'Transformers / GPT', en: 'Transformers / GPT' }, level: 'Advanced', percentage: 82 }
    ],
    tags: ['PyTorch', 'scikit-learn', 'NumPy', 'Pandas', 'Transformers', 'CNN', 'LSTM', 'ONNX']
  },
  {
    id: 'languages',
    category: {
      en: 'Languages',
      fr: 'Langages'
    },
    icon: '⌨',
    colorClass: 'text-indigo-500',
    bgClass: 'bg-indigo-500/10',
    description: {
      en: 'Python as a primary tool, JavaScript/React for modern interfaces, with C and Cython for low-level performance.',
      fr: 'Python comme outil principal, JavaScript/React pour les interfaces modernes, complétés par C et Cython pour la performance bas niveau.'
    },
    list: [
      { name: { fr: 'Python', en: 'Python' }, level: 'Expert', percentage: 96 },
      { name: { fr: 'JavaScript / React', en: 'JavaScript / React' }, level: 'Expert', percentage: 90 },
      { name: { fr: 'HTML / CSS', en: 'HTML / CSS' }, level: 'Expert', percentage: 88 },
      { name: { fr: 'SQL (+ via Python)', en: 'SQL (+ via Python)' }, level: 'Expert', percentage: 90 },
      { name: { fr: 'Cython', en: 'Cython' }, level: 'Advanced', percentage: 78 },
      { name: { fr: 'C', en: 'C' }, level: 'Advanced', percentage: 75 }
    ],
    tags: ['Python', 'JavaScript', 'React', 'HTML/CSS', 'SQL', 'Cython', 'C']
  },
  {
    id: 'fullstack',
    category: {
      en: 'Fullstack & Systems',
      fr: 'Fullstack & Systèmes'
    },
    icon: '⚡',
    colorClass: 'text-emerald-500',
    bgClass: 'bg-emerald-500/10',
    description: {
      en: 'High-performance async APIs with FastAPI, React frontends built and served from a single backend, and web-to-desktop packaging.',
      fr: 'APIs asynchrones haute performance avec FastAPI, frontends React buildés et servis par le backend, et portage d\'applications web en desktop.'
    },
    list: [
      { name: { fr: 'FastAPI (API & WebSocket)', en: 'FastAPI (API & WebSocket)' }, level: 'Expert', percentage: 94 },
      { name: { fr: 'React (build servi par backend)', en: 'React (build served by backend)' }, level: 'Expert', percentage: 90 },
      { name: { fr: 'Web → Desktop (PyWebView)', en: 'Web → Desktop (PyWebView)' }, level: 'Advanced', percentage: 80 }
    ],
    tags: ['FastAPI', 'React', 'WebSocket', 'PyWebView', 'PyInstaller', 'Docker', 'SQLModel']
  },
  {
    id: 'cyber',
    category: {
      en: 'Cybersecurity',
      fr: 'Cybersécurité'
    },
    icon: '🔐',
    colorClass: 'text-amber-500',
    bgClass: 'bg-amber-500/10',
    description: {
      en: 'AI-augmented defensive tooling — IDS/IPS, anti-phishing, sandboxing, vulnerability scanning — built on solid Linux and web-security fundamentals.',
      fr: 'Outils défensifs augmentés par l\'IA — IDS/IPS, anti-phishing, sandbox, scanner de vulnérabilités — sur des fondations Linux et sécurité web solides.'
    },
    list: [
      { name: { fr: 'Apps cyber augmentées IA', en: 'AI-Augmented Cyber Apps' }, level: 'Expert', percentage: 93 },
      { name: { fr: 'Linux & Bash', en: 'Linux & Bash' }, level: 'Advanced', percentage: 85 },
      { name: { fr: 'Vulnérabilités web (OWASP)', en: 'Web Vulnerabilities (OWASP)' }, level: 'Advanced', percentage: 78 }
    ],
    tags: ['IDS/IPS', 'Anti-Phishing', 'Sandbox', 'Scanner Vulns', 'Linux', 'Bash', 'OWASP']
  },
  {
    id: 'programmation',
    category: {
      en: 'Advanced Programming',
      fr: 'Programmation Avancée'
    },
    icon: '⚙',
    colorClass: 'text-sky-500',
    bgClass: 'bg-sky-500/10',
    description: {
      en: 'Async programming with asyncio, multithreading/multiprocessing, and rigorous object-oriented and classical design.',
      fr: 'Programmation asynchrone avec asyncio, multithreading/multiprocessing, et conception orientée objet et classique rigoureuse.'
    },
    list: [
      { name: { fr: 'Asyncio (asynchrone)', en: 'Asyncio (async)' }, level: 'Expert', percentage: 93 },
      { name: { fr: 'Multithreading / Multiprocessing', en: 'Multithreading / Multiprocessing' }, level: 'Expert', percentage: 90 },
      { name: { fr: 'Programmation Orientée Objet', en: 'Object-Oriented Programming' }, level: 'Expert', percentage: 92 },
      { name: { fr: 'Programmation classique', en: 'Classical Programming' }, level: 'Expert', percentage: 92 }
    ],
    tags: ['asyncio', 'Threading', 'Multiprocessing', 'IPC', 'OOP', 'Design Patterns']
  }
];

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: 'debuts-autodidacte',
    period: '2023 - 2025',
    title: {
      en: 'Self-Taught Programming Journey',
      fr: 'Apprentissage Autodidacte de la Programmation'
    },
    institution: {
      en: 'Self-directed learning',
      fr: 'Formation en autodidacte'
    },
    description: {
      en: 'Started programming in the terminal during high school, then committed to a self-directed path — building real projects, debugging complex systems, and using rest periods to keep learning.',
      fr: 'Premiers pas en programmation au terminal pendant les années de lycée, puis engagement dans un parcours autodidacte complet : projets réels, débogage de bugs complexes, et temps libre investi à progresser en continu.'
    }
  },
  {
    id: 'ifri-cotonou',
    period: '2025 - 2026',
    title: {
      en: 'Computer Science & AI Student',
      fr: 'Étudiant en Informatique & IA'
    },
    institution: {
      en: 'IFRI (Institut de Formation et de Recherche en Informatique) — Cotonou, Bénin',
      fr: 'IFRI (Institut de Formation et de Recherche en Informatique) — Cotonou, Bénin'
    },
    description: {
      en: 'Combining academic coursework with intensive independent development in systems programming, algorithmics, mathematical foundations of machine learning, and networks.',
      fr: 'Formation académique combinée à un développement personnel intensif : programmation système, algorithmique, fondements mathématiques du machine learning et réseaux.'
    }
  },
  {
    id: 'open-source-cyber',
    period: '2026',
    title: {
      en: 'AI & Cybersecurity Builder',
      fr: 'Créateur IA & Cybersécurité'
    },
    institution: {
      en: 'Personal & open-source projects',
      fr: 'Projets personnels & open-source'
    },
    description: {
      en: 'Designing and shipping deep learning detectors, an offline RAG assistant, AutoML tooling, and AI-augmented cybersecurity modules (IDS/IPS, anti-phishing).',
      fr: 'Conception de classifieurs profonds, d\'un assistant RAG offline, d\'outils AutoML, et de modules de cybersécurité augmentée par l\'IA (IDS/IPS, anti-phishing).'
    }
  }
];
