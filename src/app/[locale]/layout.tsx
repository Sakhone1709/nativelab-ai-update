import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  JetBrains_Mono,
  Noto_Sans,
  Noto_Sans_Lao,
  Noto_Sans_SC,
  Noto_Sans_Thai,
  Space_Grotesk,
} from "next/font/google";
import { notFound } from "next/navigation";

import "@/app/globals.css";
import { isLocale, Locale, routing } from "@/i18n/routing";

const notoSans = Noto_Sans({
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-locale",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ["latin", "thai"],
  variable: "--font-locale",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSansLao = Noto_Sans_Lao({
  subsets: ["latin", "lao"],
  variable: "--font-locale",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-locale",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const fontClassByLocale: Record<Locale, string> = {
  en: notoSans.variable,
  th: notoSansThai.variable,
  zh: notoSansSC.variable,
  vi: notoSans.variable,
  lo: notoSansLao.variable,
};

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale: requestedLocale } = await params;
  const locale = isLocale(requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      className={`${fontClassByLocale[locale]} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}
      data-locale={locale}
      lang={locale}
    >
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
