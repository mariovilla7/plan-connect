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
import { createPortal } from "react-dom";
import { useInView } from "@/hooks/use-in-view";

// ─── WhatsApp CTA ─────────────────────────────────────────────────────────────
// 🔧 Reemplazá este número con el tuyo (con código de país, sin + ni espacios)
const WA_NUMBER = "359896676923";
const WA_MESSAGE = encodeURIComponent("Hola! Me interesa conocer más sobre Kleia y agendar una demo. ¿Podemos hablar?");
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;
const currentYear = new Date().getFullYear();

function openWhatsApp() {
  window.open(WA_URL, "_blank", "noopener,noreferrer");
}

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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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

  return (
    <header
      id="seccion-0-navbar"
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border shadow-sm"
    >
      <div className="container max-w-5xl mx-auto flex items-center justify-between h-14 md:h-16 px-4 sm:px-6">
        <div className="flex items-center">
          <img src={kleiaLogo} alt="Kleia" className="h-6 sm:h-7 md:h-8 w-auto" />
        </div>
        <nav className="hidden lg:flex items-center gap-1 bg-muted rounded-full px-2 py-1.5">
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
        <div className="flex items-center gap-2">
          <Button
            onClick={openWhatsApp}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-3 sm:px-4 md:px-5 text-[11px] sm:text-xs md:text-sm font-medium shadow-sm h-8 md:h-9"
          >
            Agendar demo
          </Button>
          <button
            className="lg:hidden flex flex-col gap-1.5 p-1.5 rounded-lg hover:bg-muted transition-colors active:bg-muted/80"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
          >
            <span
              className={`block w-5 h-0.5 bg-foreground transition-transform duration-200 ${open ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-foreground transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-foreground transition-transform duration-200 ${open ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </div>
      {open && (
        <nav className="lg:hidden border-t border-border bg-white/95 backdrop-blur px-4 sm:px-6 py-2 flex flex-col">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => {
                scrollTo(id);
                setOpen(false);
              }}
              className="text-sm text-muted-foreground hover:text-foreground active:text-foreground text-left transition-colors py-3 border-b border-border/30 last:border-b-0"
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
function Hero() {
  return (
    <section id="seccion-1-hero" className="bg-white px-4 lg:px-6 pt-8 sm:pt-12 md:pt-20 pb-0 overflow-hidden">
      <div className="container max-w-5xl mx-auto flex flex-col">
        <div className="text-center pb-6 sm:pb-8 md:pb-12">
          <div className="inline-block mb-3 sm:mb-4 md:mb-6 max-w-[92vw]">
            <span className="bg-primary/10 text-primary text-[10px] sm:text-[11px] md:text-xs font-medium px-3 sm:px-4 py-1.5 md:py-2 rounded-full leading-snug inline-block">
              Para nutricionistas independientes sin miedo a delegar
            </span>
          </div>
          <h1 className="text-[1.65rem] leading-[1.2] sm:text-3xl md:text-5xl lg:text-6xl font-bold font-serif sm:leading-tight mb-3 sm:mb-4 md:mb-6 text-foreground px-1 sm:px-2">
            Dejá de pensar en menús.
            <br />
            <span className="text-primary">Terminá tu día con todos los planes enviados.</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-5 sm:mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto px-1 sm:px-2">
            Kleia es el asistente de planificación nutricional que genera planes personalizados en minutos, respetando
            las preferencias de cada paciente, sin que tengas que empezar desde cero cada vez.
          </p>
          <div className="inline-flex flex-col items-center gap-2">
            <Button
              onClick={openWhatsApp}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 rounded-full px-5 sm:px-6 md:px-8 text-sm md:text-base font-medium shadow-md relative h-10 sm:h-11 md:h-12"
            >
              Agendar demo →
              <span
                className="absolute -top-2.5 -right-2.5 text-[10px] font-bold rounded-full px-1.5 py-0.5 leading-none shadow-sm border"
                style={{ backgroundColor: "hsl(45 95% 60%)", color: "hsl(30 80% 20%)", borderColor: "hsl(45 90% 50%)" }}
              >
                10 plazas
              </span>
            </Button>
            <p className="text-[11px] sm:text-xs text-muted-foreground">Piloto cerrado · Acceso por invitación.</p>
          </div>
        </div>

        {/* Mockup del producto */}
        <div className="w-full rounded-t-xl sm:rounded-t-2xl md:rounded-t-3xl bg-muted border border-border border-b-0 min-h-[180px] sm:min-h-[260px] md:min-h-[420px] flex items-center justify-center overflow-hidden">
          <p className="text-muted-foreground text-xs sm:text-sm">[ Product mockup ]</p>
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

function ProblemSection() {
  return (
    <section id="seccion-2-problema" className="py-4 md:py-6 px-4 lg:px-6">
      <div className="container max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm p-5 md:p-10">
          <div className="text-center mb-6 md:mb-10">
            <Badge
              variant="outline"
              className="mb-3 md:mb-4 text-primary border-primary/30 bg-primary/5 text-xs uppercase tracking-widest"
            >
              El Problema
            </Badge>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-serif">¿Te suena familiar?</h2>
          </div>

          {/* Alternating rows: card + image */}
          <div className="flex flex-col gap-4 md:gap-6">
            {problems.map(({ icon: Icon, title, description }, i) => {
              const imgSrc = problemImages[i + 1]; // skip index 0 (main illustration)
              const isEven = i % 2 === 0;
              return (
                <div
                  key={title}
                  className={`flex flex-col md:flex-row items-center gap-4 md:gap-6 ${!isEven ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Image */}
                  <div className="flex-shrink-0 w-full max-w-[180px] sm:max-w-[200px] md:w-52">
                    <img src={imgSrc} alt={title} className="w-full h-auto rounded-xl object-contain" loading="lazy" />
                  </div>
                  {/* Card */}
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
  },
  {
    profile: "Nutrióloga · Valencia, ES",
    pain: "Variedad agotadora",
    quote: "Entre decidir y ejecutar, acabo repitiendo lo de siempre.",
  },
  { profile: "Nutrióloga · CDMX, MX", pain: "Cambios que descuadran", quote: "Cambio una cosa y se descompensa todo." },
  {
    profile: "Nutrióloga · Lima, PE",
    pain: "Edición eterna",
    quote: "Siempre hay que retocar algo antes de enviarlo.",
  },
  {
    profile: "Nutrióloga · Tegucigalpa, HN",
    pain: "Local vs irreal",
    quote: "No quiero recetas raras: quiero algo que se pueda hacer aquí.",
  },
  {
    profile: "Nutrióloga · (Ciudad), (País)",
    pain: "Entrega lenta",
    quote: "Se me junta todo y lo mando días después.",
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
    <section className="py-4 sm:py-6 md:py-10 px-4 lg:px-6 bg-muted/30">
      <div className="container max-w-5xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
        {/* Chips + Quote block */}
        <div className="space-y-3 sm:space-y-4 md:space-y-5">
          {/* Horizontal scroll on mobile, wrap on desktop */}
          <div className="flex gap-2 justify-start sm:justify-center overflow-x-auto pb-1 sm:pb-0 sm:flex-wrap scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {cityChips.map((chip) => (
              <button
                key={chip}
                onClick={() => handleChip(chip)}
                aria-pressed={activeChip === chip}
                className={[
                  "rounded-full px-3 py-1.5 text-[11px] sm:text-xs font-medium border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring whitespace-nowrap flex-shrink-0 active:scale-95",
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
      </div>
    </section>
  );
}

// ─── Results ─────────────────────────────────────────────────────────────────
const stats = [
  {
    value: "Menú que encaja de verdad",
    label: "realista y clínico",
    time: "+10''",
    desc: "Platos que cuadran con el caso y con su día a día (sin ideas al tuntún ni ingredientes imposibles).",
  },
  {
    value: "Plan completo",
    label: "sin hoja en blanco",
    time: "+20''",
    desc: 'Pasas de "¿Qué le pongo?" a un plan base listo, generado a partir de restricciones, objetivos y contexto.',
  },
  {
    value: "Ajuste fino",
    label: "sin descompensar el plan",
    time: "+15''",
    desc: "Cambias un ingrediente y Kleia recalcula el plan para que las macros/calorías sigan cuadrando.",
  },
  {
    value: "Entrega al paciente",
    label: "",
    time: "+7''",
    desc: "PDF listo + lista de compra agrupada para enviar por WhatsApp/email/enlace sin pasos extra.",
  },
];

// ─── S3 · Resultados ─────────────────────────────────────────────────────────
function ResultsSection() {
  const { ref, inView } = useInView(0.25);
  const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [phase, setPhase] = useState(0);
  const [metricPulse, setMetricPulse] = useState(false);

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      setPhase(5);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    [0, 1, 2, 3].forEach((i) => {
      timers.push(
        setTimeout(
          () => {
            setPhase(i + 1);
            setMetricPulse(true);
            setTimeout(() => setMetricPulse(false), 500);
          },
          500 + i * 500,
        ),
      );
    });
    timers.push(setTimeout(() => setPhase(5), 500 + 3 * 500 + 600));
    return () => timers.forEach(clearTimeout);
  }, [inView, reducedMotion]);

  const cardVisible = (i: number) => inView && (reducedMotion || phase >= i + 1);
  const hourValues = ["0", "2", "4", "5", "6+"];
  const displayHours = hourValues[Math.min(phase, 4)];

  return (
    <section id="seccion-3-resultados" className="py-4 md:py-6 px-4 lg:px-6" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm p-5 md:p-10">
          <div className="text-center mb-6 md:mb-10">
            <Badge
              variant="outline"
              className="mb-3 md:mb-4 text-primary border-primary/30 bg-primary/5 text-xs uppercase tracking-widest"
            >
              RESULTADOS CON KLEIA
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif">Menos carga, más control</h2>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="flex-shrink-0 w-full md:w-72 flex flex-col items-center">
              <img
                src={resultadosIlustracion}
                alt="Nutricionista usando Kleia"
                className="w-full max-w-[220px] md:max-w-none object-contain"
              />
              <div className="mt-4 text-center">
                <p
                  className={[
                    "text-4xl font-bold font-serif transition-all duration-300",
                    phase === 5 ? "scale-110" : "",
                    metricPulse && !reducedMotion ? "scale-110" : "scale-100",
                  ].join(" ")}
                  style={{
                    transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease, color 0.25s ease",
                    opacity: inView ? 1 : 0,
                    color: metricPulse && !reducedMotion ? "hsl(142 71% 45%)" : "hsl(var(--primary))",
                  }}
                >
                  {reducedMotion ? "6+" : displayHours} horas
                </p>
                <p
                  className="text-sm font-semibold mt-1"
                  style={{ opacity: inView ? 1 : 0, transition: "opacity 0.5s ease 0.2s" }}
                >
                  más a la semana
                </p>
                <p
                  className="text-xs text-muted-foreground mt-1 leading-relaxed"
                  style={{ opacity: inView ? 1 : 0, transition: "opacity 0.5s ease 0.4s" }}
                >
                  Que antes se iban en armar y enviar planes
                </p>
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

            <div className="flex-1 flex flex-col gap-3">
              <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                detalles que nos importan
              </p>
              {stats.map(({ value, label, time, desc }, i) => {
                const visible = cardVisible(i);
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
                    <div className="flex flex-col items-center justify-center bg-primary/10 py-4 px-3 w-1/3 shrink-0 gap-1.5">
                      <p className="text-[0.75rem] font-bold font-serif text-primary text-center leading-snug">
                        {value}
                      </p>
                      {label && (
                        <p className="text-[0.55rem] font-semibold text-primary/70 text-center leading-tight">
                          {label}
                        </p>
                      )}
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
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
const steps = [
  {
    num: "01",
    title: "Carga lo mínimo",
    desc: "Ingresa las restricciones, preferencias y objetivos del paciente una sola vez. Kleia los recuerda siempre.",
    image: null as string | null,
  },
  {
    num: "02",
    title: "Genera el plan",
    desc: "Con un click, Kleia crea un plan semanal completo, balanceado y adaptado al perfil del paciente.",
    image: null as string | null,
  },
  {
    num: "03",
    title: "Ajusta sin descuadres",
    desc: "Cambia cualquier alimento y el sistema recalcula calorías y macros automáticamente en tiempo real.",
    image: null as string | null,
  },
  {
    num: "04",
    title: "Entrega en 1 click",
    desc: "Exporta el plan como PDF listo para compartir. Sin formatear, sin copiar y pegar.",
    image: null as string | null,
  },
];

// Shah-mat vertical offsets — más suaves para que las cards no se pisen
const STEP_OFFSETS = [0, 24, -24, 0];

// ─── S4 · Cómo funciona ──────────────────────────────────────────────────────
function HowItWorksSection() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);

  const [activeStep, setActiveStep] = useState(-1);
  const [hasPlayed, setHasPlayed] = useState(false);

  const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed) {
          setTimeout(() => runAnimation(), 200);
          setHasPlayed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasPlayed]);

  function runAnimation() {
    if (reducedMotion) {
      setActiveStep(4);
      return;
    }
    // Highlight cards one by one with a staggered delay
    const delays = [0, 500, 1000, 1500];
    delays.forEach((delay, i) => {
      setTimeout(() => setActiveStep(i), delay);
    });
    setTimeout(() => setActiveStep(4), 2000);
  }

  const isHighlighted = (i: number) => (reducedMotion ? true : activeStep >= i);

  function StepCard({
    num,
    title,
    desc,
    image,
    highlighted,
    style,
  }: {
    num: string;
    title: string;
    desc: string;
    image: string | null;
    highlighted: boolean;
    style?: React.CSSProperties;
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
    <section id="seccion-4-flujo" className="py-4 md:py-6 px-4 lg:px-6" ref={sectionRef}>
      <div className="container max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm p-5 md:p-10">
          <div className="text-center mb-8 md:mb-12">
            <Badge
              variant="outline"
              className="mb-3 md:mb-4 text-primary border-primary/30 bg-primary/5 text-xs uppercase tracking-widest"
            >
              Flujo
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif">Cómo funciona</h2>
          </div>

          {/* DESKTOP: Shah-mat 2×2 (sin animación de línea) */}
          <div className="hidden md:block">
            <div ref={gridRef} className="grid grid-cols-2 gap-10">
              <StepCard {...steps[0]} highlighted={isHighlighted(0)} style={{ marginTop: STEP_OFFSETS[0] }} />
              <StepCard {...steps[1]} highlighted={isHighlighted(1)} style={{ marginTop: STEP_OFFSETS[1] }} />
              <StepCard {...steps[2]} highlighted={isHighlighted(2)} style={{ marginTop: STEP_OFFSETS[2] }} />
              <StepCard {...steps[3]} highlighted={isHighlighted(3)} style={{ marginTop: STEP_OFFSETS[3] }} />
            </div>
          </div>

          {/* MOBILE: single col on tiny screens, 2 cols on sm+ */}
          <div className="md:hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {steps.map(({ num, title, desc, image }, i) => (
                <StepCard key={num} num={num} title={title} desc={desc} image={image} highlighted={isHighlighted(i)} />
              ))}
            </div>
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-4" aria-hidden="true">
              {steps.map((s, i) => (
                <React.Fragment key={s.num}>
                  <span
                    className="text-[9px] sm:text-[10px] font-bold rounded-full px-1.5 sm:px-2 py-0.5 transition-all duration-300"
                    style={{
                      backgroundColor: isHighlighted(i) ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.15)",
                      color: isHighlighted(i) ? "hsl(var(--primary-foreground))" : "hsl(var(--primary) / 0.5)",
                    }}
                  >
                    {s.num}
                  </span>
                  {i < steps.length - 1 && <span className="text-muted-foreground/40 text-[10px] sm:text-xs">→</span>}
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
  { label: "Generación de planes semanales en minutos", icon: "📋" },
  { label: "Adaptación automática a restricciones y alergias", icon: "🎯" },
  { label: "Recalculo instantáneo de macros al hacer cambios", icon: "⚡" },
  { label: "Biblioteca de alimentos con valores nutricionales", icon: "📚" },
  { label: "Exportación PDF lista para compartir", icon: "📄" },
  { label: "Historial por paciente accesible en todo momento", icon: "🗂️" },
  { label: "Acceso desde cualquier dispositivo, sin instalación", icon: "💻" },
  { label: "Soporte dedicado durante el piloto", icon: "🤝" },
];

const featureImages: Record<number, string> = {
  0: problema1,
  1: problema2,
  2: problema3,
  3: problema4,
  4: problemaIlustracion,
  5: resultadosIlustracion,
  6: problema1,
  7: problema2,
};

// ─── S5 · Qué incluye ────────────────────────────────────────────────────────
function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section id="seccion-5-incluido" className="py-4 md:py-6 px-4 lg:px-6">
      <div className="container max-w-5xl mx-auto">
        <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-sm p-4 sm:p-5 md:p-10">
          <div className="text-center mb-5 sm:mb-6 md:mb-10">
            <Badge
              variant="outline"
              className="mb-2 sm:mb-3 md:mb-4 text-primary border-primary/30 bg-primary/5 text-[10px] sm:text-xs uppercase tracking-widest"
            >
              Incluido
            </Badge>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-serif">Qué incluye Kleia</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-10 items-center">
            <div className="flex-shrink-0 w-full md:w-80 h-56 sm:h-64 md:h-96 rounded-2xl bg-muted border border-border overflow-hidden flex items-center justify-center">
              <img
                src={featureImages[activeFeature]}
                alt={features[activeFeature].label}
                className="w-full h-full object-contain p-4 transition-opacity duration-300"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1.5 sm:gap-2 w-full">
              {features.map(({ label, icon }, i) => (
                <button
                  key={label}
                  onClick={() => setActiveFeature(i)}
                  className={[
                    "inline-flex items-center gap-2 sm:gap-2.5 md:gap-3 border rounded-full px-3 sm:px-4 md:px-5 py-2 md:py-2.5 text-[11px] sm:text-xs md:text-sm font-medium transition-all text-left",
                    activeFeature === i
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-primary/8 hover:bg-primary/15 text-primary border-primary/20",
                  ].join(" ")}
                >
                  <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 flex-shrink-0" />
                  {label}
                </button>
              ))}
              <div className="mt-3 sm:mt-4">
                <Button
                  onClick={openWhatsApp}
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 rounded-full px-5 sm:px-6 md:px-8 text-xs sm:text-sm md:text-base font-medium shadow-md w-full sm:w-auto h-10 sm:h-11"
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
    <section id="seccion-6-comparativa" className="py-4 md:py-6 px-4 lg:px-6">
      <div className="container max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm p-5 md:p-10">
          <div className="text-center mb-6 md:mb-10">
            <Badge
              variant="outline"
              className="mb-3 md:mb-4 text-primary border-primary/30 bg-primary/5 text-xs uppercase tracking-widest"
            >
              Comparativa
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif">¿Por qué Kleia y no otra cosa?</h2>
          </div>
          <div className="relative">
            <div className="overflow-x-auto -mx-5 md:mx-0 md:px-0 scrollbar-hide">
              <table className="text-sm border-collapse min-w-[600px] w-full">
                <thead className="sticky top-0 z-10 bg-white">
                  <tr>
                    <th className="text-left p-2 sm:p-2.5 md:p-4 text-muted-foreground font-medium text-[11px] sm:text-xs md:text-sm whitespace-nowrap">
                      Funcionalidad
                    </th>
                    <th className="p-2 sm:p-2.5 md:p-4 text-center text-muted-foreground font-medium text-[11px] sm:text-xs md:text-sm">
                      Excel
                    </th>
                    <th className="p-2 sm:p-2.5 md:p-4 text-center text-muted-foreground font-medium text-[11px] sm:text-xs md:text-sm">
                      Avena
                    </th>
                    <th className="p-2 sm:p-2.5 md:p-4 text-center text-muted-foreground font-medium text-[11px] sm:text-xs md:text-sm">
                      Artesanal
                    </th>
                    <th className="p-2 sm:p-2.5 md:p-4 text-center bg-primary/8 rounded-t-xl">
                      <div className="flex items-center justify-center py-0.5">
                        <img src={kleiaLogo} alt="Kleia" className="h-4 sm:h-5 md:h-7 w-auto" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map(({ feature, excel, avena, artesanal, kleia }, i) => (
                    <tr key={feature} className={i % 2 === 0 ? "bg-background/60" : ""}>
                      <td className="p-2 sm:p-2.5 md:p-4 text-foreground/80 text-[11px] sm:text-xs md:text-sm whitespace-nowrap">
                        {feature}
                      </td>
                      <td className="p-2 sm:p-2.5 md:p-4 text-center">
                        <CellValue val={excel} />
                      </td>
                      <td className="p-2 sm:p-2.5 md:p-4 text-center">
                        <CellValue val={avena} />
                      </td>
                      <td className="p-2 sm:p-2.5 md:p-4 text-center">
                        <CellValue val={artesanal} />
                      </td>
                      <td className="p-2 sm:p-2.5 md:p-4 text-center bg-success/5">
                        <CellValue val={kleia} />
                      </td>
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

// ─── Archetype data (kept for FlipCard use) ────────────────────────────────────
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
    cta: "Enséñame cómo sería",
    accentBorder: "hsl(var(--border))",
    highlight: false,
    muted: true,
    microcopy:
      "Si esto te funciona, genial. Kleia es para quien ya está hasta arriba y quiere recuperar control sin quemarse.",
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
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpenModal();
      }}
    >
      <div className="relative flex-1 bg-muted/30 overflow-hidden">
        <img src={arch.image} alt={arch.title} className="w-full h-full object-contain p-4" />
        <span
          className={`absolute top-3 left-3 inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${arch.badgeColor}`}
        >
          {arch.badge}
        </span>
      </div>
      <div className="px-5 py-4 border-t border-border bg-white">
        <h3 className="font-bold text-foreground leading-snug text-base mb-1">{arch.title}</h3>
        <p className="text-sm text-muted-foreground">{arch.subtitleNode ?? arch.subtitle}</p>
        <p className="text-xs text-muted-foreground/60 mt-3 flex items-center gap-1">
          <span className="text-base">👆</span>
          <span>Toca para ver más</span>
        </p>
      </div>
    </div>
  );
}

