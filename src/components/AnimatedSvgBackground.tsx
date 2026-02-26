import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AnimatedSvgBackground({ className = "" }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const paths = svg.querySelectorAll(".morph-path");
    paths.forEach((path, i) => {
      gsap.to(path, {
        attr: {
          d: i === 0
            ? "M100,400 C250,200 450,600 650,350 C850,100 1050,500 1200,350 C1350,200 1440,400 1440,400"
            : "M0,600 C200,500 400,700 600,550 C800,400 1000,650 1200,500 C1400,350 1440,600 1440,600",
        },
        duration: 6 + i * 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });
  }, []);

  return (
    <svg
      ref={svgRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <path
        className="morph-path"
        d="M0,350 C200,150 400,550 600,350 C800,150 1000,450 1200,300 C1400,150 1440,350 1440,350"
        stroke="hsl(var(--primary) / 0.08)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        className="morph-path"
        d="M0,550 C200,450 400,650 600,500 C800,350 1000,600 1200,450 C1400,300 1440,550 1440,550"
        stroke="hsl(var(--primary) / 0.06)"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M0,200 C300,100 600,300 900,200 C1200,100 1440,250 1440,200"
        stroke="hsl(var(--primary) / 0.04)"
        strokeWidth="1"
        fill="none"
      />
      {/* Organic blob shapes */}
      <circle cx="200" cy="200" r="120" fill="hsl(var(--primary) / 0.02)" />
      <circle cx="1200" cy="600" r="180" fill="hsl(var(--primary) / 0.02)" />
      <ellipse cx="700" cy="400" rx="250" ry="150" fill="hsl(var(--primary) / 0.015)" />
    </svg>
  );
}
