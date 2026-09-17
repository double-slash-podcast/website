import fs from 'fs';
import path from 'path';
import {describe, expect, test} from 'vitest';
import {generateRobotsTxt, normalizeGroup} from '@nuxtjs/robots/util';
import {
  contentSignal,
  ensureContentSignalInRobotsTxt,
  formatContentSignalDirective,
  formatContentSignalPairs,
} from '../app/utils/contentSignals';

const NUXT_CONFIG_PATH = path.join(process.cwd(), 'nuxt.config.ts');
const ROBOTS_PLUGIN_PATH = path.join(
  process.cwd(),
  'server/plugins/robotsContentSignals.ts',
);

describe('content signals', () => {
  test('declares yes/no preferences for search, ai-input, and ai-train', () => {
    expect(contentSignal.search).toBe('yes');
    expect(contentSignal['ai-input']).toBe('yes');
    expect(contentSignal['ai-train']).toBe('no');
    expect(formatContentSignalPairs()).toBe(
      'ai-train=no, search=yes, ai-input=yes',
    );
    expect(formatContentSignalDirective()).toBe(
      'Content-Signal: ai-train=no, search=yes, ai-input=yes',
    );
  });

  test('nuxt robots groups apply the shared Content-Signal policy', () => {
    const src = fs.readFileSync(NUXT_CONFIG_PATH, 'utf8');

    expect(src).toContain("from './app/utils/contentSignals'");
    expect(src).toContain('formatContentSignalPairs()');
    expect(src).toContain("userAgent: '*'");
  });

  test('nuxt-robots generates Content-Signal under User-agent groups', () => {
    const robotsTxt = generateRobotsTxt({
      groups: [
        normalizeGroup({
          userAgent: '*',
          allow: '/',
          contentSignal: formatContentSignalPairs(),
        }),
        normalizeGroup({
          userAgent: 'OAI-SearchBot',
          allow: '/',
          contentSignal: formatContentSignalPairs(),
        }),
      ],
      sitemaps: ['https://double-slash.dev/sitemap.xml'],
    });

    expect(robotsTxt).toContain('User-agent: *');
    expect(robotsTxt).toContain('User-agent: OAI-SearchBot');
    expect(robotsTxt.match(/^Content-Signal:/gm)).toHaveLength(2);
    expect(robotsTxt).toContain(formatContentSignalDirective());
  });

  test('ensureContentSignalInRobotsTxt inserts the directive in a wildcard group', () => {
    const without = `# START nuxt-robots (indexable)
User-agent: *
Allow: /

Sitemap: https://double-slash.dev/sitemap.xml
# END nuxt-robots`;

    const withSignal = ensureContentSignalInRobotsTxt(without);

    expect(withSignal).toContain(
      `User-agent: *\nAllow: /\n${formatContentSignalDirective()}`,
    );
    expect(ensureContentSignalInRobotsTxt(withSignal)).toBe(withSignal);
  });

  test('nitro plugin restores Content Signals during robots.txt prerender', () => {
    const src = fs.readFileSync(ROBOTS_PLUGIN_PATH, 'utf8');

    expect(src).toContain("hook('robots:config'");
    expect(src).toContain("hook('robots:robots-txt'");
    expect(src).toContain('ensureContentSignalInRobotsTxt');
    expect(src).toContain('formatContentSignalPairs');
  });
});
