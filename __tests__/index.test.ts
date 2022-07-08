import {expect, it} from 'vitest';

const toUpperCase = (string: string) => {
  return string.toUpperCase();
};

it('toUpperCase', () => {
  const result = toUpperCase('foobarrr');
  expect(result).toMatchSnapshot();
});
