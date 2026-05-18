import React, { useState, useRef, useEffect } from "react";
import { Play } from "lucide-react";

interface FeatureCardProps {
  title: string;
  desc: string;
  /** Base name (without extension) of the media file in /public/media/ */
  media: string;
}

export default function FeatureCard({ title, desc, media }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // IntersectionObserver for mobile only
  useEffect(() => {
    if (!isMobile) {
      setInView(false);
      return;
    }
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.intersectionRatio >= 0.4),
      { threshold: [0, 0.4, 0.6, 1] }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [isMobile]);

  const isActive = isMobile ? (inView || isHovered) : isHovered;

  // Play/pause based on isActive
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isActive) {
      const p = v.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          setTimeout(() => v.play().catch(() => {}), 50);
        });
      }
    } else {
      v.pause();
    }
  }, [isActive]);

  const handleTap = () => {
    if (!isMobile) return;
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      setIsHovered(true);
      v.play().catch(() => {});
    } else {
      setIsHovered(false);
      v.pause();
    }
  };

  const mp4 = `/media/${media}.mp4`;
  const webm = `/media/${media}.webm`;
  const poster = `/media/${media}-poster.jpg`;

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleTap}
      className="feature-card bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer relative"
    >
      <div className="aspect-[16/10] bg-[hsl(213,27%,95%)] rounded-2xl mx-6 mt-6 md:mx-8 md:mt-8 overflow-hidden relative">
        <video
          ref={videoRef}
          poster={poster}
          muted
          loop
          playsInline
          preload="auto"
          aria-label={title}
          className="w-full h-full object-cover"
        >
          <source src={mp4} type="video/mp4" />
          <source src={webm} type="video/webm" />
        </video>
        {!isActive && (
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-sm pointer-events-none">
            <Play className="h-3.5 w-3.5 text-primary fill-primary ml-0.5" />
          </div>
        )}
      </div>
      <div className="px-6 md:px-8 py-5 md:py-6">
        <h3 className="font-bold font-heading text-lg md:text-2xl mb-2">{title}</h3>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
