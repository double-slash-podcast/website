import {appendResponseHeader} from 'h3';
import type {H3Event} from 'h3';
import {AGENT_DISCOVERY_LINK_HEADER} from '../../app/utils/agentDiscovery';

/**
 * True when Node already flushed this response (Vite/HMR, streaming, assets).
 */
function hasFlushedHeaders(event: H3Event): boolean {
  const res = event.node.res;
  return res.headersSent || res.writableEnded;
}

/**
 * True when setHeader failed because the body is already on the wire.
 */
function isHeadersAlreadySentError(error: unknown): boolean {
  return (
    error instanceof Error &&
    /Cannot set headers after they are sent/i.test(error.message)
  );
}

/**
 * Append RFC 8288 Link headers for agent discovery on every Nitro response.
 * Uses append so Nuxt modulepreload/prefetch Link headers are kept.
 * Skips when headers are already flushed — common for Vite assets in `nuxt dev`.
 * Production SSG is nginx: repeat the same header in the server config.
 */
export default defineNitroPlugin(nitroApp => {
  nitroApp.hooks.hook('beforeResponse', event => {
    if (hasFlushedHeaders(event)) {
      return;
    }

    try {
      appendResponseHeader(event, 'Link', AGENT_DISCOVERY_LINK_HEADER);
    } catch (error) {
      if (hasFlushedHeaders(event) || isHeadersAlreadySentError(error)) {
        return;
      }
      console.error('[agent-discovery] failed to append Link header', error);
    }
  });
});
