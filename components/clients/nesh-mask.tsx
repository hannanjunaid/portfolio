"use client";

import { useId, useRef, useState, type PointerEvent } from "react";
import styles from "./clients.module.css";

const images = Array.from({ length: 6 }, (_, index) => `/images/clients/mask/mask-${index + 1}.avif`);
const spawnDistance = 44;
const maxCards = 9;
const cardWidth = 166;
const cardHeight = 224;

type Card = { id: number; x: number; y: number; rotation: number; image: string };

export function NeshMask() {
  const clipId = useId().replaceAll(":", "");
  const svgRef = useRef<SVGSVGElement>(null);
  const lastSpawnScreen = useRef<{ x: number; y: number } | null>(null);
  const sequence = useRef(0);
  const [cards, setCards] = useState<Card[]>([]);

  const addCard = (x: number, y: number) => {
    const id = sequence.current++;
    const card = { id, x, y, rotation: Math.random() * 16 - 8, image: images[id % images.length] };
    setCards(previous => [...previous.slice(-(maxCards - 1)), card]);
  };

  const pointerPosition = (event: PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    const matrix = svg?.getScreenCTM();
    if (!svg || !matrix) return null;
    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    return point.matrixTransform(matrix.inverse());
  };

  const enter = (event: PointerEvent<SVGSVGElement>) => {
    if (event.pointerType !== "mouse") return;
    const point = pointerPosition(event);
    if (!point) return;
    event.currentTarget.dataset.hovered = "true";
    setCards([]);
    addCard(point.x, point.y);
    lastSpawnScreen.current = { x: event.clientX, y: event.clientY };
  };

  const move = (event: PointerEvent<SVGSVGElement>) => {
    if (event.pointerType !== "mouse" || event.currentTarget.dataset.hovered !== "true") return;
    const point = pointerPosition(event);
    if (!point) return;
    const previous = lastSpawnScreen.current;
    if (!previous || Math.hypot(event.clientX - previous.x, event.clientY - previous.y) >= spawnDistance) {
      addCard(point.x, point.y);
      lastSpawnScreen.current = { x: event.clientX, y: event.clientY };
    }
  };

  const leave = (event: PointerEvent<SVGSVGElement>) => {
    event.currentTarget.dataset.hovered = "false";
    lastSpawnScreen.current = null;
  };

  return <div className={styles.maskSection} aria-label="NESH visual showcase">
    <div className={styles.maskStage}>
      <svg className={styles.maskSvg} ref={svgRef} viewBox="0 0 1120 360" role="img" aria-label="NESH" data-hovered="false" onPointerEnter={enter} onPointerMove={move} onPointerLeave={leave}>
        <defs>
          <clipPath id={clipId} clipPathUnits="userSpaceOnUse"><text className={styles.maskSvgWord} x="-25" y="315">NESH</text></clipPath>
        </defs>
        <rect width="1120" height="360" fill="transparent" pointerEvents="all" />
        <text className={styles.maskSvgWord} x="-25" y="315" fill="#ffff23">NESH</text>
        <g className={styles.maskPictures} clipPath={`url(#${clipId})`}>
          {cards.map(card => <g key={card.id} data-mask-card={card.id} transform={`translate(${card.x} ${card.y}) rotate(${card.rotation})`}>
            <image className={styles.maskPicture} href={card.image} x={-cardWidth / 2} y={-cardHeight / 2} width={cardWidth} height={cardHeight} preserveAspectRatio="xMidYMid slice" />
          </g>)}
        </g>
        <text className={styles.maskSvgRegistered} x="1029" y="65" fill="#ffff23">®</text>
      </svg>
    </div>
  </div>;
}
