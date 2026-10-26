import { IntelligenceScene, type SceneKind } from "@/components/intelligence-scene";

// Shared cover layers stay decorative; the section remains the pointer region.
export function HeroAtmosphere({ kind }: { kind: SceneKind }) {
  return <>
    <div className="hero-atmosphere" aria-hidden="true"><IntelligenceScene kind={kind} /></div>
    <div className="hero-readability" aria-hidden="true" />
  </>;
}
