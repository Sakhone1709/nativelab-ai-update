import type { NextRequest } from "next/server";

import { isLocale, routing, type Locale } from "./routing";

/**
 * Cookie next-intl reads/writes for the active locale. Reading it first means a
 * manual choice from the language switcher always wins over geo/browser guesses.
 */
export const LOCALE_COOKIE = "NEXT_LOCALE";

/**
 * Headers a CDN / reverse proxy may inject with the visitor's ISO country code.
 * Next.js 16 removed `request.geo`, so true IP-geo now depends on the edge layer.
 * If none are present (e.g. a plain self-hosted server) detection falls back to
 * the browser's Accept-Language — no external API call, no IP leaves our server.
 */
const COUNTRY_HEADERS = [
  "x-vercel-ip-country", // Vercel
  "cf-ipcountry", // Cloudflare
  "x-country-code", // common GeoIP / nginx modules
  "x-geo-country",
] as const;

/** ISO 3166-1 alpha-2 country → supported locale. Unlisted countries fall through. */
const COUNTRY_TO_LOCALE: Record<string, Locale> = {
  TH: "th",
  CN: "zh-CN",
  HK: "zh-CN",
  MO: "zh-CN",
  TW: "zh-CN",
  VN: "vi",
  LA: "lo",
};

function fromCookie(request: NextRequest): Locale | undefined {
  const value = request.cookies.get(LOCALE_COOKIE)?.value;
  return value === "ja" ? "vi" : value === "zh" ? "zh-CN" : isLocale(value) ? value : undefined;
}

function fromGeo(request: NextRequest): Locale | undefined {
  for (const header of COUNTRY_HEADERS) {
    const country = request.headers.get(header)?.trim().toUpperCase();
    if (!country) continue;

    const mapped = COUNTRY_TO_LOCALE[country];
    if (mapped) return mapped;
  }
  return undefined;
}

function fromAcceptLanguage(request: NextRequest): Locale | undefined {
  const header = request.headers.get("accept-language");
  if (!header) return undefined;

  // "th-TH,th;q=0.9,en;q=0.8" → base language tags ordered by quality.
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const qValueRaw = params.find((p) => p.trim().startsWith("q="))?.split("=")[1];
      const q = qValueRaw ? Number.parseFloat(qValueRaw) : 1;
      return {
        lang: (tag ?? "").toLowerCase().split("-")[0] ?? "",
        q: Number.isNaN(q) ? 0 : q,
      };
    })
    .filter((entry) => entry.lang)
    .sort((a, b) => b.q - a.q);

  for (const { lang } of ranked) {
    if (lang === "zh") return "zh-CN";
    if (isLocale(lang)) return lang;
  }
  return undefined;
}

/**
 * Resolve the best locale for a request: explicit choice (cookie) → IP country
 * (CDN header) → browser language → site default.
 */
export function detectLocale(request: NextRequest): Locale {
  return (
    fromCookie(request) ??
    fromGeo(request) ??
    fromAcceptLanguage(request) ??
    routing.defaultLocale
  );
}
