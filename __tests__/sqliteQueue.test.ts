import {describe, expect, test} from 'vitest';
import {withSqlite} from '../app/utils/sqliteQueue';

describe('withSqlite', () => {
  test('runs tasks in start order even when the first one is slower', async () => {
    const order: number[] = [];

    await Promise.all([
      withSqlite(async () => {
        await new Promise(resolve => setTimeout(resolve, 20));
        order.push(1);
      }),
      withSqlite(async () => {
        order.push(2);
      }),
    ]);

    expect(order).toEqual([1, 2]);
  });
});
