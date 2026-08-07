import { howToTrackOzonPriceDrops } from './how-to-track-ozon-price-drops'
import type { BlogArticle, BlogArticleMeta } from './types'

export const blogArticles: BlogArticle[] = [howToTrackOzonPriceDrops]

export function listBlogMeta(): BlogArticleMeta[] {
  return [...blogArticles]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .map(({ blocks: _blocks, headline: _headline, ...meta }) => meta)
}

export function getBlogArticle(slug: string): BlogArticle | undefined {
  return blogArticles.find((article) => article.slug === slug)
}
