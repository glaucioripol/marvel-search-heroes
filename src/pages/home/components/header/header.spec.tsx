import {
  defaultRender,
  screen,
  beforeAll,
  describe,
  expect,
  it,
} from "@/__tests__";
import { Header } from "./header";

describe("Header component", () => {
  let component: ReturnType<typeof defaultRender>;
  beforeAll(() => {
    component = defaultRender(<Header />);
  });

  it("should render without crashing", () => {
    expect(screen.getByTestId("header-logo")).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    expect(component.asFragment()).toMatchSnapshot();
  });
});
