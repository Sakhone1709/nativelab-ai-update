"use client";

import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { Locale, locales } from "@/i18n/routing";

const localeLabels: Record<Locale, string> = {
  en: "EN",
  th: "ไทย",
  zh: "中文",
  vi: "Tiếng Việt",
  lo: "ລາວ",
};

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const t = useTranslations("Navigation");

  return (
    <details className="group relative">
      <summary
        aria-label={t("language")}
        className="flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden"
      >
        <span>{localeLabels[locale]}</span>
        <span
          aria-hidden="true"
          className="text-muted-foreground transition-transform group-open:rotate-180"
        >
          v
        </span>
      </summary>
      <div className="absolute right-0 z-20 mt-2 min-w-40 overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-lg">
        {locales.map((targetLocale) => {
          const isActive = targetLocale === locale;

          return (
            <Link
              aria-current={isActive ? "true" : undefined}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[active=true]:bg-muted data-[active=true]:text-primary"
              data-active={isActive}
              href={pathname}
              hrefLang={targetLocale}
              key={targetLocale}
              locale={targetLocale}
            >
              {localeLabels[targetLocale]}
            </Link>
          );
        })}
      </div>
    </details>
  );
}
