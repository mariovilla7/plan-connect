import kleiaLogo from "@/assets/kleia-logo.svg";
import heroMockup from "@/assets/seccion1-mockup1.png";
import storytellingImg from "@/assets/storytelling.png";
import gifPrecision from "@/assets/precision-clinica.gif";
import gifSustituciones from "@/assets/sustituciones-inteligentes.gif";
import gifListas from "@/assets/listas-compra.gif";
import gifEducacion from "@/assets/educacion-sin-esfuerzo.gif";
import gifEntrega from "@/assets/entrega-agil-whatsapp.gif";
import gifContexto from "@/assets/Planes con contexto local (1).gif";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import IntroLoader from "@/components/IntroLoader";
import SupportBot from "@/components/SupportBot";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ClipboardList, Layers, Download, Play, Check, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ─── CONFIGURACIÓN DE ENLACES ─────────────────────────────────────────────────
const WA_NUMBER = "359896676923";
const WA_MESSAGE = encodeURIComponent("Hola! Me interesa conocer más sobre Kleia y agendar una demo. ¿Podemos hablar?");
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;
const LOGIN_URL = "https://imsolutions.studio/kleia/prototipo.html";
const currentYear = new Date().getFullYear();

// Funciones de navegación mejoradas
const openWhatsApp = () => window.open(WA_URL, "_blank");
const openLogin = () => (window.location.href = LOGIN_URL);

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

// ─── COMPONENTE NAVBAR ────────────────────────────────────────────────────────
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
        <img
          src={kleiaLogo}
          alt="Kleia"
          className="h-8 md:h-10 w-auto cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
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
      {open && (
        <nav className="lg:hidden bg-white/95 backdrop-blur-lg px-4 py-4 flex flex-col gap-2 border-t border-border/30 shadow-xl">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => {
                scrollTo(id);
                setOpen(false);
              }}
              className="text-sm font-bold text-muted-foreground hover:text-foreground text-left px-4 py-2"
            >
              {label}
            </button>
          ))}
          <Button onClick={openLogin} className="w-full rounded-full mt-2">
            Iniciar sesión
          </Button>
        </nav>
      )}
    </header>
  );
}

// ─── S1 · HERO ────────────────────────────────────────────────────────────────
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
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative overflow-hidden px-4 sm:px-8 bg-[hsl(220,33%,97%)] pt-40 pb-32">
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="max-w-[1280px] mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div ref={textRef} className="space-y-6 text-left">
          <span className="inline-block bg-primary/10 text-primary text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
            Para nutricionistas independientes · Sin perder el criterio profesional
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-[56px] lg:text-[60px] font-bold font-heading leading-[1.05] tracking-tight">
            Deja de pensar <br /> en menús. <br />
            <span className="text-primary font-black">Termina tu día con todos los planes enviados.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-[512px] leading-relaxed">
            Genera planes clínicos en minutos. Envía un PDF listo por WhatsApp sin perder horas copiando y pegando.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button
              onClick={openWhatsApp}
              size="lg"
              className="rounded-full px-8 text-lg font-bold h-14 shadow-lg bg-primary text-primary-foreground"
            >
              Pruébalo Gratis
            </Button>
            <Button
              onClick={() => scrollTo("seccion-video")}
              variant="ghost"
              size="lg"
              className="rounded-full px-8 text-lg font-bold h-14 bg-white/50 hover:bg-white text-foreground"
            >
              <Play className="h-4 w-4 mr-2 text-primary fill-primary" /> Ver Demo
            </Button>
          </div>
        </div>
        <div ref={mockupRef} className="flex items-center justify-center">
          <img
            src={heroMockup}
            alt="Kleia App"
            className="w-full max-w-[616px] h-auto object-cover rounded-2xl shadow-2xl"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}

