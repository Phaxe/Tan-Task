"use client";

import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <button onClick={toggleLanguage} className="p-2 border rounded">
      {i18n.language === "en" ? "🇸🇦 العربية" : "🇬🇧 English"}
    </button>
  );
}