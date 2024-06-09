import { ErrorBoundary } from "@/components";
import { Homepage } from "@/pages";

export default function App() {
  return (
    <ErrorBoundary>
      <Homepage />;
    </ErrorBoundary>
  );
}
