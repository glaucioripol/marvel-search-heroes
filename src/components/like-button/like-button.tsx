import styles from "./like-button.module.css";

import { MouseEvent, useCallback, useMemo } from "react";

import { LikeButtonProperties } from "./like-button.types";

export function LikeButton({
  liked,
  onLikeChange,
  dataTestId = "like-button-default",
}: LikeButtonProperties) {
  const [currentTitle, currentClassName] = useMemo(() => {
    const title = liked ? "Remover dos favoritos" : "Adicionar aos favoritos";

    const className = [
      styles.like_button,
      liked ? styles["like_button--liked"] : "",
    ].join(" ");

    return [title, className];
  }, [liked]);

  const handleOnClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();

      onLikeChange?.(!liked);
    },
    [liked, onLikeChange],
  );

  return (
    <button
      type="button"
      aria-pressed={liked}
      data-liked={liked}
      aria-label={currentTitle}
      title={currentTitle}
      className={currentClassName}
      onClick={handleOnClick}
      data-testid={dataTestId}
    />
  );
}
