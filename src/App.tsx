import { ErrorBoundary } from "@/components";

import { ReactQueryProvider } from "./libs";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";

export default function App() {
  return (
    <ErrorBoundary>
      <ReactQueryProvider>
        <RouterProvider router={routes} />
      </ReactQueryProvider>
    </ErrorBoundary>
  );
}
