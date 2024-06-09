import { ShowJustFavoritesButton, ToggleButton } from "@/components";

import styles from "./filters.module.css";

import { FiltersProperties } from "./filters.types";

export function Filters({
  totalItems,
  showJustFavorites,
  onAlphabeticalOrderChange,
  isAlphabeticalOrderEnabled,
  areThereFavoriteHeroes,
  onPressJustFavoriteButton,
}: FiltersProperties) {
  return (
    <div className={styles.filters} data-testid="filters-wrapper">
      <div>
        <span className={styles.filters__total_results}>
          Encontrados {totalItems} heróis
        </span>
      </div>

      <div className={styles.filters__actions}>
        <div className="text_with_icon">
          <img
            src="/assets/ic_heroi.svg"
            alt="Desenho que representa um herói, uma pessoa de capa, com a mão na cintura e todo o desenho é em vermelho."
            title="Desenho que representa um herói, uma pessoa de capa, com a mão na cintura e todo o desenho é em vermelho."
            width={18}
            height={27}
          />

          <span>Ordenar por nome - A/Z</span>
        </div>

        <div>
          <ToggleButton
            isChecked={isAlphabeticalOrderEnabled}
            onChange={onAlphabeticalOrderChange}
          />
        </div>

        <div>
          <ShowJustFavoritesButton
            isActive={showJustFavorites}
            onClick={onPressJustFavoriteButton}
            disabled={!areThereFavoriteHeroes}
          />
        </div>
      </div>
    </div>
  );
}
