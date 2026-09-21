import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const CELL = 48;
const GAP = 16;
const ICON_SIZE = 38;
const STRIDE = CELL + GAP;

const LOGO_NAMES = [
  'vitejs',
  'pnpm',
  'fastify-icon',
  'javascript',
  'nextjs-icon',
  'nodejs-icon',
  'css-3-official',
  'html-5',
  'vue',
  'react',
  'mistral-ai-icon',
  'bun',
  'deno',
  'pwa',
  'php',
  'laravel',
  'graphql',
  'astro',
  'angular-icon',
  'visual-studio-code',
  'docker-icon',
  'hasura-icon',
  'nuxt-icon',
  'rust',
  'tailwindcss-icon',
  'redis',
  'postgresql',
  'mongodb-icon',
  'wordpress-icon',
  'webpack',
  'alpinejs-icon',
  'solidity',
  'claude-icon',
  'github-copilot',
] as const;

const SEEDS = [17, 29, 41];

type IconifyFile = {
  width?: number;
  height?: number;
  icons: Record<
    string,
    {body: string; width?: number; height?: number}
  >;
};

/**
 * Deterministic shuffle so committed strips stay stable across rebuilds.
 */
function shuffle<T>(items: readonly T[], seed: number): T[] {
  const next = [...items];
  let state = seed;
  for (let i = next.length - 1; i > 0; i -= 1) {
    state = (state * 16807) % 2147483647;
    const j = state % (i + 1);
    const current = next[i];
    const swap = next[j];
    if (current === undefined || swap === undefined) {
      continue;
    }
    next[i] = swap;
    next[j] = current;
  }
  return next;
}

/**
 * Prefix SVG ids so inlined Iconify gradients do not collide in one strip.
 */
function uniquifySvgIds(body: string, prefix: string): string {
  return body
    .replace(/id="([^"]+)"/g, `id="${prefix}-$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#${prefix}-$1)`)
    .replace(/href="#([^"]+)"/g, `href="#${prefix}-$1"`)
    .replace(/xlink:href="#([^"]+)"/g, `xlink:href="#${prefix}-$1"`);
}

/**
 * Build one horizontal SVG strip of the logo set, 48px tall.
 */
function buildStrip(
  collection: IconifyFile,
  names: readonly string[],
  stripId: string,
): string {
  const defaultWidth = collection.width ?? 256;
  const defaultHeight = collection.height ?? 256;
  const width = names.length * STRIDE - GAP;
  const parts = names.map((name, index) => {
    const icon = collection.icons[name];
    if (!icon) {
      throw new Error(`Missing logos icon: ${name}`);
    }
    const iconWidth = icon.width ?? defaultWidth;
    const iconHeight = icon.height ?? defaultHeight;
    const x = index * STRIDE + (CELL - ICON_SIZE) / 2;
    const y = (CELL - ICON_SIZE) / 2;
    const body = uniquifySvgIds(icon.body, `${stripId}-${index}`);
    return `<svg x="${x}" y="${y}" width="${ICON_SIZE}" height="${ICON_SIZE}" viewBox="0 0 ${iconWidth} ${iconHeight}" overflow="visible">${body}</svg>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${CELL}" viewBox="0 0 ${width} ${CELL}">${parts.join('')}</svg>\n`;
}

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const collection = JSON.parse(
  readFileSync(join(root, 'node_modules/@iconify-json/logos/icons.json'), 'utf8'),
) as IconifyFile;
const outDir = join(root, 'app/assets/logo-strips');
mkdirSync(outDir, {recursive: true});

const labels = ['a', 'b', 'c'] as const;
SEEDS.forEach((seed, index) => {
  const label = labels[index];
  if (!label) {
    return;
  }
  const svg = buildStrip(collection, shuffle(LOGO_NAMES, seed), label);
  writeFileSync(join(outDir, `strip-${label}.svg`), svg);
});

console.info(`Wrote ${labels.length} logo strips to ${outDir}`);
