import { Link } from 'react-router-dom'
import { SITE } from '../site'

type Field = {
  label: string
  value: string
  href?: string
  mono?: boolean
}

const sellerFields: Field[] = [
  { label: 'ФИО', value: SITE.legal.fullName },
  { label: 'Статус', value: SITE.legal.status },
  { label: 'ИНН', value: SITE.legal.inn, mono: true },
  { label: 'Email', value: SITE.legal.email, href: `mailto:${SITE.legal.email}` },
  {
    label: 'Telegram',
    value: SITE.legal.telegram,
    href: `https://t.me/${SITE.legal.telegram.replace('@', '')}`,
  },
]

const serviceFields: Field[] = [
  { label: 'Продукт', value: SITE.productName },
  { label: 'Описание услуги', value: SITE.legal.productDescription },
  { label: 'Оплата', value: SITE.legal.paymentProvider },
  {
    label: 'Тарифы',
    value: `${SITE.pricing.monthlyRub} ₽ / мес · ${SITE.pricing.yearlyRub} ₽ / год (−${SITE.pricing.yearlySavingsPercent}%)`,
  },
]

function FieldList({ fields }: { fields: Field[] }) {
  return (
    <dl className="divide-y divide-line">
      {fields.map((f) => (
        <div key={f.label} className="grid gap-1 px-6 py-5 sm:grid-cols-[180px_1fr] sm:gap-4">
          <dt className="text-xs font-semibold uppercase tracking-wider text-mint">{f.label}</dt>
          <dd className={`text-base font-medium text-ink ${f.mono ? 'font-mono tracking-wide' : ''}`}>
            {f.href ? (
              <a
                href={f.href}
                className="text-ink no-underline hover:text-mint"
                target={f.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
              >
                {f.value}
              </a>
            ) : (
              f.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  )
}

export function RequisitesPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-mint">
        Для покупателей и ЮKassa
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold tracking-tight">Реквизиты продавца</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
        Полные данные исполнителя по договору оказания услуг (цифровой доступ к Premium{' '}
        {SITE.productName}). Используются при оплате через ЮKassa и по запросу магазинов
        расширений.
      </p>

      <section className="mt-10 overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
        <div className="border-b border-line bg-sky/40 px-6 py-4">
          <h2 className="font-display text-lg font-semibold text-ink">Исполнитель</h2>
        </div>
        <FieldList fields={sellerFields} />
      </section>

      <section className="mt-6 overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
        <div className="border-b border-line bg-sky/40 px-6 py-4">
          <h2 className="font-display text-lg font-semibold text-ink">Услуга и оплата</h2>
        </div>
        <FieldList fields={serviceFields} />
      </section>

      <section className="mt-6 rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
        <h2 className="font-display text-lg font-semibold text-ink">Документы и возврат</h2>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
          <li>
            Публичная оферта:{' '}
            <Link to="/offer" className="font-medium text-mint no-underline hover:underline">
              /offer
            </Link>
          </li>
          <li>
            Политика конфиденциальности:{' '}
            <Link to="/privacy" className="font-medium text-mint no-underline hover:underline">
              /privacy
            </Link>
          </li>
          <li>
            Возврат денежных средств — по условиям оферты. Запрос:{' '}
            <a className="font-medium text-mint no-underline hover:underline" href={`mailto:${SITE.legal.email}`}>
              {SITE.legal.email}
            </a>{' '}
            или Telegram{' '}
            <a
              className="font-medium text-mint no-underline hover:underline"
              href={`https://t.me/${SITE.legal.telegram.replace('@', '')}`}
              target="_blank"
              rel="noreferrer"
            >
              {SITE.legal.telegram}
            </a>
            .
          </li>
          <li>
            Чек об оплате формируется ЮKassa и направляется на email, указанный при оплате.
          </li>
        </ul>
      </section>

      <p className="mt-8 text-center text-xs text-ink-soft/80">
        Актуально на {new Date().toLocaleDateString('ru-RU')}. При изменении реквизитов данные на
        этой странице обновляются в первую очередь.
      </p>
    </article>
  )
}
