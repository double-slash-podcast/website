import {
  collectEpisodeMediaIssues,
  formatEpisodeMediaIssues,
} from '../app/utils/episodeMediaValidation';

const main = async () => {
  const issues = await collectEpisodeMediaIssues();

  if (issues.length === 0) {
    console.log('All published podcast episodes have duration and fileSize.');
    return;
  }

  console.error(formatEpisodeMediaIssues(issues));
  process.exit(1);
};

main();
