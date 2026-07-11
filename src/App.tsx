import React, { useState, useEffect } from "react";
import Preloader from "./components/Preloader";
import InteractiveCursor from "./components/InteractiveCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import ShowcaseConsole from "./components/ShowcaseConsole";
import Contact from "./components/Contact";
import Resume from "./components/Resume";
import Footer from "./components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    return (localStorage.getItem("theme") as "light" | "dark") || "dark";
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "light") {
      document.documentElement.classList.add("light-theme");
    } else {
      document.documentElement.classList.remove("light-theme");
    }
  }, [theme]);

  useEffect(() => {
    // Lock scroll when loading, unlock when loading completes
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [loading]);

  return (
    <div className="bg-[#030303] text-white min-h-screen relative selection:bg-cyan-500/20 selection:text-cyan-200 overflow-x-hidden transition-colors duration-500">
      {/* 1. Futuristic Digital Preloader overlay */}
      <Preloader onComplete={() => setLoading(false)} />

      {/* 2. Custom trailing laser pointer */}
      {!loading && <InteractiveCursor />}

      {/* 3. Main cinematic layout container */}
      <div 
        className={`transition-all duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          loading ? "opacity-0 scale-[0.98] blur-xl pointer-events-none" : "opacity-100 scale-100 blur-0"
        }`}
      >
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main>
          <Hero />
          <About />
          <ShowcaseConsole />
          <Resume />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
