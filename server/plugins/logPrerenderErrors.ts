/**
 * Print the underlying prerender failure. Production Nuxt diagnostics omit
 * the cause, so Coolify only showed `[500] Server Error` for `/`.
 */
export default defineNitroPlugin(nitroApp => {
  nitroApp.hooks.hook('prerender:generate', route => {
    if (!route.error) {
      return;
    }
    console.error('[prerender]', route.route, route.error);
    if (route.error instanceof Error && route.error.stack) {
      console.error(route.error.stack);
    }
  });
});
