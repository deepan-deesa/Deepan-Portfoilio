import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
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
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex justify-center items-center pointer-events-auto">
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
      </header>

      {toggleTheme && (
        <button
          onClick={toggleTheme}
          className="fixed top-5 right-5 z-50 p-3 rounded-full bg-[#08080a]/90 backdrop-blur-md border border-cyan-500/20 text-cyan-400 hover:text-white hover:border-cyan-400 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.2)] cursor-pointer"
          title="Toggle theme"
        >
          {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>
      )}
    </>
  );
}
