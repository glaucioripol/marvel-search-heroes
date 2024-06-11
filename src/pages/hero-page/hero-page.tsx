import styles from "./hero-page.module.css";

import { useHeroPage } from "./hooks";

import { Footer } from "@/components";

import { Comics, HeroSection, TopBar } from "./components";

export function HeroPage() {
  const {
    hero,
    favorites,
    comics,
    lastComicReleaseDate,
    handleLikeChange,
    handleSearch,
  } = useHeroPage();

  return (
    <div className={styles.hero_page_wrapper} data-text={hero?.name}>
      <TopBar handleSearch={handleSearch} />

      <div className={styles.container}>
        <HeroSection
          hero={hero}
          onLikeChange={handleLikeChange}
          isLiked={favorites.actions.has(hero.id)}
          lastComicReleaseDate={lastComicReleaseDate!}
        />

        <Comics comics={comics as never} hero={hero} />
      </div>

      <Footer />
    </div>
  );
}
