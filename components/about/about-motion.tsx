"use client";

import { useEffect, useRef, type ReactNode } from "react";

// The content is server rendered. This small boundary only observes entrances
// and updates the timeline's clipping mask while the section is on screen.
export function AboutMotion({ children, className }: { children: ReactNode; className: string }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 992px)");
    const timeline = root.querySelector<HTMLElement>("[data-timeline]");
    let frame = 0;
    let inView = false;
    const updateProgress = () => {
      frame = 0;
      if (!timeline || !inView || motionPreference.matches || !desktop.matches) return;
      const bounds = timeline.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (innerHeight * .9 - bounds.top) / (bounds.height + innerHeight * .1)));
      // Match the reference's seven unequal scroll segments.
      const durations = [2, 1, 1.5, 2, 1, 1.5, 2];
      let remaining = progress * 11;
      let reveal = 0;
      for (let i = 0; i < durations.length; i++) {
        const amount = Math.min(1, remaining / durations[i]);
        reveal += amount * (i === 6 ? 16 : 14);
        remaining -= durations[i];
        if (remaining <= 0) break;
      }
      timeline.style.setProperty("--timeline-reveal", `${Math.max(0, Math.min(100, reveal))}%`);
    };
    const scheduleProgress = () => { if (!frame && inView) frame = requestAnimationFrame(updateProgress); };
    const revealObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.revealed = "true";
          revealObserver.unobserve(entry.target);
        }
      }
    }, { rootMargin: "0px 0px -10% 0px" });
    const sectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      scheduleProgress();
    });
    const configure = () => {
      root.dataset.motion = motionPreference.matches ? "reduced" : "ready";
      scheduleProgress();
    };
    root.querySelectorAll<HTMLElement>("[data-about-reveal]").forEach(element => {
      // Keep already passed cards readable when opening a deep link.
      if (element.getBoundingClientRect().bottom < 0) element.dataset.revealed = "true";
      else revealObserver.observe(element);
    });
    configure();
    sectionObserver.observe(root);
    window.addEventListener("scroll", scheduleProgress, { passive: true });
    window.addEventListener("resize", scheduleProgress, { passive: true });
    motionPreference.addEventListener("change", configure);
    desktop.addEventListener("change", scheduleProgress);
    return () => {
      cancelAnimationFrame(frame);
      revealObserver.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener("scroll", scheduleProgress);
      window.removeEventListener("resize", scheduleProgress);
      motionPreference.removeEventListener("change", configure);
      desktop.removeEventListener("change", scheduleProgress);
      delete root.dataset.motion;
    };
  }, []);

  return <section id="about" aria-labelledby="about-heading" className={className} ref={rootRef}>{children}</section>;
}
