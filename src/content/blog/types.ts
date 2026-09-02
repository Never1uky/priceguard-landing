export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'note'; text: string }
  | { type: 'img'; src: string; alt: string; caption?: string }
  | { type: 'faq'; items: Array<{ question: string; answer: string }> }

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
