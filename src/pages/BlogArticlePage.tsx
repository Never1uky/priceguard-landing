import { Link, Navigate, useParams } from 'react-router-dom'
import { Fragment, useEffect, type ReactNode } from 'react'
import { getBlogArticle } from '../content/blog'
import type { BlogBlock } from '../content/blog/types'
import { SITE_ORIGIN } from '../content/blog/types'
import { usePageMeta } from '../hooks/usePageMeta'
import { SITE } from '../site'
import { InstallLink } from '../components/InstallLink'

function formatDate(iso: string): string {
  const d = Date.parse(iso)
  if (!Number.isFinite(d)) return iso
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d)
}

/** Inline markdown links: [label](url) — internal paths via Link, external via <a>. */
function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = []
  const re = /\[([^\]]+)\]\(([^)]+)\)/g
  let last = 0
  let match: RegExpExecArray | null
  let key = 0
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index))
    }
    const label = match[1]
    const href = match[2]
    const isInternal = href.startsWith('/')
    if (isInternal) {
      parts.push(
        <Link
          key={key++}
          to={href}
          className="font-medium text-mint no-underline hover:underline"
        >
          {label}
        </Link>,
      )
    } else {
      parts.push(
        <a
          key={key++}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-mint no-underline hover:underline"
        >
          {label}
        </a>,
      )
    }
    last = match.index + match[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return <Fragment>{parts}</Fragment>
}

function BlockView({ block }: { block: BlogBlock }) {
  if (block.type === 'h2') {
    return (
      <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">{block.text}</h2>
    )
  }
  if (block.type === 'h3') {
    return (
      <h3 className="font-display text-lg font-semibold text-ink sm:text-xl">{block.text}</h3>
    )
  }
  if (block.type === 'ul') {
    return (
      <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-soft sm:text-base">
        {block.items.map((item) => (
          <li key={item}>
            <RichText text={item} />
          </li>
        ))}
      </ul>
    )
  }
  if (block.type === 'note') {
    return (
      <p className="font-display text-base font-semibold text-ink sm:text-lg">{block.text}</p>
    )
  }
  if (block.type === 'img') {
    return (
      <figure className="space-y-2">
        <img
          src={block.src}
          alt={block.alt}
          loading="lazy"
          className="w-full rounded-xl border border-line bg-white"
        />
        {block.caption ? (
          <figcaption className="text-center text-xs text-ink-soft sm:text-sm">
            {block.caption}
          </figcaption>
        ) : null}
      </figure>
    )
  }
  if (block.type === 'faq') {
    return (
      <div className="space-y-5">
        <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
          Частые вопросы
        </h2>
        {block.items.map((item) => (
          <div key={item.question} className="space-y-1.5">
            <h3 className="font-display text-base font-semibold text-ink sm:text-lg">
              {item.question}
            </h3>
            <p className="text-sm leading-relaxed text-ink-soft sm:text-base">
              <RichText text={item.answer} />
            </p>
          </div>
        ))}
      </div>
    )
  }
  return (
    <p className="text-sm leading-relaxed text-ink-soft sm:text-base">
      <RichText text={block.text} />
    </p>
  )
}

function extractFaqItems(blocks: BlogBlock[]): Array<{ question: string; answer: string }> {
  const out: Array<{ question: string; answer: string }> = []
  for (const b of blocks) {
    if (b.type === 'faq') out.push(...b.items)
  }
  return out
}

function ArticleJsonLd({
  headline,
  description,
  path,
  publishedAt,
  faq,
}: {
  headline: string
  description: string
  path: string
  publishedAt: string
  faq: Array<{ question: string; answer: string }>
}) {
  const faqKey = JSON.stringify(faq)

  useEffect(() => {
    const url = `${SITE_ORIGIN}${path}`
    const faqItems = JSON.parse(faqKey) as Array<{ question: string; answer: string }>
    const graph: Record<string, unknown>[] = [
      {
        '@type': 'Article',
        headline,
        description,
        datePublished: publishedAt,
        dateModified: publishedAt,
        mainEntityOfPage: url,
        author: {
          '@type': 'Organization',
          name: SITE.productName,
          url: SITE_ORIGIN,
        },
        publisher: {
          '@type': 'Organization',
          name: SITE.productName,
          url: SITE_ORIGIN,
        },
        inLanguage: 'ru-RU',
      },
    ]
    if (faqItems.length > 0) {
      graph.push({
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      })
    }
    const payload = {
      '@context': 'https://schema.org',
      '@graph': graph,
    }
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'blog-article-jsonld'
    script.text = JSON.stringify(payload)
    document.getElementById('blog-article-jsonld')?.remove()
    document.head.appendChild(script)
    return () => {
      document.getElementById('blog-article-jsonld')?.remove()
    }
  }, [headline, description, path, publishedAt, faqKey])

  return null
}

export function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? getBlogArticle(slug) : undefined
  const faq = article ? extractFaqItems(article.blocks) : []

  usePageMeta({
    title: article?.title ?? 'Статья',
    description: article?.description,
    path: article ? `/blog/${article.slug}` : undefined,
    ogType: article ? 'article' : 'website',
    publishedAt: article?.publishedAt,
  })

  if (!article) {
    return <Navigate to="/blog" replace />
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <ArticleJsonLd
        headline={article.headline}
        description={article.description}
        path={`/blog/${article.slug}`}
        publishedAt={article.publishedAt}
        faq={faq}
      />
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
          Установите {SITE.productName} и получайте алерты в браузере и Telegram. Перед покупкой
          всё равно сверяйте цену на карточке маркетплейса.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <InstallLink className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white no-underline transition hover:bg-ink-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint">
            Установить PriceGuard AI
          </InstallLink>
          <Link
            to="/#pricing"
            className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink no-underline transition hover:bg-sky focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
          >
            Тарифы
          </Link>
          <a
            href={SITE.seoSiteOrigin}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink no-underline transition hover:bg-sky focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
          >
            Разборы товаров
          </a>
        </div>
      </div>
    </article>
  )
}
