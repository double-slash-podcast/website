import type {
  WebMcpModelContext,
  WebMcpRegisterOptions,
  WebMcpTool,
} from './webmcpTypes';

/** Events fired when a browser injects `modelContext` after first paint. */
export const WEB_MCP_READY_EVENTS = [
  'modelcontext',
  'modelcontextready',
] as const;

/**
 * Resolve the WebMCP model context from the current document or navigator.
 * Prefer `document.modelContext` (current spec); fall back to `navigator`.
 */
export function getModelContext(): WebMcpModelContext | undefined {
  if (typeof document !== 'undefined' && document.modelContext) {
    return document.modelContext;
  }
  if (typeof navigator !== 'undefined' && navigator.modelContext) {
    return navigator.modelContext;
  }
  return undefined;
}

/**
 * Register tools with the browser agent surface.
 * Uses `registerTool()` when available, otherwise `provideContext()`.
 * Returns false when the API is missing so callers can no-op silently.
 */
export async function registerWebMcpTools(
  tools: WebMcpTool[],
  options: WebMcpRegisterOptions = {},
): Promise<boolean> {
  const modelContext = getModelContext();
  if (!modelContext) {
    return false;
  }

  try {
    if (typeof modelContext.registerTool === 'function') {
      await Promise.all(
        tools.map(tool =>
          Promise.resolve(modelContext.registerTool?.(tool, options)).catch(
            error => {
              console.warn('[webmcp] registerTool failed:', tool.name, error);
            },
          ),
        ),
      );
      return true;
    }

    if (typeof modelContext.provideContext === 'function') {
      await Promise.resolve(modelContext.provideContext({tools}));
      return true;
    }
  } catch (error) {
    console.warn('[webmcp] tool registration failed:', error);
  }

  return false;
}

/**
 * Register now, and again if `modelContext` appears later.
 * Overlapping ready events share one in-flight registration.
 * Returns a teardown that drops the ready-event listeners.
 */
export function registerWebMcpToolsWhenAvailable(
  tools: WebMcpTool[],
  options: WebMcpRegisterOptions = {},
): () => void {
  let settled = false;
  let pending = false;

  const attempt = () => {
    if (settled || pending || options.signal?.aborted || !getModelContext()) {
      return;
    }

    pending = true;
    void registerWebMcpTools(tools, options)
      .then(ok => {
        if (!ok || options.signal?.aborted) {
          return;
        }

        settled = true;
        teardown();
      })
      .finally(() => {
        pending = false;
      });
  };

  const onAbort = () => {
    settled = true;
    teardown();
  };

  function teardown() {
    if (typeof window === 'undefined') {
      return;
    }

    for (const name of WEB_MCP_READY_EVENTS) {
      window.removeEventListener(name, attempt);
      document.removeEventListener(name, attempt);
    }
    options.signal?.removeEventListener('abort', onAbort);
  }

  attempt();

  if (typeof window !== 'undefined' && !settled && !options.signal?.aborted) {
    for (const name of WEB_MCP_READY_EVENTS) {
      window.addEventListener(name, attempt);
      document.addEventListener(name, attempt);
    }
    options.signal?.addEventListener('abort', onAbort, {once: true});
  }

  return teardown;
}
