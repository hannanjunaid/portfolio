"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function FooterMotion({ children, className }: { children: ReactNode; className: string }) {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const root = document.documentElement;
    const sidebar = document.querySelector<HTMLElement>("[data-transition-sidebar]");
    if (!footer || !sidebar) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      const top = footer.getBoundingClientRect().top;
      const viewport = window.innerHeight;
      const raw = Math.max(0, Math.min(1, (viewport * .88 - top) / (viewport * .58)));
      const progress = reducedMotion.matches ? Number(raw > 0) : raw * raw * (3 - 2 * raw);
      root.style.setProperty("--footer-sidebar-shift", `${(-115 * progress).toFixed(2)}%`);
      root.style.setProperty("--footer-sidebar-opacity", String(1 - progress));
      root.style.setProperty("--footer-sidebar-blur", `${(8 * progress).toFixed(2)}px`);
      root.dataset.footerSidebarHidden = progress > .98 ? "true" : "false";
      sidebar.inert = progress > .98;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener("change", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
      root.style.removeProperty("--footer-sidebar-shift");
      root.style.removeProperty("--footer-sidebar-opacity");
      root.style.removeProperty("--footer-sidebar-blur");
      delete root.dataset.footerSidebarHidden;
      sidebar.inert = false;
    };
  }, []);

  return <footer ref={footerRef} id="footer" className={className} aria-label="Contact and site links">{children}</footer>;
}
