import { execFile } from 'node:child_process';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const ROOT = process.cwd();
const GRAPHQL_URL = 'https://api.cloudflare.com/client/v4/graphql';
const REPORTS_DIR = path.join(ROOT, 'docs/analytics/reports');
const WORKER_DIR = path.join(ROOT, 'tools/analytics-worker');
const WRANGLER_CONFIG = path.join(WORKER_DIR, 'wrangler.toml');
const SITE_HOST = 'ngbrutalism.khangtran.dev';

type Row = Record<string, unknown>;

interface Period {
  from: string;
  to: string;
  startIso: string;
  endIso: string;
  startMs: number;
  endMs: number;
}

interface TableRow {
  label: string;
  count: number;
}

interface DailyTraffic {
  day: string;
  pageViews: number;
  visits: number;
}

interface DailyRequests {
  day: string;
  requests: number;
}

interface D1Data {
  totalCopyEvents: number;
  dailyCopyEvents: TableRow[];
  topCopiedPages: TableRow[];
  topCopiedTabs: TableRow[];
  topPageTabs: Array<{ page: string; tab: string; count: number }>;
  recentEvents: Array<{ page: string; tab: string; createdAtUtc: string }>;
}

interface CloudflareData {
  totalPageViews: number;
  totalVisits: number;
  totalRequests: number;
  totalUniqueVisitors: number | null;
  dailyTraffic: DailyTraffic[];
  dailyRequests: DailyRequests[];
  topPages: TableRow[];
  topReferrers: TableRow[];
  topCountries: TableRow[];
  topDevices: TableRow[];
  topBrowsers: TableRow[];
}

interface ReportData {
  period: Period;
  cloudflare: CloudflareData | null;
  d1: D1Data | null;
  warnings: string[];
}

async function main(): Promise<void> {
  const period = getLastSevenFullDays();
  const warnings: string[] = [];

  const [cloudflare, d1] = await Promise.all([
    getCloudflareData(period).catch((error: unknown) => {
      warnings.push(`Cloudflare analytics unavailable: ${formatError(error)}`);
      return null;
    }),
    getD1Data(period).catch((error: unknown) => {
      warnings.push(`D1 copy analytics unavailable: ${formatError(error)}`);
      return null;
    }),
  ]);

  const markdown = renderReport({ period, cloudflare, d1, warnings });
  await mkdir(REPORTS_DIR, { recursive: true });

  const filename = `${period.from}_to_${period.to}.md`;
  const reportPath = path.join(REPORTS_DIR, filename);
  await writeFile(reportPath, markdown);
  await updateReportsIndex();

  console.log(`Analytics report written to ${path.relative(ROOT, reportPath)}`);
}

function getLastSevenFullDays(now = new Date()): Period {
  const todayUtc = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  );
  const end = todayUtc;
  const start = end - 7 * 24 * 60 * 60 * 1000;

  return {
    from: formatDate(new Date(start)),
    to: formatDate(new Date(end - 1)),
    startIso: new Date(start).toISOString(),
    endIso: new Date(end).toISOString(),
    startMs: start,
    endMs: end,
  };
}

function getDayRanges(period: Period): Array<{
  date: string;
  startIso: string;
  endIso: string;
}> {
  const dayMs = 24 * 60 * 60 * 1000;
  const ranges = [];

  for (let start = period.startMs; start < period.endMs; start += dayMs) {
    const end = Math.min(start + dayMs, period.endMs);
    ranges.push({
      date: formatDate(new Date(start)),
      startIso: new Date(start).toISOString(),
      endIso: new Date(end).toISOString(),
    });
  }

  return ranges;
}

