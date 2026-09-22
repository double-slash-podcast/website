import {criticalCssPreloadTags} from '../utils/criticalCssPreload';

/**
 * Preload the hashed entry and header stylesheets once Nitro has emitted
 * their real URLs into the document head. Dev serves source CSS under other
 * names, so the filename filter adds nothing there.
 */
export default defineNitroPlugin(nitroApp => {
  nitroApp.hooks.hook('render:html', html => {
    const tags = criticalCssPreloadTags(html.head);
    if (tags.length === 0) {
      return;
    }

    html.head.unshift(...tags);
  });
});
