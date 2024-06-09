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
import { ToggleButton } from "./toggle-button";
import styles from "./toggle-button.module.css";

describe("ToggleButton", () => {
  let onChangeMock = vi.fn();

  beforeEach(() => {
    onChangeMock = vi.fn();
  });

  const renderSUT = (checked: boolean) => {
    const utils = defaultRender(
      <ToggleButton isChecked={checked} onChange={onChangeMock} />,
    );

    const button = screen.getByTestId("toggle-button-default");

    return { ...utils, button };
  };

  it("renders without crashing", () => {
    renderSUT(false);
    expect(screen.getByTestId("toggle-button-default")).toBeInTheDocument();
  });

  it("renders with correct initial state", () => {
    const { button, asFragment } = renderSUT(false);
    expect(button).toHaveAttribute("aria-checked", "false");
    expect(button).toHaveAttribute("data-testid", "toggle-button-default");
    expect(button).toHaveAttribute("aria-label", "Ativar");
    expect(button).toHaveAttribute("title", "Ativar");
    expect(button).toHaveClass(styles.toggle_button);
    expect(asFragment()).toMatchSnapshot();
  });

  it("changes state when clicked", () => {
    const { button } = renderSUT(false);
    fireEvent.click(button);
    expect(onChangeMock).toHaveBeenCalledWith(true);
  });

  it("toggles state correctly on repeated clicks", () => {
    const { button } = renderSUT(true);
    fireEvent.click(button);
    expect(onChangeMock).toHaveBeenCalledWith(false);
  });

  it("changes attributes and class when clicked", () => {
    const { button, rerender, asFragment } = renderSUT(false);

    fireEvent.click(button);
    rerender(<ToggleButton isChecked={true} onChange={onChangeMock} />);

    expect(button).toHaveAttribute("aria-checked", "true");
    expect(button).toHaveAttribute("aria-label", "Desativar");
    expect(button).toHaveAttribute("title", "Desativar");
    expect(button).toHaveClass(styles["toggle_button--active"]);
    expect(asFragment()).toMatchSnapshot();
  });

  describe("keyboard interactions", () => {
    it("calls handleToggle on space key press", () => {
      const { button } = renderSUT(false);
      fireEvent.keyDown(button, { key: " " });
      expect(onChangeMock).toHaveBeenCalledWith(true);
    });

    it("calls handleToggle on Enter key press", () => {
      const { button } = renderSUT(false);
      fireEvent.keyDown(button, { key: "Enter" });
      expect(onChangeMock).toHaveBeenCalledWith(true);
    });

    it("does not call handleToggle on other key press", () => {
      const { button } = renderSUT(false);
      fireEvent.keyDown(button, { key: "a" });
      expect(onChangeMock).not.toHaveBeenCalled();
    });
  });
});
