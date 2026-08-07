import { Link, Navigate, useParams } from 'react-router-dom'
import { getBlogArticle } from '../content/blog'
import type { BlogBlock } from '../content/blog/types'
import { usePageMeta } from '../hooks/usePageMeta'
import { SITE } from '../site'

function formatDate(iso: string): string {
  const d = Date.parse(iso)
  if (!Number.isFinite(d)) return iso
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d)
}

function BlockView({ block }: { block: BlogBlock }) {
  if (block.type === 'h2') {
    return (
      <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">{block.text}</h2>
    )
  }
  if (block.type === 'ul') {
    return (
      <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-soft sm:text-base">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )
  }
  if (block.type === 'note') {
    return (
      <p className="font-display text-base font-semibold text-ink sm:text-lg">{block.text}</p>
    )
  }
  return <p className="text-sm leading-relaxed text-ink-soft sm:text-base">{block.text}</p>
}

export function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? getBlogArticle(slug) : undefined

  usePageMeta({
    title: article?.title ?? 'Статья',
    description: article?.description,
    path: article ? `/blog/${article.slug}` : undefined,
  })

  if (!article) {
    return <Navigate to="/blog" replace />
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm">
        <Link to="/blog" className="font-medium text-mint no-underline hover:underline">
          ← Все статьи
        </Link>
      </p>
      <p className="mt-6 text-xs font-medium uppercase tracking-wider text-mint">
        {formatDate(article.publishedAt)}
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        {article.headline}
      </h1>
      <p className="mt-3 text-sm text-ink-soft">{article.description}</p>

      <div className="mt-10 space-y-5">
        {article.blocks.map((block, index) => (
          <BlockView key={`${block.type}-${index}`} block={block} />
        ))}
      </div>

      <div className="mt-12 border-t border-line pt-8">
        <p className="font-display text-lg font-semibold text-ink">
          Готовы отслеживать цены без рутины?
        </p>
        <p className="mt-2 text-sm text-ink-soft">
          Установите {SITE.productName} и получайте алерты в браузере и Telegram.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={SITE.chromeStoreUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white no-underline transition hover:bg-ink-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
          >
            Установить PriceGuard AI
          </a>
          <Link
            to="/#pricing"
            className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink no-underline transition hover:bg-sky focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
          >
            Тарифы
          </Link>
        </div>
      </div>
    </article>
  )
}
