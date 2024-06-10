import styles from "./search-bar.module.css";

import { SearchBarProperties } from "./search-bar.types";

export function SearchBar({
  disabled,
  handleSearch,
  inputValue,
}: SearchBarProperties) {
  return (
    <div className={styles.search} data-testid="search-bar-wrapper">
      <form
        className={styles.search__form}
        data-testid="search-form"
        onSubmit={handleSearch}>
        <button
          data-testid="search-button"
          className={styles.search__button}
          type="submit"
          aria-label="Buscar por heróis"
          title="Buscar por heróis"
          disabled={disabled}>
          <img src="/assets/ic_busca.svg" alt="" width={29} height={29} />
        </button>

        <input
          className={styles.search__input}
          type="search"
          aria-label="Procure por heróis"
          title="Procure por heróis"
          placeholder="Procure por heróis"
          data-testid="search-input"
          name="search-hero"
          maxLength={120}
          disabled={disabled}
          defaultValue={inputValue}
        />
      </form>
    </div>
  );
}
