import {resolve} from 'node:path';
import {
  emitAgentMarkdownPages,
  resolveAgentMarkdownOutputDirs,
} from '../app/utils/agentMarkdown';
import {emitAgentMarkdownIndexes} from '../app/utils/agentMarkdownIndexes';

const root = process.cwd();
const contentDir = resolve(root, 'content');

const outputDirs = resolveAgentMarkdownOutputDirs(root, process.argv[2]);

if (outputDirs.length === 0) {
  console.error(
    'No SSG output directory (.output/public or dist). Run `nuxi generate` first.',
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
