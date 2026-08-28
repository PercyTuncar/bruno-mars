import type { CountrySlug } from '@/data/countries.config'
import { peruContent } from './peru'
import { chileContent } from './chile'
import { argentinaContent } from './argentina'
import { colombiaContent } from './colombia'
import { brasilContent } from './brasil'

export type CountryContent = typeof peruContent

const contentMap: Record<CountrySlug, CountryContent> = {
  peru: peruContent,
  chile: chileContent,
  argentina: argentinaContent,
  colombia: colombiaContent,
  brasil: brasilContent,
}

export function getCountryContent(slug: CountrySlug): CountryContent {
  return contentMap[slug]
}
