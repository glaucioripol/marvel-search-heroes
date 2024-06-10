import {
  defaultRender,
  describe,
  expect,
  fireEvent,
  it,
  vi,
} from "@/__tests__";
import { SearchBar } from "../search-bar";

describe("SearchBar", () => {
  const sutSearchBar = (isDisabled = false) => {
    const handleSearch = vi.fn();

    const searchBarRendered = defaultRender(
      <SearchBar disabled={isDisabled} handleSearch={handleSearch} />,
    );

    return {
      ...searchBarRendered,
      handleSearchMock: handleSearch,
    };
  };

  it("renders correctly", () => {
    const { getByTestId } = sutSearchBar();
    expect(getByTestId("search-bar-wrapper")).toBeInTheDocument();
  });

  it("has search button and input field", () => {
    const { getByTestId } = sutSearchBar();

    expect(getByTestId("search-button")).toBeInTheDocument();
    expect(getByTestId("search-input")).toBeInTheDocument();
    expect(getByTestId("search-bar-wrapper")).toMatchSnapshot();
  });

  it("disables search button and input field when disabled prop is true", () => {
    const { getByTestId } = sutSearchBar(true);
    expect(getByTestId("search-button")).toBeDisabled();
    expect(getByTestId("search-input")).toBeDisabled();
    expect(getByTestId("search-bar-wrapper")).toMatchSnapshot();
  });

  it("calls handleSearch function when form is submitted", () => {
    const { getByTestId, handleSearchMock } = sutSearchBar();

    const mockedData = { value: "spider" };
    fireEvent.change(getByTestId("search-input"), {
      target: mockedData,
    });

    fireEvent.submit(getByTestId("search-form"));

    // will call handleSearchMock with "spider" as argument the field called search-hero
    expect(handleSearchMock).toHaveBeenCalledWith(
      expect.objectContaining({
        target: getByTestId("search-form"),
      }),
    );

    // check value of input
    expect(getByTestId("search-input")).toHaveValue("spider");

    expect(getByTestId("search-bar-wrapper")).toMatchSnapshot();
  });
});
