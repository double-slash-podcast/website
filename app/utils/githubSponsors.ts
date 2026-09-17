export type GithubSponsorsListing = {
  url?: string;
  activeGoal?: {
    percentComplete?: number;
    targetValue?: number;
    description?: string;
  } | null;
  sponsorable?: {
    sponsors?: {
      edges?: Array<{
        node?: {
          id?: string;
          name?: string | null;
          url?: string;
          avatarUrl?: string;
        };
      }>;
    };
  };
};

type GithubSponsorsPayload = {
  data?: {
    organization?: {
      sponsorsListing?: GithubSponsorsListing;
    };
  };
};

/**
 * Unwrap the GitHub GraphQL body used by `/github-sponsor.json`.
 * Returns undefined when the payload is missing or malformed.
 */
export function parseGithubSponsorsListing(
  value: unknown,
): GithubSponsorsListing | undefined {
  if (value == null || value === '') {
    return undefined;
  }

  try {
    const payload = (
      typeof value === 'object' ? value : JSON.parse(String(value))
    ) as GithubSponsorsPayload;
    return payload.data?.organization?.sponsorsListing;
  } catch {
    return undefined;
  }
}
