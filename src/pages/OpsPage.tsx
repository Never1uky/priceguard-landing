import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react'
import {
  fetchOpsMetrics,
  getOpsSession,
  isOpsConfigured,
  signInOps,
  signOutOps,
} from '../ops/api'
import {
  aggregateAiByProvider,
  aggregateSearchByMarketplace,
  filterRowsByPeriod,
  formatOpsBrief,
} from '../ops/format'
import type { EconomicsDashboardBlock, MetricsDashboardPayload, OpsPeriodDays } from '../ops/types'

const PERIODS: OpsPeriodDays[] = [1, 7, 30]

function useOpsNoIndex() {
  useEffect(() => {
    const prevTitle = document.title
    document.title = 'Ops · PriceGuard AI'
    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]')
    const created = !robots
    if (!robots) {
      robots = document.createElement('meta')
      robots.name = 'robots'
      document.head.appendChild(robots)
    }
    const prev = robots.content
    robots.content = 'noindex, nofollow'
    return () => {
      document.title = prevTitle
      if (created) robots!.remove()
      else robots!.content = prev
    }
  }, [])
}

export function OpsPage() {
  useOpsNoIndex()

  const configured = isOpsConfigured()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [sessionEmail, setSessionEmail] = useState<string | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [period, setPeriod] = useState<OpsPeriodDays>(7)
  const [data, setData] = useState<MetricsDashboardPayload | null>(null)
  const [loading, setLoading] = useState(true)
  const [authBusy, setAuthBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const refreshSession = useCallback(async () => {
    const session = await getOpsSession()
    setSessionEmail(session?.user?.email ?? null)
    setAccessToken(session?.access_token ?? null)
    return session
  }, [])

  const load = useCallback(
    async (token: string, days: OpsPeriodDays) => {
      setLoading(true)
      setError(null)
      try {
        const result = await fetchOpsMetrics(token, days)
        if (!result.ok) {
          setError(result.error ?? 'Не удалось загрузить метрики')
          setData(null)
          return
        }
        setData(result)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Ошибка загрузки')
        setData(null)
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  useEffect(() => {
    void (async () => {
      if (!configured) {
        setLoading(false)
        setError('Задайте VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY')
        return
      }
      const session = await refreshSession()
      if (session?.access_token) {
        await load(session.access_token, period)
      } else {
        setLoading(false)
      }
    })()
    // initial only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!accessToken) return
    void load(accessToken, period)
  }, [period, accessToken, load])

  const searchAgg = useMemo(() => {
    if (!data) return []
    return aggregateSearchByMarketplace(
      filterRowsByPeriod(data.searchDaily ?? [], period),
    )
  }, [data, period])

  const aiAgg = useMemo(() => {
    if (!data) return []
    return aggregateAiByProvider(filterRowsByPeriod(data.aiRequests ?? [], period))
  }, [data, period])

  async function onSignIn(e: FormEvent) {
    e.preventDefault()
    setAuthBusy(true)
    setError(null)
    const res = await signInOps(email, password)
    setAuthBusy(false)
    if (res.error) {
      setError(res.error)
      return
    }
    const session = await refreshSession()
    if (session?.access_token) await load(session.access_token, period)
  }

  async function onSignOut() {
    await signOutOps()
    setSessionEmail(null)
    setAccessToken(null)
    setData(null)
  }

  async function onCopyBrief() {
    if (!data) return
    const text = formatOpsBrief(data, period)
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setError('Не удалось скопировать')
    }
  }

  return (
    <div className="min-h-screen bg-[#0b1220] px-4 py-8 text-slate-100">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-700 pb-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500">Internal</p>
            <h1 className="font-display text-2xl font-semibold text-white">PriceGuard ops</h1>
            <p className="mt-1 text-sm text-slate-400">
              {sessionEmail ?? 'Не авторизован'} · noindex
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {PERIODS.map((d) => (
              <button
                key={d}
                type="button"
                disabled={!accessToken}
                onClick={() => setPeriod(d)}
                className={`rounded px-3 py-1.5 text-sm ${
                  period === d
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                } disabled:opacity-40`}
              >
                {d === 1 ? '24h' : `${d}d`}
              </button>
            ))}
            {accessToken ? (
              <>
                <button
                  type="button"
                  onClick={() => accessToken && void load(accessToken, period)}
                  className="rounded bg-slate-800 px-3 py-1.5 text-sm hover:bg-slate-700"
                >
                  Refresh
                </button>
                <button
                  type="button"
                  onClick={() => void onCopyBrief()}
                  disabled={!data}
                  className="rounded bg-slate-800 px-3 py-1.5 text-sm hover:bg-slate-700 disabled:opacity-40"
                >
                  {copied ? 'Copied' : 'Copy weekly brief'}
                </button>
                <button
                  type="button"
                  onClick={() => void onSignOut()}
                  className="rounded border border-slate-600 px-3 py-1.5 text-sm text-slate-300"
                >
                  Sign out
                </button>
              </>
            ) : null}
          </div>
        </header>

        {!accessToken && configured ? (
          <form
            onSubmit={(e) => void onSignIn(e)}
            className="mx-auto max-w-sm space-y-3 rounded-lg border border-slate-700 bg-slate-900/80 p-4"
          >
            <p className="text-sm text-slate-400">
              Вход тем же аккаунтом Supabase, email в{' '}
              <code className="text-teal-400">METRICS_ADMIN_EMAILS</code>.
            </p>
            <label className="block text-xs text-slate-400">
              Email
              <input
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-white"
                required
              />
            </label>
            <label className="block text-xs text-slate-400">
              Password
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-white"
                required
              />
            </label>
            <button
              type="submit"
              disabled={authBusy}
              className="w-full rounded bg-teal-600 py-2 text-sm font-medium text-white hover:bg-teal-500 disabled:opacity-50"
            >
              {authBusy ? '…' : 'Sign in'}
            </button>
          </form>
        ) : null}

        {error ? (
          <div className="rounded border border-red-800 bg-red-950/50 px-3 py-2 text-sm text-red-200">
            {error}
          </div>
        ) : null}

        {data?.alerts?.lowSearchSuccessRate || data?.alerts?.wbLowSuccessRate ? (
          <div className="rounded border border-amber-700 bg-amber-950/60 px-3 py-2 text-sm text-amber-100">
            ALERT: search success (24h){' '}
            {(data.alerts.alertingMarketplaces ?? (data.alerts.wbLowSuccessRate ? ['wildberries'] : []))
              .join(', ') || '—'}{' '}
            &lt; {data.alerts.thresholdPct}% (min 5 requests)
          </div>
        ) : null}

        {loading ? <p className="text-sm text-slate-500">Loading…</p> : null}

        {data && !loading ? (
          <>
            {data.economics ? <EconomicsSection eco={data.economics} /> : null}

            <OpsCard title="Reliability — поиск 24ч">
              <table className="w-full text-left text-xs">
                <thead className="text-slate-500">
                  <tr>
                    <th className="py-1">МП</th>
                    <th>OK%</th>
                    <th>n</th>
                    <th>avg ms</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {(data.searchSuccessRate24h ?? []).map((r) => (
                    <tr key={r.marketplace} className="border-t border-slate-800">
                      <td className="py-1">{r.marketplace}</td>
                      <td>{r.successRatePct}</td>
                      <td>
                        {r.successfulRequests}/{r.totalRequests}
                      </td>
                      <td>{r.avgResponseTimeMs ?? '—'}</td>
                      <td>{r.alert ? '⚠' : ''}</td>
                    </tr>
                  ))}
                  {!data.searchSuccessRate24h?.length ? (
                    <tr>
                      <td colSpan={5} className="py-2 text-slate-500">
                        Нет данных
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </OpsCard>

            <section className="grid gap-4 md:grid-cols-3">
              <OpsCard title="Search — period aggregate">
                <table className="w-full text-left text-xs">
                  <thead className="text-slate-500">
                    <tr>
                      <th className="py-1">MP</th>
                      <th>OK%</th>
                      <th>n</th>
                      <th>avg ms</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchAgg.map((r) => (
                      <tr key={r.marketplace} className="border-t border-slate-800">
                        <td className="py-1">{r.marketplace}</td>
                        <td>{r.successRatePct}</td>
                        <td>
                          {r.success}/{r.total}
                        </td>
                        <td>{r.avgMs ?? '—'}</td>
                      </tr>
                    ))}
                    {!searchAgg.length ? (
                      <tr>
                        <td colSpan={4} className="py-2 text-slate-500">
                          Нет данных
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </OpsCard>

              <OpsCard title="AI">
                <table className="w-full text-left text-xs">
                  <thead className="text-slate-500">
                    <tr>
                      <th className="py-1">Provider</th>
                      <th>req</th>
                      <th>err</th>
                      <th>tokens</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aiAgg.map((r) => (
                      <tr key={r.provider} className="border-t border-slate-800">
                        <td className="py-1">{r.provider}</td>
                        <td>{r.requests}</td>
                        <td>{r.errors}</td>
                        <td>{r.totalTokens}</td>
                      </tr>
                    ))}
                    {!aiAgg.length ? (
                      <tr>
                        <td colSpan={4} className="py-2 text-slate-500">
                          Нет данных
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </OpsCard>

              <OpsCard title="Scrape / Scrappey">
                <p className="mb-2 text-sm text-slate-300">
                  Cache rows (fetched in period): {data.scrape?.total ?? 0}
                </p>
                <ul className="space-y-1 text-xs">
                  {Object.entries(data.scrape?.bySource ?? {})
                    .sort((a, b) => b[1] - a[1])
                    .map(([src, n]) => (
                      <li key={src} className="flex justify-between border-t border-slate-800 py-1">
                        <span>{src}</span>
                        <span>{n}</span>
                      </li>
                    ))}
                  {!data.scrape?.total ? (
                    <li className="text-slate-500">Нет данных / omit $</li>
                  ) : null}
                </ul>
              </OpsCard>
            </section>

            <section className="grid gap-4 md:grid-cols-2">
              <OpsCard title="SEO / Premium">
                <dl className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <dt className="text-xs text-slate-500">Published pages</dt>
                    <dd className="text-lg font-semibold">{data.seo?.publishedCount ?? '—'}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">Total views</dt>
                    <dd className="text-lg font-semibold">{data.seo?.totalViews ?? '—'}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">Premium active</dt>
                    <dd className="text-lg font-semibold">{data.premium?.activeCount ?? '—'}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">Active trials</dt>
                    <dd className="text-lg font-semibold">{data.premium?.activeTrials ?? '—'}</dd>
                  </div>
                </dl>
              </OpsCard>

              <OpsCard title="Edge traffic (sample)">
                <ul className="max-h-48 space-y-1 overflow-auto text-xs">
                  {(data.edge?.topEndpoints ?? []).map((e) => (
                    <li
                      key={e.endpoint}
                      className="flex justify-between gap-2 border-t border-slate-800 py-1"
                    >
                      <span className="truncate font-mono text-slate-300">{e.endpoint}</span>
                      <span>{e.count}</span>
                    </li>
                  ))}
                  {!data.edge?.topEndpoints?.length ? (
                    <li className="text-slate-500">Нет данных</li>
                  ) : null}
                </ul>
                {data.edge?.sampleCapped ? (
                  <p className="mt-2 text-[10px] text-slate-500">Sample capped at 5k rows</p>
                ) : null}
              </OpsCard>
            </section>

            {data.productFunnel ? (
              <section className="space-y-4">
                <OpsCard title="PRODUCT FUNNEL">
                  <p className="mb-3 text-[11px] text-slate-500">
                    Opt-in extension events (no URL/title). Reliability/Scrappey/AI tokens above are
                    Edge, not this funnel.
                  </p>
                  <dl className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
                    {(
                      [
                        ['Installs', data.productFunnel.installs],
                        ['Started', data.productFunnel.started],
                        ['Marketplace', data.productFunnel.marketplaceDetected],
                        ['Comparisons', data.productFunnel.comparisons],
                        ['Successful', data.productFunnel.successful],
                        ['AI', data.productFunnel.ai],
                        ['Tracked', data.productFunnel.tracked],
                        ['Telegram / Premium-trial', `${data.productFunnel.telegram} / ${data.productFunnel.premiumTrial}`],
                      ] as const
                    ).map(([label, value]) => (
                      <div key={label}>
                        <dt className="text-xs text-slate-500">{label}</dt>
                        <dd className="text-lg font-semibold">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <ul className="mt-3 space-y-1 text-xs text-slate-300">
                    <li>install→comparison {data.productFunnel.conversions.installToComparison}%</li>
                    <li>comparison→success {data.productFunnel.conversions.comparisonToSuccess}%</li>
                    <li>success→tracking {data.productFunnel.conversions.successToTracking}%</li>
                    <li>tracking→telegram {data.productFunnel.conversions.trackingToTelegram}%</li>
                    <li>started→premium {data.productFunnel.conversions.startedToPremium}%</li>
                  </ul>
                  {data.productFunnel.sampleCapped ? (
                    <p className="mt-2 text-[10px] text-slate-500">Sample capped at 8k events</p>
                  ) : null}
                </OpsCard>

                <div className="grid gap-4 md:grid-cols-2">
                  <OpsCard title="Funnel by marketplace">
                    <table className="w-full text-left text-xs">
                      <thead className="text-slate-500">
                        <tr>
                          <th className="py-1">MP</th>
                          <th>cmp</th>
                          <th>ok</th>
                          <th>fail</th>
                          <th>%</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.productFunnel.byMarketplace.map((r) => (
                          <tr key={r.marketplace} className="border-t border-slate-800">
                            <td className="py-1">{r.marketplace}</td>
                            <td>{r.comparisons}</td>
                            <td>{r.success}</td>
                            <td>{r.failed}</td>
                            <td>{r.successRatePct}</td>
                          </tr>
                        ))}
                        {!data.productFunnel.byMarketplace.length ? (
                          <tr>
                            <td colSpan={5} className="py-2 text-slate-500">
                              Нет данных
                            </td>
                          </tr>
                        ) : null}
                      </tbody>
                    </table>
                  </OpsCard>

                  <OpsCard title="Funnel errors">
                    <table className="w-full text-left text-xs">
                      <thead className="text-slate-500">
                        <tr>
                          <th className="py-1">reason</th>
                          <th>MP</th>
                          <th>n</th>
                          <th>last</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.productFunnel.errors.map((e) => (
                          <tr key={`${e.reason}-${e.marketplace}`} className="border-t border-slate-800">
                            <td className="py-1">{e.reason}</td>
                            <td>{e.marketplace}</td>
                            <td>{e.count}</td>
                            <td className="text-slate-500">
                              {e.lastSeen ? e.lastSeen.slice(0, 10) : '—'}
                            </td>
                          </tr>
                        ))}
                        {!data.productFunnel.errors.length ? (
                          <tr>
                            <td colSpan={4} className="py-2 text-slate-500">
                              Нет данных
                            </td>
                          </tr>
                        ) : null}
                      </tbody>
                    </table>
                  </OpsCard>
                </div>

                <OpsCard title="AI (funnel events, not tokens)">
                  <p className="mb-2 text-sm text-slate-300">
                    Analyses {data.productFunnel.aiFunnel.analyses} · cache hits{' '}
                    {data.productFunnel.aiFunnel.cacheHits} · generated{' '}
                    {data.productFunnel.aiFunnel.generated} · hit rate{' '}
                    {data.productFunnel.aiFunnel.hitRatePct}%
                  </p>
                  <ul className="space-y-1 text-xs">
                    {data.productFunnel.aiFunnel.byProvider.map((p) => (
                      <li key={p.provider} className="flex justify-between border-t border-slate-800 py-1">
                        <span>{p.provider}</span>
                        <span>{p.count}</span>
                      </li>
                    ))}
                    {!data.productFunnel.aiFunnel.byProvider.length ? (
                      <li className="text-slate-500">Нет данных</li>
                    ) : null}
                  </ul>
                </OpsCard>
              </section>
            ) : null}

            <p className="text-[10px] text-slate-600">
              Updated {new Date(data.generatedAt).toLocaleString('ru-RU')} · aggregates only, no
              PII
            </p>
          </>
        ) : null}
      </div>
    </div>
  )
}

function OpsCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-slate-700 bg-slate-900/60 p-4">
      <h2 className="mb-3 text-sm font-semibold text-slate-200">{title}</h2>
      {children}
    </section>
  )
}

function EconomicsSection({ eco }: { eco: EconomicsDashboardBlock }) {
  const rubPerK = eco.assumptions?.scrappeyRubPerThousandCalls ?? 4
  return (
    <OpsCard title="Economics — monitoring (Phase 12)">
      <p className="mb-3 text-[11px] text-slate-500">
        Период {eco.periodDays}д · Scrappey {rubPerK} ₽ / 1000 calls · dedup KPI
      </p>
      <dl className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
        {(
          [
            ['Active monitored products', eco.activeMonitoredProducts],
            ['Unique monitoring targets', eco.uniqueMonitoringTargets],
            [
              'Avg subscribers / target',
              `${eco.avgSubscribersPerTarget} (max ${eco.maxSubscribersPerTarget}, users ${eco.monitoringUsers})`,
            ],
            ['Checks / day', eco.checksPerDay],
            ['Scrape requests / day', eco.scrapeRequestsPerDay],
            ['Cache hit rate', `${eco.cacheHitRatePct}%`],
            ['Scrape failures', `${eco.scrapeFailures} (${eco.scrapeFailuresPerDay}/day)`],
            ['Scrapes / active product', eco.scrapeRequestsPerActiveMonitoredProduct],
            ['Scrapes / unique target', `${eco.scrapeRequestsPerUniqueTarget} (dedup ×${eco.dedupFactor})`],
            [
              'Cost / day (₽)',
              `${eco.costEstimateRubPerDay.optimistic}–${eco.costEstimateRubPerDay.pessimistic}`,
            ],
            [
              'Cost / month (₽)',
              `${eco.costEstimateRubPerMonth.optimistic}–${eco.costEstimateRubPerMonth.pessimistic}`,
            ],
            ['Scrapes saved (est.)', eco.estimatedScrapesSaved],
          ] as const
        ).map(([label, value]) => (
          <div key={label} className="rounded border border-slate-800 bg-slate-950/40 px-2 py-1.5">
            <dt className="text-[10px] text-slate-500">{label}</dt>
            <dd className="mt-0.5 font-semibold tabular-nums text-slate-100">{value}</dd>
          </div>
        ))}
      </dl>
    </OpsCard>
  )
}
