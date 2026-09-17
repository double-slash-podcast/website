import {logUnknownError} from '~/utils/logUnknownError';

/**
 * Log Nitro request failures during prerender. `prerender:generate` lives on
 * the parent generate process (see nuxt.config nitro.hooks), not here.
 */
export default defineNitroPlugin(nitroApp => {
  nitroApp.hooks.hook('error', (error, context) => {
    const path = context.event?.path ?? '';
    logUnknownError(`[nitro:error] ${path}`, error);
  });
});
