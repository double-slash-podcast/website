const STORAGE_PREFIX = 'ds-play-tracked:';

/**
 * Send Umami "play" once per episode per browser tab session.
 * sessionStorage survives refresh and in-site navigation; it is cleared when the tab closes.
 */
export function usePlayTracking() {
  const {proxy} = useScriptUmamiAnalytics();

  /**
   * Track play if this episode has not already been counted in the current tab session.
   */
  function trackPlayOnce(dsSlug: string | undefined, title: string | undefined) {
    if (!import.meta.client || !dsSlug || !title) return;

    const key = `${STORAGE_PREFIX}${dsSlug}`;

    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, '1');
    } catch {
      // Storage unavailable (private mode, quota, disabled) — still track without blocking playback
    }

    proxy.track('play', {value: title});
  }

  return {trackPlayOnce};
}
