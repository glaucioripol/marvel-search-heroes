import {
  defaultRender,
  describe,
  expect,
  fireEvent,
  it,
  vi,
  screen,
  beforeEach,
} from "@/__tests__";
import { ShowJustFavoritesButton } from "./show-just-favorites-button";
import styles from "./show-just-favorites-button.module.css";

describe("ShowJustFavoritesButton", () => {
  let onClickMock = vi.fn();

  beforeEach(() => {
    onClickMock = vi.fn();
  });

  const renderSUT = (isActive: boolean, disabled = false) => {
    const utils = defaultRender(
      <ShowJustFavoritesButton
        isActive={isActive}
        onClick={onClickMock}
        disabled={disabled}
      />,
    );

    const button = screen.getByTestId("just-liked-button");

    return { ...utils, button };
  };

  it("renders without crashing", () => {
    renderSUT(false);
    expect(screen.getByTestId("just-liked-button")).toBeInTheDocument();
  });

  it("renders with correct initial state", () => {
    const { button, asFragment } = renderSUT(false);
    expect(button).toHaveAttribute("aria-label", "Exibir somente favoritos");
    expect(button).toHaveAttribute("title", "Exibir somente favoritos");
    expect(button).toHaveClass(styles.just_liked_button);
    expect(asFragment()).toMatchSnapshot();
  });

  it("calls onClick when clicked", () => {
    const { button } = renderSUT(false);
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledWith(true);
  });

  it("toggles state correctly on repeated clicks", () => {
    const { button } = renderSUT(true);
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledWith(false);
  });

  it("changes attributes and class when clicked", () => {
    const { button, rerender, asFragment } = renderSUT(false);

    fireEvent.click(button);
    rerender(<ShowJustFavoritesButton isActive={true} onClick={onClickMock} />);

    expect(button).toHaveClass(styles["just_liked_button--active"]);
    expect(asFragment()).toMatchSnapshot();
  });

  it("disables button when disabled prop is true", () => {
    const { button } = renderSUT(false, true);
    expect(button).toBeDisabled();
    expect(button).toHaveClass(styles["just_liked_button--disabled"]);
  });

  describe("keyboard interactions", () => {
    it("calls onClick on space key press", () => {
      const { button } = renderSUT(false);
      fireEvent.keyDown(button, { key: " " });
      expect(onClickMock).toHaveBeenCalledWith(true);
    });

    it("calls onClick on Enter key press", () => {
      const { button } = renderSUT(false);
      fireEvent.keyDown(button, { key: "Enter" });
      expect(onClickMock).toHaveBeenCalledWith(true);
    });

    it("does not call onClick on other key press", () => {
      const { button } = renderSUT(false);
      fireEvent.keyDown(button, { key: "a" });
      expect(onClickMock).not.toHaveBeenCalled();
    });
  });
});
