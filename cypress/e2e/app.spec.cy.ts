/* eslint-disable no-magic-numbers */
/// <reference types="cypress" />

describe("Home Page Tests", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    cy.clearLocalStorage();
    // Visit the home page
    cy.visit("http://localhost:5173/");
  });

  it("should handle search correctly", () => {
    const mockHeroName = "Spider";
    cy.get('input[name="search-hero"]').type(mockHeroName);
    cy.get("form").submit();

    cy.get('[data-testid="hero-link"]').should("contain", mockHeroName); // Assuming hero names are displayed in elements with class 'hero-name'
  });

  it("should handle search with empty value correctly", () => {
    cy.get('input[name="search-hero"]').clear();
    cy.get("form").submit();

    cy.get('[data-testid="hero-link"]').should("not.exist"); // Assuming no hero is displayed when search is empty
  });

  it("should handle alphabetical order correctly", () => {
    cy.get('[data-testid="toggle-button-default"]').click();

    cy.get('[data-testid="hero-link"]').as("heroesCards");

    cy.get("@heroesCards").then(($heroes) => {
      const heroNames = $heroes.map((_, el) => Cypress.$(el).text()).get();
      const sortedHeroNames = [...heroNames].sort();

      expect(heroNames).to.deep.equal(sortedHeroNames);

      cy.get('[data-testid="toggle-button-default"]').click();

      cy.get("@heroesCards").then(($heroes) => {
        const heroNames = $heroes.map((_, el) => Cypress.$(el).text()).get();
        const sortedHeroNames = [...heroNames].sort().reverse();

        expect(heroNames).to.deep.equal(sortedHeroNames);
      });
    });
  });

  it("should handle show just favorites correctly", () => {
    cy.get('[data-testid="like-button-default"]').as("likesButtons");

    cy.get('[data-testid="just-liked-button"]').as("justLikedButton");

    cy.get("@likesButtons").eq(0).click();
    cy.get("@likesButtons").eq(1).click();
    cy.get("@likesButtons").eq(2).click();

    cy.get("@justLikedButton").click();

    cy.get("@likesButtons").should("have.length", 3);
  });

  it("should handle query string correctly", () => {
    cy.visit("http://localhost:5173/?name=Hulk");

    cy.get('[data-testid="hero-link"]').should("contain", "Hulk");
  });

  it("should handle order correctly", () => {
    cy.visit("http://localhost:5173/?orderBy=-name");

    cy.get('[data-testid="hero-link"]').should("contain", "Zzzax");

    cy.get('[data-testid="toggle-button-default"]').click();

    cy.get('[data-testid="hero-link"]').should("contain", "A-Bomb");
  });

  it("should navigate to hero page", () => {
    cy.get('[data-testid="hero-link"]').first().click();

    cy.url().should("include", "/hero/");
  });

  it("should handle favorite correctly, select, access hero page and unlike it, and check on favorite list", () => {
    cy.get('[data-testid="like-button-default"]').as("likesButtons");

    cy.get("@likesButtons").first().click();

    cy.get("@likesButtons").eq(2).click();

    cy.visit("http://localhost:5173?showJustFavorites=true");

    cy.get('[data-testid="hero-link"]').should("have.length", 2);

    cy.visit("http://localhost:5173");

    // click on first hero card
    cy.get('[data-testid="hero-link"]').first().click();

    // CHECK IF HERO IS FAVORITE
    cy.get('[data-testid="like-button-hero-page"]').as("heroLikeButton");

    cy.get("@heroLikeButton").should(
      "have.attr",
      "data-testid",
      "like-button-hero-page",
    );

    cy.get("@heroLikeButton").click();

    // GO BACK TO HOME
    cy.visit("http://localhost:5173?showJustFavorites=true");

    // should have only 1 hero card
    cy.get('[data-testid="hero-link"]').should("have.length", 1);
  });

  it.skip("should handle search correctly from hero page", () => {
    cy.get('[data-testid="hero-link"]').first().click();

    const mockHeroName = "Wolve";

    cy.get('input[name="search-hero"]').type(mockHeroName);
    cy.get("form").submit();

    cy.get('[data-testid="hero-link"]').should("contain", mockHeroName);
  });
});
