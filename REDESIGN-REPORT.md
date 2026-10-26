# NativeLab AI redesign report

## Repository findings

- Next.js 16.2.9 App Router, React 19.2.4, TypeScript, Tailwind 4.3.1.
- Existing animation library: Framer Motion 12.42.0. Existing graphics: SVG and CSS; no WebGL engine.
- Six routes: home, company, technology, capabilities, case-studies, contact. Projects retains its existing `/case-studies` URL and verified case-study content.
- next-intl 4.13.0 provides localized routing, server messages, language cookies, and request detection. Profile content lives in typed TypeScript maps.
- Contact actions are email, telephone, and map links. There is no contact form, submission API, validation pipeline, or backend integration in this repository.
- The existing company identity is NativeLab AI. Its name, headline, business claims, representative work, and contact details were preserved.
- Existing `package-lock.json` modifications were present before this work and were left intact.

## Design system and layout

The primary palette is now #050807, #10251B, #76B900, and #A3FF5F, with neutral surfaces and readable supporting text. The shared design includes a 1360px maximum content width, fluid display sizes, full-width translucent navigation, active routes, responsive split heroes, asymmetric bento cards, restrained glow feedback, and icon interactions. Space Grotesk and Inter are self-hosted through next/font; Thai, Lao, Chinese, and Japanese have script-specific Noto families.

The mobile hero uses normal document flow so translations of different lengths do not collide with the visual or statistics. Desktop uses a prominent scene beside the headline. The six routes share visual tokens and content components without replacing routing or business logic.

## Hero scenes

| Route | Implemented composition |
| --- | --- |
| Home | Perspective neural network, signal packets, and a morphing banded core |
| Company | Branching circuit paths, traveling signals, and a coordinated particle mesh |
| Technology | Perspective orb, layered rotating rings, internal points, and atmospheric light |
| Capabilities | Layered flowing data paths and luminous packets |
| Case studies | Three-arm particle galaxy and nearby connecting paths |
| Contact | Smaller converging neural structure with quieter data paths |

One Canvas 2D renderer projects procedural 3D geometry per hero. This is a lightweight interpretation of the requested 3D art direction, **not a Three.js/WebGL shader implementation**. It does not include physically based holographic materials, bloom postprocessing, or a separate high-end GPU quality tier.

## Motion and scrolling

- Native scrolling and the existing smooth anchor behavior remain; keyboard, touch, history, and router restoration keep their native behavior.
- No Lenis or GSAP dependency was introduced. There is no competing smooth-scroll controller or pinned section.
- Scene orientation responds subtly to pointer input and scroll position. Fine-pointer interactions are disabled for coarse pointers and reduced motion.
- CSS handles headline masks, route entry fades, mobile drawer entrance, and supported browser scroll-linked card entrances. Scroll timelines fall back to visible static cards in other browsers.
- The progress line measures actual document height and refreshes through ResizeObserver, resize, and scroll events.
- Framer Motion remains available for existing interface interactions and respects the user's reduced-motion preference.

## Localization and accessibility

- Active locales are exactly English, Thai, Lao, Simplified Chinese, and Japanese. Japanese replaces Vietnamese in the routing and selector; Japanese home and profile catalogs were added.
- The selected locale remains in page navigation. Switching language keeps the current page.
- Added localized navigation, open-menu, and close-menu accessible names.
- Mobile navigation uses a native modal dialog: keyboard focus containment, Escape dismissal, close button, focus restoration, and scroll-lock cleanup.
- Route changes focus the main heading without forcing another scroll.
- Meaningful content remains server-rendered. Initial Framer Motion states no longer hide home content before JavaScript runs.
- Decorative scenes are hidden from assistive technology; CSS provides a fallback composition if Canvas is unavailable. Reduced motion renders a static scene and disables decorative CSS motion.
- Visible focus styles and accessible contact destinations remain.

