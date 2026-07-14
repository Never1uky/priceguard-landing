import { SITE } from '../site'

const fields = [
  { label: 'ФИО', value: SITE.legal.fullName },
  { label: 'ИНН', value: SITE.legal.inn },
  { label: 'Email', value: SITE.legal.email, href: `mailto:${SITE.legal.email}` },
  {
    label: 'Telegram',
    value: SITE.legal.telegram,
    href: `https://t.me/${SITE.legal.telegram.replace('@', '')}`,
  },
]

export function RequisitesPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-display text-4xl font-bold tracking-tight">Реквизиты</h1>
      <p className="mt-3 text-sm text-ink-soft">
        Данные продавца (исполнителя) для пользователей и для модерации ЮKassa / магазинов
        расширений.
      </p>

      <div className="mt-10 overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
        <dl className="divide-y divide-line">
          {fields.map((f) => (
            <div key={f.label} className="grid gap-1 px-6 py-5 sm:grid-cols-[160px_1fr] sm:gap-4">
              <dt className="text-xs font-semibold uppercase tracking-wider text-mint">{f.label}</dt>
              <dd className="text-base font-medium text-ink">
                {f.href ? (
                  <a href={f.href} className="text-ink no-underline hover:text-mint" target={f.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                    {f.value}
                  </a>
                ) : (
                  f.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="mt-6 rounded-2xl border border-dashed border-line bg-sky/40 p-4 text-sm text-ink-soft">
        Заполните реальные ФИО, ИНН, email и Telegram в файле{' '}
        <code className="rounded bg-white px-1.5 py-0.5 text-xs">src/site.ts</code> перед
        публикацией сайта.
      </p>
    </article>
  )
}
