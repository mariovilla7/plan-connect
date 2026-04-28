import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
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
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      emailjs.init("Li-IsF_Rv_SW6GEY0");
      const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        time: new Date().toLocaleString(i18n.language === "es" ? "es-ES" : i18n.language, {
          year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit",
        }),
      };
      await emailjs.send("service_9yatyia", "template_ta16eku", templateParams);
      setShowConfirmation(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setShowConfirmation(false), 5000);
    } catch (error) {
      console.error("Error sending email:", error);
      alert(t("contact.form.success.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
        requestAnimationFrame(() => { handleScroll(); ticking = false; });
        ticking = true;
      }
    };
    window.addEventListener("scroll", throttled, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", throttled);
  }, []);

  return (
    <>
      <Helmet>
        <title>i'm solutions | Digital Solutions with Attitude, Resilience &amp; Vision</title>
        <meta
          name="description"
          content="Construimos soluciones digitales con sentido. Actualmente desarrollamos Kleia, una plataforma para nutricionistas. Fundada por Ivelina y Mario."
        />
        <link rel="canonical" href="https://imsolutions.studio/" />
      </Helmet>

      <div className="min-h-screen bg-[#FFFFFC]">
        {/* Header */}
        <header className="w-full bg-[#FFFFFC] py-4 lg:py-6 px-4 lg:px-16 xl:px-0 sticky top-0 z-50 border-b border-transparent">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <button onClick={scrollToTop} className="flex items-center hover:opacity-70 transition-opacity" aria-label="Inicio">
              <ImsLogo className="w-32 h-auto lg:w-40" />
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
                  <span className={`absolute w-6 h-0.5 bg-black transition-all duration-300 ${mobileMenuOpen ? "rotate-45" : "-translate-y-2"}`} />
                  <span className={`absolute w-6 h-0.5 bg-black transition-all duration-200 ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
                  <span className={`absolute w-6 h-0.5 bg-black transition-all duration-300 ${mobileMenuOpen ? "-rotate-45" : "translate-y-2"}`} />
                </div>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                className="lg:hidden bg-[#FFFFFC] border-t border-gray-200 py-8 mt-4 overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
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
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Hero */}
        <section className="w-full px-4 lg:px-16 xl:px-0 pb-16 lg:pb-32 pt-8 lg:pt-16">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-32">
            <div className="flex flex-col justify-center items-start gap-6 lg:w-1/2">
              <h1 className="font-gill-sans font-bold text-3xl lg:text-7xl leading-[120%] tracking-[-0.96px] lg:tracking-[-2.16px] text-black">
                {t("hero.title")}
              </h1>
              <h1 className="font-gill-sans font-bold text-3xl lg:text-7xl leading-[120%] tracking-[-0.96px] lg:tracking-[-2.16px] text-black -mt-4">
                {t("hero.tagline")}
              </h1>
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full lg:w-80 px-4 py-3 bg-black text-white font-inter font-bold text-base rounded-lg hover:bg-gray-700 hover:scale-105 transition-all duration-300"
              >
                {t("hero.button")}
              </button>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <motion.img
                src={heroImg}
                alt="i'm solutions team - Ivelina and Mario"
                loading="lazy"
                className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto mx-auto block"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
              />
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="w-full px-4 lg:px-16 xl:px-0 py-16 lg:py-32">
          <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 lg:gap-16">
            <motion.h2
              className="font-gill-sans font-bold text-3xl lg:text-7xl leading-[120%] tracking-[-0.96px] lg:tracking-[-2.16px] text-black"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              {t("projects.title")}
            </motion.h2>

            <div className="w-full flex flex-col lg:flex-row items-center gap-6 lg:gap-32">
              <button
                onClick={() => navigate("/kleia")}
                className="w-full lg:w-1/2 flex justify-center items-center group focus:outline-none"
                aria-label={t("projects.kleia.cta")}
              >
                <motion.img
                  src={projectsImg}
                  alt="Kleia — Plataforma para nutricionistas"
                  loading="lazy"
                  className="w-full max-w-xs md:max-w-sm lg:max-w-md h-auto mx-auto block transition-transform duration-300 group-hover:scale-[1.03]"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                />
              </button>
              <motion.div
                className="lg:w-1/2"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img src={kleiaLogo} alt="Kleia" className="h-10 w-auto" loading="lazy" />
                </div>
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
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="w-full px-4 lg:px-16 xl:px-0 py-16 lg:py-32">
          <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 lg:gap-16">
            <motion.h2
              className="font-gill-sans font-bold text-3xl lg:text-7xl leading-[120%] tracking-[-0.96px] lg:tracking-[-2.16px] text-black"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              {t("about.title")}
            </motion.h2>

            <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-32">
              <div className="lg:w-1/2 flex justify-center items-center">
                <motion.img
                  src={aboutImg}
                  alt="About i'm solutions - Ivelina and Mario"
                  loading="lazy"
                  className="w-full max-w-xs md:max-w-sm lg:max-w-md h-auto mx-auto block"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                />
              </div>
              <motion.div
                className="lg:w-1/2 space-y-4 font-gill-sans text-base leading-[140%] tracking-[-0.48px] text-black"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <p>{t("about.content.intro")}</p>
                <p>{t("about.content.founding")}</p>
                <p>{t("about.content.ivelina")}</p>
                <p>{t("about.content.mario")}</p>
                <p className="font-bold">{t("about.content.mission")}</p>
                <p className="font-bold whitespace-pre-line">
                  {t("about.content.philosophy").split("\\n").join("\n")}
                </p>
                <p className="font-bold text-lg">{t("about.content.cta")}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="w-full px-4 lg:px-16 xl:px-0 py-16 lg:py-32">
          <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 lg:gap-16">
            <motion.h2
              className="font-gill-sans font-bold text-3xl lg:text-7xl leading-[120%] tracking-[-0.96px] lg:tracking-[-2.16px] text-black text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              {t("contact.title")}
            </motion.h2>

            <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-32">
              <div className="lg:w-1/2 w-full">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block font-inter font-bold text-base text-black mb-2">{t("contact.form.name")}</label>
                    <input
                      type="text" name="name" value={formData.name} onChange={handleInputChange}
                      placeholder={t("contact.form.namePlaceholder")} required
                      className="w-full px-6 py-4 border border-black rounded-lg bg-white font-inter text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block font-inter font-bold text-base text-black mb-2">{t("contact.form.email")}</label>
                    <input
                      type="email" name="email" value={formData.email} onChange={handleInputChange}
                      placeholder={t("contact.form.emailPlaceholder")} required
                      className="w-full px-6 py-4 border border-black rounded-lg bg-white font-inter text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block font-inter font-bold text-base text-black mb-2">{t("contact.form.message")}</label>
                    <textarea
                      name="message" value={formData.message} onChange={handleInputChange}
                      placeholder={t("contact.form.messagePlaceholder")} rows={4} required
                      className="w-full px-6 py-4 border border-black rounded-lg bg-white font-inter text-base text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <motion.button
                    type="submit" disabled={isSubmitting}
                    className="w-full lg:w-auto px-6 py-3 bg-black text-white font-inter font-bold text-base rounded-lg hover:bg-gray-700 hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.div
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        {t("contact.form.sending")}
                      </span>
                    ) : t("contact.form.button")}
                  </motion.button>

                  <AnimatePresence>
                    {showConfirmation && (
                      <motion.div
                        className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      >
                        <h4 className="font-gill-sans font-bold text-green-800 text-lg">
                          {t("contact.form.success.title")}
                        </h4>
                        <p className="font-gill-sans text-green-700 text-sm mt-1">
                          {t("contact.form.success.description")}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
              <div className="lg:w-1/2 flex justify-center items-center">
                <motion.img
                  src={contactImg}
                  alt="Contact i'm solutions"
                  loading="lazy"
                  className="w-full max-w-xs md:max-w-sm lg:max-w-md h-auto mx-auto block"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
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
                <button onClick={scrollToTop} className="flex items-center hover:opacity-70 transition-opacity" aria-label="Inicio">
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
                    <Link to="/kleia" className="font-gill-sans text-gray-300 hover:text-white transition-colors text-left">
                      Kleia →
                    </Link>
                  </nav>
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="font-gill-sans font-bold text-white text-lg">{t("footer.contactInfo")}</h4>
                  <div className="flex flex-col gap-3">
                    <a href="mailto:hello@imsolutions.studio" className="font-gill-sans text-gray-300 hover:text-white transition-colors text-sm underline">
                      hello@imsolutions.studio
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
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
