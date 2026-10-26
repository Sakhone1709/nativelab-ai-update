import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { HomeClient } from "@/components/home-client";
import { isLocale, Locale } from "@/i18n/routing";
import { getHomeCopy } from "@/lib/site-copy";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: PageProps) {
  const { locale: requestedLocale } = await params;

  if (!isLocale(requestedLocale)) {
    notFound();
  }

  const locale: Locale = requestedLocale;
  setRequestLocale(locale);

  const translations = await getHomeCopy(locale);

  return <HomeClient t={translations} />;
}
