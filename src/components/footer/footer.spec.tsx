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
  let component: ReturnType<typeof defaultRender>;

  beforeAll(() => {
    component = defaultRender(<Footer />);
  });

  it("should render without crashing", () => {
    expect(screen.getByText(/Feito com ❤️ por Gláucio/i)).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    expect(component.asFragment()).toMatchSnapshot();
  });
});
