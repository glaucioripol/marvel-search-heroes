export type FiltersProperties = Readonly<{
  totalItems: number;
  showJustFavorites: boolean;
  onPressJustFavoriteButton: () => void;
  onAlphabeticalOrderChange: (isChecked: boolean) => void;
  isAlphabeticalOrderEnabled: boolean;
  areThereFavoriteHeroes: boolean;
}>;
