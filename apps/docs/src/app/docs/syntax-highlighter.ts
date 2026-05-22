import { createHighlighterCore, type HighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import angularHtml from 'shiki/dist/langs/angular-html.mjs';
import angularTs from 'shiki/dist/langs/angular-ts.mjs';
import bash from 'shiki/dist/langs/bash.mjs';
import css from 'shiki/dist/langs/css.mjs';
import html from 'shiki/dist/langs/html.mjs';
import json from 'shiki/dist/langs/json.mjs';
import typescript from 'shiki/dist/langs/typescript.mjs';
import nord from 'shiki/dist/themes/nord.mjs';

export type HighlightLanguage =
  | 'html'
  | 'angular-html'
  | 'angular-ts'
  | 'typescript'
  | 'ts'
  | 'bash'
  | 'shell'
  | 'json'
  | 'css';

const THEME = 'nord';
const LANG_ALIASES: Partial<Record<HighlightLanguage, string>> = {
  shell: 'bash',
  ts: 'typescript',
};

let highlighterPromise: Promise<HighlighterCore> | null = null;

function getHighlighter(): Promise<HighlighterCore> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterCore({
      themes: [nord],
      langs: [html, angularHtml, angularTs, typescript, bash, json, css],
      engine: createJavaScriptRegexEngine(),
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
    lang: LANG_ALIASES[language] ?? language,
    theme: THEME,
  });
}
