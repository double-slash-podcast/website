import fs from 'fs';
import path from 'path';
import {describe, expect, test} from 'vitest';
import {
  contentSignal,
  formatContentSignalDirective,
} from '../app/utils/contentSignals';

const NUXT_CONFIG_PATH = path.join(process.cwd(), 'nuxt.config.ts');

describe('content signals', () => {
  test('declares yes/no preferences for search, ai-input, and ai-train', () => {
    expect(contentSignal.search).toBe('yes');
    expect(contentSignal['ai-input']).toBe('yes');
    expect(contentSignal['ai-train']).toBe('no');
    expect(formatContentSignalDirective()).toBe(
      'Content-Signal: ai-train=no, search=yes, ai-input=yes',
    );
  });

  test('nuxt robots groups apply the shared Content-Signal policy', () => {
    const src = fs.readFileSync(NUXT_CONFIG_PATH, 'utf8');

    expect(src).toContain("from './app/utils/contentSignals'");
    expect(src).toContain('contentSignal');
  });
});
