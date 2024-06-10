export type ToggleButtonProperties = Readonly<{
  isChecked: boolean;
  onChange?: (isChecked: boolean) => void;
  tabIndex?: number;
  dataTestId?: string;
}>;
