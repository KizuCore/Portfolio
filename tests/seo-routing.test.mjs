import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { build } from 'esbuild';

const compiled = await build({
  stdin: {
    contents: `
      import React from 'react';
      import { renderToStaticMarkup } from 'react-dom/server';
      import { MemoryRouter } from 'react-router-dom';
      import { HelmetProvider } from 'react-helmet-async';
      import { I18nextProvider } from 'react-i18next';
      import { createInstance } from 'i18next';
      import SeoMeta from './src/components/Seo/SeoMeta';
      import NotFound from './src/routes/LocaleFallbackRoute';
      import fr from './src/locales/fr.json';
      import en from './src/locales/en.json';
      import bzh from './src/locales/bzh.json';
      export { ROUTE_SEO, SUPPORTED_LOCALES } from './src/config/seo';
      export async function render(path, error = false) {
        const i18n = createInstance();
        await i18n.init({ lng: 'fr', resources: { fr: {translation: fr}, en: {translation: en}, bzh: {translation: bzh} }, interpolation: { escapeValue: false } });
        const context = {};
        const body = renderToStaticMarkup(<HelmetProvider context={context}><I18nextProvider i18n={i18n}><MemoryRouter initialEntries={[path]}><SeoMeta />{error && <NotFound />}</MemoryRouter></I18nextProvider></HelmetProvider>);
        const head = Object.values(context.helmet).filter(value => value && typeof value.toString === 'function').map(value => value.toString()).join('');
        return {body, head};
      }
    `,
    resolveDir: process.cwd(), loader: 'tsx',
  },
  bundle: true, write: false, platform: 'node', format: 'cjs', jsx: 'automatic',
  loader: { '.css': 'empty' }, define: { 'import.meta.env': '{}', 'process.env.NODE_ENV': '"production"' },
});
const module = { exports: {} };
new Function('require', 'module', 'exports', compiled.outputFiles[0].text)(createRequire(import.meta.url), module, module.exports);
const { render, ROUTE_SEO, SUPPORTED_LOCALES } = module.exports;

test('unknown URLs stay on a translated 404 without canonical, alternates or structured data', async () => {
  for (const [prefix, home, language] of [['/fr', '/fr', 'fr'], ['/en', '/en', 'en'], ['/bzh', '/bzh', 'br'], ['/unknown', '/fr', 'fr']]) {
    const {body, head} = await render(`${prefix}/missing`, true);
    assert.match(body, /<h1[^>]*id="not-found-title"/);
    assert(body.includes(`href="${home}"`));
    assert(body.includes(`href="${home}/project"`));
    assert.match(head, /name="robots" content="noindex, nofollow"/);
    assert(head.includes(`lang="${language}"`));
    assert(!head.includes('rel="canonical"'));
    assert(!head.includes('hrefLang="x-default"'));
    assert(!head.includes('application/ld+json'));
  }
  const {head} = await render('/en/gojo', true);
  assert.match(head, /name="robots" content="noindex, nofollow"/);
  assert(!head.includes('rel="canonical"'));
});

test('client navigation emits exactly one localized breadcrumb, including French-only services', async () => {
  for (const [url, home, label] of [
    ['/fr/about', '/fr', 'Accueil'], ['/en/contact', '/en', 'Home'],
    ['/bzh/cv', '/bzh', 'Degemer'], ['/en/realisations/a-table', '/en', 'Home'],
    ['/en/services/developpeur-react', '/fr', 'Accueil'],
  ]) {
    const {head} = await render(url);
    const graph = JSON.parse(head.match(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/s)[1])['@graph'];
    const breadcrumbs = graph.filter(node => node['@type'] === 'BreadcrumbList');
    assert.equal(breadcrumbs.length, 1);
    const items = breadcrumbs[0].itemListElement;
    assert.equal(items[0].name, label);
    assert.equal(items[0].item, `https://theo-guerin.fr${home}`);
    assert.equal(items[1].item, head.match(/rel="canonical" href="([^"]+)"/)[1]);
  }
});

test('hosting serves generated routes and lets missing paths reach the custom 404', () => {
  const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
  assert.equal(config.cleanUrls, true);
  assert(config.rewrites.every(rule => rule.destination !== '/index.html' && rule.destination !== '/'));
  for (const route of Object.keys(ROUTE_SEO)) {
    const file = route === '/' ? 'dist/index.html' : `dist${route}.html`;
    assert(fs.existsSync(file), `Missing direct entry: ${route}`);
    if (!ROUTE_SEO[route].noindex) {
      for (const locale of SUPPORTED_LOCALES) assert(fs.existsSync(`dist/${locale}${route === '/' ? '' : route}.html`));
    } else {
      assert.match(fs.readFileSync(file, 'utf8'), /name="robots" content="noindex, nofollow"/);
    }
  }
  const error = fs.readFileSync('dist/404.html', 'utf8');
  assert.match(error, /name="robots" content="noindex, nofollow"/);
  assert.match(error, /<h1>/);
  assert.match(error, /href="\/fr"/);
  assert(!error.includes('rel="canonical"'));
  assert(!error.includes('application/ld+json'));
  assert(!fs.readFileSync('dist/sitemap.xml', 'utf8').includes('/404'));
});

test('page titles remain identical between generated HTML and client navigation in every locale', async () => {
  for (const locale of SUPPORTED_LOCALES) {
    for (const route of Object.keys(ROUTE_SEO).filter(path => !ROUTE_SEO[path].noindex)) {
      const url = `/${locale}${route === '/' ? '' : route}`;
      const {head} = await render(url);
      const generated = fs.readFileSync(`dist${url}.html`, 'utf8');
      const title = html => html.match(/<title[^>]*>(.*?)<\/title>/s)[1];
      assert.equal(title(head), title(generated), `Title changed after navigation: ${url}`);
    }
  }
});