// ─── S7 · Encaje (Flip Cards) ─────────────────────────────────────────────────
function FitSection() {
  const [modalIdx, setModalIdx] = React.useState<number | null>(null);
  const modalArch = modalIdx !== null ? archetypes[modalIdx] : null;

  return (
    <section id="seccion-7-encaje" className="py-4 md:py-6 px-4 lg:px-6">
      <div className="container max-w-5xl mx-auto">
        <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-sm p-4 sm:p-5 md:p-8 lg:p-12">
          <div className="text-center mb-5 sm:mb-6 md:mb-10">
            <Badge
              variant="outline"
              className="mb-2 sm:mb-3 md:mb-4 text-primary border-primary/30 bg-primary/5 text-[10px] sm:text-xs uppercase tracking-widest"
            >
              Encaje
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif mb-2 md:mb-3">Elige tu perfil</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
              Si te suena alguno, Kleia probablemente te va a ahorrar tiempo de verdad.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {archetypes.map((arch, i) => (
              <ProfileCard key={i} arch={arch} onOpenModal={() => setModalIdx(i)} />
            ))}
          </div>
          <div className="text-center mt-6 md:mt-10">
            <button
              onClick={openWhatsApp}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 md:px-8 py-3 md:py-3.5 rounded-full hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 shadow-md text-sm md:text-base"
            >
              Agendar demo →
            </button>
          </div>
        </div>
      </div>
      {modalArch &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
            onClick={() => setModalIdx(null)}
            role="dialog"
            aria-modal="true"
            aria-label={modalArch.title}
          >
            <div
              className="bg-white rounded-2xl w-full max-w-md max-h-[85vh] overflow-y-auto p-6 shadow-2xl animate-fade-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${modalArch.badgeColor}`}
                >
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
                <p className="text-xs text-muted-foreground italic border-t border-border pt-3 mb-4">
                  {modalArch.microcopy}
                </p>
              )}
              {modalArch.withKleia && (
                <p className="text-sm border-t border-border pt-3 mb-4">
                  <span className="font-semibold text-primary">Con Kleia: </span>
                  <span className="text-muted-foreground">{modalArch.withKleia}</span>
                </p>
              )}
              <button
                onClick={() => {
                  setModalIdx(null);
                  openWhatsApp();
                }}
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
          </div>,
          document.body,
        )}
    </section>
  );
}

