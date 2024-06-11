import styles from "./search-bar.module.css";

import { useCallback } from "react";

import { SearchBarProperties } from "./search-bar.types";

export function SearchBar({ handleSearch, disabled }: SearchBarProperties) {
  const handleOnSearch = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const search = new FormData(event.currentTarget);
      const value = search.get("search-hero") as string;

      handleSearch?.(value);
    },
    [handleSearch],
  );

  return (
    <div className={styles.search} data-testid="search-bar-wrapper">
      <form
        className={styles.search__form}
        data-testid="search-form"
        onSubmit={handleOnSearch}>
        <button
          data-testid="search-button"
          className={styles.search__button}
          type="submit"
          aria-label="Buscar por heróis"
          title="Buscar por heróis"
          disabled={disabled}>
          <img
            src="/assets/ic_busca.svg"
            alt="Ícone de uma lupa representando a busca."
            width={22}
            height={22}
          />
        </button>

        <input
          className={styles.search__input}
          type="search"
          aria-label="Procure por heróis"
          title="Procure por heróis"
          placeholder="Procure por heróis (Eu funciono de verdade!)"
          data-testid="search-input"
          name="search-hero"
          maxLength={120}
          disabled={disabled}
          required
        />
      </form>
    </div>
  );
}
