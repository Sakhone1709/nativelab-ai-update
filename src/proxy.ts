import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

import { detectLocale, LOCALE_COOKIE } from "./i18n/detect-locale";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);
const internalLocaleRewriteHeader = "x-nativeai-locale-rewrite";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function rememberLocale(response: NextResponse, locale: string) {
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
  });
  return response;
}

export function proxy(request: NextRequest) {
  if (/^\/ja(?:\/|$)/.test(request.nextUrl.pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = url.pathname.replace(/^\/ja(?=\/|$)/, "/vi");
    return rememberLocale(NextResponse.redirect(url), "vi");
  }
  if (/^\/zh(?:\/|$)/.test(request.nextUrl.pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = url.pathname.replace(/^\/zh(?=\/|$)/, "/zh-CN");
    return rememberLocale(NextResponse.redirect(url), "zh-CN");
  }
  if (request.headers.get(internalLocaleRewriteHeader) === "1") {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === "/") {
    const locale = detectLocale(request);

    // Non-default locale → redirect to its prefixed path and remember the choice.
    // 307 (temporary) so it is never cached as permanent — detection may differ.
    if (locale !== routing.defaultLocale) {
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}`;
      return rememberLocale(NextResponse.redirect(url), locale);
    }

    // Default locale → keep the clean "/" URL, render default content via an
    // internal rewrite (guarded against re-entry by the header below).
    const url = request.nextUrl.clone();
    url.pathname = `/${routing.defaultLocale}`;

    const headers = new Headers(request.headers);
    headers.set(internalLocaleRewriteHeader, "1");

    return rememberLocale(
      NextResponse.rewrite(url, { request: { headers } }),
      locale,
    );
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/", "/((?!api|_next|.*\\..*).*)"],
};
