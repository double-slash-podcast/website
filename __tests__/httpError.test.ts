import fs from 'fs';
import path from 'path';
import {describe, expect, test} from 'vitest';
import {
  getErrorPageCopy,
  getErrorStatusCode,
  notFoundErrorOptions,
} from '../app/utils/httpError';

const CONTENT_404_PAGES = [
  'app/pages/[...slug].vue',
  'app/pages/articles/[slug].vue',
  'app/pages/podcasts/[slug].vue',
];

const SSR_ERROR_PLUGIN = path.join(
  process.cwd(),
  'app/plugins/logSsrErrors.server.ts',
);

describe('notFoundErrorOptions', () => {
  test('is a fatal 404 so client navigation shows error.vue', () => {
    expect(notFoundErrorOptions.statusCode).toBe(404);
    expect(notFoundErrorOptions.fatal).toBe(true);
  });

  test.each(CONTENT_404_PAGES)(
    '%s throws createError(notFoundErrorOptions)',
    relativePath => {
      const src = fs.readFileSync(
        path.join(process.cwd(), relativePath),
        'utf8',
      );
      expect(src).toContain('throw createError(notFoundErrorOptions)');
    },
  );
});

describe('getErrorStatusCode', () => {
  test('prefers statusCode, then Nuxt 4 status, then 404', () => {
    expect(getErrorStatusCode({statusCode: 404, status: 500})).toBe(404);
    expect(getErrorStatusCode({status: 503})).toBe(503);
    expect(getErrorStatusCode({statusCode: 500})).toBe(500);
    expect(getErrorStatusCode(null)).toBe(404);
    expect(getErrorStatusCode()).toBe(404);
  });
});

describe('getErrorPageCopy', () => {
  test('keeps the not-found wording for 404', () => {
    const copy = getErrorPageCopy(404);
    expect(copy.title).toBe('Page non trouvée');
    expect(copy.heading).toBe('Page non trouvée !');
    expect(copy.description).toContain('ne semble pas/plus exister');
  });

  test('does not call a server error a missing page', () => {
    const copy = getErrorPageCopy(500);
    expect(copy.title).toBe('Une erreur est survenue');
    expect(copy.heading).toBe('Une erreur est survenue !');
    expect(copy.description).not.toContain('page');
  });
});

describe('logSsrErrors plugin', () => {
  test('chains the previous Vue errorHandler instead of replacing it', () => {
    const src = fs.readFileSync(SSR_ERROR_PLUGIN, 'utf8');

    expect(src).toContain(
      'const previous = nuxtApp.vueApp.config.errorHandler',
    );
    expect(src).toContain('previous?.(');
  });
});
