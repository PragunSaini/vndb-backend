import { combineBy } from '../../src/utils/helpers'

describe('combineBy helper', () => {
  const mock = [
    { id: 1, lang: 'en', name: 'B', rid: 13 },
    { id: 1, lang: 'ja', name: 'A', rid: 13 },
    { id: 1, lang: 'vi', name: 'C', rid: 13 },
    { id: 1, lang: 'ru', name: 'D', rid: 13 },
    { id: 3, lang: 'en', name: 'E', rid: 13 },
    { id: 3, lang: 'ja', name: 'F', rid: 13 },
    { id: 2, lang: 'en', name: 'G', rid: 13 },
    { id: 2, lang: 'ja', name: 'H', rid: 13 },
    { id: 2, lang: 'ch', name: 'I', rid: 13 },
    { id: 2, lang: 'in', name: 'J', rid: 13 },
  ]

  test('Just combine by id', () => {
    const res = combineBy(mock, 'id')
    expect(res.length).toBe(3)
  })

  test('Combine by id, merge lang', () => {
    const res = combineBy(mock, 'id', 'lang')
    expect(res.length).toBe(3)
    res.forEach(obj => {
      switch (obj.id) {
        case 1:
          expect(obj.lang.length).toBe(4)
          break
        case 2:
          expect(obj.lang.length).toBe(4)
          break
        case 3:
          expect(obj.lang.length).toBe(2)
          break
      }
    })
  })

  test('Combine by id, merge lang and rid', () => {
    const res = combineBy(mock, 'id', 'lang', 'rid')
    expect(res.length).toBe(3)
    res.forEach(obj => {
      switch (obj.id) {
        case 1:
          expect(obj.lang.length).toBe(4)
          expect(obj.rid.length).toBe(1)
          break
        case 2:
          expect(obj.lang.length).toBe(4)
          expect(obj.rid.length).toBe(1)
          break
        case 3:
          expect(obj.lang.length).toBe(2)
          expect(obj.rid.length).toBe(1)
          break
      }
    })
  })
})
