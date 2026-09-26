"use client";

import { useEffect } from "react";

type Pair = {
  source: HTMLElement;
  left: number;
  top: number;
  width: number;
  height: number;
  dx: number;
  dy: number;
  scaleX: number;
  scaleY: number;
  fontSize: number;
  targetFontSize: number;
  lineHeight: number;
  targetLineHeight: number;
  start: number;
  end: number;
};

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const smoothstep = (from: number, to: number, value: number) => {
  const progress = clamp((value - from) / (to - from));
  return progress * progress * (3 - 2 * progress);
};

const getTiming = (key: string) => {
  if (key === "logo") return { start: .02, end: .82 };
  if (key.startsWith("projects-") || key.startsWith("experience-")) return { start: .08, end: .82 };
  if (key === "description") return { start: .1, end: .82 };
  if (key.startsWith("cta-")) return { start: .1, end: .84 };
  if (key.startsWith("nav-")) {
    const index = Number(key.slice(4));
    return { start: .04 + index * .008, end: .6 + index * .005 };
  }
  return { start: .05, end: .9 };
};

export function SectionTransition() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("#hero");
    const stage = hero?.querySelector<HTMLElement>("[data-transition-stage]");
    const sidebar = document.querySelector<HTMLElement>("[data-transition-sidebar]");
    if (!hero || !stage || !sidebar) return;

    const desktop = window.matchMedia("(min-width: 992px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const heading = hero.querySelector<HTMLElement>("[data-transition-role='heading']");
    const portrait = hero.querySelector<HTMLElement>("[data-transition-role='portrait']");
    const peripheral = [...hero.querySelectorAll<HTMLElement>("[data-transition-role='peripheral']")];
    const separators = [...hero.querySelectorAll<HTMLElement>("[data-transition-role='separator']")];
    const secondaryButton = hero.querySelector<HTMLElement>("[data-transition-source='cta-secondary']");
    const mappedSources = [...hero.querySelectorAll<HTMLElement>("[data-transition-source]")];
    const statCards = [...hero.querySelectorAll<HTMLElement>("[data-transition-role='stat-card']")];
    const panels = [...sidebar.querySelectorAll<HTMLElement>("[data-transition-panel]")];

    let pairs: Pair[] = [];
    let targetProgress = 0;
    let currentProgress = 0;
    let animationFrame = 0;
    let resizeFrame = 0;
    let previousFrame = 0;
    let disposed = false;
    let prepared = false;

    const resetSource = (source: HTMLElement) => {
      source.style.removeProperty("transform");
      source.style.removeProperty("transform-origin");
      source.style.removeProperty("opacity");
      source.style.removeProperty("will-change");
      source.style.removeProperty("left");
      source.style.removeProperty("top");
      source.style.removeProperty("right");
      source.style.removeProperty("bottom");
      source.style.removeProperty("width");
      source.style.removeProperty("font-size");
      source.style.removeProperty("line-height");
      source.style.removeProperty("color");
      source.style.removeProperty("background-color");
    };

    const reset = () => {
      cancelAnimationFrame(animationFrame);
      cancelAnimationFrame(resizeFrame);
      animationFrame = 0;
      resizeFrame = 0;
      pairs.forEach(pair => resetSource(pair.source));
      mappedSources.forEach(resetSource);
      peripheral.forEach(resetSource);
      statCards.forEach(card => {
        card.style.removeProperty("background-color");
        card.style.removeProperty("backdrop-filter");
        card.style.removeProperty("-webkit-backdrop-filter");
      });
      separators.forEach(resetSource);
      heading?.removeAttribute("style");
      portrait?.removeAttribute("style");
      sidebar.removeAttribute("style");
      panels.forEach(panel => panel.style.removeProperty("--panel-reveal"));
      stage.style.removeProperty("pointer-events");
      pairs = [];
      targetProgress = 0;
      currentProgress = 0;
      previousFrame = 0;
    };

    const measure = () => {
      reset();
      if (!desktop.matches || reducedMotion.matches) {
        document.documentElement.dataset.scrollTransition = "off";
        return;
      }

      document.documentElement.dataset.scrollTransition = "ready";
      panels.forEach(panel => panel.style.setProperty("--panel-reveal", "1"));
      // Measure after the sidebar switches to its fixed final layout.
      resizeFrame = requestAnimationFrame(() => {
        resizeFrame = requestAnimationFrame(() => {
          pairs = mappedSources.flatMap(source => {
            const key = source.dataset.transitionSource;
            const targetKey = key === "cta-secondary" ? "cta-primary" : key;
            const target = targetKey
              ? sidebar.querySelector<HTMLElement>(`[data-transition-target="${targetKey}"]`)
              : null;
            if (!target) return [];
            const sourceRect = source.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();
            if (!sourceRect.width || !sourceRect.height) return [];
            const timing = getTiming(key ?? "");
            source.style.willChange = "transform, opacity";
            source.style.transformOrigin = "top left";
            if (key === "description") {
              const stageRect = stage.getBoundingClientRect();
              source.style.left = `${sourceRect.left - stageRect.left}px`;
              source.style.top = `${sourceRect.top - stageRect.top}px`;
              source.style.right = "auto";
              source.style.bottom = "auto";
            }
            return [{
              source,
              left: sourceRect.left,
              top: sourceRect.top,
              width: sourceRect.width,
              height: sourceRect.height,
              dx: targetRect.left - sourceRect.left,
              dy: targetRect.top - sourceRect.top,
              scaleX: targetRect.width / sourceRect.width,
              scaleY: targetRect.height / sourceRect.height,
              fontSize: parseFloat(getComputedStyle(source).fontSize),
              targetFontSize: parseFloat(getComputedStyle(target).fontSize),
              lineHeight: parseFloat(getComputedStyle(source).lineHeight),
              targetLineHeight: parseFloat(getComputedStyle(target).lineHeight),
              ...timing,
            }];
          });
          updateTarget();
          currentProgress = targetProgress;
          render(currentProgress);
        });
      });
    };

    const render = (progress: number) => {
      if (!desktop.matches || reducedMotion.matches) return;
      const sidebarReveal = smoothstep(.57, .8, progress);
      const contentHandoff = smoothstep(.9, 1, progress);
      const badgeReveal = smoothstep(.65, .82, progress);

      for (const pair of pairs) {
        if (pair.source === secondaryButton) continue;
        const key = pair.source.dataset.transitionSource;
        const travel = smoothstep(pair.start, pair.end, progress);
        const sourceFade = 1 - contentHandoff;
        const x = pair.dx * travel;
        const y = pair.dy * travel;
        const scaleX = 1 + (pair.scaleX - 1) * travel;
        const scaleY = 1 + (pair.scaleY - 1) * travel;
        if (key === "description") {
          pair.source.style.width = `${pair.width + (pair.width * pair.scaleX - pair.width) * travel}px`;
          pair.source.style.fontSize = `${pair.fontSize + (pair.targetFontSize - pair.fontSize) * travel}px`;
          pair.source.style.lineHeight = `${pair.lineHeight + (pair.targetLineHeight - pair.lineHeight) * travel}px`;
          pair.source.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          pair.source.style.opacity = String(sourceFade);
          continue;
        }
        pair.source.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scaleX}, ${scaleY})`;
        pair.source.style.opacity = String(sourceFade);
        if (key === "logo") {
          pair.source.style.color = `rgb(${Math.round(255 * (1 - badgeReveal))} ${Math.round(255 * (1 - badgeReveal))} ${Math.round(35 * (1 - badgeReveal))})`;
        }
        if (key === "projects-text" || key === "experience-text") {
          const cardHandoff = smoothstep(.25, .5, progress);
          const ink = Math.round(255 * (1 - cardHandoff));
          pair.source.style.color = `rgb(${ink} ${ink} ${ink})`;
        }
      }

      for (const card of statCards) {
        const dissolve = smoothstep(.05, .4, progress);
        card.style.backgroundColor = `rgb(194 184 172 / ${.3 * (1 - dissolve)})`;
        card.style.setProperty("backdrop-filter", `blur(${20 * (1 - dissolve)}px)`);
        card.style.setProperty("-webkit-backdrop-filter", `blur(${20 * (1 - dissolve)}px)`);
      }

      if (secondaryButton) {
        const secondary = pairs.find(pair => pair.source === secondaryButton);
        const primary = pairs.find(pair => pair.source.dataset.transitionSource === "cta-primary");
        if (secondary && primary) {
          const travel = smoothstep(primary.start, primary.end, progress);
          const merge = smoothstep(.08, .65, progress);
          const primaryLeft = primary.left + primary.dx * travel;
          const primaryTop = primary.top + primary.dy * travel;
          const primaryWidth = primary.width * (1 + (primary.scaleX - 1) * travel);
          const primaryHeight = primary.height * (1 + (primary.scaleY - 1) * travel);
          const left = secondary.left + (primaryLeft - secondary.left) * merge;
          const top = secondary.top + (primaryTop - secondary.top) * merge;
          const width = secondary.width + (primaryWidth - secondary.width) * merge;
          const height = secondary.height + (primaryHeight - secondary.height) * merge;
          secondaryButton.style.transform = `translate3d(${left - secondary.left}px, ${top - secondary.top}px, 0) scale(${width / secondary.width}, ${height / secondary.height})`;
          secondaryButton.style.opacity = String(1 - smoothstep(.58, .76, progress));
        }
      }
      if (heading) {
        const headingTravel = smoothstep(.04, .74, progress);
        const headingFade = smoothstep(.34, .78, progress);
        heading.style.transform = `translate3d(0, ${-innerHeight * .9 * headingTravel}px, 0)`;
        heading.style.opacity = String(1 - headingFade);
        heading.style.filter = `blur(${4 * headingFade}px)`;
      }
      if (portrait) {
        const portraitProgress = smoothstep(.04, .98, progress);
        portrait.style.opacity = String(1 - portraitProgress);
        portrait.style.filter = `blur(${90 * portraitProgress}px)`;
        portrait.style.transform = "scale(1)";
      }
      for (const element of peripheral) {
        const peripheralProgress = smoothstep(.1, .58, progress);
        element.style.transform = `translate3d(${-12 * peripheralProgress}vw, ${-2 * peripheralProgress}vh, 0) scale(${1 - .12 * peripheralProgress})`;
        element.style.opacity = String(1 - peripheralProgress);
      }
      for (const separator of separators) {
        const separatorProgress = smoothstep(.04, .28, progress);
        separator.style.opacity = String(1 - separatorProgress);
        separator.style.transform = `scaleY(${1 - separatorProgress})`;
      }

      sidebar.style.setProperty("--sidebar-reveal", String(sidebarReveal));
      sidebar.style.setProperty("--target-content-reveal", String(contentHandoff));
      sidebar.style.setProperty("--logo-badge-reveal", String(badgeReveal));
      sidebar.style.pointerEvents = progress > .98 ? "auto" : "none";
      const panelTimings = [
        [.62, .84],
        [.64, .85],
        [.66, .86],
        [.82, .96],
        [.82, .96],
        [.76, .9],
      ];
      panels.forEach((panel, index) => {
        const [start, end] = panelTimings[index] ?? [.58, .7];
        const panelReveal = smoothstep(start, end, progress);
        panel.style.setProperty("--panel-reveal", String(panelReveal));
      });
      stage.style.pointerEvents = progress > .98 ? "none" : "auto";
    };

    const animate = (timestamp: number) => {
      const difference = targetProgress - currentProgress;
      const elapsed = previousFrame ? Math.min(64, timestamp - previousFrame) : 16.67;
      previousFrame = timestamp;
      currentProgress += difference * (1 - Math.exp(-elapsed / 120));
      if (Math.abs(difference) < .0004) currentProgress = targetProgress;
      render(currentProgress);
      if (currentProgress === targetProgress) {
        animationFrame = 0;
        previousFrame = 0;
      } else {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const updateTarget = () => {
      if (!desktop.matches || reducedMotion.matches) return;
      const bounds = hero.getBoundingClientRect();
      const distance = Math.max(1, bounds.height - innerHeight);
      targetProgress = clamp(-bounds.top / distance);
      if (!animationFrame) animationFrame = requestAnimationFrame(animate);
    };

    const scheduleMeasure = () => {
      cancelAnimationFrame(resizeFrame);
      if (prepared) resizeFrame = requestAnimationFrame(measure);
    };

    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    const prepare = () => {
      if (disposed || prepared) return;
      prepared = true;
      hero.dataset.introComplete = "true";
      measure();
    };
    const requestPrepare = () => void fontsReady.then(prepare);
    const handleScroll = () => {
      if (!prepared && Math.abs(hero.getBoundingClientRect().top) > 2) requestPrepare();
      updateTarget();
    };

    void fontsReady.then(async () => {
      if (disposed) return;

      // Geometry must be captured after the intro settles so temporary
      // entrance transforms do not affect the scroll destination.
      const entranceAnimations = hero.getAnimations({ subtree: true });
      await Promise.allSettled(entranceAnimations.map(animation => animation.finished));
      prepare();
    });
    if (reducedMotion.matches) requestPrepare();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", scheduleMeasure, { passive: true });
    desktop.addEventListener("change", measure);
    reducedMotion.addEventListener("change", measure);
    return () => {
      disposed = true;
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", scheduleMeasure);
      desktop.removeEventListener("change", measure);
      reducedMotion.removeEventListener("change", measure);
      reset();
      delete hero.dataset.introComplete;
      delete document.documentElement.dataset.scrollTransition;
    };
  }, []);

  return null;
}
