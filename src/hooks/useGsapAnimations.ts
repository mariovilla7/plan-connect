import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Fade + slide up on scroll */
export function useFadeUp(stagger = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const children = el.querySelectorAll(".gsap-fade-child");
    const targets = children.length > 0 ? children : [el];

    gsap.set(targets, { opacity: 0, y: 60 });
    const tl = gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [stagger]);
  return ref;
}

/** Parallax: element moves slower than scroll */
export function useParallax(speed = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tl = gsap.to(el, {
      yPercent: speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [speed]);
  return ref;
}

/** Scale-in reveal */
export function useScaleReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, scale: 0.85 });
    const tl = gsap.to(el, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);
  return ref;
}

/** Stagger cards from left/right alternating */
export function useAlternateSlide() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll(".gsap-alt-item");
    items.forEach((item, i) => {
      const fromX = i % 2 === 0 ? -80 : 80;
      gsap.set(item, { opacity: 0, x: fromX });
      gsap.to(item, {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);
  return ref;
}

/** Horizontal scrub — moves children horizontally as user scrolls */
export function useHorizontalScrub() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const inner = el.querySelector(".gsap-h-track") as HTMLElement;
    if (!inner) return;

    const tl = gsap.to(inner, {
      x: () => -(inner.scrollWidth - el.offsetWidth),
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: () => `+=${inner.scrollWidth - el.offsetWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);
  return ref;
}

/** Counter up animation triggered on scroll */
export function useCountUp(endValue: number, suffix = "", duration = 2) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { val: 0 };
    const tl = gsap.to(obj, {
      val: endValue,
      duration,
      ease: "power1.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        el.textContent = Math.round(obj.val) + suffix;
      },
    });
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [endValue, suffix, duration]);
  return ref;
}

/** Text reveal — clip mask from left */
export function useTextReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { clipPath: "inset(0 100% 0 0)" });
    const tl = gsap.to(el, {
      clipPath: "inset(0 0% 0 0)",
      duration: 1.2,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);
  return ref;
}

/** Progress bar that fills on scroll (scrubbed) */
export function useScrubProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { scaleX: 0, transformOrigin: "left center" });
    const tl = gsap.to(el, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: el.parentElement,
        start: "top 80%",
        end: "bottom 40%",
        scrub: true,
      },
    });
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);
  return ref;
}
