import { createHighlighter, type Highlighter } from 'shiki';

export type HighlightLanguage =
  | 'html'
  | 'angular-html'
  | 'angular-ts'
  | 'typescript'
  | 'ts'
  | 'tsx'
  | 'bash'
  | 'shell'
  | 'json'
  | 'css';

const THEME = 'nord';
const LANGS: HighlightLanguage[] = [
  'html',
  'angular-html',
  'angular-ts',
  'typescript',
  'tsx',
  'bash',
  'json',
  'css',
];

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [THEME],
      langs: LANGS,
    });
  }
  return highlighterPromise;
}

export async function highlightCode(
  code: string,
  language: HighlightLanguage = 'html',
): Promise<string> {
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code, {
    lang: language,
    theme: THEME,
  });
}
