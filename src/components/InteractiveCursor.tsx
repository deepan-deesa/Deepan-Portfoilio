import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function InteractiveCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const isHoveredRef = useRef(false);

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

    // Event delegation with ref check to avoid redundant state updates
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const shouldHover = Boolean(
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']") ||
        target.closest(".interactive-hover")
      );
      if (shouldHover !== isHoveredRef.current) {
        isHoveredRef.current = shouldHover;
        setIsHovered(shouldHover);
      }
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

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
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white z-50 pointer-events-none mix-blend-difference transform-gpu"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
      />

      {/* Futuristic interactive trailing outer glow circle */}
      <motion.div
        id="laser-cursor-trail"
        className="fixed top-0 left-0 rounded-full border border-cyan-500/30 bg-cyan-400/[0.02] z-50 pointer-events-none transform-gpu"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovered ? 64 : 32,
          height: isHovered ? 64 : 32,
          willChange: "transform",
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

      {/* Ultra-lightweight GPU Radial Ambient Spot Light (no expensive blur filter on mousemove) */}
      <motion.div
        id="mouse-ambient-spotlight"
        className="fixed top-0 left-0 w-[450px] h-[450px] rounded-full pointer-events-none z-0 transform-gpu"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, rgba(147,51,234,0.03) 45%, transparent 70%)",
          willChange: "transform",
        }}
      />
    </>
  );
}
