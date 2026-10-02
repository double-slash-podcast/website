export type ArticleAuthor = {
  name: string;
  url: string;
};

/**
 * Normalize article frontmatter to a list.
 * Older articles store one author object; newer ones store an array.
 */
export function articleAuthors(
  author: ArticleAuthor | ArticleAuthor[] | null | undefined,
): ArticleAuthor[] {
  if (!author) {
    return [];
  }
  const list = Array.isArray(author) ? author : [author];
  return list.map((person) => ({
    name: person.name.trim(),
    url: person.url.trim(),
  }));
}
