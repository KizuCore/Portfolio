import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { test } from 'node:test';

const exports = {};
const source = ts.transpileModule(fs.readFileSync(new URL('../src/utils/gitlabCalendar.ts', import.meta.url), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
vm.runInNewContext(source, { exports, Date, Number });
const { toGitLabActivities } = exports;

test('sparse contributions fill a full rolling year, including leap day, with correct totals', () => {
  const data = toGitLabActivities({ '2024-02-29': 3, '2024-03-01': 31, '2023-01-01': 100, '2025-01-01': 200 }, new Date('2024-03-01T23:30:00Z'));
  assert.equal(data.length, 366);
  assert.equal(data[0].date, '2023-03-02');
  assert.equal(data.at(-1).date, '2024-03-01');
  assert.equal(data.reduce((sum, day) => sum + day.count, 0), 34);
  assert.equal(data.at(-2).level, 1);
  assert.equal(data.at(-1).level, 4);
  assert.equal(data[0].level, 0);
  assert.equal(new Set(data.map(day => day.date)).size, data.length);
});

test('empty public calendars are valid, malformed payloads are not zero activity', () => {
  assert.ok(toGitLabActivities({}, new Date('2026-11-16')).every(day => day.count === 0));
  for (const bad of [null, [], '<html>', { error: 'Unavailable' }, { '2026-02-30': 1 }, { '2026-11-16': -1 }, { '2026-11-16': '9' }, { '2026-11-16': 1.2 }]) {
    assert.throws(() => toGitLabActivities(bad));
  }
});

function response() {
  return { headers: {}, code: 0, body: null,
    setHeader(key, value) { this.headers[key] = value; },
    status(code) { this.code = code; return this; },
    json(body) { this.body = body; return this; },
  };
}

test('public proxy restricts methods and destination, caches successful results without credentials', async () => {
  const handler = (await import('../api/gitlab-calendar.js?success')).default;
  const originalFetch = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async (url, options) => {
    calls++;
    assert.equal(url, 'https://gitlab.com/users/Theo35000/calendar.json');
    assert.deepEqual(options.headers, { Accept: 'application/json' });
    assert.ok(options.signal instanceof AbortSignal);
    return { ok: true, json: async () => ({ '2026-11-16': 7 }) };
  };
  try {
    const rejected = response();
    await handler({ method: 'POST' }, rejected);
    assert.equal(rejected.code, 405);
    assert.equal(calls, 0);
    for (let index = 0; index < 2; index++) {
      const res = response();
      await handler({ method: 'GET', query: { username: 'another-user' } }, res);
      assert.equal(res.code, 200);
      assert.equal(res.body['2026-11-16'], 7);
      assert.match(res.headers['Cache-Control'], /s-maxage=3600/);
    }
    assert.equal(calls, 1);
  } finally { globalThis.fetch = originalFetch; }
});

test('upstream failures and malformed responses remain retryable errors', async () => {
  const handler = (await import('../api/gitlab-calendar.js?failure')).default;
  const originalFetch = globalThis.fetch;
  try {
    for (const upstream of [() => { throw new Error('Timeout'); }, () => ({ ok: false }), () => ({ ok: true, json: async () => [] }), () => ({ ok: true, json: async () => ({ error: 'Unavailable' }) })]) {
      globalThis.fetch = upstream;
      const res = response();
      await handler({ method: 'GET' }, res);
      assert.equal(res.code, 503);
      assert.equal(res.headers['Cache-Control'], 'no-store');
    }
    globalThis.fetch = async () => ({ ok: true, json: async () => ({}) });
    const recovered = response();
    await handler({ method: 'GET' }, recovered);
    assert.equal(recovered.code, 200);
  } finally { globalThis.fetch = originalFetch; }
});
