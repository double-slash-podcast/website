/**
 * WebMCP tool and model-context shapes used by the client plugin.
 * Covers both the current `registerTool()` surface and older `provideContext()`.
 */

export type WebMcpCatalogKind = 'episode' | 'article';

export type WebMcpCatalogItem = {
  kind: WebMcpCatalogKind;
  title: string;
  path: string;
  description: string;
  tags: string[];
  dsSlug?: string;
  episodeNumber?: number;
};

export type WebMcpPlayerStatus = {
  status: 'play' | 'pause';
  title?: string;
  dsSlug?: string;
};

export type WebMcpDependencies = {
  loadCatalog: () => Promise<WebMcpCatalogItem[]>;
  openPage: (path: string) => void | Promise<unknown>;
  playEpisode: (item: WebMcpCatalogItem) => void;
  controlPlayer: (action: 'play' | 'pause') => WebMcpPlayerStatus;
  getPlayerStatus: () => WebMcpPlayerStatus;
};

export type WebMcpToolInput = Record<string, unknown>;

export type WebMcpTool = {
  name: string;
  title?: string;
  description: string;
  inputSchema?: Record<string, unknown>;
  annotations?: {
    readOnlyHint?: boolean;
    untrustedContentHint?: boolean;
    consequentialHint?: boolean;
  };
  execute: (
    input: WebMcpToolInput,
    options?: {signal?: AbortSignal},
  ) => Promise<string> | string;
};

export type WebMcpModelContext = {
  registerTool?: (
    tool: WebMcpTool,
    options?: {signal?: AbortSignal},
  ) => Promise<void> | void;
  provideContext?: (context: {tools: WebMcpTool[]}) => Promise<void> | void;
};

export type WebMcpRegisterOptions = {
  signal?: AbortSignal;
};

declare global {
  interface Navigator {
    modelContext?: WebMcpModelContext;
  }

  interface Document {
    modelContext?: WebMcpModelContext;
  }
}

export {};
