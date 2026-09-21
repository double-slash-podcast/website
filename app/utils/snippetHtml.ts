/** One interpolated text run from an FTS snippet, optionally wrapped in mark. */
export type SnippetPart = {
  text: string;
  highlighted: boolean;
};

/**
 * Remove every HTML tag, repeating until the string is stable so nested
 * leftovers such as `<scr<script>ipt>` cannot form a new tag.
 */
export function stripSnippetHtml(html: string): string {
  let previous = '';
  let current = html;
  do {
    previous = current;
    current = current.replace(/<[^>]*>/g, '');
  } while (current !== previous);

  return current.replace(/</g, '');
}

/**
 * Split an FTS snippet into plain-text parts. Highlighted ranges come from
 * `<mark>` tags; all other markup is stripped. Callers must render `text`
 * through Vue interpolation, never v-html.
 */
export function snippetHighlightParts(html: string): SnippetPart[] {
  const parts: SnippetPart[] = [];
  const matcher = /<mark\b[^>]*>([\s\S]*?)<\/mark>/gi;
  let lastIndex = 0;
  let match = matcher.exec(html);

  while (match) {
    if (match.index > lastIndex) {
      pushPart(parts, html.slice(lastIndex, match.index), false);
    }
    pushPart(parts, match[1] ?? '', true);
    lastIndex = matcher.lastIndex;
    match = matcher.exec(html);
  }

  if (lastIndex < html.length) {
    pushPart(parts, html.slice(lastIndex), false);
  }

  return parts;
}

/**
 * Append a stripped part when it still has visible text.
 */
function pushPart(
  parts: SnippetPart[],
  html: string,
  highlighted: boolean,
): void {
  const text = stripSnippetHtml(html);
  if (text) {
    parts.push({text, highlighted});
  }
}
