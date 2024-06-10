import { ErrorBoundary } from "@/components";
import { HeroPage, Homepage } from "@/pages";

import { ReactQueryProvider } from "./libs";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { getCharacterById } from "./services";
import { mockHero } from "./delete";

const routes = createBrowserRouter([
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

      // const { data } = await getCharacterById(+params.heroId);

      const { data } = mockHero;

      const [hero] = data.results;

      return hero;
    },
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);

export default function App() {
  return (
    <ErrorBoundary>
      <ReactQueryProvider>
        <RouterProvider router={routes} />
      </ReactQueryProvider>
    </ErrorBoundary>
  );
}
