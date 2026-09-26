import Image from "next/image";
import { bodyFont, displayFont, labelFont } from "@/lib/fonts";
import { heroContent } from "@/components/hero/content";
import { ClientsMotion } from "./clients-motion";
import { TestimonialsCarousel } from "./testimonials-carousel";
import { NeshMask } from "./nesh-mask";
import { testimonials } from "./content";
import styles from "./clients.module.css";

export function Clients() {
  return <ClientsMotion className={`${styles.section} ${displayFont.variable} ${bodyFont.variable} ${labelFont.variable}`}>
    <div className={styles.invitation}>
      <div className={styles.invitationContent} data-clients-reveal>
        <h2 id="clients-heading" className={styles.invitationHeading}>
          <span>Transform Your</span>
          <span>Webflow</span>
          <span className={styles.pale}>Experience</span>
          <span className={styles.pale}>Journey</span>
        </h2>
        <p className={styles.invitationCopy}>Every Webflow site has potential to grow. See what works, find what slows you down, and move toward a site that is faster, lighter, and easier to run.</p>
        <div className={styles.chat}>
          <Image src={heroContent.portrait.desktop} alt="" width={52} height={52} sizes="52px" className={styles.avatar} />
          <div className={styles.chatActions}>
            <span>Have something in mind?</span>
            <a href={heroContent.primaryAction.href} target="_blank" rel="noopener noreferrer">Let&apos;s Talk <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </div>
    </div>
    <div className={styles.testimonials}>
      <header className={styles.testimonialsHeading} data-clients-reveal>
        <span className={styles.eyebrow}>Testimonials</span>
        <h3>From People<br />I&apos;ve Worked with</h3>
      </header>
      <TestimonialsCarousel items={testimonials} />
    </div>
    <NeshMask />
  </ClientsMotion>;
}
