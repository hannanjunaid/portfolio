import Image from "next/image";
import { bodyFont, displayFont, labelFont } from "@/lib/fonts";
import { projectContent } from "./content";
import { ProjectsMotion } from "./projects-motion";
import styles from "./projects.module.css";

export function Projects() {
  return (
    <ProjectsMotion className={`${styles.projects} ${displayFont.variable} ${bodyFont.variable} ${labelFont.variable}`}>
      <header className={styles.intro}>
        <span className={styles.eyebrow}>{projectContent.eyebrow}</span>
        <h2 id="projects-heading">{projectContent.heading.map(line => <span key={line}>{line}</span>)}</h2>
        <p>{projectContent.introduction}</p>
      </header>
      <div className={styles.scrollScene} data-projects-scene>
        <div className={styles.stage}>
          <div className={styles.track} data-projects-track>
            {projectContent.items.map((project, index) => (
              <article className={styles.card} key={project.title}>
                <Image
                  className={styles.artwork}
                  src={project.image}
                  alt={`Original placeholder artwork for ${project.title}`}
                  fill
                  sizes="(max-width: 991px) 84vw, 28vw"
                  unoptimized
                />
                <div className={styles.imageShade} aria-hidden="true" />
                <div className={styles.cardTop}>
                  <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                  <ul className={styles.tags} aria-label="Project technologies">
                    {project.tags.map(tag => <li key={tag}>{tag}</li>)}
                  </ul>
                </div>
                <div className={styles.cardBottom}>
                  <div><h3>{project.title}</h3><p>{project.description}</p></div>
                  <a href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title} website`} className={styles.arrow}>↗</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </ProjectsMotion>
  );
}
