import { bodyFont, displayFont, labelFont } from "@/lib/fonts";
import { heroContent } from "@/components/hero/content";
import { ServicesMotion } from "./services-motion";
import styles from "./services.module.css";

const services = [
  {
    number: "01",
    title: "Hire me as a freelancer",
    description: "One dedicated Webflow partner, working directly with your team from first idea to final polish.",
    details: ["Direct collaboration", "Design-minded development", "Fast, considered delivery"],
    action: "Let's work together",
    href: "mailto:nenad@popadic.co?subject=Freelance%20project",
    theme: "dark",
    symbol: "↗",
  },
  {
    number: "02",
    title: "Work with my agency",
    description: "A wider creative and technical team for ambitious digital work that needs every detail connected.",
    details: ["Strategy to launch", "A collaborative team", "Room to scale"],
    action: "Start a project",
    href: "mailto:nenad@popadic.co?subject=Agency%20collaboration",
    theme: "light",
    symbol: "✳",
  },
  {
    number: "03",
    title: "Book a call",
    description: "Have something in mind? Let's talk through your goals and find the right way to move forward.",
    details: ["Tell me your idea", "Explore the possibilities", "Get a clear next step"],
    action: "Find a time",
    href: heroContent.primaryAction.href,
    theme: "accent",
    symbol: "↗",
  },
] as const;

export function Services() {
  return <ServicesMotion className={`${styles.section} ${displayFont.variable} ${bodyFont.variable} ${labelFont.variable}`}>
    <div className={styles.inner}>
      <header className={styles.intro} data-services-reveal>
        <span className={styles.eyebrow}>Services <span aria-hidden="true">/ 03 ways to work</span></span>
        <div className={styles.introGrid}>
          <h2 id="services-heading">Good work starts <span>together<span className={styles.period}>.</span></span></h2>
          <p>One standard of craft. Three ways to bring it to your next project. Choose the collaboration that fits where you are now.</p>
        </div>
      </header>
      <div className={styles.cards}>
        {services.map(service => <article className={`${styles.card} ${styles[service.theme]}`} key={service.number} data-services-reveal data-service-card>
          <div className={styles.cardSurface}>
          <div className={styles.cardTop}><span className={styles.number}>{service.number} / 03</span><span className={styles.symbol} aria-hidden="true">{service.symbol}</span></div>
          <div className={styles.cardBody}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
          <div className={styles.cardBottom}>
            <ul>{service.details.map(detail => <li key={detail}>{detail}</li>)}</ul>
            <a href={service.href} target={service.href.startsWith("mailto:") ? undefined : "_blank"} rel={service.href.startsWith("mailto:") ? undefined : "noopener noreferrer"} aria-label={`${service.action}: ${service.title}`} className={styles.action}><span>{service.action}</span><span aria-hidden="true">↗</span></a>
          </div>
          </div>
        </article>)}
      </div>
      <p className={styles.outro} data-services-reveal><span aria-hidden="true">✳</span> Different ways to collaborate. The same care in every detail.</p>
    </div>
  </ServicesMotion>;
}
