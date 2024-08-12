"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const AnimatedBackground: React.FC = () => {
  const gradientSize = useRef<number>(500);
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const mouseX = useSpring(0, { damping: 30, stiffness: 100 });
  const mouseY = useSpring(0, { damping: 30, stiffness: 100 });

  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({ width: 1000, height: 1000 });

  const combinedValue = useMotionValue(0);

  const hue = useTransform(
    combinedValue,
    [0, windowSize.width + windowSize.height],
    [0, 360]
  );

  const background = useMotionTemplate`
    radial-gradient(
      ${gradientSize.current}px circle at ${mouseX}px ${mouseY}px,
      hsl(${hue}, 100%, 50%),
      black
    )
  `;

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    const updateGradientSize = () => {
      gradientSize.current = Math.max(window.innerWidth, window.innerHeight);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = { x: event.clientX, y: event.clientY };
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      combinedValue.set(event.clientX + event.clientY);
    };

    // Initial setup
    updateWindowSize();
    updateGradientSize();

    // Event listeners
    window.addEventListener("resize", updateWindowSize);
    window.addEventListener("resize", updateGradientSize);
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateWindowSize);
      window.removeEventListener("resize", updateGradientSize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY, combinedValue]);

  return <motion.div className="absolute inset-0 z-0" style={{ background }} />;
};

export default function Home() {
  return (
    <motion.main className="h-screen w-screen flex flex-col items-center justify-between relative py-8">
      <AnimatedBackground />
      <div className="flex items-center justify-center relative z-10 transition-all duration-300 ease-in-out">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-white transition-all duration-300 ease-in-out drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </div>
      <h1 className="text-4xl font-bold text-white relative z-10 text-shadow-lg drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
        Hello!
      </h1>
      <div className="flex items-center justify-center relative z-10 transition-all duration-300 ease-in-out">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-white transition-all duration-300 ease-in-out drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </div>
      <style jsx>{`
        @keyframes pulse-color {
          0%,
          100% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.9;
          }
        }
        .animate-pulse-color {
          animation: pulse-color 4s ease-in-out infinite;
        }
      `}</style>
    </motion.main>
  );
}
