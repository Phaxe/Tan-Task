"use client";

import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { useState, useEffect, Suspense } from "react";
import Sidebar from "@/components/SideBar/SideBar";

export default function Home() {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  // Wait until language is ready
  useEffect(() => {
    if (i18n.language) {
      setIsLoading(false);
    }
  }, [i18n.language]);

  if (isLoading) return <p>Loading...</p>; // ✅ Prevents hydration mismatch

  return (
    <Suspense  fallback={<p>Loading translations...</p>}>
      <div className="flex justify-center w-full">
        <Sidebar/>
        <div>
        <LanguageSwitcher />
        <h1>{t("dashboard")}</h1>
        </div>
      </div>
    </Suspense>
  );
}
