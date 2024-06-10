import {
  defaultRender,
  screen,
  beforeAll,
  describe,
  expect,
  it,
} from "@/__tests__";
import { Footer } from "./footer";

describe("Footer component", () => {
  beforeAll(() => {
    defaultRender(<Footer />);
  });

  it("should render without crashing", () => {
    expect(screen.getByText(/Feito com ❤️ por Gláucio/i)).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    expect(screen).toMatchSnapshot();
  });
});
