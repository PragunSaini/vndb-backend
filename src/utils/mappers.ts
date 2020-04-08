/* eslint-disable */
import { mappers } from './mapData'

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

export function mapLanguage<T, K extends keyof T>(obj: T, key: K): void {
  // @ts-ignore
  obj.language = mappers.isoLangs[obj[key]].name
}

export function mapRelease(obj: any): void {
  obj.website = obj.website == '' ? null : obj.website
  obj.voiced = mappers.releaseVoiced[obj.voiced as 0 | 1 | 2 | 3 | 4]
  obj.ani_story = mappers.releaseAniStory[obj.ani_story as 0 | 1 | 2 | 3 | 4]
  obj.ani_ero = mappers.releaseAniStory[obj.ani_ero as 0 | 1 | 2 | 3 | 4]
  // @ts-ignore
  obj.platform = mappers.platforms[obj.platform]
}

// module.exports = {
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
