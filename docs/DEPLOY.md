# Docs Deployment

`apps/docs` is deployed to GitHub Pages at
<https://ngbrutalism.khangtran.dev>.

Current state: live. The first custom-domain setup is complete: Cloudflare
DNS points `ngbrutalism.khangtran.dev` to GitHub Pages, GitHub Pages uses
GitHub Actions as its source, and HTTPS is handled by GitHub Pages.

Deploy mechanics: `.github/workflows/deploy-docs.yml` runs on every push to
`main`, builds with `pnpm nx build docs --configuration=production`, and
uploads the prerendered output from `dist/apps/docs/analog/public/`.

---

## Normal deploys

For routine docs updates:

1. Merge or push the change to `main`.
2. Wait for the **Deploy Docs** workflow to pass.
3. Open <https://ngbrutalism.khangtran.dev> and smoke-test the changed page.

The workflow runs:

```bash
pnpm nx run-many -t lint test --projects=ui,docs
pnpm nx build docs --configuration=production
```

The site only updates when those checks pass and the Pages deploy job
completes.

To deploy without a new commit: GitHub → Actions → Deploy Docs → Run workflow.

## Static routes

The docs app is statically prerendered. Any new page that must work on direct
navigation needs an entry in `prerender.routes` in `apps/docs/vite.config.ts`.

After adding a route, verify locally:

```bash
pnpm nx build docs --configuration=production
```

Output should include an `index.html` under
`dist/apps/docs/analog/public/<route>/`.

Important existing smoke routes:

- `/`
- `/docs/introduction`
- `/docs/installation`
- `/components/button`
- `/showcase/portfolio`

## Current settings

Cloudflare DNS for `khangtran.dev`:

- Type: `CNAME`
- Name: `ngbrutalism`
- Target: `khangtrannn.github.io`
- Proxy status: **DNS only (grey cloud)**
- TTL: Auto

Verify DNS:

```bash
dig +short CNAME ngbrutalism.khangtran.dev
dig +short ngbrutalism.khangtran.dev
```

Expected: the CNAME resolves to `khangtrannn.github.io`, followed by GitHub
Pages IPs.

GitHub repo settings:

- Settings → Pages → Source: **GitHub Actions**
- Custom domain: `ngbrutalism.khangtran.dev`
- Enforce HTTPS: enabled after GitHub issues the certificate

`apps/docs/public/CNAME` must contain exactly:

```text
ngbrutalism.khangtran.dev
```

No protocol, no trailing slash.

## First-time setup history

The one-time setup has already been done, but this is the recovery checklist
if the Pages configuration is ever reset:

1. Make sure Cloudflare uses the DNS-only CNAME above.
2. In GitHub Settings → Pages, set Source to **GitHub Actions**.
3. Set the custom domain to `ngbrutalism.khangtran.dev`.
4. Run the **Deploy Docs** workflow.
5. Wait for certificate provisioning, then enable **Enforce HTTPS**.

Do not choose GitHub's suggested Jekyll or Static HTML templates. This repo
already owns its Pages workflow in `.github/workflows/deploy-docs.yml`.

## Troubleshooting

- **Workflow fails at Configure Pages.** Confirm Settings → Pages → Source is
  **GitHub Actions** and the custom domain is saved.
- **Cert issuance is stuck.** Confirm Cloudflare proxy is grey, not orange.
  If DNS is correct, remove the custom domain in GitHub Pages, save, re-add it,
  and save again to retrigger provisioning.
- **Direct route returns 404.** The route is probably missing from
  `prerender.routes` in `apps/docs/vite.config.ts`. Add it, rebuild, and
  redeploy.
- **CNAME mismatch warning.** Keep `apps/docs/public/CNAME` and the GitHub
  Pages custom-domain setting aligned. The workflow uploads the CNAME file on
  every deploy.
