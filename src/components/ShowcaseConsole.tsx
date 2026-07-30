import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Terminal as TermIcon, 
  Layers, 
  Award, 
  ExternalLink, 
  Github, 
  Play, 
  Cpu, 
  Database, 
  Palette, 
  CheckCircle2, 
  Code2, 
  Terminal, 
  Atom, 
  Server, 
  FolderGit2 
} from "lucide-react";
import { PROJECTS_DATA, SKILLS_DATA, CERTIFICATIONS_DATA } from "../types";

export default function ShowcaseConsole() {
  const [activeTab, setActiveTab] = useState<"projects" | "certifications" | "tech">("projects");
  const [terminalText, setTerminalText] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(PROJECTS_DATA[0].id);

  // Card individual tilts
  const [cardTilts, setCardTilts] = useState<Record<string, { rx: number; ry: number; gx: number; gy: number }>>({});

  // Command typing sequence
  const typingTimer = useRef<NodeJS.Timeout | null>(null);

  const triggerTyping = (text: string) => {
    if (typingTimer.current) clearInterval(typingTimer.current);
    let index = 0;
    setTerminalText("");
    
    typingTimer.current = setInterval(() => {
      setTerminalText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        if (typingTimer.current) clearInterval(typingTimer.current);
      }
    }, 15);
  };

  useEffect(() => {
    if (activeTab === "projects") {
      const proj = PROJECTS_DATA.find(p => p.id === selectedProjectId);
      triggerTyping(
        `$ npx deepan-workspace load --project="${proj?.title}"\n` +
        `➜ Status: STABLE // RENDER COMPLETE\n` +
        `➜ Dependencies: ${proj?.tech.join(" • ")}\n` +
        `➜ Repository: Secured`
      );
    } else if (activeTab === "certifications") {
      triggerTyping(
        `$ query credentials --index="deepan_certifications"\n` +
        `➜ Found ${CERTIFICATIONS_DATA.length} verified academic credentials\n` +
        `➜ Cryptographic validation: SECURE\n` +
        `➜ Issuers: Google • Meta • IDF • Postgres Acad.`
      );
    } else if (activeTab === "tech") {
      triggerTyping(
        `$ sysctl --get-capabilities\n` +
        `➜ Core Systems loaded:\n` +
        `  Frontend Framework: React (Fiber Engine)\n` +
        `  Primary Backend: Express Node.js & Python\n` +
        `  Database Storage: Transactional PostgreSQL`
      );
    }
  }, [activeTab, selectedProjectId]);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setCardTilts((prev) => ({
      ...prev,
      [id]: {
        rx: -y / 12,
        ry: x / 12,
        gx: ((e.clientX - rect.left) / rect.width) * 100,
        gy: ((e.clientY - rect.top) / rect.height) * 100,
      }
    }));
  };

  const handleCardMouseLeave = (id: string) => {
    setCardTilts((prev) => ({
      ...prev,
      [id]: { rx: 0, ry: 0, gx: 50, gy: 50 }
    }));
  };

  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case "Terminal": return <Terminal className="w-5 h-5 text-blue-400" />;
      case "Code2": return <Code2 className="w-5 h-5 text-red-400" />;
      case "Code": return <TermIcon className="w-5 h-5 text-slate-400" />;
      case "Atom": return <Atom className="w-5 h-5 text-cyan-400" />;
      case "Cpu": return <Cpu className="w-5 h-5 text-green-400" />;
      case "Server": return <Server className="w-5 h-5 text-purple-400" />;
      case "Database": return <Database className="w-5 h-5 text-blue-500" />;
      case "Layers": return <Layers className="w-5 h-5 text-pink-400" />;
      case "Palette": return <Palette className="w-5 h-5 text-teal-400" />;
      default: return <TermIcon className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section
      id="showcase"
      className="relative py-24 sm:py-32 bg-[#030303] overflow-hidden px-4"
    >
      {/* Background radial atmosphere */}
      <div className="absolute top-[30%] left-[5%] w-[450px] h-[450px] rounded-full bg-blue-600/[0.08] blur-[60px] transform-gpu pointer-events-none" />
      <div className="absolute bottom-[30%] right-[5%] w-[450px] h-[450px] rounded-full bg-purple-600/[0.08] blur-[60px] transform-gpu pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-400 mb-2">
            STABLE RELEASES
          </span>
          <h2 className="font-sans text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            PORTFOLIO SHOWCASE
          </h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-cyan-500 to-purple-600 mt-4 rounded-full" />
        </div>

        {/* Modular Navigation Bar for Showcase - Console style */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0a0a0c]/80 border border-white/[0.04] p-3 rounded-2xl mb-8 backdrop-blur-xl">
          <div className="flex flex-wrap gap-2">
            {[
              { id: "projects", label: "Projects", icon: FolderGit2, color: "text-cyan-400" },
              { id: "certifications", label: "Certifications", icon: Award, color: "text-purple-400" },
              { id: "tech", label: "Tech Stack", icon: Layers, color: "text-pink-400" }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    isActive 
                      ? "bg-white/[0.06] text-white border border-white/[0.08] shadow-inner shadow-white/5" 
                      : "text-slate-400 hover:text-white hover:bg-white/[0.02] border border-transparent"
                  }`}
                >
                  <tab.icon className={`w-4 h-4 ${tab.color}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 px-3 py-1 bg-[#101014] border border-white/[0.04] rounded-lg text-[10px] font-mono text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span>SHELL STABLE // NO-ERRORS</span>
          </div>
        </div>

        {/* Dynamic Display Panels */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Main Showcase Panel */}
          <div className="md:col-span-8">
            <AnimatePresence mode="wait">
              {activeTab === "projects" && (
                <motion.div
                  key="projects-grid"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {PROJECTS_DATA.map((proj) => {
                    const tilt = cardTilts[proj.id] || { rx: 0, ry: 0, gx: 50, gy: 50 };
                    const isFocused = selectedProjectId === proj.id;
                    
                    return (
                      <div
                        key={proj.id}
                        onMouseMove={(e) => handleCardMouseMove(e, proj.id)}
                        onMouseLeave={() => handleCardMouseLeave(proj.id)}
                        onClick={() => setSelectedProjectId(proj.id)}
                        style={{
                          transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                          transformStyle: "preserve-3d",
                        }}
                        className={`relative rounded-[24px] bg-[#08080a]/80 border transition-all duration-300 p-6 backdrop-blur-xl overflow-hidden cursor-pointer ${
                          isFocused 
                            ? "border-cyan-500/40 shadow-[0_15px_40px_rgba(6,182,212,0.15)]" 
                            : "border-white/[0.04] hover:border-white/10"
                        }`}
                      >
                        {/* Dynamic glow overlay following mouse */}
                        <div
                          className="absolute inset-0 pointer-events-none opacity-20 transition-opacity"
                          style={{
                            background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, ${proj.glowColor}, transparent 65%)`
                          }}
                        />

                        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                          {/* Image preview */}
                          <div className="sm:col-span-4 rounded-xl overflow-hidden aspect-video sm:aspect-square bg-[#0f0f13] border border-white/5 relative group">
                            <img
                              src={proj.image}
                              alt={proj.title}
                              className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                              referrerPolicy="no-referrer"
                            />
                            {/* Glowing focus frame */}
                            {isFocused && (
                              <div className="absolute inset-0 border-2 border-cyan-400 rounded-xl animate-pulse pointer-events-none" />
                            )}
                          </div>

                          {/* Info section */}
                          <div className="sm:col-span-8 flex flex-col justify-between h-full">
                            <div>
                              <div className="flex flex-wrap gap-1.5 mb-2">
                                {proj.tech.map((t, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-0.5 rounded-md bg-[#121216] border border-white/[0.03] text-[9px] font-mono text-slate-400"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                              <h3 className="font-sans text-lg font-bold text-white mb-2 flex items-center gap-2">
                                {proj.title}
                              </h3>
                              <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed mb-4">
                                {isFocused ? proj.detailedDescription : proj.description}
                              </p>
                            </div>

                            {/* Actions bar */}
                            <div className="flex items-center gap-4 mt-auto">
                              <a
                                href={proj.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                              >
                                <Github className="w-3.5 h-3.5" /> Source
                              </a>
                              <a
                                href={proj.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                              >
                                Live Demo <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}

              {activeTab === "certifications" && (
                <motion.div
                  key="certifications-grid"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {CERTIFICATIONS_DATA.map((cert) => (
                    <div
                      key={cert.id}
                      className="rounded-2xl bg-[#08080a]/60 border border-white/[0.04] p-5 backdrop-blur-xl relative overflow-hidden group hover:border-purple-500/20 transition-all duration-300"
                    >
                      {/* Purple ambient corner glow */}
                      <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/5 blur-2xl rounded-full" />
                      
                      <div className="flex items-start justify-between gap-4 relative z-10">
                        <div>
                          <span className="block text-[9px] font-mono text-purple-400 uppercase tracking-widest mb-1.5">
                            {cert.issuer}
                          </span>
                          <h3 className="font-sans text-sm font-bold text-white tracking-tight mb-1 group-hover:text-purple-300 transition-colors">
                            {cert.name}
                          </h3>
                          <span className="block text-[10px] font-mono text-slate-500">
                            Issued: {cert.date}
                          </span>
                        </div>
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:bg-purple-500/10 hover:border-purple-500/20 flex items-center justify-center text-slate-400 hover:text-purple-400 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === "tech" && (
                <motion.div
                  key="tech-categories"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {["Languages", "Frontend", "Backend", "Database & Design"].map((cat) => {
                    const skills = SKILLS_DATA.filter(s => s.category === cat);
                    return (
                      <div 
                        key={cat}
                        className="rounded-2xl bg-[#08080a]/60 border border-white/[0.04] p-6 backdrop-blur-xl"
                      >
                        <h3 className="font-mono text-[10px] uppercase text-cyan-400 tracking-[0.2em] mb-5 border-b border-white/[0.03] pb-3">
                          {cat}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {skills.map((skill, idx) => (
                            <div 
                              key={idx}
                              className="flex items-center justify-between p-3.5 bg-[#0d0d10]/40 border border-white/[0.02] rounded-xl hover:border-white/5 transition-all group"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-white/[0.02] border border-white/[0.04] flex items-center justify-center">
                                  {getSkillIcon(skill.iconName)}
                                </div>
                                <div>
                                  <span className="block text-xs font-semibold text-white group-hover:text-cyan-400 transition-colors">
                                    {skill.name}
                                  </span>
                                  <span className="block text-[9px] font-mono text-slate-500 uppercase">
                                    VERIFIED CAPABILITY
                                  </span>
                                </div>
                              </div>
                              
                              {/* Glowing level bullet indicator */}
                              <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                                <span className="font-mono text-xs font-bold text-slate-300">
                                  {skill.level}%
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right side: Developer shell terminal console logs */}
          <div className="md:col-span-4 space-y-6">
            <div className="rounded-[24px] bg-[#08080a]/80 border border-white/[0.04] p-4 font-mono text-xs text-slate-300 h-64 overflow-hidden flex flex-col backdrop-blur-xl shadow-2xl relative">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between border-b border-white/[0.04] pb-3 mb-4 text-slate-500 text-[10px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  <span className="ml-1 text-slate-400 font-bold uppercase tracking-wider text-[9px]">DEEPAN // CMD_LINE</span>
                </div>
                <span>v3.0.5</span>
              </div>
              
              {/* Dynamic typing content */}
              <div className="flex-1 flex flex-col justify-start text-left text-[11px] leading-relaxed text-slate-300 whitespace-pre-wrap font-mono">
                {terminalText}
                <span className="w-1.5 h-4 bg-cyan-400 inline-block animate-blink ml-0.5 vertical-middle" />
              </div>

              {/* Bottom stats lines */}
              <div className="mt-4 pt-3 border-t border-white/[0.04] text-[9px] text-slate-500 uppercase tracking-widest flex items-center justify-between">
                <span>BUFFER: ACTIVE</span>
                <span>RATE: 60 FPS</span>
              </div>
            </div>

            {/* Micro Quick facts panel */}
            <div className="rounded-[24px] bg-[#08080a]/80 border border-white/[0.04] p-5 backdrop-blur-xl relative overflow-hidden text-left">
              <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-3">SYSTEM ADVISORY</span>
              <h3 className="font-sans text-xs font-bold text-white uppercase tracking-wider mb-2">QUICK RESUME BRIEF</h3>
              <p className="text-slate-400 font-light text-[11px] leading-relaxed">
                Currently deep-diving into Express API structural micro-routing, D3.js visualization nodes, PostgreSQL indexing safety, and structural automation using Python handlers.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
