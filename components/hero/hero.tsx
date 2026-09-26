import { getImageProps } from "next/image";
import { Fragment, type CSSProperties } from "react";
import { bodyFont, displayFont } from "@/lib/fonts";
import { heroContent as content } from "./content";
import { heroIcons } from "./icons";
import { MobileMenu } from "./mobile-menu";
import styles from "./hero.module.css";

function Icon({ name, className, transitionSource }: { name: keyof typeof heroIcons; className?: string; transitionSource?: string }) {
  const icon = heroIcons[name];
  return (
    <svg viewBox={icon.viewBox} className={className} data-transition-source={transitionSource} aria-hidden="true" focusable="false" fill="currentColor">
      {icon.paths.map((path, index) => <path key={index} d={path} fillRule="evenodd" clipRule="evenodd" />)}
    </svg>
  );
}

function Wordmark({ className }: { className?: string }) {
  // The reference wordmark uses custom letterforms; other names use editable text.
  return content.wordmark === "NESH"
    ? <Icon name="wordmark" className={className} />
    : <span className={className} aria-hidden="true">{content.wordmark}</span>;
}

function NavigationLinks({ start, end }: { start: number; end: number }) {
  return content.navigation.slice(start, end).map((link, index) => (
    <Fragment key={link.label}>
      {index > 0 && <span className={styles.separator} aria-hidden="true" data-transition-role="separator" />}
      <a className={styles.navLink} href={link.href}><span data-transition-source={`nav-${start + index}`}>{link.label}</span></a>
    </Fragment>
  ));
}

export function Hero() {
  const sharedImageProps = { alt: content.portrait.alt, sizes: "100vw", loading: "eager" as const, fetchPriority: "high" as const };
  const { props: desktopImage } = getImageProps({ ...sharedImageProps, src: content.portrait.desktop, width: 1670, height: 1916 });
  const { props: mobileImage } = getImageProps({ ...sharedImageProps, src: content.portrait.mobile, width: 750, height: 1520 });
  return (
    <section id="hero" aria-labelledby="hero-heading" className={`${styles.hero} ${displayFont.variable} ${bodyFont.variable}`}>
      <a className={styles.skipLink} href="#hero-heading">Skip to content</a>
      <div className={styles.stage} data-transition-stage>
      <header className={styles.mobileHeader}>
        <a href="#hero" aria-label={`${content.wordmark} home`} className={styles.mobileLogo}><Wordmark /><sup>®</sup></a>
        <a href={content.primaryAction.href} target="_blank" rel="noopener noreferrer" className={styles.mobileCta}>{content.primaryAction.label}</a>
        <MobileMenu links={content.navigation} />
      </header>

      <div className={styles.wordmarkWrap} data-transition-source="logo"><Wordmark className={styles.wordmark} /></div>

      <nav className={styles.navigation} aria-label="Main navigation">
        <div><NavigationLinks start={0} end={3} /></div>
        <div><NavigationLinks start={3} end={7} /></div>
      </nav>

      <div className={styles.portrait} data-transition-role="portrait">
        <picture>
          <source media="(max-width: 767px)" srcSet={mobileImage.srcSet} sizes={mobileImage.sizes} width={750} height={1520} />
          {/* Next.js art direction: one optimized image request for the active viewport. */}
          <img {...desktopImage} alt={content.portrait.alt} className={styles.portraitImage} />
        </picture>
      </div>

      <div className={styles.content}>
        <h1 id="hero-heading" tabIndex={-1} className={styles.heading} data-transition-role="heading">
          {content.heading.map((line, index) => <span key={line} style={{ "--line-index": index } as CSSProperties}>{line}</span>)}
        </h1>
        <div className={styles.actions}>
          <a className={styles.button} href={content.primaryAction.href} target="_blank" rel="noopener noreferrer" data-transition-source="cta-primary"><span>{content.primaryAction.label}</span></a>
          <a className={styles.button} href={content.secondaryAction.href} data-transition-source="cta-secondary"><span>{content.secondaryAction.label}</span></a>
        </div>
      </div>

      <div className={`${styles.card} ${styles.projects}`} aria-label={`${content.projects} projects`} data-transition-role="stat-card">
        <Icon name="webflow" className={styles.webflowIcon} transitionSource="projects-icon" />
        <p data-transition-source="projects-text"><span>{content.projects}</span><span>Projects</span></p>
      </div>
      <div className={`${styles.card} ${styles.experience}`} data-transition-role="stat-card">
        {content.experience === "7+" ? <><Icon name="experience" className={styles.experienceIcon} transitionSource="experience-icon" /><span className={styles.srOnly}>7+</span></> : <span className={styles.experienceNumber} data-transition-source="experience-icon">{content.experience}</span>}
        <p data-transition-source="experience-text"><span>Years of</span><span>experience</span></p>
      </div>
      <ul className={`${styles.card} ${styles.traits}`} aria-label="Qualities" data-transition-role="peripheral">
        {content.traits.map((trait, index) => (
          <li key={trait}><Icon name={`trait${index % 5}` as keyof typeof heroIcons} /><span>{trait}</span></li>
        ))}
      </ul>

      <p className={styles.introduction} data-transition-role="peripheral">
        {content.introduction.map(line => <span key={line}>{line}</span>)}
      </p>
      <p className={styles.description} data-transition-source="description">{content.description}</p>
      </div>
    </section>
  );
}
