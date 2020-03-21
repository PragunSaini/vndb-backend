import { groupBy } from '../../src/utils/helpers'

describe('groupBy helper', () => {
  const mock = [
    { id: 1, names: 'deckard', rid: 144, lang: 'en' },
    { id: 1, names: 'rachel', rid: 122, lang: 'en' },
    { id: 2, names: 'kanada', rid: 121, lang: 'in' },
    { id: 2, names: 'nagisa', rid: 1431, lang: 'en' },
    { id: 3, names: 'hisoka', rid: 13, lang: 'it' },
    { id: 4, names: 'tomoya', rid: 132, lang: 'en' },
    { id: 5, names: 'ushio', rid: 134, lang: 'en' },
    { id: 5, names: 'okabe', rid: 1645, lang: 'ru' },
    { id: 5, names: 'arararagi', rid: 174, lang: 'ru' },
    { id: 5, names: 'shinobu', rid: 190, lang: 'en' },
  ]

  const smallermock = [
    { id: 1, names: 'deckard', rid: 144 },
    { id: 2, names: 'nagisa', rid: 1431 },
    { id: 1, names: 'rachel', rid: 122 },
    { id: 2, names: 'kanada', rid: 121 },
  ]

  test('Group by single property', () => {
    const res = groupBy(mock, obj => [obj.id])
    expect(res.length).toBe(5)
  })

  test('Group by single property (deep check)', () => {
    const res = groupBy(smallermock, obj => [obj.id])
    res.forEach(arr => {
      if (arr[0].id == 1) {
        arr.forEach(obj => {
          expect([144, 122]).toContain(obj.rid)
        })
      } else if (arr[0].id == 2) {
        arr.forEach(obj => {
          expect([121, 1431]).toContain(obj.rid)
        })
      }
    })
  })

  test('Group by multiple properties', () => {
    const res = groupBy(mock, obj => [obj.id, obj.lang])
    expect(res.length).toBe(7)
  })
})

describe('groupBy key property', () => {
  const mock = [
    { id: 1, names: 'deckard', rid: 144, lang: 'en' },
    { id: 1, names: 'rachel', rid: 122, lang: 'en' },
    { id: 2, names: 'kanada', rid: 121, lang: 'in' },
    { id: 2, names: 'nagisa', rid: 1431, lang: 'en' },
    { id: 3, names: 'hisoka', rid: 13, lang: 'it' },
    { id: 4, names: 'tomoya', rid: 132, lang: 'en' },
    { id: 5, names: 'ushio', rid: 134, lang: 'en' },
    { id: 5, names: 'okabe', rid: 1645, lang: 'ru' },
    { id: 5, names: 'arararagi', rid: 174, lang: 'ru' },
    { id: 5, names: 'shinobu', rid: 190, lang: 'en' },
  ]

  const smallermock = [
    { id: 1, names: 'deckard', rid: 144 },
    { id: 2, names: 'nagisa', rid: 1431 },
    { id: 1, names: 'rachel', rid: 122 },
    { id: 2, names: 'kanada', rid: 121 },
  ]

  test('Group by single property', () => {
    const res = groupBy(mock, 'id')
    expect(res.length).toBe(5)
  })

  test('Group by single property (deep check)', () => {
    const res = groupBy(smallermock, 'id')
    res.forEach(obj => {
      expect([1, 2]).toContain(obj.id)
      if (obj.id == 1) {
        expect(obj.rows.length).toBe(2)
      }
      if (obj.id == 2) {
        expect(obj.rows.length).toBe(2)
      }
    })
  })
})
