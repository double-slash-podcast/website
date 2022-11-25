const getSponsors = async () => {
  const config = useRuntimeConfig();

  const response = await $fetch(`https://api.github.com/graphql`, {
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

  return response;
};

export default defineEventHandler(async () =>
  JSON.stringify(await getSponsors()),
);
