# Padronizadores de código e qualidade

Para um código limpo e de qualidade, é importante que o código siga um padrão de escrita e que seja verificado por ferramentas de qualidade. Neste projeto, utilizaremos as seguintes ferramentas para garantir a qualidade do código:

## Ferramenta para definir versão do node.js

- [x] [nvm](https://github.com/coreybutler/nvm-windows) - Para gerenciar as versões do node.js.

## Ferramentas que usam node.js

- [x] [ESLint](https://eslint.org/): Linter de JavaScript e TypeScript.
- [x] [Prettier](https://prettier.io/): Formatador de código.
- [x] [Husky](https://typicode.github.io/husky): Para rodar os scripts de lint e format antes de cada commit e push.
- [x] [git-commit-msg-linter](https://github.com/legend80s/git-commit-msg-linter/blob/master/assets/docs.md#commitlinterrcjson) para padronizar commits com [Conventional Commits](https://www.conventionalcommits.org/).

## Ferramentas que usam o editor

Atualmente Faço uso do Visual Studio Code, então as extensões que utilizo para me ajudar a manter a qualidade do código e padronizações são:

- [x] [EditorConfig](https://editorconfig.org/): Padronizador de configurações de editor.
  - [VSCode](https://code.visualstudio.com/):
    - Extensão [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig).
- [x] [ESLint](https://eslint.org/):
  - Extensão [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).
- [x] [Prettier](https://prettier.io/):
  - Extensão [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).
- [x] [SonarLint](https://www.sonarlint.org/): Analisador de código.
  - Extensão [SonarLint](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode).

Estão definidas no arquivo `.vscode/extensions.json` do repositório, para que ao abrir o projeto no Visual Studio Code, ele sugira a instalação das extensões.
