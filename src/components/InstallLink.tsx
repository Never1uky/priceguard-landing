import { useEffect, useState } from 'react'
import { SITE } from '../site'
import { resolveInstallUrlForUa } from '../lib/store-links'

type Props = {
  className?: string
  children?: React.ReactNode
}

/** Client install CTA — Edge/Yandex listing when configured, else CWS. */
export function InstallLink({ className, children = 'Установить' }: Props) {
  const [href, setHref] = useState<string>(SITE.chromeStoreUrl)

  useEffect(() => {
    setHref(resolveInstallUrlForUa(navigator.userAgent))
  }, [])

  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  )
}
