/**
 * Serialize a content date to an ISO string NuxtTime can format.
 * Native sqlite may return Date objects; invalid values become undefined.
 */
export function toIsoDatetime(
  value: string | number | Date | null | undefined,
): string | undefined {
  if (value == null || value === '') {
    return undefined;
  }
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}
