# Analytics

Local reporting for library improvement decisions.

## Data Sources

- Cloudflare Web Analytics and request analytics: page views, visits, unique
  visitors, requests, referrers, countries, devices, and browsers.
- D1 copy events: docs copy interactions sent through the custom analytics
  Worker.

## Generate Report

Reports use live APIs only and default to the last 7 full UTC days, excluding
today.

Required shell environment variables:

```bash
export CLOUDFLARE_ACCOUNT_ID="..."
export CLOUDFLARE_API_TOKEN="..."
export CLOUDFLARE_ZONE_ID="..."
```

Run:

```bash
pnpm analytics:report
```

## Output

The script overwrites the same date-range report when rerun:

```text
docs/analytics/reports/YYYY-MM-DD_to_YYYY-MM-DD.md
```

It also updates:

```text
docs/analytics/reports/README.md
```

## Privacy Notes

- Tokens are read from shell environment variables only.
- No local token files are supported.
- Reports should contain aggregate data only.
