import styles from "./hero-section.module.css";

import { LikeButton } from "@/components";

import { HeroSectionProperties } from "./hero-section.types";
import { HeroPropertiesDetail } from "../hero-properties-detail";

export function HeroSection({
  hero,
  onLikeChange,
  isLiked,
  lastComicReleaseDate,
}: HeroSectionProperties) {
  return (
    <main className={styles.hero_details}>
      <div>
        <div>
          <div className={styles.hero_details__name_wrapper}>
            <h1 className={styles.hero_details__name}>{hero?.name}</h1>
            <LikeButton
              liked={isLiked}
              onLikeChange={onLikeChange}
              dataTestId="like-button-hero-page"
            />
          </div>

          <p className={styles.hero_details__description}>
            {hero?.description ??
              "Esse herói não tem descrição, mas é muito legal!"}
          </p>
        </div>

        <HeroPropertiesDetail
          hero={hero}
          lastComicReleaseDate={lastComicReleaseDate!}
        />
      </div>

      <div>
        <img
          src={`${hero?.thumbnail.path}.${hero?.thumbnail.extension}`}
          alt={hero?.name}
          className={styles.hero_details__image}
        />
      </div>
    </main>
  );
}
