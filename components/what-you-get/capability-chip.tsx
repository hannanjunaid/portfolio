"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import styles from "./what-you-get.module.css";

const capabilities = {
  development: {
    title: "Webflow Development",
    description: "Fast, flexible Webflow pages with a clean CMS your team can manage.",
  },
  seo: {
    title: "SEO-Ready Setup",
    description: "Optimized site structure, speed, and on-page SEO to help your website rank higher and stay visible.",
  },
  performance: {
    title: "Built for Performance",
    description: "Thoughtful structure and fast-loading pages that feel responsive on every screen.",
  },
  interaction: {
    title: "Thoughtful Interactions",
    description: "Purposeful motion and details that make each visit feel effortless.",
  },
} as const;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function DummyIcon({ kind }: { kind: keyof typeof capabilities }) {
  return <svg className={styles.chipIcon} viewBox="0 0 56 40" fill="currentColor" aria-hidden="true">
    {kind === "development" && <path d="M3 8h13l4 12 5-12h12l4 12 5-12h9L42 35H30l-5-13-5 13H9L3 8Z" />}
    {kind === "seo" && <><rect x="3" y="25" width="15" height="10" rx="2" /><rect x="20" y="17" width="15" height="18" rx="2" /><rect x="37" y="5" width="15" height="30" rx="2" /></>}
    {kind === "performance" && <><path d="M28 2 34 10 44 8 43 18 53 24 44 30 43 39 33 36 28 40 22 34 13 37 13 28 3 23 13 17 12 8 22 10Z" /><circle cx="28" cy="21" r="8" fill="#e8e5d6" /></>}
    {kind === "interaction" && <><path d="M4 22c9-14 15-14 24 0s15 14 24 0v11c-9 10-15 10-24-2S13 19 4 33Z" /><circle cx="28" cy="8" r="5" /></>}
  </svg>;
}

export function CapabilityChip({ kind, index }: { kind: keyof typeof capabilities; index: number }) {
  const chipRef = useRef<HTMLSpanElement>(null);
  const pointerType = useRef("");
  const [open, setOpen] = useState(false);
  const [geometry, setGeometry] = useState({ x: 0, y: 0, width: 320, height: 256 });
  const capability = capabilities[kind];

  const expand = () => {
    if (open || !chipRef.current) return;
    const bounds = chipRef.current.getBoundingClientRect();
    const width = Math.min(320, innerWidth - 32);
    const height = Math.min(256, innerHeight - 32);
    const left = clamp(bounds.left + bounds.width / 2 - width / 2, 16, innerWidth - width - 16);
    const top = bounds.top + height <= innerHeight - 16 ? bounds.top : bounds.bottom - height;
    setGeometry({ x: left - bounds.left, y: clamp(top, 16, innerHeight - height - 16) - bounds.top, width, height });
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") close(); };
    addEventListener("scroll", close, { passive: true });
    addEventListener("resize", close, { passive: true });
    addEventListener("keydown", onKeyDown);
    return () => {
      removeEventListener("scroll", close);
      removeEventListener("resize", close);
      removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const onEnter = (event: PointerEvent<HTMLButtonElement>) => { if (event.pointerType === "mouse") expand(); };
  const onLeave = (event: PointerEvent<HTMLButtonElement>) => { if (event.pointerType === "mouse") setOpen(false); };
  const onFocus = () => { if (pointerType.current !== "touch") expand(); };
  const buttonStyle = {
    "--expand-x": `${geometry.x}px`,
    "--expand-y": `${geometry.y}px`,
    "--expand-width": `${geometry.width}px`,
    "--expand-height": `${geometry.height}px`,
  } as CSSProperties;

  return <span className={styles.chip} data-what-chip={index} ref={chipRef}>
    <button
      className={styles.chipButton}
      type="button"
      style={buttonStyle}
      data-open={open ? "true" : undefined}
      aria-label={`${capability.title} details`}
      aria-expanded={open}
      aria-controls={`capability-${kind}`}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onPointerDown={event => { pointerType.current = event.pointerType; }}
      onFocus={onFocus}
      onBlur={() => setOpen(false)}
      onClick={event => {
        if (pointerType.current === "touch" || event.detail === 0) {
          if (open) setOpen(false);
          else expand();
        }
      }}
      onKeyDown={event => { if (event.key === "Escape") event.currentTarget.blur(); }}
    >
      <DummyIcon kind={kind} />
      <span className={styles.chevron} aria-hidden="true" />
      <span className={styles.expandedCopy} id={`capability-${kind}`} aria-hidden={!open}>
        <strong>{capability.title}</strong>
        <span>{capability.description}</span>
      </span>
    </button>
  </span>;
}
