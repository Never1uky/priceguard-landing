/**
 * Данные продавца для ЮKassa и публичных страниц сайта.
 */
export const SITE = {
  productName: 'PriceGuard AI',
  tagline: 'Цены, отзывы и сравнения — в одном расширении Chrome',
  chromeStoreUrl: 'https://chromewebstore.google.com/', // TODO: ссылка после публикации в CWS
  legal: {
    fullName: 'Куликов Максим Владимирович',
    inn: '504213122300',
    email: 'priceguardAlsupp0rt@yandex.ru',
    telegram: '@Just_Lucky777',
  },
  pricing: {
    monthlyRub: 299,
    yearlyRub: 2490,
    yearlyMonthlyEquivalentRub: 208,
    yearlySavingsPercent: 30,
    trialDays: 7,
  },
} as const
