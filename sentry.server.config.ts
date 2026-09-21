import * as Sentry from '@sentry/nuxt';
import {isNotFoundError} from './app/utils/httpError';

const dsn = process.env.NUXT_PUBLIC_SENTRY_DSN;

/**
 * Server SDK for `nuxi generate` prerender failures.
 * Production is nginx/SSG, so tracing is disabled to avoid a flood of build spans.
 */
Sentry.init({
  dsn,
  environment:
    process.env.NUXT_SITE_ENV ||
    (process.env.NODE_ENV === 'production' ? 'production' : 'development'),
  tracesSampleRate: 0,
  /**
   * Drop expected 404s so missing content pages do not create Sentry issues.
   */
  beforeSend(event, hint) {
    if (isNotFoundError(hint.originalException)) {
      return null;
    }
    return event;
  },
});
