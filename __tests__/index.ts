import { NODE_ENV } from '../src/utils/config'

test('trial', () => {
  expect(1).toBe(1)
})

test('NODE_ENV', () => {
  expect(NODE_ENV).toBe('testing')
})
