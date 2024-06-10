import { ConditionalRenderProps } from "./conditional-render.types";

export function ConditionalRender({
  condition,
  children,
  Otherwise,
}: ConditionalRenderProps) {
  return <>{condition ? children : Otherwise}</>;
}
