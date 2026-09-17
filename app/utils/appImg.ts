/** Densities NuxtImg used by default when `width` is set (no `sizes`). */
export const APP_IMG_DENSITIES = [1, 2] as const;

/**
 * Parse a width/height that may be a number or a string with a `px` suffix.
 */
export function toPx(value?: number | string): number | undefined {
  if (value === undefined || value === '') {
    return undefined;
  }

  const parsed =
    typeof value === 'number' ? value : Number.parseInt(String(value), 10);
  return Number.isFinite(parsed) ? parsed : undefined;
}

/**
 * Build a 1x/2x `srcset` from a URL resolver (Cloudinary via useImage).
 * NuxtImg cannot be used: its `useTemplateRef('imgEl')` throws during
 * Vue 3.5 production SSR and fails `nuxi generate`.
 */
export function buildDensitySrcset(
  resolve: (width: number, height?: number) => string,
  width?: number,
  height?: number,
  densities: readonly number[] = APP_IMG_DENSITIES,
): string | undefined {
  if (!width) {
    return undefined;
  }

  return densities
    .map(density => {
      const w = Math.round(width * density);
      const h = height == null ? undefined : Math.round(height * density);
      return `${resolve(w, h)} ${density}x`;
    })
    .join(', ');
}
