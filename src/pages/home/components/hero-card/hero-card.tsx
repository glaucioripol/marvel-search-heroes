import styles from "./hero-card.module.css";

import { LikeButton } from "@/components";

import { HeroCardProperties } from "./hero-card.types";

export function HeroCard({
  hero,
  isLiked,
  handleFavorite,
}: HeroCardProperties) {
  return (
    <div className={styles.card}>
      <figure className={styles.card__figure} data-testid="card-figure">
        <img
          className={styles.card__image}
          src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
          alt={`Imagem do personagem ${hero.name}, não é possível detalhar muito por ser algo dinâmico.`}
          loading="lazy"
          width={260}
          height={260}
        />
      </figure>

      <div className={styles.card__content}>
        <div>
          <h2 className={styles.card__title}>{hero.name}</h2>
        </div>

        <div>
          <LikeButton liked={isLiked} onLikeChange={handleFavorite(hero)} />
        </div>
      </div>
    </div>
  );
}
