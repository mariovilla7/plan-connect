import kleiaLogo from "@/assets/kleia-logo.svg";
import heroMockup from "@/assets/hero image.png";
import gifPrecision from "@/assets/precision-clinica.gif";
import gifSustituciones from "@/assets/sustituciones-inteligentes.gif";
import gifListas from "@/assets/listas-compra.gif";
import gifEducacion from "@/assets/educacion-sin-esfuerzo.gif";
import gifEntrega from "@/assets/entrega-agil-whatsapp.gif";
import gifContexto from "@/assets/Planes con contexto local (1).gif";
import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IntroLoader from "@/components/IntroLoader";
import SupportBot from "@/components/SupportBot";
import CookieBanner from "@/components/CookieBanner";
import FeatureCard from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import LanguageSelector from "@/components/LanguageSelector";
import {
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Layers,
  Download,
  Play,
  Check,
  Quote,
  Instagram,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ─── CONFIGURACIÓN DE ENLACES ─────────────────────────────────────────────────
const WA_NUMBER = "359896676923";
const LOGIN_URL = "https://imsolutions.studio/kleia/prototipo.html";
const currentYear = new Date().getFullYear();

function buildWaUrl(message: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}
const openLogin = () => (window.location.href = LOGIN_URL);

// ─── NAV (claves i18n) ───────────────────────────────────────────────────────
const navLinkIds = [
  { key: "experts", id: "seccion-expertos" },
  { key: "journey", id: "seccion-jornada" },
  { key: "features", id: "seccion-features" },
  { key: "pricing", id: "seccion-precio" },
  { key: "faq", id: "seccion-faq" },
] as const;


function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function Navbar() {
  const { t } = useTranslation();
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
    navLinkIds.forEach(({ id }) => {
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
          {navLinkIds.map(({ key, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`relative text-[13px] font-bold font-heading py-2 transition-colors whitespace-nowrap tracking-tight group ${
                activeSection === id ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t(`kleia.nav.${key}`)}
              <span
                className={`absolute left-0 bottom-0 h-[2px] bg-primary transition-all duration-300 ${
                  activeSection === id ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSelector />
          <Button
            onClick={openLogin}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 text-sm font-bold font-heading shadow-md h-10"
          >
            {t("kleia.nav.login")}
          </Button>
          <button className="lg:hidden flex flex-col gap-1.5 p-2" onClick={() => setOpen(!open)} aria-label={t("kleia.nav.menu")}>
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
          {navLinkIds.map(({ key, id }) => (
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
              {t(`kleia.nav.${key}`)}
            </button>
          ))}
          <Button onClick={openLogin} className="w-full rounded-full mt-4 mb-2">
            {t("kleia.nav.login")}
          </Button>
        </nav>
      )}
    </header>
  );
}

// ─── S1 · HERO ───────────────────────────────────────────────────────────────
function Hero() {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const openWhatsApp = () => window.open(buildWaUrl(t("kleia.wa.message")), "_blank");

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
            {t("kleia.hero.badge")}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-[56px] lg:text-[60px] font-bold font-heading leading-[1.08] tracking-[-1px] sm:tracking-[-2px] md:tracking-[-3px]">
            {t("kleia.hero.title1")} <br /> {t("kleia.hero.title2")} <br />
            <span className="text-primary">{t("kleia.hero.title3")}</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-[512px] leading-relaxed">
            {t("kleia.hero.subtitle")}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={openWhatsApp}
              size="lg"
              className="rounded-full px-8 text-lg font-bold font-heading h-14 shadow-lg bg-gradient-to-br from-[hsl(235,100%,65%)] to-primary text-white"
            >
              {t("kleia.hero.ctaPrimary")}
            </Button>
            <Button
              onClick={() => scrollTo("seccion-video")}
              variant="ghost"
              size="lg"
              className="rounded-full px-8 text-lg font-bold font-heading h-14 bg-[hsl(220,20%,95%)] text-foreground"
            >
              <Play className="h-4 w-4 mr-2 text-primary fill-primary" /> {t("kleia.hero.ctaSecondary")}
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
const expertExtras: Array<{ flag: string; instagram?: { handle: string; url: string } }> = [
  {
    flag: "🇲🇽",
    instagram: { handle: "@nutri_victoria.ojeda", url: "https://www.instagram.com/nutri_victoria.ojeda/" },
  },
  { flag: "🇵🇪" },
  { flag: "🇲🇽" },
  { flag: "🇲🇽" },
  { flag: "🇲🇽" },
  { flag: "🇭🇳" },
];

type ExpertItem = { quote: string; name: string; specialty: string; country: string };

function ExpertsSection() {
  const { t } = useTranslation();
  const items = (t("kleia.experts.items", { returnObjects: true }) as ExpertItem[]) || [];
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
        {t("kleia.experts.title")}
      </h2>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-4 px-4 items-stretch"
        >
          {items.map((item, i) => {
            const extra = expertExtras[i] || { flag: "" };
            return (
              <div
                key={i}
                className="testimonial-card snap-center flex-shrink-0 w-[280px] sm:w-[360px] rounded-2xl p-6 md:p-10 flex flex-col justify-between bg-[hsl(252,100%,98%)] shadow-xl h-auto"
              >
                <div className="flex justify-between items-center mb-4">
                  <Quote className="h-5 w-5 text-primary fill-primary opacity-20" />
                  <span className="text-xl">{extra.flag}</span>
                </div>
                <p className="text-base md:text-lg text-foreground italic flex-1">"{item.quote}"</p>
                <div className="flex items-center gap-4 pt-6 border-t border-primary/5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.specialty}, {item.country}
                    </p>
                    {extra.instagram && (
                      <a
                        href={extra.instagram.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 mt-1 font-medium"
                      >
                        <Instagram className="h-3.5 w-3.5" />
                        {extra.instagram.handle}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
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
  const { t } = useTranslation();
  const YOUTUBE_VIDEO_ID = "EBNTbZ50Z4s";

  return (
    <div className="max-w-[1024px] mx-auto text-center py-12 px-4">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-white mb-8 leading-tight">
        {t("kleia.video.title")}
      </h2>

      <div className="relative rounded-[24px] sm:rounded-[40px] overflow-hidden bg-black border border-white/10 shadow-2xl aspect-video">
        <iframe
          className="w-full h-full absolute inset-0"
          src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=0&playsinline=1&enablejsapi=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}`}
          title="Kleia Demo"
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}

// ─── S4 · JORNADA ─────────────────────────────────────────────────────────────
const journeyIcons = [ClipboardList, Layers, Download];

type JourneyStep = { title: string; desc: string };

function JourneySection() {
  const { t } = useTranslation();
  const steps = (t("kleia.journey.steps", { returnObjects: true }) as JourneyStep[]) || [];
  return (
    <div className="max-w-[1280px] mx-auto text-center">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading mb-3">{t("kleia.journey.title")}</h2>
      <p className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto mb-16">
        {t("kleia.journey.subtitle")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {steps.map((step, idx) => {
          const Icon = journeyIcons[idx] || ClipboardList;
          return (
            <div key={idx} className="journey-card flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-xl bg-white flex items-center justify-center border shadow-lg">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold font-heading text-lg md:text-xl">
                {idx + 1}. {step.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── S5 · FEATURES ────────────────────────────────────────────────────────────
const featureImages = [gifPrecision, gifContexto, gifSustituciones, gifListas, gifEducacion, gifEntrega];

type FeatureItem = { title: string; desc: string };

function FeaturesSection() {
  const { t } = useTranslation();
  const items = (t("kleia.features.items", { returnObjects: true }) as FeatureItem[]) || [];
  return (
    <div className="max-w-[1280px] mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-3">{t("kleia.features.title")}</h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
          {t("kleia.features.subtitle")}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((f, i) => (
          <FeatureCard key={i} title={f.title} desc={f.desc} image={featureImages[i] || featureImages[0]} />
        ))}
      </div>
    </div>
  );
}

// ─── S6 · PRICING ─────────────────────────────────────────────────────────────
function PricingSection() {
  const { t } = useTranslation();
  const features = (t("kleia.pricing.features", { returnObjects: true }) as string[]) || [];
  const openWhatsApp = () => window.open(buildWaUrl(t("kleia.wa.message")), "_blank");
  return (
    <div className="max-w-[1280px] mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-3">{t("kleia.pricing.title")}</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          {t("kleia.pricing.subtitle")}
        </p>
      </div>
      <div className="flex flex-col items-center">
        <div
          className="pricing-card w-full max-w-md rounded-[40px] p-8 md:p-10 text-white relative overflow-hidden"
          style={{ backgroundColor: "hsl(238, 78%, 54%)", boxShadow: "0 25px 50px -12px rgba(45,49,231,0.3)" }}
        >
          <div className="absolute top-0 right-0 bg-primary px-4 py-2 rounded-bl-lg font-bold text-[10px] uppercase">
            {t("kleia.pricing.badge")}
          </div>
          <h3 className="text-xl font-bold font-heading mb-1">{t("kleia.pricing.planName")}</h3>
          <p className="text-sm text-white/60 mb-8">{t("kleia.pricing.planTagline")}</p>
          <div className="flex items-end gap-2 mb-8">
            <span className="text-2xl text-white/50 line-through">70€</span>
            <span className="text-5xl font-bold">20€</span>
            <span className="text-base text-white/60 pb-2">{t("kleia.pricing.perMonth")}</span>
          </div>
          <ul className="space-y-4 mb-10">
            {features.map((f, i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                <Check className="h-4 w-4 text-white" /> {f}
              </li>
            ))}
          </ul>
          <button
            onClick={openWhatsApp}
            className="w-full bg-white text-[hsl(238,78%,54%)] font-bold py-4 rounded-xl hover:scale-[1.02] transition-transform"
          >
            {t("kleia.pricing.cta")}
          </button>
        </div>
        <div className="mt-8 bg-primary/10 border border-primary/20 rounded-full px-6 py-2 text-primary font-bold text-[11px] uppercase tracking-wider">
          {t("kleia.pricing.trialBadge")}
        </div>
      </div>
    </div>
  );
}

// ─── S7 · FAQ ─────────────────────────────────────────────────────────────────
type FaqItem = { q: string; a: string };

function FAQSection() {
  const { t } = useTranslation();
  const faqs = (t("kleia.faq.items", { returnObjects: true }) as FaqItem[]) || [];
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="max-w-[896px] mx-auto">
      <h2 className="text-3xl font-bold font-heading text-center mb-12">{t("kleia.faq.title")}</h2>
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
  const { t } = useTranslation();
  return (
    <footer className="border-t border-border/50 py-12 bg-[hsl(210,40%,98%)]">
      <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col gap-4">
          <img src={kleiaLogo} alt="Kleia" className="h-7 w-auto" />
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            {t("kleia.footer.copyright", { year: currentYear })}
          </p>
        </div>
        <div className="flex gap-8 md:justify-end">
          <a
            href="https://imsolutions.studio/kleia/legal.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground uppercase hover:text-primary transition-colors"
          >
            {t("kleia.footer.privacy")}
          </a>
          <a
            href="https://imsolutions.studio/kleia/legal.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground uppercase hover:text-primary transition-colors"
          >
            {t("kleia.footer.terms")}
          </a>
          <a
            href="mailto:healthytoolinfo@gmail.com"
            className="text-xs text-muted-foreground uppercase hover:text-primary transition-colors"
          >
            {t("kleia.footer.contact")}
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
      <CookieBanner />
    </>
  );
}
