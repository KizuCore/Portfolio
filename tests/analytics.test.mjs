import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { test } from 'node:test';

const source = ts.transpileModule(fs.readFileSync(new URL('../src/services/analytics.ts', import.meta.url), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;

function startAnalytics(hostname, choice) {
  const scripts = [];
  const listeners = new Map();
  const exports = {};
  let reloads = 0;
  let record = choice ? { choice, expiresAt: Date.now() + 60000 } : null;
  const location = { hostname, reload() { reloads++; } };
  const window = {
    location, clearTimeout() {}, setTimeout() { return 1; },
    addEventListener(name, listener) { listeners.set(name, listener); },
  };
  vm.runInNewContext(source, {
    exports, window, location,
    document: {
      cookie: '_ga=old', addEventListener() {}, createElement() { return {}; },
      head: { appendChild(script) { scripts.push(script); } },
    },
    require() {
      return { CONSENT_EVENT: 'consent', CONSENT_KEY: 'cookie-consent', getConsentRecord: () => record };
    },
  });
  exports.initializeAnalytics();
  return {
    scripts, window, reloads: () => reloads,
    setChoice(choice) {
      record = { choice, expiresAt: Date.now() + 60000 };
      listeners.get('consent')();
    },
  };
}

test('preview, local and lookalike hosts never load Analytics even with consent', () => {
  for (const host of ['localhost', '127.0.0.1', 'portfolio-v2-ebon-five.vercel.app',
    'preview-theo22100s-projects.vercel.app', 'theo-guerin.fr.example.com', 'other.theo-guerin.fr']) {
    const analytics = startAnalytics(host, 'granted');
    analytics.setChoice('granted');
    assert.equal(analytics.scripts.length, 0, host);
    assert.equal(analytics.window['ga-disable-G-V5X3P7LFL6'], true, host);
  }
});

test('public hosts require consent, load once and unload on withdrawal', () => {
  for (const host of ['theo-guerin.fr', 'www.theo-guerin.fr']) {
    const analytics = startAnalytics(host, null);
    assert.equal(analytics.scripts.length, 0);
    analytics.setChoice('denied');
    assert.equal(analytics.scripts.length, 0);
    analytics.setChoice('granted');
    analytics.setChoice('granted');
    assert.equal(analytics.scripts.length, 1);
    assert.match(analytics.scripts[0].src, /gtag\/js\?id=G-V5X3P7LFL6$/);
    analytics.setChoice('denied');
    assert.equal(analytics.window['ga-disable-G-V5X3P7LFL6'], true);
    assert.equal(analytics.reloads(), 1);
  }
});
