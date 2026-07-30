import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { GraduationCap, Award, Calendar, BookOpen, Target, Cpu } from "lucide-react";
import { PERSONAL_DETAILS } from "../types";

// Self-contained high-efficiency animated counters
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const duration = 1500; // 1.5s
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quad formula
      const easeProgress = progress * (2 - progress);
      const currentCount = Math.floor(easeProgress * target);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
      {count}{suffix}
    </span>
  );
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 sm:py-32 bg-[#030303] overflow-hidden px-4"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-cyan-600/10 blur-[60px] transform-gpu pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-purple-600/10 blur-[60px] transform-gpu pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-400 mb-2">
            BIOGRAPHY
          </span>
          <h2 className="font-sans text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            ABOUT DEEPAN
          </h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-cyan-500 to-purple-600 mt-4 rounded-full" />
        </div>

        {/* Bento-style Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Biography Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-8 rounded-[24px] bg-[#08080a]/60 border border-white/[0.04] p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-4 text-cyan-400 font-mono text-xs uppercase tracking-wider">
                <BookOpen className="w-4 h-4" /> Professional Journey
              </div>
              <h3 className="font-sans text-xl font-bold text-white mb-4">
                Aspiring Full Stack Engineer & Computer Science Scholar
              </h3>
              <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed mb-6">
                {PERSONAL_DETAILS.description}
              </p>
            </div>

            {/* Career Objective in micro glass capsule */}
            <div className="bg-[#0e0e12]/80 border border-white/[0.04] rounded-2xl p-4 sm:p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                <Target className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <span className="block font-mono text-[10px] uppercase text-purple-400 tracking-wider mb-1">
                  CAREER OBJECTIVE
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  {PERSONAL_DETAILS.careerObjective}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Key Metrics Bento Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-4"
          >
            {[
              { label: "TECH SKILLS", target: 15, suffix: "+", icon: Cpu, color: "text-cyan-400 bg-cyan-400/5 border-cyan-400/10" },
              { label: "CORE PROJECTS", target: 2, suffix: "", icon: Award, color: "text-purple-400 bg-purple-400/5 border-purple-400/10" },
              { label: "INTERNSHIPS", target: 3, suffix: "", icon: Calendar, color: "text-blue-400 bg-blue-400/5 border-blue-400/10" },
              { label: "CERTIFICATES", target: 4, suffix: "", icon: GraduationCap, color: "text-pink-400 bg-pink-400/5 border-pink-400/10" }
            ].map((stat, i) => (
              <div 
                key={i}
                className="rounded-[24px] bg-[#08080a]/60 border border-white/[0.04] p-5 backdrop-blur-xl flex flex-col justify-between items-start group hover:border-white/10 transition-colors"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${stat.color}`}>
                  <stat.icon className="w-4.5 h-4.5" />
                </div>
                <div className="mt-4">
                  <span className="block font-mono text-[9px] text-slate-500 uppercase tracking-widest mb-1">
                    {stat.label}
                  </span>
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Academic timeline showing SNS College of Engineering */}
        <div className="mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[24px] bg-[#08080a]/60 border border-white/[0.04] p-6 sm:p-8 backdrop-blur-xl"
          >
            <div className="flex items-center gap-2 mb-6 text-purple-400 font-mono text-xs uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" /> Academic Timeline
            </div>

             <div className="relative border-l border-white/[0.05] pl-6 ml-3 space-y-8">
              
              {/* Timeline item 1 */}
              <div className="relative">
                {/* Timeline node */}
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-cyan-400 border-4 border-[#030303] shadow-md shadow-cyan-400/50" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h4 className="font-sans text-base sm:text-lg font-bold text-white">
                    {PERSONAL_DETAILS.college}
                  </h4>
                </div>
                
                <div className="text-sm text-slate-300 font-medium mb-1">
                  {PERSONAL_DETAILS.degree} — {PERSONAL_DETAILS.department}
                </div>
                <div className="text-xs font-mono text-slate-500 mb-2">
                  Current Status: {PERSONAL_DETAILS.year} • {PERSONAL_DETAILS.semester} • CGPA: {PERSONAL_DETAILS.cgpa}
                </div>
                <p className="text-xs text-slate-400 font-light leading-relaxed max-w-3xl">
                  Focusing on advanced database systems, core algorithmic structures in Python, object-oriented concepts in Java, and professional web engineering using Django, Flask, and React. Maintain an excellent academic record with a current CGPA of 8.0.
                </p>
              </div>

              {/* Timeline item 2 */}
              <div className="relative">
                {/* Timeline node */}
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-purple-500 border-4 border-[#030303] shadow-md shadow-purple-500/20" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h4 className="font-sans text-base sm:text-lg font-bold text-white">
                    Chinmaya Vidyalaya
                  </h4>
                </div>
                
                <div className="text-sm text-slate-300 font-medium mb-1">
                  Higher Secondary Education (Class XII)
                </div>
                <p className="text-xs text-slate-400 font-light leading-relaxed max-w-3xl">
                  Completed senior secondary schooling with a focus on Computer Science, Mathematics, and Physics, establishing a strong mathematical foundation for engineering studies.
                </p>
              </div>

              {/* Timeline item 3 */}
              <div className="relative">
                {/* Timeline node */}
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-blue-500 border-4 border-[#030303] shadow-md shadow-blue-500/20" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h4 className="font-sans text-base sm:text-lg font-bold text-white">
                    Chinmaya Vidyalaya
                  </h4>
                </div>
                
                <div className="text-sm text-slate-300 font-medium mb-1">
                  Secondary School Education (Class X)
                </div>
                <p className="text-xs text-slate-400 font-light leading-relaxed max-w-3xl">
                  Laid the analytical and science-oriented groundwork during high school with robust academic performances.
                </p>
              </div>

            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
