import fs from 'fs';
import path from 'path';
import {describe, expect, test} from 'vitest';

const COMPONENT = path.join(process.cwd(), 'app/components/ArticleDetails.vue');
const ISLAND = path.join(
  process.cwd(),
  'app/components/ArticleDetails.server.vue',
);

describe('ArticleDetails', () => {
  const src = fs.readFileSync(COMPONENT, 'utf8');

  test('is a regular component, not a Nuxt island', () => {
    expect(fs.existsSync(ISLAND)).toBe(false);
    expect(src).not.toContain('.server.vue');
  });

  test('takes slim byline props and formats the date with NuxtTime', () => {
    expect(src).toContain('publicationDate');
    expect(src).toContain('author');
    expect(src).toContain('NuxtTime');
    expect(src).not.toContain('useLocalDate');
    expect(src).not.toMatch(/defineProps<\{[^}]*\barticle\s*:/);
  });
});
