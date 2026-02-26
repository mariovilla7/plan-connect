import kleiaLogo from "@/assets/kleia-logo.svg";
import problemaIlustracion from "@/assets/problema-ilustracion.png";
import problema1 from "@/assets/problem-1.png";
import problema2 from "@/assets/problem-2.png";
import problema3 from "@/assets/problem-3.png";
import problema4 from "@/assets/problem-4.png";
import resultadosIlustracion from "@/assets/resultados-ilustracion.png";
import card1Img from "@/assets/card-1.png";
import card2Img from "@/assets/card-2.png";
import card3Img from "@/assets/card-3.png";
import heroMockup from "@/assets/seccion1-mockup1.png";
import storytellingImg from "@/assets/storytelling.png";
import kleiacard1 from "@/assets/kleiacard_1.png";
import kleiacard2 from "@/assets/kleiacard_2.png";
import kleiacard3 from "@/assets/kleiacard_3.png";
import kleiacard4 from "@/assets/kleiacard_4.png";
import kleiacard5 from "@/assets/kleiacard_5.png";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  useScaleReveal,
} from "@/hooks/useGsapAnimations";
import IntroLoader from "@/components/IntroLoader";
import AnimatedSvgBackground from "@/components/AnimatedSvgBackground";

gsap.registerPlugin(ScrollTrigger);

// ─── WhatsApp CTA ─────────────────────────────────────────────────────────────
const WA_NUMBER = "359896676923";
const WA_MESSAGE = encodeURIComponent("Hola! Me interesa conocer más sobre Kleia y agendar una demo. ¿Podemos hablar?");
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;
const currentYear = new Date().getFullYear();

function openWhatsApp() {
  window.open(WA_URL, "_blank", "noopener,noreferrer");
}

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Brain,
  Sliders,
  RefreshCw,
  Clock,
  BatteryLow,
  Leaf,
  CheckCircle2,
  XCircle,
  Star,
  Gift,
  MessageSquare,
  ShieldCheck,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Removed PinnedSection — using regular sections with GSAP reveals

