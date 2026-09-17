/** Empty GraphQL-shaped payload when GitHub is unavailable or unauthenticated. */
const emptySponsors = {
  data: {organization: {sponsorsListing: null}},
};

/**
 * Fetch the GitHub Sponsors listing for the podcast org.
 * Missing token or a GitHub error must not fail prerender: the UI already hides the block.
 */
const getSponsors = async () => {
  const config = useRuntimeConfig();
  if (!config.github_auth) {
    return emptySponsors;
  }

  try {
    return await $fetch(`https://api.github.com/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${config.github_auth}`,
      },
      body: JSON.stringify({
        query: `query SponsorQuery {
        organization(login: "double-slash-podcast") {
            sponsorsListing {
                name
                fullDescriptionHTML
                url
                shortDescription
                activeGoal {
                    description
                    percentComplete
                    targetValue
                    title
                }
                isPublic
                sponsorable {
                    sponsors(first:100) {
                        edges {
                            node{
                                ... on User {
                                    id
                                    name
                                    url
                                    avatarUrl
                                }
                            }
                        }
                    }
                }
            }
        }
    }`,
      }),
    });
  } catch (error) {
    console.error('GitHub Sponsors fetch failed', error);
    return emptySponsors;
  }
};

export default defineEventHandler(async () =>
  JSON.stringify(await getSponsors()),
);
