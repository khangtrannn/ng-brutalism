// @ts-check
const tseslint = require('typescript-eslint');
const angular = require('@angular-eslint/eslint-plugin');
const angularTemplate = require('@angular-eslint/eslint-plugin-template');
const templateParser = require('@angular-eslint/template-parser');
const nx = require('@nx/eslint-plugin');

module.exports = tseslint.config(
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      '@nx': nx,
    },
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            // What a project IS: apps consume libs; libs never consume apps.
            { sourceTag: 'type:app', onlyDependOnLibsWithTags: ['type:ui', 'type:util'] },
            { sourceTag: 'type:ui', onlyDependOnLibsWithTags: ['type:ui', 'type:util'] },
            { sourceTag: 'type:util', onlyDependOnLibsWithTags: ['type:util'] },
            // Which product it belongs to: the published `ui` scope stays
            // self-contained; docs may reach into `ui`, never the reverse.
            { sourceTag: 'scope:ui', onlyDependOnLibsWithTags: ['scope:ui'] },
            { sourceTag: 'scope:docs', onlyDependOnLibsWithTags: ['scope:docs', 'scope:ui'] },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.ts'],
    extends: [...tseslint.configs.recommended],
    plugins: {
      '@angular-eslint': angular,
    },
    rules: {
      '@angular-eslint/no-input-rename': 'error',
      '@angular-eslint/no-output-rename': 'error',
      '@angular-eslint/use-lifecycle-interface': 'warn',
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: [
            'signature',
            ['#private-static-field', '#private-instance-field'],
            'field',
            'static-initialization',
            'constructor',
            ['#private-static-method', '#private-instance-method'],
            'method',
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    plugins: {
      '@angular-eslint/template': angularTemplate,
    },
    languageOptions: {
      parser: templateParser,
    },
    rules: {
      '@angular-eslint/template/banana-in-box': 'error',
      '@angular-eslint/template/no-negated-async': 'warn',
    },
  },
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.nx/**',
      'coverage/**',
      'tmp/**',
      '**/vite.config.*.timestamp*',
      '**/vitest.config.*.timestamp*',
      'libs/ui/api-guard/**',
    ],
  }
);
