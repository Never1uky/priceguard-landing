import { Link } from 'react-router-dom'
import { SITE } from '../site'

const features = [
  {
    title: 'AI-анализ отзывов',
    text: 'Плюсы, минусы, риск накрутки и вердикт «покупать / подождать» — в расширении и по ссылке в Telegram.',
  },
  {
    title: 'Где дешевле',
    text: 'Один товар на Wildberries, Ozon и Яндекс.Маркет в одной таблице — без ручного копирования ссылок.',
  },
  {
    title: 'Мониторинг без Chrome',
    text: 'С подключённым Telegram сервер проверяет цены по расписанию — даже когда браузер закрыт.',
  },
  {
    title: 'AI по ссылке в Telegram',
    text: 'Пришлите URL товара в @PriceGuardAlertsBot — карточка анализа, кнопки и вопросы AI.',
  },
]

const benefits = [
  'Сравнение трёх маркетплейсов без переключения вкладок',
  'Алерты о падении цены в браузере и в Telegram',
  'Меньше импульсных покупок по завышенным «скидкам»',
  'История цен — видно, реальная ли скидка',
]

const faq = [
  {
    q: 'Это платное расширение?',
    a: `Базовые функции бесплатны (до 5 отслеживаемых товаров, до 3 AI-анализов в сутки после входа). Premium — ${SITE.pricing.monthlyRub} ₽/мес или ${SITE.pricing.yearlyRub} ₽/год. Есть пробный период ${SITE.pricing.trialDays} дней.`,
  },
  {
    q: 'Как работает Telegram?',
    a: 'Два бота: @PriceGuardAlertsBot — алерты о цене и AI-анализ по ссылке; @priceguard_supportbot — поддержка и /mykey. Chat ID берёте у алерт-бота (/start) и вставляете в Настройки расширения после входа в аккаунт.',
  },
  {
    q: 'Нужен ли открытый Chrome для алертов?',
    a: 'Нет. При подключённом Telegram цены проверяет сервер. Free — до 5 товаров; Premium — без лимита и с приоритетной проверкой.',
  },
  {
    q: 'Как оплатить Premium?',
    a: 'Оплата через ЮKassa (банковская карта). После успешной оплаты активируйте лицензию во вкладке Premium расширения.',
  },
  {
    q: 'Что даёт Premium?',
    a: 'Неограниченный AI-анализ, расширенное сравнение и отслеживание без лимитов Free, приоритет серверной проверки цен.',
  },
  {
    q: 'На каких сайтах работает?',
    a: 'На карточках товаров Wildberries, Ozon и Яндекс.Маркет. В Telegram можно прислать ссылку на любой из этих маркетплейсов.',
  },
  {
    q: 'Как вернуть деньги?',
    a: 'Условия возврата описаны в публичной оферте. Напишите на email поддержки в течение срока, указанного в оферте.',
  },
]

