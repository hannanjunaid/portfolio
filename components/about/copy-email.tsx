"use client";

import { useState } from "react";
import styles from "./about.module.css";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button type="button" className={styles.emailButton} aria-label={`Copy ${email}`} onClick={async () => {
      try { await navigator.clipboard.writeText(email); setCopied(true); }
      catch { window.location.href = `mailto:${email}`; }
    }}>
      <span aria-live="polite">{copied ? "Copied!" : email}</span>
      <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 1h9v10h-2V3H5zM2 5h8v10H2z" fill="currentColor" /></svg>
    </button>
  );
}
