import kleiaLogo from "@/assets/kleia-logo.svg";
import problemaIlustracion from "@/assets/problema-ilustracion.png";
import problema1 from "@/assets/problema-1.png";
import problema2 from "@/assets/problema-2.png";
import problema3 from "@/assets/problema-3.png";
import problema4 from "@/assets/problema-4.png";
import resultadosIlustracion from "@/assets/resultados-ilustracion.png";
import card1Img from "@/assets/kleiacard_1.png";
import card2Img from "@/assets/kleiacard_2.png";
import card3Img from "@/assets/kleiacard_3.png";
import storyImg1 from "@/assets/story_image_1.png";
import storyImg2 from "@/assets/story_image_2.png";
import storyImg3 from "@/assets/story_image_3.png";
import React, { useState, useEffect } from "react";
import { useInView } from "@/hooks/use-in-view";

// Wrapper que aplica fade-in al entrar en el viewport
function FadeSection({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      id={id}
      className={`transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
    >
      {children}
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
} from "lucide-react";

const scrollToForm = () => {
  document.getElementById("agendar-demo")?.scrollIntoView({ behavior: "smooth" });
};

// ─── S0 · Navbar ─────────────────────────────────────────────────────────────
const navLinks = [
  { label: "El problema",  id: "seccion-2-problema" },
  { label: "Resultados",   id: "seccion-3-resultados" },
  { label: "Cómo funciona",id: "seccion-4-flujo" },
  { label: "Incluido",     id: "seccion-5-incluido" },
  { label: "FAQ",          id: "seccion-11-faq" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header id="seccion-0-navbar" className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container max-w-5xl mx-auto flex items-center justify-between h-14 md:h-16 px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <img src={kleiaLogo} alt="Kleia" className="h-7 md:h-8 w-auto" />
        </div>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-1 bg-muted rounded-full px-2 py-1.5">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-card rounded-full px-3 py-1.5 transition-all"
            >
              {label}
            </button>
          ))}
        </nav>

        {/* CTA + mobile menu toggle */}
        <div className="flex items-center gap-2">
          <Button
            onClick={scrollToForm}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-4 md:px-5 text-xs md:text-sm font-medium shadow-sm h-8 md:h-9"
          >
            Agendar demo
          </Button>
          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1.5 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
          >
            <span className={`block w-5 h-0.5 bg-foreground transition-transform ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-foreground transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav className="md:hidden border-t border-border bg-white/95 backdrop-blur px-4 py-3 flex flex-col gap-0">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => { scrollTo(id); setOpen(false); }}
              className="text-sm text-muted-foreground hover:text-foreground text-left transition-colors py-2.5 border-b border-border/40 last:border-b-0"
            >
              {label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

// ─── S1 · Hero ───────────────────────────────────────────────────────────────
const TOTAL_PLAZAS = 10;

function usePlazasCounter() {
  const [plazas, setPlazas] = useState(TOTAL_PLAZAS);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    // Simula que alguien reserva una plaza cada 45–120 segundos
    function scheduleNext() {
      const delay = Math.random() * 75_000 + 45_000; // 45s – 120s
      return setTimeout(() => {
        setPlazas((prev) => {
          if (prev <= 1) return prev; // nunca llegar a 0
          setFlash(true);
          setTimeout(() => setFlash(false), 800);
          return prev - 1;
        });
        scheduleNext();
      }, delay);
    }
    const id = scheduleNext();
    return () => clearTimeout(id);
  }, []);

  return { plazas, flash };
}

function Hero() {
  const { plazas, flash } = usePlazasCounter();

  return (
    <section id="seccion-1-hero" className="bg-white px-4 md:px-6 pt-12 md:pt-20 pb-0 overflow-hidden">
      <div className="container max-w-5xl mx-auto flex flex-col">
        {/* Texto + CTA */}
        <div className="text-center pb-8 md:pb-12">
          <div className="inline-block mb-4 md:mb-6 max-w-[90vw]">
            <span className="bg-primary/10 text-primary text-[11px] md:text-xs font-medium px-3 md:px-4 py-1.5 md:py-2 rounded-full leading-snug">
              Para nutricionistas con agenda llena que quieren volver a tener control de su tiempo
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight mb-4 md:mb-6 text-foreground px-2">
            Dejá de pensar en menús.<br />
            <span className="text-primary">Terminá tu día con todos los planes enviados.</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto px-2">
            Kleia es el asistente de planificación nutricional que genera planes personalizados en minutos,
            respetando las preferencias de cada paciente, sin que tengas que empezar desde cero cada vez.
          </p>
          <div className="relative inline-block">
            <Button
              onClick={scrollToForm}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 md:px-8 text-sm md:text-base font-medium shadow-md"
            >
              Agendar demo →
            </Button>
            <span
              className={`absolute -top-2.5 -right-2 bg-success text-success-foreground text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap transition-transform duration-200 ${flash ? "scale-125" : "scale-100"}`}
            >
              {plazas} plazas
            </span>
          </div>
          {/* Live counter */}
          <div className="mt-4 md:mt-5 flex items-center justify-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive" />
            </span>
            <p className="text-xs text-muted-foreground">
              <span className={`font-semibold text-foreground tabular-nums transition-all duration-300 ${flash ? "text-destructive" : ""}`}>
                {plazas} plazas disponibles
              </span>
              {" "}· Piloto cerrado · Acceso por invitación
            </p>
          </div>
        </div>

        {/* Mockup del producto */}
        <div className="w-full rounded-t-2xl md:rounded-t-3xl bg-muted border border-border border-b-0 min-h-[220px] md:min-h-[420px] flex items-center justify-center overflow-hidden">
          <p className="text-muted-foreground text-sm">[ Product mockup ]</p>
        </div>
      </div>
    </section>
  );
}


// ─── Problem ─────────────────────────────────────────────────────────────────
const problems = [
  {
    icon: Brain,
    title: "Estoy hasta arriba de hacer menús",
    description:
      "Se te acaban las ideas y la cabeza no da para más. No es difícil: es un desgaste diario que te deja sin paciencia.",
  },
  {
    icon: Sliders,
    title: "No quiero ideas al tuntún: tiene que encajar con MI paciente",
    description:
      "Variedad sí, pero con sentido clínico y realista: gustos, patologías, intolerancias, horarios y comida que pueda hacer y encontrar sin complicarse.",
  },
  {
    icon: RefreshCw,
    title: "Tocas una cosa… y se descompensa todo",
    description:
      "Cambias un ingrediente y se mueven calorías/macros (y el resto del día). Acabas recomponiendo comidas para que el plan vuelva a cuadrar.",
  },
  {
    icon: BatteryLow,
    title: "El plan se te mete en la noche y el finde",
    description:
      'Atiendes todo el día y el plan cae "para después". Se acumula, lo haces a ratos o en domingo… y a veces se te va a varios días.',
  },
];

// ─── S2 · El Problema ────────────────────────────────────────────────────────
const problemImages = [problemaIlustracion, problema1, problema2, problema3, problema4];

// Posiciones de las 5 fotos en el círculo (en grados, 0 = arriba)
const imagePositions = [270, 342, 54, 126, 198]; // top, top-right, bottom-right, bottom-left, top-left

function ProblemSection() {
  const circleR = 130;
  const cx = 200;
  const cy = 200;
  const svgSize = 400;

  return (
    <section id="seccion-2-problema" className="py-4 md:py-6 px-4 md:px-6">
      <div className="container max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm p-5 md:p-10">
          <div className="text-center mb-6 md:mb-10">
            <Badge variant="outline" className="mb-3 md:mb-4 text-primary border-primary/30 bg-primary/5 text-xs uppercase tracking-widest">
              El Problema
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif">¿Te suena familiar?</h2>
          </div>

          {/* Mobile: stack de cards + SVG compacto al centro */}
          <div className="flex flex-col md:hidden gap-3">
            {/* SVG compacto — solo el círculo de fotos, sin las flechas laterales */}
            <div className="w-full max-w-[240px] mx-auto">
              <svg viewBox="0 0 400 400" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  {problemImages.map((_, i) => (
                    <clipPath key={i} id={`clip-img-m-${i}`}>
                      <circle cx="0" cy="0" r="38" />
                    </clipPath>
                  ))}
                </defs>
                <circle cx={cx} cy={cy} r={circleR} fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.12" strokeDasharray="6 5" />
                {imagePositions.map((angleDeg, i) => {
                  const rad = (angleDeg * Math.PI) / 180;
                  const ix = cx + circleR * Math.cos(rad);
                  const iy = cy + circleR * Math.sin(rad);
                  return (
                    <g key={i} transform={`translate(${ix}, ${iy})`}>
                      <circle r="40" fill="white" opacity="0.9" />
                      <image href={problemImages[i]} x="-38" y="-38" width="76" height="76" clipPath={`url(#clip-img-m-${i})`} preserveAspectRatio="xMidYMid slice" />
                      <circle r="40" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.2" />
                    </g>
                  );
                })}
              </svg>
            </div>
            {/* 4 problem cards en stack */}
            {problems.map(({ icon: Icon, title, description }) => (
              <div key={title} className="group p-4 rounded-xl bg-background border border-border/60 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 shadow-sm">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm leading-snug text-foreground">{title}</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed pl-[38px]">{description}</p>
              </div>
            ))}
          </div>

          {/* Desktop: layout 3 columnas original */}
          <div className="hidden md:flex md:flex-row items-center gap-6">
            {/* Columna izquierda: 2 problemas */}
            <div className="flex-1 flex flex-col gap-4">
              {problems.slice(0, 2).map(({ icon: Icon, title, description }) => (
                <div key={title} className="group p-5 rounded-2xl bg-background border border-border/60 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 shadow-sm">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm leading-snug text-foreground">{title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed pl-[38px]">{description}</p>
                </div>
              ))}
            </div>

            {/* Centro: SVG completo con flechas */}
            <div className="flex-shrink-0 w-full md:w-[400px]">
              <svg viewBox={`0 0 ${svgSize} ${svgSize}`} className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="arr-l" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                    <path d="M 0 1 L 9 5 L 0 9 z" fill="hsl(var(--primary))" opacity="0.4" />
                  </marker>
                  <marker id="arr-r" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                    <path d="M 10 1 L 1 5 L 10 9 z" fill="hsl(var(--primary))" opacity="0.4" />
                  </marker>
                  {problemImages.map((_, i) => (
                    <clipPath key={i} id={`clip-img-${i}`}>
                      <circle cx="0" cy="0" r="38" />
                    </clipPath>
                  ))}
                </defs>
                <circle cx={cx} cy={cy} r={circleR} fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.12" strokeDasharray="6 5" />
                <path d={`M 0 110 C 30 110 60 ${cy - 60} ${cx - circleR + 10} ${cy - 50}`} stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="5 4" strokeLinecap="round" fill="none" opacity="0.4" markerEnd="url(#arr-l)" />
                <path d={`M 0 290 C 30 290 60 ${cy + 60} ${cx - circleR + 10} ${cy + 50}`} stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="5 4" strokeLinecap="round" fill="none" opacity="0.4" markerEnd="url(#arr-l)" />
                <path d={`M ${svgSize} 110 C ${svgSize - 30} 110 ${svgSize - 60} ${cy - 60} ${cx + circleR - 10} ${cy - 50}`} stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="5 4" strokeLinecap="round" fill="none" opacity="0.4" markerEnd="url(#arr-r)" />
                <path d={`M ${svgSize} 290 C ${svgSize - 30} 290 ${svgSize - 60} ${cy + 60} ${cx + circleR - 10} ${cy + 50}`} stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="5 4" strokeLinecap="round" fill="none" opacity="0.4" markerEnd="url(#arr-r)" />
                {imagePositions.map((angleDeg, i) => {
                  const rad = (angleDeg * Math.PI) / 180;
                  const ix = cx + circleR * Math.cos(rad);
                  const iy = cy + circleR * Math.sin(rad);
                  return (
                    <g key={i} transform={`translate(${ix}, ${iy})`}>
                      <circle r="40" fill="white" opacity="0.9" />
                      <image href={problemImages[i]} x="-38" y="-38" width="76" height="76" clipPath={`url(#clip-img-${i})`} preserveAspectRatio="xMidYMid slice" />
                      <circle r="40" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.2" />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Columna derecha: 2 problemas */}
            <div className="flex-1 flex flex-col gap-4">
              {problems.slice(2).map(({ icon: Icon, title, description }) => (
                <div key={title} className="group p-5 rounded-2xl bg-background border border-border/60 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 shadow-sm">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm leading-snug text-foreground">{title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed pl-[38px]">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── S2b · Voces Reales (Evidence Strip) ─────────────────────────────────────
const evidenceCards = [
  {
    profile: "Nutrióloga · Madrid, ES",
    pain: "Domingos de planes",
    quote: "Se me cuela al finde, y me deja sin vida.",
    city: "Madrid (ES)",
  },
  {
    profile: "Nutrióloga · Valencia, ES",
    pain: "Variedad agotadora",
    quote: "Entre decidir y ejecutar, acabo repitiendo lo de siempre.",
    city: "Valencia (ES)",
  },
  {
    profile: "Nutrióloga · CDMX, MX",
    pain: "Cambios que descuadran",
    quote: "Cambio una cosa y se descompensa todo.",
    city: "CDMX (MX)",
  },
  {
    profile: "Nutrióloga · Lima, PE",
    pain: "Edición eterna",
    quote: "Siempre hay que retocar algo antes de enviarlo.",
    city: "Lima (PE)",
  },
  {
    profile: "Nutrióloga · Tegucigalpa, HN",
    pain: "Local vs irreal",
    quote: "No quiero recetas raras: quiero algo que se pueda hacer aquí.",
    city: "Tegucigalpa (HN)",
  },
  {
    profile: "Nutrióloga · (Ciudad), (País)",
    pain: "Entrega lenta",
    quote: "Se me junta todo y lo mando días después.",
    city: "(Ciudad)",
  },
];

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
  "(Ciudad)": {
    quote: "Siempre hay algo pendiente de mandar.",
    profile: "Nutrióloga · (Ciudad), (País)",
    summary: "Acumulación de pendientes + entrega tardía.",
  },
};

const cityChips = Object.keys(cityQuotes);

function EvidenceStrip() {
  const [activeChip, setActiveChip] = useState(cityChips[0]);
  const [visible, setVisible] = useState(true);

  const handleChip = (chip: string) => {
    if (chip === activeChip) return;
    setVisible(false);
    setTimeout(() => {
      setActiveChip(chip);
      setVisible(true);
    }, 180);
  };

  const active = cityQuotes[activeChip];

  return (
    <section className="py-6 md:py-10 px-4 md:px-6 bg-muted/30">
      <div className="container max-w-5xl mx-auto space-y-6 md:space-y-8">

        {/* Header */}
        <div className="text-center space-y-1">
          <h3 className="text-lg md:text-2xl font-bold font-serif text-foreground">
            Hecho con 12 nutricionistas
          </h3>
          <p className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-widest">
            Sin nombres. Con contexto real.
          </p>
          <p className="text-xs md:text-sm text-muted-foreground max-w-md mx-auto pt-1">
            Kleia no salió de una idea bonita. Salió de escuchar lo mismo una y otra vez.
          </p>
        </div>

        {/* Mini-cards strip — horizontal scroll en mobile */}
        <div className="-mx-4 md:mx-0 px-4 md:px-0">
          <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory md:flex-wrap md:overflow-x-visible md:pb-0 md:justify-center scrollbar-hide">
            {evidenceCards.map((card, i) => (
              <div
                key={i}
                className="snap-start shrink-0 w-44 md:w-44 bg-card border border-border rounded-xl p-3 md:p-4 space-y-2 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200"
              >
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide leading-tight">
                  {card.profile}
                </p>
                <p className="text-xs font-semibold text-foreground">
                  Dolor: <span className="font-normal text-primary">{card.pain}</span>
                </p>
                <p className="text-xs text-foreground/80 leading-snug italic">
                  <span className="text-muted-foreground text-base leading-none mr-0.5">"</span>
                  {card.quote}
                  <span className="text-muted-foreground text-base leading-none ml-0.5">"</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Chips + Quote block */}
        <div className="space-y-4 md:space-y-5">
          {/* City chips */}
          <div className="flex flex-wrap gap-2 justify-center">
            {cityChips.map((chip) => (
              <button
                key={chip}
                onClick={() => handleChip(chip)}
                aria-pressed={activeChip === chip}
                className={[
                  "rounded-full px-3 py-1.5 text-xs font-medium border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  activeChip === chip
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground",
                ].join(" ")}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Quote destacada */}
          <div
            className="bg-card border border-border rounded-2xl p-5 md:p-8 text-center space-y-2 md:space-y-3 shadow-sm transition-opacity duration-200"
            style={{ opacity: visible ? 1 : 0 }}
            aria-live="polite"
          >
            <p className="text-base md:text-xl font-serif font-semibold text-foreground leading-snug">
              <span className="text-primary text-xl md:text-2xl leading-none">"</span>
              {active.quote}
              <span className="text-primary text-xl md:text-2xl leading-none">"</span>
            </p>
            <p className="text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-widest">
              {active.profile}
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Resumen:</span> {active.summary}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Results ─────────────────────────────────────────────────────────────────
const stats = [
  { value: "Menú que encaja de verdad", label: "realista y clínico", time: "+10''", desc: "Platos que cuadran con el caso y con su día a día (sin ideas al tuntún ni ingredientes imposibles)." },
  { value: "Plan completo", label: "sin hoja en blanco", time: "+20''", desc: 'Pasas de "\u00bfqué le pongo?" a un plan base listo, generado a partir de restricciones, objetivos y contexto.' },
  { value: "Ajuste fino", label: "sin descompensar el plan", time: "+15''", desc: "Cambias un ingrediente y Kleia recalcula el plan para que las macros/calorías sigan cuadrando." },
  { value: "Entrega al paciente", label: "", time: "+7''", desc: "PDF listo + lista de compra agrupada para enviar por WhatsApp/email/enlace sin pasos extra." },
];

// ─── S3 · Resultados ─────────────────────────────────────────────────────────
function ResultsSection() {
  const { ref, inView } = useInView(0.25);
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Phase state: 0 = idle, 1..4 = card i arrived, 5 = all done
  const [phase, setPhase] = useState(0);
  const [metricPulse, setMetricPulse] = useState(false);

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) { setPhase(5); return; }

    // Stagger: card reveals at 0.5s intervals, each "arrives" 0.65s later
    const timers: ReturnType<typeof setTimeout>[] = [];
    [0, 1, 2, 3].forEach((i) => {
      timers.push(
        setTimeout(() => {
          setPhase(i + 1);
          setMetricPulse(true);
          setTimeout(() => setMetricPulse(false), 500);
        }, 500 + i * 500)
      );
    });
    // final emphasis
    timers.push(setTimeout(() => setPhase(5), 500 + 3 * 500 + 600));
    return () => timers.forEach(clearTimeout);
  }, [inView, reducedMotion]);

  const cardVisible = (i: number) => inView && (reducedMotion || phase >= i + 1);
  const cardDone = (i: number) => phase === 5;

  // Contador: 0 → 2 → 4 → 5 → 6+ según el phase
  const hourValues = ["0", "2", "4", "5", "6+"];
  const displayHours = hourValues[Math.min(phase, 4)];

  return (
    <section
      id="seccion-3-resultados"
      className="py-4 md:py-6 px-4 md:px-6"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm p-5 md:p-10">
          <div className="text-center mb-6 md:mb-10">
            <Badge variant="outline" className="mb-3 md:mb-4 text-primary border-primary/30 bg-primary/5 text-xs uppercase tracking-widest">
              RESULTADOS CON KLEIA
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif">
              Menos carga, más control
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">

            {/* ── Imagen + métrica destino ── */}
            <div className="flex-shrink-0 w-full md:w-72 flex flex-col items-center">
              <img
                src={resultadosIlustracion}
                alt="Nutricionista usando Kleia"
                className="w-full max-w-[220px] md:max-w-none object-contain"
              />
              <div className="mt-4 text-center">
                {/* Métrica "destino" — pulsa cada vez que llega una card */}
                <p
                  className={[
                    "text-4xl font-bold font-serif transition-all duration-300",
                    phase === 5 ? "scale-110" : "",
                    metricPulse && !reducedMotion ? "scale-110" : "scale-100",
                  ].join(" ")}
                  style={{
                    transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease, color 0.25s ease",
                    opacity: inView ? 1 : 0,
                    color: metricPulse && !reducedMotion
                      ? "hsl(142 71% 45%)"
                      : "hsl(var(--primary))",
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

                {/* Indicadores de progreso — uno por card */}
                <div className="flex gap-1.5 justify-center mt-4">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-1 rounded-full transition-all duration-500"
                      style={{
                        width: phase > i ? "20px" : "6px",
                        backgroundColor: phase > i ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.2)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ── Columna derecha: 4 cards animadas ── */}
            <div className="flex-1 flex flex-col gap-3">
              <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                detalles que nos importan
              </p>
              {stats.map(({ value, label, time, desc }, i) => {
                const visible = cardVisible(i);
                const done = cardDone(i);
                return (
                  <div
                    key={value}
                    className="flex rounded-xl overflow-hidden border shadow-sm transition-all"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible
                        ? reducedMotion
                          ? "none"
                          : "translateX(0) scale(1)"
                        : "translateX(32px) scale(0.97)",
                      transitionProperty: "opacity, transform, border-color",
                      transitionDuration: reducedMotion ? "0ms" : "520ms",
                      transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
                      transitionDelay: reducedMotion ? "0ms" : `${i * 90}ms`,
                      borderColor: "hsl(var(--border))",
                    }}
                  >
                    {/* Panel lila — 1/3 */}
                    <div className="flex flex-col items-center justify-center bg-primary/10 py-4 px-3 w-1/3 shrink-0 gap-1.5">
                      <p className="text-[0.75rem] font-bold font-serif text-primary text-center leading-snug">{value}</p>
                      {label && (
                        <p className="text-[0.55rem] font-semibold text-primary/70 text-center leading-tight">{label}</p>
                      )}
                      <div className="flex items-center gap-1 mt-0.5 bg-primary/20 rounded-full px-2 py-0.5">
                        <Clock className="h-2.5 w-2.5 text-primary" />
                        <span className="text-[0.6rem] font-bold text-primary">{time}</span>
                      </div>
                    </div>
                    {/* Panel blanco — 2/3 */}
                    <div className="flex items-center bg-white px-4 py-3 w-2/3">
                      <p className="text-xs text-muted-foreground leading-snug">{desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
const steps = [
  {
    num: "01",
    title: "Carga lo mínimo",
    desc: "Ingresá las restricciones, preferencias y objetivos del paciente una sola vez. Kleia los recuerda siempre.",
    image: null as string | null,
  },
  {
    num: "02",
    title: "Generá el plan",
    desc: "Con un click, Kleia crea un plan semanal completo, balanceado y adaptado al perfil del paciente.",
    image: null as string | null,
  },
  {
    num: "03",
    title: "Ajustá sin descuadres",
    desc: "Cambiá cualquier alimento y el sistema recalcula calorías y macros automáticamente en tiempo real.",
    image: null as string | null,
  },
  {
    num: "04",
    title: "Entregá en 1 click",
    desc: "Exportá el plan como PDF listo para compartir. Sin formatear, sin copiar y pegar.",
    image: null as string | null,
  },
];

// Shah-mat vertical offsets per card (desktop, px)
const STEP_OFFSETS = [0, 36, -36, 0];

// ─── S4 · Cómo funciona ──────────────────────────────────────────────────────
function HowItWorksSection() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);
  const basePathRef = React.useRef<SVGPathElement>(null);
  const progressPathRef = React.useRef<SVGPathElement>(null);
  const dotRef = React.useRef<SVGCircleElement>(null);

  const [activeStep, setActiveStep] = useState(-1);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [svgPath, setSvgPath] = useState("");
  const [svgDims, setSvgDims] = useState({ w: 800, h: 600 });

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ── Compute S-curve SVG path from actual card DOM positions ───────────────
  function computePath(): string {
    const grid = gridRef.current;
    if (!grid) return "";
    const cards = Array.from(grid.children) as HTMLElement[];
    if (cards.length < 4) return "";
    const gridRect = grid.getBoundingClientRect();

    // Anchor point: top-center of step number area (~18% from card top)
    const pts = cards.map((card) => {
      const r = card.getBoundingClientRect();
      return {
        x: r.left - gridRect.left + r.width / 2,
        y: r.top - gridRect.top + r.height * 0.18,
      };
    });

    const [p0, p1, p2, p3] = pts;

    // Segment 01→02: smooth rightward arc
    const cx12 = (p0.x + p1.x) / 2;
    const seg1 = `C ${cx12},${p0.y} ${cx12},${p1.y} ${p1.x},${p1.y}`;

    // Segment 02→03: diagonal S drop
    const cy23 = (p1.y + p2.y) / 2;
    const seg2 = `C ${p1.x},${cy23} ${p2.x},${cy23} ${p2.x},${p2.y}`;

    // Segment 03→04: smooth rightward arc upward
    const cx34 = (p2.x + p3.x) / 2;
    const seg3 = `C ${cx34},${p2.y} ${cx34},${p3.y} ${p3.x},${p3.y}`;

    return `M ${p0.x},${p0.y} ${seg1} ${seg2} ${seg3}`;
  }

  function refreshSvg() {
    const grid = gridRef.current;
    if (!grid) return;
    const r = grid.getBoundingClientRect();
    setSvgDims({ w: r.width, h: r.height + 80 });
    setSvgPath(computePath());
  }

  // Recompute on mount + resize
  useEffect(() => {
    const t = setTimeout(refreshSvg, 120);
    window.addEventListener("resize", refreshSvg);
    return () => { clearTimeout(t); window.removeEventListener("resize", refreshSvg); };
  }, []);

  // ── IntersectionObserver — play once ─────────────────────────────────────
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed) {
          refreshSvg();
          setTimeout(() => runAnimation(), 150);
          setHasPlayed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasPlayed]);

  // ── Animation engine ──────────────────────────────────────────────────────
  function runAnimation() {
    if (reducedMotion) { setActiveStep(4); return; }

    const basePath = basePathRef.current;
    const progressPath = progressPathRef.current;
    const dot = dotRef.current;
    if (!basePath || !progressPath || !dot) return;

    const totalLength = basePath.getTotalLength();
    if (!totalLength) return;

    // A) Line draw
    const dashArray = "5 8";
    basePath.style.strokeDasharray = dashArray;
    basePath.style.strokeDashoffset = String(totalLength * 4);
    basePath.style.transition = "none";
    void basePath.getBoundingClientRect();
    basePath.style.transition = "stroke-dashoffset 2.0s cubic-bezier(0.65,0,0.35,1)";
    basePath.style.strokeDashoffset = "0";

    // B+C) Dot + progress trail
    const DOT_DURATION = 2400;
    const DOT_DELAY = 150;
    progressPath.style.strokeDasharray = String(totalLength);
    progressPath.style.strokeDashoffset = String(totalLength);

    const stepFractions = [0.05, 0.38, 0.65, 0.93];
    let nextStep = 0;
    const startTime = performance.now() + DOT_DELAY;
    let rafId: number;

    function frame(now: number) {
      const elapsed = now - startTime;
      if (elapsed < 0) { rafId = requestAnimationFrame(frame); return; }

      const t = Math.min(elapsed / DOT_DURATION, 1);
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const dist = eased * totalLength;

      const pt = basePath.getPointAtLength(dist);
      dot.setAttribute("cx", String(pt.x));
      dot.setAttribute("cy", String(pt.y));
      dot.style.opacity = "1";

      progressPath.style.strokeDashoffset = String(totalLength - dist);

      // Pulse radius
      dot.setAttribute("r", String(5 + Math.sin(elapsed / 200) * 1.2));

      while (nextStep < stepFractions.length && eased >= stepFractions[nextStep]) {
        setActiveStep(nextStep);
        nextStep++;
      }

      if (t < 1) {
        rafId = requestAnimationFrame(frame);
      } else {
        setActiveStep(4);
        dot.setAttribute("r", "5");
      }
    }

    rafId = requestAnimationFrame(frame);
  }

  const isHighlighted = (i: number) => reducedMotion ? true : activeStep >= i;

  // ── Card sub-component ────────────────────────────────────────────────────
  function StepCard({
    num, title, desc, image, highlighted, style,
  }: {
    num: string; title: string; desc: string; image: string | null;
    highlighted: boolean; style?: React.CSSProperties;
  }) {
    return (
      <div
        className="relative z-10 flex flex-col p-5 md:p-7 rounded-2xl transition-all duration-500"
        style={{
          backgroundColor: highlighted ? "hsl(var(--primary) / 0.06)" : "hsl(var(--card))",
          borderWidth: "1.5px",
          borderStyle: "solid",
          borderColor: highlighted ? "hsl(var(--primary) / 0.40)" : "hsl(var(--border))",
          boxShadow: highlighted
            ? "0 4px 24px -4px hsl(var(--primary) / 0.14), 0 0 0 3px hsl(var(--primary) / 0.07)"
            : "0 1px 6px hsl(var(--foreground) / 0.04)",
          ...style,
        }}
      >
        <div className="flex items-start justify-between mb-4 md:mb-6">
          <span
            className="text-4xl md:text-5xl font-bold font-serif leading-none transition-colors duration-500"
            style={{ color: highlighted ? "hsl(var(--primary) / 0.40)" : "hsl(var(--primary) / 0.15)" }}
          >
            {num}
          </span>
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl overflow-hidden flex-shrink-0 bg-muted border border-border flex items-center justify-center">
            {image ? (
              <img src={image} alt={title} className="w-full h-full object-cover" />
            ) : (
              <span className="text-muted-foreground/30 text-[10px] font-medium">img</span>
            )}
          </div>
        </div>
        <div className="mt-auto">
          <h3 className="font-semibold mb-1.5 md:mb-2 text-sm md:text-base text-foreground">{title}</h3>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{desc}</p>
        </div>
      </div>
    );
  }

  return (
    <section id="seccion-4-flujo" className="py-4 md:py-6 px-4 md:px-6" ref={sectionRef}>
      <div className="container max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm p-5 md:p-10">
          <div className="text-center mb-8 md:mb-12">
            <Badge variant="outline" className="mb-3 md:mb-4 text-primary border-primary/30 bg-primary/5 text-xs uppercase tracking-widest">
              Flujo
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif">Cómo funciona</h2>
          </div>

          {/* ── DESKTOP: Shah-mat 2×2 + SVG S-curve overlay ── */}
          <div className="hidden md:block">
            <div className="relative" style={{ paddingBottom: 48 }}>
              {svgPath && (
                <svg
                  className="absolute top-0 left-0 pointer-events-none z-0 overflow-visible"
                  aria-hidden="true"
                  style={{ width: svgDims.w, height: svgDims.h }}
                >
                  <path ref={basePathRef} d={svgPath} fill="none" stroke="hsl(var(--primary) / 0.20)" strokeWidth="2" strokeDasharray="5 8" strokeLinecap="round" style={{ strokeDashoffset: reducedMotion ? "0" : "99999" }} />
                  <path ref={progressPathRef} d={svgPath} fill="none" stroke="hsl(var(--primary) / 0.32)" strokeWidth="2.5" strokeDasharray="5 8" strokeLinecap="round" style={{ strokeDashoffset: "99999" }} />
                  {!reducedMotion && (
                    <circle ref={dotRef} cx="-200" cy="-200" r="5" fill="hsl(var(--primary))" style={{ opacity: 0, filter: "drop-shadow(0 0 5px hsl(var(--primary) / 0.55))" }} />
                  )}
                </svg>
              )}
              <div ref={gridRef} className="grid grid-cols-2 gap-8">
                <StepCard {...steps[0]} highlighted={isHighlighted(0)} style={{ marginTop: STEP_OFFSETS[0] }} />
                <StepCard {...steps[1]} highlighted={isHighlighted(1)} style={{ marginTop: STEP_OFFSETS[1] }} />
                <StepCard {...steps[2]} highlighted={isHighlighted(2)} style={{ marginTop: STEP_OFFSETS[2] }} />
                <StepCard {...steps[3]} highlighted={isHighlighted(3)} style={{ marginTop: STEP_OFFSETS[3] }} />
              </div>
            </div>
          </div>

          {/* ── MOBILE: 2 columns grid + vertical connector ── */}
          <div className="md:hidden">
            <div className="grid grid-cols-2 gap-3">
              {steps.map(({ num, title, desc, image }, i) => (
                <StepCard key={num} num={num} title={title} desc={desc} image={image} highlighted={isHighlighted(i)} />
              ))}
            </div>
            {/* Simple vertical flow indicator below the grid */}
            <div className="flex items-center justify-center gap-2 mt-4" aria-hidden="true">
              {steps.map((s, i) => (
                <React.Fragment key={s.num}>
                  <span
                    className="text-[10px] font-bold rounded-full px-2 py-0.5 transition-all duration-300"
                    style={{
                      backgroundColor: isHighlighted(i) ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.15)",
                      color: isHighlighted(i) ? "hsl(var(--primary-foreground))" : "hsl(var(--primary) / 0.5)",
                    }}
                  >
                    {s.num}
                  </span>
                  {i < steps.length - 1 && (
                    <span className="text-muted-foreground/40 text-xs">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────
const features = [
  "Generación de planes semanales en minutos",
  "Adaptación automática a restricciones y alergias",
  "Recalculo instantáneo de macros al hacer cambios",
  "Biblioteca de alimentos con valores nutricionales",
  "Exportación PDF lista para compartir",
  "Historial por paciente accesible en todo momento",
  "Acceso desde cualquier dispositivo, sin instalación",
  "Soporte dedicado durante el piloto",
];

// ─── S5 · Qué incluye ────────────────────────────────────────────────────────
function FeaturesSection() {
  return (
    <section id="seccion-5-incluido" className="py-4 md:py-6 px-4 md:px-6">
      <div className="container max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm p-5 md:p-10">
          <div className="text-center mb-6 md:mb-10">
            <Badge variant="outline" className="mb-3 md:mb-4 text-primary border-primary/30 bg-primary/5 text-xs uppercase tracking-widest">
              Incluido
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif">Qué incluye Kleia</h2>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
            {/* Mockup placeholder — hidden on mobile to save space */}
            <div className="hidden md:flex flex-shrink-0 w-full md:w-80 h-72 md:h-96 rounded-2xl bg-muted border border-border items-center justify-center">
              <p className="text-muted-foreground text-sm">[ Product mockup ]</p>
            </div>

            {/* Features como pills + CTA */}
            <div className="flex-1 flex flex-col gap-2">
              {features.map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-2.5 md:gap-3 bg-primary/8 hover:bg-primary/15 text-primary border border-primary/20 rounded-full px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-medium transition-colors cursor-default"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 md:h-4 md:w-4 flex-shrink-0" />
                  {f}
                </span>
              ))}
              <div className="mt-4">
                <Button
                  onClick={scrollToForm}
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 md:px-8 text-sm md:text-base font-medium shadow-md w-full sm:w-auto"
                >
                  Jugar con Kleia →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Comparison Table ─────────────────────────────────────────────────────────
const comparisonRows = [
  { feature: "Personalizado por paciente", excel: false, avena: "Parcial", artesanal: true, kleia: true },
  { feature: "Recalculo automático de macros", excel: false, avena: true, artesanal: false, kleia: true },
  { feature: "Sin horas de trabajo manual", excel: false, avena: false, artesanal: false, kleia: true },
  { feature: "Exportación PDF profesional", excel: false, avena: true, artesanal: false, kleia: true },
  { feature: "Historial por paciente", excel: "Parcial", avena: true, artesanal: false, kleia: true },
  { feature: "Ajustes sin descuadres", excel: false, avena: "Parcial", artesanal: false, kleia: true },
  { feature: "Sin curva de aprendizaje larga", excel: false, avena: false, artesanal: true, kleia: true },
  { feature: "Toque humano del nutricionista", excel: true, avena: false, artesanal: true, kleia: true },
];

function CellValue({ val }: { val: boolean | string }) {
  if (val === true) return <Check className="h-4 w-4 text-teal mx-auto" />;
  if (val === false) return <X className="h-4 w-4 text-destructive mx-auto" />;
  return <span className="text-xs text-muted-foreground">{val}</span>;
}

// ─── S6 · Comparativa ────────────────────────────────────────────────────────
function ComparisonSection() {
  return (
    <section id="seccion-6-comparativa" className="py-4 md:py-6 px-4 md:px-6">
      <div className="container max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm p-5 md:p-10">
          <div className="text-center mb-6 md:mb-10">
            <Badge variant="outline" className="mb-3 md:mb-4 text-primary border-primary/30 bg-primary/5 text-xs uppercase tracking-widest">
              Comparativa
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif">¿Por qué Kleia y no otra cosa?</h2>
          </div>
          {/* Table wrapper — horizontal scroll on mobile */}
          <div className="-mx-5 md:mx-0 overflow-x-auto">
            <div className="min-w-[540px] md:min-w-0 px-5 md:px-0">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-2.5 md:p-4 text-muted-foreground font-medium text-xs md:text-sm">Funcionalidad</th>
                    <th className="p-2.5 md:p-4 text-center text-muted-foreground font-medium text-xs md:text-sm">Excel</th>
                    <th className="p-2.5 md:p-4 text-center text-muted-foreground font-medium text-xs md:text-sm">Avena</th>
                    <th className="p-2.5 md:p-4 text-center text-muted-foreground font-medium text-xs md:text-sm">Artesanal</th>
                    <th className="p-2.5 md:p-4 text-center bg-primary/8 rounded-t-xl">
                      <div className="flex items-center justify-center py-0.5">
                        <img src={kleiaLogo} alt="Kleia" className="h-5 md:h-7 w-auto" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map(({ feature, excel, avena, artesanal, kleia }, i) => (
                    <tr key={feature} className={i % 2 === 0 ? "bg-background/60" : ""}>
                      <td className="p-2.5 md:p-4 text-foreground/80 text-xs md:text-sm">{feature}</td>
                      <td className="p-2.5 md:p-4 text-center"><CellValue val={excel} /></td>
                      <td className="p-2.5 md:p-4 text-center"><CellValue val={avena} /></td>
                      <td className="p-2.5 md:p-4 text-center"><CellValue val={artesanal} /></td>
                      <td className="p-2.5 md:p-4 text-center bg-success/5"><CellValue val={kleia} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Fit Section ──────────────────────────────────────────────────────────────

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
    withKleia: "Plan en 10–20 min, ajustes en 1–3 min y entrega en 1 click.",
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
      <><em className="not-italic opacity-60 text-xs">todo bajo control</em>{" "}…hasta que te explota la semana.</>
    ),
    bullets: [
      "Te va bien seguir sacrificando domingos para ponerte al día con planes.",
      "Te gusta perderte en mil páginas buscando recetas 'a ver cuál encaja' para cada paciente.",
      "Prefieres hacer cada ajuste a mano y recomponer macros/calorías tú mismo 'porque así lo controlas'.",
      "Te da igual que el plan se vaya a 3–4 días porque con tu carga actual te compensa.",
    ],
    withKleia: null,
    cta: "Enséñame cómo sería",
    accentBorder: "hsl(var(--border))",
    highlight: false,
    muted: true,
    microcopy: "Si esto te funciona, genial. Kleia es para quien ya está hasta arriba y quiere recuperar control sin quemarse.",
  },
];

// ─── FlipCard component ────────────────────────────────────────────────────────
function FlipCard({ arch, onOpenModal }: { arch: typeof archetypes[0]; onOpenModal: () => void }) {
  const prefersReduced = typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;
  const isTouchDevice = typeof window !== "undefined"
    ? window.matchMedia("(hover: none)").matches
    : false;

  const handleClick = () => {
    if (isTouchDevice || prefersReduced) onOpenModal();
  };

  return (
    <div
      className="flip-card-root group"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalles de ${arch.title}`}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClick(); }}
      style={{ perspective: "1100px", height: "460px" }}
    >
      <div
        className={[
          "flip-card-inner relative w-full h-full",
          prefersReduced ? "" : "group-hover:[transform:rotateY(180deg)]",
          prefersReduced ? "group-hover:opacity-80" : "",
        ].join(" ")}
        style={{
          transformStyle: "preserve-3d",
          transition: prefersReduced ? "opacity 0.2s ease" : "transform 0.55s cubic-bezier(0.45,0.05,0.55,0.95)",
        }}
      >
        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 rounded-2xl border border-border bg-white shadow-sm flex flex-col overflow-hidden"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          {/* Image area */}
          <div className="relative flex-1 bg-muted/30 overflow-hidden">
            <img
              src={arch.image}
              alt={arch.title}
              className="w-full h-full object-contain p-4"
            />
            {/* Badge overlay */}
            <span className={`absolute top-3 left-3 inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${arch.badgeColor}`}>
              {arch.badge}
            </span>
          </div>

          {/* Text area */}
          <div className="px-5 py-4 border-t border-border bg-white">
            <h3 className="font-bold text-foreground leading-snug text-base mb-1">{arch.title}</h3>
            <p className="text-sm text-muted-foreground">
              {arch.subtitleNode ?? arch.subtitle}
            </p>
            <p className="text-xs text-muted-foreground/60 mt-3 flex items-center gap-1">
              <span className="text-base">↻</span> Pasa el cursor para ver más
            </p>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-2xl border bg-white shadow-lg flex flex-col p-6 overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderColor: arch.accentBorder,
          }}
        >
          {/* Badge */}
          <span className={`inline-flex items-center gap-1 self-start text-xs font-semibold px-2.5 py-1 rounded-full border mb-4 ${arch.badgeColor}`}>
            {arch.badge}
          </span>

          {/* Bullets */}
          <ul className="space-y-2.5 flex-1">
            {arch.bullets.map((b, j) => (
              <li key={j} className="flex items-start gap-2 text-sm text-foreground/80">
                <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                {b}
              </li>
            ))}
          </ul>

          {/* Microcopy card 3 */}
          {arch.microcopy && (
            <p className="text-xs text-muted-foreground italic border-t border-border pt-3 mt-3">
              {arch.microcopy}
            </p>
          )}

          {/* Con Kleia */}
          {arch.withKleia && (
            <p className="text-sm border-t border-border pt-3 mt-3">
              <span className="font-semibold text-primary">Con Kleia: </span>
              <span className="text-muted-foreground">{arch.withKleia}</span>
            </p>
          )}

          {/* CTA */}
          <button
            onClick={(e) => { e.stopPropagation(); document.getElementById("agendar-demo")?.scrollIntoView({ behavior: "smooth" }); }}
            className={[
              "mt-4 w-full text-center py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
              arch.muted
                ? "bg-muted text-muted-foreground hover:bg-muted/70"
                : "bg-primary text-primary-foreground hover:bg-primary/90",
            ].join(" ")}
          >
            {arch.cta}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── S7 · Encaje ─────────────────────────────────────────────────────────────
function FitSection() {
  const [modalIdx, setModalIdx] = React.useState<number | null>(null);
  const modalArch = modalIdx !== null ? archetypes[modalIdx] : null;

  return (
    <section id="seccion-7-encaje" className="py-4 md:py-6 px-4 md:px-6">
      <div className="container max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm p-5 md:p-8 lg:p-12">
          {/* Header */}
          <div className="text-center mb-6 md:mb-10">
            <Badge variant="outline" className="mb-3 md:mb-4 text-primary border-primary/30 bg-primary/5 text-xs uppercase tracking-widest">
              Encaje
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif mb-2 md:mb-3">Elige tu perfil</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
              Si te suena alguno, Kleia probablemente te va a ahorrar tiempo de verdad.
            </p>
          </div>

          {/* Cards grid — single column on mobile (flip cards are tall) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {archetypes.map((arch, i) => (
              <FlipCard key={i} arch={arch} onOpenModal={() => setModalIdx(i)} />
            ))}
          </div>

          {/* Global CTA */}
          <div className="text-center mt-6 md:mt-10">
            <button
              onClick={() => document.getElementById("agendar-demo")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 md:px-8 py-3 md:py-3.5 rounded-full hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 shadow-md text-sm md:text-base"
            >
              Agendar demo →
            </button>
            <p className="text-xs text-muted-foreground italic mt-2">
              Acceso por invitación. Piloto cerrado: 10 plazas.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile modal */}
      {modalArch && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 px-4 pb-4 sm:pb-0"
          onClick={() => setModalIdx(null)}
          role="dialog"
          aria-modal="true"
          aria-label={modalArch.title}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${modalArch.badgeColor}`}>
                {modalArch.badge}
              </span>
              <button
                onClick={() => setModalIdx(null)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <h3 className="font-bold text-foreground text-lg mb-1">{modalArch.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{modalArch.subtitleNode ?? modalArch.subtitle}</p>
            <ul className="space-y-2.5 mb-4">
              {modalArch.bullets.map((b, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-foreground/80">
                  <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  {b}
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
              onClick={() => { setModalIdx(null); document.getElementById("agendar-demo")?.scrollIntoView({ behavior: "smooth" }); }}
              className={[
                "w-full text-center py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
                modalArch.muted
                  ? "bg-muted text-muted-foreground hover:bg-muted/70"
                  : "bg-primary text-primary-foreground hover:bg-primary/90",
              ].join(" ")}
            >
              {modalArch.cta}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── S7b · ¿Kleia es para ti? ────────────────────────────────────────────────
const fitYesBullets = [
  "Quieres devolverte los fines de semana y las tardes: para dormir… o tomarte una cerveza agüita con tus amigos.",
  "Te encanta la variedad, pero estás harta de que entre decidir y ejecutar se te vaya la vida (y acabes repitiendo 'lo de siempre').",
  "Te gusta tener control, pero estás dispuesta a delegar la parte pesada a un asistente (hola, Kleia) para no recomponer todo a mano.",
  "Te importa que el paciente empiece rápido: plan en 24 horas. Si pasan 48, ya es nivel 'faltan señales de vida'… hasta en comisaría se preocupan.",
];

const fitNoBullets = [
  "Te va bien seguir sacrificando domingos para ponerte al día con planes.",
  "Te gusta perderte en mil páginas buscando recetas 'a ver cuál encaja' para cada paciente.",
  "Prefieres hacer cada ajuste a mano y recomponer macros/calorías tú mismo 'porque así lo controlas'.",
  "Te da igual que el plan se vaya a 3–4 días porque con tu carga actual te compensa.",
];

function FitForYouSection() {
  return (
    <section id="seccion-7b-para-ti" className="py-4 md:py-6 px-4 md:px-6">
      <div className="container max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm p-5 md:p-8 lg:p-12">
          {/* Header */}
          <div className="text-center mb-6 md:mb-10">
            <Badge variant="outline" className="mb-3 md:mb-4 text-primary border-primary/30 bg-primary/5 text-xs uppercase tracking-widest">
              ¿Es para ti?
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif mb-2 md:mb-3">¿Kleia es para ti?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">En 10 segundos lo tienes claro.</p>
          </div>

          {/* Two-column cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-stretch">
            {/* SÍ card */}
            <div className="group rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/5 to-white p-5 md:p-7 shadow-sm transition-all duration-200 motion-safe:hover:scale-[1.01] motion-safe:hover:shadow-md motion-safe:hover:border-primary/40 flex flex-col">
              <div className="flex items-center gap-2 mb-4 md:mb-5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-success/15 text-success">
                  <Check className="h-4 w-4" />
                </span>
                <h3 className="text-lg md:text-xl font-bold font-serif text-foreground">SÍ, si…</h3>
              </div>
              <ul className="space-y-2.5 md:space-y-3 flex-1 mb-5 md:mb-6">
                {fitYesBullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80 leading-relaxed">
                    <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-success" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-4 md:pt-5 border-t border-primary/15">
                <button
                  onClick={() => document.getElementById("agendar-demo")?.scrollIntoView({ behavior: "smooth" })}
                  className="w-full py-2.5 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
                >
                  Únete a Kleia
                </button>
                <p className="text-center text-xs text-muted-foreground mt-2">
                  (Piloto cerrado: 10 plazas. Acceso por invitación.)
                </p>
              </div>
            </div>

            {/* NO card */}
            <div className="group rounded-2xl border border-border bg-muted/30 p-5 md:p-7 shadow-sm transition-all duration-200 motion-safe:hover:scale-[1.01] motion-safe:hover:shadow-md motion-safe:hover:border-border/80 flex flex-col">
              <div className="flex items-center gap-2 mb-4 md:mb-5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <X className="h-4 w-4" />
                </span>
                <h3 className="text-lg md:text-xl font-bold font-serif text-foreground">NO, si…</h3>
              </div>
              <ul className="space-y-2.5 md:space-y-3 flex-1 mb-5 md:mb-6">
                {fitNoBullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80 leading-relaxed">
                    <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted-foreground/50" />
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-4 md:pt-5 border-t border-border text-xs text-muted-foreground italic leading-relaxed">
                Si esto te funciona, genial. Kleia es para quien ya está hasta arriba y quiere recuperar control sin quemarse.
              </p>
            </div>
          </div>

          {/* Global CTA */}
          <div className="text-center mt-6 md:mt-10">
            <button
              onClick={() => document.getElementById("agendar-demo")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 md:px-8 py-3 md:py-3.5 rounded-full hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 shadow-md text-sm md:text-base"
            >
              Agendar demo →
            </button>
            <p className="text-xs text-muted-foreground italic mt-2">
              Acceso por invitación. Piloto cerrado: 10 plazas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── S7c · Historia detrás de Kleia ──────────────────────────────────────────
const storyPhotos = [
  { src: storyImg1, caption: "La obsesión: quitar fricción que te quema." },
  { src: storyImg2, caption: "El patrón: planes, ajustes, mensajes… siempre." },
  { src: storyImg3, caption: "La chispa: la lista de la compra a mano." },
];

const storyText = `Durante años he trabajado creando productos digitales con una obsesión: hacerle la vida más fácil a la gente, quitando fricción donde nadie la ve… hasta que te quema.

Al principio lo viví como usuaria: con mi entrenador todo era WhatsApp, calendarios, recordatorios, pagos… y pensé: 'esto se podría simplificar muchísimo'. Esa idea se me quedó dentro.

Más tarde, trabajando con un nutricionista (David), volví a ver el mismo patrón: pequeñas cosas repetidas cada semana que, sumadas, te roban tiempo y cabeza. Y cada vez que proponía una mejora, la respuesta era la misma: 'sí, eso me ayudaría'. Ahí entendí que no era un caso: era algo que le pasa a más gente.

El click definitivo llegó con una escena muy simple: una familia haciendo la lista de la compra a mano para poder seguir una dieta. Y pensé: si esto pasa aquí, pasa en todas partes.

En ese momento supe que no podía hacerlo sola. Le escribí a Mario —con quien ya había trabajado y sabía que compartíamos valores aunque seamos distintos— y cuando dijo 'sí', todo empezó a fluir. Porque Kleia no nace de una idea bonita: nace de un problema real y de un equipo que quiere resolverlo sin rendirse.

Así nació Kleia: un asistente para nutricionistas que te ayuda a crear menús que encajan, editar sin descuadres y entregar rápido — para que el plan no se te coma la semana.`;

function StorySection() {
  return (
    <section id="seccion-7c-historia" className="py-4 md:py-6 px-4 md:px-6">
      <div className="container max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm p-5 md:p-8 lg:p-12">
          {/* Header */}
          <div className="text-center mb-6 md:mb-10">
            <Badge variant="outline" className="mb-3 md:mb-4 text-primary border-primary/30 bg-primary/5 text-xs uppercase tracking-widest">
              Por qué existe
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif mb-2 md:mb-3">La historia detrás de Kleia</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
              Nació para quitarte trabajo invisible: el que empieza cuando termina la consulta.
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 lg:gap-14 items-start mb-6 md:mb-10">
            {/* Left: story text */}
            <div className="space-y-3 md:space-y-4">
              {storyText.split("\n\n").map((para, i) => (
                <p key={i} className="text-sm text-foreground/80 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* Right: photo strip — horizontal scroll on mobile */}
            <div className="-mx-5 md:mx-0 px-5 md:px-0">
              <div className="flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 snap-x md:snap-none">
                {storyPhotos.map(({ src, caption }, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 snap-center w-48 md:w-full rounded-xl border border-border/60 overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-muted/20"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={src} alt={caption} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <p className="px-3 py-2 text-xs text-muted-foreground italic leading-snug">{caption}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mini-cards row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-10">
            <div className="rounded-xl md:rounded-2xl border border-border/60 bg-primary/5 p-4 md:p-5">
              <h3 className="font-semibold text-foreground mb-1.5 text-sm">✨ La chispa</h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                Ver a gente haciendo la lista de la compra a mano para poder cumplir el plan.
              </p>
            </div>
            <div className="rounded-xl md:rounded-2xl border border-border/60 bg-muted/30 p-4 md:p-5">
              <h3 className="font-semibold text-foreground mb-1.5 text-sm">🧠 Nuestro enfoque</h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                No queríamos 'otro software'. Queríamos un asistente que te quite lo pesado sin quitarte el criterio.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <button
              onClick={() => document.getElementById("agendar-demo")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 md:px-8 py-3 md:py-3.5 rounded-full hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 shadow-md text-sm md:text-base"
            >
              Enséñame cómo sería
            </button>
            <p className="text-xs text-muted-foreground italic mt-2">
              Acceso por invitación · Piloto cerrado: 10 plazas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── S8 · Bonos y Garantía ───────────────────────────────────────────────────
function BonusesSection() {
  return (
    <section id="seccion-8-extras" className="py-4 md:py-6 px-4 md:px-6">
      <div className="container max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm p-5 md:p-10">
          <div className="text-center mb-6 md:mb-10">
            <Badge variant="outline" className="mb-3 md:mb-4 text-primary border-primary/30 bg-primary/5 text-xs uppercase tracking-widest">
              Extras
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif">Bonos incluidos en el piloto</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 mb-6 md:mb-10">
            {[
              { icon: Gift, title: "Bono 1: Setup asistido", desc: "Te acompañamos a cargar tus primeros pacientes y configurar Kleia a tu flujo de trabajo. Sin perderte en la herramienta." },
              { icon: MessageSquare, title: "Bono 2: Canal de Expertos", desc: "Acceso a un canal privado donde podés consultar dudas de nutrición con otros profesionales y con el equipo de Kleia." },
              { icon: ShieldCheck, title: "Garantía: Cancelación simple", desc: "Si en los primeros 30 días Kleia no te ahorra tiempo, cancelás sin preguntas. Sin contratos largos ni penalidades." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center p-4 md:p-6 rounded-2xl bg-background">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1.5 md:mb-2 text-sm md:text-base">{title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {[
              { icon: Star, text: "Construido a partir de 12 entrevistas" },
              { icon: CheckCircle2, text: "Cohorte piloto activa ahora" },
              { icon: Leaf, text: "Piloto cerrado: 10 plazas" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 bg-primary/10 rounded-full px-3 md:px-4 py-1.5 md:py-2">
                <Icon className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
                <span className="text-[11px] md:text-xs text-primary font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── S9 · CTA intermedio ─────────────────────────────────────────────────────
function MidCTA() {
  return (
    <section id="seccion-9-cta" className="py-4 md:py-6 px-4 md:px-6">
      <div className="container max-w-4xl mx-auto">
        <div className="bg-primary rounded-2xl md:rounded-3xl shadow-sm px-6 md:px-10 py-10 md:py-16 text-center text-primary-foreground">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif mb-3 md:mb-4">
            Las plazas del piloto son limitadas
          </h2>
          <p className="text-primary-foreground/80 mb-6 md:mb-8 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            Solo hay 10 lugares en esta primera cohorte. Si querés ser parte, agendá una demo ahora
            y te contamos cómo funciona sin compromiso.
          </p>
          <Button
            onClick={scrollToForm}
            size="lg"
            className="bg-white text-primary hover:bg-white/90 rounded-full px-6 md:px-8 font-medium shadow-md text-sm md:text-base"
          >
            Agendar demo →
          </Button>
        </div>
      </div>
    </section>
  );
}

// ─── S10 · Formulario demo ───────────────────────────────────────────────────
function DemoForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="agendar-demo" className="py-4 md:py-6 px-4 md:px-6">
      <div className="container max-w-lg mx-auto">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm p-6 md:p-10">
          <div className="text-center mb-6 md:mb-8">
            <Badge variant="outline" className="mb-3 md:mb-4 text-primary border-primary/30 bg-primary/5 text-xs uppercase tracking-widest">
              Demo
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold font-serif">Agendá tu demo</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Completá el formulario y te contactamos en menos de 24 horas.
            </p>
          </div>
          {submitted ? (
            <div className="p-6 md:p-10 text-center rounded-2xl bg-primary/5">
              <CheckCircle2 className="h-10 w-10 md:h-12 md:w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg md:text-xl font-bold font-serif mb-2">¡Gracias, {form.name}!</h3>
              <p className="text-muted-foreground text-sm">
                Recibimos tu solicitud. Nos comunicamos con vos a <strong>{form.email}</strong> en las próximas 24 horas.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-sm font-medium">Nombre</Label>
                <Input id="name" placeholder="Tu nombre" required value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="rounded-xl border-border" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input id="email" type="email" placeholder="tu@email.com" required value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="rounded-xl border-border" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-sm font-medium">
                  Contanos brevemente tu situación{" "}
                  <span className="text-muted-foreground font-normal">(opcional)</span>
                </Label>
                <Textarea id="message" placeholder="¿Cuántos pacientes tenés? ¿Qué parte del flujo más te cuesta?"
                  rows={3} value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="rounded-xl border-border" />
              </div>
              <Button type="submit" size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-medium">
                Agendar demo →
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "¿Necesito saber de tecnología para usar Kleia?",
    a: "No. Kleia está diseñado para nutricionistas, no para programadores. Si podés usar WhatsApp, podés usar Kleia. Además, te acompañamos en el setup inicial.",
  },
  {
    q: "¿Qué pasa con los datos de mis pacientes?",
    a: "Los datos de tus pacientes son tuyos. Kleia los usa únicamente para generar los planes y no los comparte con terceros. Cumplimos con las normativas de privacidad aplicables.",
  },
  {
    q: "¿Puedo cancelar cuando quiero?",
    a: "Sí. Durante el piloto podés cancelar en cualquier momento sin penalidades. Si sentís que Kleia no te ahorra tiempo en los primeros 30 días, te devolvemos lo que pagaste.",
  },
  {
    q: "¿Kleia reemplaza mi criterio profesional?",
    a: "No, y no está pensado para hacerlo. Kleia automatiza la parte mecánica (armar el plan, calcular macros, formatear el PDF), pero vos seguís siendo quien decide qué es mejor para cada paciente.",
  },
  {
    q: "¿Cuándo estará disponible para todos?",
    a: "Estamos en piloto cerrado con 10 plazas. Después del piloto, vamos a iterar el producto y abrir acceso gradualmente. Si querés ser de los primeros, agendá una demo ahora.",
  },
];

// ─── S11 · FAQ ───────────────────────────────────────────────────────────────
function FAQSection() {
  return (
    <section id="seccion-11-faq" className="py-4 md:py-6 px-4 md:px-6">
      <div className="container max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm p-5 md:p-10">
          <div className="text-center mb-6 md:mb-10">
            <Badge variant="outline" className="mb-3 md:mb-4 text-primary border-primary/30 bg-primary/5 text-xs uppercase tracking-widest">
              FAQ
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif">Preguntas frecuentes</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map(({ q, a }, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-background border border-border rounded-xl md:rounded-2xl px-3 md:px-4">
                <AccordionTrigger className="font-medium text-xs md:text-sm text-left hover:no-underline py-3 md:py-4">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

// ─── S12 · Footer CTA ────────────────────────────────────────────────────────
function FooterCTA() {
  return (
    <footer id="seccion-12-footer" className="py-4 md:py-6 px-4 md:px-6 pb-10 md:pb-12">
      <div className="container max-w-4xl mx-auto">
        <div className="bg-foreground rounded-2xl md:rounded-3xl shadow-sm px-6 md:px-10 py-10 md:py-16 text-center text-background">
          <div className="flex items-center justify-center mb-5 md:mb-6">
            <img src={kleiaLogo} alt="Kleia" className="h-7 md:h-8 w-auto brightness-0 invert" />
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif mb-3 md:mb-4 leading-tight">
            Recuperá tu tiempo. Entregá planes que te enorgullezcan.
          </h2>
          <p className="text-background/70 mb-6 md:mb-8 leading-relaxed max-w-xl mx-auto text-sm md:text-base">
            Kleia está en piloto cerrado. Solo 10 plazas disponibles. Agendá una demo sin compromiso
            y descubrí si Kleia es para vos.
          </p>
          <Button
            onClick={scrollToForm}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 md:px-8 font-medium shadow-md text-sm md:text-base"
          >
            Agendar demo →
          </Button>
          <p className="mt-8 md:mt-10 text-xs text-background/40">
            © 2025 Kleia · Hecho con amor para nutricionistas
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Index() {
  return (
    <div className="min-h-screen font-sans bg-white">
      <Navbar />
      <main>
        <FadeSection><Hero /></FadeSection>
        <FadeSection><ProblemSection /></FadeSection>
        <FadeSection><EvidenceStrip /></FadeSection>
        <FadeSection><ResultsSection /></FadeSection>
        <FadeSection><HowItWorksSection /></FadeSection>
        <FadeSection><FeaturesSection /></FadeSection>
        <FadeSection><ComparisonSection /></FadeSection>
        <FadeSection><FitSection /></FadeSection>
        <FadeSection><FitForYouSection /></FadeSection>
        <FadeSection><StorySection /></FadeSection>
        <FadeSection><BonusesSection /></FadeSection>
        <FadeSection><MidCTA /></FadeSection>
        <FadeSection><DemoForm /></FadeSection>
        <FadeSection><FAQSection /></FadeSection>
      </main>
      <FadeSection><FooterCTA /></FadeSection>
    </div>
  );
}
