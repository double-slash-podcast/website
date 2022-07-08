import {expect, it} from 'vitest';

const toUpperCase = (string: string) => {
  return string.toUpperCase();
};

it('toUpperCase', () => {
  const result = toUpperCase('foobar');
  expect(result).toMatchSnapshot();
});
