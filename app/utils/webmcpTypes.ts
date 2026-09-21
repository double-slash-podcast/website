/**
 * WebMCP tool and model-context shapes used by the client plugin.
 * Covers both the current `registerTool()` surface and older `provideContext()`.
 */

export type WebMcpCatalogKind = 'episode' | 'article';

/** Raw Nuxt Content row before it is slimmed for agents. */
export type WebMcpCatalogSource = {
  title?: string;
  path?: string;
  description?: string;
  tags?: string[];
  dsSlug?: string;
  episodeNumber?: number;
  publicationDate?: string | number | Date | null;
  status?: string;
};

export type WebMcpCatalogItem = {
  kind: WebMcpCatalogKind;
  title: string;
  path: string;
  description: string;
  tags: string[];
  dsSlug?: string;
  episodeNumber?: number;
  publicationDate?: string;
};

export type WebMcpPlayerStatus = {
  status: 'play' | 'pause';
  title?: string;
  dsSlug?: string;
};

/** FTS5 row passed from the client plugin into search_content. */
export type WebMcpFullTextHit = {
  collection: string;
  id: string;
  title: string;
  content: string;
  rank: number;
  snippet?: string;
};

export type WebMcpDependencies = {
  loadCatalog: () => Promise<WebMcpCatalogItem[]>;
  searchFullText?: (
    query: string,
    limit: number,
  ) => Promise<WebMcpFullTextHit[]>;
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
