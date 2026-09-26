"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./hero.module.css";

export function MobileMenu({ links }: { links: readonly { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: globalThis.PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open]);

  return <div className={styles.mobileMenu} data-open={open} ref={menuRef} onKeyDown={event => {
    if (event.key === "Escape") {
      setOpen(false);
      menuRef.current?.querySelector("button")?.focus();
    }
  }}>
    <button type="button" className={styles.mobileMenuToggle} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(value => !value)}><span /><span /><span /><span /></button>
    <nav id="mobile-navigation" aria-label="Mobile navigation" inert={!open}>
      {links.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
    </nav>
  </div>;
}
