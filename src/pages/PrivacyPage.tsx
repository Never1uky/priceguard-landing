import { SITE } from '../site'

const EFFECTIVE = '24 июля 2026 г.'
const VERSION = '2.4'

const points = [
  {
    title: '1. Оператор данных',
    text: `Оператор — ${SITE.legal.fullName} (ИНН ${SITE.legal.inn}, ${SITE.legal.status}). Контакты: ${SITE.legal.email}, Telegram ${SITE.legal.telegram}.`,
  },
  {
    title: '2. Какие данные собираются',
    text: 'Email аккаунта (при входе), device_id, отслеживаемые товары и цены (в т.ч. облачная история при мониторинге), настройки алертов, результаты AI и общий кэш по артикулу, лог AI (провайдер/успех/длительность), match feedback и compare-research (ID/URL/название), ключ лицензии локально при Premium, при Telegram — Chat ID, сессия товара и треды AI; при неожиданных ошибках расширения — автоматический отчёт оператору (текст ошибки до 800 символов, контекст, версия расширения, userId при входе; без отдельного диалога подтверждения).',
  },
  {
    title: '3. Telegram',
    text: 'Chat ID — для алертов, AI по ссылке и «вопрос AI» (@PriceGuardAlertsBot). Поддержка (@priceguard_supportbot) может включать текст сообщения, username и имя из Telegram. Чтобы остановить: отключите Telegram в Настройках расширения (нужен вход) — удаление чата с ботом само по себе Chat ID с сервера не снимает.',
  },
  {
    title: '4. AI и отзывы',
    text: 'К AI (Grok / OpenAI / Perplexity): отзывы (выборка), название/артикул/цены, история, сравнение офферов; в Telegram — вопрос и контекст Q&A. Ключи AI не в расширении. Кэш ~7 дней с периодическим purge. Облачный AI требует входа в аккаунт.',
  },
  {
    title: '5. Серверный скрапинг (Scrappey)',
    text: 'Сервер может запрашивать карточки через Scrappey (URL страницы, cookies — нет) при Telegram-мониторинге и/или серверном unlock / compare-research у авторизованного пользователя. Кэш цены ~2 часа с purge. Legacy-поля scraper-ключей в схеме не используются.',
  },
  {
    title: '6. Данные платежа',
    text: `Оплату обрабатывает ${SITE.legal.paymentProvider}. Номер карты не храним. Передаём/сохраняем план, сумму, статус, email аккаунта и UUID пользователя (metadata/чек), данные лицензии.`,
  },
  {
    title: '7. Cookies и локальное хранение',
    text: 'Сайт — при необходимости техническое хранилище для навигации/возврата оплаты. Расширение — chrome.storage; permission cookies нет; cookie не уходят в PriceGuard/AI/Scrappey.',
  },
  {
    title: '8. Срок хранения',
    text: 'Аккаунт/лицензия — пока действует сервис. Локально — до удаления расширения. Периодический purge: кэш AI ~7 дней, scrape ~2 ч, треды Telegram AI ~48 ч, логи AI ~90 дней. Удаление аккаунта — по email-запросу.',
  },
  {
    title: '9. Цели обработки',
    text: 'Функции расширения и ботов, AI-анализ, алерты и сравнение цен, Premium, поддержка, безопасность и улучшение качества сервиса (в т.ч. match feedback).',
  },
  {
    title: '10. Передача третьим лицам',
    text: 'Supabase, ЮKassa (email/user id metadata), AI-провайдеры, Scrappey (URL), Telegram, хостинг — только в объёме, нужном для работы.',
  },
  {
    title: '11. Права и удаление',
    text: `Запрос: ${SITE.legal.email} (тема «Удаление данных»). Локальные данные — с расширением. Telegram — отключение в Настройках (с входом). Выход из аккаунта сам по себе не чистит watchlist/кэши.`,
  },
  {
    title: '12. Безопасность',
    text: 'HTTPS, секреты только на сервере, разграничение доступа (JWT / service role).',
  },
  {
    title: '13. Изменения политики',
    text: `Версия ${VERSION}. Актуальный текст — на этой странице и в документации расширения.`,
  },
  {
    title: '14. Контакты',
    text: `Email: ${SITE.legal.email}. Telegram: ${SITE.legal.telegram}.`,
  },
]

export function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-display text-4xl font-bold tracking-tight">
        Политика конфиденциальности
      </h1>
      <p className="mt-3 text-sm text-ink-soft">
        Как {SITE.productName} обрабатывает персональные и технические данные.
      </p>

      <ol className="mt-10 space-y-6">
        {points.map((p) => (
          <li key={p.title} className="rounded-2xl border border-line bg-white/70 p-5">
            <h2 className="font-display text-lg font-semibold text-ink">{p.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.text}</p>
          </li>
        ))}
      </ol>

      <p className="mt-8 text-xs text-ink-soft/80">
        Дата редакции: {EFFECTIVE}. Версия {VERSION}.
      </p>
    </article>
  )
}