// ─── S7c · Historia detrás de Kleia ──────────────────────────────────────────
const storyPhotos = [
  { src: storyImg1, caption: "La obsesión: quitar fricción que te quema." },
  { src: storyImg2, caption: "El patrón: planes, ajustes, mensajes… siempre." },
  { src: storyImg3, caption: "La chispa: la lista de la compra a mano." },
];

const NEW_STORY_TEXT = `Llevo años creando productos digitales con una obsesión: quitar la fricción que te roba vida.
Primero lo vi como usuaria: con mi entrenador todo era WhatsApp, calendarios y pagos a mano. Pensé: "esto se puede simplificar".

Después, trabajando con un nutricionista, vi el mismo patrón: tareas pequeñas, repetidas cada semana, que te dejan sin margen. Y cada mejora que proponía era un "sí".

La chispa fue ver a una familia haciendo la lista de la compra a mano para poder seguir una dieta. Ahí lo tuve claro.
Le escribí a Mario y, cuando dijo "sí", arrancó de verdad: problema real + equipo complementario.

Así nació Kleia: un asistente para nutricionistas para crear menús que encajan, editar sin descuadres y entregar rápido — sin que el plan se te coma la semana.`;

function StorySection() {
  const [current, setCurrent] = useState(0);
  const total = storyPhotos.length;
  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  // Auto-advance loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, 3500);
    return () => clearInterval(interval);
  }, [total]);

  return (
    <section id="seccion-7c-historia" className="py-4 md:py-6 px-4 lg:px-6">
      <div className="container max-w-5xl mx-auto">
        <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-sm p-4 sm:p-5 md:p-8 lg:p-12">
          {/* Header */}
          <div className="text-center mb-5 sm:mb-6 md:mb-10">
            <Badge
              variant="outline"
              className="mb-2 sm:mb-3 md:mb-4 text-primary border-primary/30 bg-primary/5 text-[10px] sm:text-xs uppercase tracking-widest"
            >
              Por qué existe
            </Badge>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-serif mb-1.5 sm:mb-2 md:mb-3">
              La historia detrás de Kleia
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-xs sm:text-sm md:text-base">
              Nació para quitarte trabajo invisible: el que empieza cuando termina la consulta.
            </p>
          </div>

          {/* Two-column: fotos izq, texto dcha */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-10 lg:gap-14 items-start mb-5 sm:mb-6 md:mb-10">
            {/* LEFT: Carousel de fotos */}
            <div className="flex flex-col items-center gap-2.5 sm:gap-3">
              <div className="w-full rounded-lg sm:rounded-xl border border-border/60 overflow-hidden shadow-sm bg-muted/20 relative">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={storyPhotos[current].src}
                    alt={storyPhotos[current].caption}
                    className="w-full h-full object-cover transition-opacity duration-300"
                    loading="lazy"
                  />
                </div>
                <p className="px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs text-muted-foreground italic leading-snug">
                  {storyPhotos[current].caption}
                </p>
                {/* Flechas */}
                <button
                  onClick={prev}
                  aria-label="Anterior"
                  className="absolute left-1.5 sm:left-2 top-[40%] -translate-y-1/2 bg-white/80 hover:bg-white active:bg-white rounded-full p-1 sm:p-1.5 shadow transition-colors"
                >
                  <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-foreground" />
                </button>
                <button
                  onClick={next}
                  aria-label="Siguiente"
                  className="absolute right-1.5 sm:right-2 top-[40%] -translate-y-1/2 bg-white/80 hover:bg-white active:bg-white rounded-full p-1 sm:p-1.5 shadow transition-colors"
                >
                  <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-foreground" />
                </button>
              </div>

              {/* Dots */}
              <div className="flex items-center gap-1.5 sm:gap-2" aria-label="Fotos del carrusel">
                {storyPhotos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Foto ${i + 1}`}
                    className={`rounded-full transition-all duration-200 ${
                      i === current
                        ? "w-4 sm:w-5 h-1.5 sm:h-2 bg-primary"
                        : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-primary/25 hover:bg-primary/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT: Texto */}
            <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
              {NEW_STORY_TEXT.split("\n\n").map((para, i) => (
                <p key={i} className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Mini-cards */}
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

          {/* CTA */}
          <div className="text-center">
            <button
              onClick={openWhatsApp}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-full hover:bg-primary/90 active:bg-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 shadow-md text-xs sm:text-sm md:text-base"
            >
              Enséñame cómo sería
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── S8 · Bonos y Garantía ───────────────────────────────────────────────────
function BonusesSection() {
  return (
    <section id="seccion-8-extras" className="py-4 md:py-6 px-4 lg:px-6">
      <div className="container max-w-4xl mx-auto">
        <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-sm p-4 sm:p-5 md:p-10">
          <div className="text-center mb-5 sm:mb-6 md:mb-10">
            <Badge
              variant="outline"
              className="mb-2 sm:mb-3 md:mb-4 text-primary border-primary/30 bg-primary/5 text-[10px] sm:text-xs uppercase tracking-widest"
            >
              Extras
            </Badge>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-serif">
              Bonos incluidos en el piloto
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5 mb-5 sm:mb-6 md:mb-10">
            {[
              {
                icon: Gift,
                title: "Bono 1: Setup asistido",
                desc: "Te acompañamos a cargar tus primeros pacientes y configurar Kleia a tu flujo de trabajo. Sin perderte en la herramienta.",
              },
              {
                icon: MessageSquare,
                title: "Bono 2: Canal de Expertos",
                desc: "Acceso a un canal privado donde puedes consultar dudas de nutrición con otros profesionales y con el equipo de Kleia.",
              },
              {
                icon: ShieldCheck,
                title: "Garantía: Cancelación simple",
                desc: "Si en los primeros 30 días Kleia no te ahorra tiempo, cancelas sin preguntas. Sin contratos largos ni penalidades.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center p-3.5 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl bg-background">
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
              <div
                key={text}
                className="flex items-center gap-1.5 sm:gap-2 bg-primary/10 rounded-full px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2"
              >
                <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-primary" />
                <span className="text-[10px] sm:text-[11px] md:text-xs text-primary font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── S10 · Formulario demo (ahora redirige a WhatsApp) ───────────────────────
function DemoForm() {
  return (
    <section id="agendar-demo" className="py-4 md:py-6 px-4 lg:px-6">
      <div className="container max-w-lg mx-auto">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm p-6 md:p-10 text-center">
          <div className="mb-6 md:mb-8">
            <Badge
              variant="outline"
              className="mb-3 md:mb-4 text-primary border-primary/30 bg-primary/5 text-xs uppercase tracking-widest"
            >
              Demo
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold font-serif">Agenda tu demo</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Escribenos por WhatsApp y te contamos cómo funciona sin compromiso.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <Button
              onClick={openWhatsApp}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 font-medium shadow-md w-full sm:w-auto text-base"
            >
              Escribirnos por WhatsApp →
            </Button>
            <p className="text-xs text-muted-foreground">Acceso por invitación · Piloto cerrado: 10 plazas</p>
          </div>
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
    a: "Sí. Durante el piloto podés cancelar en cualquier momento sin penalidades. Si sientes que Kleia no te ahorra tiempo en los primeros 30 días",
  },
  {
    q: "¿Kleia reemplaza mi criterio profesional?",
    a: "No, y no está pensado para hacerlo. Kleia automatiza la parte mecánica (armar el plan, calcular macros, formatear el PDF), pero tu sigues siendo quien decide qué es mejor para cada paciente.",
  },
  {
    q: "¿Cuándo estará disponible para todos?",
    a: "Estamos en piloto cerrado con 10 plazas. Después del piloto, vamos a iterar el producto y abrir acceso gradualmente. Si quieres ser de los primeros, escríbenos por WhatsApp ahora.",
  },
];

// ─── S11 · FAQ ───────────────────────────────────────────────────────────────
function FAQSection() {
  return (
    <section id="seccion-11-faq" className="py-4 md:py-6 px-4 lg:px-6">
      <div className="container max-w-3xl mx-auto">
        <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-sm p-4 sm:p-5 md:p-10">
          <div className="text-center mb-5 sm:mb-6 md:mb-10">
            <Badge
              variant="outline"
              className="mb-2 sm:mb-3 md:mb-4 text-primary border-primary/30 bg-primary/5 text-[10px] sm:text-xs uppercase tracking-widest"
            >
              FAQ
            </Badge>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-serif">Preguntas frecuentes</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-1.5 sm:space-y-2">
            {faqs.map(({ q, a }, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-background border border-border rounded-lg sm:rounded-xl md:rounded-2xl px-3 sm:px-3.5 md:px-4"
              >
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
    </section>
  );
}

// ─── S12 · Footer CTA ────────────────────────────────────────────────────────
function FooterCTA() {
  return (
    <footer id="seccion-12-footer" className="pt-4 md:pt-6 pb-0">
      <div className="bg-foreground px-4 sm:px-6 md:px-10 py-8 sm:py-10 md:py-16 text-center text-background">
        <div className="flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
          <img src={kleiaLogo} alt="Kleia" className="h-6 sm:h-7 md:h-8 w-auto brightness-0 invert" />
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-serif mb-2.5 sm:mb-3 md:mb-4 leading-tight max-w-2xl mx-auto px-2">
          Recupera tu tiempo. Entrega planes que te enorgullezcan.
        </h2>
        <p className="text-background/70 mb-5 sm:mb-6 md:mb-8 leading-relaxed max-w-xl mx-auto text-xs sm:text-sm md:text-base px-2">
          Kleia está en piloto cerrado. Solo 10 plazas disponibles. Escríbenos por WhatsApp y descubre si Kleia es para
          ti.
        </p>
        <Button
          onClick={openWhatsApp}
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 rounded-full px-5 sm:px-6 md:px-8 font-medium shadow-md text-xs sm:text-sm md:text-base h-10 sm:h-11"
        >
          Agendar demo →
        </Button>
        <p className="mt-6 sm:mt-8 md:mt-10 text-[10px] sm:text-xs text-background/40">
          © {currentYear} Kleia · Hecho con amor para nutricionistas
        </p>
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
        <FadeSection>
          <Hero />
        </FadeSection>
        <FadeSection>
          <ProblemSection />
        </FadeSection>
        <FadeSection>
          <EvidenceStrip />
        </FadeSection>
        <FadeSection>
          <ResultsSection />
        </FadeSection>
        <FadeSection>
          <HowItWorksSection />
        </FadeSection>
        <FadeSection>
          <FeaturesSection />
        </FadeSection>
        <FadeSection>
          <ComparisonSection />
        </FadeSection>
        <FadeSection>
          <FitSection />
        </FadeSection>
        <FadeSection>
          <StorySection />
        </FadeSection>
        <FadeSection>
          <BonusesSection />
        </FadeSection>
        <FadeSection>
          <DemoForm />
        </FadeSection>
        <FadeSection>
          <FAQSection />
        </FadeSection>
      </main>
      <FadeSection>
        <FooterCTA />
      </FadeSection>
    </div>
  );
}
