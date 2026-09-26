"use client";

import { useEffect, useRef, type ReactNode } from "react";

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const smoothstep = (from: number, to: number, value: number) => {
  const progress = clamp((value - from) / (to - from));
  return progress * progress * (3 - 2 * progress);
};

export function WhatYouGetMotion({ children, className }: { children: ReactNode; className: string }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const heading = root?.querySelector<HTMLElement>("[data-what-heading]");
    const overview = root?.querySelector<HTMLElement>("[data-what-overview]");
    const stage = root?.querySelector<HTMLElement>("[data-what-stage]");
    if (!root || !heading || !overview || !stage) return;

    const words = [...root.querySelectorAll<HTMLElement>("[data-reveal-word]")];
    const chips = [...root.querySelectorAll<HTMLElement>("[data-what-chip]")];
    const navLink = document.querySelector<HTMLElement>('[aria-label="Section navigation"] a[href="#what-you-get"]');
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      const bounds = root.getBoundingClientRect();
      const threshold = innerHeight * .55;
      if (bounds.top <= threshold && bounds.bottom > threshold) navLink?.setAttribute("aria-current", "location");
      else navLink?.removeAttribute("aria-current");

      if (reducedMotion.matches) {
        heading.style.removeProperty("transform");
        heading.style.removeProperty("opacity");
        overview.style.removeProperty("transform");
        overview.style.removeProperty("opacity");
        words.forEach(word => { word.style.removeProperty("opacity"); word.style.removeProperty("transform"); });
        chips.forEach(chip => {
          chip.style.removeProperty("opacity");
          chip.style.removeProperty("transform");
          chip.style.removeProperty("pointer-events");
        });
        return;
      }

      const progress = clamp(-bounds.top / Math.max(1, bounds.height - stage.offsetHeight));
      const headingEnter = smoothstep(0, .34, progress);
      const headingExit = smoothstep(.43, .85, progress);
      const overviewEnter = smoothstep(.15, .43, progress);
      const wordProgress = clamp((progress - .25) / .72);
      const compact = innerWidth <= 600;

      heading.style.transform = compact
        ? `translate3d(0, ${(1 - headingEnter) * 1.25}rem, 0)`
        : `translate3d(0, ${(1 - headingEnter) * 24 - headingExit * 63}vh, 0) scale(${1.06 - headingExit * .2})`;
      heading.style.opacity = compact ? "1" : String(1 - smoothstep(.65, .9, progress));
      overview.style.transform = compact
        ? `translate3d(0, ${(1 - overviewEnter) * 1.5}rem, 0)`
        : `translate3d(0, ${(1 - overviewEnter) * 30 + (1 - headingExit) * 20}vh, 0)`;
      overview.style.opacity = String(overviewEnter);

      words.forEach((word, index) => {
        const start = index / Math.max(1, words.length - 1) * .7;
        const reveal = smoothstep(start, start + .3, wordProgress);
        word.style.opacity = String(.12 + .88 * reveal);
        word.style.transform = `translate3d(0, ${(1 - reveal) * .25}em, 0)`;
      });
      chips.forEach((chip, index) => {
        const starts = [.08, .34, .58, .72];
        const reveal = smoothstep(starts[index] ?? .72, (starts[index] ?? .72) + .28, wordProgress);
        chip.style.opacity = String(reveal);
        chip.style.transform = `translate3d(0, ${(1 - reveal) * .28}em, 0) scale(${.78 + .22 * reveal})`;
        chip.style.pointerEvents = reveal > .9 ? "auto" : "none";
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };

    update();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule, { passive: true });
    reducedMotion.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
      heading.style.removeProperty("transform");
      heading.style.removeProperty("opacity");
      overview.style.removeProperty("transform");
      overview.style.removeProperty("opacity");
      words.forEach(word => { word.style.removeProperty("opacity"); word.style.removeProperty("transform"); });
      chips.forEach(chip => {
        chip.style.removeProperty("opacity");
        chip.style.removeProperty("transform");
        chip.style.removeProperty("pointer-events");
      });
      navLink?.removeAttribute("aria-current");
    };
  }, []);

  return <section id="what-you-get" aria-labelledby="what-you-get-heading" className={className} ref={rootRef}>{children}</section>;
}
