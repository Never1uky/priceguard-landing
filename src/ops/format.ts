import type { AiRequestRow, MetricsDashboardPayload, OpsPeriodDays, SearchMetricRow } from './types'

/** Keep rows whose day/week_start is within the last `periodDays`. */
export function filterRowsByPeriod<T extends { day?: string; week_start?: string }>(
  rows: T[],
  periodDays: OpsPeriodDays,
  now = new Date(),
): T[] {
  const cutoff = new Date(now.getTime() - periodDays * 24 * 60 * 60 * 1000)
  const cutoffDay = cutoff.toISOString().slice(0, 10)
  return rows.filter((r) => {
    const d = (r.day ?? r.week_start ?? '').toString().slice(0, 10)
    if (!d) return false
    return d >= cutoffDay
  })
}

export interface MarketplaceReliability {
  marketplace: string
  total: number
  success: number
  successRatePct: number
  avgMs: number | null
}

/** Aggregate filtered daily search rows by marketplace. */
export function aggregateSearchByMarketplace(rows: SearchMetricRow[]): MarketplaceReliability[] {
  const map = new Map<string, { total: number; success: number; weightedMs: number; msN: number }>()
  for (const r of rows) {
    const mp = r.marketplace || 'unknown'
    const cur = map.get(mp) ?? { total: 0, success: 0, weightedMs: 0, msN: 0 }
    const total = Number(r.total_requests) || 0
    const success = Number(r.successful_requests) || 0
    const avg = Number(r.avg_response_time_ms)
    cur.total += total
    cur.success += success
    if (Number.isFinite(avg) && total > 0) {
      cur.weightedMs += avg * total
      cur.msN += total
    }
    map.set(mp, cur)
  }
  return [...map.entries()]
    .map(([marketplace, v]) => ({
      marketplace,
      total: v.total,
      success: v.success,
      successRatePct: v.total ? Math.round((1000 * v.success) / v.total) / 10 : 0,
      avgMs: v.msN ? Math.round(v.weightedMs / v.msN) : null,
    }))
    .sort((a, b) => a.marketplace.localeCompare(b.marketplace))
}

export interface AiProviderAgg {
  provider: string
  requests: number
  success: number
  errors: number
  totalTokens: number
}

export function aggregateAiByProvider(rows: AiRequestRow[]): AiProviderAgg[] {
  const map = new Map<string, AiProviderAgg>()
  for (const r of rows) {
    const provider = r.provider || 'unknown'
    const cur = map.get(provider) ?? {
      provider,
      requests: 0,
      success: 0,
      errors: 0,
      totalTokens: 0,
    }
    cur.requests += Number(r.request_count) || 0
    cur.success += Number(r.success_count) || 0
    cur.errors += Number(r.error_count) || 0
    cur.totalTokens += Number(r.total_tokens) || 0
    map.set(provider, cur)
  }
  return [...map.values()].sort((a, b) => b.requests - a.requests)
}

/** Plaintext brief (same spirit as weekly-metrics-digest Telegram). */
export function formatOpsBrief(
  data: MetricsDashboardPayload,
  periodDays: OpsPeriodDays,
  now = new Date(),
): string {
  const daily = filterRowsByPeriod(data.searchDaily ?? [], periodDays, now)
  const search = aggregateSearchByMarketplace(daily)
  const aiFiltered = filterRowsByPeriod(data.aiRequests ?? [], periodDays, now)
  const ai = aggregateAiByProvider(aiFiltered)

  const lines: string[] = [
    `PriceGuard ops brief · ${now.toISOString().slice(0, 10)} · ${periodDays}d`,
    '',
    'Reliability (search 24h):',
  ]
  const rate24h = data.searchSuccessRate24h ?? []
  if (rate24h.length) {
    for (const r of rate24h) {
      lines.push(
        `  ${r.marketplace}: ${r.successRatePct}% (${r.successfulRequests}/${r.totalRequests}` +
          (r.avgResponseTimeMs != null ? `, avg ${r.avgResponseTimeMs}ms` : '') +
          ')' +
          (r.alert ? ' ⚠' : ''),
      )
    }
  } else if (!search.length) {
    lines.push('  (no data)')
  }

  lines.push('', `Reliability (search ${periodDays}d aggregate):`)
  if (!search.length && !rate24h.length) lines.push('  (no data)')
  for (const s of search) {
    lines.push(
      `  ${s.marketplace}: ${s.successRatePct}% (${s.success}/${s.total}` +
        (s.avgMs != null ? `, avg ${s.avgMs}ms` : '') +
        ')',
    )
  }

  const wb = data.wbSuccessRate24h
  if (wb) {
    lines.push(
      `WB 24h: ${wb.success_rate_pct}% (${wb.successful_requests}/${wb.total_requests})`,
    )
  }
  if (data.alerts?.wbLowSuccessRate || data.alerts?.lowSearchSuccessRate) {
    const mps =
      data.alerts.alertingMarketplaces?.join(', ') ||
      (data.alerts.wbLowSuccessRate ? 'wildberries' : '')
    lines.push(`ALERT search < ${data.alerts.thresholdPct}%: ${mps || '?'}`)
  }

  const eco = data.economics
  if (eco) {
    lines.push(
      '',
      `Economics (${eco.periodDays}d): monitored ${eco.activeMonitoredProducts}, targets ${eco.uniqueMonitoringTargets}, scrape/day ${eco.scrapeRequestsPerDay}, cache hit ${eco.cacheHitRatePct}%, cost/day ${eco.costEstimateRubPerDay.optimistic}–${eco.costEstimateRubPerDay.pessimistic} ₽`,
    )
  }

  lines.push('', 'AI:')
  if (!ai.length) lines.push('  (no data)')
  for (const a of ai) {
    lines.push(`  ${a.provider}: ${a.requests} req, ${a.errors} err, tokens ${a.totalTokens}`)
  }

  const scrape = data.scrape
  lines.push('', 'Scrape cache (by source):')
  if (!scrape?.total) lines.push('  (no data)')
  else {
    lines.push(`  total ${scrape.total}`)
    for (const [src, n] of Object.entries(scrape.bySource).sort((a, b) => b[1] - a[1])) {
      lines.push(`  ${src}: ${n}`)
    }
  }

  if (data.seo) {
    lines.push('', `SEO: ${data.seo.publishedCount} published, views ${data.seo.totalViews}`)
  }
  if (data.premium) {
    lines.push(
      `Premium active: ${data.premium.activeCount}, trials: ${data.premium.activeTrials}`,
    )
  }

  const pf = data.productFunnel
  if (pf) {
    lines.push('', 'PRODUCT FUNNEL:')
    lines.push(
      `  installs ${pf.installs} · started ${pf.started} · mp ${pf.marketplaceDetected} · compare ${pf.comparisons} (${pf.successful} ok) · AI ${pf.ai} · tracked ${pf.tracked} · tg ${pf.telegram}`,
    )
    lines.push(
      `  conv: install→compare ${pf.conversions.installToComparison}% · compare→ok ${pf.conversions.comparisonToSuccess}% · ok→track ${pf.conversions.successToTracking}% · track→tg ${pf.conversions.trackingToTelegram}% · started→premium ${pf.conversions.startedToPremium}%`,
    )
    lines.push(
      `  AI cache hit ${pf.aiFunnel.hitRatePct}% (${pf.aiFunnel.cacheHits}/${pf.aiFunnel.analyses})`,
    )
  }

  lines.push('', `Generated: ${data.generatedAt}`)
  return lines.join('\n')
}
