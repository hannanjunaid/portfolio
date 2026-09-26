import Image from "next/image";
import type { CSSProperties } from "react";
import { bodyFont, displayFont, labelFont } from "@/lib/fonts";
import { heroContent } from "@/components/hero/content";
import { heroIcons } from "@/components/hero/icons";
import { aboutContent, milestones, type Milestone } from "./content";
import { timelinePaths } from "./timeline-paths";
import { navigationIcons } from "./nav-icons";
import { brands } from "./brands";
import { AboutMotion } from "./about-motion";
import { StoryDisclosure } from "./story-disclosure";
import { CopyEmail } from "./copy-email";
import styles from "./about.module.css";

function Vector({ icon, transitionTarget }: { icon: { viewBox: string; paths: readonly string[] }; transitionTarget?: string }) {
  return <svg viewBox={icon.viewBox} data-transition-target={transitionTarget} fill="currentColor" aria-hidden="true" focusable="false">{icon.paths.map((d, i) => <path d={d} key={i} />)}</svg>;
}

function Avatars({ images }: { images: Milestone["images"] }) {
  return <div className={styles.avatars}>{images.map(image => <Image key={image.src} src={image.src} alt={image.alt} width={128} height={128} sizes="(max-width: 991px) 11vw, 80px" />)}</div>;
}

function Year({ value }: { value: number }) {
  return <p className={styles.year} aria-label={String(value)}><span aria-hidden="true">&#39;{String(value).slice(-2).split("").map((digit, index) => <span className={styles.digitWindow} key={index}><span className={styles.digitStrip} style={{ "--digit": Number(digit), "--digit-delay": `${.2 + index * .1}s` } as CSSProperties}>{Array.from({ length: 10 }, (_, n) => <span key={n}>{n}</span>)}</span></span>)}</span></p>;
}

function JourneyCard({ item, first = false }: { item: Milestone; first?: boolean }) {
  const { x, y, side } = item.anchor;
  const position = { "--anchor-x": `${x / 1118 * 100}%`, "--anchor-y": `${y / 2166 * 100}%` } as CSSProperties;
  return (
    <article className={`${styles.milestone} ${first ? styles.firstMilestone : ""} ${side === "right" ? styles.pointRight : styles.pointLeft}`} style={position} data-about-reveal>
      <span className={styles.connector} aria-hidden="true" />
      <span className={styles.mobileDot} aria-hidden="true" />
      <div className={styles.card}>
        <Year value={item.year} />
        <div className={styles.textMask}><h3>{item.title}</h3></div>
        <div className={styles.textMask}><p className={styles.cardDescription}>{item.description}</p></div>
        <div className={styles.cardFooter}>
          <div className={styles.author}><Avatars images={item.images} /><p>{item.handle}<br />{item.time}</p></div>
          <StoryDisclosure year={item.year} title={item.title}>
            <Avatars images={item.detailImages} />
            <h4>{item.detailTitle.map((line, index) => <span key={index}>{line}</span>)}</h4>
            <p>{item.story.map((part, index) => part.href ? <a key={index} href={part.href} target="_blank" rel="noopener noreferrer">{part.text}</a> : <span key={index}>{part.text}</span>)}</p>
          </StoryDisclosure>
        </div>
      </div>
    </article>
  );
}

function Sidebar() {
  return <aside className={styles.sidebarRail} aria-label="Portfolio sidebar" data-transition-sidebar><div className={styles.sidebar}>
    <div className={`${styles.sidebarPanel} ${styles.sidebarIntro}`} data-transition-panel>
      <div className={styles.brandRow}>
        <a href="#hero" aria-label="NESH home" className={styles.brand}><span data-transition-target="logo"><Vector icon={heroIcons.wordmark} /></span><sup data-transition-target-content>®</sup></a>
        <div className={styles.socials}>
          <a href="https://x.com/NenadPopadicc" target="_blank" rel="noopener noreferrer" aria-label="X"><span aria-hidden="true">X</span></a>
          <a href="https://www.linkedin.com/in/nenad-popadic-3a8649197/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><span aria-hidden="true">in</span></a>
        </div>
      </div>
      <p data-transition-target="description">{heroContent.description}</p>
    </div>
    <div className={`${styles.sidebarPanel} ${styles.sidebarStats}`} data-transition-panel>
      <div><Vector icon={heroIcons.webflow} transitionTarget="projects-icon" /><p data-transition-target="projects-text">{heroContent.projects}<br />Projects</p></div>
      <span className={styles.statSeparator} />
      <div><Vector icon={heroIcons.experience} transitionTarget="experience-icon" /><p data-transition-target="experience-text">Years of<br />experience</p></div>
    </div>
    <nav className={`${styles.sidebarPanel} ${styles.sidebarNavigation}`} aria-label="Section navigation" data-transition-panel>
      {heroContent.navigation.map((link, index) => <a key={link.label} href={link.href} aria-current={link.href === "#about" ? "location" : undefined}><span className={styles.navIcon} data-transition-target-content><Vector icon={navigationIcons[index]} /></span><span data-transition-target={`nav-${index}`}>{link.label}</span></a>)}
    </nav>
    <div className={`${styles.sidebarPanel} ${styles.marquee}`} aria-label="Selected clients" data-transition-panel><div className={styles.marqueeTrack}>{[0, 1].map(copy => <div key={copy} aria-hidden={copy === 1 ? true : undefined}>{brands.map(brand => <Image key={brand.name} src={brand.src} alt={brand.name.replace("_", "")} width={brand.width} height={brand.height} />)}</div>)}</div></div>
    <div className={`${styles.sidebarPanel} ${styles.emailPanel}`} data-transition-panel><CopyEmail email={aboutContent.email} /></div>
    <a className={styles.sidebarCta} href={heroContent.primaryAction.href} target="_blank" rel="noopener noreferrer" data-transition-target="cta-primary" data-transition-panel>{heroContent.primaryAction.label}</a>
  </div></aside>;
}

export function About() {
  return <AboutMotion className={`${styles.about} ${displayFont.variable} ${bodyFont.variable} ${labelFont.variable}`}>
    <div className={styles.backdropRail} aria-hidden="true"><div className={styles.backdrop}><Image src={heroContent.portrait.desktop} alt="" fill sizes="85vw" /></div></div>
    <Sidebar />
    <div className={styles.main}>
      <header className={styles.intro} data-about-reveal>
        <div className={styles.label}>{aboutContent.label}</div>
        <h2 id="about-heading">{aboutContent.heading.map(line => <span className={styles.headingMask} key={line}><span>{line}</span></span>)}</h2>
        <div className={styles.introTextMask}><p>{aboutContent.introduction}</p></div>
      </header>
      <div className={styles.journey}>
        <JourneyCard item={milestones[0]} first />
        <div className={styles.timeline} data-timeline>
          <div className={styles.timelineArt} aria-hidden="true"><svg viewBox="0 0 1118 2166" fill="none">{timelinePaths.map((d, index) => <path key={index} d={d} fill="currentColor" />)}{milestones.map(item => <circle key={item.year} cx={item.anchor.x} cy={item.anchor.y} r="5.5" fill="#ffff23" stroke="currentColor" strokeWidth="2" />)}</svg></div>
          {milestones.slice(1).map(item => <JourneyCard key={item.year} item={item} />)}
        </div>
      </div>
    </div>
  </AboutMotion>;
}
