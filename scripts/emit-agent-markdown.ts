import {existsSync} from 'node:fs';
import {resolve} from 'node:path';
import {emitAgentMarkdownPages} from '../app/utils/agentMarkdown';
import {emitAgentMarkdownIndexes} from '../app/utils/agentMarkdownIndexes';

const root = process.cwd();
const contentDir = resolve(root, 'content');

/**
 * SSG output folders to fill: CLI arg, or dist / .output/public when present.
 */
function resolveOutputDirs(): string[] {
  const fromArg = process.argv[2];
  if (fromArg) {
    return [resolve(root, fromArg)];
  }

  return [resolve(root, 'dist'), resolve(root, '.output/public')].filter(
    existsSync,
  );
}

const outputDirs = resolveOutputDirs();

if (outputDirs.length === 0) {
  console.error(
    'No SSG output directory (dist or .output/public). Run `nuxi generate` first.',
  );
  process.exit(1);
}

for (const outputDir of outputDirs) {
  const pages = emitAgentMarkdownPages({contentDir, outputDir});
  const indexes = emitAgentMarkdownIndexes({contentDir, outputDir});
  console.log(
    `Emitted ${pages.length} markdown pages and ${indexes.length} indexes to ${outputDir}`,
  );
}
