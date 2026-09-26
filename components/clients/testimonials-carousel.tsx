"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { testimonials } from "./content";
import styles from "./clients.module.css";

type Testimonial = (typeof testimonials)[number];

export function TestimonialsCarousel({ items }: { items: readonly Testimonial[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ pointerId: number; x: number; left: number; moved: boolean } | null>(null);
  const animationRef = useRef(0);
  const [active, setActive] = useState(0);

  useEffect(() => () => cancelAnimationFrame(animationRef.current), []);

  const animateTo = (left: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    cancelAnimationFrame(animationRef.current);
    const target = Math.max(0, Math.min(left, viewport.scrollWidth - viewport.clientWidth));
    const start = viewport.scrollLeft;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || Math.abs(target - start) < 1) {
      viewport.scrollLeft = target;
      delete viewport.dataset.interacting;
      return;
    }
    viewport.dataset.interacting = "true";
    const duration = 300;
    let startTime = 0;
    const step = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min(1, (time - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      viewport.scrollLeft = start + (target - start) * eased;
      if (progress < 1) animationRef.current = requestAnimationFrame(step);
      else {
        animationRef.current = 0;
        viewport.scrollLeft = target;
        delete viewport.dataset.interacting;
      }
    };
    animationRef.current = requestAnimationFrame(step);
  };

  const goTo = (index: number) => {
    const viewport = viewportRef.current;
    const cards = viewport?.querySelectorAll<HTMLElement>("[data-client-card]");
    if (!viewport || !cards?.[index]) return;
    const left = cards[index].offsetLeft - cards[0].offsetLeft;
    animateTo(left);
    setActive(index);
  };
  const syncActive = () => {
    const viewport = viewportRef.current;
    const cards = viewport?.querySelectorAll<HTMLElement>("[data-client-card]");
    if (!viewport || !cards?.length) return;
    const step = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : 1;
    setActive(Math.min(items.length - 1, Math.max(0, Math.round(viewport.scrollLeft / step))));
  };
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || (event.button !== 0 && event.button !== 2) || (event.target as Element).closest("a, button")) return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    event.preventDefault();
    cancelAnimationFrame(animationRef.current);
    animationRef.current = 0;
    viewport.dataset.interacting = "true";
    viewport.setPointerCapture(event.pointerId);
    dragRef.current = { pointerId: event.pointerId, x: event.clientX, left: viewport.scrollLeft, moved: false };
  };
  const moveCursor = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !cursorRef.current) return;
    cursorRef.current.style.setProperty("--cursor-x", `${event.clientX}px`);
    cursorRef.current.style.setProperty("--cursor-y", `${event.clientY}px`);
    cursorRef.current.dataset.visible = "true";
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    moveCursor(event);
    const drag = dragRef.current;
    const viewport = viewportRef.current;
    if (!drag || !viewport || drag.pointerId !== event.pointerId) return;
    const distance = event.clientX - drag.x;
    if (Math.abs(distance) > 3 || drag.moved) {
      drag.moved = true;
      viewport.scrollLeft = drag.left - distance * 1.55;
    }
  };
  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    const drag = dragRef.current;
    if (!viewport || !drag || drag.pointerId !== event.pointerId) return;
    if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
    dragRef.current = null;
    if (!drag.moved) {
      delete viewport.dataset.interacting;
      return;
    }
    const cards = viewport.querySelectorAll<HTMLElement>("[data-client-card]");
    const step = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : 1;
    const index = Math.min(items.length - 1, Math.max(0, Math.round(viewport.scrollLeft / step)));
    animateTo(cards[index].offsetLeft - cards[0].offsetLeft);
  };
  const onPointerLeave = () => {
    if (!dragRef.current && cursorRef.current) cursorRef.current.dataset.visible = "false";
  };

  return <div className={styles.carousel}>
    <div className={styles.carouselControls} aria-label="Testimonial navigation">
      <span className={styles.carouselHint}>Drag to explore</span>
      <div className={styles.pagination}>
        {items.map((item, index) => <button key={item.name} type="button" aria-label={`Go to testimonial ${index + 1}: ${item.name}`} aria-current={active === index ? "true" : undefined} onClick={() => goTo(index)}><span /></button>)}
      </div>
    </div>
    <div
      className={styles.carouselViewport}
      ref={viewportRef}
      role="region"
      aria-label="Client feedback carousel"
      tabIndex={0}
      onScroll={syncActive}
      onPointerEnter={moveCursor}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onPointerLeave={onPointerLeave}
      onContextMenu={event => {
        if (!(event.target as Element).closest("a, button")) event.preventDefault();
      }}
      onKeyDown={event => {
        if (event.key === "ArrowRight") { event.preventDefault(); goTo(Math.min(items.length - 1, active + 1)); }
        if (event.key === "ArrowLeft") { event.preventDefault(); goTo(Math.max(0, active - 1)); }
      }}
    >
      <div className={styles.carouselTrack}>
        {items.map((item, index) => <article className={styles.testimonialCard} data-client-card key={item.name} aria-label={`${index + 1} of ${items.length}: feedback from ${item.name}`}>
          <div>
            <div className={styles.cardTop}>
              <h4>{item.title}</h4>
              <span className={styles.quote} aria-hidden="true">”</span>
            </div>
            <p className={styles.summary}>{item.summary}</p>
          </div>
          <div className={styles.person}>
            <Image src={item.image} alt="" width={60} height={60} sizes="60px" className={styles.personImage} />
            <div><strong>{item.name}</strong><span>{item.role}</span>{"href" in item ? <a href={item.href} target="_blank" rel="noopener noreferrer">{item.company}</a> : <span>{item.company}</span>}</div>
          </div>
        </article>)}
      </div>
    </div>
    <div className={styles.dragCursor} data-client-drag-cursor data-visible="false" ref={cursorRef} aria-hidden="true"><span className={styles.dragArrowLeft} /><strong>DRAG</strong><span className={styles.dragArrowRight} /></div>
  </div>;
}
