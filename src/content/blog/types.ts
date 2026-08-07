export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'note'; text: string }

export interface BlogArticleMeta {
  slug: string
  title: string
  description: string
  publishedAt: string
  /** Short card blurb on /blog */
  teaser: string
}

export interface BlogArticle extends BlogArticleMeta {
  headline: string
  blocks: BlogBlock[]
}

export const SITE_ORIGIN = 'https://priceguard-landing.vercel.app'
