import styles from "./header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <img
        className={styles.header__logo}
        src="/assets/logo.svg"
        alt="Texto escrito 'Marvel Search heroes', a parte escrito marvel está em vermelho e o restante em cinza escuro."
        loading="lazy"
        data-testid="header-logo"
      />
    </header>
  );
}
