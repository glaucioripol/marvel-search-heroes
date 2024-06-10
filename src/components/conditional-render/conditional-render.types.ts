import { PropsWithChildren } from "react";

export type ConditionalRenderProps = PropsWithChildren<{
  condition: boolean;
  Otherwise?: PropsWithChildren["children"];
}>;