export function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% -10%, #99f6e4 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 100% 20%, #bae6fd 0%, transparent 45%), linear-gradient(180deg, #f7fbfd 0%, #e8f4f8 100%)',
          }}
        />
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] [background-image:linear-gradient(to_right,#94a3b822_1px,transparent_1px),linear-gradient(to_bottom,#94a3b822_1px,transparent_1px)] [background-size:32px_32px]" />

        <div className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 sm:pt-20">
          <p className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-6xl md:text-7xl">
            {SITE.productName}
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
            AI-анализ отзывов, сравнение цен на WB, Ozon и Маркете и алерты в Telegram —
            даже когда Chrome закрыт.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={SITE.chromeStoreUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-mint px-6 py-3 text-sm font-semibold text-white no-underline shadow-lg shadow-mint/25 transition hover:bg-mint-bright hover:text-ink"
            >
              Установить в Chrome
            </a>
            <a
              href="#pricing"
              className="rounded-full border border-line bg-white/70 px-6 py-3 text-sm font-semibold text-ink no-underline backdrop-blur transition hover:border-mint"
            >
              Смотреть тарифы
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" id="features">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Возможности</h2>
        <p className="mt-2 max-w-xl text-ink-soft">
          В боковой панели Chrome и в Telegram — одно решение перед покупкой.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {features.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-line bg-white/80 p-6 shadow-sm"
            >
              <h3 className="font-display text-xl font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-sky/60">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Преимущества
          </h2>
          <ul className="mt-8 space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex gap-3 text-ink-soft">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-mint" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" id="pricing">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Стоимость подписки
        </h2>
        <p className="mt-2 text-ink-soft">
          Что продаётся: доступ к Premium-функциям расширения {SITE.productName} на выбранный срок.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <article className="rounded-3xl border border-line bg-white p-7 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-mint">1 месяц</p>
            <p className="mt-3 font-display text-5xl font-extrabold tracking-tight">
              {SITE.pricing.monthlyRub} ₽
              <span className="text-lg font-medium text-ink-soft"> / мес</span>
            </p>
            <p className="mt-3 text-sm text-ink-soft">Полный Premium на 30 дней</p>
            <ul className="mt-6 space-y-2 text-sm text-ink-soft">
              <li>· Неограниченный AI-анализ</li>
              <li>· Сравнение без лимита Free</li>
              <li>· Отслеживание без лимита Free</li>
            </ul>
          </article>

          <article className="rounded-3xl border-2 border-mint bg-sky/70 p-7 shadow-md">
            <p className="text-xs font-semibold uppercase tracking-wider text-mint">
              1 год · −{SITE.pricing.yearlySavingsPercent}%
            </p>
            <p className="mt-3 font-display text-5xl font-extrabold tracking-tight">
              {SITE.pricing.yearlyRub} ₽
              <span className="text-lg font-medium text-ink-soft"> / год</span>
            </p>
            <p className="mt-3 text-sm text-ink-soft">
              ≈ {SITE.pricing.yearlyMonthlyEquivalentRub} ₽/мес · пробный период{' '}
              {SITE.pricing.trialDays} дней
            </p>
            <ul className="mt-6 space-y-2 text-sm text-ink-soft">
              <li>· Все возможности месячного тарифа</li>
              <li>· Выгоднее при ежедневном использовании</li>
              <li>· Оплата через ЮKassa</li>
            </ul>
          </article>
        </div>

        <div className="mt-8 rounded-2xl border border-line bg-white/70 p-5 text-sm leading-relaxed text-ink-soft">
          <p>
            <strong className="text-ink">Как оплатить:</strong> установите расширение PriceGuard AI →
            вкладка Premium → выберите тариф → оплатите картой на защищённой странице ЮKassa.
          </p>
          <p className="mt-2">
            <strong className="text-ink">После оплаты:</strong> нажмите «Проверить оплату» или
            введите выданный лицензионный ключ — Premium активируется в расширении.
          </p>
          <p className="mt-3">
            Вопросы по оплате:{' '}
            <a
              href={`mailto:${SITE.legal.email}`}
              className="font-semibold text-mint underline-offset-2 hover:underline"
            >
              {SITE.legal.email}
            </a>
            {' · '}
            <a
              href={`https://t.me/${SITE.legal.telegram.replace(/^@/, '')}`}
              className="font-semibold text-mint underline-offset-2 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              {SITE.legal.telegram}
            </a>
          </p>
          <p className="mt-3">
            Полные условия — в{' '}
            <Link to="/offer" className="font-semibold text-mint">
              публичной оферте
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-t border-line bg-white/60" id="faq">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">FAQ</h2>
          <div className="mt-8 divide-y divide-line">
            {faq.map((item) => (
              <details key={item.q} className="group py-4">
                <summary className="cursor-pointer list-none font-semibold text-ink marker:content-none">
                  <span className="flex items-center justify-between gap-4">
                    {item.q}
                    <span className="text-mint transition group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-soft">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" id="contacts">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Контакты</h2>
        <p className="mt-3 max-w-xl text-ink-soft">
          Вопросы по оплате, ключу и возврату — напишите на email или в Telegram.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`mailto:${SITE.legal.email}`}
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white no-underline"
          >
            {SITE.legal.email}
          </a>
          <a
            href={`https://t.me/${SITE.legal.telegram.replace('@', '')}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink no-underline"
          >
            {SITE.legal.telegram}
          </a>
          <Link
            to="/requisites"
            className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink no-underline"
          >
            Реквизиты продавца
          </Link>
        </div>
      </section>
    </div>
  )
}
