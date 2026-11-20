import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';

const root = new URL('../', import.meta.url);
const read = (file) => fs.readFileSync(new URL(file, root), 'utf8');
const config = JSON.parse(read('vercel.json'));
const headers = Object.fromEntries(config.headers.find(rule => rule.source === '/(.*)').headers.map(({ key, value }) => [key.toLowerCase(), value]));
const directives = new Map(headers['content-security-policy'].split(';').filter(value => value.trim()).map(value => {
  const [name, ...sources] = value.trim().split(/\s+/);
  return [name, sources];
}));

test('HTML entry points contain no executable inline scripts or event handlers under the enforced CSP', () => {
  assert.ok(!directives.get('script-src').includes("'unsafe-inline'"));
  assert.ok(!directives.get('script-src').includes("'unsafe-eval'"));
  assert.deepEqual(directives.get('script-src-attr'), ["'none'"]);
  for (const file of ['index.html', 'public/recaptcha.html']) {
    const html = read(file);
    assert.doesNotMatch(html, /\son\w+\s*=/i, `${file}: inline event handler`);
    for (const [, attributes, body] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
      if (/type=["']application\/ld\+json["']/.test(attributes)) continue;
      assert.equal(body.trim(), '', `${file}: executable inline script`);
      const source = attributes.match(/src=["']([^"']+)["']/)?.[1];
      assert.ok(source?.startsWith('/') && !source.startsWith('//'), `${file}: unexpected script origin`);
      assert.ok(fs.existsSync(new URL(source.startsWith('/src/') ? source.slice(1) : `public${source}`, root)), `${file}: missing script ${source}`);
    }
  }
});

test('frame protection agrees across CSP and XFO and allows the same-origin captcha helper', () => {
  assert.deepEqual(directives.get('frame-ancestors'), ["'self'"]);
  assert.equal(headers['x-frame-options'], 'SAMEORIGIN');
  assert.ok(directives.get('frame-src').includes("'self'"));
  assert.deepEqual(directives.get('object-src'), ["'none'"]);
  assert.deepEqual(directives.get('base-uri'), ["'none'"]);
  assert.equal(headers['cross-origin-opener-policy'], 'same-origin');
});

test('captcha makes no request until a valid same-origin parent message and reports loading failure', () => {
  let receive;
  const scripts = [];
  const replies = [];
  const origin = 'https://portfolio.example';
  const parent = { postMessage: (...args) => replies.push(args) };
  const window = { parent, addEventListener: (type, listener) => { if (type === 'message') receive = listener; } };
  vm.runInNewContext(read('public/recaptcha.js'), {
    window, location: { origin },
    document: { createElement: () => ({}), head: { appendChild: element => scripts.push(element) } },
  });
  const data = { type: 'recaptcha-start', requestId: 'request-1', siteKey: 'public-test-key', action: 'contact' };
  assert.equal(scripts.length, 0);
  receive({ origin: 'https://attacker.example', source: parent, data });
  receive({ origin, source: {}, data });
  receive({ origin, source: parent, data: { ...data, action: 'unexpected' } });
  assert.equal(scripts.length, 0);
  receive({ origin, source: parent, data });
  receive({ origin, source: parent, data });
  assert.equal(scripts.length, 1);
  assert.match(scripts[0].src, /^https:\/\/www\.google\.com\/recaptcha\/api\.js\?render=/);
  scripts[0].onerror();
  assert.equal(replies[0][0].requestId, data.requestId);
  assert.equal(replies[0][0].token, null);
  assert.equal(replies[0][1], origin);
});
