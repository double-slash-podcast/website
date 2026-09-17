import {isNotFoundError} from './httpError';

/**
 * Print an SSR/prerender exception and its cause chain.
 * Production H3 replaces the message with "Server Error".
 * Expected 404s are skipped so `nuxt dev` is not flooded by missing pages.
 */
export function logUnknownError(label: string, error: unknown): void {
  if (isNotFoundError(error)) {
    return;
  }

  console.error(label, error);
  if (error instanceof Error) {
    if (error.stack) {
      console.error(error.stack);
    }
    if (error.cause) {
      logUnknownError(`${label}:cause`, error.cause);
    }
  }
  if (error && typeof error === 'object' && 'data' in error) {
    console.error(`${label}:data`, error.data);
  }
}
