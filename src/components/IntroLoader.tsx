import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import kleiaLogo from "@/assets/kleia-logo.svg";

interface IntroLoaderProps {
  onComplete: () => void;
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();
    // Phase 1: Logo fades in + scales
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.5, rotate: -10 },
      { opacity: 1, scale: 1, rotate: 0, duration: 0.8, ease: "back.out(1.7)" }
    );
    // Phase 2: Line expands
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.6, ease: "power3.inOut" },
      "-=0.3"
    );
    // Phase 3: Text appears
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      "-=0.2"
    );
    // Phase 4: Button appears
    tl.fromTo(
      btnRef.current,
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.4)" },
      "-=0.1"
    );
    tl.then(() => setReady(true));

    return () => { tl.kill(); };
  }, []);

  function handleEnter() {
    const tl = gsap.timeline({
      onComplete,
    });
    // Dramatic exit
    tl.to(btnRef.current, { scale: 1.1, duration: 0.15, ease: "power1.out" });
    tl.to(btnRef.current, { scale: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
    tl.to([textRef.current, lineRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.in",
    }, "-=0.15");
    tl.to(logoRef.current, {
      scale: 3,
      opacity: 0,
      duration: 0.6,
      ease: "power3.in",
    }, "-=0.2");
    tl.to(containerRef.current, {
      clipPath: "circle(0% at 50% 50%)",
      duration: 0.7,
      ease: "power3.in",
    }, "-=0.3");
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-foreground"
      style={{ clipPath: "circle(150% at 50% 50%)" }}
    >
      {/* Animated SVG background blobs */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04]"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M0,300 C200,100 400,500 600,300 C800,100 1000,400 1200,250 C1400,100 1440,300 1440,300 L1440,900 L0,900 Z"
          fill="hsl(var(--primary))"
        >
          <animate
            attributeName="d"
            dur="8s"
            repeatCount="indefinite"
            values="
              M0,300 C200,100 400,500 600,300 C800,100 1000,400 1200,250 C1400,100 1440,300 1440,300 L1440,900 L0,900 Z;
              M0,350 C150,200 350,400 550,350 C750,300 950,500 1150,300 C1350,200 1440,350 1440,350 L1440,900 L0,900 Z;
              M0,300 C200,100 400,500 600,300 C800,100 1000,400 1200,250 C1400,100 1440,300 1440,300 L1440,900 L0,900 Z
            "
          />
        </path>
        <path
          d="M0,500 C300,400 500,600 700,450 C900,300 1100,550 1440,500 L1440,900 L0,900 Z"
          fill="hsl(var(--primary))"
          opacity="0.5"
        >
          <animate
            attributeName="d"
            dur="10s"
            repeatCount="indefinite"
            values="
              M0,500 C300,400 500,600 700,450 C900,300 1100,550 1440,500 L1440,900 L0,900 Z;
              M0,550 C250,500 450,650 650,500 C850,400 1050,600 1440,550 L1440,900 L0,900 Z;
              M0,500 C300,400 500,600 700,450 C900,300 1100,550 1440,500 L1440,900 L0,900 Z
            "
          />
        </path>
      </svg>

      <div className="relative flex flex-col items-center gap-6 sm:gap-8">
        <img
          ref={logoRef}
          src={kleiaLogo}
          alt="Kleia"
          className="h-12 sm:h-16 md:h-20 w-auto brightness-0 invert opacity-0"
        />
        <div
          ref={lineRef}
          className="w-24 sm:w-32 h-px bg-primary-foreground/30 origin-center"
          style={{ transform: "scaleX(0)" }}
        />
        <span
          ref={textRef}
          className="text-primary-foreground/60 text-xs sm:text-sm uppercase tracking-[0.3em] font-medium opacity-0"
        >
          Tu asistente de nutrición
        </span>
        <button
          ref={btnRef}
          onClick={handleEnter}
          disabled={!ready}
          className="mt-4 sm:mt-6 group relative px-8 sm:px-12 py-3 sm:py-4 rounded-full bg-primary text-primary-foreground font-bold text-sm sm:text-base uppercase tracking-widest overflow-hidden transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 opacity-0"
        >
          <span className="relative z-10">Descubrir Kleia</span>
          <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>
    </div>
  );
}
