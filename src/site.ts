/**
 * Данные продавца для ЮKassa и публичных страниц сайта.
 */
export const SITE = {
  productName: 'PriceGuard AI',
  tagline: 'AI-анализ, где дешевле и алерты в Telegram — даже без открытого Chrome',
  chromeStoreUrl: 'https://chromewebstore.google.com/', // TODO: ссылка после публикации в CWS
  /** ID расширения (chrome://extensions) — для кнопки «Вернуться в расширение» */
  extensionId: 'ckkaohbmancefjiiapgajoeamgmfcdki',
  urls: {
    origin: 'https://priceguard-landing.vercel.app',
    paymentSuccess: 'https://priceguard-landing.vercel.app/payment/success',
    requisites: 'https://priceguard-landing.vercel.app/requisites',
    offer: 'https://priceguard-landing.vercel.app/offer',
    privacy: 'https://priceguard-landing.vercel.app/privacy',
  },
  legal: {
    fullName: 'Куликов Максим Владимирович',
    /** Статус для публичных реквизитов и ЮKassa */
    status: 'Самозанятый (плательщик налога на профессиональный доход)',
    inn: '504213122300',
    email: 'priceguardAlsupp0rt@yandex.ru',
    telegram: '@priceguard_supportbot',
    paymentProvider: 'ЮKassa (ООО НКО «ЮMoney»)',
    productDescription: 'Цифровой доступ к Premium-функциям Chrome-расширения PriceGuard AI',
  },
  pricing: {
    monthlyRub: 299,
    yearlyRub: 2490,
    yearlyMonthlyEquivalentRub: 208,
    yearlySavingsPercent: 30,
    trialDays: 7,
  },
} as const
