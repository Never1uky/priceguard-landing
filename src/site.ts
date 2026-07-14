/**
 * Заполните свои данные перед публикацией для ЮKassa.
 * Эти значения показываются на лендинге (Реквизиты, Оферта, Контакты).
 */
export const SITE = {
  productName: 'PriceGuard AI',
  tagline: 'Цены, отзывы и сравнения — в одном расширении Chrome',
  chromeStoreUrl: 'https://chromewebstore.google.com/', // TODO: ссылка на публикацию
  legal: {
    /** ФИО самозанятого / ИП / руководителя */
    fullName: '[Куликов Максим Владимирович]',
    /** ИНН */
    inn: '[504213122300]',
    /** Публичный email для поддержки и документов */
    email: 'priceguardAlsupp0rt@yandex.ru',
    /** Telegram для связи (без @ или с @) */
    telegram: '@priceguard_support',
  },
  pricing: {
    monthlyRub: 299,
    yearlyRub: 2490,
    yearlyMonthlyEquivalentRub: 208,
    yearlySavingsPercent: 30,
    trialDays: 7,
  },
} as const
