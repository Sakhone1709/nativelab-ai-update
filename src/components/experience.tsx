"use client";

import { MotionConfig } from "framer-motion";
import { useEffect, useRef } from "react";
import { usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { FloatingChat } from "@/components/floating-chat";

export function Experience({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const locale = useLocale();
  const progress = useRef<HTMLDivElement>(null);
  const previous = useRef(pathname);
  useEffect(() => {
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const move = (event: PointerEvent) => {
      if (!fine.matches || reduced.matches || event.pointerType === "touch") return;
      const card = (event.target as Element).closest<HTMLElement>("article.rounded-md, a.ai-card");
      if (!card || card.classList.contains("method-card")) return;
      const x = event.clientX, y = event.clientY;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--card-x", `${x - rect.left}px`);
        card.style.setProperty("--card-y", `${y - rect.top}px`);
      });
    };
    document.addEventListener("pointermove", move, { passive: true });
    return () => { cancelAnimationFrame(frame); document.removeEventListener("pointermove", move); };
  }, []);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const total = document.documentElement.scrollHeight - innerHeight;
        if (progress.current) progress.current.style.transform = `scaleX(${total > 0 ? Math.min(1, Math.max(0, scrollY / total)) : 0})`;
      });
    };
    const observer = new ResizeObserver(update);
    observer.observe(document.body);
    addEventListener("scroll", update, { passive: true }); addEventListener("resize", update);
    update();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); removeEventListener("scroll", update); removeEventListener("resize", update); };
  }, []);
  useEffect(() => {
    if (previous.current !== pathname) {
      const heading = document.querySelector("h1");
      heading?.setAttribute("tabindex", "-1");
      (heading as HTMLElement | null)?.focus({ preventScroll: true });
      previous.current = pathname;
    }
  }, [pathname]);
  return <MotionConfig reducedMotion="user"><div ref={progress} className="reading-progress" aria-hidden="true" /><div key={`${locale}:${pathname}`} className="page-enter">{children}</div><FloatingChat key={locale}/></MotionConfig>;
}
