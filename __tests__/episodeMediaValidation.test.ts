import {describe, expect, test} from 'vitest';
import {
  collectEpisodeMediaIssues,
  formatEpisodeMediaIssues,
  type EpisodeMediaIssue,
} from '../app/utils/episodeMediaValidation';

describe('formatEpisodeMediaIssues', () => {
  test('lists missing fields with explicit build instructions', () => {
    const issues: EpisodeMediaIssue[] = [
      {
        filePath: 'content/podcasts/131.news-mai26/index.md',
        dsSlug: 'DS_131_news-mai26',
        title: 'News Mai 2026',
        missingDuration: true,
        missingFileSize: true,
      },
    ];

    const message = formatEpisodeMediaIssues(issues);

    expect(message).toContain('Build blocked: podcast episodes are missing media metadata');
    expect(message).toContain('Run `pnpm sync-durations`');
    expect(message).toContain('DS_131_news-mai26 — News Mai 2026');
    expect(message).toContain('missing duration, fileSize');
  });
});

describe('collectEpisodeMediaIssues', () => {
  test('returns no issues when all published episodes are complete', async () => {
    const issues = await collectEpisodeMediaIssues();
    expect(issues).toEqual([]);
  });
});
