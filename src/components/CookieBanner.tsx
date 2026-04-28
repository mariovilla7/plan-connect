import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-foreground/95 backdrop-blur-lg text-white px-4 py-4 sm:px-8 sm:py-5 shadow-2xl">
      <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm flex-1 leading-relaxed">
          Usamos cookies para mejorar tu experiencia y analizar el tráfico.{" "}
          <Link
            to="/legal"
            className="underline hover:text-primary transition-colors"
          >
            Más información
          </Link>
        </p>
        <div className="flex gap-3 shrink-0">
          <Button
            variant="ghost"
            onClick={reject}
            className="text-white/70 hover:text-white hover:bg-white/10 rounded-full px-5 text-sm"
          >
            Rechazar
          </Button>
          <Button
            onClick={accept}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 text-sm font-bold shadow-md"
          >
            Aceptar cookies
          </Button>
        </div>
      </div>
    </div>
  );
}
