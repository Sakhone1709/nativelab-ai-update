# Hero integration and brighter cards — v1.3

Implemented on Home, Company, Technology, Capabilities, Projects/Case Studies, and Contact. The development application remains available at http://localhost:3000/.

## Changes

- Added a shared full-cover hero atmosphere and separate readability overlay. Existing text, CTA links, gradients, and scene identities remain.
- Reused the existing Canvas renderer. Its focal geometry is positioned predominantly on the right, while bounded ambient particles, connections, circuits, and data paths extend across the cover in the same render loop.
- Removed hero corner brackets, coordinate labels, column-sized canvas wrappers, and outlined fallback shapes. Canvas edges fade into the hero rather than forming a presentation box.
- Decorative layers use `pointer-events: none`. Pointer response listens on the containing hero section, leaving links and navigation usable.
- Mobile focal placement follows the measured bottom of the text block; reserved layout space keeps the scene away from CTAs and statistics. Resize observers account for copy/font-size changes. Mobile point counts and resolution caps remain adaptive.
- Cards now brighten from approximately rgba(13,30,20,.92) to rgba(33,65,29,.96), with an electric-green border, stronger glow, brighter icons, and subtle elevation. A contained spotlight follows the pointer through transform updates rather than moving the gradient center every frame.
- Linked contact cards share the bright state on keyboard focus, with a visible outline. Static informational cards do not receive unnecessary keyboard stops. Touch pressed states and reduced-motion alternatives remain.
- Desktop hero headings remain **64px**. Fonts, translations, palette, navigation, routes, transitions, and scrolling architecture were not changed by this patch.

## Files modified

- `src/components/hero-atmosphere.tsx` — new shared decorative cover layers.
- `src/components/intelligence-scene.tsx` — full-cover projection, atmospheric extensions, responsive focal placement, section-level pointer region; removed presentation framing.
- `src/components/home-client.tsx` — integrated cover and mobile visual-space reservation.
- `src/components/profile-page.tsx` — integrated cover across the five profile routes.
- `src/components/site-chrome.tsx` — shared card styling on existing contact links.
- `src/components/experience.tsx` — existing delegated spotlight tracking includes linked contact cards.
- `src/app/globals.css` — removed framing styles; added cover layering, mobile placement, and brighter card/focus/pressed states.

No dependencies or configuration files were changed. Earlier unrelated workspace modifications were preserved.

## Verified

- `npx tsc --noEmit`: passed.
- `npm run lint`: passed.
- `npm run build`: passed; generated all localized routes.
- `node scripts/validate-site.mjs`: all 30 localized routes and five message catalogs passed.
- `git diff --check`: passed.
- Browser desktop checks on all six pages: retained 64px headings, one Canvas per hero, full-width/full-height atmosphere matching the hero, zero corner-marker elements, pointer-transparent decorative layers, and no horizontal overflow.
- Settled desktop compositions visually inspected for Home, Company, Technology, Projects, and Contact; Capabilities inspected in its settled mobile composition as well as desktop layout checks.
- Company → Capabilities, Technology → Case Studies, and Case Studies → Contact hero CTA navigation tested successfully. Contact mail destination was inspected without launching email.
- Real mouse coordinate interaction on a noninteractive feature card produced `:hover`, brighter computed background, rgba(163,255,95,.8) border, electric-green icon, spotlight opacity 1, and `translateY(-4px) scale(1.005)`.
- Keyboard Tab moved focus from the email card to the phone card without activating either. The phone card showed `:focus-visible`, brightened surface, green border, and solid outline.
- Mobile 390×844 checks: English Contact and Capabilities, plus Thai Home. Confirmed no horizontal overflow, 32px mobile hero headings, no visual framing, readable copy, and preserved navigation/locale switching. Mobile drawer navigation cleared body scroll lock.
- Sampled browser console contained no warning/error entries during the settled Home check.

## Saved comparisons

- `hero-v13-before.jpg` — framed desktop baseline.
- `hero-v13-after.jpg` — integrated desktop hero.
- `hero-v13-mobile.jpg` — Thai mobile hero.
- `card-v13-normal.jpg` and `card-v13-hover.jpg` — normal/hover card comparison.

## Limits

Physical touch devices, sustained frame rate, memory over long sessions, and runtime reduced-motion preference emulation were not tested. Existing offscreen/hidden-tab suspension, reduced-motion rendering, touch-event guards, and cleanup remain implemented. The renderer remains the existing Canvas-based 3D projection; this patch does not introduce WebGL or alter inherited translations.
