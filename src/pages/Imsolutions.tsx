import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import LanguageSelector from "@/components/LanguageSelector";
import ImsLogo from "@/components/ImsLogo";
import heroImg from "@/assets/imsolutions/hero.png";
import projectsImg from "@/assets/imsolutions/proyects.png";
import aboutImg from "@/assets/imsolutions/about.png";
import contactImg from "@/assets/imsolutions/contact.png";
import kleiaLogo from "@/assets/imsolutions/logokleia.png";

export default function Imsolutions() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Load Tally embed script lazily after page load (defers third-party JS)
  useEffect(() => {
    const SRC = "https://tally.so/widgets/embed.js";
    const load = () => {
      if (document.querySelector(`script[src="${SRC}"]`)) {
        const w = window as any;
        if (typeof w.Tally !== "undefined") w.Tally.loadEmbeds();
        return;
      }
      const script = document.createElement("script");
      script.src = SRC;
      script.async = true;
      script.onload = () => {
        const w = window as any;
        if (typeof w.Tally !== "undefined") w.Tally.loadEmbeds();
      };
      document.body.appendChild(script);
    };
    const schedule = () => {
      const ric = (window as any).requestIdleCallback as
        | ((cb: () => void, opts?: { timeout: number }) => number)
        | undefined;
      if (ric) ric(load, { timeout: 3000 });
      else setTimeout(load, 1500);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
  }, []);


  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    setMobileMenuOpen(false);
    if (!element) return;
    setTimeout(() => {
      const header = document.querySelector("header");
      const headerHeight = header ? header.getBoundingClientRect().height + 30 : 130;
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: Math.max(0, elementTop - headerHeight), behavior: "smooth" });
    }, 50);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["projects", "about", "contact"];
      const header = document.querySelector("header");
      const headerHeight = header ? header.offsetHeight + 50 : 150;
      const scrollPosition = window.scrollY;
      const scrollMiddle = scrollPosition + window.innerHeight / 3;
      let currentSection = "";
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop - headerHeight;
          const sectionBottom = sectionTop + section.offsetHeight;
          if (scrollMiddle >= sectionTop && scrollMiddle < sectionBottom) {
            currentSection = sectionId;
            break;
          }
        }
      }
      if (scrollPosition < 200) currentSection = "";
      setActiveSection(currentSection);
    };
    let ticking = false;
    const throttled = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", throttled, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", throttled);
  }, []);

  return (
    <>
      {(() => {
        const lang = (i18n.language || "es").slice(0, 2);
        const seo = {
          es: {
            title: "i'm solutions | Soluciones digitales con actitud y visión",
            desc: "Estudio digital fundado por Ivelina y Mario en España. Construimos productos con sentido. Actualmente desarrollamos Kleia, plataforma clínica para nutricionistas.",
          },
          en: {
            title: "i'm solutions | Digital products with attitude & vision",
            desc: "Digital studio founded by Ivelina and Mario in Spain. We build meaningful products. Currently developing Kleia, a clinical platform for nutritionists.",
          },
          bg: {
            title: "i'm solutions | Дигитални продукти с нагласа и визия",
            desc: "Дигитално студио, основано от Ивелина и Марио в Испания. Изграждаме смислени продукти. В момента разработваме Kleia — клинична платформа за нутриционисти.",
          },
        }[lang as "es" | "en" | "bg"] ?? {
          title: "i'm solutions | Digital products with attitude",
          desc: "We build meaningful digital products. Currently developing Kleia.",
        };
        const ogLocale = lang === "en" ? "en_US" : lang === "bg" ? "bg_BG" : "es_ES";
        return (
          <Helmet>
            <html lang={lang} />
            <title>{seo.title}</title>
            <meta name="description" content={seo.desc} />
            <meta
              name="keywords"
              content="i'm solutions, im solutions, imSolutions Studio, Ivelina, Mario, digital studio, nutrition software, Kleia, Spain, startup, product design, MVP"
            />
            <link rel="canonical" href="https://www.imsolutions.studio/" />
            <link rel="alternate" hrefLang="es" href="https://www.imsolutions.studio/" />
            <link rel="alternate" hrefLang="en" href="https://www.imsolutions.studio/" />
            <link rel="alternate" hrefLang="bg" href="https://www.imsolutions.studio/" />
            <link rel="alternate" hrefLang="x-default" href="https://www.imsolutions.studio/" />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="i'm solutions" />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.desc} />
            <meta property="og:url" content="https://www.imsolutions.studio/" />
            <meta property="og:locale" content={ogLocale} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={seo.title} />
            <meta name="twitter:description" content={seo.desc} />
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "Organization",
                    "@id": "https://www.imsolutions.studio/#organization",
                    name: "i'm solutions",
                    alternateName: ["imSolutions Studio", "im solutions"],
                    url: "https://www.imsolutions.studio/",
                    logo: "https://www.imsolutions.studio/img/logoKleia.png",
                    email: "hello@imsolutions.studio",
                    founder: [
                      { "@type": "Person", name: "Ivelina Savchova" },
                      { "@type": "Person", name: "Mario Villanueva" },
                    ],
                    foundingLocation: { "@type": "Place", name: "Spain" },
                    areaServed: ["ES", "EU", "LATAM"],
                  },
                  {
                    "@type": "WebSite",
                    "@id": "https://www.imsolutions.studio/#website",
                    url: "https://www.imsolutions.studio/",
                    name: "i'm solutions",
                    publisher: { "@id": "https://www.imsolutions.studio/#organization" },
                    inLanguage: ["es", "en", "bg"],
                  },
                ],
              })}
            </script>
          </Helmet>
        );
      })()}

      <div className="min-h-screen bg-[#FFFFFC]">
        {/* Header */}
        <header className="w-full bg-[#FFFFFC] py-4 lg:py-6 px-4 lg:px-16 xl:px-0 sticky top-0 z-50 border-b border-transparent">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <button
              onClick={scrollToTop}
              className="flex items-center hover:opacity-70 transition-opacity"
              aria-label="Inicio"
            >
              <ImsLogo className="w-24 h-auto lg:w-40" />
            </button>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center space-x-8">
              <nav className="flex items-center space-x-16">
                {(["projects", "about", "contact"] as const).map((id) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`font-gill-sans text-xl text-black hover:opacity-70 transition-all duration-300 relative ${
                      activeSection === id
                        ? 'after:content-[""] after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-black'
                        : ""
                    }`}
                  >
                    {t(`nav.${id}`)}
                  </button>
                ))}
              </nav>
              <LanguageSelector />
            </div>

            {/* Mobile */}
            <div className="lg:hidden flex items-center space-x-4">
              <LanguageSelector />
              <button
                className="p-2 relative w-8 h-8 flex items-center justify-center"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
              >
                <div className="relative w-6 h-6 flex flex-col justify-center items-center">
                  <span
                    className={`absolute w-6 h-0.5 bg-black transition-all duration-300 ${mobileMenuOpen ? "rotate-45" : "-translate-y-2"}`}
                  />
                  <span
                    className={`absolute w-6 h-0.5 bg-black transition-all duration-200 ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`}
                  />
                  <span
                    className={`absolute w-6 h-0.5 bg-black transition-all duration-300 ${mobileMenuOpen ? "-rotate-45" : "translate-y-2"}`}
                  />
                </div>
              </button>
            </div>
          </div>

          
            {mobileMenuOpen && (
              <div
                className="lg:hidden bg-[#FFFFFC] border-t border-gray-200 py-8 mt-4 overflow-hidden"
              >
                <div className="max-w-7xl mx-auto px-6 flex flex-col space-y-6">
                  {(["projects", "about", "contact"] as const).map((id) => (
                    <button
                      key={id}
                      onClick={() => scrollToSection(id)}
                      className="font-gill-sans text-xl text-black hover:opacity-70 transition-all text-left"
                    >
                      {t(`nav.${id}`)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          
        </header>

        {/* Hero */}
        <section className="w-full px-4 lg:px-16 xl:px-0 pb-16 lg:pb-32 pt-8 lg:pt-16">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-32">
            <div className="flex flex-col justify-center items-start gap-6 lg:w-1/2">
              <h1 className="font-gill-sans font-bold text-3xl lg:text-7xl leading-[1.15] lg:leading-[120%] tracking-[-0.5px] lg:tracking-[-2.16px] text-black">
                <span className="sr-only">i'm solutions — </span>
                <span className="block">{t("hero.title")}</span>
                <span className="block lg:-mt-4">{t("hero.tagline")}</span>
              </h1>
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full lg:w-80 px-4 py-3 bg-black text-white font-inter font-bold text-base rounded-lg hover:bg-gray-700 hover:scale-105 transition-all duration-300"
              >
                {t("hero.button")}
              </button>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <img
                src={heroImg}
                alt="i'm solutions team - Ivelina and Mario"
                loading="lazy"
                className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto mx-auto block"
              />
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="w-full px-4 lg:px-16 xl:px-0 py-16 lg:py-32">
          <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 lg:gap-16">
            <h2
              className="font-gill-sans font-bold text-3xl lg:text-7xl leading-[120%] tracking-[-0.96px] lg:tracking-[-2.16px] text-black"
            >
              {t("projects.title")}
            </h2>

            <div className="w-full bg-[#F4F2EC] rounded-3xl p-6 sm:p-10 lg:p-16 flex flex-col lg:flex-row items-center gap-8 lg:gap-20 shadow-sm border border-black/5">
              <button
                onClick={() => navigate("/kleia")}
                className="w-full lg:w-1/2 flex justify-center items-center group focus:outline-none"
                aria-label={t("projects.kleia.cta")}
              >
                <img
                  src={kleiaLogo}
                  alt="Kleia — Plataforma para nutricionistas"
                  loading="lazy"
                  className="w-full max-w-[260px] md:max-w-xs lg:max-w-sm h-auto mx-auto block transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </button>
              <div
                className="lg:w-1/2"
              >
                <h3 className="font-gill-sans font-bold text-xl lg:text-2xl text-black mb-4">
                  {t("projects.kleia.title")}
                </h3>
                <p className="font-gill-sans text-base leading-[140%] tracking-[-0.48px] text-black">
                  {t("projects.kleia.description1")}
                </p>
                <p className="font-gill-sans text-base leading-[140%] tracking-[-0.48px] text-black mt-4">
                  {t("projects.kleia.description2")}
                </p>
                <button
                  onClick={() => navigate("/kleia")}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-3 bg-black text-white font-inter font-bold text-base rounded-lg hover:bg-gray-700 hover:scale-105 transition-all duration-300"
                >
                  {t("projects.kleia.cta")}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="w-full flex justify-center mt-8 lg:mt-16">
              <img
                src={projectsImg}
                alt="Ilustración Kleia — colaboración nutricionista y paciente"
                loading="lazy"
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto mx-auto block"
              />
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="w-full px-4 lg:px-16 xl:px-0 py-16 lg:py-32">
          <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 lg:gap-16">
            <h2
              className="font-gill-sans font-bold text-3xl lg:text-7xl leading-[120%] tracking-[-0.96px] lg:tracking-[-2.16px] text-black"
            >
              {t("about.title")}
            </h2>

            <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-32">
              <div className="lg:w-1/2 flex justify-center items-center">
                <img
                  src={aboutImg}
                  alt="About i'm solutions - Ivelina and Mario"
                  loading="lazy"
                  className="w-full max-w-xs md:max-w-sm lg:max-w-md h-auto mx-auto block"
                />
              </div>
              <div
                className="lg:w-1/2 space-y-4 font-gill-sans text-base leading-[140%] tracking-[-0.48px] text-black"
              >
                <p>{t("about.content.intro")}</p>
                <p>{t("about.content.founding")}</p>
                <p>{t("about.content.ivelina")}</p>
                <p>{t("about.content.mario")}</p>
                <p className="font-bold">{t("about.content.mission")}</p>
                <p className="font-bold whitespace-pre-line">{t("about.content.philosophy").split("\\n").join("\n")}</p>
                <p className="font-bold text-lg">{t("about.content.cta")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="w-full px-4 lg:px-16 xl:px-0 py-16 lg:py-32">
          <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 lg:gap-16">
            <h2
              className="font-gill-sans font-bold text-3xl lg:text-7xl leading-[120%] tracking-[-0.96px] lg:tracking-[-2.16px] text-black text-center"
            >
              {t("contact.title")}
            </h2>

            <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-32">
              <div className="lg:w-1/2 w-full">
                <iframe
                  src="https://tally.so/embed/mBvvde?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                  loading="lazy"
                  width="100%"
                  height="500"
                  frameBorder={0}
                  marginHeight={0}
                  marginWidth={0}
                  title="Contact form"
                  className="w-full"
                />
              </div>
              <div className="lg:w-1/2 flex justify-center items-center">
                <img
                  src={contactImg}
                  alt="Contact i'm solutions"
                  loading="lazy"
                  className="w-full max-w-xs md:max-w-sm lg:max-w-md h-auto mx-auto block"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full bg-black text-white py-16 px-4 lg:px-16 xl:px-0">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
              <div className="flex flex-col gap-4">
                <button
                  onClick={scrollToTop}
                  className="flex items-center hover:opacity-70 transition-opacity"
                  aria-label="Inicio"
                >
                  <ImsLogo className="w-24 h-auto" fill="#FFFFFF" />
                </button>
                <p className="font-gill-sans text-sm text-gray-300 max-w-xs">{t("footer.description")}</p>
              </div>
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                <div className="flex flex-col gap-4">
                  <h4 className="font-gill-sans font-bold text-white text-lg">{t("footer.navigation")}</h4>
                  <nav className="flex flex-col gap-3">
                    {(["projects", "about", "contact"] as const).map((id) => (
                      <button
                        key={id}
                        onClick={() => scrollToSection(id)}
                        className="font-gill-sans text-gray-300 hover:text-white transition-colors text-left"
                      >
                        {t(`nav.${id}`)}
                      </button>
                    ))}
                    <Link
                      to="/kleia"
                      className="font-gill-sans text-gray-300 hover:text-white transition-colors text-left"
                    >
                      Kleia →
                    </Link>
                  </nav>
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="font-gill-sans font-bold text-white text-lg">{t("footer.contactInfo")}</h4>
                  <div className="flex flex-col gap-3">
                    <a
                      href="mailto:healthytoolinfo@gmail.com"
                      className="font-gill-sans text-gray-300 hover:text-white transition-colors text-sm underline"
                    >
                      healthytoolinfo@gmail.com
                    </a>
                    <p className="font-gill-sans text-gray-300 text-sm">{t("footer.location")}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-4">
              <p className="font-gill-sans text-gray-400 text-sm">
                {t("footer.copyright", { year: new Date().getFullYear() })}
              </p>
              <div className="flex gap-6">
                <Link to="/legal" className="font-gill-sans text-gray-300 hover:text-white transition-colors text-sm">
                  {t("footer.privacy")}
                </Link>
                <Link to="/legal" className="font-gill-sans text-gray-300 hover:text-white transition-colors text-sm">
                  {t("footer.terms")}
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
