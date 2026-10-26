// Deterministic on Node and browsers: ICU word dictionaries can disagree on Lao.
// Keep Thai/Lao runs intact; CJK units retain combining marks and all whitespace.
export function revealSegments(text: string): string[] {
  return Array.from(text.matchAll(/\s+|[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]\p{Mark}*|[^\s\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]+/gu), match => match[0]);
}
