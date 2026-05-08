/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './libs/ui/src/**/*.{html,ts}',
    './apps/docs/src/**/*.{html,ts}',
  ],
  safelist: [
    'border-[var(--nb-border)]',
    'focus-visible:outline-[var(--nb-focus-ring)]',
    'focus-visible:outline-offset-[var(--nb-focus-ring-offset)]',
    'active:translate-x-[var(--nb-shadow-offset-x)]',
    'active:translate-y-[var(--nb-shadow-offset-y)]',
  ],
  theme: {
    extend: {
      borderRadius: {
        nb: 'var(--nb-radius)',
      },
      borderWidth: {
        nb: 'var(--nb-border-width)',
      },
      boxShadow: {
        nb: 'var(--nb-shadow-offset-x) var(--nb-shadow-offset-y) 0 0 var(--nb-shadow)',
        'nb-pressed': '0 0 0 0 var(--nb-shadow)',
      },
      colors: {
        'nb-surface': 'var(--nb-surface)',
        'nb-surface-fg': 'var(--nb-surface-foreground)',
        'nb-primary': 'var(--nb-primary)',
        'nb-primary-fg': 'var(--nb-primary-foreground)',
        'nb-secondary': 'var(--nb-secondary)',
        'nb-secondary-fg': 'var(--nb-secondary-foreground)',
        'nb-danger': 'var(--nb-danger)',
        'nb-danger-fg': 'var(--nb-danger-foreground)',
      },
      height: {
        'nb-sm': 'var(--nb-size-sm)',
        'nb-md': 'var(--nb-size-md)',
        'nb-lg': 'var(--nb-size-lg)',
      },
    },
  },
};
