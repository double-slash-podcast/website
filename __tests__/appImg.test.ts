import fs from 'fs';
import path from 'path';
import {describe, expect, test} from 'vitest';

const APP_IMG = path.join(process.cwd(), 'app/components/AppImg.vue');

describe('AppImg', () => {
  test('renders through NuxtImg rather than a manual useImage img', () => {
    const source = fs.readFileSync(APP_IMG, 'utf8');

    expect(source).toContain('<NuxtImg');
    expect(source).not.toContain('useImage()');
    expect(source).not.toContain('<img');
  });
});
