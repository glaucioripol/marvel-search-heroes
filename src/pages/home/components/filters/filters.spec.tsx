import {
  defaultRender,
  fireEvent,
  vi,
  describe,
  expect,
  it,
} from "@/__tests__";

import { Filters } from "./filters";
import { FiltersProperties } from "./filters.types";

const defaultProperties = () =>
  ({
    totalItems: 10,
    showJustFavorites: false,
    onAlphabeticalOrderChange: vi.fn(),
    isAlphabeticalOrderEnabled: false,
    areThereFavoriteHeroes: false,
    onPressJustFavoriteButton: vi.fn(),
  }) as FiltersProperties;

describe("Filters component", () => {
  const sutFilters = (customProperties = {} as Partial<FiltersProperties>) => {
    const currentDefaultProperties = defaultProperties();
    const props = { ...currentDefaultProperties, ...customProperties };
    const renderedComponent = defaultRender(<Filters {...props} />);

    return {
      ...renderedComponent,
      onAlphabeticalOrderChangeMock:
        props.onAlphabeticalOrderChange ??
        currentDefaultProperties.onAlphabeticalOrderChange,
      onPressJustFavoriteButtonMock:
        props.onPressJustFavoriteButton ??
        currentDefaultProperties.onAlphabeticalOrderChange,
    };
  };

  it("should render total items correctly", () => {
    const { getByText } = sutFilters();
    const totalItemsElement = getByText(
      `Encontrados ${defaultProperties().totalItems} heróis`,
    );
    expect(totalItemsElement).toBeInTheDocument();
  });

  it("should call onAlphabeticalOrderChange when toggle button is clicked", () => {
    const { getByRole, onAlphabeticalOrderChangeMock } = sutFilters();
    const toggleButton = getByRole("checkbox");
    fireEvent.click(toggleButton);
    expect(onAlphabeticalOrderChangeMock).toHaveBeenCalled();
  });

  it("should call onPressJustFavoriteButton when show just favorites button is clicked", () => {
    const { getByTestId, onPressJustFavoriteButtonMock } = sutFilters({
      areThereFavoriteHeroes: true,
    });
    const showJustFavoritesButton = getByTestId("just-liked-button");
    fireEvent.click(showJustFavoritesButton);
    expect(onPressJustFavoriteButtonMock).toHaveBeenCalled();
  });

  it("should match snapshot", () => {
    const { asFragment } = sutFilters();
    expect(asFragment()).toMatchSnapshot();
  });
});
