import type { Language } from './types';

export const translations = {
  lv: {
    appTitle: 'Krišs & Alise kāzu ceļvedis',
    appSubtitle: 'Atrodi savu galdiņu un nakšņošanas vietu dažu sekunžu laikā.',
    welcome: 'Laipni lūgti Krišs & Alise kāzās! 🌿',
    nameLabel: 'Vārds',
    surnameLabel: 'Uzvārds',
    search: 'Meklēt',
    clear: 'Notīrīt',
    possibleMatches: 'Vai meklēji kādu no šiem viesiem?',
    noMatchTitle: 'Neizdevās atrast viesi',
    noMatchText:
      'Lūdzu pārbaudi vārdu un uzvārdu. Ja tomēr neizdodas, droši jautā vedējiem vai organizatoru komandai.',
    noMatchTextEn:
      'Please check your name and surname. If you still cannot find your entry, ask the hosts or wedding team.',
    seatingCardTitle: '1) Vispirms atrodi savu galdiņu',
    sleepingCardTitle: '2) Tad atrodi savu nakšņošanas vietu',
    table: 'Galdiņš',
    seat: 'Vieta',
    guestHouse: 'Viesu nams',
    room: 'Istaba / gulta',
    directions: 'Norādes',
    mapFallback: 'Marķieris nav pieejams, izmanto leģendu un tekstu.',
    helpNote: 'Ja kaut kas nav skaidrs, jautā vedējiem vai kāzu komandai 💛',
    languageButton: 'EN',
    back: 'Atpakaļ',
    selectedGuest: 'Atrasts viesis',
    notes: 'Piezīmes',
  },
  en: {
    appTitle: 'Krišs & Alise Wedding Guide',
    appSubtitle: 'Find your table and sleeping place in seconds.',
    welcome: 'Welcome to Krišs & Alise wedding! 🌿',
    nameLabel: 'Name',
    surnameLabel: 'Surname',
    search: 'Search',
    clear: 'Clear',
    possibleMatches: 'Did you mean one of these guests?',
    noMatchTitle: 'Guest not found',
    noMatchText:
      'Please check your name and surname. If it still does not work, ask the hosts or wedding team.',
    noMatchTextEn:
      'Lūdzu pārbaudi vārdu un uzvārdu. Ja joprojām neizdodas, jautā vedējiem vai kāzu komandai.',
    seatingCardTitle: '1) First find your table',
    sleepingCardTitle: '2) Then find your sleeping place',
    table: 'Table',
    seat: 'Seat',
    guestHouse: 'Guest house',
    room: 'Room / bed',
    directions: 'Directions',
    mapFallback: 'No marker coordinates available; use legend and text directions.',
    helpNote: 'If anything is unclear, ask the hosts or wedding team 💛',
    languageButton: 'LV',
    back: 'Back',
    selectedGuest: 'Guest found',
    notes: 'Notes',
  },
} as const;

export const t = (lang: Language, key: keyof (typeof translations)['lv']): string =>
  translations[lang][key];
