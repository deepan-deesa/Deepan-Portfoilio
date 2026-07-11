import React, { useEffect, useState } from "react";
import { ArrowUp, Terminal, Code2 } from "lucide-react";
import { PERSONAL_DETAILS } from "../types";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer id="main-footer" className="relative bg-[#030303] border-t border-white/[0.03] py-16 px-4">
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        
        {/* Brand & Scholar Credit */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white">
            <Terminal className="w-4.5 h-4.5 text-white" />
          </div>
          <div className="text-left">
            <span className="block font-sans font-black text-sm tracking-wide text-white">
              {PERSONAL_DETAILS.name}
            </span>
            <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-0.5">
              SNS COLLEGE OF ENGINEERING scholar
            </span>
          </div>
        </div>

        {/* Navigation / Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs font-mono text-slate-400">
          <span>&copy; {new Date().getFullYear()} ALL RIGHTS SECURED</span>
          <span>•</span>
          <span>B.E. COMPUTER SCIENCE & ENGINEERING</span>
        </div>

        {/* Back to Top */}
        <div className="relative">
          <button
            onClick={scrollToTop}
            className={`p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-all cursor-pointer ${
              showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
            }`}
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4 animate-bounce" />
          </button>
        </div>

      </div>
    </footer>
  );
}
