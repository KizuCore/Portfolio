import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { test } from 'node:test';

const source = ts.transpileModule(fs.readFileSync(new URL('../src/app/seo/structuredDataDom.ts', import.meta.url), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const exports = {};
vm.runInNewContext(source, { exports, JSON, TypeError });
const { serializeStructuredData, updateStructuredData } = exports;
const graph = name => ({ '@context': 'https://schema.org', '@graph': [{ '@type': 'WebPage', name }] });

function browser(trusted = true) {
  const nodes = [];
  const rules = [];
  const brands = new WeakSet();
  const factory = {
    createPolicy(name, callbacks) {
      assert.equal(name, 'portfolio-json-ld');
      assert.deepEqual(Object.keys(callbacks), ['createScript']);
      rules.push(callbacks);
      return { createScript(input) {
        const value = { content: callbacks.createScript(input) };
        brands.add(value);
        return value;
      } };
    },
  };
  const document = {
    defaultView: trusted ? { trustedTypes: factory } : {},
    createElement(tag) {
      assert.equal(tag, 'script');
      return {
        set innerHTML(_) { throw new Error('HTML parsing must never be used'); },
        set text(value) {
          assert.equal(this.type, 'application/ld+json');
          if (trusted) assert.ok(brands.has(value), 'TrustedScript must reach the DOM without string coercion');
          this.content = trusted ? value.content : value;
        },
        remove() { const index = nodes.indexOf(this); if (index !== -1) nodes.splice(index, 1); },
      };
    },
    head: {
      querySelectorAll(selector) {
        assert.ok(selector.includes('script#seo-structured-data'));
        return nodes.filter(node => node.id === 'seo-structured-data' || node.legacy);
      },
      appendChild(node) { nodes.push(node); },
    },
  };
  return { document, nodes, rules };
}

test('JSON-LD remains data even with HTML, script terminators and Unicode separators', () => {
  const value = graph('</script><script>alert(1)</script> & \u2028\u2029');
  const json = serializeStructuredData(value);
  assert.doesNotMatch(json, /[<>&\u2028\u2029]/);
  assert.deepEqual(JSON.parse(json), value);
});

test('TrustedScript policy rejects code, invalid JSON and unrelated data', () => {
  const { document, rules, nodes } = browser();
  updateStructuredData(document, serializeStructuredData(graph('Home')));
  for (const input of ['alert(1)', '{}', 'null', '[]', '{"@context":"https://attacker.example","@graph":[]}']) {
    assert.throws(() => rules[0].createScript(input));
    assert.throws(() => updateStructuredData(document, input));
  }
  assert.equal(nodes.length, 1, 'invalid updates preserve the current graph');
});

test('navigation replaces prerendered JSON-LD once, reuses the policy and clears it on 404 or unmount', () => {
  const { document, nodes, rules } = browser();
  const prerendered = document.createElement('script');
  prerendered.id = 'seo-structured-data';
  nodes.push(prerendered);
  const unrelated = { id: 'another-integration' };
  nodes.push(unrelated);
  const cleanupHome = updateStructuredData(document, serializeStructuredData(graph('Home')));
  const cleanupAbout = updateStructuredData(document, serializeStructuredData(graph('About')));
  cleanupHome();
  assert.equal(nodes.length, 2);
  assert.equal(JSON.parse(nodes[1].content)['@graph'][0].name, 'About');
  assert.equal(rules.length, 1);
  updateStructuredData(document, null);
  cleanupAbout();
  assert.deepEqual(nodes, [unrelated]);
  const cleanup = updateStructuredData(document, serializeStructuredData(graph('Contact')));
  cleanup();
  assert.deepEqual(nodes, [unrelated]);
});

test('browsers without Trusted Types retain valid JSON-LD and migrate old Helmet markup', () => {
  const { document, nodes, rules } = browser(false);
  const previous = document.createElement('script');
  previous.legacy = true;
  nodes.push(previous);
  const json = serializeStructuredData(graph('Home'));
  updateStructuredData(document, json);
  assert.equal(nodes.length, 1);
  assert.equal(nodes[0].content, json);
  assert.equal(rules.length, 0);
});
