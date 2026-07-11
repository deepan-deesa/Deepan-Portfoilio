import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Linkedin, Github, Instagram, Send, Copy, Check, Sparkles, AlertCircle } from "lucide-react";
import { PERSONAL_DETAILS } from "../types";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const isEmailJsConfigured = !!(
    import.meta.env.VITE_EMAILJS_SERVICE_ID &&
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID &&
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  );

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_DETAILS.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg("All transmission channels must be populated.");
      return;
    }

    setIsSubmitting(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      // Simulate cyber-secure transmission sequence for sandbox/demo mode
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setIsSuccess(false), 8000);
      }, 1500);
      return;
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: "Deepan",
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(
        () => {
          setIsSubmitting(false);
          setIsSuccess(true);
          setFormData({ name: "", email: "", message: "" });
          setTimeout(() => setIsSuccess(false), 5000);
        },
        (error) => {
          console.error("EmailJS Error:", error);
          setIsSubmitting(false);
          setErrorMsg(
            `Failed to route transmission: ${error?.text || "Unknown error occurred"}. Check console logs.`
          );
        }
      );
  };

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 bg-[#030303] overflow-hidden px-4"
    >
      {/* Background neon glows */}
      <div className="absolute top-[30%] left-[-10%] w-[350px] h-[350px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-purple-600/5 blur-[120px] pointer-events-none animate-pulse" />

      <div className="w-full max-w-5xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-400 mb-2">
            SECURE ROUTING
          </span>
          <h2 className="font-sans text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            CONTACT LOUNGE
          </h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-cyan-500 to-purple-600 mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Side: Contact Info & Quick connect */}
          <div className="lg:col-span-5 flex flex-col justify-between text-left">
            <div className="space-y-6">
              <h3 className="font-sans text-xl sm:text-2xl font-bold text-white tracking-tight">
                Let's construct something legendary together.
              </h3>
              <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed max-w-md">
                Whether you want to recruit me for full-stack developer roles, collaborate on responsive projects, or just talk tech architecture—my communications link is active.
              </p>

              {/* Direct Quick Email Copy Glass Capsule */}
              <div className="bg-[#0c0c0f]/80 border border-white/[0.04] p-4 rounded-2xl flex items-center justify-between gap-4 max-w-md hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="text-left">
                    <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-widest">
                      DIRECT ENVELOPE
                    </span>
                    <span className="block text-xs sm:text-sm text-slate-200 font-mono font-medium truncate">
                      {PERSONAL_DETAILS.email}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.06] flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer active:scale-95"
                  title="Copy Email to Clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Quick Link Social Circles */}
            <div className="mt-12 lg:mt-0 space-y-4">
              <span className="block font-mono text-[9px] text-slate-500 uppercase tracking-wider text-left">
                SYSTEM LINKAGES
              </span>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: "LinkedIn", url: PERSONAL_DETAILS.linkedin, icon: Linkedin, color: "hover:bg-blue-600/10 hover:text-blue-400 hover:border-blue-500/20" },
                  { name: "GitHub", url: PERSONAL_DETAILS.github, icon: Github, color: "hover:bg-slate-800/20 hover:text-white hover:border-white/20" },
                  { name: "Instagram", url: PERSONAL_DETAILS.instagram, icon: Instagram, color: "hover:bg-pink-600/10 hover:text-pink-400 hover:border-pink-500/20" }
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#08080a]/60 border border-white/[0.04] text-xs font-mono text-slate-400 transition-all ${social.color}`}
                  >
                    <social.icon className="w-4 h-4" />
                    <span>{social.name}</span>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Right Side: Contact Form Area */}
          <div className="lg:col-span-7">
            <div className="rounded-[24px] bg-[#08080a]/60 border border-white/[0.04] p-6 sm:p-8 backdrop-blur-xl relative">
              
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    {/* Connection status */}
                    <div className="flex items-center justify-between px-4 py-2 bg-[#0c0c0f]/80 border border-white/[0.04] rounded-xl text-[10px] font-mono text-slate-400">
                      <span className="tracking-wider">ROUTING PROTOCOL:</span>
                      {isEmailJsConfigured ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1.5 uppercase">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          EmailJS Active (Inbox Linked)
                        </span>
                      ) : (
                        <span className="text-amber-400 font-bold flex items-center gap-1.5 uppercase">
                          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                          Demo Mode (Sandbox Active)
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
                      {/* Name input */}
                      <div className="space-y-2">
                        <label className="block font-mono text-[9px] uppercase tracking-wider text-slate-400">
                          Ident_Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your Name"
                          className="w-full bg-[#0d0d10]/60 border border-white/[0.04] rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all"
                        />
                      </div>
                      
                      {/* Email input */}
                      <div className="space-y-2">
                        <label className="block font-mono text-[9px] uppercase tracking-wider text-slate-400">
                          Secure_Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          className="w-full bg-[#0d0d10]/60 border border-white/[0.04] rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all"
                        />
                      </div>
                    </div>

                    {/* Message textarea */}
                    <div className="space-y-2 text-left">
                      <label className="block font-mono text-[9px] uppercase tracking-wider text-slate-400">
                        Payload_Message
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Write your transmission payload here..."
                        className="w-full bg-[#0d0d10]/60 border border-white/[0.04] rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all resize-none"
                      />
                    </div>

                    {/* Error display */}
                    {errorMsg && (
                      <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-mono text-left">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2.5 transition-all shadow-lg hover:shadow-purple-500/10 cursor-pointer disabled:opacity-50 active:scale-[0.98]"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>ENCRYPTING PROTOCOLS...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>TRANSMIT PAYLOAD</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-screen"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 mb-2">
                      <Sparkles className="w-8 h-8 animate-bounce" />
                    </div>
                    <h3 className="font-mono text-sm text-green-400 font-bold uppercase tracking-[0.2em]">
                      {isEmailJsConfigured ? "MESSAGE TRANSMITTED" : "TRANSMISSION SIMULATED"}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-light max-w-sm leading-relaxed">
                      {isEmailJsConfigured
                        ? "Secure communication established! Your payload has been successfully dispatched and routed directly to my Gmail inbox via EmailJS."
                        : "Sandbox transmission simulation complete! To receive real emails in your inbox, configure VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your environment/Secrets panel."}
                    </p>
                    <div className="p-3 bg-[#101014] border border-white/[0.04] rounded-xl font-mono text-[9px] text-slate-500 uppercase tracking-widest">
                      {isEmailJsConfigured ? "TRANS_ID: EMAILJS_ROUTE_OK" : "TRANS_ID: SANDBOX_SIM_OK"}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
