import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Play } from "lucide-react";

interface FeatureCardProps {
  title: string;
  desc: string;
  image: string;
}

export default function FeatureCard({ title, desc, image }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.6, triggerOnce: false });

  const isActive = isHovered || inView;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="feature-card bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer relative"
    >
      <div className="aspect-[16/10] bg-[hsl(213,27%,95%)] rounded-2xl mx-6 mt-6 md:mx-8 md:mt-8 overflow-hidden relative">
        {isActive ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-opacity duration-500 opacity-100"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-[hsl(213,27%,95%)] flex items-center justify-center relative">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover opacity-70"
              loading="lazy"
              style={{ filter: "blur(0px)" }}
            />
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-sm transition-opacity duration-300">
              <Play className="h-3.5 w-3.5 text-primary fill-primary ml-0.5" />
            </div>
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
