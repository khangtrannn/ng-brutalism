export type NbTokenStyleTransform<TToken> = (
  token: TToken | null | undefined,
) => string | null;

export function nbTokenStyleTransform<TToken>(
  transform: (token: TToken) => string,
): NbTokenStyleTransform<TToken> {
  return (token) => (token == null ? null : transform(token));
}