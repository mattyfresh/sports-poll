import sportsData from './data/sports.json'
import { MatchMeta } from './typings/types'

// sorting algorithm from https://www.w3schools.com/js/js_array_sort.asp
// will randomly sort array based on + or - value of sorting function
export const getRandomMatch = () =>
  sportsData.sort(() => 0.5 - Math.random())[0] as MatchMeta

// retrieve a flag img URL
export const flagsMap = {
  SWEDEN: 'https://restcountries.eu/data/swe.svg',
  FRANCE: 'https://restcountries.eu/data/fra.svg',
  ENGLAND: 'https://restcountries.eu/data/gbr.svg',
} as { [x: string]: string }

// retrieve a human readable match state
export const matchStateMap = {
  STARTED: 'in progress',
  FINISHED: 'over',
  NOT_STARTED: 'not yet started',
} as { [x: string]: string }

// retrieve the icon based on sport name
export const getSportIcon = (sportName: string) => {
  try {
    return require(`./icons/${sportName}.svg`)
  } catch (e) {
    // console.log(e)
    return require(`./icons/FALLBACK.svg`)
  }
}
