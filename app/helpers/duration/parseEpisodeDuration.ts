/**
 * Normalize podcast frontmatter duration (seconds) to a finite number.
 * Some episodes store it as a string, occasionally with thin spaces.
 */
export function parseEpisodeDuration(
  value: string | number | null | undefined,
): number {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === 'string') {
    const parsed = Number(value.replace(/\s/g, ''));
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}
