import styles from "./home.module.css";

import { FormEvent, useMemo, useState } from "react";

import {
  LikeButton,
  ShowJustFavoritesButton,
  ToggleButton,
} from "@/components";

import { useFavoriteHeroes, useGetCharacters } from "@/hooks";
import { GetCharactersParameters } from "@/services";

export function Homepage() {
  const [justLiked, setJustLiked] = useState(false);

  const [filters, setFilters] = useState<GetCharactersParameters>({
    name: undefined,
    orderBy: "name",
  });

  const characters = useGetCharacters(filters, !justLiked);

  const favoriteHeroes = useFavoriteHeroes();
  const resultsFiltered = useMemo(
    () =>
      justLiked
        ? favoriteHeroes.heroes.sort((a, b) => {
            if (filters.orderBy === "name") {
              return a.name.localeCompare(b.name);
            }

            return b.name.localeCompare(a.name);
          })
        : characters.data,
    [characters.data, favoriteHeroes.heroes, filters.orderBy, justLiked],
  );

  const total = resultsFiltered.length;

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const getSearchValue = formData.get("search-hero");

    if (!getSearchValue) {
      return void setFilters((previousFilters) => ({
        ...previousFilters,
        name: undefined,
      }));
    }

    setFilters((previousFilters) => ({
      ...previousFilters,
      name: getSearchValue!.toString(),
    }));
  };

  if (characters.states.isLoading) {
    return (
      <div>
        <h1>carregando</h1>
      </div>
    );
  }

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
          onSubmit={handleSearch}>
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
              Encontrados {total} heróis
            </span>
          </div>

          <div className={styles.filters__actions}>
            <div className="text_with_icon">
              <img
                src="/assets/ic_heroi.svg"
                alt="Desenho que representa um herói, uma pessoa de capa, com a mão na cintura e todo o desenho é em vermelho."
              />

              <span>Ordenar por nome - A/Z</span>
            </div>

            <div>
              <ToggleButton
                isChecked={filters.orderBy !== "name"}
                onChange={(isChecked) => {
                  setFilters((previousFilters) => ({
                    ...previousFilters,
                    orderBy: isChecked ? "-name" : "name",
                  }));
                }}
              />
            </div>

            <div>
              <ShowJustFavoritesButton
                isActive={justLiked}
                onClick={setJustLiked}
                disabled={!favoriteHeroes.areThereFavoriteHeroes}
              />
            </div>
          </div>
        </div>

        <ul className={styles.cards}>
          {resultsFiltered.map((hero) => {
            return (
              <li key={hero.id}>
                <div className={styles.card}>
                  <figure
                    className={styles.card__figure}
                    data-testid="card-figure">
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
                      <LikeButton
                        liked={favoriteHeroes.actions.has(hero.id)}
                        onLikeChange={() => {
                          if (favoriteHeroes.actions.has(hero.id)) {
                            favoriteHeroes.actions.remove(hero.id);
                            return;
                          }

                          favoriteHeroes.actions.add(hero);
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
