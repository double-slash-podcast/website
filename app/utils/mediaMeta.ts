const WHITESPACE_REGEX = /[\s\u00a0\u202f]/g;

export const parseMediaNumber = (value: unknown): number | undefined => {
  if (value === null || value === undefined || value === '') {
    return undefined;
  }

  if (typeof value === 'number' && Number.isFinite(value) && value > 0) {
    return Math.floor(value);
  }

  if (typeof value === 'string') {
    const normalized = value.replace(WHITESPACE_REGEX, '');
    if (!normalized) {
      return undefined;
    }

    const parsed = Number(normalized);
    if (Number.isFinite(parsed) && parsed > 0) {
      return Math.floor(parsed);
    }
  }

  return undefined;
};

export const isValidDuration = (value: unknown): boolean =>
  parseMediaNumber(value) !== undefined;

export const isValidFileSize = (value: unknown): boolean =>
  parseMediaNumber(value) !== undefined;
