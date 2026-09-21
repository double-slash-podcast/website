import fs from 'fs';
import path from 'path';
import {describe, expect, test} from 'vitest';
import {parseGithubSponsorsListing} from '../app/utils/githubSponsors';

const SPONSOR = path.join(process.cwd(), 'app/components/global/Sponsor.vue');
const SPONSOR_CONTENT = path.join(
  process.cwd(),
  'app/components/global/SponsorContent.vue',
);

describe('parseGithubSponsorsListing', () => {
  test('reads the GraphQL listing from an object or JSON string', () => {
    const listing = {url: 'https://github.com/sponsors/double-slash-podcast'};
    const payload = {data: {organization: {sponsorsListing: listing}}};

    expect(parseGithubSponsorsListing(payload)).toEqual(listing);
    expect(parseGithubSponsorsListing(JSON.stringify(payload))).toEqual(
      listing,
    );
    expect(parseGithubSponsorsListing(null)).toBeUndefined();
    expect(parseGithubSponsorsListing('{')).toBeUndefined();
  });
});

describe('Sponsor SSG wiring', () => {
  test('awaits the listing inside a local Suspense boundary', () => {
    const shell = fs.readFileSync(SPONSOR, 'utf8');
    const inner = fs.readFileSync(SPONSOR_CONTENT, 'utf8');

    expect(shell).toMatch(/<Suspense\b/);
    expect(shell).toContain('SponsorContent');
    expect(inner).toContain('await useAsyncData');
    expect(inner).toContain("'/github-sponsor.json'");
  });
});
