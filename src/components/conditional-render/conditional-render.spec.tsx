import { describe, expect, it, defaultRender, screen } from "@/__tests__";

import { ConditionalRender } from "./conditional-render";

describe("conditional-render", () => {
  it("Should render the children because the condition is true", () => {
    const textContentMocked = "Aloou";
    defaultRender(
      <ConditionalRender condition>
        <h1 data-testid={textContentMocked}>{textContentMocked}</h1>
      </ConditionalRender>,
    );

    const element = screen.getByTestId(textContentMocked);

    expect(element).toBeTruthy();

    expect(element.textContent).toBe(textContentMocked);
  });

  it("Should not render the children because the condition is false", () => {
    const textContentMocked = "Aloou";
    defaultRender(
      <ConditionalRender condition={false}>
        <h1 data-testid={textContentMocked}>{textContentMocked}</h1>
      </ConditionalRender>,
    );

    const element = screen.queryByTestId(textContentMocked);

    expect(element).toBeFalsy();
  });
});
