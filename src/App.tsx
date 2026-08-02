import React, { useState, useEffect, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import ShowcaseConsole from "./components/ShowcaseConsole";
import Contact from "./components/Contact";
import Resume from "./components/Resume";
import Footer from "./components/Footer";

import MagicBento from "./components/MagicBento";

import Particles from "./components/Particles";

const InteractiveCursor = lazy(() => import("./components/InteractiveCursor"));

export default function App() {
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
    document.body.style.overflow = "unset";
  }, []);

  return (
    <div className="bg-[#030303] text-white min-h-screen relative selection:bg-cyan-500/20 selection:text-cyan-200 overflow-x-hidden transition-colors duration-500">
      {/* Global Interactive Particles Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
        {/* @ts-ignore */}
        <Particles
          particleColors={["#ffffff", "#06b6d4", "#3b82f6"]}
          particleCount={120}
          particleSpread={10}
          speed={0.08}
          particleBaseSize={80}
          moveParticlesOnHover={true}
          particleHoverFactor={1}
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={typeof window !== 'undefined' && window.devicePixelRatio > 1 ? 1 : 0.75}
        />
      </div>

      {/* Laser cursor */}
      <Suspense fallback={null}>
        <InteractiveCursor />
      </Suspense>

      {/* Main layout */}
      <div className="relative z-10">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main>
          <Hero lanyardEntrance={true} />
          <About />
          <section className="py-20 px-4 flex flex-col items-center justify-center bg-[#030303]">
            <div className="max-w-6xl w-full mx-auto flex flex-col items-center">
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-2 text-center">
                Interactive Grid
              </h2>
              <p className="text-slate-400 mb-10 text-center max-w-md">
                Hover, tilt and interact with our feature modules.
              </p>
              {/* @ts-ignore */}
              <MagicBento
                textAutoHide={true}
                enableStars={true}
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt={true}
                enableMagnetism={true}
                clickEffect={true}
                spotlightRadius={300}
                particleCount={12}
                glowColor="132, 0, 255"
              />
            </div>
          </section>
          <ShowcaseConsole />
          <Resume />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
