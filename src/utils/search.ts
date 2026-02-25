import type { Guest } from '../types';

const diacriticMap: Record<string, string> = {
  ā: 'a',
  ē: 'e',
  ī: 'i',
  ū: 'u',
  ģ: 'g',
  ķ: 'k',
  ļ: 'l',
  ņ: 'n',
  š: 's',
  ž: 'z',
  č: 'c',
};

export const normalizeLatvianText = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[āēīūģķļņšžč]/g, (char) => diacriticMap[char] ?? char)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

export const fullName = (guest: Guest) => `${guest.name} ${guest.surname}`;

const fullNameNormalized = (guest: Guest) =>
  normalizeLatvianText(`${guest.name} ${guest.surname}`);

export interface SearchResult {
  exactMatches: Guest[];
  fuzzyMatches: Guest[];
}

export const searchGuests = (
  guests: Guest[],
  name: string,
  surname: string,
): SearchResult => {
  const query = normalizeLatvianText(`${name} ${surname}`);
  if (!query) {
    return { exactMatches: [], fuzzyMatches: [] };
  }

  const exactMatches = guests.filter((guest) => fullNameNormalized(guest) === query);
  if (exactMatches.length > 0) {
    return { exactMatches, fuzzyMatches: [] };
  }

  const fuzzyMatches = guests
    .map((guest) => ({ guest, distance: levenshtein(fullNameNormalized(guest), query) }))
    .filter((item) => item.distance <= 2)
    .sort((a, b) => a.distance - b.distance)
    .map((item) => item.guest)
    .slice(0, 3);

  return { exactMatches: [], fuzzyMatches };
};

const levenshtein = (a: string, b: string): number => {
  const matrix = Array.from({ length: a.length + 1 }, () => Array<number>(b.length + 1).fill(0));

  for (let i = 0; i <= a.length; i += 1) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j += 1) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      );
    }
  }

  return matrix[a.length][b.length];
};
