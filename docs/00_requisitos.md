# Objetivo

Desenvolver uma aplicação de listagem e detalhe de personagens de quadrinhos.

## Requisitos

- [x] Deve ser uma SPA “single page application” (dar preferencia ao react );
- [x] Não utilizar bibliotecas de UI como:
  - bootstrap;
  - semantic-ui;
  - antdesign;
- [x] Utilizar api da Marvel ( https://developer.marvel.com/docs );
- [x] Disponibilizar em uma URL pública do projeto rodando para avaliação;
- [x] Disponibilizar código em repositório Git de sua preferência, "commitando" cada fase do seu processo de desenvolvimento;
- [x] Seguir layout em [link](./Telas/home.png), respeitando as páginas, features e componentes ( não será avaliado “pixel perfect” ).

## Requisitos funcionais

- [x] Página de listagem de personagens (home):

  - [x] Exibir os 20 primeiros resultados da API;
  - [x] Permitir ordenação por nome do personagem;
  - [x] Permitir filtrar por nome, pelo campo de busca;
  - [x] Permitir mostrar apenas os personagens favoritos;
  - [x] Permitir o usuário favoritar/desfavoritar até 5 personagens;
  - [x] Permitir o usuário navegar para a página de detalhe do personagem.
  - [ ] Permitir mudar a quantidade de itens por página.
  - [ ] permitir paginar a lista de personagens.

- [x] Página de detalhe do personagem:
  - [x] Exibir dados do personagem;
  - [x] Exibir últimos 10 quadrinhos lançados deste personagem (onSaleDate);
  - [x] Permitir o usuário favoritar/desfavoritar (dentro do limite de 5).

## Bônus (não obrigatório)

- [ ] Adicionar paginação a listagem para exibir além dos 20 personagens iniciais;
- [x] Persistir os dados de favoritos (para manter os dados após o reload da página);
- [ ] Layout responsivo;
- [x] Utilização de ES6+;
- [x] Utilização de ferramentas para garantir a qualidade do código;
- [ ] Teste e2e;
- [x] CI/CD.