// ─── S0 · Navbar ─────────────────────────────────────────────────────────────
const navLinks = [
  { label: "El problema", id: "seccion-2-problema" },
  { label: "Resultados", id: "seccion-3-resultados" },
  { label: "Cómo funciona", id: "seccion-4-flujo" },
  { label: "Incluido", id: "seccion-5-incluido" },
  { label: "FAQ", id: "seccion-11-faq" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      id="seccion-0-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-lg border-b border-border/50 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container max-w-6xl mx-auto flex items-center justify-between h-14 md:h-16 lg:h-20 px-4 sm:px-6">
        <div className="flex items-center">
          <img src={kleiaLogo} alt="Kleia" className="h-6 sm:h-7 md:h-8 w-auto" />
        </div>
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`text-xs font-medium rounded-full px-4 py-2 transition-all uppercase tracking-wider ${
                scrolled
                  ? "text-muted-foreground hover:text-foreground hover:bg-muted"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button
            onClick={openWhatsApp}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-4 sm:px-5 md:px-6 text-[11px] sm:text-xs md:text-sm font-semibold shadow-sm h-9 md:h-10 uppercase tracking-wider"
          >
            Agendar demo
          </Button>
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-muted/50 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
          >
            <span className={`block w-5 h-0.5 bg-foreground transition-transform duration-200 ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-foreground transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-foreground transition-transform duration-200 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>
      {open && (
        <nav className="lg:hidden bg-white/95 backdrop-blur-lg px-4 sm:px-6 py-2 flex flex-col border-t border-border/30">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => { scrollTo(id); setOpen(false); }}
              className="text-sm text-muted-foreground hover:text-foreground text-left transition-colors py-3 border-b border-border/20 last:border-b-0 uppercase tracking-wider"
            >
              {label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

// ─── S1 · Hero (Fullscreen Inmersivo) ─────────────────────────────────────────
function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax mockup on scroll
      gsap.to(mockupRef.current, {
        yPercent: 30,
        scale: 0.9,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      // Text fades out on scroll
      gsap.to(textGroupRef.current, {
        opacity: 0,
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "30% top",
          end: "80% top",
          scrub: true,
        },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="seccion-1-hero"
      className="relative min-h-[100svh] flex flex-col items-center justify-center bg-white overflow-hidden px-4 lg:px-6 pt-20 md:pt-24"
    >
      <AnimatedSvgBackground className="opacity-100" />

      <div ref={textGroupRef} className="relative z-10 text-center max-w-5xl mx-auto">
        <h1 className="text-[2rem] leading-[1.1] sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-serif sm:leading-[1.1] mb-4 sm:mb-5 md:mb-6 text-foreground px-1 sm:px-2">
          Deja de pensar
          <br />
          en menús.
          <br />
          <span className="text-primary">Termina tu día</span>
          <br />
          <span className="text-primary">con todos los planes</span>
          <br />
          <span className="text-primary">enviados.</span>
        </h1>
        <div className="inline-block mb-4 sm:mb-5 md:mb-6 max-w-[92vw]">
          <span className="bg-primary/10 text-primary text-[10px] sm:text-[11px] md:text-xs font-medium px-3 sm:px-4 py-1.5 md:py-2 rounded-full leading-snug inline-block">
            Para nutricionistas independientes · sin perder el criterio profesional
          </span>
        </div>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto px-2">
          Genera planes clínicos en minutos. Envía un PDF listo por WhatsApp — sin copiar y pegar.
        </p>
        <div className="inline-flex flex-col items-center gap-3">
          <Button
            onClick={openWhatsApp}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 rounded-full px-8 sm:px-10 md:px-14 text-sm md:text-lg font-semibold shadow-lg relative h-12 sm:h-14 md:h-16 tracking-wide uppercase"
          >
            Escribirnos por WhatsApp →
            <span
              className="absolute -top-3 -right-3 text-[10px] sm:text-[11px] font-bold rounded-full px-2 py-1 leading-none shadow-sm border"
              style={{ backgroundColor: "hsl(45 95% 60%)", color: "hsl(30 80% 20%)", borderColor: "hsl(45 90% 50%)" }}
            >
              10 plazas
            </span>
          </Button>
          <p className="text-xs sm:text-sm text-muted-foreground/60 uppercase tracking-widest">Piloto cerrado · Acceso por invitación</p>
        </div>
      </div>

      {/* Mockup — pinned parallax */}
      <div
        ref={mockupRef}
        className="relative z-10 w-full flex items-center justify-center mt-8 sm:mt-12 md:mt-16"
      >
        <img
          src={heroMockup}
          alt="Kleia app mockup"
          className="w-full max-w-5xl h-auto object-contain drop-shadow-2xl"
          loading="eager"
        />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-[10px] sm:text-xs text-muted-foreground/50 uppercase tracking-widest">Scroll</span>
        <div className="w-px h-6 sm:h-8 bg-muted-foreground/20" />
      </div>
    </section>
  );
}

// ─── Problem ─────────────────────────────────────────────────────────────────
const problems = [
  {
    icon: Brain,
    title: "Estoy hasta arriba de hacer menús",
    description: "Se te acaban las ideas y la cabeza no da para más. No es difícil: es un desgaste diario que te deja sin paciencia.",
  },
  {
    icon: Sliders,
    title: "No quiero ideas al tuntún: tiene que encajar con MI paciente",
    description: "Variedad sí, pero con sentido clínico y realista: gustos, patologías, intolerancias, horarios y comida que pueda hacer y encontrar sin complicarse.",
  },
  {
    icon: RefreshCw,
    title: "Tocas una cosa… y se descompensa todo",
    description: "Cambias un ingrediente y se mueven las calorías y los macros (y el resto del día). Acabas recomponiendo comidas para que el plan vuelva a cuadrar.",
  },
  {
    icon: BatteryLow,
    title: "El plan se te mete en la noche y el finde",
    description: 'Atiendes todo el día y el plan cae "para después". Se acumula, lo haces a ratos o en domingo… y a veces se te va a varios días.',
  },
];

const problemImages = [problemaIlustracion, problema1, problema2, problema3, problema4];

// ─── S2 · El Problema ────────────────────────────────────────────────────────
function ProblemSection() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;
    const items = el.querySelectorAll(".problem-card");
    gsap.set(items, { opacity: 0, x: (i: number) => (i % 2 === 0 ? -80 : 80), scale: 0.9 });
    const tl = gsap.to(items, {
      opacity: 1, x: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.2)",
      scrollTrigger: { trigger: el, start: "top 70%", toggleActions: "play none none none" },
    });
    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);

  return (
    <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-6 md:mb-10">
          <Badge variant="outline" className="mb-3 md:mb-4 text-primary border-primary/30 bg-primary/5 text-xs uppercase tracking-widest">
            El Problema
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-serif">¿Te suena familiar?</h2>
        </div>

        <div ref={cardsRef} className="flex flex-col gap-4 md:gap-6">
          {problems.map(({ icon: Icon, title, description }, i) => {
            const imgSrc = problemImages[i + 1];
            const isEven = i % 2 === 0;
            return (
              <div
                key={title}
                className={`problem-card flex flex-col md:flex-row items-center gap-4 md:gap-6 ${!isEven ? "md:flex-row-reverse" : ""}`}
              >
                <div className="flex-shrink-0 w-full max-w-[180px] sm:max-w-[200px] md:w-52">
                  <img src={imgSrc} alt={title} className="w-full h-auto rounded-xl object-contain" loading="lazy" />
                </div>
                <div className="flex-1 group p-4 md:p-5 rounded-xl md:rounded-2xl bg-background border border-border/60 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 shadow-sm">
                  <div className="flex items-center gap-2.5 mb-2 md:mb-2.5">
                    <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm leading-snug text-foreground">{title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed pl-[38px]">{description}</p>
                </div>
              </div>
            );
          })}
        </div>
    </div>
  );
}

// ─── S2b · Voces Reales (Evidence Strip) ─────────────────────────────────────
const cityQuotes: Record<string, { quote: string; profile: string; summary: string }> = {
  "Madrid (ES)": {
    quote: "Estoy harta de hacer menús.",
    profile: "Nutrióloga · Madrid, ES",
    summary: "Carga mental + trabajo que se cuela al finde.",
  },
  "Valencia (ES)": {
    quote: "Si el caso es complejo, el plan me come el día.",
    profile: "Nutrióloga · Valencia, ES",
    summary: "Personalización real = más tiempo.",
  },
  "CDMX (MX)": {
    quote: "Se mueven las calorías y me da no sé qué.",
    profile: "Nutrióloga · CDMX, MX",
    summary: "Control de calidad manual constante.",
  },
  "Lima (PE)": {
    quote: "Si cambio algo, me descuadra y tengo que recomponer.",
    profile: "Nutrióloga · Lima, PE",
    summary: "Rebalanceo manual tras sustituciones.",
  },
  "Tegucigalpa (HN)": {
    quote: "La variedad cuesta si tiene que ser aplicable aquí.",
    profile: "Nutrióloga · Tegucigalpa, HN",
    summary: "Localización + realismo del menú.",
  },
};

const cityChips = Object.keys(cityQuotes);

function EvidenceStrip() {
  const [activeChip, setActiveChip] = useState(cityChips[0]);
  const [visible, setVisible] = useState(true);

  const handleChip = (chip: string) => {
    if (chip === activeChip) return;
    setVisible(false);
    setTimeout(() => { setActiveChip(chip); setVisible(true); }, 180);
  };

  const active = cityQuotes[activeChip];

  return (
    <div className="container max-w-5xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
      <div className="text-center mb-6 md:mb-10">
        <Badge variant="outline" className="mb-3 md:mb-4 text-primary border-primary/30 bg-primary/5 text-xs uppercase tracking-widest">
          Construido a partir de 12 entrevistas. No de suposiciones.
        </Badge>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-serif">Frases reales de entrevistas</h2>
      </div>

      <div className="space-y-3 sm:space-y-4 md:space-y-5">
        <div className="flex gap-2 justify-start sm:justify-center overflow-x-auto pb-1 sm:pb-0 sm:flex-wrap scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {cityChips.map((chip) => (
            <button
              key={chip}
              onClick={() => handleChip(chip)}
              aria-pressed={activeChip === chip}
              className={[
                "rounded-full px-3 py-1.5 text-[11px] sm:text-xs font-medium border transition-all duration-200 whitespace-nowrap flex-shrink-0 active:scale-95",
                activeChip === chip
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground",
              ].join(" ")}
            >
              {chip}
            </button>
          ))}
        </div>

        <div
          className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-8 text-center space-y-1.5 sm:space-y-2 md:space-y-3 shadow-sm transition-opacity duration-200"
          style={{ opacity: visible ? 1 : 0 }}
          aria-live="polite"
        >
          <p className="text-sm sm:text-base md:text-xl font-serif font-semibold text-foreground leading-snug">
            <span className="text-primary text-lg sm:text-xl md:text-2xl leading-none">"</span>
            {active.quote}
            <span className="text-primary text-lg sm:text-xl md:text-2xl leading-none">"</span>
          </p>
          <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-widest">
            {active.profile}
          </p>
          <p className="text-[11px] sm:text-xs md:text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Resumen:</span> {active.summary}
          </p>
        </div>
      </div>

      <div className="text-center mt-4 sm:mt-6">
        <button
          onClick={() => scrollTo("seccion-4-flujo")}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-full hover:bg-primary/90 active:bg-primary/80 transition-colors shadow-md text-xs sm:text-sm md:text-base"
        >
          Ver cómo lo resolvemos →
        </button>
      </div>
    </div>
  );
}

