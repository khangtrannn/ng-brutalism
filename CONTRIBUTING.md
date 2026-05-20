# Contributing

This is a solo project; PRs are welcome but expect a slow turnaround.

## Prerequisites

- Node 20.19+ or 22.12+
- pnpm 9+

## Common commands

```sh
pnpm install
pnpm nx serve docs
pnpm nx run-many -t lint test build --projects=ui,docs
pnpm nx affected -t lint test build
```

## Where things live

- `libs/ui/src/lib/` — components
- `apps/docs/` — docs site
- `docs/adr/` — architectural decisions
- `docs/plans/_archive/` — historical plans
- `docs/assets/` — README binaries
- `.github/workflows/` — CI

## Submitting changes

- Open an issue first for non-trivial changes
- Keep PRs focused: one component or one fix per PR
- Run `pnpm nx affected -t lint test build` locally before pushing
- Conventional Commits welcomed but not required
- No requirement on PR description format
- I review when I can; not every PR will land

## Conduct

Be kind, specific, and constructive. This project is early; clear bug
reports, focused pull requests, and respectful design feedback are welcome.
