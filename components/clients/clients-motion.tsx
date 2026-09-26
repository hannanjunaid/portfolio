"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function ClientsMotion({ children, className }: { children: ReactNode; className: string }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const navLink = document.querySelector<HTMLElement>('[aria-label="Section navigation"] a[href="#clients"]');
    const elements = [...root.querySelectorAll<HTMLElement>("[data-clients-reveal]")];
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const updateNav = () => {
      frame = 0;
      const bounds = root.getBoundingClientRect();
      const threshold = innerHeight * .55;
      if (bounds.top <= threshold && bounds.bottom > threshold) navLink?.setAttribute("aria-current", "location");
      else navLink?.removeAttribute("aria-current");
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(updateNav); };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.revealed = "";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .08, rootMargin: "0px 0px -5% 0px" });

    if (!reducedMotion.matches) {
      root.dataset.motion = "ready";
      elements.forEach(element => observer.observe(element));
    }
    updateNav();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      navLink?.removeAttribute("aria-current");
    };
  }, []);

  return <section id="clients" aria-labelledby="clients-heading" className={className} ref={rootRef}>{children}</section>;
}