// ─── Results ─────────────────────────────────────────────────────────────────
const stats = [
  { value: "Menú que encaja de verdad", label: "realista y clínico", time: "+10''", desc: "Platos que cuadran con el caso y con su día a día (sin ideas al tuntún ni ingredientes imposibles)." },
  { value: "Plan completo", label: "sin hoja en blanco", time: "+20''", desc: 'Pasas de "¿qué le pongo?" a un plan base listo, armado a partir de restricciones, objetivos y contexto.' },
  { value: "Ajuste fino", label: "sin descompensar el plan", time: "+15''", desc: "Cambias un ingrediente y Kleia recalcula el plan para que las macros/calorías sigan cuadrando." },
  { value: "Entrega al paciente", label: "sin pasos extra", time: "+7''", desc: "PDF listo + lista de compra agrupada para enviar por WhatsApp/email/enlace, sin formatear ni copiar y pegar." },
];

function ResultsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [phase, setPhase] = useState(0);
  const [metricPulse, setMetricPulse] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) { setPhase(5); return; }
    const timers: ReturnType<typeof setTimeout>[] = [];
    [0, 1, 2, 3].forEach((i) => {
      timers.push(setTimeout(() => {
        setPhase(i + 1);
        setMetricPulse(true);
        setTimeout(() => setMetricPulse(false), 500);
      }, 500 + i * 500));
    });
    timers.push(setTimeout(() => setPhase(5), 500 + 3 * 500 + 600));
    return () => timers.forEach(clearTimeout);
  }, [inView, reducedMotion]);

  const cardVisible = (i: number) => inView && (reducedMotion || phase >= i + 1);
  const hourValues = ["0", "2", "4", "5", "6+"];
  const displayHours = hourValues[Math.min(phase, 4)];

  return (
    <div ref={sectionRef} className="container max-w-5xl mx-auto">
        <div className="text-center mb-6 md:mb-10">
          <Badge variant="outline" className="mb-3 md:mb-4 text-primary border-primary/30 bg-primary/5 text-xs uppercase tracking-widest">
            RESULTADOS CON KLEIA
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-serif">Menos carga, más control</h2>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="flex-shrink-0 w-full md:w-72 flex flex-col items-center">
            <img src={resultadosIlustracion} alt="Nutricionista usando Kleia" className="w-full max-w-[220px] md:max-w-none object-contain" />
            <div className="mt-4 text-center">
              <p
                className={`text-4xl font-bold font-serif transition-all duration-300 ${phase === 5 ? "scale-110" : ""} ${metricPulse && !reducedMotion ? "scale-110" : "scale-100"}`}
                style={{
                  transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease, color 0.25s ease",
                  opacity: inView ? 1 : 0,
                  color: metricPulse && !reducedMotion ? "hsl(142 71% 45%)" : "hsl(var(--primary))",
                }}
              >
                {reducedMotion ? "6+" : displayHours} horas
              </p>
              <p className="text-sm font-semibold mt-1" style={{ opacity: inView ? 1 : 0, transition: "opacity 0.5s ease 0.2s" }}>
                más a la semana
              </p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed" style={{ opacity: inView ? 1 : 0, transition: "opacity 0.5s ease 0.4s" }}>
                Que antes se iban en armar y enviar planes
              </p>
              <div className="flex gap-1.5 justify-center mt-4">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="h-1 rounded-full transition-all duration-500"
                    style={{ width: phase > i ? "20px" : "6px", backgroundColor: phase > i ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.2)" }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-3">
            <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-muted-foreground mb-1">detalles que nos importan</p>
            {stats.map(({ value, label, time, desc }, i) => {
              const vis = cardVisible(i);
              return (
                <div key={value} className="flex rounded-xl overflow-hidden border shadow-sm transition-all"
                  style={{
                    opacity: vis ? 1 : 0,
                    transform: vis ? (reducedMotion ? "none" : "translateX(0) scale(1)") : "translateX(32px) scale(0.97)",
                    transitionProperty: "opacity, transform",
                    transitionDuration: reducedMotion ? "0ms" : "520ms",
                    transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
                    transitionDelay: reducedMotion ? "0ms" : `${i * 90}ms`,
                  }}
                >
                  <div className="flex flex-col items-center justify-center bg-primary/10 py-4 px-3 w-1/3 shrink-0 gap-1.5">
                    <p className="text-[0.75rem] font-bold font-serif text-primary text-center leading-snug">{value}</p>
                    {label && <p className="text-[0.55rem] font-semibold text-primary/70 text-center leading-tight">{label}</p>}
                    <div className="flex items-center gap-1 mt-0.5 bg-primary/20 rounded-full px-2 py-0.5">
                      <Clock className="h-2.5 w-2.5 text-primary" />
                      <span className="text-[0.6rem] font-bold text-primary">{time}</span>
                    </div>
                  </div>
                  <div className="flex items-center bg-white px-4 py-3 w-2/3">
                    <p className="text-xs text-muted-foreground leading-snug">{desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
    </div>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
const steps = [
  { num: "01", title: "Carga lo mínimo", desc: "Ingresas restricciones, preferencias y objetivos del paciente una sola vez. Kleia los guarda para no repetir trabajo.", image: null as string | null },
  { num: "02", title: "Genera el plan", desc: "Con un click, Kleia crea un plan semanal completo y balanceado, adaptado al perfil del paciente.", image: null as string | null },
  { num: "03", title: "Ajusta sin descuadres", desc: "Cambias cualquier alimento y el sistema recalcula calorías y macros en tiempo real, para que el plan siga cuadrando.", image: null as string | null },
  { num: "04", title: "Entrega en 1 click", desc: "Exportas el plan como PDF listo para compartir y lo enviás por WhatsApp/email como siempre — sin formatear, sin copiar y pegar.", image: null as string | null },
];

const STEP_OFFSETS = [0, 24, -24, 0];

function HowItWorksSection() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(-1);
  const [hasPlayed, setHasPlayed] = useState(false);
  const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !hasPlayed) { setTimeout(() => runAnimation(), 200); setHasPlayed(true); observer.disconnect(); } },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasPlayed]);

  function runAnimation() {
    if (reducedMotion) { setActiveStep(4); return; }
    [0, 1, 2, 3].forEach((i) => setTimeout(() => setActiveStep(i), i * 500));
    setTimeout(() => setActiveStep(4), 2000);
  }

  const isHighlighted = (i: number) => (reducedMotion ? true : activeStep >= i);

  function StepCard({ num, title, desc, highlighted, style }: { num: string; title: string; desc: string; highlighted: boolean; style?: React.CSSProperties }) {
    return (
      <div
        className="relative z-10 flex flex-col p-5 md:p-7 rounded-2xl transition-all duration-500"
        style={{
          ...style,
          backgroundColor: highlighted ? "hsl(var(--primary) / 0.06)" : "hsl(var(--background))",
          borderColor: highlighted ? "hsl(var(--primary) / 0.3)" : "hsl(var(--border))",
          border: "1px solid",
          transform: highlighted ? "scale(1.02)" : "scale(1)",
          boxShadow: highlighted ? "0 8px 30px -8px hsl(var(--primary) / 0.15)" : "none",
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <span
            className="text-xs font-bold rounded-full px-2.5 py-1 transition-all duration-300"
            style={{
              backgroundColor: highlighted ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.15)",
              color: highlighted ? "hsl(var(--primary-foreground))" : "hsl(var(--primary) / 0.5)",
            }}
          >
            {num}
          </span>
          <h3 className="font-semibold text-sm md:text-base">{title}</h3>
        </div>
        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="container max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <Badge variant="outline" className="mb-3 md:mb-4 text-primary border-primary/30 bg-primary/5 text-xs uppercase tracking-widest">
            Flujo
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-serif">Cómo funciona</h2>
        </div>

        {/* DESKTOP */}
        <div className="hidden md:block">
          <div className="grid grid-cols-2 gap-10">
            {steps.map((s, i) => (
              <StepCard key={s.num} num={s.num} title={s.title} desc={s.desc} highlighted={isHighlighted(i)} style={{ marginTop: STEP_OFFSETS[i] }} />
            ))}
          </div>
        </div>

        {/* MOBILE */}
        <div className="md:hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {steps.map((s, i) => (
              <StepCard key={s.num} num={s.num} title={s.title} desc={s.desc} highlighted={isHighlighted(i)} />
            ))}
          </div>
        </div>
        <div className="max-w-2xl mx-auto mt-6 md:mt-8 bg-primary/5 border border-primary/20 rounded-xl sm:rounded-2xl px-5 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6">
          <p className="text-sm sm:text-base text-foreground/80 text-center leading-relaxed italic">
            <span className="text-primary font-semibold not-italic">💡</span>{" "}
            Tú decides el contenido final: Kleia acelera la generación y los ajustes, no reemplaza tu criterio.
          </p>
        </div>
    </div>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────
const features = [
  { label: "Generación de planes semanales en minutos", icon: "📋" },
  { label: "Adaptación automática a restricciones y alergias", icon: "🎯" },
  { label: "Recalculo instantáneo de macros al hacer cambios", icon: "⚡" },
  { label: "Biblioteca de alimentos con valores nutricionales", icon: "📚" },
  { label: "Exportación PDF lista para compartir", icon: "📄" },
  { label: "Historial por paciente accesible en todo momento", icon: "🗂️" },
  { label: "Acceso desde cualquier dispositivo, sin instalación", icon: "💻" },
  { label: "Soporte dedicado durante el piloto", icon: "🤝" },
];

const carouselImages = [kleiacard1, kleiacard2, kleiacard3, kleiacard4, kleiacard5];

function FeaturesCarousel() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % carouselImages.length), 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white border border-border">
      <div className="relative w-full aspect-[3/4]">
        {carouselImages.map((src, i) => (
          <img key={i} src={src} alt={`Kleia screenshot ${i + 1}`}
            className="absolute inset-0 w-full h-full object-contain p-2 sm:p-4 transition-opacity duration-500"
            style={{ opacity: current === i ? 1 : 0 }} loading="lazy"
          />
        ))}
      </div>
      <div className="flex justify-center gap-1.5 pb-3">
        {carouselImages.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${current === i ? "bg-primary w-4" : "bg-primary/25"}`}
            aria-label={`Foto ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function FeaturesSection() {
  const chipsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = chipsRef.current;
    if (!el) return;
    const items = el.querySelectorAll(".feat-chip");
    gsap.set(items, { opacity: 0, x: 40, scale: 0.9 });
    const tl = gsap.to(items, {
      opacity: 1, x: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
    });
    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);

  return (
    <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-5 sm:mb-6 md:mb-10">
          <Badge variant="outline" className="mb-2 sm:mb-3 md:mb-4 text-primary border-primary/30 bg-primary/5 text-[10px] sm:text-xs uppercase tracking-widest">
            Incluido
          </Badge>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold font-serif">Qué incluye Kleia</h2>
        </div>
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 items-center">
          <div className="flex-shrink-0 w-full md:w-64 lg:w-72">
            <FeaturesCarousel />
          </div>
          <div ref={chipsRef} className="flex-1 flex flex-col gap-1.5 sm:gap-2 w-full">
            {features.map(({ label }) => (
              <div key={label} className="feat-chip inline-flex items-center gap-2 sm:gap-2.5 md:gap-3 border rounded-full px-3 sm:px-4 md:px-5 py-2 md:py-2.5 text-[11px] sm:text-xs md:text-sm font-medium bg-primary/8 text-primary border-primary/20 text-left">
                <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 flex-shrink-0" />
                {label}
              </div>
            ))}
            <div className="mt-3 sm:mt-4">
              <Button onClick={openWhatsApp} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 rounded-full px-5 sm:px-6 md:px-8 text-xs sm:text-sm md:text-base font-medium shadow-md w-full sm:w-auto h-10 sm:h-11">
                Jugar con Kleia →
              </Button>
            </div>
          </div>
        </div>
    </div>
  );
}

// ─── Comparison Table ─────────────────────────────────────────────────────────
const comparisonRows = [
  { feature: "Personalización sin trabajo manual", excel: "Parcial", avena: "Parcial", artesanal: false, kleia: true },
  { feature: "Recalculo automático de macros", excel: "Parcial", avena: true, artesanal: false, kleia: true },
  { feature: "Sin horas de trabajo manual", excel: false, avena: false, artesanal: false, kleia: true },
  { feature: "Exportación PDF profesional", excel: false, avena: true, artesanal: false, kleia: true },
  { feature: "Historial por paciente", excel: "Parcial", avena: true, artesanal: false, kleia: true },
  { feature: "Ajustes sin descuadres", excel: false, avena: "Parcial", artesanal: false, kleia: true },
  { feature: "Sin curva de aprendizaje larga", excel: false, avena: false, artesanal: true, kleia: true },
  { feature: "Toque humano del nutricionista", excel: true, avena: false, artesanal: true, kleia: true },
];

function CellValue({ val }: { val: boolean | string }) {
  if (val === true) return <Check className="h-4 w-4 text-primary mx-auto" />;
  if (val === false) return <X className="h-4 w-4 text-destructive mx-auto" />;
  return <span className="text-xs text-muted-foreground">{val}</span>;
}

function ComparisonSection() {
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tbl = tableRef.current;
    if (!tbl) return;
    const rows = tbl.querySelectorAll("tbody tr");
    gsap.set(rows, { opacity: 0, x: -30 });
    const tl = gsap.to(rows, {
      opacity: 1, x: 0, duration: 0.5, stagger: 0.07, ease: "power2.out",
      scrollTrigger: { trigger: tbl, start: "top 80%", toggleActions: "play none none none" },
    });
    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);

  return (
    <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-6 md:mb-10">
          <Badge variant="outline" className="mb-3 md:mb-4 text-primary border-primary/30 bg-primary/5 text-xs uppercase tracking-widest">
            Comparativa
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-serif">¿Por qué Kleia y no otra cosa?</h2>
        </div>
        <div ref={tableRef} className="relative bg-white rounded-2xl shadow-sm border border-border/40 overflow-hidden">
          <div className="overflow-x-auto scrollbar-hide">
            <table className="text-sm border-collapse min-w-[600px] w-full">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left p-3 sm:p-4 md:p-5 text-muted-foreground font-medium text-[11px] sm:text-xs md:text-sm whitespace-nowrap">Funcionalidad</th>
                  <th className="p-3 sm:p-4 md:p-5 text-center text-muted-foreground font-medium text-[11px] sm:text-xs md:text-sm">Excel</th>
                  <th className="p-3 sm:p-4 md:p-5 text-center text-muted-foreground font-medium text-[11px] sm:text-xs md:text-sm">Avena</th>
                  <th className="p-3 sm:p-4 md:p-5 text-center text-muted-foreground font-medium text-[11px] sm:text-xs md:text-sm">Lápiz y hoja</th>
                  <th className="p-3 sm:p-4 md:p-5 text-center bg-primary/5">
                    <div className="flex items-center justify-center py-0.5">
                      <img src={kleiaLogo} alt="Kleia" className="h-5 sm:h-6 md:h-8 w-auto" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(({ feature, excel, avena, artesanal, kleia }, i) => (
                  <tr key={feature} className={`border-b border-border/20 last:border-b-0 ${i % 2 === 0 ? "bg-muted/20" : "bg-white"}`}>
                    <td className="p-3 sm:p-4 md:p-5 text-foreground/80 text-[11px] sm:text-xs md:text-sm whitespace-nowrap">{feature}</td>
                    <td className="p-3 sm:p-4 md:p-5 text-center"><CellValue val={excel} /></td>
                    <td className="p-3 sm:p-4 md:p-5 text-center"><CellValue val={avena} /></td>
                    <td className="p-3 sm:p-4 md:p-5 text-center"><CellValue val={artesanal} /></td>
                    <td className="p-3 sm:p-4 md:p-5 text-center bg-green-50/60"><CellValue val={kleia} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      <div className="max-w-2xl mx-auto mt-6 md:mt-8 bg-primary/5 border border-primary/20 rounded-xl sm:rounded-2xl px-5 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6">
        <p className="text-sm sm:text-base text-foreground/80 text-center leading-relaxed italic">
          {"💡 Kleia no es 'otro software de nutrición': es un asistente que te quita el trabajo mecánico sin quitarte el criterio."}
        </p>
      </div>
    </div>
  );
}

// ─── Archetype / Fit ────────────────────────────────────────────────────────
const archetypes = [
  {
    badge: "⏳ Saturada",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    image: card1Img,
    title: "La Saturada (pero responsable)",
    subtitle: "Agenda llena. Planes que se te cuelan al finde.",
    subtitleNode: null,
    bullets: [
      "Estoy hasta arriba de hacer menús.",
      "Empiezo el plan 'cuando puedo'… y a veces se me va a días.",
      "Me prometo que este finde no… y al final cae el domingo.",
    ],
    withKleia: "Plan en 10–20 min, ajustes en 1–3 min y entrega el PDF listo para WhatsApp/email + sin copiar/pegar.",
    cta: "Soy esta. Quiero demo.",
    accentBorder: "#d97706",
    highlight: false,
    muted: false,
    microcopy: null,
  },
  {
    badge: "⚡ 24h",
    badgeColor: "bg-primary/10 text-primary border-primary/25",
    image: card2Img,
    title: "La de '24h o nada'",
    subtitle: "Te importa que el paciente empiece ya.",
    subtitleNode: null,
    bullets: [
      "Quieres entregar el plan en las primeras 24 horas.",
      "Si pasan más de 48, ya es 'alerta': hasta en comisaría se preocupan 😅",
      "Odias que un cambio descompense el plan y te robe tiempo.",
    ],
    withKleia: "Menú que encaja (realista y clínico) + recalculo del plan completo.",
    cta: "Soy esta. Agendar demo.",
    accentBorder: "hsl(var(--primary))",
    highlight: true,
    muted: false,
    microcopy: null,
  },
  {
    badge: "🙂💧 Estoy bien",
    badgeColor: "bg-muted text-muted-foreground border-border",
    image: card3Img,
    title: "La de 'Estoy bien así (según yo)'",
    subtitle: "",
    subtitleNode: (
      <>
        <em className="not-italic opacity-60 text-xs">todo bajo control</em> …hasta que te explota la semana.
      </>
    ),
    bullets: [
      "Te va bien seguir sacrificando domingos para ponerte al día con planes.",
      "Te gusta perderte en mil páginas buscando recetas 'a ver cuál encaja' para cada paciente.",
      "Prefieres hacer cada ajuste a mano y recomponer macros/calorías tú mismo 'porque así lo controlas'.",
      "Te da igual que el plan se vaya a 3–4 días porque con tu carga actual te compensa.",
    ],
    withKleia: null,
    cta: "Ver cómo sería",
    accentBorder: "hsl(var(--border))",
    highlight: false,
    muted: true,
    microcopy: "Si esto te funciona, genial. Kleia es para quien ya está hasta arriba y quiere recuperar control sin quemarse.",
  },
];

function ProfileCard({ arch, onOpenModal }: { arch: (typeof archetypes)[0]; onOpenModal: () => void }) {
  return (
    <div
      className="rounded-2xl border border-border bg-white shadow-sm flex flex-col overflow-hidden cursor-pointer hover:shadow-md hover:border-primary/30 transition-all duration-200"
      onClick={onOpenModal}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalles de ${arch.title}`}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onOpenModal(); }}
    >
      <div className="relative w-full aspect-[4/3] bg-muted/30 overflow-hidden">
        <img src={arch.image} alt={arch.title} className="w-full h-full object-cover" loading="lazy" />
        <span className={`absolute top-2 left-2 text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full border ${arch.badgeColor}`}>
          {arch.badge}
        </span>
      </div>
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-sm sm:text-base mb-1 leading-snug">{arch.title}</h3>
        <p className="text-[11px] sm:text-xs text-muted-foreground mb-3 leading-relaxed">
          {arch.subtitleNode ?? arch.subtitle}
        </p>
        <button className="mt-auto w-full text-center py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-colors bg-primary/10 text-primary hover:bg-primary/20">
          Ver más →
        </button>
      </div>
    </div>
  );
}

function FitSection() {
  const [modalIdx, setModalIdx] = useState<number | null>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;
    const cards = el.querySelectorAll(".fit-card");
    gsap.set(cards, { opacity: 0, y: 80, scale: 0.85 });
    const tl = gsap.to(cards, {
      opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.2, ease: "back.out(1.2)",
      scrollTrigger: { trigger: el, start: "top 75%", toggleActions: "play none none none" },
    });
    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);

  const modalArch = modalIdx !== null ? archetypes[modalIdx] : null;

  return (
    <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-5 sm:mb-6 md:mb-10">
          <Badge variant="outline" className="mb-2 sm:mb-3 md:mb-4 text-primary border-primary/30 bg-primary/5 text-[10px] sm:text-xs uppercase tracking-widest">
            ¿Es para ti?
          </Badge>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold font-serif">¿Te reconoces en alguno?</h2>
          <p className="text-muted-foreground mt-1 sm:mt-2 text-xs sm:text-sm md:text-base max-w-lg mx-auto">
            Hemos identificado 3 perfiles de nutricionistas. Toca el que más se parezca a ti.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
          {archetypes.map((arch, i) => (
            <div key={arch.title} className="fit-card">
              <ProfileCard arch={arch} onOpenModal={() => setModalIdx(i)} />
            </div>
          ))}
        </div>

      {/* Modal */}
      {modalArch &&
        createPortal(
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setModalIdx(null)}>
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[85vh] overflow-y-auto p-5 sm:p-6 relative" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setModalIdx(null)} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground" aria-label="Cerrar">
                <X className="h-5 w-5" />
              </button>
              <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border inline-block mb-3 ${modalArch.badgeColor}`}>
                {modalArch.badge}
              </span>
              <h3 className="font-bold text-lg font-serif mb-1">{modalArch.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{modalArch.subtitleNode ?? modalArch.subtitle}</p>
              <ul className="space-y-2 mb-4">
                {modalArch.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span className="mt-1 text-primary">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              {modalArch.microcopy && (
                <p className="text-xs text-muted-foreground italic border-t border-border pt-3 mb-4">{modalArch.microcopy}</p>
              )}
              {modalArch.withKleia && (
                <p className="text-sm border-t border-border pt-3 mb-4">
                  <span className="font-semibold text-primary">Con Kleia: </span>
                  <span className="text-muted-foreground">{modalArch.withKleia}</span>
                </p>
              )}
              <button
                onClick={() => { setModalIdx(null); openWhatsApp(); }}
                className="w-full text-center py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {modalArch.cta}
              </button>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

// ─── Story ───────────────────────────────────────────────────────────────────
const NEW_STORY_TEXT = `Llevo años creando productos digitales con una obsesión: quitar la fricción que te roba vida.
Primero lo vi como usuaria: con mi entrenador todo era WhatsApp, calendarios y pagos a mano. Pensé: "esto se puede simplificar".

Después, trabajando con un nutricionista, vi el mismo patrón: tareas pequeñas, repetidas cada semana, que te dejan sin margen. Y cada mejora que proponía era un "sí".

La chispa fue ver a una familia haciendo la lista de la compra a mano para poder seguir una dieta. Ahí lo tuve claro.
Le escribí a Mario y, cuando dijo "sí", arrancó de verdad: problema real + equipo complementario.

Así nació Kleia: un asistente para nutricionistas para crear menús que encajan, editar sin descuadres y entregar rápido — sin que el plan se te coma la semana.`;

function StorySection() {
  const imgRef = useScaleReveal();
  return (
    <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-5 sm:mb-6 md:mb-10">
          <Badge variant="outline" className="mb-2 sm:mb-3 md:mb-4 text-primary border-primary/30 bg-primary/5 text-[10px] sm:text-xs uppercase tracking-widest">
            Por qué existe
          </Badge>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold font-serif mb-1.5 sm:mb-2 md:mb-3">
            La historia detrás de Kleia
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-xs sm:text-sm md:text-base">
            Nació para quitarte trabajo invisible: el que empieza cuando termina la consulta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-10 lg:gap-14 items-start mb-5 sm:mb-6 md:mb-10">
          <div ref={imgRef} className="flex items-center justify-center">
            <img src={storytellingImg} alt="Equipo detrás de Kleia" className="w-full max-w-xs md:max-w-none rounded-xl object-contain" loading="lazy" />
          </div>
          <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
            {NEW_STORY_TEXT.split("\n\n").map((para, i) => (
              <p key={i} className="text-xs sm:text-sm text-foreground/80 leading-relaxed">{para}</p>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 md:gap-4 mb-5 sm:mb-6 md:mb-10">
          <div className="rounded-lg sm:rounded-xl md:rounded-2xl border border-border/60 bg-primary/5 p-3.5 sm:p-4 md:p-5">
            <h3 className="font-semibold text-foreground mb-1 sm:mb-1.5 text-xs sm:text-sm">✨ La chispa</h3>
            <p className="text-[11px] sm:text-xs md:text-sm text-muted-foreground leading-relaxed">
              Ver a gente haciendo la lista de la compra a mano para poder cumplir el plan.
            </p>
          </div>
          <div className="rounded-lg sm:rounded-xl md:rounded-2xl border border-border/60 bg-muted/30 p-3.5 sm:p-4 md:p-5">
            <h3 className="font-semibold text-foreground mb-1 sm:mb-1.5 text-xs sm:text-sm">🧠 Nuestro enfoque</h3>
            <p className="text-[11px] sm:text-xs md:text-sm text-muted-foreground leading-relaxed">
              No queríamos "otro software". Queríamos un asistente que te quite lo pesado sin quitarte el criterio.
            </p>
          </div>
        </div>

        <div className="text-center">
          <button onClick={openWhatsApp} className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-full hover:bg-primary/90 active:bg-primary/80 transition-colors shadow-md text-xs sm:text-sm md:text-base">
            Enséñame cómo sería
          </button>
        </div>
    </div>
  );
}

// ─── Bonuses ─────────────────────────────────────────────────────────────────
function BonusesSection() {
  const bonusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bonusRef.current;
    if (!el) return;
    const cards = el.querySelectorAll(".gsap-bonus-card");
    gsap.set(cards, { opacity: 0, y: 60, rotateX: 20, scale: 0.9 });
    const tl = gsap.to(cards, {
      opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 0.9, stagger: 0.15, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
    });
    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);

  return (
    <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-5 sm:mb-6 md:mb-10">
          <Badge variant="outline" className="mb-2 sm:mb-3 md:mb-4 text-primary border-primary/30 bg-primary/5 text-[10px] sm:text-xs uppercase tracking-widest">
            Extras
          </Badge>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold font-serif">Bonos incluidos en el piloto</h2>
        </div>
        <div ref={bonusRef} className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5 mb-5 sm:mb-6 md:mb-10">
          {[
            { icon: Gift, title: "Bono 1: Setup asistido", desc: "Te acompañamos a cargar tus primeros pacientes y configurar Kleia a tu flujo de trabajo." },
            { icon: MessageSquare, title: "Bono 2: Canal de Expertos", desc: "Acceso a un canal privado donde puedes consultar dudas de nutrición con otros profesionales." },
            { icon: ShieldCheck, title: "Garantía: Cancelación simple", desc: "Si en los primeros 30 días no ves mejora clara, cancelas sin penalidades." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="gsap-bonus-card text-center p-3.5 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl bg-background">
              <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2.5 sm:mb-3 md:mb-4">
                <Icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1 sm:mb-1.5 md:mb-2 text-xs sm:text-sm md:text-base">{title}</h3>
              <p className="text-[11px] sm:text-xs md:text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-4">
          {[
            { icon: Star, text: "Construido a partir de 12 entrevistas" },
            { icon: CheckCircle2, text: "Cohorte piloto activa ahora" },
            { icon: Leaf, text: "Piloto cerrado: 10 plazas" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-1.5 sm:gap-2 bg-primary/10 rounded-full px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2">
              <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-primary" />
              <span className="text-[10px] sm:text-[11px] md:text-xs text-primary font-medium">{text}</span>
            </div>
          ))}
        </div>
    </div>
  );
}

// ─── Demo Form ───────────────────────────────────────────────────────────────
function DemoForm() {
  return (
    <div className="container max-w-lg mx-auto text-center">
        <div className="mb-6 md:mb-8">
          <Badge variant="outline" className="mb-3 md:mb-4 text-primary border-primary/30 bg-primary/5 text-xs uppercase tracking-widest">
            Demo
          </Badge>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif">Agenda tu demo</h2>
          <p className="text-muted-foreground mt-2 text-sm">1. Te mostramos el flujo con un caso real en 10 minutos</p>
          <p className="text-muted-foreground mt-2 text-sm">2. Si encaja, te invitamos al piloto (plazas limitadas)</p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <Button onClick={openWhatsApp} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 font-medium shadow-md w-full sm:w-auto text-base">
            Escribirnos por WhatsApp →
          </Button>
          <p className="text-xs text-muted-foreground">Acceso por invitación · Piloto cerrado: 10 plazas</p>
        </div>
    </div>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
const faqs = [
  { q: "¿Necesito saber de tecnología para usar Kleia?", a: "No. Si podés usar WhatsApp, podés usar Kleia. Te acompañamos en el setup inicial." },
  { q: "¿Qué pasa con los datos de mis pacientes?", a: "Los datos son tuyos. Kleia los usa solo para generar los planes y no los comparte con terceros." },
  { q: "¿Puedo cancelar cuando quiero?", a: "Sí. Durante el piloto podés cancelar en cualquier momento sin penalidades." },
  { q: "¿Kleia reemplaza mi criterio profesional?", a: "No. Kleia automatiza la parte mecánica, pero tú decides qué es mejor para cada paciente." },
  { q: "¿Cuándo estará disponible para todos?", a: "Estamos en piloto cerrado con 10 plazas. Si quieres ser de los primeros, escríbenos por WhatsApp." },
];

function FAQSection() {
  const faqRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = faqRef.current;
    if (!el) return;
    const items = el.querySelectorAll(".gsap-faq-item");
    gsap.set(items, { opacity: 0, y: 40 });
    const tl = gsap.to(items, {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
    });
    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);

  return (
    <div className="container max-w-3xl mx-auto">
        <div className="text-center mb-5 sm:mb-6 md:mb-10">
          <Badge variant="outline" className="mb-2 sm:mb-3 md:mb-4 text-primary border-primary/30 bg-primary/5 text-[10px] sm:text-xs uppercase tracking-widest">
            FAQ
          </Badge>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold font-serif">Preguntas frecuentes</h2>
        </div>
        <div ref={faqRef}>
          <Accordion type="single" collapsible className="space-y-1.5 sm:space-y-2">
            {faqs.map(({ q, a }, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="gsap-faq-item bg-background border border-border rounded-lg sm:rounded-xl md:rounded-2xl px-3 sm:px-3.5 md:px-4">
                <AccordionTrigger className="font-medium text-[11px] sm:text-xs md:text-sm text-left hover:no-underline py-3 sm:py-3.5 md:py-4">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-[11px] sm:text-xs md:text-sm leading-relaxed pb-3">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
    </div>
  );
}

// ─── Footer CTA ──────────────────────────────────────────────────────────────
function FooterCTA() {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const children = el.querySelectorAll(".gsap-footer-child");
    gsap.set(children, { opacity: 0, y: 50 });
    const tl = gsap.to(children, {
      opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
    });
    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);

  return (
    <footer id="seccion-12-footer" className="pt-4 md:pt-6 pb-0">
      <div ref={footerRef} className="bg-foreground px-4 sm:px-6 md:px-10 py-8 sm:py-10 md:py-16 text-center text-background">
        <div className="gsap-footer-child flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
          <img src={kleiaLogo} alt="Kleia" className="h-6 sm:h-7 md:h-8 w-auto brightness-0 invert" />
        </div>
        <h2 className="gsap-footer-child text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-serif mb-2.5 sm:mb-3 md:mb-4 leading-tight max-w-2xl mx-auto px-2">
          Recupera tu tiempo, sin perder tu criterio profesional.
        </h2>
        <p className="gsap-footer-child text-background/70 mb-5 sm:mb-6 md:mb-8 leading-relaxed max-w-xl mx-auto text-xs sm:text-sm md:text-base px-2">
          Kleia está en piloto cerrado. Solo 10 plazas disponibles.
        </p>
        <div className="gsap-footer-child">
          <Button onClick={openWhatsApp} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 rounded-full px-5 sm:px-6 md:px-8 font-medium shadow-md text-xs sm:text-sm md:text-base h-10 sm:h-11">
            Escribirnos por WhatsApp →
          </Button>
        </div>
        <p className="gsap-footer-child mt-6 sm:mt-8 md:mt-10 text-[10px] sm:text-xs text-background/40">
          © {currentYear} Kleia · Hecho con amor para nutricionistas
        </p>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Index() {
  const [loaded, setLoaded] = useState(false);

  const handleLoaded = useCallback(() => {
    setLoaded(true);
    setTimeout(() => { ScrollTrigger.refresh(); }, 150);
  }, []);

  return (
    <>
      {!loaded && <IntroLoader onComplete={handleLoaded} />}
      <div
        className="min-h-screen font-sans bg-background overflow-x-hidden"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.3s ease" }}
      >
        <Navbar />
        <main>
          <Hero />

          <section id="seccion-2-problema" className="py-12 sm:py-16 md:py-20 px-4 lg:px-6 bg-white relative">
            <AnimatedSvgBackground className="opacity-20" />
            <ProblemSection />
          </section>

          <section className="py-12 sm:py-16 md:py-20 px-4 lg:px-6 bg-white relative">
            <AnimatedSvgBackground className="opacity-15" />
            <EvidenceStrip />
          </section>

          <section id="seccion-3-resultados" className="py-12 sm:py-16 md:py-20 px-4 lg:px-6 bg-white relative">
            <AnimatedSvgBackground className="opacity-15" />
            <ResultsSection />
          </section>

          <section className="py-12 sm:py-16 md:py-20 px-4 lg:px-6 bg-white relative">
            <AnimatedSvgBackground className="opacity-20" />
            <FitSection />
          </section>

          <section id="seccion-4-flujo" className="py-12 sm:py-16 md:py-20 px-4 lg:px-6 bg-white relative">
            <AnimatedSvgBackground className="opacity-20" />
            <HowItWorksSection />
          </section>

          <section id="seccion-5-incluido" className="py-12 sm:py-16 md:py-20 px-4 lg:px-6 bg-white relative">
            <AnimatedSvgBackground className="opacity-10" />
            <FeaturesSection />
          </section>

          <section className="py-12 sm:py-16 md:py-20 px-4 lg:px-6 bg-white relative">
            <AnimatedSvgBackground className="opacity-10" />
            <ComparisonSection />
          </section>

          <section className="py-12 sm:py-16 md:py-20 px-4 lg:px-6 bg-white relative">
            <AnimatedSvgBackground className="opacity-15" />
            <StorySection />
          </section>

          <section className="py-12 sm:py-16 md:py-20 px-4 lg:px-6 bg-white relative">
            <AnimatedSvgBackground className="opacity-10" />
            <BonusesSection />
          </section>

          <section className="py-12 sm:py-16 md:py-20 px-4 lg:px-6 bg-white relative">
            <AnimatedSvgBackground className="opacity-10" />
            <DemoForm />
          </section>

          <section id="seccion-11-faq" className="py-12 sm:py-16 md:py-20 px-4 lg:px-6 bg-white relative">
            <AnimatedSvgBackground className="opacity-10" />
            <FAQSection />
          </section>
        </main>
        <FooterCTA />
      </div>
    </>
  );
}
