import styles from "./top-bar.module.css";

import { Link } from "react-router-dom";

import { TopBarProperties } from "./top-bar.types";

import { SearchBar } from "../search-bar";

export function TopBar({ handleSearch }: TopBarProperties) {
  return (
    <header className={styles.top_bar}>
      <Link
        to="/"
        aria-label="Voltar para a página inicial"
        data-text="Voltar para a página inicial"
        title="Voltar para a página inicial">
        <img
          src="/assets/logo_menor.svg"
          alt="Texto escrito 'Marvel Search heroes', a parte escrito marvel está em vermelho e o restante em cinza escuro."
          data-testid="header-logo"
          width="215px"
          height="32px"
        />
      </Link>

      <SearchBar handleSearch={handleSearch} />
    </header>
  );
}
