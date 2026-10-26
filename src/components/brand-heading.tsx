import { revealSegments } from "@/lib/reveal-segments";

// Preserve translated text and use identical boundaries on server and client.
export function BrandHeading({ text }: { text: string }) {
  let parts: string[];
  if (text === "Private AI systems that work after the demo.") {
    parts = ["Private AI systems ", "that work after ", "the demo."];
  } else if (text === "A high-tech AI systems company built around production reality.") {
    parts = ["A high-tech AI ", "systems company ", "built around production reality."];
  } else if (text === "AI systems for knowledge, automation, evaluation, and multimodal work.") {
    parts = ["AI systems for ", "knowledge,\nautomation, evaluation, ", "and multimodal work."];
  } else if (text === "A private AI architecture for governed enterprise workflows.") {
    parts = ["A private AI architecture for ", "governed enterprise ", "workflows."];
  } else if (text === "Representative AI system engagements for real company workflows.") {
    parts = ["Representative AI system ", "engagements for real ", "company workflows."];
  } else if (text === "Start with the workflow, data boundary, and decision you want to improve.") {
    parts = ["Start with the workflow, ", "data boundary, and decision ", "you want to improve."];
  } else {
    const words = revealSegments(text);
    const first = Math.ceil(words.length / 3);
    const second = Math.ceil(words.length * 2 / 3);
    parts = [words.slice(0, first).join(""), words.slice(first, second).join(""), words.slice(second).join("")];
  }
  return <>{parts.map((part, index) => <span className={`heading-tone-${index}`} key={index}>{part}</span>)}</>;
}
