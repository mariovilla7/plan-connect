import { useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "en", name: t("language.english"), flag: "🇺🇸" },
    { code: "es", name: t("language.spanish"), flag: "🇪🇸" },
    { code: "bg", name: t("language.bulgarian"), flag: "🇧🇬" },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-transparent hover:bg-gray-100 transition-colors duration-200"
        aria-label={t("language.select")}
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="font-gill-sans text-sm font-medium text-black hidden sm:block">
          {currentLanguage.code.toUpperCase()}
        </span>
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          className={`ml-1 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          <path
            d="M1 1.5L6 6.5L11 1.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div
            className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden animate-scale-in origin-top-right"
          >
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors duration-150 ${
                  i18n.language === language.code
                    ? "bg-gray-50 font-medium"
                    : ""
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <span className="font-gill-sans text-sm text-black">
                  {language.name}
                </span>
                {i18n.language === language.code && (
                  <span className="ml-auto w-2 h-2 bg-black rounded-full" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;
