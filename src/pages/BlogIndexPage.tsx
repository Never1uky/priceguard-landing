import { Link } from 'react-router-dom'
import { listBlogMeta } from '../content/blog'
import { usePageMeta } from '../hooks/usePageMeta'

function formatDate(iso: string): string {
  const d = Date.parse(iso)
  if (!Number.isFinite(d)) return iso
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d)
}

export function BlogIndexPage() {
  const articles = listBlogMeta()
  usePageMeta({
    title: 'Статьи о ценах на маркетплейсах',
    description:
      'Как отследить снижение цены на Ozon и других маркетплейсах, сравнить предложения и не пропустить скидку.',
    path: '/blog',
  })

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-display text-4xl font-bold tracking-tight">Статьи</h1>
      <p className="mt-3 text-sm text-ink-soft">
        Короткие материалы про цены на маркетплейсах и умный мониторинг.
      </p>

      <ul className="mt-10 space-y-8">
        {articles.map((article) => (
          <li key={article.slug} className="border-b border-line pb-8 last:border-0">
            <p className="text-xs font-medium uppercase tracking-wider text-mint">
              {formatDate(article.publishedAt)}
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight">
              <Link
                to={`/blog/${article.slug}`}
                className="text-ink no-underline hover:text-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded"
              >
                {article.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{article.teaser}</p>
            <Link
              to={`/blog/${article.slug}`}
              className="mt-3 inline-block text-sm font-semibold text-mint no-underline hover:underline"
            >
              Читать →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