async function getCloudflareData(period: Period): Promise<CloudflareData> {
  const accountId = requiredEnv('CLOUDFLARE_ACCOUNT_ID');
  const apiToken = requiredEnv('CLOUDFLARE_API_TOKEN');
  const zoneId = requiredEnv('CLOUDFLARE_ZONE_ID');

  const variables = {
    accountTag: accountId,
    zoneTag: zoneId,
    start: period.startIso,
    end: period.endIso,
    host: SITE_HOST,
  };

  const rumQuery = `
    query AnalyticsReportRum($accountTag: string, $start: Time, $end: Time, $host: string) {
      viewer {
        accounts(filter: { accountTag: $accountTag }) {
          totals: rumPageloadEventsAdaptiveGroups(
            limit: 1
            filter: { datetime_geq: $start, datetime_lt: $end, requestHost: $host }
          ) {
            count
            sum { visits }
          }
          daily: rumPageloadEventsAdaptiveGroups(
            limit: 14
            orderBy: [date_ASC]
            filter: { datetime_geq: $start, datetime_lt: $end, requestHost: $host }
          ) {
            count
            sum { visits }
            dimensions { date }
          }
          topPages: rumPageloadEventsAdaptiveGroups(
            limit: 20
            orderBy: [count_DESC]
            filter: { datetime_geq: $start, datetime_lt: $end, requestHost: $host }
          ) {
            count
            dimensions { requestPath }
          }
          topReferrers: rumPageloadEventsAdaptiveGroups(
            limit: 20
            orderBy: [sum_visits_DESC]
            filter: { datetime_geq: $start, datetime_lt: $end, requestHost: $host }
          ) {
            count
            sum { visits }
            dimensions { refererHost }
          }
          topCountries: rumPageloadEventsAdaptiveGroups(
            limit: 20
            orderBy: [count_DESC]
            filter: { datetime_geq: $start, datetime_lt: $end, requestHost: $host }
          ) {
            count
            dimensions { countryName }
          }
          topDevices: rumPageloadEventsAdaptiveGroups(
            limit: 20
            orderBy: [count_DESC]
            filter: { datetime_geq: $start, datetime_lt: $end, requestHost: $host }
          ) {
            count
            dimensions { deviceType }
          }
          topBrowsers: rumPageloadEventsAdaptiveGroups(
            limit: 20
            orderBy: [count_DESC]
            filter: { datetime_geq: $start, datetime_lt: $end, requestHost: $host }
          ) {
            count
            dimensions { userAgentBrowser }
          }
        }
      }
    }
  `;

  const requestsQuery = `
    query AnalyticsReportRequests($zoneTag: string, $start: Time, $end: Time) {
      viewer {
        zones(filter: { zoneTag: $zoneTag }) {
          totals: httpRequestsAdaptiveGroups(
            limit: 1
            filter: { datetime_geq: $start, datetime_lt: $end, requestSource: "eyeball" }
          ) {
            count
          }
        }
      }
    }
  `;

  const [rum, dailyRequestResponses] = await Promise.all([
    cloudflareGraphql(apiToken, rumQuery, variables),
    Promise.all(
      getDayRanges(period).map((day) =>
        cloudflareGraphql(apiToken, requestsQuery, {
          zoneTag: zoneId,
          start: day.startIso,
          end: day.endIso,
        }).then((response) => ({ day: day.date, response }))
      )
    ),
  ]);

  const account = firstObject(getArray(rum, ['viewer', 'accounts']));
  const dailyRequests = dailyRequestResponses.map(({ day, response }) => {
    const zone = firstObject(getArray(response, ['viewer', 'zones']));
    return {
      day,
      requests: sumCounts(getArray(zone, ['totals'])),
    };
  });

  const totalPageViews = sumCounts(getArray(account, ['totals']));
  const totalVisits = sumNested(getArray(account, ['totals']), [
    'sum',
    'visits',
  ]);
  const totalRequests = dailyRequests.reduce(
    (total, row) => total + row.requests,
    0
  );

  return {
    totalPageViews,
    totalVisits,
    totalRequests,
    totalUniqueVisitors: null,
    dailyTraffic: getArray(account, ['daily']).map((row) => ({
      day: String(readNested(row, ['dimensions', 'date']) ?? ''),
      pageViews: toNumber(row['count']),
      visits: toNumber(readNested(row, ['sum', 'visits'])),
    })),
    dailyRequests,
    topPages: mergeTableRows(
      toDimensionRows(getArray(account, ['topPages']), [
        'dimensions',
        'requestPath',
      ]).map((row) => ({ ...row, label: normalizePath(row.label) }))
    ),
    topReferrers: toDimensionRows(
      getArray(account, ['topReferrers']),
      ['dimensions', 'refererHost'],
      ['sum', 'visits'],
      '(direct / unknown)'
    ),
    topCountries: toDimensionRows(getArray(account, ['topCountries']), [
      'dimensions',
      'countryName',
    ]),
    topDevices: toDimensionRows(getArray(account, ['topDevices']), [
      'dimensions',
      'deviceType',
    ]),
    topBrowsers: toDimensionRows(getArray(account, ['topBrowsers']), [
      'dimensions',
      'userAgentBrowser',
    ]),
  };
}

