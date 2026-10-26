"use client";

import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useTransition } from "react";
import { Locale, locales } from "@/i18n/routing";
import { LocaleFlag } from "@/components/locale-flag";

const localeLabels: Record<Locale, string> = {
  en: "EN",
  th: "TH",
  "zh-CN": "ZH",
  vi: "VI",
  lo: "LO",
};

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const t = useTranslations("Navigation");

  return (
    <details className="group relative" aria-busy={pending}>
      <summary
        aria-label={t("language")}
        className="flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden"
      >
        <LocaleFlag locale={locale}/><span>{localeLabels[locale]}</span>
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
              onClick={(event) => {
                event.preventDefault();
                event.currentTarget.closest("details")?.removeAttribute("open");
                startTransition(() => router.replace(`${pathname}${window.location.search}${window.location.hash}`, { locale: targetLocale, scroll: false }));
              }}
            >
              <span className="flex w-full items-center justify-between gap-6"><span>{localeLabels[targetLocale]}</span><LocaleFlag locale={targetLocale}/></span>
            </Link>
          );
        })}
      </div>
    </details>
  );
}
