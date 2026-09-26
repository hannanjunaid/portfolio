"use client";

import { useRef, type ReactNode } from "react";
import styles from "./about.module.css";

export function StoryDisclosure({ year, title, children }: { year: number; title: string; children: ReactNode }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const close = () => {
    if (!detailsRef.current) return;
    detailsRef.current.open = false;
    detailsRef.current.querySelector("summary")?.focus({ preventScroll: true });
  };

  return (
    <details
      ref={detailsRef}
      name="about-stories"
      className={styles.disclosure}
      onToggle={event => { if (event.currentTarget.open) closeRef.current?.focus({ preventScroll: true }); }}
      onKeyDown={event => { if (event.key === "Escape" && detailsRef.current?.open) { event.preventDefault(); close(); } }}
    >
      <summary aria-label={`Read more about ${title.toLowerCase()}`} className={styles.readMore}>Read more</summary>
      <div className={styles.popup} role="region" aria-label={`${year}: ${title}`}>
        <div className={styles.popupTop}>
          <span>{year}</span>
          <button ref={closeRef} type="button" className={styles.close} onClick={close} aria-label="Close story"><span /><span /></button>
        </div>
        <div className={styles.popupBody}>{children}</div>
      </div>
    </details>
  );
}