async function cloudflareGraphql(
  apiToken: string,
  query: string,
  variables: Record<string, unknown>
): Promise<Row> {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} from Cloudflare GraphQL`);
  }

  const payload = (await response.json()) as {
    data?: Row;
    errors?: Array<{ message?: string }>;
  };

  if (payload.errors?.length) {
    throw new Error(
      payload.errors.map((error) => error.message ?? 'GraphQL error').join('; ')
    );
  }

  if (!payload.data) {
    throw new Error('Cloudflare GraphQL returned no data');
  }

  return payload.data;
}

async function getD1Data(period: Period): Promise<D1Data> {
  const database = await readD1DatabaseName();
  const where = `created_at >= ${period.startMs} AND created_at < ${period.endMs}`;

  const sql = `
    SELECT COUNT(*) AS totalCopyEvents
    FROM copy_events
    WHERE ${where};

    SELECT date(created_at / 1000, 'unixepoch') AS label, COUNT(*) AS count
    FROM copy_events
    WHERE ${where}
    GROUP BY label
    ORDER BY label ASC;

    SELECT page AS label, COUNT(*) AS count
    FROM copy_events
    WHERE ${where}
    GROUP BY page
    ORDER BY count DESC, page ASC
    LIMIT 20;

    SELECT tab AS label, COUNT(*) AS count
    FROM copy_events
    WHERE ${where}
    GROUP BY tab
    ORDER BY count DESC, tab ASC
    LIMIT 20;

    SELECT page, tab, COUNT(*) AS count
    FROM copy_events
    WHERE ${where}
    GROUP BY page, tab
    ORDER BY count DESC, page ASC, tab ASC
    LIMIT 20;

    SELECT page, tab, datetime(created_at / 1000, 'unixepoch') AS createdAtUtc
    FROM copy_events
    WHERE ${where}
    ORDER BY created_at DESC
    LIMIT 20;
  `;

  const statements = await runD1(database, sql);

  return {
    totalCopyEvents: toNumber(statements[0]?.[0]?.['totalCopyEvents']),
    dailyCopyEvents: toRows(statements[1] ?? []),
    topCopiedPages: mergeTableRows(
      toRows(statements[2] ?? []).map((row) => ({
        ...row,
        label: normalizePath(row.label),
      }))
    ),
    topCopiedTabs: toRows(statements[3] ?? []),
    topPageTabs: (statements[4] ?? []).map((row) => ({
      page: normalizePath(String(row['page'] ?? '')),
      tab: String(row['tab'] ?? ''),
      count: toNumber(row['count']),
    })),
    recentEvents: (statements[5] ?? []).map((row) => ({
      page: normalizePath(String(row['page'] ?? '')),
      tab: String(row['tab'] ?? ''),
      createdAtUtc: String(row['createdAtUtc'] ?? ''),
    })),
  };
}

async function readD1DatabaseName(): Promise<string> {
  const config = await readFile(WRANGLER_CONFIG, 'utf8');
  const match = config.match(/database_name\s*=\s*"([^"]+)"/);

  if (!match) {
    throw new Error(`Could not find database_name in ${WRANGLER_CONFIG}`);
  }

  return match[1];
}

async function runD1(database: string, command: string): Promise<Row[][]> {
  const { stdout } = await execFileAsync(
    'pnpm',
    [
      'exec',
      'wrangler',
      'd1',
      'execute',
      database,
      '--remote',
      '--json',
      '--command',
      command,
    ],
    { cwd: WORKER_DIR, maxBuffer: 1024 * 1024 * 10 }
  );

  const parsed = JSON.parse(stdout) as Array<{
    results?: Row[];
    success?: boolean;
  }>;

  for (const statement of parsed) {
    if (statement.success === false) {
      throw new Error('Wrangler D1 statement failed');
    }
  }

  return parsed.map((statement) => statement.results ?? []);
}

function renderReport(data: ReportData): string {
  const { period, cloudflare, d1, warnings } = data;
  const pageViews = cloudflare?.totalPageViews ?? 0;
  const copyEvents = d1?.totalCopyEvents ?? 0;
  const combined = buildCombinedRows(cloudflare, d1);

  return [
    `# Analytics Report: ${period.from} to ${period.to}`,
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    'Default window: last 7 full UTC days, excluding today.',
    '',
    '## Summary',
    '',
    table(
      ['Metric', 'Value'],
      [
        ['Page views', formatNumber(pageViews)],
        ['Visits', formatNumber(cloudflare?.totalVisits ?? 0)],
        ['Unique visitors', formatOptionalNumber(cloudflare?.totalUniqueVisitors)],
        ['Requests', formatNumber(cloudflare?.totalRequests ?? 0)],
        ['Copy events', formatNumber(copyEvents)],
        ['Copy events per page view', formatRate(copyEvents, pageViews)],
      ]
    ),
    '',
    '## Daily Trend',
    '',
    renderDailyTrend(cloudflare, d1),
    '',
    '## Traffic',
    '',
    '### Top Pages',
    '',
    renderCountTable(
      'Page',
      cloudflare?.topPages,
      'No page view data available.'
    ),
    '',
    '### Top Referrers',
    '',
    renderCountTable(
      'Referrer',
      cloudflare?.topReferrers,
      'No referrer data available.'
    ),
    '',
    '### Countries',
    '',
    renderCountTable(
      'Country',
      cloudflare?.topCountries,
      'No country data available.'
    ),
    '',
    '### Devices',
    '',
    renderCountTable(
      'Device',
      cloudflare?.topDevices,
      'No device data available.'
    ),
    '',
    '### Browsers',
    '',
    renderCountTable(
      'Browser',
      cloudflare?.topBrowsers,
      'No browser data available.'
    ),
    '',
    '## Product Intent',
    '',
    '### Top Copied Pages',
    '',
    renderCountTable('Page', d1?.topCopiedPages, 'No copy events recorded.'),
    '',
    '### Top Copied Tabs',
    '',
    renderCountTable('Tab', d1?.topCopiedTabs, 'No copy events recorded.'),
    '',
    '### Top Page + Tab Pairs',
    '',
    renderPageTabTable(d1),
    '',
    '### Recent Copy Events',
    '',
    renderRecentEvents(d1),
    '',
    '## Combined Signals',
    '',
    renderCombinedTable(combined),
    '',
    '## Warnings',
    '',
    warnings.length
      ? warnings.map((warning) => `- ${warning}`).join('\n')
      : 'No warnings.',
    '',
  ].join('\n');
}

