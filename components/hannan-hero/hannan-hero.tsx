"use client";

import { useEffect, useRef } from "react";
import "./hannan-hero.css";

const LINE_TEXTS = [
  "Hannan Malik is a WordPress expert",
  "and UX/UI designer crafting modern,",
  "user-friendly, high-performing websites.",
];

export function HannanHero() {
  const shellRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shell = shellRef.current;
    const slider = document.getElementById("hTitleSlider");
    const nav = navRef.current;
    if (!shell || !slider || !nav) return;
    const cleanups: Array<() => void> = [];

    // Nav background once scrolled
    const onScroll = () => nav.classList.toggle("nav--scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    // Hero scroll sequence: 0 default, 1 image blurred, 2 alternate title.
    // While at the top of the page the wheel steps the sequence; once it
    // reaches the last step the page scrolls normally into the next sections.
    const MAX_STEP = 2;
    let step = 0;
    let locked = false;
    const render = () => {
      shell.classList.toggle("scroll-blur-img", step >= 1);
      slider.classList.toggle("is-swapped", step >= 2);
    };
    const advance = (dir: number) => {
      if (locked) return;
      const next = Math.min(MAX_STEP, Math.max(0, step + dir));
      if (next === step) return;
      step = next;
      render();
      locked = true;
      setTimeout(() => { locked = false; }, 550);
    };
    const onWheel = (e: WheelEvent) => {
      if (window.scrollY > 0) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      if (dir > 0 && step < MAX_STEP) e.preventDefault();
      else if (dir < 0 && step === 0) return;
      advance(dir);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    cleanups.push(() => window.removeEventListener("wheel", onWheel));

    let touchY: number | null = null;
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      if (touchY === null || window.scrollY > 0) return;
      const d = touchY - e.touches[0].clientY;
      if (Math.abs(d) > 20) { advance(d > 0 ? 1 : -1); touchY = e.touches[0].clientY; }
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    cleanups.push(() => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    });

    // Tagline typewriter + highlight sweep
    const lines = LINE_TEXTS.map((text, i) => ({
      text,
      textEl: document.getElementById("hTwText" + (i + 1)) as HTMLElement,
      cursorEl: document.getElementById("hTwCursor" + (i + 1)) as HTMLElement,
    }));
    if (lines.some((l) => !l.textEl || !l.cursorEl)) return () => cleanups.forEach((f) => f());

    if (reduced) {
      lines.forEach((l) => {
        l.textEl.textContent = l.text;
        l.textEl.style.setProperty("--sweep", "0px");
        l.cursorEl.classList.add("tw-hidden");
      });
      return () => cleanups.forEach((f) => f());
    }

    let rafId: number | null = null;
    let timeouts: number[] = [];
    const later = (fn: () => void, ms: number) => { timeouts.push(window.setTimeout(fn, ms)); };
    const clearAll = () => {
      timeouts.forEach(clearTimeout);
      timeouts = [];
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    };
    const blank = () => lines.forEach((l) => {
      l.textEl.style.setProperty("--sweep", "0px");
      l.textEl.textContent = "";
      l.cursorEl.classList.add("tw-hidden");
    });
    const measure = (line: (typeof lines)[number]) => {
      const prev = line.textEl.style.getPropertyValue("--sweep");
      line.textEl.textContent = line.text;
      line.textEl.style.setProperty("--sweep", "0px");
      const w = line.textEl.getBoundingClientRect().width;
      line.textEl.style.setProperty("--sweep", prev || "0px");
      return w;
    };
    const typeLine = (i: number, c: number) => {
      const line = lines[i];
      line.textEl.textContent = line.text.slice(0, c);
      if (c < line.text.length) later(() => typeLine(i, c + 1), 55);
      else { line.cursorEl.classList.add("tw-hidden"); later(() => sweepLine(i), 300); }
    };
    const sweepLine = (i: number) => {
      const line = lines[i];
      const target = measure(line);
      let t0: number | null = null;
      const frame = (ts: number) => {
        if (t0 === null) t0 = ts;
        const p = Math.min((ts - t0) / 900, 1);
        line.textEl.style.setProperty("--sweep", (1 - Math.pow(1 - p, 2)) * target + "px");
        if (p < 1) rafId = requestAnimationFrame(frame);
        else if (i < lines.length - 1) {
          later(() => { lines[i + 1].cursorEl.classList.remove("tw-hidden"); typeLine(i + 1, 0); }, 200);
        } else later(() => { blank(); later(start, 250); }, 1200);
      };
      rafId = requestAnimationFrame(frame);
    };
    const start = () => {
      clearAll();
      blank();
      lines[0].cursorEl.classList.remove("tw-hidden");
      typeLine(0, 0);
    };
    start();
    cleanups.push(clearAll);

    return () => cleanups.forEach((f) => f());
  }, []);

  return (
    <div className="hannan-site">
      <section className="hero-shell" ref={shellRef}>
      <div className="hero__wordmark-group">
        <div className="hero__wordmark" aria-hidden="true">HANNAN</div>

        <header className="nav" ref={navRef}>
          <nav className="nav__links nav__links--left" aria-label="Main navigation">
            <a href="#">HOME</a>
            <span>|</span>
            <a href="#about">ABOUT ME</a>
            <span>|</span>
            <a href="#contact">CONTACT US</a>
          </nav>

          <nav className="nav__links nav__links--right" aria-label="Secondary navigation">
            <a href="#services">SERVICES</a>
            <span>|</span>
            <a href="#clients">CLIENTS</a>
            <span>|</span>
            <a href="#faq">FAQ</a>
          </nav>
        </header>

        <div className="hero__left-stack">
          <div className="hero__stats-row">
            <div className="mini-card mini-card--single mini-card--icon mini-card--float">
              <span className="mini-card__icon">
                <img src="/hannan/logo.png" alt="" />
              </span>
              <span className="mini-card__text">
                <span className="mini-card__value">80+</span>
                <span className="mini-card__label">Projects</span>
              </span>
            </div>

            <div className="mini-card mini-card--single mini-card--bottom mini-card--float-behind">
              <div className="mini-card__value">7+</div>
              <div className="mini-card__label">Years of experience</div>
            </div>
          </div>

          <div className="tw-lines">
            <div className="tw-line">
              <span className="tw-text" id="htwText1"></span><span className="tw-cursor" id="htwCursor1">|</span>
            </div>
            <div className="tw-line">
              <span className="tw-text" id="htwText2"></span><span className="tw-cursor" id="htwCursor2">|</span>
            </div>
            <div className="tw-line">
              <span className="tw-text" id="htwText3"></span><span className="tw-cursor" id="htwCursor3">|</span>
            </div>
          </div>
        </div>

        <aside className="hero__right">
          <ul className="feature-list">
            <li>
              <span className="feature-list__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 3l2.2 5.6L20 11l-5.8 2.4L12 19l-2.2-5.6L4 11l5.8-2.4L12 3z" fill="currentColor" /></svg>
              </span>
              Creative
            </li>
            <li>
              <span className="feature-list__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v5c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3z" fill="currentColor" /></svg>
              </span>
              Reliable
            </li>
            <li>
              <span className="feature-list__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" fill="currentColor" opacity="0.35"/><circle cx="12" cy="12" r="4.5" fill="currentColor"/></svg>
              </span>
              Strategist
            </li>
            <li>
              <span className="feature-list__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><path d="M20 5.5l-3-1-1.2 1.2 2 2-1.6 1.6-2-2-1.2 1.2 1 1-8 8v2.5H8l8-8 1 1 1.2-1.2-2-2 1.6-1.6 2 2L20 5.5z" fill="currentColor" /></svg>
              </span>
              Builder
            </li>
            <li>
              <span className="feature-list__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" fill="currentColor" /></svg>
              </span>
              Efficient
            </li>
          </ul>

          <div className="hero__note-block">
            <p className="hero__note">
              Working closely with your team to deliver<br />
              Webflow builds that merge creativity, technical<br />
              excellence, and long-term value.
            </p>

            <span className="hero__note-icon">
              <img src="/hannan/logo.png" alt="" />
            </span>
          </div>
        </aside>
      </div>

      <div className="hero__portrait-group">
        <div className="hero__portrait" aria-label="Hannan portrait">
          <img src="/hannan/img.png" alt="Portrait of Hannan" />
        </div>

        <div className="hero__title-wrap">
          <div className="hero__title-slider" id="hTitleSlider">
            <div className="hero__title-slide">
              <span className="hero__title-main">Frustrated From</span>
              <span className="hero__title-main hero__title-main--large">Ugly Websites??</span>
            </div>
            <div className="hero__title-slide">
              <span className="hero__title-main">Guess What?</span>
              <span className="hero__title-main hero__title-main--large">Not Anymore</span>
            </div>
          </div>

          <div className="hero__actions">
            <a href="#contact" className="btn btn--primary btn--bubble"><span>Book a Call</span></a>
            <a href="#about" className="btn btn--secondary btn--glitch btn--bubble"><span>About Me</span></a>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
