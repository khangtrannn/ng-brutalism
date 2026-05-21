# Deploying the Docs Site

One-time checklist for deploying `apps/docs` to GitHub Pages at
<https://ngbrutalism.khangtran.dev>.

Deploy mechanics: `.github/workflows/deploy-docs.yml` runs on push to `main`,
builds via `pnpm nx build docs --configuration=production`, and uploads the
prerendered output from `dist/apps/docs/analog/public/` to GitHub Pages.

---

## 1. Pre-flight

Verify the deploy plumbing is in place before the first push.

- [ ] `.github/workflows/deploy-docs.yml` exists.
- [ ] `apps/docs/public/CNAME` contains `ngbrutalism.khangtran.dev` (single
      line, no protocol, no trailing slash).
- [ ] Local production build succeeds:

      ```bash
      pnpm nx build docs --configuration=production
      ```

      Output lands in `dist/apps/docs/analog/public/`. Confirm the
      `CNAME` file is copied there too.

## 2. DNS (Cloudflare)

In the Cloudflare dashboard for `khangtran.dev`:

- [ ] DNS → Records → Add record:
  - Type: `CNAME`
  - Name: `ngbrutalism`
  - Target: `khangtrannn.github.io`
  - Proxy status: **DNS only (grey cloud)**. Required — orange (proxied)
    blocks GitHub from issuing the Let's Encrypt cert.
  - TTL: Auto.
- [ ] Confirm resolution from a terminal:

      ```bash
      dig +short ngbrutalism.khangtran.dev
      ```

      Should return `khangtrannn.github.io` (or its A records).

## 3. GitHub Pages

In repo Settings → Pages:

- [ ] Source: **GitHub Actions**.
- [ ] Custom domain: `ngbrutalism.khangtran.dev`. Auto-populates from the
      `CNAME` file on first successful deploy; verify it matches.
- [ ] Enforce HTTPS: enable once the cert issues (~5 min after DNS resolves
      and the first deploy completes).

## 4. First deploy

- [ ] Push or merge to `main`.
- [ ] Open the **Deploy Docs** workflow in the Actions tab.
- [ ] Both jobs (`build`, then `deploy`) must go green. `deploy` exposes the
      live URL as a job output.

## 5. Verify

- [ ] `https://ngbrutalism.khangtran.dev` returns 200.
- [ ] HTTPS cert is valid (no browser warning).
- [ ] Smoke-test three routes covering different templates:
  - `/`
  - `/components/button`
  - `/docs/introduction`

## 6. Troubleshooting

- **Cert issuance stuck for >10 min.** Confirm Cloudflare proxy is grey, not
  orange. In GH Pages settings, remove the custom domain, save, re-add it,
  save again — this re-triggers cert provisioning.
- **404 on a route that should exist.** The route isn't in the prerender
  list. Add it to `prerender.routes` in `apps/docs/vite.config.ts`, rebuild,
  redeploy.
- **CNAME mismatch warning in Pages settings.** The workflow uploads
  `apps/docs/public/CNAME` on every deploy. If the GH Pages "Custom domain"
  field disagrees, the file wins on the next deploy. Update the file to
  match what you want, then push.

---

## Subsequent deploys

After initial setup, every push to `main` re-runs the workflow and
re-deploys automatically. To trigger manually without a push: Actions →
Deploy Docs → Run workflow.
