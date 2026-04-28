import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import kleiaLogo from "@/assets/kleia-logo.svg";

const sections: { title: string; body: string[] }[] = [
  {
    title: "Introducción",
    body: [
      "Bienvenido/a a Kleia. Estos Términos y Condiciones regulan el acceso, registro y uso de la plataforma Kleia por parte de profesionales de la nutrición y otros usuarios autorizados. Al registrarte o utilizar Kleia, aceptas quedar vinculado/a por estos Términos.",
    ],
  },
  {
    title: "Objeto del servicio",
    body: [
      "Kleia es una plataforma digital diseñada para ayudar a profesionales de la nutrición en la gestión, elaboración, organización y seguimiento de planes nutricionales y contenidos relacionados con su práctica profesional.",
    ],
  },
  {
    title: "Requisitos de Uso y Perfil Profesional",
    body: [
      "Kleia es una plataforma de software dirigida exclusivamente a profesionales de la nutrición, dietética y salud debidamente titulados y habilitados legalmente para el ejercicio de su profesión en su respectiva jurisdicción.",
      "Al registrarse y utilizar el Servicio, el Usuario manifiesta y garantiza que:",
      "• Posee la titulación académica y las licencias profesionales necesarias para prescribir pautas nutricionales.",
      "• Cumple con las normativas locales de colegiación y ética profesional.",
      "• Utiliza la plataforma como una herramienta de apoyo a su juicio clínico y no como una fuente única de diagnóstico o tratamiento.",
    ],
  },
  {
    title: "Exención de Responsabilidad por Uso Indebido",
    body: [
      "Kleia no verifica la veracidad de la titulación aportada por los Usuarios en el momento del registro. El uso de la plataforma por parte de personas no cualificadas o para fines de autodiagnóstico está estrictamente prohibido. Kleia declina toda responsabilidad por cualquier daño, perjuicio o reclamación derivada de:",
      "• El uso de la herramienta por parte de personas sin la capacitación técnica o legal necesaria (intrusismo profesional).",
      "• La aplicación de planes generados por la IA sin la revisión, corrección y validación previa de un profesional titulado.",
      "• Decisiones de salud tomadas por usuarios particulares que accedan a la plataforma sin supervisión profesional.",
    ],
  },
  {
    title: "Uso profesional",
    body: [
      "El usuario reconoce que Kleia es una herramienta de apoyo. El contenido generado, sugerido, organizado o adaptado por la plataforma, incluyendo funcionalidades basadas en inteligencia artificial, debe ser revisado y validado por el profesional antes de ser utilizado con clientes o pacientes.",
    ],
  },
  {
    title: "Responsabilidad del usuario",
    body: [
      "El usuario se compromete a:",
      "• proporcionar información veraz y actualizada;",
      "• mantener la confidencialidad de sus credenciales de acceso;",
      "• utilizar la plataforma conforme a la ley, la ética profesional y estos Términos;",
      "• no introducir datos si no cuenta con una base jurídica válida para ello;",
      "• revisar y supervisar siempre el contenido final entregado a sus clientes.",
    ],
  },
  {
    title: "Datos de terceros",
    body: [
      "Si el usuario introduce datos personales de terceros, incluidos datos de salud, declara que está legitimado para hacerlo y que ha cumplido con las obligaciones de información y demás requisitos legales aplicables.",
    ],
  },
  {
    title: "Inteligencia artificial",
    body: [
      "Kleia puede incorporar funcionalidades basadas en inteligencia artificial para asistir en la organización, estructuración o propuesta de contenidos. Estas funcionalidades no sustituyen el juicio profesional, el diagnóstico, la evaluación clínica ni la responsabilidad del usuario.",
    ],
  },
  {
    title: "Disponibilidad",
    body: [
      "Kleia realizará esfuerzos razonables para mantener la disponibilidad de la plataforma, sin garantizar un funcionamiento ininterrumpido o libre de errores.",
    ],
  },
  {
    title: "Propiedad intelectual",
    body: [
      "Todos los derechos sobre la plataforma, su diseño, tecnología, marca, contenidos base y elementos distintivos pertenecen a Kleia o a sus licenciantes. El usuario conserva la titularidad de los contenidos propios que introduzca en la plataforma, en la medida permitida por la ley.",
    ],
  },
  {
    title: "Suspensión o cancelación",
    body: [
      "Kleia podrá suspender o cancelar cuentas en caso de uso indebido, incumplimiento legal, riesgo para la seguridad o incumplimiento de estos Términos.",
    ],
  },
  {
    title: "Limitación de responsabilidad",
    body: [
      "Kleia actúa como herramienta de soporte. La responsabilidad sobre la decisión profesional final, así como sobre el uso clínico o nutricional del contenido, corresponde al profesional usuario.",
    ],
  },
  {
    title: "Modificaciones",
    body: [
      "Kleia podrá actualizar estos Términos. Cuando los cambios sean relevantes, se informará al usuario por medios razonables.",
    ],
  },
  {
    title: "Ley aplicable y contacto",
    body: [
      "Estos Términos se regirán por la ley aplicable indicada por Kleia en la versión vigente. Para cualquier consulta legal o contractual, puedes contactar en: legal@kleia.com.",
    ],
  },
];

export default function Legal() {
  return (
    <>
      <Helmet>
        <title>Términos y Condiciones — Kleia</title>
        <meta
          name="description"
          content="Términos y Condiciones de uso de Kleia, plataforma digital para profesionales de la nutrición."
        />
        <link rel="canonical" href="/legal" />
      </Helmet>

      <main className="min-h-screen bg-background text-foreground">
        <header className="border-b border-border/50">
          <div className="max-w-3xl mx-auto px-6 py-6 flex items-center justify-between">
            <Link to="/kleia" aria-label="Volver a Kleia" className="flex items-center">
              <img src={kleiaLogo} alt="Kleia" className="h-7 w-auto" />
            </Link>
            <Link
              to="/kleia"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ← Volver
            </Link>
          </div>
        </header>

        <article className="max-w-3xl mx-auto px-6 py-12">
          <h1 className="font-manrope text-3xl md:text-4xl font-bold mb-2">
            Términos y Condiciones
          </h1>
          <h2 className="font-manrope text-xl md:text-2xl font-semibold text-muted-foreground mb-10">
            Términos y Condiciones de Kleia
          </h2>

          <div className="space-y-8 font-inter text-base leading-relaxed text-foreground/90">
            {sections.map((s) => (
              <section key={s.title}>
                <h3 className="font-manrope text-lg font-bold mb-3">{s.title}</h3>
                {s.body.map((p, i) => (
                  <p key={i} className="mb-2 whitespace-pre-line">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </article>
      </main>
    </>
  );
}
