import { howToTrackOzonPriceDrops } from './how-to-track-ozon-price-drops'
import { howToComparePricesOzWbYm } from './kak-sravnit-ceny-ozon-wb-yandex-market'
import { whyMarketplacePriceChanges } from './pochemu-cena-na-marketpleyse-menyaetsya'
import { redmiG27qOzonVsYandexMarket } from './redmi-g27q-ozon-vs-yandex-market'
import type { BlogArticle, BlogArticleMeta } from './types'

export const blogArticles: BlogArticle[] = [
  redmiG27qOzonVsYandexMarket,
  howToTrackOzonPriceDrops,
  whyMarketplacePriceChanges,
  howToComparePricesOzWbYm,
]

export function listBlogMeta(): BlogArticleMeta[] {
  return [...blogArticles]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .map(({ blocks: _blocks, headline: _headline, ...meta }) => meta)
}

export function getBlogArticle(slug: string): BlogArticle | undefined {
  return blogArticles.find((article) => article.slug === slug)
}
