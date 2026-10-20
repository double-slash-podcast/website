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
   * Privacy-first collection — restores the v10 `sendDefaultPii: false` default.
   * v11 collects user info (IP), cookies, request bodies and — new in v11 —
   * local variable values in stack frames (`stackFrameVariables`). This SDK
   * mostly reports `nuxi generate` prerender errors, but it also runs during
   * `nuxt dev` with real incoming requests, so keep the client's privacy
   * posture. Prerender errors carry no incoming-request headers worth
   * keeping, so headers are dropped entirely here.
   */
  dataCollection: {
    userInfo: false,
    cookies: false,
    httpBodies: [],
    urlQueryParams: false,
    httpHeaders: false,
    stackFrameVariables: false,
  },
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
