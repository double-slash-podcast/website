import fs from 'fs';
import path from 'path';
import {describe, expect, test} from 'vitest';

const ROOT = process.cwd();

const RENDERER_FILES = [
  'app/pages/articles/[slug].vue',
  'app/pages/podcasts/[slug].vue',
  'app/pages/[...slug].vue',
  'app/components/List.vue',
];

describe('markdown SSG renderer wiring', () => {
  test('ProseA is Options API without setup()', () => {
    const src = fs.readFileSync(
      path.join(ROOT, 'app/components/global/ProseA.vue'),
      'utf8',
    );

    expect(src).not.toContain('<script setup');
    expect(src).toContain('defineComponent');
    expect(src).toContain('isExternal');
  });

  test('ContentRenderer uses native prose tags and maps ProseA', () => {
    for (const file of RENDERER_FILES) {
      const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
      expect(src, file).toContain(':prose="false"');
      expect(src, file).toContain(':components="markdownComponents"');
    }
  });
});
