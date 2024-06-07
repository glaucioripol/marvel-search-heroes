import { useState } from "react";
import styles from "./home.module.css";

import mocksResponse from "@/__fixtures__/characters_default_request.json";

const { count, results } = mocksResponse.data;

export function Homepage() {
  const [like, setLike] = useState(false);
  return (
    <div>
      <header className={styles.header}>
        <img
          className={styles.header__logo}
          src="/assets/logo.svg"
          alt="Texto escrito 'Marvel Search heroes', a parte escrito marvel está em vermelho e o restante em cinza escuro."
          loading="lazy"
          data-testid="header-logo"
        />
      </header>

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
          você ama - e aqueles que você descobrirá em breve!{" "}
        </p>
      </section>

      <div className={styles.search} data-testid="search-bar-wrapper">
        <form
          className={styles.search__form}
          data-testid="search-form"
          onSubmit={(event) => {
            event.preventDefault();
          }}>
          <button
            data-testid="search-button"
            className={styles.search__button}
            type="submit"
            aria-label="Buscar por heróis"
            title="Buscar por heróis">
            <img src="/assets/ic_busca.svg" alt="" width={29} height={29} />
          </button>

          <input
            className={styles.search__input}
            type="search"
            aria-label="Procure por heróis"
            title="Procure por heróis"
            placeholder="Procure por heróis"
            data-testid="search-input"
            name="search-hero"
            maxLength={120}
          />
        </form>
      </div>

      <main className={styles.container} data-testid="main-content">
        <div className={styles.filters} data-testid="filters-wrapper">
          <div>
            <span className={styles.filters__total_results}>
              Encontrados {count} heróis
            </span>
          </div>

          <div className={styles.filters__actions}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <img src="/assets/ic_heroi.svg" alt="" />
              Ordenar por nome - A/Z
              <img src="/assets/toggle_off.svg" alt="" />
            </div>
            <div>
              <button type="button">
                <img src="/assets/favorito_01.svg" alt="" />
                Somente favoritos
              </button>
            </div>
          </div>
        </div>

        <ul className={styles.cards}>
          {results.map(({ id, thumbnail, name }) => {
            return (
              <li key={id}>
                <div className={styles.card}>
                  <figure
                    className={styles.card__figure}
                    data-testid="card-figure">
                    <img
                      className={styles.card__image}
                      src={`${thumbnail.path}.${thumbnail.extension}`}
                      alt={`Imagem do personagem ${name}, não é possível detalhar muito por ser algo dinâmico.`}
                      loading="lazy"
                      width={260}
                      height={260}
                    />
                  </figure>

                  <div className={styles.card__content}>
                    <div>
                      <h2 className={styles.card__title}>{name}</h2>
                    </div>

                    <div>
                      <button
                        type="button"
                        aria-pressed={like}
                        data-liked={like}
                        aria-label={
                          like
                            ? "Remover dos favoritos"
                            : "Adicionar aos favoritos"
                        }
                        title={
                          like
                            ? "Remover dos favoritos"
                            : "Adicionar aos favoritos"
                        }
                        className={[
                          styles.like_button,
                          like ? styles["like_button--liked"] : "",
                        ].join(" ")}
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();

                          setLike((previousLike) => !previousLike);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </main>

      <footer className={styles.footer}>
        <p>Feito com ❤️ por Gláucio</p>
      </footer>
    </div>
  );
}
