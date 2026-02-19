import kleiaLogo from "@/assets/kleia-logo.svg";
import problemaIlustracion from "@/assets/problema-ilustracion.png";
import problema1 from "@/assets/problema-1.png";
import problema2 from "@/assets/problema-2.png";
import problema3 from "@/assets/problema-3.png";
import problema4 from "@/assets/problema-4.png";
import resultadosIlustracion from "@/assets/resultados-ilustracion.png";
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
      <div className="container max-w-5xl mx-auto flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <div className="flex items-center">
          <img src={kleiaLogo} alt="Kleia" className="h-8 w-auto" />
        </div>

        {/* Desktop nav links — pill style como la referencia */}
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
        <div className="flex items-center gap-3">
          <Button
            onClick={scrollToForm}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-5 text-sm font-medium shadow-sm"
          >
            Agendar demo
          </Button>
          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
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
        <nav className="md:hidden border-t border-border bg-white/95 backdrop-blur px-6 py-4 flex flex-col gap-3">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => { scrollTo(id); setOpen(false); }}
              className="text-sm text-muted-foreground hover:text-foreground text-left transition-colors"
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
    <section id="seccion-1-hero" className="bg-white px-6 pt-20 pb-0 overflow-hidden">
      <div className="container max-w-5xl mx-auto flex flex-col">
        {/* Texto + CTA — centrado arriba */}
        <div className="text-center pb-12">
          <div className="inline-block mb-6">
            <span className="bg-primary/10 text-primary text-xs font-medium px-4 py-2 rounded-full">
              Para nutricionistas con agenda llena que quieren volver a tener control de su tiempo
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight mb-6 text-foreground mt-[2px]">
            Dejá de pensar en menús.<br />
            <span className="text-primary">Terminá tu día con todos los planes enviados.</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto mt-[2px]">
            Kleia es el asistente de planificación nutricional que genera planes personalizados en minutos,
            respetando las preferencias de cada paciente, sin que tengas que empezar desde cero cada vez.
          </p>
          <div className="relative inline-block">
            <Button
              onClick={scrollToForm}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 text-base font-medium shadow-md"
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
          <div className="mt-5 flex items-center justify-center gap-2">
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

        {/* Componente de imagen — mockup del producto */}
        <div className="w-full rounded-t-3xl bg-muted border border-border border-b-0 min-h-[420px] flex items-center justify-center overflow-hidden">
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
  const circleR = 130; // radio del círculo de fotos
  const cx = 200;      // centro SVG x
  const cy = 200;      // centro SVG y
  const svgSize = 400;

  return (
    <section id="seccion-2-problema" className="py-6 px-6">
      <div className="container max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm p-10">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/5 text-xs uppercase tracking-widest">
              El Problema
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-serif">¿Te suena familiar?</h2>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6">
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

            {/* Centro: SVG con círculo invisible + 5 fotos + flechas */}
            <div className="flex-shrink-0 w-full md:w-[400px]">
              <svg
                viewBox={`0 0 ${svgSize} ${svgSize}`}
                className="w-full h-auto"
                xmlns="http://www.w3.org/2000/svg"
              >
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

                {/* Círculo casi invisible */}
                <circle
                  cx={cx} cy={cy} r={circleR}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="1"
                  opacity="0.12"
                  strokeDasharray="6 5"
                />

                {/* Flechas izquierda → círculo */}
                <path
                  d={`M 0 110 C 30 110 60 ${cy - 60} ${cx - circleR + 10} ${cy - 50}`}
                  stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="5 4"
                  strokeLinecap="round" fill="none" opacity="0.4"
                  markerEnd="url(#arr-l)"
                />
                <path
                  d={`M 0 290 C 30 290 60 ${cy + 60} ${cx - circleR + 10} ${cy + 50}`}
                  stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="5 4"
                  strokeLinecap="round" fill="none" opacity="0.4"
                  markerEnd="url(#arr-l)"
                />

                {/* Flechas derecha → círculo */}
                <path
                  d={`M ${svgSize} 110 C ${svgSize - 30} 110 ${svgSize - 60} ${cy - 60} ${cx + circleR - 10} ${cy - 50}`}
                  stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="5 4"
                  strokeLinecap="round" fill="none" opacity="0.4"
                  markerEnd="url(#arr-r)"
                />
                <path
                  d={`M ${svgSize} 290 C ${svgSize - 30} 290 ${svgSize - 60} ${cy + 60} ${cx + circleR - 10} ${cy + 50}`}
                  stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="5 4"
                  strokeLinecap="round" fill="none" opacity="0.4"
                  markerEnd="url(#arr-r)"
                />

                {/* 5 fotos distribuidas en el círculo */}
                {imagePositions.map((angleDeg, i) => {
                  const rad = (angleDeg * Math.PI) / 180;
                  const ix = cx + circleR * Math.cos(rad);
                  const iy = cy + circleR * Math.sin(rad);
                  return (
                    <g key={i} transform={`translate(${ix}, ${iy})`}>
                      <circle r="40" fill="white" opacity="0.9" />
                      <image
                        href={problemImages[i]}
                        x="-38" y="-38" width="76" height="76"
                        clipPath={`url(#clip-img-${i})`}
                        preserveAspectRatio="xMidYMid slice"
                      />
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
      className="py-6 px-6"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm p-10">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/5 text-xs uppercase tracking-widest">
              RESULTADOS CON KLEIA
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-serif">
              Menos carga, más control
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-10">

            {/* ── Columna izquierda: imagen + métrica destino ── */}
            <div className="flex-shrink-0 w-full md:w-72 flex flex-col items-center">
              <img
                src={resultadosIlustracion}
                alt="Nutricionista usando Kleia"
                className="w-full object-contain"
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
  { num: "01", title: "Carga lo mínimo", desc: "Ingresá las restricciones, preferencias y objetivos del paciente una sola vez. Kleia los recuerda siempre." },
  { num: "02", title: "Generá el plan", desc: "Con un click, Kleia crea un plan semanal completo, balanceado y adaptado al perfil del paciente." },
  { num: "03", title: "Ajustá sin descuadres", desc: "Cambiá cualquier alimento y el sistema recalcula calorías y macros automáticamente en tiempo real." },
  { num: "04", title: "Entregá en 1 click", desc: "Exportá el plan como PDF listo para compartir. Sin formatear, sin copiar y pegar." },
];

// ─── S4 · Cómo funciona ──────────────────────────────────────────────────────
function HowItWorksSection() {
  return (
    <section id="seccion-4-flujo" className="py-6 px-6">
      <div className="container max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm p-10">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/5 text-xs uppercase tracking-widest">
              Flujo
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-serif">Cómo funciona</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map(({ num, title, desc }) => (
              <div key={num} className="flex flex-col items-start p-7 rounded-2xl bg-background aspect-square justify-between">
                <span className="text-5xl font-bold font-serif text-primary/20">{num}</span>
                <div>
                  <h3 className="font-semibold mb-2 text-base">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
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
    <section id="seccion-5-incluido" className="py-6 px-6">
      <div className="container max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm p-10">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/5 text-xs uppercase tracking-widest">
              Incluido
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-serif">Qué incluye Kleia</h2>
          </div>

          <div className="flex flex-col md:flex-row gap-10 items-center">
            {/* Mockup placeholder */}
            <div className="flex-shrink-0 w-full md:w-80 h-72 md:h-96 rounded-2xl bg-muted border border-border flex items-center justify-center">
              <p className="text-muted-foreground text-sm">[ Product mockup ]</p>
            </div>

            {/* Features como pills ordenados en columna + CTA */}
            <div className="flex-1 flex flex-col gap-2.5">
              {features.map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-3 bg-primary/8 hover:bg-primary/15 text-primary border border-primary/20 rounded-full px-5 py-2.5 text-sm font-medium transition-colors cursor-default"
                >
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                  {f}
                </span>
              ))}
              <div className="mt-4">
                <Button
                  onClick={scrollToForm}
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 font-medium shadow-md"
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
    <section id="seccion-6-comparativa" className="py-6 px-6">
      <div className="container max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm p-10 overflow-x-auto">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/5 text-xs uppercase tracking-widest">
              Comparativa
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-serif">¿Por qué Kleia y no otra cosa?</h2>
          </div>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-4 text-muted-foreground font-medium">Funcionalidad</th>
                <th className="p-4 text-center text-muted-foreground font-medium">Excel / Word</th>
                <th className="p-4 text-center text-muted-foreground font-medium">Avena / Nutriind</th>
                <th className="p-4 text-center text-muted-foreground font-medium">Plan artesanal</th>
                <th className="p-4 text-center text-success font-semibold bg-success/10 rounded-t-xl">Kleia</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map(({ feature, excel, avena, artesanal, kleia }, i) => (
                <tr key={feature} className={i % 2 === 0 ? "bg-background/60" : ""}>
                  <td className="p-4 text-foreground/80">{feature}</td>
                  <td className="p-4 text-center"><CellValue val={excel} /></td>
                  <td className="p-4 text-center"><CellValue val={avena} /></td>
                  <td className="p-4 text-center"><CellValue val={artesanal} /></td>
                  <td className="p-4 text-center bg-success/5"><CellValue val={kleia} /></td>
                </tr>
              ))}
            </tbody>
          </table>
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
    title: "La Saturada (pero responsable)",
    subtitle: "Agenda llena. Planes que se te cuelan al finde.",
    bullets: [
      "Estoy hasta arriba de hacer menús.",
      "Empiezo el plan 'cuando puedo'… y a veces se me va a días.",
      "Me prometo que este finde no… y al final cae el domingo.",
    ],
    want: "Recuperar tardes y fines de semana sin perder control.",
    withKleia: "Plan en 10–20 min, ajustes en 1–3 min y entrega en 1 click.",
    cta: "Soy esta. Quiero demo.",
    accent: "border-amber-300 hover:border-amber-400",
    highlight: false,
  },
  {
    badge: "⚡ 24h",
    badgeColor: "bg-primary/8 text-primary border-primary/25",
    title: "La de '24h o nada'",
    subtitle: "Te importa que el paciente empiece ya.",
    bullets: [
      "Quieres entregar el plan en las primeras 24 horas.",
      "Si pasan más de 48, ya es 'alerta': hasta en comisaría se preocupan 😅",
      "Odias que un cambio descompense el plan y te robe tiempo.",
    ],
    want: "Rapidez con coherencia clínica (sin ideas al tuntún).",
    withKleia: "Menú que encaja (realista y clínico) + recalculo del plan completo.",
    cta: "Soy esta. Agendar demo.",
    accent: "border-primary/30 hover:border-primary/60",
    highlight: true,
  },
  {
    badge: "🙂💧",
    badgeColor: "bg-muted text-muted-foreground border-border",
    title: "La de 'Estoy bien así (según yo)'",
    subtitleNode: (
      <><em className="text-xs not-italic opacity-70">todo bajo control</em>{"…hasta que te explota la semana."}</>
    ),
    subtitle: "",
    bullets: [
      "Te va bien seguir sacrificando domingos para ponerte al día con planes.",
      "Te gusta perderte en mil páginas buscando recetas 'a ver cuál encaja' para cada paciente.",
      "Prefieres hacer cada ajuste a mano y recomponer macros/calorías tú mismo 'porque así lo controlas'.",
      "Te da igual que el plan se vaya a 3–4 días porque con tu carga actual te compensa.",
    ],
    microcopy: "Si esto te funciona, genial. Kleia es para quien ya está hasta arriba y quiere recuperar control sin quemarse.",
    cta: "Enséñame cómo sería",
    accent: "border-border hover:border-muted-foreground/40",
    highlight: false,
    muted: true,
  },
];

// ─── S7 · Encaje ─────────────────────────────────────────────────────────────
function FitSection() {
  const [selected, setSelected] = React.useState<number | null>(null);

  return (
    <section id="seccion-7-encaje" className="py-6 px-6">
      <div className="container max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/5 text-xs uppercase tracking-widest">
              Encaje
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-3">Elige tu perfil</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Si te suena alguno, Kleia probablemente te va a ahorrar tiempo de verdad.
            </p>
          </div>

          {/* Cards — desktop 3 cols, tablet 2 cols, mobile scroll */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {archetypes.map((arch, i) => {
              const isSelected = selected === i;
              return (
                <button
                  key={i}
                  role="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelected(isSelected ? null : i)}
                  className={[
                    "group text-left rounded-2xl border bg-white p-6 flex flex-col gap-4 transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    "motion-safe:hover:scale-[1.01] motion-safe:active:scale-[1.005]",
                    arch.accent,
                    isSelected
                      ? "shadow-lg ring-2 ring-primary/30"
                      : "shadow-sm hover:shadow-md",
                    arch.highlight
                      ? "bg-gradient-to-b from-primary/3 to-white"
                      : "",
                  ].join(" ")}
                >
                  {/* Badge */}
                  <span className={`inline-flex items-center gap-1.5 self-start text-xs font-medium px-2.5 py-1 rounded-full border ${arch.badgeColor}`}>
                    {arch.badge}
                  </span>

                  {/* Title + subtitle */}
                  <div>
                    <h3 className="font-semibold text-foreground leading-snug mb-1">
                      {arch.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{arch.subtitleNode ?? arch.subtitle}</p>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-2 flex-1">
                    {arch.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/40 flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Want + With Kleia (cards 1 & 2) */}
                  {arch.want && (
                    <div className="space-y-1.5 text-sm border-t border-border pt-4">
                      <p>
                        <span className="font-semibold text-foreground">Lo que quieres: </span>
                        <span className="text-muted-foreground">{arch.want}</span>
                      </p>
                      <p>
                        <span className="font-semibold text-primary">Con Kleia: </span>
                        <span className="text-muted-foreground">{arch.withKleia}</span>
                      </p>
                    </div>
                  )}

                  {/* Microcopy (card 3) */}
                  {arch.microcopy && (
                    <p className="text-xs text-muted-foreground italic border-t border-border pt-4">
                      {arch.microcopy}
                    </p>
                  )}

                  {/* Mini CTA */}
                  <span
                    className={[
                      "mt-auto w-full text-center py-2.5 px-4 rounded-xl text-sm font-medium transition-colors",
                      arch.muted
                        ? "bg-muted text-muted-foreground group-hover:bg-muted/80"
                        : "bg-primary text-primary-foreground group-hover:bg-primary/90",
                    ].join(" ")}
                  >
                    {arch.cta}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Global CTA */}
          <div className="text-center mt-10">
            <button
              onClick={() => document.getElementById('agendar-demo')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-full hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 shadow-md"
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

// ─── S8 · Bonos y Garantía ───────────────────────────────────────────────────
function BonusesSection() {
  return (
    <section id="seccion-8-extras" className="py-6 px-6">
      <div className="container max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm p-10">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/5 text-xs uppercase tracking-widest">
              Extras
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-serif">Bonos incluidos en el piloto</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {[
              { icon: Gift, title: "Bono 1: Setup asistido", desc: "Te acompañamos a cargar tus primeros pacientes y configurar Kleia a tu flujo de trabajo. Sin perderte en la herramienta." },
              { icon: MessageSquare, title: "Bono 2: Canal de Expertos", desc: "Acceso a un canal privado donde podés consultar dudas de nutrición con otros profesionales y con el equipo de Kleia." },
              { icon: ShieldCheck, title: "Garantía: Cancelación simple", desc: "Si en los primeros 30 días Kleia no te ahorra tiempo, cancelás sin preguntas. Sin contratos largos ni penalidades." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center p-6 rounded-2xl bg-background">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: Star, text: "Construido a partir de 12 entrevistas" },
              { icon: CheckCircle2, text: "Cohorte piloto activa ahora" },
              { icon: Leaf, text: "Piloto cerrado: 10 plazas" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2">
                <Icon className="h-4 w-4 text-primary" />
                <span className="text-xs text-primary font-medium">{text}</span>
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
    <section id="seccion-9-cta" className="py-6 px-6">
      <div className="container max-w-4xl mx-auto">
        <div className="bg-primary rounded-3xl shadow-sm px-10 py-16 text-center text-primary-foreground">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
            Las plazas del piloto son limitadas
          </h2>
          <p className="text-primary-foreground/80 mb-8 text-lg leading-relaxed max-w-xl mx-auto">
            Solo hay 10 lugares en esta primera cohorte. Si querés ser parte, agendá una demo ahora
            y te contamos cómo funciona sin compromiso.
          </p>
          <Button
            onClick={scrollToForm}
            size="lg"
            className="bg-white text-primary hover:bg-white/90 rounded-full px-8 font-medium shadow-md"
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
    <section id="agendar-demo" className="py-6 px-6">
      <div className="container max-w-lg mx-auto">
        <div className="bg-white rounded-3xl shadow-sm p-10">
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/5 text-xs uppercase tracking-widest">
              Demo
            </Badge>
            <h2 className="text-3xl font-bold font-serif">Agendá tu demo</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Completá el formulario y te contactamos en menos de 24 horas.
            </p>
          </div>
          {submitted ? (
            <div className="p-10 text-center rounded-2xl bg-primary/5">
              <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold font-serif mb-2">¡Gracias, {form.name}!</h3>
              <p className="text-muted-foreground text-sm">
                Recibimos tu solicitud. Nos comunicamos con vos a <strong>{form.email}</strong> en las próximas 24 horas.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
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
    <section id="seccion-11-faq" className="py-6 px-6">
      <div className="container max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm p-10">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/5 text-xs uppercase tracking-widest">
              FAQ
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-serif">Preguntas frecuentes</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map(({ q, a }, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-background border border-border rounded-2xl px-4">
                <AccordionTrigger className="font-medium text-sm text-left hover:no-underline">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
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
    <footer id="seccion-12-footer" className="py-6 px-6 pb-12">
      <div className="container max-w-4xl mx-auto">
        <div className="bg-foreground rounded-3xl shadow-sm px-10 py-16 text-center text-background">
          <div className="flex items-center justify-center mb-6">
            <img src={kleiaLogo} alt="Kleia" className="h-8 w-auto brightness-0 invert" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 leading-tight">
            Recuperá tu tiempo. Entregá planes que te enorgullezcan.
          </h2>
          <p className="text-background/70 mb-8 leading-relaxed max-w-xl mx-auto">
            Kleia está en piloto cerrado. Solo 10 plazas disponibles. Agendá una demo sin compromiso
            y descubrí si Kleia es para vos.
          </p>
          <Button
            onClick={scrollToForm}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 font-medium shadow-md"
          >
            Agendar demo →
          </Button>
          <p className="mt-10 text-xs text-background/40">
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
        <FadeSection><ResultsSection /></FadeSection>
        <FadeSection><HowItWorksSection /></FadeSection>
        <FadeSection><FeaturesSection /></FadeSection>
        <FadeSection><ComparisonSection /></FadeSection>
        <FadeSection><FitSection /></FadeSection>
        <FadeSection><BonusesSection /></FadeSection>
        <FadeSection><MidCTA /></FadeSection>
        <FadeSection><DemoForm /></FadeSection>
        <FadeSection><FAQSection /></FadeSection>
      </main>
      <FadeSection><FooterCTA /></FadeSection>
    </div>
  );
}
