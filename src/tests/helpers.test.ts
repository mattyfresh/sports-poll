import { getSportIcon } from '../helpers'

describe('getSportIcon', () => {
  it('should return the fallback if the sport does not have a corresponding svg', () => {
    const result = getSportIcon('SOCCER')
    expect(result.default).toBe('FALLBACK.svg')
  })

  it('returns the correct svg', () => {
    const keyValPairs = {
      FOOTBALL: 'FOOTBALL.svg',
      SNOOKER: 'SNOOKER.svg',
      ICE_HOCKEY: 'ICE_HOCKEY.svg',
      TENNIS: 'TENNIS.svg',
    }

    for (let key in keyValPairs) {
      const svg = getSportIcon(key)
      expect(svg.default).toEqual(keyValPairs[key])
    }
  })
})
