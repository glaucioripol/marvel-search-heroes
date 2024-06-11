import { createBrowserRouter } from "react-router-dom";

import { getCharacterById } from "./services";
import { HeroPage, Homepage } from "./pages";

export const routes = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  {
    path: "/hero/:heroId",
    element: <HeroPage />,
    errorElement: (
      <div>
        <h2>
          Herói não encontrado. <br />
        </h2>
      </div>
    ),
    loader: async ({ params }) => {
      if (!params.heroId) {
        return null;
      }

      const { data } = await getCharacterById(+params.heroId);

      const [hero] = data.results;

      return hero;
    },
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);
