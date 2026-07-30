import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sparkles, Terminal, Sun, Moon } from "lucide-react";
import { PERSONAL_DETAILS } from "../types";
import PillNav from "./PillNav";

interface NavbarProps {
  theme?: "light" | "dark";
  toggleTheme?: () => void;
}

export default function Navbar({ theme = "dark", toggleTheme }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("#home");

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Showcase", href: "#showcase" },
    { label: "Resume", href: "#resume" },
    { label: "Contact", href: "#contact" }
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    ["home", "about", "showcase", "resume", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center items-center px-4 pointer-events-auto">
      <div className="flex items-center gap-3">
        {/* @ts-ignore */}
        <PillNav
          logo={PERSONAL_DETAILS.avatar}
          logoAlt="Deepan M Logo"
          items={navItems}
          activeHref={activeSection}
          baseColor="#08080a"
          pillColor="#121217"
          hoveredPillTextColor="#06b6d4"
          pillTextColor="#94a3b8"
          ease="power3.easeOut"
          initialLoadAnimation={true}
        />

        {toggleTheme && (
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-[#08080a] border border-white/10 text-cyan-400 hover:text-white hover:border-cyan-500/50 transition-all duration-300 shadow-lg"
            title="Toggle theme"
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        )}
      </div>
    </header>
  );
}
