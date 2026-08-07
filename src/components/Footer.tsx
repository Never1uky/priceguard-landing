import { Link } from 'react-router-dom'
import { SITE } from '../site'

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-sky">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-bold text-white">{SITE.productName}</p>
          <p className="mt-2 text-sm text-sky/80">{SITE.tagline}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-mint-bright">
            Документы
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/blog" className="text-sky/90 no-underline hover:text-white">
                Статьи
              </Link>
            </li>
            <li>
              <a
                href={SITE.seoSiteOrigin}
                target="_blank"
                rel="noreferrer"
                className="text-sky/90 no-underline hover:text-white"
              >
                Анализы
              </a>
            </li>
            <li>
              <Link to="/offer" className="text-sky/90 no-underline hover:text-white">
                Публичная оферта
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-sky/90 no-underline hover:text-white">
                Политика конфиденциальности
              </Link>
            </li>
            <li>
              <Link to="/requisites" className="text-sky/90 no-underline hover:text-white">
                Реквизиты
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-mint-bright">
            Контакты
          </p>
          <ul className="mt-3 space-y-2 text-sm text-sky/90">
            <li>
              <a href={`mailto:${SITE.legal.email}`} className="no-underline hover:text-white">
                {SITE.legal.email}
              </a>
            </li>
            <li>
              <a
                href={`https://t.me/${SITE.legal.telegram.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                className="no-underline hover:text-white"
              >
                Telegram {SITE.legal.telegram}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-sky/60">
        © {new Date().getFullYear()} {SITE.productName}. Все права защищены.
      </div>
    </footer>
  )
}
