import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sparkles, Terminal, Sun, Moon } from "lucide-react";
import { PERSONAL_DETAILS } from "../types";

interface NavbarProps {
  theme?: "light" | "dark";
  toggleTheme?: () => void;
}

export default function Navbar({ theme = "dark", toggleTheme }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "showcase", label: "Showcase" },
    { id: "resume", label: "Resume" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    // Detect scrolling to add background blur/shadow intensity
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // IntersectionObserver to sync active nav items with scroll position
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // Trigger when section occupies the middle of screen
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all sections
    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      {/* Scroll Progress Bar at the top of the viewport */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/[0.03] z-50">
        <motion.div
          id="scroll-progress-indicator"
          className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 origin-left"
          style={{
            scaleX: scrolled ? undefined : 0, // Fallback if scrolling state is calculated differently
          }}
          animate={{
            scaleX: typeof window !== "undefined" ? undefined : 0
          }}
        />
      </div>

      <header
        id="main-header"
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-5xl px-4 transition-all duration-300`}
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className={`flex items-center justify-between px-6 py-3 rounded-[24px] border transition-all duration-300 ${
            scrolled
              ? "bg-[#050505]/70 backdrop-blur-xl border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.8)]"
              : "bg-white/[0.02] backdrop-blur-md border-white/[0.04]"
          }`}
        >
          {/* Logo / Brand */}
          <div 
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="relative w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-mono text-sm font-bold shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Terminal className="w-4 h-4 text-white" />
              <div className="absolute inset-0 rounded-xl bg-white/25 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold text-sm tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                {PERSONAL_DETAILS.name}
              </span>
              <span className="font-mono text-[9px] text-slate-500 tracking-widest uppercase">
                PORTFOLIO
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-1.5 bg-[#0f0f0f]/60 p-1 rounded-full border border-white/[0.03]">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-colors ${
                    isActive ? "text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {/* Sliding Pill Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-white/[0.08] border border-white/[0.05] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Call to action & Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            {toggleTheme && (
              <button
                onClick={toggleTheme}
                aria-label="Toggle Theme"
                className="p-2 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] text-slate-400 hover:text-white transition-all cursor-pointer flex items-center justify-center active:scale-95"
              >
                {theme === "light" ? (
                  <Moon className="w-4 h-4 text-purple-400" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-400" />
                )}
              </button>
            )}
            <button
              onClick={() => scrollToSection("contact")}
              className="px-4 py-1.5 rounded-full bg-white text-black hover:bg-transparent hover:text-white border border-white text-xs font-semibold tracking-wide transition-all duration-300 shadow-lg shadow-white/5 active:scale-95"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile Menu Trigger & Theme Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            {toggleTheme && (
              <button
                onClick={toggleTheme}
                aria-label="Toggle Theme"
                className="p-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] text-slate-400 hover:text-white transition-all active:scale-95 flex items-center justify-center"
              >
                {theme === "light" ? (
                  <Moon className="w-4.5 h-4.5 text-purple-400" />
                ) : (
                  <Sun className="w-4.5 h-4.5 text-amber-400" />
                )}
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] text-slate-400 hover:text-white transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-4 top-20 z-30 md:hidden bg-[#070707]/95 border border-white/[0.08] rounded-[24px] p-6 backdrop-blur-2xl shadow-[0_24px_50px_rgba(0,0,0,0.9)]"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center justify-between p-3 rounded-2xl text-left text-sm font-semibold transition-colors ${
                      isActive 
                        ? "bg-white/[0.06] text-white border-l-2 border-cyan-400 pl-4" 
                        : "text-slate-400 hover:text-white hover:bg-white/[0.02]"
                    }`}
                  >
                    <span>{item.label}</span>
                    <Sparkles className={`w-4 h-4 transition-opacity ${isActive ? "text-cyan-400 opacity-100" : "opacity-0"}`} />
                  </motion.button>
                );
              })}
              
              <div className="h-[1px] bg-white/[0.05] my-2" />
              
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-center hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all active:scale-[0.98]"
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
