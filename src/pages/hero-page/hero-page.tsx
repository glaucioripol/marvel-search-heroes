import styles from "./hero-page.module.css";

import { Hero } from "@/@types/marvel-api-response.types";
import { ConditionalRender, Footer, LikeButton } from "@/components";
// import { marvelApiClient } from "@/serices/marvel-api/api-client";
import { useQueries } from "@/libs";
import { useLoaderData } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { useFavoriteHeroes } from "@/hooks";
import { mockComicsResponse } from "./delete";
// import { getComicBy } from "@/services";

const INDEX_TO_FIRST_ITEM = 0;
const VOID_ARRAY_LENGTH = 0;

const TOTAL_COMICS_TO_SHOW = 10;
export function HeroPage() {
  const hero = useLoaderData() as Hero;
  const favorites = useFavoriteHeroes();

  const comics = useQueries({
    queries: hero?.comics.items
      .slice(INDEX_TO_FIRST_ITEM, TOTAL_COMICS_TO_SHOW)
      .map((comic) => ({
        queryKey: ["comic", comic.resourceURI],
        queryFn: async () => {
          // return getComicBy(comic.resourceURI);

          return mockComicsResponse;
        },
      })),
  });

  const lastComicReleaseDate = useMemo(() => {
    const flatComics = comics.map((comic) => comic.data);

    const dates = flatComics
      ?.filter((comic) => Boolean(comic!))
      ?.flatMap((comic) => comic!.dates)
      .filter((date) => date.type === "onsaleDate");

    if (!dates) return null;

    const sortedData = dates.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    const { date } = sortedData.at(INDEX_TO_FIRST_ITEM) ?? {};

    if (!date) return null;

    return new Date(date).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }, [comics]);

  const handleLikeChange = useCallback(
    (isChecked: boolean) => {
      if (isChecked) {
        favorites.actions.add(hero);
        return;
      }

      favorites.actions.remove(hero.id);
    },
    [favorites.actions, hero],
  );
  return (
    <div className={styles.hero_page_wrapper} data-text={hero?.name}>
      <div className={styles.container}>
        <main className={styles.hero_details}>
          <div>
            <div>
              <div className={styles.hero_details__name_wrapper}>
                <h1 className={styles.hero_details__name}>{hero?.name}</h1>
                <LikeButton
                  liked={favorites.actions.has(hero.id)}
                  onLikeChange={handleLikeChange}
                />
              </div>

              <p className={styles.hero_details__description}>
                {hero?.description ??
                  "Esse herói não tem descrição, mas é muito legal!"}
              </p>
            </div>

            <div>
              <div className={styles.hero_details__about_contents_numbers}>
                <span>
                  <span className={styles.hero_details__properties}>
                    Quadrinhos
                  </span>
                  <div className={styles.hero_details__properties_number}>
                    <img src="/assets/ic_quadrinhos.svg" alt="" />
                    <span>{hero?.comics.available}</span>
                  </div>
                </span>

                <span>
                  <span className={styles.hero_details__properties}>
                    Séries
                  </span>

                  <div className={styles.hero_details__properties_number}>
                    <img src="/assets/ic_trailer.svg" alt="" />
                    <span>{hero?.series.available}</span>
                  </div>
                </span>
              </div>

              <div className={styles.hero_details__rating}>
                <span className={styles.hero_details__rating__text}>
                  Rating:
                </span>
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
          </div>

          <div>
            <img
              src={`${hero?.thumbnail.path}.${hero?.thumbnail.extension}`}
              alt={hero?.name}
              className={styles.hero_details__image}
            />
          </div>
        </main>

        <div>
          <h2 className={styles.comics_title}>Últimos lançamentos</h2>
          <ConditionalRender
            condition={comics.length > VOID_ARRAY_LENGTH}
            Otherwise={<h3>Não há quadrinhos...</h3>}>
            <ul className={styles.comics_wrapper}>
              {comics.map(({ data: comic, isLoading }) => (
                <ConditionalRender
                  condition={!isLoading && !!comic}
                  key={`${comic?.title}-${hero?.name}`}>
                  <li>
                    <div className={styles.comic_card}>
                      <img
                        src={`${comic?.thumbnail.path}.${comic?.thumbnail.extension}`}
                        alt={comic?.title}
                        width={155}
                        height={185}
                      />
                      <span className={styles.comic_card__title}>
                        {comic?.title}
                      </span>
                    </div>
                  </li>
                </ConditionalRender>
              ))}
            </ul>
          </ConditionalRender>
        </div>
      </div>

      <Footer />
    </div>
  );
}
