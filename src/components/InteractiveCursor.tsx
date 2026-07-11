import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function InteractiveCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Smooth spring physics for a luxurious lag-trailing effect
  const springConfig = { damping: 30, stiffness: 220, mass: 0.6 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if it's a touch device
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    // Event delegation to check if mouse is hovering over interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']") ||
        target.closest(".interactive-hover")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Laser point cursor */}
      <motion.div
        id="laser-cursor-pointer"
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white z-50 pointer-events-none mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Futuristic interactive trailing outer glow circle */}
      <motion.div
        id="laser-cursor-trail"
        className="fixed top-0 left-0 rounded-full border border-cyan-500/30 bg-cyan-400/[0.02] z-50 pointer-events-none"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovered ? 64 : 32,
          height: isHovered ? 64 : 32,
        }}
        animate={{
          scale: isClicked ? 0.8 : 1,
          borderColor: isHovered ? "rgba(168, 85, 247, 0.6)" : "rgba(6, 182, 212, 0.4)", // morph to purple on hover
          boxShadow: isHovered 
            ? "0 0 16px rgba(168, 85, 247, 0.2), inset 0 0 8px rgba(168, 85, 247, 0.1)"
            : "0 0 8px rgba(6, 182, 212, 0.1)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />

      {/* Large Ambient Mouse Spot Light (behind content) */}
      <motion.div
        id="mouse-ambient-spotlight"
        className="fixed top-0 left-0 w-[450px] h-[450px] rounded-full bg-gradient-to-r from-blue-600/5 to-purple-600/5 blur-[120px] pointer-events-none z-0"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}
