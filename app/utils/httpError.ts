export type HttpErrorLike = {
  statusCode?: number;
  status?: number;
  statusMessage?: string;
};

export type ErrorPageCopy = {
  title: string;
  heading: string;
  description: string;
};

/**
 * Options for a missing content page. `fatal` shows error.vue on client nav,
 * not a blank page (Nuxt treats thrown createError as non-fatal otherwise).
 */
export const notFoundErrorOptions = {
  statusCode: 404,
  statusMessage: 'Page not found',
  fatal: true,
} as const;

/**
 * Resolve the HTTP status from a Nuxt error (statusCode or Nuxt 4 `status`).
 * Defaults to 404: this SSG site almost always surfaces missing pages, and
 * a missing status during hydration must not flip the copy to a 500.
 */
export function getErrorStatusCode(error?: HttpErrorLike | null): number {
  return error?.statusCode ?? error?.status ?? 404;
}

/**
 * User-facing SEO + body copy for error.vue. 404 stays a not-found message;
 * any other status is an unexpected failure.
 */
export function getErrorPageCopy(statusCode = 500): ErrorPageCopy {
  if (statusCode === 404) {
    return {
      title: 'Page non trouvée',
      heading: 'Page non trouvée !',
      description:
        'Désolé, la page que vous cherchez ne semble pas/plus exister.',
    };
  }

  return {
    title: 'Une erreur est survenue',
    heading: 'Une erreur est survenue !',
    description: "Désolé, un problème inattendu s'est produit.",
  };
}
