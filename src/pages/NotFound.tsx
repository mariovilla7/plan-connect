import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import notFoundImg from "@/assets/404.png";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>404 | im solutions</title>
        <meta
          name="description"
          content="Oops! You've hit a dead end… but hey, even legends get lost sometimes!"
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <main
        className="flex min-h-screen flex-col items-center justify-center px-4"
        style={{ backgroundColor: "#FFFFFC", color: "#1D1D1B" }}
      >
        <div className="mx-auto max-w-[420px] py-8 text-center">
          <img
            src={notFoundImg}
            alt="Lost legend - im solutions"
            className="mx-auto mb-8 h-auto w-[280px] rounded-2xl sm:w-[300px]"
          />
          <h1
            className="mb-6 text-2xl font-bold"
            style={{ letterSpacing: "-1px", fontFamily: "'Manrope', sans-serif" }}
          >
            Oops! You've hit a dead end… but hey, even legends get lost sometimes!
          </h1>
          <a
            href="/"
            className="mt-6 inline-block rounded-lg px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: "#1D1D1B", fontFamily: "'Inter', sans-serif" }}
          >
            Back to home
          </a>
        </div>
      </main>
    </>
  );
};

export default NotFound;
