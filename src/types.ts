// @ts-ignore
import developerAvatar from "./assets/images/deepan_real_avatar_1783608733849.jpg";

export interface Skill {
  name: string;
  category: "Languages" | "Frontend" | "Backend" | "Tools & Design" | "Core Concepts";
  level: number; // 0 to 100
  color: string; // Tailwind glow accent
  iconName: string; // Lucide icon identifier
}

export interface Project {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
  glowColor: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  type: string;
  location: string;
  responsibilities: string[];
  learnings: string[];
  tech: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  glowColor: string;
}

export const PERSONAL_DETAILS = {
  name: "Deepan M",
  tagline: "Built. Scale. Automate.",
  college: "SNS College of Engineering",
  degree: "Bachelor of Engineering (B.E.)",
  department: "Computer Science and Engineering",
  year: "3rd Year",
  semester: "5th Semester",
  cgpa: "8.0",
  role: "Full Stack Developer",
  email: "deepanmuthu05@gmail.com",
  phone: "+91 9965585084",
  location: "Coimbatore, Tamilnadu",
  github: "https://github.com/deepan-deesa",
  linkedin: "https://linkedin.com/in/deepan-muthukrishnan",
  instagram: "https://instagram.com",
  avatar: developerAvatar,
  description: "I am a motivated, detail-oriented 3rd-year Computer Science and Engineering student at SNS College of Engineering, with hands-on experience in Python, Django, Flask, and full-stack web development. I specialize in crafting functional, highly responsive frontends paired with robust database systems. I thrive in collaborative, agile teams during internships, bringing software concepts to production-grade implementation with clean, maintainable, and secure architectures.",
  careerObjective: "Motivated and detail-oriented third-year Computer Science and Engineering student with hands-on experience in Python, full-stack development, Skilled in building functional web applications and collaborating within agile teams during internships. Seeking a Software Developer Intern / Entry-Level Developer role to apply strong problem-solving skills, programming knowledge, and a passion for continuous learning to deliver quality software solutions."
};

