"use client";

import {
  motion,
  useMotionTemplate,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

export default function Home() {
  const gradientSize = useRef<number>(1000);
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const mouseX = useSpring(0, { damping: 60, stiffness: 70 });
  const mouseY = useSpring(0, { damping: 60, stiffness: 70 });

  const hue1 = useTransform(mouseX, [0, window.innerWidth], [120, 180]); // Green hues
  const hue2 = useTransform(mouseY, [0, window.innerHeight], [240, 300]); // Purple hues
  const hue3 = useTransform(mouseX, [0, window.innerWidth], [150, 270]); // Green to purple transition

  const color1 = useTransform(hue1, (h) => `hsl(${h}, 70%, 30%)`);
  const color2 = useTransform(hue2, (h) => `hsla(${h}, 70%, 30%, 0.7)`);
  const color3 = useTransform(hue3, (h) => `hsla(${h}, 70%, 30%, 0.7)`);

  const gradientRadius = useSpring(0, { damping: 40, stiffness: 50 });

  const backgroundTemplate = useMotionTemplate`radial-gradient(circle ${gradientRadius}px at ${mouseX}px ${mouseY}px, ${color1}, ${color2}, ${color3})`;

  useEffect(() => {
    const updateGradientSize = () => {
      gradientSize.current = Math.max(window.innerWidth, window.innerHeight);
      gradientRadius.set(gradientSize.current);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = { x: event.clientX, y: event.clientY };
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    updateGradientSize();

    window.addEventListener("resize", updateGradientSize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", updateGradientSize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY, gradientRadius]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 relative overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          background: backgroundTemplate,
          backgroundSize: `${gradientSize.current}px ${gradientSize.current}px`,
          backgroundPosition: "center",
        }}
      />
      <h1 className="text-4xl font-bold mb-8 text-white relative z-10 text-shadow-lg transition-all duration-300 ease-in-out drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
        Hello
      </h1>
      <div className="flex items-center justify-center mb-4 relative z-10 transition-all duration-300 ease-in-out">
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
        // .animate-pulse-color {
        //   animation: pulse-color 4s ease-in-out infinite;
        // }
      `}</style>
    </main>
  );
}
