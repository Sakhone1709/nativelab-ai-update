# Five-language localization verification

Implemented English (`en`), Thai (`th`), Lao (`lo`), Simplified Chinese (`zh-CN`) and Japanese (`ja`) across Home, Company, Capabilities, Technology, Case Studies and Contact.

## Implementation
- Consolidated page copy into `messages/{locale}.json` under Home, Profiles, Navigation, Metadata and Visual. Removed superseded duplicate Chinese/Japanese resources.
- Localized floating panels, contact/company/case annotations, status labels and Canvas captions. Preserved brand names, URLs, email addresses and technical identifiers.
- Replaced mixed English interface copy with localized terminology and revised Thai, Lao and Chinese descriptions.
- Selected locale controls HTML lang, metadata, document font variables and Canvas fonts. English uses Space Grotesk / Inter; Thai, Lao, Chinese and Japanese use their respective Noto Sans families.
- Font classes apply only the active locale family; unrelated locale fonts are not preloaded. Fonts remain self-hosted through next/font with display swap.
- Locale changes preserve route, query and hash with client-side navigation and scroll disabled. A validated one-year NEXT_LOCALE cookie preserves language choice.
- Legacy /zh links redirect to /zh-CN with route and query preserved; legacy zh cookies are normalized.
- Added appropriate line heights, nonnegative letter spacing and natural wrapping for non-Latin scripts. Locale changes safely remount text animation wrappers.
- Existing scene geometry, rendering loops, colors, buttons and actions remain intact; only scene text/fonts changed.

## Passed checks
- `npm run build`: production build and TypeScript, all 30 localized pages generated.
- `npm run lint`: no errors or warnings.
- `node scripts/localization-check.mjs`: identical nonempty catalog keys, no unintended Latin UI terms outside brand/acronym exceptions, all 30 SSR routes, correct localized H1/lang, locale navigation, five valid cookies, invalid cookie fallback, legacy Chinese path/cookie handling.
- `node scripts/check-localized-renderer.mjs`: 30 headings preserve text and grapheme boundaries; all six renderer variants remain static under reduced motion and animate normally otherwise.
- Browser: all 30 routes checked at 1440px and 390px. No horizontal page overflow; each page retains one scene canvas. All mobile H1 rectangles fit the viewport.
- Actual selector switches tested for all five locales; computed heading/body fonts match the required family.
- Query/hash preservation, reload persistence and locale-aware navigation verified in-browser.
- Chinese mobile drawer labels and destination locale verified.

## Scope and limits
- Reduced motion was tested deterministically at renderer level and the existing host media-query handling was retained. An OS-level preference toggle was not exercised.
- Responsive testing used browser viewport overrides, not physical phones. No device FPS or network-transfer benchmark was performed.
- This project has no inquiry form or validation flow to test; its existing email/phone/contact links were preserved.
- Translation completeness checks do not replace an independent native-language editorial review.

## Saved previews
- localization-thai-desktop.jpg
- localization-lao-mobile.jpg
- localization-chinese-desktop.jpg

## Final hydration verification
- Replaced runtime ICU word-dictionary splitting with deterministic reveal segments, preserving Thai/Lao runs and CJK combining marks.
- Fresh-browser pass across all 30 routes: no React hydration errors.
- Rechecked all 30 mobile routes after the fix: no horizontal overflow and no console errors.

