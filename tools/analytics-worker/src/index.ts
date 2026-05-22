export interface Env {
  DB: D1Database;
}

const ALLOWED_ORIGIN = 'https://ngbrutalism.khangtran.dev';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    if (request.headers.get('Origin') !== ALLOWED_ORIGIN) {
      return new Response('Forbidden', { status: 403 });
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return new Response('Bad Request', { status: 400 });
    }

    if (
      typeof body !== 'object' ||
      body === null ||
      typeof (body as Record<string, unknown>)['page'] !== 'string' ||
      typeof (body as Record<string, unknown>)['tab'] !== 'string'
    ) {
      return new Response('Bad Request', { status: 400 });
    }

    const { page, tab } = body as { page: string; tab: string };

    await env.DB.prepare(
      'INSERT INTO copy_events (page, tab, created_at) VALUES (?, ?, ?)',
    )
      .bind(page, tab, Date.now())
      .run();

    return new Response(null, {
      status: 204,
      headers: { 'Access-Control-Allow-Origin': ALLOWED_ORIGIN },
    });
  },
};
