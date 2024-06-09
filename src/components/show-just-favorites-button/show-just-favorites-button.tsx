import styles from "./show-just-favorites-button.module.css";

import { KeyboardEvent, MouseEvent, useCallback, useMemo } from "react";

import { ShowJustFavoritesButtonProperties } from "./show-just-favorites-button.types";

export function ShowJustFavoritesButton({
  isActive,
  onClick,
  dataTestId = "just-liked-button",
  disabled = false,
}: ShowJustFavoritesButtonProperties) {
  const currentClassName = useMemo(
    () =>
      [
        styles.just_liked_button,
        "text_with_icon",
        isActive ? styles["just_liked_button--active"] : "",
        disabled ? styles["just_liked_button--disabled"] : "",
      ].join(" "),
    [disabled, isActive],
  );

  const handleOnClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();

      onClick?.(!isActive);
    },
    [isActive, onClick],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();

      const eventsToListen = [" ", "Enter"];

      if (eventsToListen.includes(event.key)) {
        onClick?.(!isActive);
      }
    },
    [isActive, onClick],
  );

  return (
    <button
      type="button"
      onClick={handleOnClick}
      onKeyDown={handleKeyDown}
      data-testid={dataTestId}
      aria-label="Exibir somente favoritos"
      title="Exibir somente favoritos"
      className={currentClassName}
      disabled={disabled}>
      <img
        src="/assets/favorito_01.svg"
        alt="Imagem de um coração, representando um favorito."
        width={18}
        height={18}
      />
      <span>Somente favoritos</span>
    </button>
  );
}
