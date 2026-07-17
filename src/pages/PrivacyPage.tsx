import { SITE } from '../site'

const EFFECTIVE = '17 июля 2026 г.'
const VERSION = '2.0'

const points = [
  {
    title: '1. Оператор данных',
    text: `Оператор — ${SITE.legal.fullName} (ИНН ${SITE.legal.inn}, ${SITE.legal.status}). Контакты: ${SITE.legal.email}, Telegram ${SITE.legal.telegram}.`,
  },
  {
    title: '2. Какие данные собираются',
    text: 'Email аккаунта (при входе), device_id, отслеживаемые товары и цены, настройки алертов, результаты AI-анализа (в т.ч. общий кэш по артикулу), технические логи AI/поиска, при подключении Telegram — Chat ID, сессия товара и краткие треды AI-чата в боте алертов.',
  },
  {
    title: '3. Telegram',
    text: 'Добровольно указанный Chat ID используется для алертов о цене, карточек AI-анализа по ссылке и ответов в режиме «вопрос AI» (@PriceGuardAlertsBot). Обращения в @priceguard_supportbot могут пересылаться оператору. Chat ID не продаётся.',
  },
  {
    title: '4. AI и отзывы',
    text: 'Тексты отзывов и краткие поля товара отправляются через наш сервер к AI-провайдерам (Grok / OpenAI / Perplexity). Ключи AI не хранятся в расширении. Результаты могут кэшироваться ~7 дней без привязки к email.',
  },
  {
    title: '5. Серверный мониторинг (Bright Data)',
    text: 'При включённом Telegram-мониторинге сервер запрашивает карточки отслеживаемых товаров. Для антибота может использоваться Bright Data Web Unlocker: передаётся URL страницы, cookies браузера — нет.',
  },
  {
    title: '6. Данные платежа',
    text: `Оплату обрабатывает ${SITE.legal.paymentProvider}. Мы не храним номер карты. Получаем статус платежа и данные для лицензии Premium.`,
  },
  {
    title: '7. Cookies и локальное хранение',
    text: 'Сайт — технические cookie/localStorage. Расширение — chrome.storage (настройки, история цен, кэш). Опционально локальные партнёрские параметры в ссылках на товары.',
  },
  {
    title: '8. Срок хранения',
    text: 'Аккаунт/лицензия — пока действует сервис. Локальные данные — до удаления расширения. Кэш AI ~7 дней, треды Telegram AI ~48 часов, служебные логи обычно до 90 дней.',
  },
  {
    title: '9. Цели обработки',
    text: 'Функции расширения и ботов, AI-анализ, алерты и сравнение цен, Premium, поддержка, безопасность и улучшение качества сервиса.',
  },
  {
    title: '10. Передача третьим лицам',
    text: 'Supabase (инфраструктура), ЮKassa, AI-провайдеры, Bright Data (URL страниц при серверном скрапе), Telegram, хостинг сайта — только в объёме, необходимом для работы.',
  },
  {
    title: '11. Права и удаление',
    text: `Запрос доступа/удаления: ${SITE.legal.email} (тема «Удаление данных»). Локальные данные удаляются с расширением. Telegram отключается в Настройках расширения.`,
  },
  {
    title: '12. Безопасность',
    text: 'HTTPS, секреты только на сервере, разграничение доступа.',
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
