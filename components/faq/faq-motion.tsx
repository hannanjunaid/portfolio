"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function FaqMotion({ children, className }: { children: ReactNode; className: string }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const navLink = document.querySelector<HTMLElement>('[aria-label="Section navigation"] a[href="#faq"]');
    if (!root) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const bounds = root.getBoundingClientRect();
      const threshold = innerHeight * .55;
      if (bounds.top <= threshold && bounds.bottom > threshold) navLink?.setAttribute("aria-current", "location");
      else navLink?.removeAttribute("aria-current");
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      navLink?.removeAttribute("aria-current");
    };
  }, []);

  return <section id="faq" aria-labelledby="faq-heading" className={className} ref={rootRef}>{children}</section>;
}
