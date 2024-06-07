import styles from "./home.module.css";

export function Homepage() {
  return (
    <div>
      <header className={styles.header}>
        <img
          className={styles.header__logo}
          src="/assets/logo.svg"
          alt="Texto escrito 'Marvel Search heroes', a parte escrito marvel está em vermelho e o restante em cinza escuro."
          loading="lazy"
          data-testid="header-logo"
        />
      </header>

      <section className={styles.presentation_section}>
        <h1
          className={styles.presentation_section__title}
          data-testid="presentation-title">
          explore o universo
        </h1>

        <p
          className={styles.presentation_section__description}
          data-testid="presentation-description">
          Mergulhe no domínio deslumbrante de todos os personagens clássicos que
          você ama - e aqueles que você descobrirá em breve!{" "}
        </p>
      </section>

      <div className={styles.search} data-testid="search-bar-wrapper">
        <form
          className={styles.search__form}
          data-testid="search-form"
          onSubmit={(event) => {
            event.preventDefault();
          }}>
          <button
            data-testid="search-button"
            className={styles.search__button}
            type="submit"
            aria-label="Buscar por heróis"
            title="Buscar por heróis">
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
          />
        </form>
      </div>

      <div className={styles.filters} data-testid="filters-wrapper">
        <div>
          <span className={styles.filters__total_results}>
            Encontrados 20 heróis
          </span>
        </div>

        <div className={styles.filters__actions}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <img src="/assets/ic_heroi.svg" alt="" />
            Ordenar por nome - A/Z
            <img src="/assets/toggle_off.svg" alt="" />
          </div>
          <div>
            <button type="button">
              <img src="/assets/favorito_01.svg" alt="" />
              Somente favoritos
            </button>
          </div>
        </div>
      </div>

      <main></main>
    </div>
  );
}