// ─── S2 · EXPERTOS ────────────────────────────────────────────────────────────
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
    const scrollAmount = card ? card.offsetWidth + 24 : 320;
    el.scrollBy({ left: dir === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="max-w-[1280px] mx-auto py-12">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white text-center mb-12">
        Lo que dicen los expertos
      </h2>
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="flex gap-6 overflow-x-auto overflow-y-hidden pb-10 scrollbar-hide snap-x snap-mandatory px-4 -mx-4"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {testimonialsData.map((t, i) => (
            <div
              key={i}
              className="testimonial-card snap-center flex-shrink-0 w-[300px] sm:w-[380px] rounded-3xl p-8 flex flex-col justify-between gap-6 bg-[hsl(252,100%,99%)] shadow-xl"
            >
              <div className="flex justify-between items-center">
                <Quote className="h-6 w-6 text-primary fill-primary opacity-20" />
                <span className="text-2xl">{t.flag}</span>
              </div>
              <p className="text-base md:text-lg text-foreground leading-relaxed italic font-medium flex-1">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-primary/10">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.specialty}, {t.country}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => scroll("left")}
            className={`w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white transition-opacity ${canScrollLeft ? "opacity-100" : "opacity-30"}`}
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => scroll("right")}
            className={`w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white transition-opacity ${canScrollRight ? "opacity-100" : "opacity-30"}`}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── S3 · VIDEO ───────────────────────────────────────────────────────────────
function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const YOUTUBE_VIDEO_ID = "EBNTbZ50Z4s";

  return (
    <div className="max-w-[1024px] mx-auto text-center py-12">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-white mb-8">
        Transforma datos clínicos en experiencias visuales únicas
      </h2>
      <div
        className="relative rounded-[40px] overflow-hidden bg-black border border-white/10 shadow-2xl group cursor-pointer aspect-video"
        onClick={() => setIsPlaying(true)}
      >
        {!isPlaying ? (
          <>
            <img
              src={storytellingImg}
              alt="Demo"
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <Play className="h-8 w-8 text-primary fill-primary ml-1" />
              </div>
            </div>
          </>
        ) : (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1`}
            title="Demo"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
}

// ─── S4 · JORNADA ─────────────────────────────────────────────────────────────
function JourneySection() {
  return (
    <div className="max-w-[1280px] mx-auto py-20 text-center">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading mb-4">Tu jornada con Kleia</h2>
      <p className="text-muted-foreground text-lg mb-16 max-w-xl mx-auto">
        De la clínica al diseño editorial en tres simples pasos.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {journeyStepsData.map((step) => (
          <div key={step.num} className="flex flex-col items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-white shadow-xl flex items-center justify-center border border-primary/5">
              <step.icon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-bold text-xl">
              {step.num}. {step.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed px-4">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── S5 · FEATURES ────────────────────────────────────────────────────────────
function FeaturesSection() {
  return (
    <div className="max-w-[1280px] mx-auto py-20">
      <div className="text-center mb-16 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-4">Potencia tu Consulta</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Software diseñado para el nutricionista de alto rendimiento. Rigor científico impulsado por IA.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {featureCardsData.map((f) => (
          <div
            key={f.title}
            className="bg-white rounded-[32px] p-2 shadow-sm hover:shadow-xl transition-all duration-500 border border-transparent hover:border-primary/10"
          >
            <div className="aspect-video bg-accent rounded-[24px] overflow-hidden mb-6">
              <img src={f.image} alt={f.title} className="w-full h-full object-cover" />
            </div>
            <div className="px-6 pb-6">
              <h3 className="font-bold text-xl mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── S6 · PRICING ─────────────────────────────────────────────────────────────
function PricingSection() {
  return (
    <div className="max-w-[1280px] mx-auto py-20 text-center">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-3 px-4">Crecimiento sin Límites</h2>
      <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto mb-12 px-4">
        Transparencia total, sin costes ocultos.
      </p>
      <div className="flex flex-col items-center px-4">
        <div className="pricing-card w-full max-w-md bg-[hsl(238,78%,54%)] rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 bg-primary px-6 py-2 rounded-bl-3xl font-black text-[10px] uppercase">
            Plan Fundador · 10 Plazas
          </div>
          <h3 className="text-2xl font-bold mb-6">Plan Fundador</h3>
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="text-2xl opacity-40 line-through font-bold">70€</span>
            <span className="text-6xl font-black">20€</span>
            <span className="text-lg opacity-60">/mes</span>
          </div>
          <ul className="text-left space-y-4 mb-10">
            {pricingFeaturesData.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm font-medium">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Check className="h-3 w-3" />
                </div>
                {f}
              </li>
            ))}
          </ul>
          <button
            onClick={openWhatsApp}
            className="w-full bg-white text-primary h-16 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-transform shadow-xl"
          >
            Elegir Plan Fundador
          </button>
        </div>
        <div className="mt-8 inline-flex items-center bg-primary/10 border border-primary/20 rounded-full px-6 py-2 shadow-sm">
          <span className="text-[11px] md:text-xs font-bold text-primary uppercase tracking-wider">
            ✨ Prueba gratis de 14 días · Sin compromiso de permanencia
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── S7 · FAQ ─────────────────────────────────────────────────────────────────
function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="max-w-3xl mx-auto py-20 px-6">
      <h2 className="text-3xl font-bold text-center mb-12">Preguntas Frecuentes</h2>
      <div className="space-y-4">
        {faqsData.map(({ q, a }, i) => (
          <div key={i} className="border-b border-border/50 pb-4">
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full flex items-center justify-between text-left py-4 group"
            >
              <span className="font-bold text-lg text-primary group-hover:text-primary/80 transition-colors">{q}</span>
              <ChevronRight
                className={`h-5 w-5 text-primary transition-transform ${openIdx === i ? "rotate-90" : ""}`}
              />
            </button>
            <AnimatePresence>
              {openIdx === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-muted-foreground pb-4 leading-relaxed">{a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-border/50 py-16 bg-[hsl(210,40%,98%)]">
      <div className="max-w-[1280px] mx-auto px-8 sm:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="flex flex-col gap-5 items-start text-left">
          <img src={kleiaLogo} alt="Kleia" className="h-8 w-auto opacity-90" />
          <div className="space-y-1">
            <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">
              Precisión clínica en Nutrición.
            </p>
            <p className="text-xs text-muted-foreground/60 font-medium">
              © {currentYear} Kleia. Todos los derechos reservados.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-10 gap-y-4 md:justify-start lg:pr-56">
          {["Política de privacidad", "Términos de servicio", "Contacto"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest hover:text-primary transition-colors whitespace-nowrap"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function Index() {
  const [loaded, setLoaded] = useState(false);
  const handleLoaded = useCallback(() => {
    setLoaded(true);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  }, []);

  return (
    <>
      {!loaded && <IntroLoader onComplete={handleLoaded} />}
      <div
        className="min-h-screen font-sans overflow-x-clip transition-opacity duration-700"
        style={{ opacity: loaded ? 1 : 0 }}
      >
        <Navbar />
        <main>
          <Hero />
          <section id="seccion-expertos" className="py-24 px-4 sm:px-6 bg-[hsl(240,50%,8%)]">
            <ExpertsSection />
          </section>
          <section id="seccion-video" className="py-20 px-4 sm:px-6 bg-primary">
            <VideoSection />
          </section>
          <section id="seccion-jornada" className="py-24 px-4 sm:px-6 bg-[hsl(252,100%,99%)]">
            <JourneySection />
          </section>
          <section id="seccion-features" className="py-24 px-4 sm:px-6 bg-[hsl(220,33%,97%)]">
            <FeaturesSection />
          </section>
          <section id="seccion-precio" className="py-24 px-4 sm:px-6 bg-[hsl(220,33%,97%)] border-t border-border/30">
            <PricingSection />
          </section>
          <section id="seccion-faq" className="py-24 px-4 sm:px-6 bg-white">
            <FAQSection />
          </section>
        </main>
        <Footer />
      </div>
      <SupportBot />
    </>
  );
}

// ─── DATA OBJECTS ─────────────────────────────────────────────────────────────
const testimonialsData = [
  {
    quote: "Una herramienta con IA pensada para agilizar el trabajo del nutricionista sin sustituir su criterio.",
    name: "Dra. Elena Rossi",
    specialty: "Salud hormonal",
    country: "España",
    flag: "🇪🇸",
  },
  {
    quote: "Cálculos claros, personalizables y siempre bajo control del profesional.",
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
    quote: "Se adapta al país y a sus guías nutricionales de forma sorprendente.",
    name: "Laura Méndez",
    specialty: "SOP y Diabetes",
    country: "México",
    flag: "🇲🇽",
  },
  {
    quote: "Me dio confianza ver que las calorías salían prácticamente igual que en mi cálculo manual.",
    name: "Carla Vélez",
    specialty: "Nutrióloga clínica",
    country: "México",
    flag: "🇲🇽",
  },
  {
    quote: "Ahorra tiempo antes y durante la consulta con perfiles de paciente completos.",
    name: "Ricardo Flores",
    specialty: "Nutrición deportiva",
    country: "Honduras",
    flag: "🇭🇳",
  },
];

const journeyStepsData = [
  {
    icon: ClipboardList,
    num: "1",
    title: "Ingresa los Datos",
    desc: "Registra restricciones y objetivos del paciente. Kleia los guarda para siempre.",
  },
  {
    icon: Layers,
    num: "2",
    title: "Asigna y Reajusta",
    desc: "Genera menús al instante con recálculo automático de macros en tiempo real.",
  },
  {
    icon: Download,
    num: "3",
    title: "Entrega en 1 Click",
    desc: "Exporta el PDF y envíalo por WhatsApp de forma profesional.",
  },
];

const featureCardsData = [
  { title: "Precisión clínica", desc: "Calcula kcal y macros en segundos con rigor científico.", image: gifPrecision },
  { title: "Contexto Local", desc: "Planes que respetan los ingredientes y cultura del paciente.", image: gifContexto },
  {
    title: "Recálculo Inteligente",
    desc: "Cambia platos sin descuadrar los objetivos del día.",
    image: gifSustituciones,
  },
  { title: "Listas de Compra", desc: "Generación automática basada en el menú diseñado.", image: gifListas },
  { title: "Mensajes Educativos", desc: "Pautas personalizadas integradas en el plan.", image: gifEducacion },
  { title: "Exportación Ágil", desc: "PDFs listos para compartir por WhatsApp en un clic.", image: gifEntrega },
];

const pricingFeaturesData = [
  "Acceso web sin instalación",
  "Planes clínicos en minutos",
  "Recálculo de macros automático",
  "PDF listo + Lista de compra",
  "Envío directo por WhatsApp",
  "Historial ilimitado de pacientes",
  "Recetario inteligente",
  "Soporte prioritario",
];

const faqsData = [
  {
    q: "¿Necesito saber de tecnología?",
    a: "No. Si sabes usar WhatsApp, sabes usar Kleia. Te guiamos en todo el proceso.",
  },
  {
    q: "¿Qué pasa con los datos?",
    a: "La privacidad es ley. Los datos son tuyos y se usan bajo encriptación clínica.",
  },
  { q: "¿Puedo cancelar cuando quiera?", a: "Sí, sin compromisos ni permanencias. Cancelación en un click." },
  {
    q: "¿Sustituye mi criterio?",
    a: "Jamás. Kleia es tu asistente de alto rendimiento, la decisión final siempre es tuya.",
  },
];
