import assert from 'node:assert/strict';
import { test } from 'node:test';
import { build } from 'esbuild';
import { createRequire } from 'node:module';

const compiled = await build({
  stdin: {
    contents: `
      import React from 'react';
      import { renderToStaticMarkup } from 'react-dom/server';
      import { MemoryRouter } from 'react-router-dom';
      import { I18nextProvider } from 'react-i18next';
      import { createInstance } from 'i18next';
      import fr from './src/locales/fr.json';
      import en from './src/locales/en.json';
      import bzh from './src/locales/bzh.json';
      import Notice from './src/components/Legal/MentionsLegales';
      import Privacy from './src/components/Legal/PolitiqueConfidentialite';
      import Cookies from './src/components/Legal/PolitiqueCookies';
      export { matchesLegalSearch } from './src/utils/legalSearch';
      export async function render(language, index) {
        const i18n = createInstance();
        await i18n.init({ lng: language, resources: { fr: { translation: fr }, en: { translation: en }, bzh: { translation: bzh } }, interpolation: { escapeValue: false } });
        const Page = [Notice, Privacy, Cookies][index];
        return renderToStaticMarkup(<I18nextProvider i18n={i18n}><MemoryRouter><Page /></MemoryRouter></I18nextProvider>);
      }
    `,
    resolveDir: process.cwd(), loader: 'tsx',
  },
  bundle: true, write: false, platform: 'node', format: 'cjs', jsx: 'automatic',
  loader: { '.css': 'empty' }, define: { 'import.meta.env': '{}', 'process.env.NODE_ENV': '"production"' },
});
const module = { exports: {} };
new Function('require', 'module', 'exports', compiled.outputFiles[0].text)(createRequire(import.meta.url), module, module.exports);
const { render, matchesLegalSearch } = module.exports;

test('legal search accepts accents, case, multiple words and empty queries', () => {
  assert.ok(matchesLegalSearch('Durée de conservation des données', 'DONNEES duree'));
  assert.ok(matchesLegalSearch('Google Analytics : accord préalable', 'analytics accord'));
  assert.ok(matchesLegalSearch('Contact', '  '));
  assert.equal(matchesLegalSearch('Cookies nécessaires', 'cookies publicité'), false);
});

test('every legal document exposes matching anchors, localized navigation and consent actions', async () => {
  for (const language of ['fr', 'en', 'bzh']) {
    for (const [index, count] of [11, 9, 6].entries()) {
      const html = await render(language, index);
      const headings = [...html.matchAll(/<h2[^>]*id="([^"]+)"/g)].map(match => match[1]);
      assert.equal(headings.length, count);
      assert.equal(new Set(headings).size, count);
      for (const id of headings) assert.ok(html.includes(`href="#${id}"`), id);
      assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
      assert.ok(html.includes(`href="/${language}/mentions-legales"`));
      assert.ok(html.includes(language === 'en' ? 'Search this page' : 'Rechercher dans cette page'));
      assert.ok(html.includes('type="search"'));
      assert.ok(html.includes('aria-controls="legal-navigation-panel"'));
      assert.equal(html.includes('legal_navigation.'), false);
      if (index > 0) assert.ok(html.includes('ui-button'));
    }
  }
});
