import {afterEach, describe, expect, test} from 'vitest';
import {nextTick, ref} from 'vue';
import {bindSearchModalRender} from '../app/utils/searchModalLatch';
import {shouldApplyRouteQuery} from '../app/utils/searchRouteSync';
import {syncSiteSearchDialog, getSiteSearchDialog} from '../app/utils/siteSearchDialog';
import {isTypingTarget} from '../app/utils/siteSearchKeys';

describe('isTypingTarget', () => {
  test('treats form fields as typing targets', () => {
    const input = document.createElement('input');
    const textarea = document.createElement('textarea');
    const div = document.createElement('div');

    expect(isTypingTarget(input)).toBe(true);
    expect(isTypingTarget(textarea)).toBe(true);
    expect(isTypingTarget(div)).toBe(false);
    expect(isTypingTarget(null)).toBe(false);

    const select = document.createElement('select');
    const editable = document.createElement('div');
    editable.setAttribute('contenteditable', 'true');
    expect(isTypingTarget(select)).toBe(true);
    expect(isTypingTarget(editable)).toBe(true);
  });
});

describe('bindSearchModalRender', () => {
  test('mounts SearchModal when search is already open', () => {
    const isOpen = ref(true);
    const shouldRender = bindSearchModalRender(isOpen);
    expect(shouldRender.value).toBe(true);
  });

  test('keeps SearchModal mounted after close so the next open is instant', async () => {
    const isOpen = ref(false);
    const shouldRender = bindSearchModalRender(isOpen);
    expect(shouldRender.value).toBe(false);

    isOpen.value = true;
    await nextTick();
    expect(shouldRender.value).toBe(true);

    isOpen.value = false;
    await nextTick();
    expect(shouldRender.value).toBe(true);
  });
});

describe('shouldApplyRouteQuery', () => {
  test('ignores echoes of the last pushed query while the user kept typing', () => {
    expect(shouldApplyRouteQuery('web', 'webmcp', 'web')).toBe(false);
  });

  test('applies back/forward navigation to a different query', () => {
    expect(shouldApplyRouteQuery('redis', 'webmcp', 'webmcp')).toBe(true);
  });
});

describe('syncSiteSearchDialog', () => {
  afterEach(() => {
    document.querySelector('dialog')?.remove();
  });

  test('is a no-op when the dialog is missing', () => {
    expect(() => syncSiteSearchDialog(null, true)).not.toThrow();
  });

  test('reads the dialog from the component vnode, not from the document', () => {
    const dialog = document.createElement('dialog');
    expect(getSiteSearchDialog(null)).toBeNull();
    expect(
      getSiteSearchDialog({vnode: {el: dialog}} as never),
    ).toBe(dialog);
    expect(
      getSiteSearchDialog({vnode: {el: document.createElement('div')}} as never),
    ).toBeNull();
  });

  test('opens and closes the native dialog without double-toggle', () => {
    const dialog = document.createElement('dialog');
    if (typeof dialog.showModal !== 'function') {
      dialog.showModal = function showModal() {
        this.setAttribute('open', '');
      };
      dialog.close = function close() {
        this.removeAttribute('open');
      };
    }
    document.body.append(dialog);

    expect(dialog.open).toBe(false);

    syncSiteSearchDialog(dialog, true);
    expect(dialog.open).toBe(true);
    syncSiteSearchDialog(dialog, true);
    expect(dialog.open).toBe(true);

    syncSiteSearchDialog(dialog, false);
    expect(dialog.open).toBe(false);
    syncSiteSearchDialog(dialog, false);
    expect(dialog.open).toBe(false);
  });
});
