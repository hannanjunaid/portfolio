import Image from "next/image";
import { aboutContent } from "@/components/about/content";
import { heroContent } from "@/components/hero/content";
import { bodyFont, displayFont, labelFont } from "@/lib/fonts";
import { FooterMotion } from "./footer-motion";
import styles from "./footer.module.css";

const name = heroContent.portrait.alt;
const email = aboutContent.email;

export function Footer() {
  return <FooterMotion className={`${styles.footer} ${displayFont.variable} ${bodyFont.variable} ${labelFont.variable}`}>
    <div className={styles.top}>
      <div className={styles.intro}>
        <span className={styles.eyebrow}>Let’s make something great</span>
        <h2>{name}<span className={styles.period}>.</span></h2>
        <p>Thoughtful Webflow development, built around your vision and made to last. Have a project in mind? Let’s talk.</p>
        <a className={styles.callLink} href={heroContent.primaryAction.href} target="_blank" rel="noopener noreferrer">{heroContent.primaryAction.label}<span aria-hidden="true">↗</span></a>
      </div>
      <nav className={styles.navigation} aria-label="Footer navigation">
        <span className={styles.navLabel}>Explore</span>
        <div className={styles.navLinks}>
          {heroContent.navigation.map(link => <a key={link.href} href={link.href}>{link.label}<span aria-hidden="true">↗</span></a>)}
        </div>
        <a className={styles.contactLink} href={`mailto:${email}`}>Have a question? <span aria-hidden="true">↗</span></a>
      </nav>
    </div>
    <div className={styles.stage}>
      <Image className={styles.portrait} src={heroContent.portrait.desktop} alt="" width={1670} height={1916} sizes="(max-width: 700px) 90vw, 45vw" />
      <div className={styles.marquee} aria-label={`Contact email: ${email}`}>
        <div className={styles.marqueeTrack}>
          {[0, 1].map(copy => <div className={styles.marqueeGroup} key={copy} aria-hidden={copy === 1}>
            {[0, 1].map(repeat => <span className={styles.marqueeItem} key={repeat}>
              <a href={`mailto:${email}`} tabIndex={copy === 1 ? -1 : undefined}>{email}</a>
              <span className={styles.marqueeStar} aria-hidden="true">✳</span>
            </span>)}
          </div>)}
        </div>
      </div>
    </div>
  </FooterMotion>;
}
