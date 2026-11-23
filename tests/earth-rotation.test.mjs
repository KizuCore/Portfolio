import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildSync } from 'esbuild';
import { fileURLToPath } from 'node:url';

const bundle = buildSync({
  stdin: {
    contents: `export { createEarthProjector } from './src/features/not-found/utils/earthProjection';
      export { EARTH_CLOUDS } from './src/features/not-found/data/earthClouds';
      export { EARTH_ARID, EARTH_ICE, EARTH_SEA_ICE } from './src/features/not-found/data/earthClimate';`,
    resolveDir: fileURLToPath(new URL('..', import.meta.url)),
    loader: 'ts',
  },
  bundle: true, write: false, platform: 'node', format: 'esm',
});
const { createEarthProjector, EARTH_CLOUDS, EARTH_ARID, EARTH_ICE, EARTH_SEA_ICE } = await import(
  `data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`
);

test('la rotation révèle différents continents et boucle sans raccord visible', () => {
  const project = createEarthProjector();
  assert.notEqual(project(12), project(102));
  assert.equal(project(12), project(372));
  assert.equal(project(-348), project(12));
});

test('les terres, nuages et climats restent dans le globe pendant un tour complet', () => {
  for (const geometry of [undefined, EARTH_CLOUDS, EARTH_ARID, EARTH_ICE, EARTH_SEA_ICE]) {
    const project = createEarthProjector(geometry);
    for (let longitude = 0; longitude < 360; longitude += 15) {
      const outline = project(longitude);
      assert.ok(outline.startsWith('polygon(evenodd, '));
      assert.doesNotMatch(outline, /NaN|Infinity/);
      for (const coordinate of outline.matchAll(/(-?[\d.]+)%/g)) {
        assert.ok(+coordinate[1] >= 0 && +coordinate[1] <= 100);
      }
    }
  }
});

test('une région située au dos du globe disparaît de l’hémisphère visible', () => {
  const project = createEarthProjector({ type: 'Polygon', coordinates: [[
    [-5, -5], [-5, 5], [5, 5], [5, -5], [-5, -5],
  ]] });
  assert.notEqual(project(0), project(180));
  assert.equal(project(180), 'polygon(evenodd, 0% 0%,0% 0%,0% 0%)');
});
