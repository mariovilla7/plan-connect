import kleiaLogo from "@/assets/kleia-logo.svg";
import heroMockup from "@/assets/hero image.png";
import gifPrecision from "@/assets/precision-clinica.gif";
import gifSustituciones from "@/assets/sustituciones-inteligentes.gif";
import gifListas from "@/assets/listas-compra.gif";
import gifEducacion from "@/assets/educacion-sin-esfuerzo.gif";
import gifEntrega from "@/assets/entrega-agil-whatsapp.gif";
import gifContexto from "@/assets/Planes con contexto local (1).gif";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IntroLoader from "@/components/IntroLoader";
import SupportBot from "@/components/SupportBot";
import FeatureCard from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ClipboardList, Layers, Download, Play, Check, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ─── CONFIGURACIÓN DE ENLACES ─────────────────────────────────────────────────
const WA_NUMBER = "359896676923";
const WA_MESSAGE = encodeURIComponent("Hola! Me interesa conocer más sobre Kleia y agendar una demo. ¿Podemos hablar?");
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;
const LOGIN_URL = "https://imsolutions.studio/kleia/prototipo.html";
const currentYear = new Date().getFullYear();

const openWhatsApp = () => window.open(WA_URL, "_blank");
const openLogin = () => (window.location.href = LOGIN_URL);

