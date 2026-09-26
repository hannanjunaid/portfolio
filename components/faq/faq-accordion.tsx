"use client";

import { useState } from "react";
import { questions } from "./content";
import styles from "./faq.module.css";

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return <div className={styles.columns}>
    {[questions.slice(0, 4), questions.slice(4)].map((column, columnIndex) => <div className={styles.column} key={columnIndex}>
      {column.map((item, itemIndex) => {
        const index = columnIndex * 4 + itemIndex;
        const open = openIndex === index;
        return <div className={styles.item} data-open={open} key={item.question}>
          <h3>
            <button className={styles.question} type="button" id={`faq-question-${index}`} aria-controls={`faq-answer-${index}`} aria-expanded={open} onClick={() => setOpenIndex(open ? null : index)}>
              <span>{item.question}</span><span className={styles.plus} aria-hidden="true" />
            </button>
          </h3>
          <div className={styles.answerWrap} id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} aria-hidden={!open}>
            <div className={styles.answerInner}><p>{item.answer}</p></div>
          </div>
        </div>;
      })}
    </div>)}
  </div>;
}