**Translation limitation:** the original Thai, Lao, and Chinese profile copy retains existing English technical phrases and some English headings. Examples include Lao `Generic chatbot requests`, Chinese `Structured document review`, and terms such as `workflow`, `operator review`, and `Scorecards`. Message-key validation confirms catalog completeness, not linguistic completeness. A complete editorial localization pass on those inherited strings is still outstanding. No new business claims were invented to fill gaps.

## Performance measures implemented

- One animation loop per hero, canceled on unmount; no accumulated route scenes.
- Offscreen rendering pauses with IntersectionObserver; hidden browser tabs stop continuous rendering.
- Lower point count and a 1.5 device-pixel-ratio cap on small scenes; desktop ratio capped at 2.
- Fixed bounded procedural geometry, no external textures, no WebGL contexts, no added graphics dependencies.
- Resize observers, intersection observers, pointer handlers, media-query listeners, and visibility handlers are removed on cleanup.
- Scene backgrounds use restrained gradients rather than multiple large animated blur layers.

## Validation

- `npx tsc --noEmit`: passed.
- `npm run lint`: passed.
- `npm run build`: passed, including all 30 localized page combinations and framework assets.
- `node scripts/validate-site.cjs`: all 30 localized routes returned successful responses, the expected HTML language, one main heading, a hero scene, and the preserved mail contact action. All five message catalogs have matching keys and nonempty values.
- `git diff --check`: passed.
- Browser checks: desktop route navigation across all six pages; active navigation; English/Japanese switching on the same page; Japanese navigation preserving the locale; mobile drawer open, Escape dismissal, focus restoration, and scroll unlock; English home and Japanese home/contact at narrow widths; no horizontal document overflow in checked views.
- Browser computed styles confirmed loaded Inter body and Space Grotesk display fonts.
- No warnings or errors were present in the sampled browser console before the remaining route checks. This was a sample, not exhaustive instrumentation.
- The sandboxed build initially could not fetch Google Fonts. The network-enabled build succeeded. Builds require access to Google's font service unless assets are cached or replaced with local files.

There was no pre-existing automated test suite configured. The added smoke script is rerunnable against a running server; `SITE_URL` selects an alternate base URL.

## Changed files

- `src/app/globals.css`: shared palette, typography, navigation, hero, card, responsive, and motion styling.
- `src/app/[locale]/layout.tsx`: Inter/Japanese fonts and the shared experience wrapper.
- `src/components/intelligence-scene.tsx`: procedural scene renderer and resource lifecycle.
- `src/components/experience.tsx`: reduced-motion configuration, route fades, heading focus, and reading progress.
- `src/components/site-chrome.tsx`: active navigation, modal mobile drawer, localized accessible names, brand accent colors.
- `src/components/home-client.tsx`: coordinated hero scene, responsive flow, visible server-rendered content.
- `src/components/profile-page.tsx`: distinct route scenes, hero statistics, bento layout.
- `src/components/neural-flow.tsx`: matching green palette.
- `src/components/language-switcher.tsx`: Japanese option.
- `src/i18n/routing.ts`, `src/i18n/detect-locale.ts`: exact requested locale set and Japanese country detection.
- `src/lib/profile-pages.ts`, `src/lib/profile-pages-ja.ts`: Japanese content integration; retired Vietnamese profile mapping.
- `messages/en.json`, `messages/th.json`, `messages/lo.json`, `messages/zh.json`: navigation accessibility labels.
- `messages/ja.json`: Japanese catalog.
- `scripts/validate-site.cjs`: localized route and message-schema smoke checks.
- `redesign-preview.jpg`: desktop preview.

## Remaining validation and scope limits

Sustained frame rates, long-task traces, memory over long sessions, physical low-end devices, screen-reader sessions, and runtime reduced-motion emulation were not measured. Reduced-motion behavior was implemented and reviewed in code, but not exercised through a browser preference override. No 60 FPS, performance improvement percentage, or exhaustive accessibility conformance claim is made. Cross-browser testing and the inherited translation cleanup remain before treating every criterion in the original brief as fully satisfied.

Dependencies added or removed: **none**.
