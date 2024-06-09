import { ErrorBoundary } from "@/components";
import { Homepage } from "@/pages";
import { ReactQueryProvider } from "./libs";

export default function App() {
  return (
    <ErrorBoundary>
      <ReactQueryProvider>
        <Homepage />
      </ReactQueryProvider>
    </ErrorBoundary>
  );
}
