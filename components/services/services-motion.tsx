"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function ServicesMotion({ children, className }: { children: ReactNode; className: string }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const navLink = document.querySelector<HTMLElement>('[aria-label="Section navigation"] a[href="#services"]');
    const elements = [...root.querySelectorAll<HTMLElement>("[data-services-reveal]")];
    const cards = [...root.querySelectorAll<HTMLElement>("[data-service-card]")];
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
    }, { threshold: .1, rootMargin: "0px 0px -5% 0px" });

    if (!reducedMotion.matches) {
      root.dataset.motion = "ready";
      elements.forEach(element => observer.observe(element));
    }
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || reducedMotion.matches) return;
      const card = event.currentTarget as HTMLElement;
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      card.style.setProperty("--tilt-x", `${(0.5 - y) * 5}deg`);
      card.style.setProperty("--tilt-y", `${(x - 0.5) * 5}deg`);
      card.style.setProperty("--spot-x", `${x * 100}%`);
      card.style.setProperty("--spot-y", `${y * 100}%`);
    };
    const onLeave = (event: PointerEvent) => {
      const card = event.currentTarget as HTMLElement;
      card.style.removeProperty("--tilt-x");
      card.style.removeProperty("--tilt-y");
    };
    cards.forEach(card => {
      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);
    });
    updateNav();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      cards.forEach(card => {
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerleave", onLeave);
      });
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      navLink?.removeAttribute("aria-current");
    };
  }, []);

  return <section id="services" aria-labelledby="services-heading" className={className} ref={rootRef}>{children}</section>;
}
