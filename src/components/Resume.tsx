import React, { useRef } from "react";
import { motion } from "motion/react";
import { 
  FileText, 
  Download, 
  Printer, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  GraduationCap, 
  Award, 
  Sparkles,
  ExternalLink
} from "lucide-react";
import { PERSONAL_DETAILS, SKILLS_DATA, CERTIFICATIONS_DATA, PROJECTS_DATA } from "../types";

export default function Resume() {
  const printRef = useRef<HTMLDivElement>(null);

  // Functions for PDF handling
  const viewResume = () => {
    window.open('/Resume.pdf', '_blank');
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Resume.pdf';
    link.download = 'Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const printResume = () => {
    const newWindow = window.open('/Resume.pdf', '_blank');
    if (newWindow) {
      newWindow.onload = () => {
        newWindow.print();
      };
    }
  };

  return (
    <section 
      id="resume" 
      className="relative py-24 sm:py-32 bg-[#050505] overflow-hidden px-4 border-t border-white/[0.02]"
    >
      {/* Background ambient elements */}
      <div className="absolute top-[30%] left-[-10%] w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[150px] pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-400 mb-2">
            DOCUMENTS
          </span>
          <h2 className="font-sans text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            DIGITAL DOSSIER
          </h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-cyan-500 to-purple-600 mt-4 rounded-full" />
          <p className="text-slate-400 font-sans font-light text-sm max-w-lg mt-4">
            Inspect my official curriculum vitae below. Download a copy or print the vector sheet for your records.
          </p>
        </div>

        {/* Dashboard Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-[#0c0c0f]/90 border border-white/[0.04] p-4 rounded-2xl backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono text-xs text-slate-400 tracking-wider">RESUME_DEEPAN_M_CV.PDF</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={viewResume}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-white text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 font-semibold text-xs uppercase tracking-widest cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              View Resume
            </button>
            <button
              onClick={downloadResume}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 font-semibold text-xs uppercase tracking-widest cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </button>
            <button
              onClick={printResume}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#121216] text-white border border-white/[0.08] hover:bg-white/[0.04] transition-all duration-300 font-semibold text-xs uppercase tracking-widest cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-400" />
              Print CV
            </button>
          </div>
        </div>

        {/* High-Fidelity Printable Resume Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          id="printable-resume-sheet"
          ref={printRef}
          className="w-full bg-[#0a0a0c] border border-white/[0.05] rounded-[24px] shadow-[0_40px_100px_rgba(0,0,0,0.9)] p-8 sm:p-12 text-slate-300 relative overflow-hidden"
        >
          {/* Decorative design corner highlights */}
          <div className="absolute top-0 left-0 w-32 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-transparent" />
          <div className="absolute bottom-0 right-0 w-32 h-1 bg-gradient-to-l from-purple-500 via-pink-500 to-transparent" />

          {/* Resume Header Area */}
          <div className="border-b border-white/[0.05] pb-8 mb-8 flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <h1 className="font-sans text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
                  {PERSONAL_DETAILS.name}
                </h1>
                <span className="font-mono text-[9px] text-cyan-400 border border-cyan-400/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {PERSONAL_DETAILS.tagline}
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-400 font-mono tracking-wider uppercase">
                {PERSONAL_DETAILS.role} • 3rd Year CSE Undergraduate
              </p>
              <p className="text-xs text-slate-500 font-sans font-light mt-2 max-w-xl leading-relaxed">
                Detail-oriented developer building modern, highly responsive frontend pipelines paired with structured Django, Flask & relational PostgreSQL backends.
              </p>
            </div>

            {/* Quick Contact Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2.5 text-xs font-mono text-slate-400 bg-white/[0.01] border border-white/[0.04] p-4 rounded-xl shrink-0">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <a href={`mailto:${PERSONAL_DETAILS.email}`} className="hover:text-white transition-colors">{PERSONAL_DETAILS.email}</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <a href={`tel:${PERSONAL_DETAILS.phone}`} className="hover:text-white transition-colors">{PERSONAL_DETAILS.phone}</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{PERSONAL_DETAILS.location}</span>
              </div>
              <div className="flex items-center gap-3.5 pt-1.5 border-t border-white/[0.05] mt-1">
                <a href={PERSONAL_DETAILS.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white text-slate-400 transition-colors">
                  <Github className="w-3.5 h-3.5" /> github
                </a>
                <a href={PERSONAL_DETAILS.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white text-slate-400 transition-colors">
                  <Linkedin className="w-3.5 h-3.5" /> linkedin
                </a>
              </div>
            </div>
          </div>

          {/* Resume Sections Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Main Column: Objective, Experience, Projects */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Career Objective */}
              <div>
                <div className="flex items-center gap-2 mb-3 text-white border-b border-white/[0.05] pb-1">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <h3 className="font-sans text-sm font-bold tracking-wider uppercase">Career Objective</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light font-sans">
                  {PERSONAL_DETAILS.careerObjective}
                </p>
              </div>

              {/* Core Projects */}
              <div>
                <div className="flex items-center gap-2 mb-4 text-white border-b border-white/[0.05] pb-1">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <h3 className="font-sans text-sm font-bold tracking-wider uppercase">Featured Projects</h3>
                </div>

                <div className="space-y-6">
                  {PROJECTS_DATA.map((proj) => (
                    <div key={proj.id} className="relative">
                      <div className="flex items-center justify-between mb-1.5">
                        <h4 className="font-sans font-bold text-sm text-white flex items-center gap-1.5">
                          {proj.title}
                          <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-white transition-colors">
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {proj.tech.slice(0, 4).map((techName, index) => (
                            <span key={index} className="bg-white/[0.03] border border-white/[0.05] px-1.5 py-0.5 rounded text-[8px] font-mono text-slate-400">
                              {techName}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-light font-sans">
                        {proj.detailedDescription}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Sidebar: Education, Skills, Certifications */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Education */}
              <div>
                <div className="flex items-center gap-2 mb-4 text-white border-b border-white/[0.05] pb-1">
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                  <h3 className="font-sans text-sm font-bold tracking-wider uppercase">Education</h3>
                </div>

                <div className="space-y-4">
                  {/* College */}
                  <div>
                    <h4 className="text-xs font-bold text-white font-sans">{PERSONAL_DETAILS.college}</h4>
                    <p className="text-[11px] text-slate-300 font-medium mt-0.5">{PERSONAL_DETAILS.degree}</p>
                    <p className="text-[11px] text-slate-400 font-light font-mono">{PERSONAL_DETAILS.department}</p>
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                      3rd Year / Sem 5 • CGPA: {PERSONAL_DETAILS.cgpa}
                    </p>
                  </div>

                  {/* Class XII */}
                  <div>
                    <h4 className="text-xs font-bold text-white font-sans">Chinmaya Vidyalaya</h4>
                    <p className="text-[11px] text-slate-400 font-light mt-0.5">Higher Secondary Education (Class XII)</p>
                  </div>

                  {/* Class X */}
                  <div>
                    <h4 className="text-xs font-bold text-white font-sans">Chinmaya Vidyalaya</h4>
                    <p className="text-[11px] text-slate-400 font-light mt-0.5">Secondary School Education (Class X)</p>
                  </div>
                </div>
              </div>

              {/* Technical Skills Summarized */}
              <div>
                <div className="flex items-center gap-2 mb-4 text-white border-b border-white/[0.05] pb-1">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <h3 className="font-sans text-sm font-bold tracking-wider uppercase">Core Skills</h3>
                </div>

                <div className="space-y-4 font-mono text-xs text-slate-400">
                  {/* Group Languages */}
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest block mb-1">Languages</span>
                    <div className="flex flex-wrap gap-1.5">
                      {SKILLS_DATA.filter(s => s.category === "Languages").map((s, idx) => (
                        <span key={idx} className="bg-white/[0.02] border border-white/[0.04] px-2 py-0.5 rounded text-[10px] text-slate-300">{s.name}</span>
                      ))}
                    </div>
                  </div>

                  {/* Group Web Frameworks */}
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest block mb-1">Web & Backend</span>
                    <div className="flex flex-wrap gap-1.5">
                      {SKILLS_DATA.filter(s => s.category === "Frontend" || s.category === "Backend").map((s, idx) => (
                        <span key={idx} className="bg-white/[0.02] border border-white/[0.04] px-2 py-0.5 rounded text-[10px] text-slate-300">{s.name}</span>
                      ))}
                    </div>
                  </div>

                  {/* Group Tools */}
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest block mb-1">Tools & Core Concepts</span>
                    <div className="flex flex-wrap gap-1.5">
                      {SKILLS_DATA.filter(s => s.category === "Tools & Design" || s.category === "Core Concepts").map((s, idx) => (
                        <span key={idx} className="bg-white/[0.02] border border-white/[0.04] px-2 py-0.5 rounded text-[10px] text-slate-300">{s.name}</span>
                      ))}
                    </div>
                  </div>

                  {/* Soft Skills */}
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest block mb-1">Personal Attributes</span>
                    <p className="text-[10px] leading-relaxed text-slate-400 font-sans font-light">
                      Teamwork, Analytical Problem Solving, Quick Learner, Adaptability, English (Fluent), Tamil (Native).
                    </p>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div>
                <div className="flex items-center gap-2 mb-4 text-white border-b border-white/[0.05] pb-1">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <h3 className="font-sans text-sm font-bold tracking-wider uppercase">Certifications</h3>
                </div>

                <div className="space-y-3 font-sans text-xs">
                  {CERTIFICATIONS_DATA.map((cert) => (
                    <div key={cert.id}>
                      <div className="font-semibold text-white leading-tight">{cert.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                        Issuer: {cert.issuer} • Year: {cert.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </motion.div>

        {/* Hidden Printable Sheet for Perfect 2-Page Vector PDF Printout matching user's PDF */}
        <div 
          id="real-pdf-print-sheet" 
          className="hidden bg-white text-black text-left font-sans"
          style={{ width: "210mm", minHeight: "297mm", padding: "20mm 15mm" }}
        >
          {/* Page 1 */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-black mb-1">DEEPAN M</h1>
              <p className="text-sm font-medium text-slate-800 tracking-wide mb-3">Built. Scale. Automate.</p>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-black" />
                  <span>deepanmuthu05@gmail.com</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-black" />
                  <span>+91 9965585084</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-black" />
                  <span>Coimbatore, Tamilnadu</span>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-700 font-medium mt-1">
                <div className="flex items-center gap-1">
                  <Linkedin className="w-3.5 h-3.5 text-black" />
                  <span>linkedin.com/in/deepan-muthukrishnan</span>
                </div>
                <div className="flex items-center gap-1">
                  <Github className="w-3.5 h-3.5 text-black" />
                  <span>github.com/deepanmuthu05-lang</span>
                </div>
              </div>
            </div>

            {/* Career Objective */}
            <div className="mt-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-black">Career Objective</h2>
              <div className="h-[1.5px] bg-black w-full mt-1 mb-2" />
              <p className="text-[11px] leading-relaxed text-slate-800 font-sans">
                Motivated and detail-oriented third-year Computer Science and Engineering student with hands-on
                experience in Python, full-stack development, Skilled in building functional web applications and
                collaborating within agile teams during internships. Seeking a Software Developer Intern / Entry-Level
                Developer role to apply strong problem-solving skills, programming knowledge, and a passion for continuous
                learning to deliver quality software solutions.
              </p>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-black">Education</h2>
              <div className="h-[1.5px] bg-black w-full mt-1 mb-3" />
              
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-black">
                      Bachelor of Engineering (B.E.) – Computer Science and Engineering, <span className="italic font-normal">SNS College of Engineering</span>
                    </span>
                    <span className="text-slate-700 text-[11px] font-medium uppercase">coimbatore</span>
                  </div>
                  <div className="text-[10px] text-slate-800 font-medium mt-0.5">Currently in 3rd Year CGPA: 8.0</div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-black">
                      Higher Secondary Education (Class XII), <span className="italic font-normal">Chinmaya Vidyalaya</span>
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-black">
                      Secondary School Education (Class X), <span className="italic font-normal">Chinmaya Vidyalaya</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Page Break */}
          <div style={{ pageBreakBefore: "always", height: "1px" }} className="my-8" />

          {/* Page 2 */}
          <div className="space-y-6">
            {/* Technical Skills */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-black">Technical Skills</h2>
              <div className="h-[1.5px] bg-black w-full mt-1 mb-3" />
              
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-[11px]">
                <div className="space-y-3">
                  <div>
                    <span className="font-bold text-black block">Programming Languages</span>
                    <span className="text-slate-800">Python , Java , C , React.js , Django , Flask</span>
                  </div>
                  <div>
                    <span className="font-bold text-black block">Tools & Design</span>
                    <span className="text-slate-800">Canva, Git & GitHub, VS Code</span>
                  </div>
                  <div>
                    <span className="font-bold text-black block">Soft Skills</span>
                    <span className="text-slate-800">Teamwork, Communication, Problem Solving, Quick Learner, Adaptability</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="font-bold text-black block">Web & Full Stack Development</span>
                    <span className="text-slate-800">HTML, CSS, JavaScript, Full Stack Development (Basic), Web Application Development</span>
                  </div>
                  <div>
                    <span className="font-bold text-black block">Core Concepts</span>
                    <span className="text-slate-800">Data Structures, Software Development Life Cycle (SDLC), Application Development, Debugging & Testing</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Projects */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-black">Projects</h2>
              <div className="h-[1.5px] bg-black w-full mt-1 mb-3" />
              
              <div>
                <div className="text-xs">
                  <span className="font-bold text-black">
                    DocLink – Online Doctor Consultation Application, <span className="italic font-normal">Academic Project</span>
                  </span>
                </div>
                <ul className="list-disc pl-4 mt-1.5 space-y-1 text-[11px] text-slate-800">
                  <li>Collaborated as a Technical Team Member to design and develop a full-stack web application enabling users to remotely consult doctors, improving accessibility to healthcare services.</li>
                  <li>Contributed to development, implementation, and testing of core application features as part of a cross functional team.</li>
                  <li>Applied full-stack development concepts, including front-end interface design and back-end functionality, to deliver a working software solution.</li>
                  <li>Practiced collaborative software development workflows, including teamwork, task ownership, and iterative feature improvement.</li>
                </ul>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-black">Certifications</h2>
              <div className="h-[1.5px] bg-black w-full mt-1 mb-3" />
              
              <div className="grid grid-cols-3 gap-x-4 text-[11px] text-slate-800 leading-relaxed">
                <div className="space-y-1">
                  <div className="font-bold text-black">• Microsoft Azure AI</div>
                  <div className="font-bold text-black">• IBM – Enterprise Design Thinking Co-Creator</div>
                </div>
                <div className="space-y-1">
                  <div className="font-bold text-black">• NASSCOM – Digital Edge 101</div>
                </div>
                <div className="space-y-1">
                  <div className="font-bold text-black">• IBM – Enterprise Design Thinking Practitioner</div>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-black">Languages</h2>
              <div className="h-[1.5px] bg-black w-full mt-1 mb-2" />
              <div className="text-[11px] text-slate-800 font-semibold">• English, Tamil</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
