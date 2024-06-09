export type GetCharactersParameters = Readonly<{
  name?: string;
  orderBy?: "name" | "-name" | "modified" | undefined;
  limit?: number;
  offset?: number;
}>;
