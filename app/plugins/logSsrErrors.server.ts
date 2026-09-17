import {logUnknownError} from '~/utils/logUnknownError';

/**
 * Log Vue SSR errors inside the prerender worker. Coolify otherwise only
 * shows Nitro's sanitized `[500] Server Error` for `/`.
 * Chains Nuxt's existing errorHandler so render failures still surface.
 */
export default defineNuxtPlugin({
  name: 'log-ssr-errors',
  setup(nuxtApp) {
    const previous = nuxtApp.vueApp.config.errorHandler;
    nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
      logUnknownError(`[vue:errorHandler] ${info}`, error);
      return previous?.(error, instance, info);
    };
    nuxtApp.hook('vue:error', (error, _instance, info) => {
      logUnknownError(`[vue:error] ${info}`, error);
    });
    nuxtApp.hook('app:error', error => {
      logUnknownError('[app:error]', error);
    });
  },
});
