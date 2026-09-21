import * as Sentry from '@sentry/nuxt';
import {isNotFoundError} from './app/utils/httpError';

/**
 * Browser SDK for the SSG site: captures Vue errors and client-side traces.
 * The DSN is public; source maps stay private via SENTRY_AUTH_TOKEN at build time.
 */
const {sentry} = useRuntimeConfig().public;

Sentry.init({
  dsn: sentry.dsn,
  environment: sentry.environment,
  tracesSampleRate: 0.1,
  /**
   * Drop expected 404s (catch-all content pages, crawler probes).
   */
  beforeSend(event, hint) {
    if (isNotFoundError(hint.originalException)) {
      return null;
    }
    return event;
  },
});
