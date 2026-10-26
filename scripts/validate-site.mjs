// Route and localization smoke check against a running development/production server.
const base = process.env.SITE_URL || "http://127.0.0.1:3000";
const locales = ["en", "th", "lo", "zh-CN", "vi"];
const routes = ["", "/company", "/technology", "/capabilities", "/case-studies", "/contact"];
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const directory = path.dirname(fileURLToPath(import.meta.url));
const messages = locale => JSON.parse(fs.readFileSync(path.join(directory, "..", "messages", `${locale}.json`), "utf8"));
function checkShape(reference, candidate, location) {
  if (typeof reference !== typeof candidate || candidate == null) throw new Error(`${location}: missing or invalid translation`);
  if (typeof reference === "string" && candidate.trim() === "") throw new Error(`${location}: empty translation`);
  if (typeof reference === "object") for (const key of Object.keys(reference)) checkShape(reference[key], candidate[key], `${location}.${key}`);
}

async function main() {
  let checked = 0;
  for (const locale of locales) checkShape(messages("en"), messages(locale), locale);
  console.log("All five message catalogs have matching keys and nonempty translations.");
  for (const locale of locales) {
    for (const route of routes) {
      const path = `${locale === "en" ? "" : `/${locale}`}${route}` || "/";
      const response = await fetch(`${base}${path}`, { headers: { "Accept-Language": locale } });
      const html = await response.text();
      if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
      if (!html.includes(`lang="${locale}"`)) throw new Error(`${path}: incorrect document language`);
      if ((html.match(/<h1\b/g) || []).length !== 1) throw new Error(`${path}: expected one main heading`);
      if (!html.includes('intelligence-scene')) throw new Error(`${path}: missing hero scene`);
      if (!html.includes('mailto:studio@nativelab.ai')) throw new Error(`${path}: missing contact action`);
      if (html.includes('MISSING_MESSAGE') || html.includes('NEXT_HTTP_ERROR_FALLBACK;500')) throw new Error(`${path}: rendering error`);
      checked++;
    }
    console.log(`${locale}: all six pages passed`);
  }
  console.log(`${checked} localized routes passed.`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
