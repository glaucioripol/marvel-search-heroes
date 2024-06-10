import {
  defaultRender,
  fireEvent,
  vi,
  describe,
  expect,
  it,
} from "@/__tests__";

import { HeroCard } from "./hero-card";
import { HeroCardProperties } from "./hero-card.types";

import mockResponse from "@/__fixtures__/characters_default_request.json";

const INDEX_OF_FIRST_HERO = 0;
describe("HeroCard component", () => {
  const mockHero = mockResponse.data.results[INDEX_OF_FIRST_HERO];

  const sutHeroCard = (
    defaultProperties = {
      hero: mockHero,
      isLiked: false,
      handleFavorite: vi.fn(),
    } as HeroCardProperties,
  ) => {
    const renderedComponent = defaultRender(
      <HeroCard {...defaultProperties} />,
    );

    return {
      ...renderedComponent,
      handleFavoriteMock: defaultProperties.handleFavorite,
    };
  };

  it("should render hero name correctly", () => {
    const { getByText } = sutHeroCard();
    const titleElement = getByText(mockHero.name);
    expect(titleElement).toBeInTheDocument();
  });

  it("should render hero image correctly", () => {
    const { getByAltText } = sutHeroCard();
    const imageElement = getByAltText(
      `Imagem do personagem ${mockHero.name}, não é possível detalhar muito por ser algo dinâmico.`,
    ) as HTMLImageElement;
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.src).toBe(
      `${mockHero.thumbnail.path}.${mockHero.thumbnail.extension}`,
    );
  });

  it("should call handleFavorite when like button is clicked", () => {
    const { getByTestId, handleFavoriteMock } = sutHeroCard();
    const likeButton = getByTestId("like-button-default");
    fireEvent.click(likeButton);
    expect(handleFavoriteMock).toHaveBeenCalled();
  });

  it("should match snapshot", () => {
    const { asFragment } = sutHeroCard();
    expect(asFragment()).toMatchSnapshot();
  });
});
