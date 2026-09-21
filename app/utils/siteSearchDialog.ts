import type {ComponentInternalInstance} from 'vue';

/**
 * Root <dialog> of SearchModal from the component vnode.
 * Avoid Vue template refs: production setRef crashes when owner is null.
 */
export function getSiteSearchDialog(
  instance: ComponentInternalInstance | null,
): HTMLDialogElement | null {
  const el = instance?.vnode.el;
  return el instanceof HTMLDialogElement ? el : null;
}

/**
 * Open or close the palette without double-calling showModal/close.
 */
export function syncSiteSearchDialog(
  el: HTMLDialogElement | null,
  openState: boolean,
): void {
  if (!el) {
    return;
  }

  if (openState && !el.open) {
    el.showModal();
  } else if (!openState && el.open) {
    el.close();
  }
}
