import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from "motion/react";
import { Sparkles, ArrowUpRight, Github, Linkedin, Award, Laptop, ShieldCheck, User } from "lucide-react";
import { PERSONAL_DETAILS } from "../types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

// Register GSAP plugins — CustomEase gives us exact cubic-bezier(0.16,1,0.3,1)
gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("expoOut", "0.16,1,0.3,1");

export default function Hero() {
  // ─── Framer Motion values for card 3D tilt (mouse) ──────────────────────────
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springCfg = { damping: 22, stiffness: 180, mass: 0.5 };
  const rotateX = useSpring(tiltX, springCfg);
  const rotateY = useSpring(tiltY, springCfg);

  // ─── Glass sheen reflex position ─────────────────────────────────────────────
  const glossX = useMotionValue(50);
  const glossY = useMotionValue(50);
  const glossXSpring = useSpring(glossX, { damping: 28, stiffness: 160 });
  const glossYSpring = useSpring(glossY, { damping: 28, stiffness: 160 });

  // Dynamic holographic overlay driven by mouse
  const holoGradient = useMotionTemplate`radial-gradient(circle at ${glossXSpring}% ${glossYSpring}%, rgba(255,255,255,0.22) 0%, transparent 55%), linear-gradient(${rotateY}deg, rgba(6,182,212,0.12) 0%, rgba(168,85,247,0.12) 50%, transparent 100%)`;

  // Reflection sweep — tracks mouse X for the glass glare sweep
  const sweepX = useMotionValue(-120);
  const sweepXSpring = useSpring(sweepX, { damping: 20, stiffness: 120 });
  const reflectionGradient = useMotionTemplate`linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.07) ${sweepXSpring}%, rgba(255,255,255,0.14) calc(${sweepXSpring}% + 6%), transparent calc(${sweepXSpring}% + 14%))`;

  const [isHovered, setIsHovered] = useState(false);

  // ─── Refs ─────────────────────────────────────────────────────────────────────
  // gsapEntranceRef → ONLY GSAP writes to this element (entrance)
  // floatRef        → ONLY Framer Motion writes (idle float)
  // cardRef         → ONLY Framer Motion writes (3D tilt + hover)
  // These three layers are siblings/children — zero GSAP↔Framer conflicts
  const gsapEntranceRef = useRef<HTMLDivElement>(null);

  // ─── GSAP ENTRANCE via ScrollTrigger ─────────────────────────────────────────
  // Card starts outside viewport (y: 140, scale 0.8, rotateX 20, rotateY -10,
  // blur 10px, opacity 0). Fires once as card scrolls up into view.
  useEffect(() => {
    const el = gsapEntranceRef.current;
    if (!el) return;

    // Hard-set invisible initial state before first paint
    gsap.set(el, {
      opacity: 0,
      y: 140,
      scale: 0.8,
      rotateX: 20,
      rotateY: -10,
      filter: "blur(10px)",
      transformPerspective: 1200,
      transformOrigin: "center 80%",
    });

    // ScrollTrigger: fires once the card's top edge crosses 92% down the viewport
    // (i.e., when the user scrolls it into view from the bottom)
    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        rotateY: 0,
        filter: "blur(0px)",
        duration: 1.4,
        ease: "expoOut",   // our CustomEase: cubic-bezier(0.16, 1, 0.3, 1)
        scrollTrigger: {
          trigger: el,
          start: "top 92%",   // fires when top of card hits 92% of viewport height
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // ─── Mouse interaction: 3D tilt ±8°, gloss, sweep ───────────────────────────
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width  - 0.5;
    const relY = (e.clientY - rect.top)  / rect.height - 0.5;

    // Cap rotation at ±8°
    tiltX.set(-relY * 8);
    tiltY.set( relX * 8);

    // Glass sheen
    glossX.set(((e.clientX - rect.left) / rect.width)  * 100);
    glossY.set(((e.clientY - rect.top)  / rect.height) * 100);

    // Sweep position mapped to card width %
    sweepX.set(((e.clientX - rect.left) / rect.width) * 140 - 20);
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
    glossX.set(50);
    glossY.set(50);
    sweepX.set(-120);
    setIsHovered(false);
  };

  // ─── Framer Motion: parallax on text column ──────────────────────────────────
  const { scrollY } = useScroll();
  const yText      = useTransform(scrollY, [0, 400], [0, 100]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-[110vh] flex flex-col items-center justify-center bg-[#030303] overflow-hidden pt-28 pb-16 px-4"
    >
      {/* Cinematic animated blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-900/10 blur-[150px] animate-pulse" />
      <div className="absolute bottom-[10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-purple-900/10 blur-[150px] animate-pulse" />

      {/* Digital Cyber-Grid Background overlay */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"
      />

      {/* Floating abstract particles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] rounded-full bg-cyan-400/40"
            style={{
              top:  `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -30, 0], opacity: [0.1, 0.8, 0.1] }}
            transition={{
              duration: 5 + Math.random() * 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

        {/* Left: Professional Introduction & Huge Typography */}
        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          {/* Futuristic micro badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-400 font-mono text-[10px] uppercase tracking-widest mb-6 shadow-sm shadow-blue-500/5"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin" /> Available For Internships &amp; Roles
          </motion.div>

          {/* Epic Title Word Reveal */}
          <h1 className="font-sans text-5xl sm:text-7xl xl:text-8xl font-black tracking-tight text-white leading-none mb-4">
            <span className="block text-slate-400 font-medium text-lg tracking-[0.2em] uppercase font-mono mb-2">
              HELLO, MY NAME IS
            </span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400"
            >
              DEEPAN
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              className="block text-3xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mt-2"
            >
              {PERSONAL_DETAILS.role}
            </motion.span>
          </h1>

          {/* Core Introduction Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-lg text-slate-400 font-sans font-light max-w-xl leading-relaxed mb-8"
          >
            3rd Year Computer Science student at <span className="text-white font-medium">SNS College of Engineering</span>.{" "}
            I construct secure, responsive frontend pipelines paired with robust backend relational systems.
          </motion.p>

          {/* Interactive Cinematic CTA Group */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-wrap gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => scrollToSection("showcase")}
              className="relative px-8 py-3.5 rounded-[16px] bg-white text-black font-semibold text-xs uppercase tracking-widest hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.35)] transition-all duration-300 flex items-center gap-2 group cursor-pointer active:scale-95 w-full sm:w-auto justify-center"
            >
              View Projects
              <ArrowUpRight className="w-4 h-4 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => scrollToSection("resume")}
              className="px-8 py-3.5 rounded-[16px] bg-[#0c0c0c]/80 text-white border border-white/[0.08] hover:bg-white/[0.04] hover:border-white/20 hover:scale-105 transition-all duration-300 active:scale-95 w-full sm:w-auto justify-center flex items-center gap-2"
            >
              View Resume
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="px-8 py-3.5 rounded-[16px] bg-[#050505] text-slate-400 font-medium text-xs uppercase tracking-widest border border-white/[0.04] hover:text-white hover:bg-white/[0.02] hover:border-white/10 transition-all duration-300 active:scale-95 w-full sm:w-auto justify-center"
            >
              Contact
            </button>
          </motion.div>

          {/* Social icons row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center gap-4 mt-10 text-slate-500"
          >
            <span className="font-mono text-[10px] uppercase tracking-wider">CONNECT //</span>
            <a href={PERSONAL_DETAILS.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href={PERSONAL_DETAILS.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>

        {/* ═══ Right: Premium Cinematic 3D ID Badge ═══════════════════════════════

          LAYER ARCHITECTURE (3 independent layers, zero conflicts):
          ┌─ gsapEntranceRef  plain <div>  → GSAP entrance only
          │  ┌─ <motion.div>  float layer  → FM idle y float
          │  │  ┌─ ambient glow <div>
          │  │  └─ <motion.div> card      → FM 3D tilt + hover scale/shadow
          ═══════════════════════════════════════════════════════════════════════ */}
        <div
          className="lg:col-span-5 flex flex-col items-center justify-center relative"
          style={{ perspective: "1200px" }}
        >
          {/* ── Layer 1: GSAP entrance target (opacity/y/scale/rotateX/Y/blur) ── */}
          <div
            ref={gsapEntranceRef}
            className="relative flex flex-col items-center"
          >
            {/* Lanyard Fabric */}
            <div className="absolute top-[-150px] w-5 h-[150px] bg-gradient-to-b from-[#18181b] to-cyan-500/40 rounded-b-md z-0 shadow-lg" />
            {/* Lanyard Clip */}
            <div className="absolute top-[-8px] w-6 h-6 rounded-full bg-gradient-to-r from-zinc-700 to-zinc-800 border border-white/10 z-10 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-950" />
            </div>

            {/* ── Layer 2: Framer Motion idle float (subtle ±5px) ── */}
            <motion.div
              className="relative flex items-center justify-center z-10"
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "mirror",
              }}
            >
              {/* Ambient glow aura */}
              <div
                className="absolute -inset-4 rounded-[40px] pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, rgba(6,182,212,0.20) 0%, rgba(168,85,247,0.16) 100%)",
                  filter: "blur(48px)",
                  opacity: isHovered ? 1 : 0.7,
                  boxShadow: isHovered
                    ? "0 0 110px rgba(6,182,212,0.4), 0 0 70px rgba(168,85,247,0.3)"
                    : "0 0 60px rgba(6,182,212,0.15), 0 0 40px rgba(168,85,247,0.1)",
                  transition: "opacity 0.5s ease, box-shadow 0.5s ease",
                }}
              />

              {/* ── Layer 3: Framer Motion 3D tilt + hover (ONLY FM touches this) ── */}
              <motion.div
                id="holographic-id-badge"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={() => setIsHovered(true)}
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                }}
                animate={{
                  scale: isHovered ? 1.02 : 1,
                  boxShadow: isHovered
                    ? "0 40px 90px -15px rgba(6,182,212,0.3), 0 0 60px rgba(168,85,247,0.2), 0 0 0 1px rgba(6,182,212,0.25)"
                    : "0 30px 60px -15px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.06)",
                }}
                transition={{ type: "spring", damping: 18, stiffness: 200 }}
                className="relative w-[320px] h-[480px] rounded-[24px] bg-gradient-to-b from-white/[0.07] to-white/[0.01] border border-white/[0.12] backdrop-blur-2xl overflow-hidden cursor-grab z-10"
              >
                {/* Glossy holographic sheen — follows cursor */}
                <motion.div
                  className="absolute inset-0 pointer-events-none opacity-40 z-30"
                  style={{ background: holoGradient, mixBlendMode: "overlay" }}
                />

                {/* Glass reflection sweep — glides across on hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none z-31"
                  style={{
                    background: reflectionGradient,
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.4s ease",
                  }}
                />

                {/* Glowing inner border frame */}
                <div
                  className="absolute inset-[1px] rounded-[23px] pointer-events-none z-20 transition-all duration-500"
                  style={{
                    border: isHovered
                      ? "1px solid rgba(6,182,212,0.35)"
                      : "1px solid rgba(255,255,255,0.06)",
                    boxShadow: isHovered
                      ? "inset 0 0 30px rgba(6,182,212,0.08)"
                      : "none",
                  }}
                />

                {/* ── Header Area ── */}
                <div className="relative flex flex-col items-center bg-white/[0.02] pt-6 pb-4 border-b border-white/[0.08] px-4">
                  {/* Lanyard Slot Hole */}
                  <div className="w-10 h-2 rounded-full bg-black/80 border border-white/5 mb-3" />
                  <div className="flex items-center gap-1.5 mb-1 text-[10px] font-mono uppercase text-slate-400 tracking-[0.2em]">
                    <Award className="w-3.5 h-3.5 text-cyan-400" /> SNS College of Eng.
                  </div>
                  <div className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500">
                    CSE DEPARTMENT • STUDENT ID
                  </div>
                </div>

                {/* ── Main Badge Content Area ── */}
                <div className="p-6 flex flex-col items-center justify-between h-[350px]">

                  {/* Profile Avatar Frame */}
                  <div className="relative group/avatar">
                    <div className="absolute inset-[-4px] rounded-full bg-gradient-to-tr from-cyan-500 via-blue-500 to-purple-500 blur-sm opacity-50 group-hover/avatar:opacity-100 transition-opacity duration-300" />
                    <div className="relative w-28 h-28 rounded-full border-2 border-white/10 overflow-hidden bg-[#0a0a0d] group/avatar-inner select-none flex items-center justify-center transition-all duration-300 hover:border-cyan-500/50">
                      <img
                        src={PERSONAL_DETAILS.avatar}
                        alt="Deepan Developer Avatar"
                        className="w-full h-full object-cover transition-all duration-500 group-hover/avatar-inner:scale-105"
                      />
                    </div>
                    {/* Online status dot */}
                    <span className="absolute bottom-1 right-1 flex h-3 w-3 z-10">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                    </span>
                  </div>

                  {/* Developer Credentials */}
                  <div className="text-center w-full mt-4 flex-1 flex flex-col justify-center">
                    <div className="font-sans text-2xl font-black text-white tracking-wide uppercase">
                      {PERSONAL_DETAILS.name}
                    </div>
                    <div className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider mt-0.5">
                      {PERSONAL_DETAILS.role}
                    </div>

                    {/* Micro tech specs */}
                    <div className="grid grid-cols-2 gap-3 mt-4 text-[9px] font-mono text-slate-400 bg-white/[0.03] border border-white/[0.08] rounded-xl p-3">
                      <div className="text-left">
                        <span className="text-slate-500 uppercase block mb-0.5">Degree</span>
                        <span className="text-slate-200 font-bold">B.E. CSE</span>
                      </div>
                      <div className="text-left border-l border-white/[0.05] pl-3">
                        <span className="text-slate-500 uppercase block mb-0.5">Academic Yr</span>
                        <span className="text-slate-200 font-bold">3rd Yr / Sem 5</span>
                      </div>
                    </div>
                  </div>

                  {/* Holographic Security Panel */}
                  <div className="w-full flex items-center justify-between mt-4 pt-4 border-t border-white/[0.08] text-[9px] font-mono text-slate-500">
                    <div className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                      <span>UID_DEEPAN_CSE_SNS</span>
                    </div>
                    {/* Simulated barcode */}
                    <div className="flex gap-0.5 items-end h-4">
                      <div className="w-0.5 h-3 bg-white/30" />
                      <div className="w-1.5 h-4 bg-white/40" />
                      <div className="w-0.5 h-2 bg-white/20" />
                      <div className="w-1   h-4 bg-white/50" />
                      <div className="w-0.5 h-3 bg-white/30" />
                      <div className="w-0.5 h-4 bg-white/40" />
                    </div>
                  </div>

                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        {/* ══════════════════════════════════════════════════════════════════════ */}

      </div>

      {/* Panoramic Awwwards Glowing Marquee Ribbon */}
      <div className="absolute bottom-0 left-0 right-0 py-6 bg-[#060606] border-y border-white/[0.03] overflow-hidden z-10 flex select-none pointer-events-none">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-12 font-mono text-xs text-slate-500/75 tracking-[0.25em] uppercase">
          {[...Array(4)].map((_, j) => (
            <div key={j} className="flex items-center gap-12 shrink-0">
              <span>Full Stack Developer</span>
              <span className="text-cyan-500 font-extrabold">•</span>
              <span>Python Engineer</span>
              <span className="text-purple-500 font-extrabold">•</span>
              <span>React Architect</span>
              <span className="text-blue-500 font-extrabold">•</span>
              <span>UI/UX Designer</span>
              <span className="text-pink-500 font-extrabold">•</span>
              <span>SNS College of Engineering Alumni</span>
              <span className="text-cyan-500 font-extrabold">•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
