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
import SupportBot from "@/components/SupportBot";
import { Button } from "@/components/ui/button";
// Se añade Quote a la importación
import { ChevronLeft, ChevronRight, ClipboardList, Layers, Download, Play, Check, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ─── WhatsApp CTA ─────────────────────────────────────────────────────────────
const WA_NUMBER = "359896676923";
const WA_MESSAGE = encodeURIComponent("Hola! Me interesa conocer más sobre Kleia y agendar una demo. ¿Podemos hablar?");
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;
const currentYear = new Date().getFullYear();

function openWhatsApp() {
  window.location.href = WA_URL;
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
          ? "bg-[hsl(220,33%,97%)]/90 backdrop-blur-lg border-b border-border/50 shadow-sm"
          : "bg-[hsl(220,33%,97%)]/70 backdrop-blur-md"
      }`}
      style={{ height: 80 }}
    >
      <div className="max-w-[1280px] mx-auto flex items-center justify-between h-full px-4 sm:px-8">
        <img src={kleiaLogo} alt="Kleia" className="h-8 md:h-10 w-auto" />
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-[13px] font-bold font-heading text-muted-foreground hover:text-foreground px-3 py-2 rounded-full transition-colors whitespace-nowrap tracking-tight"
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button
            onClick={openWhatsApp}
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
      {open && (
        <nav className="lg:hidden bg-white/95 backdrop-blur-lg px-4 py-2 flex flex-col border-t border-border/30">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => {
                scrollTo(id);
                setOpen(false);
              }}
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

// ─── S1 · Hero ───────────────────────────────────────────────────────────────
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
      gsap.from(mockupRef.current, {
        opacity: 0,
        x: 60,
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
      });
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
      className="relative overflow-hidden px-4 sm:px-8"
      style={{ backgroundColor: "hsl(220, 33%, 97%)", paddingTop: 160, paddingBottom: 128 }}
    >
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div ref={textRef} className="space-y-6">
          <div>
            <span className="inline-block bg-primary/10 text-primary text-[11px] sm:text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wide">
              Para nutricionistas independientes · sin perder el criterio profesional
            </span>
          </div>
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-[56px] lg:text-[60px] font-bold font-heading leading-[1.08] tracking-[-3.6px]">
              Deja de pensar
              <br />
              en menús.
            </h1>
            <h1 className="text-4xl sm:text-5xl md:text-[56px] lg:text-[60px] font-bold font-heading leading-[1.08] tracking-[-3.6px] text-primary">
              Termina tu día
              <br />
              con todos los planes
              <br />
              enviados.
            </h1>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-[512px] leading-relaxed">
            Genera planes clínicos en minutos. Envía un PDF listo por WhatsApp — sin copiar y pegar.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={openWhatsApp}
              size="lg"
              className="rounded-full px-8 text-lg font-bold font-heading h-14 shadow-[0_20px_25px_-5px_rgba(74,81,255,0.2),0_8px_10px_-6px_rgba(74,81,255,0.2)] bg-gradient-to-br from-[hsl(235,100%,65%)] to-primary text-primary-foreground"
            >
              Pruébalo Gratis
            </Button>
            <Button
              onClick={() => scrollTo("seccion-video")}
              variant="ghost"
              size="lg"
              className="rounded-full px-8 text-lg font-bold font-heading h-14 bg-[hsl(220,20%,95%)] hover:bg-[hsl(220,20%,92%)] text-foreground"
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

// ─── S2 · Lo que dicen los expertos (dark bg) ────────────────────────────────
const testimonials = [
  {
    quote: "Una herramienta con IA pensada para agilizar el trabajo del nutricionista sin sustituir su criterio.",
    name: "Dra. Elena Rossi",
    specialty: "Salud hormonal femenina",
    country: "España",
    flag: "🇪🇸",
  },
  {
    quote: "Una propuesta innovadora y abierta al feedback real de profesionales de la nutrición.",
    name: "Dra. Elena Rossi",
    specialty: "Salud hormonal femenina",
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
    quote: "Una herramienta con potencial real para ahorrar tiempo sin perder personalización.",
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
    quote: "No es un software rígido: te propone, calcula y tú decides.",
    name: "Sofía Müller",
    specialty: "Nutrición clínica",
    country: "México",
    flag: "🇲🇽",
  },
  {
    quote: "Convierte la creación del plan nutricional en un proceso mucho más práctico, editable y claro.",
    name: "Sofía Müller",
    specialty: "Nutrición clínica",
    country: "México",
    flag: "🇲🇽",
  },
  {
    quote: "Lo que más me llamó la atención fue que se adapta al país y a sus guías nutricionales.",
    name: "Laura Méndez",
    specialty: "Nutrición Diabética y SOP",
    country: "México",
    flag: "🇲🇽",
  },
  {
    quote: "Sí ahorra bastante tiempo y se siente como un asistente para el nutricionista.",
    name: "Laura Méndez",
    specialty: "Nutrición Diabética y SOP",
    country: "México",
    flag: "🇲🇽",
  },
  {
    quote: "Me encantó: reúne en un solo lugar expediente, plan alimenticio y seguimiento del paciente.",
    name: "Andrea Solís",
    specialty: "Nutricionista ocupacional",
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
    quote: "Me dio mucha confianza ver que las calorías salían prácticamente igual que en mi cálculo manual.",
    name: "Carla Vélez",
    specialty: "Nutrióloga clínica",
    country: "México",
    flag: "🇲🇽",
  },
  {
    quote: "Me siento 100% identificada con esta solución porque resuelve cosas que hoy me quitan muchísimo tiempo.",
    name: "Carla Vélez",
    specialty: "Nutrióloga clínica",
    country: "México",
    flag: "🇲🇽",
  },
  {
    quote: "Se nota que está pensada para adaptarse al nutricionista, no al revés.",
    name: "Patricia Ramos",
    specialty: "Nutrióloga clínica",
    country: "Perú",
    flag: "🇵🇪",
  },
  {
    quote: "Te ahorra tiempo de consulta y hace el proceso mucho más directo.",
    name: "Valeria Ortiz",
    specialty: "Nutrióloga clínica",
    country: "Ecuador",
    flag: "🇪🇨",
  },
  {
    quote: "Lo veo muy completo y muy utilizable en consulta real.",
    name: "Dr. Javier Ruiz",
    specialty: "Patologías digestivas",
    country: "España",
    flag: "🇪🇸",
  },
  {
    quote: "Ahorra tiempo antes y durante la consulta con perfiles de paciente más completos desde el primer momento.",
    name: "Ricardo Flores",
    specialty: "Nutriólogo deportivo",
    country: "Honduras",
    flag: "🇭🇳",
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
    const card = el.querySelector(".testimonial-card") as HTMLElement;
    const scrollAmount = card ? card.offsetWidth + 24 : 320;
    el.scrollBy({ left: dir === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
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
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" },
    });
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  const featured = [
    testimonials[0],
    testimonials[2],
    testimonials[5],
    testimonials[7],
    testimonials[9],
    testimonials[10],
    testimonials[13],
    testimonials[14],
    testimonials[15],
    testimonials[16],
  ];

  return (
    <div ref={sectionRef} className="max-w-[1280px] mx-auto">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white text-center mb-10 md:mb-16">
        Lo que dicen los expertos
      </h2>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-5 md:gap-8 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-4 px-4"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {featured.map((t, i) => (
            <div
              key={i}
              className="testimonial-card snap-center flex-shrink-0 w-[280px] sm:w-[360px] rounded-2xl p-6 sm:p-8 md:p-10 flex flex-col justify-between gap-4"
              style={{ backgroundColor: "hsl(252, 100%, 98%)" }}
            >
              <div className="flex justify-between items-center">
                {/* Sustitución de Star por Quote. 
                  Se aplica el color primary y el estilo del SVG solicitado.
                */}
                <Quote className="h-5 w-5 text-primary fill-primary opacity-20" />
                <span className="text-xl">{t.flag}</span>
              </div>
              <p className="text-base md:text-lg text-foreground leading-relaxed italic flex-1">"{t.quote}"</p>
              <div className="flex items-center gap-4 pt-2">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
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

// ─── S3 · Video Section (primary bg) ─────────────────────────────────────────
function VideoSection() {
  return (
    <div className="max-w-[1024px] mx-auto text-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-white mb-6 md:mb-8 leading-tight">
        Transforma datos clínicos en experiencias visuales únicas
      </h2>
      <div className="relative rounded-[40px] overflow-hidden bg-[hsl(222,47%,11%)] border border-white/10 shadow-2xl group cursor-pointer">
        <img src={storytellingImg} alt="Demo de Kleia" className="w-full aspect-video object-cover opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
            <Play className="h-8 w-8 text-primary fill-primary ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── S4 · Tu jornada con Kleia ───────────────────────────────────────────────
const journeySteps = [
  {
    icon: ClipboardList,
    num: "1",
    title: "Ingresa los Datos",
    desc: "Ingresas restricciones, preferencias y objetivos del paciente una sola vez. Kleia los guarda para no repetir trabajo.",
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
    title: "Entrega en 1 click",
    desc: "Exportas el plan como PDF listo para compartir y lo envías por WhatsApp/email como siempre.",
  },
];

function JourneySection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const cards = ref.current.querySelectorAll(".journey-card");
    gsap.set(cards, { opacity: 0, y: 60 });
    const tl = gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: { trigger: ref.current, start: "top 75%", toggleActions: "play none none none" },
    });
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div ref={ref} className="max-w-[1280px] mx-auto">
      <div className="text-center mb-10 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading tracking-tight mb-3">
          Tu jornada con Kleia
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto">
          De la clínica al diseño editorial en tres simples pasos.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-10 md:gap-12 justify-center">
        {journeySteps.map((step) => (
          <div key={step.num} className="journey-card flex flex-col items-center gap-4 flex-1 max-w-[380px] mx-auto">
            <div
              className="w-24 h-24 rounded-xl bg-white flex items-center justify-center border border-[hsl(240,50%,98%)]"
              style={{ boxShadow: "0 40px 60px 0 rgba(20,27,45,0.06)" }}
            >
              <step.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold font-heading text-lg md:text-xl text-center">
              {step.num}. {step.title}
            </h3>
            <p className="text-sm md:text-base text-muted-foreground text-center leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── S5 · Potencia tu Consulta ───────────────────────────────────────────────
const featureCards = [
  {
    title: "Precisión clínica en segundos",
    desc: "Calcula kcal, macros y micros en segundos con total precisión clínica.",
    image: gifPrecision,
  },
  {
    title: "Planes con contexto local",
    desc: "Crea planes asistidos que respetan los gustos y el contexto local del paciente.",
    image: gifSustituciones,
  },
  {
    title: "Sustituciones inteligentes",
    desc: "Edita platos con sustituciones inteligentes que recalculan objetivos en tiempo real.",
    image: gifSustituciones,
  },
  {
    title: "Listas de compra automáticas",
    desc: "Genera listas de compra exactas sumando automáticamente cada ingrediente del menú.",
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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const cards = ref.current.querySelectorAll(".feature-card");
    gsap.set(cards, { opacity: 0, y: 80, scale: 0.95 });
    const tl = gsap.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.12,
      ease: "back.out(1.2)",
      scrollTrigger: { trigger: ref.current, start: "top 75%", toggleActions: "play none none none" },
    });
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div ref={ref} className="max-w-[1280px] mx-auto">
      <div className="text-center mb-10 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading tracking-tight mb-3">
          Potencia tu Consulta
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Software diseñado para el nutricionista de alto rendimiento. Rigor científico impulsado por inteligencia
          artificial.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {featureCards.map((f) => (
          <div
            key={f.title}
            className="feature-card bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
            style={{ height: "auto" }}
          >
            <div className="aspect-[16/10] bg-[hsl(213,27%,95%)] rounded-2xl mx-6 mt-6 md:mx-8 md:mt-8 overflow-hidden">
              <img src={f.image} alt={f.title} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="px-6 md:px-8 py-5 md:py-6">
              <h3 className="font-bold font-heading text-lg md:text-2xl mb-2">{f.title}</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── S6 · Pricing (blue card) ────────────────────────────────────────────────
const pricingFeatures = [
  "Acceso a Kleia (web, sin instalación)",
  "Generación de planes clínicos en minutos",
  "Ajustes sin descuadres (recalculo de macros/calorías automáticos)",
  "Exportación PDF lista + lista de compra",
  "Envío del plan por WhatsApp/correo",
  "Historial por paciente",
  "Recetario",
  "Soporte dedicado durante el piloto",
  "Creación de imágenes de los platos",
  "Canal de expertos (bono)",
];

function PricingSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.from(ref.current.querySelector(".pricing-card")!, {
      opacity: 0,
      y: 80,
      scale: 0.9,
      duration: 0.9,
      ease: "back.out(1.5)",
      scrollTrigger: { trigger: ref.current, start: "top 75%", toggleActions: "play none none none" },
    });
  }, []);

  return (
    <div ref={ref} className="max-w-[1280px] mx-auto">
      <div className="text-center mb-10 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-3">Crecimiento sin Límites</h2>
        <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto leading-relaxed">
          Escoge el plan actual antes de que se acabe nuestra oferta de lanzamiento.
          <br />
          Transparencia total, sin costes ocultos.
        </p>
      </div>

      <div className="flex justify-center">
        <div
          className="pricing-card relative overflow-hidden w-full max-w-md rounded-2xl p-8 md:p-10"
          style={{
            backgroundColor: "hsl(238, 78%, 54%)",
            boxShadow: "0 25px 50px -12px rgba(45,49,231,0.3)",
          }}
        >
          <div className="absolute top-0 right-0 bg-primary px-4 py-2 rounded-bl-lg">
            <span className="text-[10px] font-semibold text-white uppercase tracking-wider">
              Oferta de Lanzamiento, 10 plazas
            </span>
          </div>

          <h3 className="text-xl font-bold font-heading text-white mb-1">Plan Fundador</h3>
          <p className="text-sm text-white/60 mb-4">La potencia total para expertos.</p>

          <div className="flex items-end gap-2 mb-8">
            <span className="text-2xl font-semibold text-white/50 line-through">70€</span>
            <span className="text-5xl font-semibold text-white">20€</span>
            <span className="text-base text-white/60 pb-2">/mes</span>
          </div>

          <ul className="space-y-4 mb-8">
            {pricingFeatures.map((f) => (
              <li key={f} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span className="text-sm text-white">{f}</span>
              </li>
            ))}
          </ul>

          <div className="bg-primary rounded-full px-4 py-2 mb-4 flex items-center">
            <span className="text-xs font-semibold text-white uppercase">
              Prueba gratis de 14 días · Cancelación simple e inmediata
            </span>
          </div>

          <button
            onClick={openWhatsApp}
            className="w-full bg-white text-[hsl(238,78%,54%)] font-semibold text-base rounded-xl py-4 hover:bg-white/90 transition-colors cursor-pointer"
          >
            Elegir Plan Fundador
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── S7 · FAQ ────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "¿Necesito saber de tecnología para usar Kleia?",
    a: "No. Si podés usar WhatsApp, podés usar Kleia. Te acompañamos en el setup inicial.",
  },
  {
    q: "¿Qué pasa con los datos de mis pacientes?",
    a: "Los datos son tuyos. Kleia los usa solo para generar los planes y no los comparte con terceros.",
  },
  {
    q: "¿Puedo cancelar cuando quiero?",
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
  const ref = useRef<HTMLDivElement>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll(".faq-item");
    gsap.set(items, { opacity: 0, y: 30 });
    const tl = gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: { trigger: ref.current, start: "top 80%", toggleActions: "play none none none" },
    });
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div ref={ref} className="max-w-[896px] mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold font-heading text-center mb-10 md:mb-12">Preguntas Frecuentes</h2>
      <div className="flex flex-col gap-6">
        {faqs.map(({ q, a }, i) => (
          <div key={i} className={`faq-item ${i < faqs.length - 1 ? "border-b border-border/30 pb-6" : ""}`}>
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="text-left w-full flex items-center justify-between gap-4"
            >
              <h3 className="font-bold font-heading text-base md:text-lg text-primary leading-relaxed">{q}</h3>
              <ChevronRight
                className={`h-5 w-5 text-primary flex-shrink-0 transition-transform duration-300 ${openIdx === i ? "rotate-90" : ""}`}
              />
            </button>
            <p
              className={`text-sm md:text-base text-muted-foreground mt-3 leading-relaxed transition-all ${openIdx === i ? "block" : "hidden"}`}
            >
              {a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-border/50 py-12" style={{ backgroundColor: "hsl(210, 40%, 98%)" }}>
      <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col gap-4">
          <img src={kleiaLogo} alt="Kleia" className="h-7 w-auto" />
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            © {currentYear} Kleia. precisión clínica en Nutrición.
          </p>
        </div>
        <div className="flex gap-8 md:justify-end">
          {["Política de privacidad", "Términos de servicio", "Contacto"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-xs text-muted-foreground uppercase tracking-wider opacity-80 hover:opacity-100 transition-opacity"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
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
        className="min-h-screen font-sans overflow-x-clip"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.3s ease" }}
      >
        <Navbar />
        <main>
          <Hero />

          <section
            id="seccion-expertos"
            className="py-8 md:py-12 px-4 sm:px-6"
            style={{ backgroundColor: "hsl(240, 50%, 8%)" }}
          >
            <ExpertsSection />
          </section>

          <section id="seccion-video" className="py-8 md:py-12 px-4 sm:px-6 lg:px-32 bg-primary">
            <VideoSection />
          </section>

          <section
            id="seccion-jornada"
            className="py-16 md:py-24 px-4 sm:px-6"
            style={{ backgroundColor: "hsl(252, 100%, 98%)" }}
          >
            <JourneySection />
          </section>

          <section
            id="seccion-features"
            className="py-8 md:py-24 px-4 sm:px-6"
            style={{ backgroundColor: "hsl(220, 33%, 97%)" }}
          >
            <FeaturesSection />
          </section>

          <section
            id="seccion-precio"
            className="py-8 md:py-20 px-4 sm:px-6"
            style={{ backgroundColor: "hsl(220, 33%, 97%)" }}
          >
            <PricingSection />
          </section>

          <section id="seccion-faq" className="py-16 md:py-20 px-4 sm:px-6 lg:px-48 bg-white">
            <FAQSection />
          </section>
        </main>
        <Footer />
      </div>
      <SupportBot />
    </>
  );
}