function renderDailyTrend(
  cloudflare: CloudflareData | null,
  d1: D1Data | null
): string {
  const days = new Set<string>();
  for (const row of cloudflare?.dailyTraffic ?? []) days.add(row.day);
  for (const row of cloudflare?.dailyRequests ?? []) days.add(row.day);
  for (const row of d1?.dailyCopyEvents ?? []) days.add(row.label);

  if (!days.size) {
    return 'No daily data available.';
  }

  const trafficByDay = new Map(
    (cloudflare?.dailyTraffic ?? []).map((row) => [row.day, row])
  );
  const requestsByDay = new Map(
    (cloudflare?.dailyRequests ?? []).map((row) => [row.day, row])
  );
  const copiesByDay = new Map(
    (d1?.dailyCopyEvents ?? []).map((row) => [row.label, row.count])
  );

  return table(
    [
      'Date',
      'Page views',
      'Visits',
      'Unique visitors',
      'Requests',
      'Copy events',
    ],
    [...days].sort().map((day) => {
      const traffic = trafficByDay.get(day);
      const request = requestsByDay.get(day);
      return [
        day,
        formatNumber(traffic?.pageViews ?? 0),
        formatNumber(traffic?.visits ?? 0),
        'N/A',
        formatNumber(request?.requests ?? 0),
        formatNumber(copiesByDay.get(day) ?? 0),
      ];
    })
  );
}

function renderCountTable(
  label: string,
  rows: TableRow[] | undefined,
  emptyMessage: string
): string {
  if (!rows?.length) {
    return emptyMessage;
  }

  return table(
    [label, 'Count'],
    rows.map((row) => [row.label || '(unknown)', formatNumber(row.count)])
  );
}

function renderPageTabTable(d1: D1Data | null): string {
  if (!d1?.topPageTabs.length) {
    return 'No copy events recorded.';
  }

  return table(
    ['Page', 'Tab', 'Copy events'],
    d1.topPageTabs.map((row) => [row.page, row.tab, formatNumber(row.count)])
  );
}

function renderRecentEvents(d1: D1Data | null): string {
  if (!d1?.recentEvents.length) {
    return 'No copy events recorded.';
  }

  return table(
    ['Time (UTC)', 'Page', 'Tab'],
    d1.recentEvents.map((row) => [row.createdAtUtc, row.page, row.tab])
  );
}

function renderCombinedTable(
  rows: Array<{ page: string; pageViews: number; copyEvents: number }>
): string {
  if (!rows.length) {
    return 'No joined page view and copy event data available.';
  }

  return table(
    ['Page', 'Page views', 'Copy events', 'Copy events per page view'],
    rows.map((row) => [
      row.page,
      formatNumber(row.pageViews),
      formatNumber(row.copyEvents),
      formatRate(row.copyEvents, row.pageViews),
    ])
  );
}

