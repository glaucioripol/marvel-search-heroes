import {
  defaultRender,
  describe,
  expect,
  fireEvent,
  screen,
  test,
  vi,
} from "@/__tests__";

import { LikeButton } from "./like-button";

import styles from "./like-button.module.css";

describe("LikeButton", () => {
  const onLikeChangeMock = vi.fn();

  const renderSUT = (liked: boolean) => {
    const utils = defaultRender(
      <LikeButton liked={liked} onLikeChange={onLikeChangeMock} />,
    );

    const button = screen.getByTestId("like-button-default");

    return { ...utils, button };
  };

  test("renders without crashing", () => {
    renderSUT(false);

    expect(screen.getByTestId("like-button-default")).toBeInTheDocument();
  });

  test("renders with correct initial state", () => {
    const { button, asFragment } = renderSUT(false);

    expect(button).toHaveAttribute("aria-pressed", "false");
    expect(button).toHaveAttribute("data-liked", "false");
    expect(button).toHaveAttribute("aria-label", "Adicionar aos favoritos");
    expect(button).toHaveAttribute("title", "Adicionar aos favoritos");
    expect(button).toHaveClass(styles.like_button);

    expect(asFragment()).toMatchSnapshot();
  });

  test("changes state when clicked", () => {
    const { button } = renderSUT(false);

    fireEvent.click(button);

    expect(onLikeChangeMock).toHaveBeenCalledWith(true);
  });

  test("changes state back when clicked again", () => {
    const { button } = renderSUT(true);

    fireEvent.click(button);

    expect(onLikeChangeMock).toHaveBeenCalledWith(false);
  });

  test("changes aria-pressed and data-liked attributes when clicked", () => {
    const { button, rerender, asFragment } = renderSUT(false);

    expect(asFragment()).toMatchSnapshot();
    fireEvent.click(button);

    rerender(<LikeButton liked={true} onLikeChange={onLikeChangeMock} />);

    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(button).toHaveAttribute("data-liked", "true");
    expect(asFragment()).toMatchSnapshot();
  });

  test("changes aria-label and title attributes when clicked", () => {
    const { button, rerender, asFragment } = renderSUT(false);

    expect(asFragment()).toMatchSnapshot();
    fireEvent.click(button);

    rerender(<LikeButton liked={true} onLikeChange={onLikeChangeMock} />);

    expect(button).toHaveAttribute("aria-label", "Remover dos favoritos");
    expect(button).toHaveAttribute("title", "Remover dos favoritos");
    expect(asFragment()).toMatchSnapshot();
  });

  test("changes class when clicked", () => {
    const { button, rerender, asFragment } = renderSUT(false);

    fireEvent.click(button);

    rerender(<LikeButton liked={true} onLikeChange={onLikeChangeMock} />);

    expect(button).toHaveClass(styles["like_button--liked"]);

    expect(asFragment()).toMatchSnapshot();
  });
});
