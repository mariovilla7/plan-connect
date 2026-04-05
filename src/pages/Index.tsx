import kleiaLogo from "@/assets/kleia-logo.svg";
import heroMockup from "@/assets/seccion1-mockup1.png";
import storytellingImg from "@/assets/storytelling.png";
import gifPrecision from "@/assets/precision-clinica.gif";
import gifSustituciones from "@/assets/sustituciones-inteligentes.gif";
import gifListas from "@/assets/listas-compra.gif";
import gifEducacion from "@/assets/educacion-sin-esfuerzo.gif";
import gifEntrega from "@/assets/entrega-agil-whatsapp.gif";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IntroLoader from "@/components/IntroLoader";
import AnimatedSvgBackground from "@/components/AnimatedSvgBackground";
import SupportBot from "@/components/SupportBot";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Layers,
  Download,
  Play,
  Check,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ─── WhatsApp CTA ─────────────────────────────────────────────────────────────
const WA_NUMBER = "359896676923";
const WA_MESSAGE = encodeURIComponent("Hola! Me interesa conocer más sobre Kleia y agendar una demo. ¿Podemos hablar?");
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;
const currentYear = new Date().getFullYear();

function openWhatsApp() {
  window.open(WA_URL, "_blank", "noopener,noreferrer");
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
const navLinks = [
  { label: "Lo que dicen los expertos", id: "seccion-expertos" },
  { label: "Tu jornada con Kleia", id: "seccion-jornada" },
  { label: "Potencia tu Consulta", id: "seccion-features" },
  { label: "Precio", id: "seccion-precio" },
  { label: "Preguntas Frecuentes", id: "seccion-faq" },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-lg border-b border-border/50 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container max-w-7xl mx-auto flex items-center justify-between h-14 md:h-16 lg:h-20 px-4 sm:px-6">
        <img src={kleiaLogo} alt="Kleia" className="h-6 sm:h-7 md:h-8 w-auto" />
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`text-xs font-medium rounded-full px-3 py-2 transition-all ${
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
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-5 md:px-6 text-xs md:text-sm font-semibold shadow-sm h-9 md:h-10"
          >
            Agendar demo
          </Button>
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
          >
            <span className={`block w-5 h-0.5 bg-foreground transition-transform ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-foreground transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>
      {open && (
        <nav className="lg:hidden bg-white/95 backdrop-blur-lg px-4 py-2 flex flex-col border-t border-border/30">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => { scrollTo(id); setOpen(false); }}
              className="text-sm text-muted-foreground hover:text-foreground text-left py-3 border-b border-border/20 last:border-b-0"
            >
              {label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

// ─── S1 · Hero (Split layout como referencia) ────────────────────────────────
function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current!.children, {
        opacity: 0, y: 40, stagger: 0.12, duration: 0.8, ease: "power3.out", delay: 0.2,
      });
      gsap.from(mockupRef.current, {
        opacity: 0, x: 60, duration: 1, ease: "power3.out", delay: 0.5,
      });
      gsap.to(mockupRef.current, {
        yPercent: 20, ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] flex items-center bg-white overflow-hidden px-4 lg:px-6 pt-20 md:pt-0"
    >
      <AnimatedSvgBackground className="opacity-100" />
      <div className="container max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Text */}
        <div ref={textRef} className="space-y-5 md:space-y-6">
          <div>
            <span className="inline-block bg-primary/10 text-primary text-[10px] sm:text-xs font-medium px-3 py-1.5 rounded-full mb-4">
              PARA NUTRICIONISTAS INDEPENDIENTES · SIN PERDER EL CRITERIO PROFESIONAL
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-heading leading-[1.1]">
            Deja de pensar
            <br />en menús.
            <br /><span className="text-primary">Termina tu día</span>
            <br /><span className="text-primary">con todos los planes</span>
            <br /><span className="text-primary">enviados.</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-md leading-relaxed">
            Genera planes clínicos en minutos. Envía un PDF listo por WhatsApp — sin copiar y pegar.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={openWhatsApp}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 text-sm md:text-base font-semibold shadow-lg h-12 md:h-14"
            >
              Pruébalo Gratis
            </Button>
            <Button
              onClick={() => scrollTo("seccion-video")}
              variant="outline"
              size="lg"
              className="rounded-full px-8 text-sm md:text-base font-semibold h-12 md:h-14 border-border"
            >
              <Play className="h-4 w-4 mr-2" /> Ver Demo
            </Button>
          </div>
        </div>
        {/* Mockup */}
        <div ref={mockupRef} className="flex items-center justify-center">
          <img
            src={heroMockup}
            alt="Kleia app mockup"
            className="w-full max-w-lg h-auto object-contain drop-shadow-2xl"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}

// ─── S2 · Lo que dicen los expertos ──────────────────────────────────────────
const testimonials = [
  {
    quote: "Una herramienta con IA pensada para agilizar el trabajo del nutricionista sin sustituir su criterio.",
    name: "Dra. Elena Rossi",
    specialty: "Salud hormonal femenina",
    country: "España",
  },
  {
    quote: "Una propuesta innovadora y abierta al feedback real de profesionales de la nutrición.",
    name: "Dra. Elena Rossi",
    specialty: "Salud hormonal femenina",
    country: "España",
  },
  {
    quote: "Cálculos claros, personalizables y siempre bajo control del nutricionista.",
    name: "Marc Galván",
    specialty: "Nutrición clínica",
    country: "Perú",
  },
  {
    quote: "Una herramienta con potencial real para ahorrar tiempo sin perder personalización.",
    name: "Marc Galván",
    specialty: "Nutrición clínica",
    country: "Perú",
  },
  {
    quote: "Te ahorra muchísimo tiempo sin quitarte el control clínico.",
    name: "Sofía Müller",
    specialty: "Nutrición clínica",
    country: "México",
  },
  {
    quote: "No es un software rígido: te propone, calcula y tú decides.",
    name: "Sofía Müller",
    specialty: "Nutrición clínica",
    country: "México",
  },
  {
    quote: "Convierte la creación del plan nutricional en un proceso mucho más práctico, editable y claro.",
    name: "Sofía Müller",
    specialty: "Nutrición clínica",
    country: "México",
  },
  {
    quote: "Lo que más me llamó la atención fue que se adapta al país y a sus guías nutricionales.",
    name: "Laura Méndez",
    specialty: "Nutrición Diabética y SOP",
    country: "México",
  },
  {
    quote: "Sí ahorra bastante tiempo y se siente como un asistente para el nutricionista.",
    name: "Laura Méndez",
    specialty: "Nutrición Diabética y SOP",
    country: "México",
  },
  {
    quote: "Me encantó: reúne en un solo lugar expediente, plan alimenticio y seguimiento del paciente.",
    name: "Andrea Solís",
    specialty: "Nutricionista ocupacional",
    country: "México",
  },
  {
    quote: "Crear planes nutricionales se siente mucho más rápido y sencillo.",
    name: "Carla Vélez",
    specialty: "Nutrióloga clínica",
    country: "México",
  },
  {
    quote: "Me dio mucha confianza ver que las calorías salían prácticamente igual que en mi cálculo manual.",
    name: "Carla Vélez",
    specialty: "Nutrióloga clínica",
    country: "México",
  },
  {
    quote: "Me siento 100% identificada con esta solución porque resuelve cosas que hoy me quitan muchísimo tiempo.",
    name: "Carla Vélez",
    specialty: "Nutrióloga clínica",
    country: "México",
  },
  {
    quote: "Se nota que está pensada para adaptarse al nutricionista, no al revés.",
    name: "Patricia Ramos",
    specialty: "Nutrióloga clínica",
    country: "Perú",
  },
  {
    quote: "Te ahorra tiempo de consulta y hace el proceso mucho más directo.",
    name: "Valeria Ortiz",
    specialty: "Nutrióloga clínica",
    country: "Ecuador",
  },
  {
    quote: "Lo veo muy completo y muy utilizable en consulta real.",
    name: "Dr. Javier Ruiz",
    specialty: "Patologías digestivas",
    country: "España",
  },
  {
    quote: "Ahorra tiempo antes y durante la consulta con perfiles de paciente más completos desde el primer momento.",
    name: "Ricardo Flores",
    specialty: "Nutriólogo deportivo",
    country: "Honduras",
  },
];

function ExpertsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll(".testimonial-card");
    gsap.set(cards, { opacity: 0, y: 50, scale: 0.95 });
    const tl = gsap.to(cards, {
      opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: "power2.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" },
    });
    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);

  // Show 3 featured cards at a time - pick representative ones
  const featured = [testimonials[0], testimonials[2], testimonials[4], testimonials[5], testimonials[7], testimonials[9], testimonials[10], testimonials[13], testimonials[14], testimonials[15], testimonials[16]];

  return (
    <div ref={sectionRef} className="container max-w-7xl mx-auto">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading">
          Lo que dicen los expertos
        </h2>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-4 px-4"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {featured.map((t, i) => (
            <div
              key={i}
              className="testimonial-card snap-start flex-shrink-0 w-[300px] sm:w-[340px] bg-card rounded-2xl border border-border p-6 flex flex-col gap-4 shadow-sm"
            >
              <div className="text-primary text-4xl font-heading leading-none">"</div>
              <p className="text-sm md:text-base text-foreground leading-relaxed flex-1 italic">
                {t.quote}
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-border/50">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.specialty}, {t.country}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Arrows */}
        <button
          onClick={() => scroll("left")}
          className={`hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 items-center justify-center rounded-full bg-white border border-border shadow-md transition-opacity ${canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => scroll("right")}
          className={`hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 items-center justify-center rounded-full bg-white border border-border shadow-md transition-opacity ${canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

// ─── S3 · Video / Visual Section ─────────────────────────────────────────────
function VideoSection() {
  return (
    <div className="container max-w-6xl mx-auto text-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-3 md:mb-4">
        Transforma datos clínicos en experiencias visuales únicas
      </h2>
      <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto mb-8 md:mb-12">
        Mira cómo Kleia convierte la información del paciente en planes nutricionales personalizados.
      </p>
      <div className="relative rounded-2xl overflow-hidden bg-foreground/5 aspect-video max-w-4xl mx-auto group cursor-pointer shadow-2xl">
        <img
          src={storytellingImg}
          alt="Demo de Kleia"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
            <Play className="h-7 w-7 md:h-8 md:w-8 text-primary fill-primary ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── S4 · Tu jornada con Kleia (3 pasos) ────────────────────────────────────
const journeySteps = [
  {
    icon: ClipboardList,
    num: "1",
    title: "Ingresa los Datos",
    desc: "Ingresa restricciones, preferencias y objetivos del paciente una sola vez. Kleia los guarda para no repetir trabajo.",
  },
  {
    icon: Layers,
    num: "2",
    title: "Asignar y reajustar su plan clínico",
    desc: "Genera menús completos al instante y realiza cambios con recálculo automático de macros.",
  },
  {
    icon: Download,
    num: "3",
    title: "Descarga en 1 click",
    desc: "Exporta el plan como PDF listo para compartir y lo envías por WhatsApp / email como siempre.",
  },
];

function JourneySection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const cards = ref.current.querySelectorAll(".journey-card");
    gsap.set(cards, { opacity: 0, y: 60 });
    const tl = gsap.to(cards, {
      opacity: 1, y: 0, duration: 0.7, stagger: 0.2, ease: "power2.out",
      scrollTrigger: { trigger: ref.current, start: "top 75%", toggleActions: "play none none none" },
    });
    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="container max-w-6xl mx-auto">
      <div className="text-center mb-8 md:mb-14">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-2">
          Tu jornada con Kleia
        </h2>
        <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
          De la clínica al diseño nutricional en tres simples pasos.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {journeySteps.map((step) => (
          <div key={step.num} className="journey-card text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
              <step.icon className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-semibold text-base md:text-lg">
              <span className="text-primary">{step.num}.</span> {step.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── S5 · Potencia tu Consulta (Feature cards with images) ──────────────────
const featureCards = [
  {
    title: "Precisión clínica en segundos",
    desc: "Calcula kcal, macros y micros en segundos con total precisión clínica.",
    image: gifPrecision,
  },
  {
    title: "Sustituciones inteligentes",
    desc: "Edita con sustituciones inteligentes que recalculan calorías en tiempo real.",
    image: gifSustituciones,
  },
  {
    title: "Listas de compra automáticas",
    desc: "Genera listas de compra automáticamente con cada ingrediente del plan.",
    image: gifListas,
  },
  {
    title: "Educación sin esfuerzo",
    desc: "Integra módulos educativos en el plan para que tus pacientes aprendan desde casa.",
    image: gifEducacion,
  },
];

const featureCardsSecondary = [
  {
    title: "Entrega ágil WhatsApp/PDF",
    desc: "Exporta a PDF o envía por WhatsApp de forma profesional en un click.",
    image: gifEntrega,
  },
];

function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const cards = ref.current.querySelectorAll(".feature-card");
    gsap.set(cards, { opacity: 0, y: 80, scale: 0.95 });
    const tl = gsap.to(cards, {
      opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.2)",
      scrollTrigger: { trigger: ref.current, start: "top 75%", toggleActions: "play none none none" },
    });
    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="container max-w-6xl mx-auto">
      <div className="text-center mb-8 md:mb-14">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-2">
          Potencia tu Consulta
        </h2>
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
          Software diseñado para el nutricionista de alto rendimiento. Rigor científico impulsado por inteligencia artificial.
        </p>
      </div>

      {/* Main 2x2 grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-5 md:mb-6">
        {featureCards.map((f) => (
          <div key={f.title} className="feature-card bg-card rounded-2xl border border-border overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="aspect-[16/10] bg-muted/30 overflow-hidden">
              <img src={f.image} alt={f.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
            <div className="p-5 md:p-6">
              <h3 className="font-semibold text-base md:text-lg mb-1.5">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Secondary - single centered card */}
      <div className="max-w-md mx-auto">
        {featureCardsSecondary.map((f) => (
          <div key={f.title} className="feature-card bg-card rounded-2xl border border-border overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="aspect-[16/10] bg-muted/30 overflow-hidden">
              <img src={f.image} alt={f.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
            <div className="p-5 md:p-6">
              <h3 className="font-semibold text-base md:text-lg mb-1.5">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── S6 · Pricing ────────────────────────────────────────────────────────────
const pricingFeatures = [
  "Acceso a Kleia web, sin instalación",
  "Planes clínicos ilimitados",
  "Ajustes con recálculo automático de macros",
  "Acceso al marketplace (fuera de tiempo)",
  "Export PDF, lista + lista de compra",
  "Envía por vía WhatsApp/email gratis",
  "Plantillas",
  "Recetas",
  "Consulta de equivalencias de tus planes",
  "Copia de seguridad (backup) de datos",
  "Chat de soporte directo",
];

function PricingSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.from(ref.current.querySelector(".pricing-card")!, {
      opacity: 0, y: 80, scale: 0.9, duration: 0.9, ease: "back.out(1.5)",
      scrollTrigger: { trigger: ref.current, start: "top 75%", toggleActions: "play none none none" },
    });
  }, []);

  return (
    <div ref={ref} className="container max-w-3xl mx-auto">
      <div className="text-center mb-8 md:mb-14">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-2">
          Crecimiento sin Límites
        </h2>
        <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
          Escoge tu plan antes de que se acaben nuestra oferta de lanzamiento. Transparente, tu éxito, sin costes ocultos.
        </p>
      </div>

      <div className="pricing-card max-w-md mx-auto bg-card rounded-3xl border-2 border-primary/30 p-6 md:p-8 shadow-xl">
        <div className="text-center mb-6">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-3">Plan Fundador</Badge>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-muted-foreground line-through text-lg">35€</span>
            <span className="text-5xl md:text-6xl font-bold font-heading text-primary">20€</span>
            <span className="text-muted-foreground text-sm">/mes</span>
          </div>
        </div>

        <ul className="space-y-3 mb-8">
          {pricingFeatures.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/80">
              <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        <Button
          onClick={openWhatsApp}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-12 text-base font-semibold shadow-lg"
        >
          Elegir Plan Fundador
        </Button>
      </div>
    </div>
  );
}

// ─── S7 · FAQ ────────────────────────────────────────────────────────────────
const faqs = [
  { q: "¿Necesito saber de tecnología para usar Kleia?", a: "No. Si podés usar WhatsApp, podés usar Kleia. Te acompañamos en el setup inicial." },
  { q: "¿Qué pasa con los datos de mis pacientes?", a: "Los datos son tuyos. Kleia los usa solo para generar los planes y no los comparte con terceros." },
  { q: "¿Puedo cancelar cuando quiero?", a: "Sí. Durante el piloto podés cancelar en cualquier momento sin penalidades." },
  { q: "¿Kleia reemplaza mi criterio profesional?", a: "No. Kleia automatiza la parte mecánica, pero tú decides qué es mejor para cada paciente." },
  { q: "¿Cuándo estará disponible para todos?", a: "Estamos en piloto cerrado con 10 plazas. Si quieres ser de los primeros, escríbenos por WhatsApp." },
];

function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll(".faq-item");
    gsap.set(items, { opacity: 0, y: 30 });
    const tl = gsap.to(items, {
      opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out",
      scrollTrigger: { trigger: ref.current, start: "top 80%", toggleActions: "play none none none" },
    });
    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="container max-w-3xl mx-auto">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading">
          Preguntas Frecuentes
        </h2>
      </div>
      <Accordion type="single" collapsible className="space-y-2">
        {faqs.map(({ q, a }, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="faq-item bg-card border border-border rounded-xl px-4"
          >
            <AccordionTrigger className="font-medium text-sm text-left hover:no-underline py-4">
              {q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
              {a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-foreground text-background py-10 md:py-16 mt-8 md:mt-12">
      <div className="container max-w-6xl mx-auto text-center space-y-4">
        <img src={kleiaLogo} alt="Kleia" className="h-7 md:h-8 w-auto mx-auto brightness-0 invert" />
        <p className="text-xs text-background/40">
          © {currentYear} Kleia · CREADO CON ❤ PARA NUTRICIONISTAS
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
        className="min-h-screen font-sans overflow-x-clip"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.3s ease" }}
      >
        <Navbar />
        <main>
          <Hero />

          {/* Expertos - fondo lavanda */}
          <section id="seccion-expertos" className="py-16 md:py-24 px-4 lg:px-6 bg-background">
            <ExpertsSection />
          </section>

          {/* Video */}
          <section id="seccion-video" className="py-16 md:py-24 px-4 lg:px-6 bg-primary text-primary-foreground">
            <VideoSection />
          </section>

          {/* Jornada - fondo blanco */}
          <section id="seccion-jornada" className="py-16 md:py-24 px-4 lg:px-6 bg-white relative">
            <AnimatedSvgBackground className="opacity-10" />
            <JourneySection />
          </section>

          {/* Features - fondo lavanda */}
          <section id="seccion-features" className="py-16 md:py-24 px-4 lg:px-6 bg-background">
            <FeaturesSection />
          </section>

          {/* Pricing - fondo blanco */}
          <section id="seccion-precio" className="py-16 md:py-24 px-4 lg:px-6 bg-white relative">
            <AnimatedSvgBackground className="opacity-10" />
            <PricingSection />
          </section>

          {/* FAQ - fondo lavanda */}
          <section id="seccion-faq" className="py-16 md:py-24 px-4 lg:px-6 bg-background">
            <FAQSection />
          </section>
        </main>
        <Footer />
      </div>
      <SupportBot />
    </>
  );
}
