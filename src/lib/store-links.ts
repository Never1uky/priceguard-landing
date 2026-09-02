/**
 * Browser-aware install URLs for landing CTAs.
 * Keep in sync with priceguard-ai `src/lib/store-config.ts`.
 * Edge/Yandex stay null until real store pages exist — then CWS remains fallback.
 */

import { SITE } from '../site'

export type StoreChannel = 'chrome' | 'edge' | 'yandex'

export const STORE_URLS: Record<StoreChannel, string | null> = {
  chrome: SITE.chromeStoreUrl,
  edge: null,
  yandex: null,
}

export function detectStoreChannelFromUa(ua?: string | null): StoreChannel {
  const s = ua ?? (typeof navigator !== 'undefined' ? navigator.userAgent : '')
  if (!s) return 'chrome'
  if (/Edg\//i.test(s)) return 'edge'
  if (/YaBrowser\//i.test(s) || /Yowser\//i.test(s)) return 'yandex'
  return 'chrome'
}

/** Always returns a real URL (CWS if preferred channel has no listing yet). */
export function resolveInstallUrlForUa(ua?: string | null): string {
  const channel = detectStoreChannelFromUa(ua)
  return STORE_URLS[channel] ?? STORE_URLS.chrome ?? SITE.chromeStoreUrl
}
