"use client";

import { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { visualKeys } from "@/lib/visual-copy";
import { createHomeNeuralRenderer } from "@/components/home-neural-renderer";
import { createCompanyRenderer } from "@/components/company-renderer";
import { createSystemsRenderer } from "@/components/systems-renderer";
import { createCaseRenderer } from "@/components/case-renderer";
import { createAmbientNetworkRenderer } from "@/components/ambient-network-renderer";

export type SceneKind = "home" | "company" | "technology" | "capabilities" | "case-studies" | "contact";

// One lightweight perspective scene per hero. Geometry is shared; no WebGL
// contexts, textures, or external assets are needed for the fallback renderer.
export function IntelligenceScene({ kind = "home" }: { kind?: SceneKind }) {
  const locale = useLocale();
  const visual = useTranslations("Visual");
  const sceneCopy = Object.fromEntries(Object.values(visualKeys).map(key => [key, visual(key)]));
  const sceneCopyJson = JSON.stringify(sceneCopy);
  const canvas = useRef<HTMLCanvasElement>(null);
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = canvas.current;
    const container = host.current;
    if (!element || !container) return;
    const ctx = element.getContext("2d");
    if (!ctx) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia("(pointer: fine)");
    let width = 0, height = 0, frame = 0, visible = true, time = 0, last = 0;
    let pointerX = 0, pointerY = 0, rotationX = 0, rotationY = 0;
    let presence = 0, targetPresence = 0;
    const neural = kind === "home" || kind === "contact";
    const homeRenderer = kind === "home" ? createHomeNeuralRenderer(JSON.parse(sceneCopyJson), getComputedStyle(container).fontFamily) : kind === "company" ? createCompanyRenderer() : kind === "contact" || kind === "technology" ? createAmbientNetworkRenderer(kind) : kind === "case-studies" ? createCaseRenderer() : kind === "capabilities" ? createSystemsRenderer(kind) : null;
    const region = container.closest("section") ?? container;
    const copy = region.querySelector<HTMLElement>(".hero-copy, .profile-hero > .mx-auto > div:first-child");
    let mobile = false, centerX = 0, centerY = 0;
    const points = Array.from({ length: 160 }, (_, i) => {
      const y = 1 - (i / 159) * 2;
      const radius = Math.sqrt(1 - y * y);
      const angle = i * Math.PI * (3 - Math.sqrt(5));
      return { x: Math.cos(angle) * radius, y, z: Math.sin(angle) * radius };
    });
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const size = mobile ? Math.min(width * .35, 150) : kind === "capabilities" ? Math.min(width * .13, height * .26, 170) : Math.min(width * .19, height * .32, 270);
      const scroll = reduced.matches ? 0 : Math.min(1, Math.max(0, -container.getBoundingClientRect().top / innerHeight));
      if (homeRenderer) {
        homeRenderer.draw({ ctx, width, height, centerX, centerY, size, time, rotationX, rotationY, presence, scroll, mobile, reduced: reduced.matches });
        return;
      }
      const angle = time * .12 + rotationX + scroll * .2;
      const project = (x: number, y: number, z: number) => {
        const rx = x * Math.cos(angle) - z * Math.sin(angle);
        const rz = x * Math.sin(angle) + z * Math.cos(angle);
        const ry = y * Math.cos(rotationY + .2) - rz * Math.sin(rotationY + .2);
        const depth = 3.8 / (3.8 + rz);
        return { x: centerX + rx * size * depth, y: centerY + ry * size * depth, z: rz, depth };
      };
      const lightX = centerX + (neural ? rotationX * size * 2.4 : 0);
      const lightY = centerY + (neural ? rotationY * size * 3 : 0);
      const glow = ctx.createRadialGradient(lightX, lightY, 5, centerX, centerY, size * 2.5);
      glow.addColorStop(0, `rgba(118,185,0,${.13 + presence * .18})`); glow.addColorStop(.5, "#76b90012"); glow.addColorStop(1, "#76b90000");
      ctx.fillStyle = glow; ctx.fillRect(0, 0, width, height);
      // A bounded field joins the focal object to the entire hero atmosphere.
      // Draw it in this same canvas/loop rather than adding another renderer.
      const ambientCount = mobile ? 24 : 64;
      const ambient = Array.from({ length: ambientCount }, (_, i) => ({
        x: ((i * .61803398875 + .11) % 1) * width + Math.sin(time * .13 + i) * 8,
        y: height * (.12 + ((i * .381966 + .23) % 1) * .72) + Math.cos(time * .1 + i) * 9,
      }));
      ctx.lineWidth = .65;
      for (let i = 0; i < ambient.length; i++) {
        const p = ambient[i];
        const strength = mobile ? .17 : .13 + (p.x / width) * .16;
        ctx.fillStyle = `rgba(118,185,0,${strength + .12})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, i % 9 === 0 ? 1.7 : .8, 0, Math.PI * 2); ctx.fill();
        const q = ambient[(i + 8) % ambient.length];
        if (Math.hypot(p.x - q.x, p.y - q.y) < width * .24) {
          ctx.beginPath(); ctx.moveTo(p.x, p.y);
          if (kind === "company") ctx.lineTo(q.x, p.y);
          ctx.lineTo(q.x, q.y); ctx.strokeStyle = `rgba(118,185,0,${strength * .5})`; ctx.stroke();
        }
        if ((neural || kind === "case-studies") && i % 7 === 0) {
          const end = project(Math.cos(i) * .9, Math.sin(i) * .7, .1);
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(end.x, end.y);
          ctx.strokeStyle = "#76b90020"; ctx.stroke();
        }
      }
      if (kind === "company" || kind === "capabilities" || kind === "contact") {
        const tracks = mobile ? 3 : kind === "capabilities" ? 8 : 5;
        for (let i = 0; i < tracks; i++) {
          const startY = height * (.18 + i * .115);
          const endY = centerY + (i - tracks / 2) * 24;
          ctx.beginPath(); ctx.moveTo(-20, startY);
          if (kind === "company") {
            ctx.lineTo(width * .36, startY); ctx.lineTo(width * .44, endY); ctx.lineTo(centerX, endY);
          } else {
            ctx.bezierCurveTo(width * .35, startY + 80, width * .55, endY - 90, width + 20, endY);
          }
          ctx.strokeStyle = i % 2 ? "#76b90022" : "#76b90030"; ctx.stroke();
          ctx.setLineDash([3, 130]); ctx.lineDashOffset = -time * 18 - i * 35;
          ctx.strokeStyle = "#76b90066"; ctx.stroke(); ctx.setLineDash([]);
        }
      }
      const illumination = (x: number, y: number) => neural ? Math.max(0, 1 - Math.hypot(x - lightX, y - lightY) / (size * .95)) * presence : 0;
      if (kind === "home") {
        for (let band = 0; band < 17; band++) {
          const latitude = (band / 16 - .5) * Math.PI;
          ctx.beginPath();
          for (let i = 0; i <= 72; i++) {
            const a = i / 72 * Math.PI * 2;
            const r = .49 + Math.sin(a * 3 + time * .6 + latitude * 2) * .045;
            const p = project(Math.cos(a) * Math.cos(latitude) * r, Math.sin(latitude) * r, Math.sin(a) * Math.cos(latitude) * r);
            if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
          }
          ctx.strokeStyle = `rgba(118,185,0,${.25 + Math.cos(latitude) * .4 + presence * .2})`; ctx.lineWidth = .8; ctx.stroke();
        }
      }
      ctx.lineWidth = .75;
      if (kind === "capabilities" || kind === "contact") {
        for (let j = 0; j < (kind === "contact" ? 8 : 18); j++) {
          ctx.beginPath();
          for (let i = 0; i <= 80; i++) {
            const x = (i / 80 - .5) * 3.8;
            const y = Math.sin(x * 1.7 + time * .35 + j * .2) * .24 + (j - 8) * .085;
            const p = project(x, y, Math.cos(j * .5) * .5);
            if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
          }
          ctx.strokeStyle = `rgba(118,185,0,${j % 3 === 0 ? .42 : .13})`; ctx.stroke();
          const x = ((time * .26 + j * .23) % 3.8) - 1.9;
          const p = project(x, Math.sin(x * 1.7 + time * .35 + j * .2) * .24 + (j - 8) * .085, Math.cos(j * .5) * .5);
          ctx.fillStyle = "#76b900"; ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI * 2); ctx.fill();
        }
      }
      if (kind === "company") {
        for (let i = 0; i < 22; i++) {
          const direction = i * Math.PI * 2 / 22;
          const r = .3 + (i % 4) * .12;
          const start = project(Math.cos(direction) * r, Math.sin(direction) * r, 0);
          const mid = project(Math.cos(direction) * 1.1, Math.sin(direction) * r, 0);
          const end = project(Math.cos(direction) * 1.1, Math.sin(direction) * 1.1, 0);
          ctx.beginPath(); ctx.moveTo(start.x, start.y); ctx.lineTo(mid.x, mid.y); ctx.lineTo(end.x, end.y);
          ctx.strokeStyle = "#76b90066"; ctx.stroke();
          ctx.setLineDash([7, 60]); ctx.lineDashOffset = -time * 22 - i * 4; ctx.strokeStyle = "#76b900"; ctx.stroke(); ctx.setLineDash([]);
          ctx.strokeRect(end.x - 3, end.y - 3, 6, 6);
        }
      }
      if (kind !== "capabilities") {
        const galaxy = kind === "case-studies";
        const projected = points.slice(0, mobile ? 90 : 160).map((p, i) => {
          if (galaxy) {
            const a = (i % 3) * Math.PI * 2 / 3 + (i / 160) * 5 + time * .04;
            const r = Math.sqrt(i / 160) * 1.65;
            return project(Math.cos(a) * r, Math.sin(a) * r * .5, Math.sin(i * 3.1) * .18);
          }
          const morph = kind === "home" ? 1 + Math.sin(time * .5 + p.y * 4) * .055 : 1;
          const scale = kind === "contact" ? .62 : kind === "company" ? .55 : 1;
          return project(p.x * morph * scale, p.y * morph * scale, p.z * morph * scale);
        });
        for (let i = 0; i < projected.length; i++) {
          const p = projected[i];
          if (kind !== "technology") for (let j = i + 1; j < projected.length; j++) {
            const q = projected[j], d = Math.hypot(p.x - q.x, p.y - q.y);
            if (d < size * .29 && Math.abs(p.z - q.z) < .45) {
              ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
              const light = illumination((p.x + q.x) / 2, (p.y + q.y) / 2);
              ctx.strokeStyle = `rgba(${light > .3 ? "118,185,0" : "118,185,0"},${Math.min(.9, (1 - d / (size * .29)) * .55 + light * .4)})`; ctx.stroke();
              if (kind === "home" && i % 17 === 0) {
                const pulse = (time * (.24 + presence * .09) + i * .03) % 1;
                ctx.beginPath(); ctx.arc(p.x + (q.x - p.x) * pulse, p.y + (q.y - p.y) * pulse, 1.6, 0, Math.PI * 2);
                ctx.fillStyle = "#76b900"; ctx.fill();
              }
            }
          }
          const light = illumination(p.x, p.y);
          ctx.beginPath(); ctx.arc(p.x, p.y, (i % 13 === 0 ? 2.4 : 1 + light) * p.depth, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${light > .3 ? "118,185,0" : "118,185,0"},${Math.min(1, .3 + (1 - (p.z + 1) / 2) * .65 + light * .35)})`; ctx.fill();
        }
      }
      if (kind === "home" || kind === "technology") {
        for (let ring = 0; ring < (kind === "technology" ? 7 : 3); ring++) {
          ctx.beginPath();
          for (let i = 0; i <= 120; i++) {
            const a = i / 120 * Math.PI * 2, tilt = ring * .44 + time * .07;
            const r = kind === "technology" ? 1.02 + ring * .045 : .43 + ring * .07;
            const p = project(Math.cos(a) * r, Math.sin(a) * Math.cos(tilt) * r, Math.sin(a) * Math.sin(tilt) * r);
            if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
          }
          ctx.strokeStyle = ring % 2 ? "#76b90099" : "#76b90055"; ctx.stroke();
        }
      }
    };
    const tick = (now: number) => {
      frame = 0;
      if (!visible || document.hidden) return;
      time += last ? Math.min((now - last) / 1000, .05) : 0; last = now;
      rotationX += (pointerX - rotationX) * .035; rotationY += (pointerY - rotationY) * .035;
      presence += (targetPresence - presence) * .045;
      container.style.setProperty("--scene-light-x", `${50 + rotationX * 160}%`);
      container.style.setProperty("--scene-light-y", `${50 + rotationY * 220}%`);
      render();
      if (!reduced.matches) frame = requestAnimationFrame(tick);
    };
    const restart = () => { cancelAnimationFrame(frame); last = 0; frame = requestAnimationFrame(tick); };
    const resize = new ResizeObserver(() => {
      width = container.clientWidth; height = container.clientHeight;
      mobile = width < 768;
      centerX = width * (mobile ? .5 : kind === "capabilities" ? .81 : .76);
      const copyBottom = copy ? copy.getBoundingClientRect().bottom - container.getBoundingClientRect().top : height * .45;
      centerY = mobile ? Math.min(height - 140, copyBottom + 165) : kind === "capabilities" ? height * .52 : Math.min(height * .47, 380);
      const dpr = Math.min(devicePixelRatio || 1, mobile ? 1.5 : 2);
      element.width = Math.round(width * dpr); element.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); render();
    });
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; restart(); });
    const pointer = (e: PointerEvent) => {
      if (!fine.matches || reduced.matches || e.pointerType === "touch") return;
      const rect = region.getBoundingClientRect();
      pointerX = ((e.clientX - rect.left) / rect.width - .5) * .35;
      pointerY = ((e.clientY - rect.top) / rect.height - .5) * .22;
      targetPresence = neural ? 1 : 0;
    };
    const leave = () => { pointerX = 0; pointerY = 0; targetPresence = 0; };
    resize.observe(container); if (copy) resize.observe(copy); observer.observe(container);
    region.addEventListener("pointermove", pointer as EventListener, { passive: true }); region.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", restart); reduced.addEventListener("change", restart);
    restart();
    return () => {
      homeRenderer?.dispose();
      cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect();
      region.removeEventListener("pointermove", pointer as EventListener); region.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", restart); reduced.removeEventListener("change", restart);
    };
  }, [kind, locale, sceneCopyJson]);

  return <div ref={host} className={`intelligence-scene scene-${kind}`} aria-hidden="true">
    <div className="scene-fallback" />
    <canvas ref={canvas} />
  </div>;
}
