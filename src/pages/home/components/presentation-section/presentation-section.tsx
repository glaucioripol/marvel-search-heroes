import styles from "./presentation-section.module.css";

export function PresentationSection() {
  return (
    <section className={styles.presentation_section}>
      <h1
        className={styles.presentation_section__title}
        data-testid="presentation-title">
        explore o universo
      </h1>

      <p
        className={styles.presentation_section__description}
        data-testid="presentation-description">
        Mergulhe no domínio deslumbrante de todos os personagens clássicos que
        você ama - e aqueles que você descobrirá em breve!
      </p>
    </section>
  );
}
