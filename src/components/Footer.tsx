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
    <footer id="main-footer" className="relative bg-[#030303] border-t border-white/[0.03] py-8 px-4">
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between text-center">
        
        {/* Simple Credit */}
        <div className="font-mono text-sm font-semibold tracking-wider text-slate-300">
          Created by <span className="text-cyan-400 font-bold">Deepan</span>
        </div>

        {/* Back to Top */}
        <div>
          <button
            onClick={scrollToTop}
            className={`p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-all cursor-pointer ${
              showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
            }`}
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
