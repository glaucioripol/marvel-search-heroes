import {
  describe,
  it,
  expect,
  beforeEach,
  defaultRender,
  screen,
} from "@/__tests__";

import { PresentationSection } from "./presentation-section";

describe("PresentationSection component", () => {
  let component: ReturnType<typeof defaultRender>;

  beforeEach(() => {
    component = defaultRender(<PresentationSection />);
  });

  it("should render title correctly", () => {
    const titleElement = screen.getByTestId("presentation-title");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.textContent).toBe("explore o universo");
  });

  it("should render description correctly", () => {
    const descriptionElement = screen.getByTestId("presentation-description");
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement.textContent).deep.equal(
      "Mergulhe no domínio deslumbrante de todos os personagens clássicos que você ama - e aqueles que você descobrirá em breve!",
    );
  });

  it("should match snapshot", () => {
    expect(component.asFragment()).toMatchSnapshot();
  });
});
