import {describe, expect, test} from 'vitest';
import {shouldApplyRouteQuery} from '../app/utils/searchRouteSync';
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
