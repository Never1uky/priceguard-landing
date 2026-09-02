import { describe, expect, it } from 'vitest'
import { SITE } from '../site'
import { resolveInstallUrlForUa } from './store-links'

const EXPECTED_EXTENSION_ID = 'ipaichogganccpnapdgkjldplllnjlpf'

describe('store-links', () => {
  it('uses the published PriceGuard CWS extension id', () => {
    expect(SITE.extensionId).toBe(EXPECTED_EXTENSION_ID)
    expect(SITE.chromeStoreUrl).toContain(EXPECTED_EXTENSION_ID)
    expect(SITE.chromeStoreUrl).not.toContain('lpmioobgnleffjlafpfbaccaangiccli')
  })

  it('falls back to CWS for unknown browsers', () => {
    expect(resolveInstallUrlForUa('Mozilla/5.0')).toBe(SITE.chromeStoreUrl)
  })
})