export const SKILLS_DATA: Skill[] = [
  // Languages
  { name: "Python", category: "Languages", level: 92, color: "from-blue-500 to-cyan-400", iconName: "Terminal" },
  { name: "Java", category: "Languages", level: 75, color: "from-red-500 to-orange-400", iconName: "Code2" },
  { name: "C", category: "Languages", level: 78, color: "from-gray-500 to-slate-400", iconName: "Code" },
  { name: "JavaScript", category: "Languages", level: 85, color: "from-yellow-400 to-amber-500", iconName: "FileJson" },
  
  // Frontend
  { name: "HTML & CSS", category: "Frontend", level: 95, color: "from-orange-500 to-yellow-400", iconName: "FileHtml" },
  { name: "React.js", category: "Frontend", level: 85, color: "from-cyan-400 to-blue-500", iconName: "Atom" },
  
  // Backend
  { name: "Django", category: "Backend", level: 88, color: "from-emerald-600 to-green-500", iconName: "Server" },
  { name: "Flask", category: "Backend", level: 82, color: "from-green-500 to-teal-400", iconName: "Cpu" },
  { name: "Full Stack (Basic)", category: "Backend", level: 85, color: "from-purple-500 to-indigo-400", iconName: "Server" },

  // Tools & Design
  { name: "Git & GitHub", category: "Tools & Design", level: 90, color: "from-indigo-500 to-blue-500", iconName: "FolderGit2" },
  { name: "Canva", category: "Tools & Design", level: 85, color: "from-teal-400 to-cyan-500", iconName: "Palette" },
  { name: "VS Code", category: "Tools & Design", level: 92, color: "from-blue-400 to-indigo-600", iconName: "Code" },

  // Core Concepts
  { name: "Data Structures", category: "Core Concepts", level: 80, color: "from-purple-600 to-pink-500", iconName: "Layers" },
  { name: "SDLC", category: "Core Concepts", level: 85, color: "from-rose-500 to-orange-500", iconName: "CheckCircle2" },
  { name: "Debugging & Testing", category: "Core Concepts", level: 82, color: "from-cyan-500 to-blue-600", iconName: "Code2" }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "chainshield",
    title: "ChainShield",
    description: "Blockchain-powered digital evidence integrity platform protecting police evidence with SHA-256 hashing & secure chain of custody.",
    detailedDescription: "ChainShield is a blockchain-powered digital evidence integrity platform that protects police evidence from unauthorized modifications by using SHA-256 hashing, blockchain-based integrity verification, and a secure chain of custody system.",
    tech: ["TypeScript", "React", "Blockchain", "SHA-256", "Supabase", "Node.js"],
    liveUrl: "https://github.com/deepan-deesa/Chainshield",
    githubUrl: "https://github.com/deepan-deesa/Chainshield",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
    glowColor: "rgba(6, 182, 212, 0.45)"
  },
  {
    id: "hiregenie-ai",
    title: "HireGenie AI",
    description: "AI-powered career assistant with intelligent job matching, resume analysis, interview prep, and email management.",
    detailedDescription: "HireGenie AI is an AI-powered career assistant that helps users find jobs smarter. It offers AI job matching, resume analysis, interview preparation, application tracking, and email management.",
    tech: ["TypeScript", "React", "AI / LLM", "Tailwind CSS", "Node.js"],
    liveUrl: "https://github.com/deepan-deesa/HireGenie-AI",
    githubUrl: "https://github.com/deepan-deesa/HireGenie-AI",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
    glowColor: "rgba(168, 85, 247, 0.45)"
  },
  {
    id: "doubleshiftai",
    title: "DoubleShift AI",
    description: "Intelligent workplace automation & AI workflow orchestrator boosting software team throughput.",
    detailedDescription: "DoubleShift AI optimizes developer efficiency through dynamic task scheduling, AI assistance pipeline, and workflow automation.",
    tech: ["TypeScript", "React", "Python", "FastAPI", "GSAP"],
    liveUrl: "https://github.com/deepan-deesa/doubleshiftai",
    githubUrl: "https://github.com/deepan-deesa/doubleshiftai",
    image: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&q=80&w=800",
    glowColor: "rgba(59, 130, 246, 0.45)"
  },
  {
    id: "globetrotter",
    title: "Globetrotter",
    description: "Full-stack interactive travel companion application with destination discovery & itinerary planning.",
    detailedDescription: "Globetrotter allows travelers to discover destinations, plan detailed day-by-day itineraries, track budgets, and share travel experiences.",
    tech: ["TypeScript", "React", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "https://github.com/deepan-deesa/Globetrotter",
    githubUrl: "https://github.com/deepan-deesa/Globetrotter",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800",
    glowColor: "rgba(16, 185, 129, 0.45)"
  }
];

export const EXPERIENCE_DATA: Experience[] = [];

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    id: "cert-1",
    name: "Microsoft Azure AI",
    issuer: "Microsoft",
    date: "2025",
    credentialUrl: "https://microsoft.com",
    glowColor: "from-blue-500 to-indigo-500"
  },
  {
    id: "cert-2",
    name: "IBM – Enterprise Design Thinking Co-Creator",
    issuer: "IBM",
    date: "2025",
    credentialUrl: "https://ibm.com",
    glowColor: "from-purple-500 to-pink-500"
  },
  {
    id: "cert-3",
    name: "IBM – Enterprise Design Thinking Practitioner",
    issuer: "IBM",
    date: "2025",
    credentialUrl: "https://ibm.com",
    glowColor: "from-pink-500 to-rose-500"
  },
  {
    id: "cert-4",
    name: "NASSCOM – Digital Edge 101",
    issuer: "NASSCOM",
    date: "2025",
    credentialUrl: "https://nasscom.in",
    glowColor: "from-cyan-500 to-teal-500"
  }
];
