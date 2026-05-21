#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

const configPath = new URL('../.github/repository.json', import.meta.url);
const dryRun = process.argv.includes('--dry-run');

const config = JSON.parse(await readFile(configPath, 'utf8'));
const owner = process.env.GITHUB_REPOSITORY_OWNER ?? config.owner;
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? config.repo;
const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN ?? getGhToken();

validateConfig(config);

if (!owner || !repo) {
  throw new Error('Missing repository owner or repo name.');
}

const repositoryPayload = {
  description: config.description,
  homepage: config.homepage,
};
const topicsPayload = {
  names: config.topics,
};

if (dryRun) {
  console.log(
    JSON.stringify(
      {
        repository: `${owner}/${repo}`,
        repositoryPayload,
        topicsPayload,
      },
      null,
      2,
    ),
  );
  process.exit(0);
}

if (!token) {
  throw new Error(
    'Missing GitHub auth. Set GITHUB_TOKEN/GH_TOKEN, or run `gh auth login`.',
  );
}

await githubRequest(`https://api.github.com/repos/${owner}/${repo}`, {
  method: 'PATCH',
  token,
  body: repositoryPayload,
});

await githubRequest(`https://api.github.com/repos/${owner}/${repo}/topics`, {
  method: 'PUT',
  token,
  body: topicsPayload,
});

console.log(`Synced GitHub repository metadata for ${owner}/${repo}.`);

function validateConfig(value) {
  if (!value || typeof value !== 'object') {
    throw new Error('Repository metadata config must be an object.');
  }

  if (typeof value.description !== 'string' || !value.description.trim()) {
    throw new Error('Repository metadata must include a description.');
  }

  if (typeof value.homepage !== 'string' || !URL.canParse(value.homepage)) {
    throw new Error('Repository metadata must include a valid homepage URL.');
  }

  if (!Array.isArray(value.topics) || value.topics.length === 0) {
    throw new Error('Repository metadata must include at least one topic.');
  }

  if (value.topics.length > 20) {
    throw new Error('GitHub repositories can have at most 20 topics.');
  }

  for (const topic of value.topics) {
    if (typeof topic !== 'string' || !/^[a-z0-9][a-z0-9-]*$/.test(topic)) {
      throw new Error(`Invalid GitHub topic: ${topic}`);
    }
  }
}

async function githubRequest(url, { method, token, body }) {
  const response = await fetch(url, {
    method,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const responseBody = await response.text();
    throw new Error(
      `${method} ${url} failed with ${response.status}: ${responseBody}`,
    );
  }
}

function getGhToken() {
  const result = spawnSync('gh', ['auth', 'token'], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  });

  if (result.status !== 0) {
    return undefined;
  }

  return result.stdout.trim() || undefined;
}
