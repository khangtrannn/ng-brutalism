# Release Runbook — `@ng-brutalism/ui`

Step-by-step checklist for every npm release. Run steps in order; each line is
a gate for the next.

---

## 1. Update CHANGELOG.md

In `CHANGELOG.md` at the repo root:

1. Rename `## [Unreleased]` → `## [0.x.y] — YYYY-MM-DD`
2. Add a new empty `## [Unreleased]` block above it
3. Keep the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) section
   headings: `Added`, `Changed`, `Fixed`, `Removed`, `Breaking Changes`

---

## 2. Bump version

Edit `libs/ui/package.json`:

```
"version": "0.x.y"
```

Versioning rules (pre-1.0, semantic versioning applies loosely):

| Change type | Bump |
|---|---|
| Bug fix, metadata only (keywords, description, docs) | patch (`0.1.1` → `0.1.2`) |
| New component or API addition, no breakage | minor (`0.1.x` → `0.2.0`) |
| Breaking API change | minor with breaking-changes note in CHANGELOG |

---

## 3. Commit

Stage only the two files changed in steps 1–2:

```sh
git add CHANGELOG.md libs/ui/package.json
git commit -m "chore(release): v0.x.y"
```

---

## 4. Build

```sh
pnpm build:ui
```

This runs `nx build ui`, which:
- Compiles the library via ng-packagr → `dist/ui/fesm2022/`
- Builds schematics → `dist/ui/schematics/`
- Copies `LICENSE` and `CHANGELOG.md` into `dist/ui/`

Verify the output version matches:

```sh
node -e "console.log(require('./dist/ui/package.json').version)"
```

---

## 5. Tag

```sh
git tag v0.x.y
git push origin main --tags
```

Tag format is always `v` + semver (e.g. `v0.1.2`). The Nx release config reads
version from git tags (`currentVersionResolver: "git-tag"`), so the tag must
exist before any future `nx release version` run.

---

## 6. GitHub Release

```sh
gh release create v0.x.y \
  --title "v0.x.y" \
  --notes "$(sed -n '/^## \[0\.x\.y\]/,/^## \[/p' CHANGELOG.md | head -n -1)"
```

Replace `0.x.y` with the actual version. This extracts the relevant CHANGELOG
section automatically.

Or use the GitHub UI: Releases → Draft a new release → choose tag `v0.x.y` →
paste CHANGELOG section as body.

---

## 7. Publish to npm

```sh
cd dist/ui
npm publish --access public
```

`--access public` is required for every publish of a scoped package
(`@ng-brutalism/ui`). Omitting it defaults to private and will error or silently
publish a private package.

Verify it landed:

```sh
npm view @ng-brutalism/ui version
```

---

## 8. Post-publish checks

| Check | Command / URL |
|---|---|
| Registry has new version | `npm view @ng-brutalism/ui version` |
| Search index (wait 24–48h) | Search `@ng-brutalism/ui` on npmjs.com |
| Docs site version badge | Check shield on `ngbrutalism.khangtran.dev` README |
| `softwareVersion` in JSON-LD on `/` | Update `CURRENT_VERSION` constant in `docs-seo-data.ts` if hardcoded |

---

## Quick reference

```sh
# Full release in one copy-paste block (replace VERSION)
VERSION=0.x.y

# 1–3: edit CHANGELOG.md + libs/ui/package.json manually, then:
git add CHANGELOG.md libs/ui/package.json
git commit -m "chore(release): v$VERSION"

# 4: build
pnpm build:ui

# 5: tag + push
git tag "v$VERSION"
git push origin main --tags

# 6: GitHub release
gh release create "v$VERSION" --title "v$VERSION" --generate-notes

# 7: publish
cd dist/ui && npm publish --access public && cd -

# 8: verify
npm view @ng-brutalism/ui version
```
