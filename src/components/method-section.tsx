import { ChartNoAxesCombined, Layers3, Rocket, ShieldCheck } from "lucide-react";
import type { HomeCopy } from "@/lib/site-copy";
import { revealSegments } from "@/lib/reveal-segments";

const icons = [ChartNoAxesCombined, Layers3, ShieldCheck, Rocket];
function AccentTitle({ text }: { text: string }) {
  const prefixes: Record<string, string> = {
    "From signal to production": "From signal ",
    "Map the workflow": "Map the ",
    "Build the system core": "Build the ",
    "Evaluate hard cases": "Evaluate ",
    "Deploy with governance": "Deploy with ",
  };
  const segments = revealSegments(text);
  const start = prefixes[text] ?? segments.slice(0, Math.ceil(segments.length / 2)).join("");
  return <>{start}<span>{text.slice(start.length)}</span></>;
}

function EnergyFlow() {
  return <svg className="method-energy" viewBox="0 0 1600 700" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <linearGradient id="method-signal" x1="0" y1="1" x2="1" y2="0"><stop stopColor="#76b900" stopOpacity=".05" /><stop offset=".45" stopColor="#76b900" /><stop offset="1" stopColor="#76b900" stopOpacity=".5" /></linearGradient>
      <radialGradient id="method-light"><stop stopColor="#76b900" stopOpacity=".25" /><stop offset="1" stopColor="#76b900" stopOpacity="0" /></radialGradient>
    </defs>
    <ellipse cx="1280" cy="290" rx="650" ry="380" fill="url(#method-light)" />
    {Array.from({ length: 7 }, (_, index) => { const i = index * 2; return <path key={`bridge-${i}`} d={`M -100 ${470 + i} C 80 ${300 + i * 2}, 160 ${440 - i}, 287 ${370 + i} S 480 ${440 - i * 2},592 ${400 + i} S 790 ${430 + i},905 ${372 + i} S 1090 ${410 - i},1218 ${362 + i} S 1500 ${240 + i * 2},1700 ${300 + i}`} fill="none" stroke="url(#method-signal)" strokeWidth={i === 4 ? 2 : .7} opacity={i === 4 ? .95 : .22} />; })}
    {Array.from({ length: 24 }, (_, index) => { const i = index * 2; return <path key={i} d={`M -100 ${520 + i * 4} C 120 ${185 + i * 5}, 180 ${435 - i * 2}, 365 ${340 + i * 2} S 580 ${420 + i * 3}, 760 ${350 + i} S 930 ${365 - i * 3}, 1120 ${265 - i * 2} S 1370 ${75 + i * 5}, 1700 ${150 + i * 4}`} fill="none" stroke="url(#method-signal)" strokeWidth={i === 16 ? 2 : .75} opacity={i === 16 ? .95 : .18 + (i % 5) * .03} />; })}
    <path d="M -100 550 C 120 275, 180 400, 365 360 S 580 470, 760 365 S 930 320, 1120 235 S 1370 150, 1700 210" fill="none" stroke="#76b900" strokeWidth="2" />
    {Array.from({ length: 36 }, (_, i) => <circle key={i} cx={(i * 137.3) % 1600} cy={140 + (i * 71.9) % 490} r={i % 11 === 0 ? 2.5 : 1} fill="#76b900" opacity={.15 + (i % 5) * .12} />)}
  </svg>;
}

export function MethodSection({ process }: { process: HomeCopy["process"] }) {
  return <section id="method" className="method-section border-b border-border">
    <EnergyFlow />
    <div className="method-content mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
      <div className="method-heading">
        <p className="overline text-primary">{process.kicker}</p>
        <h2><AccentTitle text={process.title} /></h2>
        <p className="method-intro">{process.body}</p>
      </div>
      <ol className="method-steps">
        {process.items.map((step, index) => {
          const Icon = icons[index % icons.length];
          return <li key={step.step} id={`method-step-${step.step}`} className="method-step">
            <div className="method-node" aria-hidden="true"><span>{step.step}</span></div>
            <article className="method-card rounded-md">
              <div className="method-icon"><Icon size={24} aria-hidden="true" /></div>
              <h3><AccentTitle text={step.title} /></h3>
              <p>{step.description}</p>
              <div className="method-card-bottom">
                <span className="method-index" aria-hidden="true">{step.step} / {String(process.items.length).padStart(2, "0")}</span>
                <span className="method-meter" aria-hidden="true"><span style={{ width: `${(index + 1) / process.items.length * 100}%` }} /></span>
              </div>
            </article>
          </li>;
        })}
      </ol>
    </div>
  </section>;
}
