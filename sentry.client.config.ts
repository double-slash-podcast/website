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
   * Privacy-first collection — restores the v10 `sendDefaultPii: false` default.
   * v11 flipped every `dataCollection` category to on: without this block the
   * browser SDK lets Sentry infer and store visitor IPs (`userInfo`), and
   * collects cookies, request bodies and raw query strings. Only User-Agent
   * is kept (v10 sent it too) so issues keep their browser context.
   */
  dataCollection: {
    userInfo: false,
    cookies: false,
    httpBodies: [],
    urlQueryParams: false,
    httpHeaders: {request: {allow: ['user-agent']}, response: false},
  },
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
