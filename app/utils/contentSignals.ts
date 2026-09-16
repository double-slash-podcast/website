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
 * Canonical `Content-Signal:` line expected in robots.txt.
 */
export function formatContentSignalDirective(
  signals: ContentSignal = contentSignal,
): string {
  const pairs = (
    Object.entries(signals) as [keyof ContentSignal, ContentSignalValue][]
  )
    .map(([key, value]) => `${key}=${value}`)
    .join(', ');

  return `Content-Signal: ${pairs}`;
}
