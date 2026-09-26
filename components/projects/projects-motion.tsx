"use client";

import { useEffect, useRef, type ReactNode } from "react";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function ProjectsMotion({ children, className }: { children: ReactNode; className: string }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const scene = root?.querySelector<HTMLElement>("[data-projects-scene]");
    const track = root?.querySelector<HTMLElement>("[data-projects-track]");
    if (!root || !scene || !track) return;

    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const aboutLink = document.querySelector<HTMLElement>('[aria-label="Section navigation"] a[href="#about"]');
    const projectsLink = document.querySelector<HTMLElement>('[aria-label="Section navigation"] a[href="#projects"]');
    let travel = 0;
    let target = 0;
    let current = 0;
    let frame = 0;
    let lastFrame = 0;
    let resizeFrame = 0;
    let currentSection: "about" | "projects" | "after" | undefined;

    const setSection = (section: "about" | "projects" | "after") => {
      if (section === currentSection) return;
      currentSection = section;
      document.documentElement.dataset.projectsDark = section === "projects" ? "true" : "false";
      if (section === "about") aboutLink?.setAttribute("aria-current", "location");
      else aboutLink?.removeAttribute("aria-current");
      if (section === "projects") projectsLink?.setAttribute("aria-current", "location");
      else projectsLink?.removeAttribute("aria-current");
    };

    const paint = (timestamp: number) => {
      frame = 0;
      const elapsed = lastFrame ? Math.min(64, timestamp - lastFrame) : 16;
      lastFrame = timestamp;
      current += (target - current) * (1 - Math.exp(-elapsed / 95));
      if (Math.abs(target - current) < .4) current = target;
      track.style.transform = `translate3d(${-current}px, 0, 0)`;
      if (current !== target) frame = requestAnimationFrame(paint);
      else lastFrame = 0;
    };

    const update = () => {
      const rootBounds = root.getBoundingClientRect();
      const threshold = innerHeight * .55;
      setSection(rootBounds.top > threshold ? "about" : rootBounds.bottom > threshold ? "projects" : "after");
      if (reducedMotion.matches) return;
      const bounds = scene.getBoundingClientRect();
      const distance = Math.max(1, scene.offsetHeight - innerHeight);
      target = clamp(-bounds.top / distance) * travel;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const measure = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        const animate = !reducedMotion.matches;
        root.dataset.projectsMotion = animate ? "ready" : "off";
        track.style.removeProperty("transform");
        travel = animate ? Math.max(0, track.scrollWidth - innerWidth) : 0;
        scene.style.setProperty("--project-travel", `${travel}px`);
        current = target = 0;
        update();
      });
    };

    const onScroll = () => update();
    const onResize = () => measure();
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(track);
    measure();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onResize, { passive: true });
    reducedMotion.addEventListener("change", onResize);
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(resizeFrame);
      resizeObserver.disconnect();
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onResize);
      reducedMotion.removeEventListener("change", onResize);
      delete document.documentElement.dataset.projectsDark;
      delete root.dataset.projectsMotion;
      projectsLink?.removeAttribute("aria-current");
      aboutLink?.setAttribute("aria-current", "location");
    };
  }, []);

  return <section id="projects" aria-labelledby="projects-heading" className={className} ref={rootRef}>{children}</section>;
}
