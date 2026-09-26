import { Fragment } from "react";
import { bodyFont, displayFont, labelFont } from "@/lib/fonts";
import { CapabilityChip } from "./capability-chip";
import { WhatYouGetMotion } from "./what-you-get-motion";
import styles from "./what-you-get.module.css";

function RevealWords({ text }: { text: string }) {
  return <>{text.split(" ").map((word, index) => <Fragment key={`${word}-${index}`}><span className={styles.wordMask}><span data-reveal-word>{word}</span></span>{" "}</Fragment>)}</>;
}

export function WhatYouGet() {
  return <WhatYouGetMotion className={`${styles.section} ${displayFont.variable} ${bodyFont.variable} ${labelFont.variable}`}>
    <div className={styles.stage} data-what-stage>
      <div className={styles.inner}>
        <h2 id="what-you-get-heading" className={styles.heading} data-what-heading><span>What</span><span>You Get?</span></h2>
        <div className={styles.overviewSlot}><div className={styles.overview} data-what-overview>
          <span className={styles.eyebrow}>Capabilities Overview</span>
          <p className={styles.statement} data-reveal-statement>
            <RevealWords text="Strategy, precision, and" />{" "}
            <CapabilityChip kind="development" index={0} />{" "}
            <RevealWords text="development combined - turning" />{" "}
            <CapabilityChip kind="seo" index={1} />{" "}
            <RevealWords text="your vision into a powerful digital" />{" "}
            <CapabilityChip kind="performance" index={2} />{" "}
            <RevealWords text="experience" />{" "}
            <CapabilityChip kind="interaction" index={3} />{" "}
            <RevealWords text="that feels effortless." />
          </p>
        </div></div>
      </div>
    </div>
  </WhatYouGetMotion>;
}
