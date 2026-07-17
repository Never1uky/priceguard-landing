import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { SITE } from '../site'

function openExtension(): void {
  const url = `chrome-extension://${SITE.extensionId}/src/popup/index.html`
  const win = window.open(url, '_blank')
  if (!win) {
    window.location.href = url
  }
}

export function PaymentSuccessPage() {
  const [params] = useSearchParams()
  const session = useMemo(() => params.get('session')?.trim() || null, [params])

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(45,212,191,0.22),transparent_55%),radial-gradient(ellipse_at_80%_100%,rgba(14,165,233,0.12),transparent_45%)]"
      />

      <article className="relative mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-20">
        <div className="success-check mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-mint text-white shadow-[0_12px_40px_rgba(13,148,136,0.35)]">
          <svg
            viewBox="0 0 24 24"
            className="h-12 w-12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path className="success-check-path" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-mint">
          {SITE.productName}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Оплата прошла успешно
        </h1>
        <p className="mt-4 text-lg font-medium text-ink-soft">Premium активирован</p>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft/90">
          Ключ лицензии создаётся автоматически. Откройте расширение → вкладка Premium → при
          необходимости нажмите «Проверить оплату».
        </p>

        {session && (
          <p className="mt-4 rounded-full border border-line bg-white/70 px-4 py-1.5 font-mono text-[11px] text-ink-soft">
            session: {session.slice(0, 8)}…
          </p>
        )}

        <div className="mt-10 flex w-full max-w-sm flex-col gap-3">
          <button
            type="button"
            onClick={() => openExtension()}
            className="inline-flex items-center justify-center rounded-2xl bg-ink px-6 py-3.5 font-display text-base font-semibold text-white no-underline transition hover:bg-ink/90"
          >
            Вернуться в расширение
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-2xl border border-line bg-white/80 px-6 py-3 text-sm font-medium text-ink-soft no-underline transition hover:border-mint hover:text-mint"
          >
            На главную сайта
          </Link>
        </div>

        <p className="mt-10 text-xs text-ink-soft/80">
          Вопросы по оплате:{' '}
          <a className="text-mint no-underline hover:underline" href={`mailto:${SITE.legal.email}`}>
            {SITE.legal.email}
          </a>
          {' · '}
          <Link to="/requisites" className="text-mint no-underline hover:underline">
            Реквизиты продавца
          </Link>
        </p>
      </article>

      <style>{`
        .success-check {
          animation: success-pop 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .success-check-path {
          stroke-dasharray: 28;
          stroke-dashoffset: 28;
          animation: success-draw 0.45s ease 0.25s forwards;
        }
        @keyframes success-pop {
          from { transform: scale(0.6); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes success-draw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  )
}
