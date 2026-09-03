/**
 * Generates public/sitemap.xml from marketing + blog URLs.
 * Run via: node scripts/generate-sitemap.mjs  (also hooked as prebuild)
 */
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const ORIGIN = 'https://priceguard-landing.vercel.app'

/** Keep in sync with src/content/blog/*.ts publishedAt */
const BLOG = [
  { slug: 'redmi-g27q-ozon-vs-yandex-market', lastmod: '2026-09-02' },
  { slug: 'kak-sravnit-ceny-ozon-wb-yandex-market', lastmod: '2026-08-10' },
  { slug: 'pochemu-cena-na-marketpleyse-menyaetsya', lastmod: '2026-08-09' },
  { slug: 'kak-otslezhivat-snizhenie-cen-na-ozon', lastmod: '2026-08-07' },
]

const PAGES = [
  { path: '/', lastmod: '2026-09-02', changefreq: 'weekly', priority: '1.0' },
  { path: '/blog', lastmod: '2026-09-02', changefreq: 'weekly', priority: '0.9' },
  { path: '/offer', lastmod: '2026-08-01', changefreq: 'monthly', priority: '0.3' },
  { path: '/privacy', lastmod: '2026-08-01', changefreq: 'monthly', priority: '0.3' },
  { path: '/requisites', lastmod: '2026-08-01', changefreq: 'monthly', priority: '0.3' },
]

function urlEntry({ loc, lastmod, changefreq, priority }) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

const urls = [
  ...PAGES.map((p) =>
    urlEntry({
      loc: `${ORIGIN}${p.path === '/' ? '/' : p.path}`,
      lastmod: p.lastmod,
      changefreq: p.changefreq,
      priority: p.priority,
    }),
  ),
  ...BLOG.map((a) =>
    urlEntry({
      loc: `${ORIGIN}/blog/${a.slug}`,
      lastmod: a.lastmod,
      changefreq: 'monthly',
      priority: '0.8',
    }),
  ),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`

const out = join(ROOT, 'public', 'sitemap.xml')
writeFileSync(out, xml, 'utf8')
console.log(`Wrote ${out} (${PAGES.length + BLOG.length} URLs)`)
