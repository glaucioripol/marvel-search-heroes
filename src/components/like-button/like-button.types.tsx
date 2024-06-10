export type LikeButtonProperties = Readonly<{
  liked: boolean;
  onLikeChange?: (liked: boolean) => void;
  dataTestId?: string;
}>;
