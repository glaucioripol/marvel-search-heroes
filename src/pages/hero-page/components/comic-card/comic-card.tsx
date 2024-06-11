import styles from "./comic-card.module.css";
import { ComicCardProperties } from "./comic-card.types";

export function ComicCard({ comic }: ComicCardProperties) {
  return (
    <div className={styles.comic_card}>
      <img
        src={`${comic?.thumbnail.path}.${comic?.thumbnail.extension}`}
        alt={comic?.title}
        width={155}
        height={185}
      />
      <span className={styles.comic_card__title}>{comic?.title}</span>
    </div>
  );
}