// ─── NAV ──────────────────────────────────────────────────────────────────────
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
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-30% 0px -30% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[hsl(220,33%,97%)]/90 backdrop-blur-lg border-b border-border/50 shadow-sm"
          : "bg-[hsl(220,33%,97%)]/70 backdrop-blur-md"
      }`}
      style={{ height: 80 }}
    >
      <div className="max-w-[1280px] mx-auto flex items-center justify-between h-full px-4 sm:px-8">
        <img
          src={kleiaLogo}
          alt="Kleia"
          className="h-8 md:h-10 w-auto cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`relative text-[13px] font-bold font-heading py-2 transition-colors whitespace-nowrap tracking-tight group ${
                activeSection === id ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
              {/* Línea de subrayado */}
              <span
                className={`absolute left-0 bottom-0 h-[2px] bg-primary transition-all duration-300 ${
                  activeSection === id ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button
            onClick={openLogin}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 text-sm font-bold font-heading shadow-md h-10"
          >
            Iniciar sesión
          </Button>
          <button className="lg:hidden flex flex-col gap-1.5 p-2" onClick={() => setOpen(!open)} aria-label="Menú">
            <span
              className={`block w-5 h-0.5 bg-foreground transition-transform ${open ? "rotate-45 translate-y-2" : ""}`}
            />
            <span className={`block w-5 h-0.5 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
            <span
              className={`block w-5 h-0.5 bg-foreground transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </div>
      {/* Menú Móvil */}
      {open && (
        <nav className="lg:hidden bg-white/95 backdrop-blur-lg px-4 py-2 flex flex-col border-t border-border/30">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => {
                scrollTo(id);
                setOpen(false);
              }}
              className={`text-sm text-left py-3 border-b border-border/20 last:border-b-0 ${
                activeSection === id ? "text-primary font-semibold" : "text-muted-foreground"
              }`}
            >
              {label}
            </button>
          ))}
          <Button onClick={openLogin} className="w-full rounded-full mt-4 mb-2">
            Iniciar sesión
          </Button>
        </nav>
      )}
    </header>
  );
}

// ─── S1 · HERO ───────────────────────────────────────────────────────────────
function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current!.children, {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });
      gsap.from(mockupRef.current, { opacity: 0, x: 60, duration: 1, ease: "power3.out", delay: 0.5 });
      gsap.to(mockupRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden px-4 sm:px-8 bg-[hsl(220,33%,97%)] pt-[160px] pb-[128px]"
    >
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="max-w-[1280px] mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div ref={textRef} className="space-y-6">
          <span className="inline-block bg-primary/10 text-primary text-[11px] sm:text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wide">
            Para nutricionistas independientes · sin perder el criterio profesional
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-[56px] lg:text-[60px] font-bold font-heading leading-[1.08] tracking-[-3.6px]">
            Deja de pensar <br /> en menús. <br />
            <span className="text-primary">Termina tu día con todos los planes enviados.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-[512px] leading-relaxed">
            Genera planes clínicos en minutos. Envía un PDF listo por WhatsApp — sin copiar y pegar.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={openWhatsApp}
              size="lg"
              className="rounded-full px-8 text-lg font-bold font-heading h-14 shadow-lg bg-gradient-to-br from-[hsl(235,100%,65%)] to-primary text-white"
            >
              Pruébalo Gratis
            </Button>
            <Button
              onClick={() => scrollTo("seccion-video")}
              variant="ghost"
              size="lg"
              className="rounded-full px-8 text-lg font-bold font-heading h-14 bg-[hsl(220,20%,95%)] text-foreground"
            >
              <Play className="h-4 w-4 mr-2 text-primary fill-primary" /> Ver Demo
            </Button>
          </div>
        </div>
        <div ref={mockupRef} className="flex items-center justify-center relative">
          <img
            src={heroMockup}
            alt="Kleia app mockup"
            className="w-full max-w-[616px] h-auto object-cover rounded-2xl relative z-10"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}

// ─── S2 · EXPERTOS ────────────────────────────────────────────────────────────
const testimonials = [
  {
    quote: "Una herramienta con IA pensada para agilizar el trabajo del nutricionista sin sustituir su criterio.",
    name: "Dra. Elena Rossi",
    specialty: "Salud hormonal",
    country: "España",
    flag: "🇪🇸",
  },
  {
    quote: "Cálculos claros, personalizables y siempre bajo control del nutricionista.",
    name: "Marc Galván",
    specialty: "Nutrición clínica",
    country: "Perú",
    flag: "🇵🇪",
  },
  {
    quote: "Te ahorra muchísimo tiempo sin quitarte el control clínico.",
    name: "Sofía Müller",
    specialty: "Nutrición clínica",
    country: "México",
    flag: "🇲🇽",
  },
  {
    quote: "Lo que más me llamó la atención fue que se adapta al país y a sus guías nutricionales.",
    name: "Laura Méndez",
    specialty: "SOP",
    country: "México",
    flag: "🇲🇽",
  },
  {
    quote: "Crear planes nutricionales se siente mucho más rápido y sencillo.",
    name: "Carla Vélez",
    specialty: "Nutrióloga clínica",
    country: "México",
    flag: "🇲🇽",
  },
  {
    quote: "Ahorra tiempo antes y durante la consulta con perfiles de paciente completos.",
    name: "Ricardo Flores",
    specialty: "Nutricionista deportivo",
    country: "Honduras",
    flag: "🇭🇳",
  },
];

function ExpertsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector(".testimonial-card") as HTMLElement;
    if (!card) return;
    const scrollAmount = card.offsetWidth + 20;
    const currentScroll = el.scrollLeft;
    const nextIndex =
      dir === "left"
        ? Math.max(0, Math.round(currentScroll / scrollAmount) - 1)
        : Math.round(currentScroll / scrollAmount) + 1;
    el.scrollTo({ left: nextIndex * scrollAmount, behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState);
    return () => el.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <div className="max-w-[1280px] mx-auto">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white text-center mb-10 md:mb-16">
        Lo que dicen los expertos
      </h2>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-4 px-4 items-stretch"
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card snap-center flex-shrink-0 w-[280px] sm:w-[360px] rounded-2xl p-6 md:p-10 flex flex-col justify-between bg-[hsl(252,100%,98%)] shadow-xl h-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <Quote className="h-5 w-5 text-primary fill-primary opacity-20" />
                <span className="text-xl">{t.flag}</span>
              </div>
              <p className="text-base md:text-lg text-foreground italic flex-1">"{t.quote}"</p>
              <div className="flex items-center gap-4 pt-6 border-t border-primary/5">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.specialty}, {t.country}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => scroll("left")}
            className={`w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-opacity ${canScrollLeft ? "opacity-100" : "opacity-30 pointer-events-none"}`}
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>
          <button
            onClick={() => scroll("right")}
            className={`w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-opacity ${canScrollRight ? "opacity-100" : "opacity-30 pointer-events-none"}`}
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── S3 · VIDEO ───────────────────────────────────────────────────────────────
function VideoSection() {
  const YOUTUBE_VIDEO_ID = "EBNTbZ50Z4s";
  const [started, setStarted] = useState(false);

  return (
    <div className="max-w-[1024px] mx-auto text-center py-12">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-white mb-8 leading-tight">
        Transforma datos clínicos en experiencias visuales únicas
      </h2>
      <div className="relative rounded-[24px] sm:rounded-[40px] overflow-hidden bg-black border border-white/10 shadow-2xl aspect-video">
        {!started ? (
          <button
            onClick={() => setStarted(true)}
            className="absolute inset-0 z-10 flex items-center justify-center bg-black group cursor-pointer"
          >
            <img
              src={`https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`}
              alt="Kleia Demo thumbnail"
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity"
            />
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
              <Play className="h-7 w-7 sm:h-9 sm:w-9 text-primary fill-primary ml-1" />
            </div>
          </button>
        ) : (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
            title="Kleia Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}

// ─── S4 · JORNADA ─────────────────────────────────────────────────────────────
const journeySteps = [
  {
    icon: ClipboardList,
    num: "1",
    title: "Ingresa los Datos",
    desc: "Registra restricciones y objetivos una sola vez. Kleia los guarda para no repetir trabajo.",
  },
  {
    icon: Layers,
    num: "2",
    title: "Asigna y reajusta",
    desc: "Genera menús completos al instante con recálculo automático de macros en tiempo real.",
  },
  {
    icon: Download,
    num: "3",
    title: "Entrega en 1 click",
    desc: "Exporta el plan como PDF listo para compartir y envíalo por WhatsApp directamente.",
  },
];

function JourneySection() {
  return (
    <div className="max-w-[1280px] mx-auto text-center">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading mb-3">Tu jornada con Kleia</h2>
      <p className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto mb-16">
        De la clínica al diseño editorial en tres simples pasos.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {journeySteps.map((step) => (
          <div key={step.num} className="journey-card flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-xl bg-white flex items-center justify-center border shadow-lg">
              <step.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold font-heading text-lg md:text-xl">
              {step.num}. {step.title}
            </h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── S5 · FEATURES ────────────────────────────────────────────────────────────
const featureCards = [
  {
    title: "Precisión clínica en segundos",
    desc: "Calcula kcal, macros y micros en segundos con total precisión clínica.",
    image: gifPrecision,
  },
  {
    title: "Planes con contexto local",
    desc: "Crea planes asistidos que respetan los gustos y el contexto local del paciente.",
    image: gifContexto,
  },
  {
    title: "Sustituciones inteligentes",
    desc: "Edita platos con sustituciones inteligentes que recalculan objetivos en tiempo real.",
    image: gifSustituciones,
  },
  {
    title: "Listas de compra automáticas",
    desc: "Genera listas de compra exactas sumando cada ingrediente automáticamente.",
    image: gifListas,
  },
  {
    title: "Educación sin esfuerzo",
    desc: "Integra pautas educativas en el plan sin tener que redactar mensajes desde cero.",
    image: gifEducacion,
  },
  {
    title: "Entrega ágil WhatsApp/PDF",
    desc: "Comparte el plan clínico por WhatsApp o PDF de forma profesional en un clic.",
    image: gifEntrega,
  },
];

function FeaturesSection() {
  return (
    <div className="max-w-[1280px] mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-3">Potencia tu Consulta</h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
          Software diseñado para el nutricionista de alto rendimiento. Rigor científico impulsado por IA.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {featureCards.map((f) => (
          <FeatureCard key={f.title} title={f.title} desc={f.desc} image={f.image} />
        ))}
      </div>
    </div>
  );
}

// ─── S6 · PRICING ─────────────────────────────────────────────────────────────
const pricingFeatures = [
  "Acceso a Kleia (web, sin instalación)",
  "Generación de planes clínicos en minutos",
  "Ajustes sin descuadres (recalculo automático)",
  "Exportación PDF + lista de compra",
  "Envío por WhatsApp/correo",
  "Historial ilimitado de pacientes",
  "Recetario inteligente",
  "Soporte dedicado durante el piloto",
];

function PricingSection() {
  return (
    <div className="max-w-[1280px] mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-3">Crecimiento sin Límites</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Transparencia total, sin costes ocultos. Oferta limitada de lanzamiento.
        </p>
      </div>
      <div className="flex flex-col items-center">
        <div
          className="pricing-card w-full max-w-md rounded-[40px] p-8 md:p-10 text-white relative overflow-hidden"
          style={{ backgroundColor: "hsl(238, 78%, 54%)", boxShadow: "0 25px 50px -12px rgba(45,49,231,0.3)" }}
        >
          <div className="absolute top-0 right-0 bg-primary px-4 py-2 rounded-bl-lg font-bold text-[10px] uppercase">
            Plan Fundador · 10 Plazas
          </div>
          <h3 className="text-xl font-bold font-heading mb-1">Plan Fundador</h3>
          <p className="text-sm text-white/60 mb-8">La potencia total para expertos.</p>
          <div className="flex items-end gap-2 mb-8">
            <span className="text-2xl text-white/50 line-through">70€</span>
            <span className="text-5xl font-bold">20€</span>
            <span className="text-base text-white/60 pb-2">/mes</span>
          </div>
          <ul className="space-y-4 mb-10">
            {pricingFeatures.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm">
                <Check className="h-4 w-4 text-white" /> {f}
              </li>
            ))}
          </ul>
          <button
            onClick={openWhatsApp}
            className="w-full bg-white text-[hsl(238,78%,54%)] font-bold py-4 rounded-xl hover:scale-[1.02] transition-transform"
          >
            Elegir Plan Fundador
          </button>
        </div>
        <div className="mt-8 bg-primary/10 border border-primary/20 rounded-full px-6 py-2 text-primary font-bold text-[11px] uppercase tracking-wider">
          ✨ Prueba gratis de 14 días · Sin permanencia
        </div>
      </div>
    </div>
  );
}

// ─── S7 · FAQ ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "¿Necesito saber de tecnología?",
    a: "No. Si puedes usar WhatsApp, puedes usar Kleia. Te acompañamos en todo.",
  },
  {
    q: "¿Qué pasa con los datos de mis pacientes?",
    a: "Los datos son tuyos. Se usan bajo encriptación clínica y no se comparten.",
  },
  {
    q: "¿Puedo cancelar cuando quiera?",
    a: "Sí. Durante el piloto podés cancelar en cualquier momento sin penalidades.",
  },
  {
    q: "¿Kleia reemplaza mi criterio profesional?",
    a: "No. Kleia automatiza la parte mecánica, pero tú decides qué es mejor para cada paciente.",
  },
  {
    q: "¿Cuándo estará disponible para todos?",
    a: "Estamos en piloto cerrado con 10 plazas. Si quieres ser de los primeros, escríbenos por WhatsApp.",
  },
];

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="max-w-[896px] mx-auto">
      <h2 className="text-3xl font-bold font-heading text-center mb-12">Preguntas Frecuentes</h2>
      <div className="flex flex-col gap-6">
        {faqs.map(({ q, a }, i) => (
          <div key={i} className="faq-item border-b border-border/30 pb-6">
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="text-left w-full flex items-center justify-between gap-4"
            >
              <h3 className="font-bold font-heading text-primary">{q}</h3>
              <ChevronRight
                className={`h-5 w-5 text-primary transition-transform ${openIdx === i ? "rotate-90" : ""}`}
              />
            </button>
            <p
              className={`text-muted-foreground mt-3 leading-relaxed transition-all ${openIdx === i ? "block" : "hidden"}`}
            >
              {a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-border/50 py-12 bg-[hsl(210,40%,98%)]">
      <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col gap-4">
          <img src={kleiaLogo} alt="Kleia" className="h-7 w-auto" />
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            © {currentYear} Kleia. precisión clínica en Nutrición.
          </p>
        </div>
        <div className="flex gap-8 md:justify-end">
          {/* Enlaces Legales */}
          <a
            href="https://imsolutions.studio/kleia/legal.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground uppercase hover:text-primary transition-colors"
          >
            Política de Privacidad
          </a>
          <a
            href="https://imsolutions.studio/kleia/legal.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground uppercase hover:text-primary transition-colors"
          >
            Términos de servicio
          </a>
          {/* Enlace de Contacto */}
          <a
            href="mailto:healthytoolinfo@gmail.com"
            className="text-xs text-muted-foreground uppercase hover:text-primary transition-colors"
          >
            Contacto
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Index() {
  const [loaded, setLoaded] = useState(false);
  const handleLoaded = useCallback(() => {
    setLoaded(true);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  }, []);

  return (
    <>
      {!loaded && <IntroLoader onComplete={handleLoaded} />}
      <div
        className="min-h-screen font-sans overflow-x-clip transition-opacity duration-300"
        style={{ opacity: loaded ? 1 : 0 }}
      >
        <Navbar />
        <main>
          <Hero />
          <section id="seccion-expertos" className="py-12 px-4 bg-[hsl(240,50%,8%)]">
            <ExpertsSection />
          </section>
          <section id="seccion-video" className="py-12 px-4 bg-primary">
            <VideoSection />
          </section>
          <section id="seccion-jornada" className="py-24 px-4 bg-[hsl(252,100%,98%)]">
            <JourneySection />
          </section>
          <section id="seccion-features" className="py-24 px-4 bg-[hsl(220,33%,97%)]">
            <FeaturesSection />
          </section>
          <section id="seccion-precio" className="py-20 px-4 bg-[hsl(220,33%,97%)]">
            <PricingSection />
          </section>
          <section id="seccion-faq" className="py-20 px-4 bg-white">
            <FAQSection />
          </section>
        </main>
        <Footer />
      </div>
      <SupportBot />
    </>
  );
}
