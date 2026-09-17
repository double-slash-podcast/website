import {
  clampCatalogLimit,
  findEpisode,
  formatCatalogItem,
  isSafeSitePath,
  latestEpisodes,
  rankCatalog,
} from './webmcpSearch';
import type {
  WebMcpCatalogItem,
  WebMcpDependencies,
  WebMcpTool,
  WebMcpToolInput,
} from './webmcpTypes';

/**
 * Read a string tool argument when the caller actually passed a string.
 */
function readString(input: WebMcpToolInput, key: string): string | undefined {
  const value = input[key];
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

/**
 * Read a finite number tool argument.
 */
function readNumber(input: WebMcpToolInput, key: string): number | undefined {
  const value = input[key];
  return typeof value === 'number' && Number.isFinite(value)
    ? value
    : undefined;
}

/**
 * Format a list of catalog hits, or a "no results" sentence.
 */
function formatHits(items: WebMcpCatalogItem[], emptyMessage: string): string {
  if (items.length === 0) {
    return emptyMessage;
  }

  return items
    .map((item, index) => `${index + 1}. ${formatCatalogItem(item)}`)
    .join('\n\n');
}

/**
 * Build the WebMCP tools Double Slash exposes to in-browser agents.
 */
export function createWebMcpTools(deps: WebMcpDependencies): WebMcpTool[] {
  return [
    {
      name: 'search_content',
      title: 'Rechercher sur Double Slash',
      description:
        'Recherche les épisodes du podcast et les articles du blog Double Slash par mot-clé (titre, description, tags, numéro d’épisode).',
      annotations: {readOnlyHint: true},
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            minLength: 1,
            description: 'Mot-clé, sujet, tag ou numéro d’épisode.',
          },
          kind: {
            type: 'string',
            enum: ['episode', 'article'],
            description:
              'Restreindre la recherche aux épisodes ou aux articles.',
          },
          limit: {
            type: 'integer',
            minimum: 1,
            maximum: 25,
            default: 5,
            description: 'Nombre maximum de résultats (1–25).',
          },
        },
        required: ['query'],
      },
      async execute(input) {
        const query = readString(input, 'query');
        if (!query) {
          return 'ERROR: query is required.';
        }

        const kind = readString(input, 'kind');
        const catalog = await deps.loadCatalog();
        const pool =
          kind === 'episode' || kind === 'article'
            ? catalog.filter(item => item.kind === kind)
            : catalog;
        const hits = rankCatalog(pool, query, readNumber(input, 'limit'));

        return formatHits(hits, `Aucun résultat pour « ${query} ».`);
      },
    },
    {
      name: 'list_episodes',
      title: 'Lister les épisodes',
      description:
        'Liste les épisodes les plus récents du podcast Double Slash, du plus récent au plus ancien.',
      annotations: {readOnlyHint: true},
      inputSchema: {
        type: 'object',
        properties: {
          limit: {
            type: 'integer',
            minimum: 1,
            maximum: 25,
            default: 10,
            description: 'Nombre d’épisodes à renvoyer (1–25).',
          },
        },
      },
      async execute(input) {
        const catalog = await deps.loadCatalog();
        const episodes = latestEpisodes(
          catalog,
          clampCatalogLimit(readNumber(input, 'limit'), 10),
        );

        return formatHits(episodes, 'Aucun épisode disponible.');
      },
    },
    {
      name: 'open_page',
      title: 'Ouvrir une page',
      description:
        'Navigue vers une page du site Double Slash (accueil, épisode, article, listes). Le chemin doit être relatif au site, par exemple /podcasts/ ou /articles/.',
      annotations: {readOnlyHint: false},
      inputSchema: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            minLength: 1,
            description:
              'Chemin relatif, par exemple /, /podcasts/, /articles/openclaw-vs-hermes/.',
          },
        },
        required: ['path'],
      },
      execute(input) {
        const path = readString(input, 'path');
        if (!path || !isSafeSitePath(path)) {
          return 'ERROR: path must be a same-origin site path starting with /.';
        }

        void deps.openPage(path);
        return `Navigation vers ${path}.`;
      },
    },
    {
      name: 'play_episode',
      title: 'Lire un épisode',
      description:
        'Lance la lecture d’un épisode dans le lecteur audio du site. Identifie l’épisode par dsSlug, numéro, chemin ou recherche textuelle.',
      annotations: {readOnlyHint: false},
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Titre, sujet ou fragment d’URL de l’épisode.',
          },
          dsSlug: {
            type: 'string',
            description: 'Identifiant audio, par exemple DS_137_news08-26.',
          },
          episodeNumber: {
            type: 'integer',
            minimum: 1,
            description: 'Numéro d’épisode.',
          },
          path: {
            type: 'string',
            description: 'Chemin de la page, par exemple /podcasts/news08-26.',
          },
        },
      },
      async execute(input) {
        const lookup = {
          query: readString(input, 'query'),
          dsSlug: readString(input, 'dsSlug'),
          path: readString(input, 'path'),
          episodeNumber: readNumber(input, 'episodeNumber'),
        };

        if (
          !lookup.query &&
          !lookup.dsSlug &&
          !lookup.path &&
          lookup.episodeNumber == null
        ) {
          return 'ERROR: provide query, dsSlug, path, or episodeNumber.';
        }

        const catalog = await deps.loadCatalog();
        const episode = findEpisode(catalog, lookup);
        if (!episode?.dsSlug) {
          return 'Aucun épisode correspondant. Utilise search_content ou list_episodes.';
        }

        deps.playEpisode(episode);
        return `Lecture de ${episode.title} (${episode.dsSlug}).`;
      },
    },
    {
      name: 'control_player',
      title: 'Contrôler le lecteur',
      description:
        'Contrôle le lecteur audio Double Slash : lecture, pause, ou statut de l’épisode en cours.',
      annotations: {readOnlyHint: false},
      inputSchema: {
        type: 'object',
        properties: {
          action: {
            type: 'string',
            enum: ['play', 'pause', 'status'],
            description: 'play reprend, pause met en pause, status lit l’état.',
          },
        },
        required: ['action'],
      },
      execute(input) {
        const action = readString(input, 'action');
        if (action === 'status') {
          return formatPlayerStatus(deps.getPlayerStatus());
        }

        if (action !== 'play' && action !== 'pause') {
          return 'ERROR: action must be play, pause, or status.';
        }

        const status = deps.getPlayerStatus();
        if (!status.title) {
          return 'Aucun épisode chargé. Utilise play_episode pour lancer une lecture.';
        }

        return formatPlayerStatus(deps.controlPlayer(action));
      },
    },
  ];
}

/**
 * Short player-status sentence for an agent.
 */
function formatPlayerStatus(status: {
  status: 'play' | 'pause';
  title?: string;
  dsSlug?: string;
}): string {
  if (!status.title) {
    return 'Lecteur vide : aucun épisode chargé.';
  }

  const verb = status.status === 'play' ? 'en lecture' : 'en pause';
  const slug = status.dsSlug ? ` [${status.dsSlug}]` : '';
  return `Lecteur ${verb} : ${status.title}${slug}.`;
}
