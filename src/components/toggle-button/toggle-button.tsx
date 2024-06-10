import styles from "./toggle-button.module.css";

import { KeyboardEvent, useCallback, useMemo } from "react";
import { ToggleButtonProperties } from "./toggle-button.types";

const DEFAULT_TAB_INDEX = 0;

export function ToggleButton({
  isChecked,
  onChange,
  tabIndex = DEFAULT_TAB_INDEX,
  dataTestId = "toggle-button-default",
}: ToggleButtonProperties) {
  const [currentTitle, currentClassName] = useMemo(() => {
    const title = isChecked ? "Desativar" : "Ativar";

    const className = [
      styles.toggle_button,
      isChecked ? styles["toggle_button--active"] : "",
    ].join(" ");

    return [title, className];
  }, [isChecked]);

  const handleToggle = useCallback(
    () => void onChange?.(!isChecked),
    [isChecked, onChange],
  );

  const handleKeyPress = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();

      const eventsToListen = [" ", "Enter"];

      if (eventsToListen.includes(event.key)) {
        handleToggle();
      }
    },
    [handleToggle],
  );

  return (
    <div
      role="checkbox"
      data-testid={dataTestId}
      aria-labelledby={currentTitle}
      className={currentClassName}
      aria-checked={isChecked}
      aria-label={currentTitle}
      title={currentTitle}
      tabIndex={tabIndex}
      onClick={handleToggle}
      onKeyDown={handleKeyPress}
    />
  );
}
