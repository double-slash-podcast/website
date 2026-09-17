export type ContentSignalValue = 'yes' | 'no';

export type ContentSignal = {
  'ai-train': ContentSignalValue;
  search: ContentSignalValue;
  'ai-input': ContentSignalValue;
};

/**
 * Site-wide Content Signals for robots.txt (IAB / IETF aipref).
 * Search indexing and live AI input (RAG, citations) are allowed;
 * inclusion in training corpora is not.
 */
export const contentSignal: ContentSignal = {
  'ai-train': 'no',
  search: 'yes',
  'ai-input': 'yes',
};

/**
 * Comma-separated Content-Signal pairs without the directive prefix.
 */
export function formatContentSignalPairs(
  signals: ContentSignal = contentSignal,
): string {
  return (
    Object.entries(signals) as [keyof ContentSignal, ContentSignalValue][]
  )
    .map(([key, value]) => `${key}=${value}`)
    .join(', ');
}

/**
 * Canonical `Content-Signal:` line expected in robots.txt.
 */
export function formatContentSignalDirective(
  signals: ContentSignal = contentSignal,
): string {
  return `Content-Signal: ${formatContentSignalPairs(signals)}`;
}

/**
 * Insert the site-wide Content-Signal line into a robots.txt body when missing.
 */
export function ensureContentSignalInRobotsTxt(
  robotsTxt: string,
  directive = formatContentSignalDirective(),
): string {
  if (/^Content-Signal:/im.test(robotsTxt)) {
    return robotsTxt;
  }

  const wildcardGroup = /^(User-agent: \*(?:\r?\n(?:Allow|Disallow):[^\n]*)*)/m;
  if (wildcardGroup.test(robotsTxt)) {
    return robotsTxt.replace(wildcardGroup, `$1\n${directive}`);
  }

  return `${directive}\n${robotsTxt}`;
}
