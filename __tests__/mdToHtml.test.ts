import {describe, expect, test} from 'vitest';
import renderMDToHtml, {convertToHtml} from '../helpers/renderer';
import body from './assets/body.json';

describe('transforme node from md to VNode Object', () => {
  test('render To HTML', () => {
    const node = renderMDToHtml(body);
    expect(node).toMatchSnapshot();
  });

  test('render To HTML from AST', () => {
    const node = convertToHtml(body);
    expect(node).toMatchSnapshot();
  });

  test('true', () => {
    expect(true).toBe(true);
  });
});
