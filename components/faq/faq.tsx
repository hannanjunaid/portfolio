import { bodyFont, displayFont, faqQuestionFont, labelFont } from "@/lib/fonts";
import { FaqAccordion } from "./faq-accordion";
import { FaqMotion } from "./faq-motion";
import styles from "./faq.module.css";

export function Faq() {
  return <FaqMotion className={`${styles.section} ${displayFont.variable} ${bodyFont.variable} ${faqQuestionFont.variable} ${labelFont.variable}`}>
    <div className={styles.inner}>
      <header className={styles.intro}>
        <span className={styles.eyebrow}>FAQ</span>
        <h2 id="faq-heading">Got any<br />questions?</h2>
      </header>
      <FaqAccordion />
    </div>
  </FaqMotion>;
}
