let chain: Promise<unknown> = Promise.resolve();

/**
 * Run SQLite WASM work one task at a time.
 * Concurrent Content queries and FTS5 builds corrupt each other's results.
 */
export function withSqlite<T>(task: () => Promise<T>): Promise<T> {
  const run = chain.then(task, task);
  chain = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}
