import type {
  WebMcpModelContext,
  WebMcpRegisterOptions,
  WebMcpTool,
} from './webmcpTypes';

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
export function registerWebMcpTools(
  tools: WebMcpTool[],
  options: WebMcpRegisterOptions = {},
): boolean {
  const modelContext = getModelContext();
  if (!modelContext) {
    return false;
  }

  try {
    if (typeof modelContext.registerTool === 'function') {
      for (const tool of tools) {
        void modelContext.registerTool(tool, options);
      }
      return true;
    }

    if (typeof modelContext.provideContext === 'function') {
      void modelContext.provideContext({tools});
      return true;
    }
  } catch (error) {
    console.warn('[webmcp] tool registration failed:', error);
  }

  return false;
}
