import { NavLink } from 'react-router-dom'
import { SITE } from '../site'

const links = [
  { to: '/', label: 'Главная', end: true },
  { to: '/blog', label: 'Статьи' },
  { to: '/offer', label: 'Оферта' },
  { to: '/privacy', label: 'Конфиденциальность' },
  { to: '/requisites', label: 'Реквизиты' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <NavLink to="/" className="flex items-center gap-2.5 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded-xl">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-mint text-white shadow-sm">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
              <path
                d="M5 13l4 4L19 7"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-ink">
            {SITE.productName}
          </span>
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Основная навигация">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                [
                  'rounded-lg px-3 py-2 text-sm font-medium no-underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint',
                  isActive
                    ? 'bg-mint/15 text-ink'
                    : 'text-ink-soft hover:bg-sky hover:text-ink',
                ].join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <a
          href={SITE.chromeStoreUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-ink px-3.5 py-2 text-xs font-semibold text-white no-underline transition hover:bg-ink-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint sm:text-sm"
        >
          Установить
        </a>
      </div>

      <nav
        className="flex gap-1 overflow-x-auto border-t border-line/60 px-3 py-2 md:hidden"
        aria-label="Мобильная навигация"
      >
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              [
                'shrink-0 rounded-full px-3 py-1.5 text-xs font-medium no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint',
                isActive ? 'bg-mint text-white' : 'bg-sky text-ink-soft',
              ].join(' ')
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
