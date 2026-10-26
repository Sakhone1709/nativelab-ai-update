import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { ProfilePage } from "@/components/profile-page";
import { isLocale, Locale } from "@/i18n/routing";
import { getProfilePageContent } from "@/lib/profile-pages";
import { getSharedCopy } from "@/lib/site-copy";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function CompanyPage({ params }: PageProps) {
  const { locale: requestedLocale } = await params;

  if (!isLocale(requestedLocale)) {
    notFound();
  }

  const locale: Locale = requestedLocale;
  setRequestLocale(locale);

  const shared = await getSharedCopy(locale);

  return (
    <ProfilePage content={getProfilePageContent(locale, "company")} shared={shared} />
  );
}
