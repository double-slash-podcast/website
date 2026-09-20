/**
 * Native <dialog> lookup for the command palette.
 * Vue 3.5 production setRef crashes when a template ref owner is null,
 * so the palette must never use ref="" on this element.
 */

export const SITE_SEARCH_DIALOG_ID = 'site-search-dialog';

/**
 * Palette dialog looked up by id (undefined during SSR).
 */
export function getSiteSearchDialog(): HTMLDialogElement | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const el = document.getElementById(SITE_SEARCH_DIALOG_ID);
  return el instanceof HTMLDialogElement ? el : null;
}

/**
 * Open or close the palette without double-calling showModal/close.
 */
export function syncSiteSearchDialog(openState: boolean): void {
  const el = getSiteSearchDialog();
  if (!el) {
    return;
  }

  if (openState && !el.open) {
    el.showModal();
  } else if (!openState && el.open) {
    el.close();
  }
}
