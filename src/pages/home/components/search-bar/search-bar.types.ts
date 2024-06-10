import { FormEvent } from "react";

export type SearchBarProperties = Readonly<{
  handleSearch: (event: FormEvent<HTMLFormElement>) => void;
  disabled?: boolean;
  inputValue?: string;
}>;