function buildCombinedRows(
  cloudflare: CloudflareData | null,
  d1: D1Data | null
): Array<{ page: string; pageViews: number; copyEvents: number }> {
  const pageViews = new Map<string, number>();
  const copies = new Map<string, number>();

  for (const row of cloudflare?.topPages ?? []) {
    pageViews.set(normalizePath(row.label), row.count);
  }

  for (const row of d1?.topCopiedPages ?? []) {
    copies.set(normalizePath(row.label), row.count);
  }

  const pages = new Set([...pageViews.keys(), ...copies.keys()]);

  return [...pages]
    .map((page) => ({
      page,
      pageViews: pageViews.get(page) ?? 0,
      copyEvents: copies.get(page) ?? 0,
    }))
    .sort((a, b) => b.pageViews - a.pageViews || b.copyEvents - a.copyEvents)
    .slice(0, 30);
}

async function updateReportsIndex(): Promise<void> {
  const filenames = (await readdir(REPORTS_DIR))
    .filter((filename) =>
      /^\d{4}-\d{2}-\d{2}_to_\d{4}-\d{2}-\d{2}\.md$/.test(filename)
    )
    .sort()
    .reverse();

  const rows = filenames.map((filename) => {
    const period = filename.replace('.md', '').replace('_to_', ' to ');
    return [period, `[${filename}](./${filename})`];
  });

  const content = [
    '# Analytics Reports',
    '',
    filenames.length
      ? table(['Period', 'Report'], rows)
      : 'No reports generated yet.',
    '',
  ].join('\n');

  await writeFile(path.join(REPORTS_DIR, 'README.md'), content);
}

function table(headers: string[], rows: string[][]): string {
  return [
    `| ${headers.join(' | ')} |`,
    `| ${headers.map(() => '---').join(' | ')} |`,
    ...rows.map((row) => `| ${row.map(escapeCell).join(' | ')} |`),
  ].join('\n');
}

function escapeCell(value: string): string {
  return value.replaceAll('|', '\\|').replaceAll('\n', ' ');
}

function toDimensionRows(
  rows: Row[],
  labelPath: string[],
  valuePath: string[] = ['count'],
  fallbackLabel = '(unknown)'
): TableRow[] {
  return rows
    .map((row) => ({
      label: String(readNested(row, labelPath) || fallbackLabel),
      count: toNumber(readNested(row, valuePath)),
    }))
    .filter((row) => row.count > 0);
}

function toRows(rows: Row[]): TableRow[] {
  return rows.map((row) => ({
    label: String(row['label'] ?? ''),
    count: toNumber(row['count']),
  }));
}

function mergeTableRows(rows: TableRow[]): TableRow[] {
  const counts = new Map<string, number>();

  for (const row of rows) {
    counts.set(row.label, (counts.get(row.label) ?? 0) + row.count);
  }

  return [...counts.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

function getArray(value: unknown, keys: string[]): Row[] {
  const result = readNested(value, keys);
  return Array.isArray(result) ? (result as Row[]) : [];
}

function firstObject(values: Row[]): Row {
  return values[0] ?? {};
}

function readNested(value: unknown, keys: string[]): unknown {
  return keys.reduce<unknown>((current, key) => {
    if (typeof current !== 'object' || current === null) return undefined;
    return (current as Row)[key];
  }, value);
}

function sumCounts(rows: Row[]): number {
  return rows.reduce((total, row) => total + toNumber(row['count']), 0);
}

function sumNested(rows: Row[], keys: string[]): number {
  return rows.reduce(
    (total, row) => total + toNumber(readNested(row, keys)),
    0
  );
}

function toNumber(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

function normalizePath(value: string): string {
  if (!value) return '/';

  try {
    const parsed = value.startsWith('http')
      ? new URL(value)
      : new URL(value, `https://${SITE_HOST}`);
    return stripTrailingSlash(parsed.pathname || '/');
  } catch {
    return stripTrailingSlash(value.split('?')[0]?.split('#')[0] || '/');
  }
}

function stripTrailingSlash(value: string): string {
  return value.length > 1 ? value.replace(/\/+$/, '') : value;
}

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

function formatOptionalNumber(value: number | null | undefined): string {
  return value === null || value === undefined ? 'N/A' : formatNumber(value);
}

function formatRate(numerator: number, denominator: number): string {
  if (!denominator) return 'N/A';
  return `${((numerator / denominator) * 100).toFixed(2)}%`;
}

function requiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required env var ${name}`);
  }

  return value;
}

function formatError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

main().catch((error: unknown) => {
  console.error(formatError(error));
  process.exitCode = 1;
});
