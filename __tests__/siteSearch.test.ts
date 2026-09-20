import {afterEach, describe, expect, test} from 'vitest';
import {shouldApplyRouteQuery} from '../app/utils/searchRouteSync';
import {
  SITE_SEARCH_DIALOG_ID,
  getSiteSearchDialog,
  syncSiteSearchDialog,
} from '../app/utils/siteSearchDialog';
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
    document.getElementById(SITE_SEARCH_DIALOG_ID)?.remove();
  });

  test('is a no-op when the dialog is missing', () => {
    expect(getSiteSearchDialog()).toBeNull();
    expect(() => syncSiteSearchDialog(true)).not.toThrow();
  });

  test('opens and closes the native dialog without double-toggle', () => {
    const dialog = document.createElement('dialog');
    dialog.id = SITE_SEARCH_DIALOG_ID;
    if (typeof dialog.showModal !== 'function') {
      dialog.showModal = function showModal() {
        this.setAttribute('open', '');
      };
      dialog.close = function close() {
        this.removeAttribute('open');
      };
    }
    document.body.append(dialog);

    expect(getSiteSearchDialog()).toBe(dialog);
    expect(dialog.open).toBe(false);

    syncSiteSearchDialog(true);
    expect(dialog.open).toBe(true);
    syncSiteSearchDialog(true);
    expect(dialog.open).toBe(true);

    syncSiteSearchDialog(false);
    expect(dialog.open).toBe(false);
    syncSiteSearchDialog(false);
    expect(dialog.open).toBe(false);
  });
});
