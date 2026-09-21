import * as Sentry from '@sentry/nuxt';
import {isNotFoundError} from './app/utils/httpError';

/**
 * Browser SDK for the SSG site: captures Vue errors only.
 * Tracing is off — a static site has no useful transaction spans and the
 * extra SDK work showed up on the homepage main thread (PageSpeed TBT).
 */
const {sentry} = useRuntimeConfig().public;

Sentry.init({
  dsn: sentry.dsn,
  environment: sentry.environment,
  tracesSampleRate: 0,
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
