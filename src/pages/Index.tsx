import kleiaLogo from "@/assets/kleia-logo.svg";
import problemaIlustracion from "@/assets/problema-ilustracion.png";
import { useState, useEffect } from "react";
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
            Dejá de pensar en menús.{" "}
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
    title: "Carga mental de inventar menús",
    description:
      "Cada semana volvés a empezar desde cero. Recordar qué comió cada paciente, qué puede y qué no puede comer, es un trabajo invisible que agota.",
  },
  {
    icon: Sliders,
    title: "Opciones irrelevantes",
    description:
      "Las herramientas genéricas no conocen las preferencias de tus pacientes. Te dan opciones que igual tenés que descartar manualmente.",
  },
  {
    icon: RefreshCw,
    title: "Un ajuste puede romper el plan",
    description:
      "Cambiás un alimento y tenés que recalcular todo. Cada modificación lleva tiempo y concentración que podrías usar en consultar.",
  },
  {
    icon: BatteryLow,
    title: "Agotamiento por retrabajo",
    description:
      "Después de un día de consultas, todavía te quedás horas armando y enviando planes. La energía que te sobra no alcanza.",
  },
];

// ─── S2 · El Problema ────────────────────────────────────────────────────────
function ProblemSection() {
  return (
    <section id="seccion-2-problema" className="py-6 px-6">
      <div className="container max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm p-10">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/5 text-xs uppercase tracking-widest">
              El Problema
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-serif">¿Te suena familiar?</h2>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-stretch">
            {/* Columna izquierda: 4 cajas apiladas */}
            <div className="flex-1 flex flex-col gap-3">
              {problems.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex gap-4 p-5 rounded-2xl bg-background hover:bg-primary/5 transition-colors">
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-0.5 text-sm">{title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Columna derecha: foto flotante con forma de huevo */}
            <div className="flex-shrink-0 w-full md:w-96 flex items-center justify-center md:justify-end">
              <div className="relative">
                {/* Sombra de fondo desplazada */}
                <div
                  className="absolute inset-0 translate-x-4 translate-y-4 bg-primary/10 blur-sm"
                  style={{ borderRadius: "60% 60% 55% 55% / 65% 65% 50% 50%" }}
                />
                <img
                  src={problemaIlustracion}
                  alt="Nutricionista agotada frente al ordenador"
                  className="relative w-full max-w-[320px] md:max-w-full object-contain drop-shadow-xl"
                  style={{ borderRadius: "60% 60% 55% 55% / 65% 65% 50% 50%", background: "hsl(var(--primary)/0.04)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Results ─────────────────────────────────────────────────────────────────
const stats = [
  { value: "10–20 min", label: "Plan completo", desc: "Tiempo promedio para generar un plan personalizado" },
  { value: "1–3 min", label: "Ajuste fino", desc: "Para modificar un alimento sin romper el balance" },
  { value: "6+ horas", label: "Ahorradas por semana", desc: "Que antes se iban en armar y enviar planes" },
  { value: "1 click", label: "Entrega al paciente", desc: "PDF listo para compartir por WhatsApp o mail" },
];

// ─── S3 · Resultados ─────────────────────────────────────────────────────────
function ResultsSection() {
  return (
    <section id="seccion-3-resultados" className="py-6 px-6">
      <div className="container max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm p-10">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/5 text-xs uppercase tracking-widest">
              RESULTADOS CON KLEIA
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-serif">
              Menos carga, más control
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map(({ value, label, desc }) => (
              <div key={value} className="text-center p-5 rounded-2xl bg-background">
                <p className="text-3xl font-bold font-serif text-primary mb-1">{value}</p>
                <p className="text-sm font-semibold mb-2">{label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
const steps = [
  { num: "01", title: "Cargá lo mínimo", desc: "Ingresá las restricciones, preferencias y objetivos del paciente una sola vez. Kleia los recuerda siempre." },
  { num: "02", title: "Generá el plan", desc: "Con un click, Kleia crea un plan semanal completo, balanceado y adaptado al perfil del paciente." },
  { num: "03", title: "Ajustá sin descuadres", desc: "Cambiá cualquier alimento y el sistema recalcula calorías y macros automáticamente en tiempo real." },
  { num: "04", title: "Entregá en 1 click", desc: "Exportá el plan como PDF listo para compartir. Sin formatear, sin copiar y pegar." },
];

// ─── S4 · Cómo funciona ──────────────────────────────────────────────────────
function HowItWorksSection() {
  return (
    <section id="seccion-4-flujo" className="py-6 px-6">
      <div className="container max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm p-10">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/5 text-xs uppercase tracking-widest">
              Flujo
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-serif">Cómo funciona</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map(({ num, title, desc }) => (
              <div key={num} className="flex flex-col items-start p-5 rounded-2xl bg-background">
                <span className="text-4xl font-bold font-serif text-primary/20 mb-3">{num}</span>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
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
      <div className="container max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm p-10">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/5 text-xs uppercase tracking-widest">
              Incluido
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-serif">Qué incluye Kleia</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {features.map((f) => (
              <div key={f} className="flex items-start gap-3 p-3 rounded-xl hover:bg-background transition-colors">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">{f}</span>
              </div>
            ))}
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
const forWho = [
  "Nutricionistas con más de 10 pacientes activos",
  "Querés recuperar tiempo sin bajar la calidad",
  "Hacés planes semana a semana desde cero",
  "Te importa la personalización de cada paciente",
  "Querés ser parte de definir la herramienta",
];

const notForWho = [
  "Recién empezando y con pocos pacientes",
  "Preferís hacer todo 100% a mano",
  "No querés dar feedback durante el piloto",
  "Buscás una solución definitiva ya terminada",
];

// ─── S7 · Encaje ─────────────────────────────────────────────────────────────
function FitSection() {
  return (
    <section id="seccion-7-encaje" className="py-6 px-6">
      <div className="container max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm p-10">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/5 text-xs uppercase tracking-widest">
              Encaje
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-serif">¿Kleia es para vos?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" /> Para quién es
              </h3>
              <ul className="space-y-3">
                {forWho.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 rounded-2xl bg-destructive/5 border border-destructive/20">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <XCircle className="h-5 w-5 text-destructive" /> Para quién NO es
              </h3>
              <ul className="space-y-3">
                {notForWho.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <X className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
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
