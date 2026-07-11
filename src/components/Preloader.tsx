import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, Sparkles } from "lucide-react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);

  const bootLogs = [
    "INIT // SYSTEM CORES SECURED...",
    "ESTABLISHING SECURE PROTOCOLS ON PORT 3000...",
    "LOADING INTERACTIVE CANVAS GRAPHICS...",
    "FETCHING PROFILE DETAILED SCHEMA [DEEPAN]...",
    "PARSING SKILLS: PYTHON [90%] • REACT [88%] • POSTGRESQL [80%]...",
    "BUILDING 3D HOLOGRAPHIC INTERACTIVE BADGE...",
    "VIRTUAL RENDER ENGINE INITIALIZED [60 FPS]...",
    "WELCOME TO DEEPAN'S DIGITAL PORTFOLIO"
  ];

  useEffect(() => {
    // Progress counter
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 800);
          }, 300);
          return 100;
        }
        // Accelerate near the end
        const step = prev < 30 ? 2 : prev < 70 ? 4 : prev < 90 ? 8 : 12;
        return Math.min(prev + step, 100);
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    // Staggered log output based on progress
    const activeLogCount = Math.floor((progress / 100) * bootLogs.length);
    const visibleLogs = bootLogs.slice(0, Math.max(1, activeLogCount));
    setLogs(visibleLogs);
  }, [progress]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          id="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40, filter: "blur(20px)" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030303] text-white select-none px-4"
        >
          {/* Futuristic ambient glows */}
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-blue-600/10 blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-purple-600/10 blur-[120px] animate-pulse" />

          {/* Interactive loading core */}
          <div className="relative flex flex-col items-center max-w-md w-full">
            {/* Hologram loading circle */}
            <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="absolute inset-0 rounded-full border-t border-r border-cyan-500/30"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="absolute inset-2 rounded-full border-b border-l border-purple-500/40"
              />
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute inset-6 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center backdrop-blur-md"
              >
                <Terminal className="w-6 h-6 text-cyan-400" />
              </motion.div>
              
              {/* Spinning locator dots */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              </div>
            </div>

            {/* Title & Stats */}
            <motion.h2 
              initial={{ letterSpacing: "0.2em", opacity: 0 }}
              animate={{ letterSpacing: "0.4em", opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="font-mono text-xs uppercase text-slate-400 mb-1 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" /> Deepan Portfolio
            </motion.h2>
            <div className="font-mono text-3xl font-extrabold tracking-tight text-white mb-6">
              {progress}<span className="text-cyan-400 text-xl">%</span>
            </div>

            {/* Glowing progress bar */}
            <div className="w-full h-[3px] bg-white/[0.04] rounded-full overflow-hidden mb-6 relative">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-purple-600 rounded-full"
                style={{ width: `${progress}%` }}
              />
              {/* Highlight bar glow */}
              <div 
                className="absolute top-0 h-full bg-cyan-300 blur-[2px] transition-all duration-100" 
                style={{ width: `${progress}%` }} 
              />
            </div>

            {/* System Diagnostic Logs Console */}
            <div className="w-full bg-[#080808]/80 border border-white/[0.03] rounded-xl p-4 font-mono text-[10px] text-slate-400 h-36 overflow-hidden flex flex-col justify-end backdrop-blur-xl shadow-2xl">
              <div className="absolute top-2 right-3 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
                <span className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
              </div>
              <div className="space-y-1 text-left w-full">
                {logs.map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className={`${index === logs.length - 1 ? "text-cyan-400 font-semibold" : ""}`}
                  >
                    <span className="text-purple-400">➜</span> {log}
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="mt-4 font-mono text-[9px] text-slate-500 tracking-wider uppercase">
              CORES: TSX-REACT-VITE // SECURE ENCLAVE 
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
