declare module 'shiki/dist/langs/*.mjs' {
  import type { LanguageInput } from 'shiki/core';

  const language: LanguageInput;
  export default language;
}

declare module 'shiki/dist/themes/*.mjs' {
  import type { ThemeInput } from 'shiki/core';

  const theme: ThemeInput;
  export default theme;
}
