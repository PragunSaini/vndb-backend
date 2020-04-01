/* eslint-disable */
const mappers = {
  animeType: {
    tv: 'TV Series',
    ova: 'OVA',
    mov: 'Movie',
    oth: 'Other',
    web: 'Web',
    spe: 'TV Special',
    mv: 'Music Video',
  },
  tagCategory: {
    tech: 'Technical',
    ero: 'Content',
    cont: 'Sexual content',
  },
  vnRelation: {
    seq: 'Prequel',
    preq: 'Sequel',
    set: 'Same setting',
    alt: 'Alternative version',
    char: 'Shares characters',
    side: 'Parent story',
    par: 'Side story',
    ser: 'Same series',
    fan: 'Original game',
    orig: 'Fandisc',
  },
  vnLength: {
    0: null,
    1: 'Very short (< 2 hours)',
    2: 'Short (2 - 10 hours)',
    3: 'Medium (10 - 30 hours)',
    4: 'Long (30 - 50 hours)',
    5: 'Very long (> 50 hours)',
  },
}

export function mapAnimeType<T, K extends keyof T>(obj: T, key: K): void {
  // @ts-ignore
  obj[key] = mappers.animeType[obj[key]]
}

export function mapVnRelation<T, K extends keyof T>(obj: T, key: K): void {
  // @ts-ignore
  obj[key] = mappers.vnRelation[obj[key]]
}

export function mapVnlength<T, K extends keyof T>(obj: T, key: K): void {
  // @ts-ignore
  obj.lengthDesc = mappers.vnLength[obj[key]]
}

// module.exports = {
//   platforms: {
//     win: 'Windows',
//     ps3: 'Playstation 3',
//     psv: 'Playstation Vita',
//     xb3: 'Xbox 360',
//     lin: 'Linux',
//     mac: 'macOS',
//     and: 'Android',
//     ios: 'iOS',
//     nds: 'Nintendo DS',
//     ps2: 'Playstation 2',
//     drc: 'Dreamcast',
//     psp: 'Playstation Portable',
//     gba: 'Gameboy Advance',
//     wii: 'Nintendo Wii',
//     n3d: 'Nintendo 3DS',
//     oth: 'Other',
//     dvd: 'DVD Player',
//     bdp: 'Blu-ray Player',
//     web: 'Browser'
//   },
//   length: [
//     'Very Short',
//     'Short',
//     'Medium',
//     'Long',
//     'Very Long'
//   ],
//   languages: {
//     ja: 'Japanese',
//     en: 'English',
//     ru: 'Russian',
//     zh: 'Chinese',
//     it: 'Italian',
//     fr: 'French',
//     de: 'German',
//     hu: 'Hungarian',
//     es: 'Spanish',
//     pl: 'Polish',
//     'pt-br': 'Portuguese (Brazil)',
//     ca: 'Catalan',
//     vi: 'Vietnamese',
//     ar: 'Arabic',
//     ko: 'Korean'
//   },
//   vnRelations: {
//     preq: 'Prequel',
//     char: 'Shares Characters',
//     fan: 'Fandisc',
//     set: 'Shares Setting',
//     ser: 'Shares Series',
//     side: 'Side Story',
//     seq: 'Sequel',
//     alt: 'Alternative Version'
//   },
//   proRelations: {
//     ipa: 'Parent Brand',
//     par: 'Parent Producer',
//     spa: 'Spawned',
//     sub: 'Subsidiary',
//     imp: 'Imprint'
//   },
//   releaseType: {
//     complete: 'Complete',
//     partial: 'Partial',
//     trial: 'Trial'
//   },
//   producerType: {
//     co: 'Company',
//     ng: 'Amateur Group',
//     in: 'Individual'
//   },
//   media: {
//     blr: 'Blu-ray',
//     dvd: 'DVD',
//     cd: 'CD',
//     in: 'Internet Download'
//   },
//   characterGender: {
//     m: 'Male',
//     f: 'Female',
//     b: 'Both'
//   },
//   listStatus: [
//     'Unknown',
//     'Playing',
//     'Finished',
//     'On Hold',
//     'Dropped'
//   ],
//   priority: [
//     'High',
//     'Medium',
//     'Low',
//     'Blacklist'
//   ]
// };
