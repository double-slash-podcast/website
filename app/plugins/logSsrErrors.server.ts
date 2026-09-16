import {logUnknownError} from '~/utils/logUnknownError';

/**
 * Log Vue SSR errors inside the prerender worker. Coolify otherwise only
 * shows Nitro's sanitized `[500] Server Error` for `/`.
 */
export default defineNuxtPlugin({
  name: 'log-ssr-errors',
  setup(nuxtApp) {
    nuxtApp.vueApp.config.errorHandler = (error, _instance, info) => {
      logUnknownError(`[vue:errorHandler] ${info}`, error);
    };
    nuxtApp.hook('vue:error', (error, _instance, info) => {
      logUnknownError(`[vue:error] ${info}`, error);
    });
    nuxtApp.hook('app:error', error => {
      logUnknownError('[app:error]', error);
    });
  },
});
