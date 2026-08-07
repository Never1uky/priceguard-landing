import { useEffect } from 'react'
import { SITE_ORIGIN } from '../content/blog/types'
import { SITE } from '../site'

export function usePageMeta(options: {
  title: string
  description?: string
  path?: string
}) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = `${options.title} · ${SITE.productName}`

    const ensureMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      const prev = el.content
      el.content = content
      return () => {
        if (prev) el!.content = prev
        else el!.remove()
      }
    }

    const cleanups: Array<() => void> = []
    if (options.description) {
      cleanups.push(ensureMeta('description', options.description))
      cleanups.push(ensureMeta('og:description', options.description, 'property'))
    }
    cleanups.push(ensureMeta('og:title', options.title, 'property'))

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    const prevHref = link?.href
    if (options.path) {
      if (!link) {
        link = document.createElement('link')
        link.rel = 'canonical'
        document.head.appendChild(link)
      }
      link.href = `${SITE_ORIGIN}${options.path}`
    }

    return () => {
      document.title = prevTitle
      for (const cleanup of cleanups) cleanup()
      if (link) {
        if (prevHref) link.href = prevHref
        else if (options.path) link.remove()
      }
    }
  }, [options.title, options.description, options.path])
}
