export type ShowJustFavoritesButtonProperties = Readonly<{
  isActive: boolean;
  onClick?: (value: boolean) => void;
  dataTestId?: string;
  disabled?: boolean;
}>;
