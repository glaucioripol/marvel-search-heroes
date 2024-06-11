import styles from "./home.module.css";

import { ConditionalRender, Footer } from "@/components";

import {
  Filters,
  Header,
  HeroCard,
  PresentationSection,
  SearchBar,
} from "./components";
import { useHomePage } from "./hooks";
import { Link } from "react-router-dom";

const VOID_ARRAY_LENGTH = 0;

export function Homepage() {
  const {
    showJustFavorites,
    characters,
    favoriteHeroes,
    resultsFiltered,
    total,
    handleSearch,
    handleAlphabeticalOrder,
    isAlphabeticalOrderEnabled,
    handleShowJustFavorites,
    handleFavorite,
    filters,
  } = useHomePage();

  return (
    <div>
      <Header />

      <PresentationSection />

      <SearchBar handleSearch={handleSearch} inputValue={filters.name} />

      <main className={styles.container} data-testid="main-content">
        <Filters
          totalItems={total}
          showJustFavorites={showJustFavorites}
          onAlphabeticalOrderChange={handleAlphabeticalOrder}
          isAlphabeticalOrderEnabled={isAlphabeticalOrderEnabled}
          areThereFavoriteHeroes={favoriteHeroes.areThereFavoriteHeroes}
          onPressJustFavoriteButton={handleShowJustFavorites}
        />

        <ConditionalRender
          condition={!characters.states.isLoading}
          Otherwise={<h2>Carregando...</h2>}>
          <ConditionalRender
            condition={resultsFiltered.length > VOID_ARRAY_LENGTH}
            Otherwise={<h2>Nenhum herói encontrado</h2>}>
            <ul className={styles.cards}>
              {resultsFiltered.map((hero) => (
                <li key={hero.id}>
                  <Link to={`/hero/${hero.id}`} data-testid="hero-link">
                    <HeroCard
                      hero={hero}
                      isLiked={favoriteHeroes.actions.has(hero.id)}
                      handleFavorite={handleFavorite}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </ConditionalRender>
        </ConditionalRender>
      </main>

      <Footer />
    </div>
  );
}
