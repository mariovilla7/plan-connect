import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import kleiaLogo from "@/assets/kleia-logo.svg";

type Section = { title: string; body: string[] };

export default function Legal() {
  const { t } = useTranslation();
  const sections =
    (t("legal.sections", { returnObjects: true }) as Section[]) || [];

  return (
    <>
      <Helmet>
        <title>{t("legal.meta.title")}</title>
        <meta name="description" content={t("legal.meta.description")} />
        <link rel="canonical" href="/legal" />
      </Helmet>

      <main className="min-h-screen bg-background text-foreground">
        <header className="border-b border-border/50">
          <div className="max-w-3xl mx-auto px-6 py-6 flex items-center justify-between">
            <Link to="/kleia" aria-label={t("legal.backAria")} className="flex items-center">
              <img src={kleiaLogo} alt="Kleia" className="h-7 w-auto" />
            </Link>
            <Link
              to="/kleia"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {t("legal.back")}
            </Link>
          </div>
        </header>

        <article className="max-w-3xl mx-auto px-6 py-12">
          <h1 className="font-manrope text-3xl md:text-4xl font-bold mb-2">
            {t("legal.title")}
          </h1>
          <h2 className="font-manrope text-xl md:text-2xl font-semibold text-muted-foreground mb-10">
            {t("legal.subtitle")}
          </h2>

          <div className="space-y-8 font-inter text-base leading-relaxed text-foreground/90">
            {sections.map((s, idx) => (
              <section key={idx}>
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
