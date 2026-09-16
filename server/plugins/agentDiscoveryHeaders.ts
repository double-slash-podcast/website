import {appendResponseHeader} from 'h3';
import {AGENT_DISCOVERY_LINK_HEADER} from '../../app/utils/agentDiscovery';

/**
 * Append RFC 8288 Link headers for agent discovery on every Nitro response.
 * Uses append so Nuxt modulepreload/prefetch Link headers are kept.
 * Production SSG is nginx: repeat the same header in the server config.
 */
export default defineNitroPlugin(nitroApp => {
  nitroApp.hooks.hook('beforeResponse', event => {
    try {
      appendResponseHeader(event, 'Link', AGENT_DISCOVERY_LINK_HEADER);
    } catch (error) {
      console.error('[agent-discovery] failed to append Link header', error);
    }
  });
});
