import fs from 'fs';
import path from 'path';
import {describe, expect, test} from 'vitest';

const PATCHES = path.join(process.cwd(), 'patches');

describe('content hydration patches', () => {
  test('keep resolved setup() components synchronous for hydration', () => {
    const content = fs.readFileSync(
      path.join(PATCHES, '@nuxt__content@3.16.0.patch'),
      'utf8',
    );
    const mdc = fs.readFileSync(
      path.join(PATCHES, '@nuxtjs__mdc@0.23.1.patch'),
      'utf8',
    );

    expect(content).toContain('+    return componentObject;');
    expect(content).toContain(
      '-      asyncComponent = defineAsyncComponent(() => Promise.resolve(componentObject));',
    );
    expect(mdc).toContain('+      return _component;');
    expect(mdc).toContain(
      '-      return defineAsyncComponent(() => new Promise((resolve) => resolve(_component)));',
    );
  });
});
