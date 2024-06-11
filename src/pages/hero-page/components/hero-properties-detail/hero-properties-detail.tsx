import styles from "./hero-properties-detail.module.css";

import { HeroPropertiesDetailProperties } from "./hero-properties-detail.types";

export function HeroPropertiesDetail({
  hero,
  lastComicReleaseDate,
}: HeroPropertiesDetailProperties) {
  return (
    <div id="hero-detail">
      <div className={styles.hero_details__about_contents_numbers}>
        <div>
          <span className={styles.hero_details__properties}>Quadrinhos</span>
          <div className={styles.hero_details__properties_number}>
            <img
              src="/assets/ic_quadrinhos.svg"
              alt="Icone de um livro meio aberto, com a cor em vermelho representando quadrinhos."
              title="Icone de um livro meio aberto, com a cor em vermelho representando quadrinhos."
              width={28}
              height={31}
              loading="lazy"
            />
            <span>{hero?.comics.available}</span>
          </div>
        </div>

        <div>
          <span className={styles.hero_details__properties}>Séries</span>

          <div className={styles.hero_details__properties_number}>
            <img
              src="/assets/ic_trailer.svg"
              alt="icone retangular com um triângulo em 90˚ no centro, e isso atualmente na internet é usado para representar um vídeo te convidando a clicar."
              title="icone retangular com um triângulo em 90˚ no centro, e isso atualmente na internet é usado para representar um vídeo te convidando a clicar."
              width={30}
              height={23}
              loading="lazy"
            />
            <span>{hero?.series.available}</span>
          </div>
        </div>
      </div>

      <div className={styles.hero_details__rating}>
        <span className={styles.hero_details__rating__text}>Rating:</span>
        <div className={styles.hero_details__rating__stars}>
          {Array.from({ length: 5 }).map((_, index) => (
            <img
              key={index}
              src="/assets/avaliacao_on.svg"
              alt="ícone de uma estrela vermelha que representa a avaliação."
              width={18}
              height={18}
            />
          ))}
        </div>
      </div>

      <div className={styles.hero_details__last_comics}>
        <span className={styles.hero_details__last_comics__title}>
          Último quadrinho:
        </span>{" "}
        <span className={styles.hero_details__last_comics__date}>
          {lastComicReleaseDate ?? "Informação não disponível"}
        </span>
      </div>
    </div>
  );
}
