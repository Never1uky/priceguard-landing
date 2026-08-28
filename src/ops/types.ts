/** Types for Edge metrics-dashboard response (admin /ops). */

export type OpsPeriodDays = 1 | 7 | 30

export interface SearchMetricRow {
  marketplace: string
  day?: string
  week_start?: string
  total_requests: number
  successful_requests: number
  failed_requests?: number
  success_rate_pct: number
  avg_response_time_ms: number
}

export interface AiRequestRow {
  provider: string
  model?: string
  day: string
  request_count: number
  success_count: number
  error_count: number
  avg_duration_ms?: number
  avg_total_tokens?: number
  total_tokens?: number
}

export interface ProductFunnelPayload {
  installs: number
  started: number
  marketplaceDetected: number
  comparisons: number
  successful: number
  ai: number
  tracked: number
  telegram: number
  premiumTrial: number
  conversions: {
    installToComparison: number
    comparisonToSuccess: number
    successToTracking: number
    trackingToTelegram: number
    startedToPremium: number
  }
  byMarketplace: Array<{
    marketplace: string
    comparisons: number
    success: number
    failed: number
    successRatePct: number
  }>
  errors: Array<{
    reason: string
    marketplace: string
    count: number
    lastSeen: string
  }>
  aiFunnel: {
    analyses: number
    cacheHits: number
    generated: number
    hitRatePct: number
    byProvider: Array<{ provider: string; count: number }>
  }
  sampleCapped?: boolean
}

export interface SearchSuccessRate24hRow {
  marketplace: string
  successRatePct: number
  totalRequests: number
  successfulRequests: number
  avgResponseTimeMs: number | null
  alert: boolean
}

/** Phase 12 — monitoring economics (dedup + Scrappey cost). */
export interface EconomicsDashboardBlock {
  periodDays: number
  activeMonitoredProducts: number
  uniqueMonitoringTargets: number
  monitoringUsers: number
  subscribers: number
  avgSubscribersPerTarget: number
  maxSubscribersPerTarget: number
  checksPerDay: number
  scrapeRequestsPerDay: number
  cacheHitRatePct: number
  scrapeFailures: number
  scrapeFailuresPerDay: number
  scrapeRequestsPerActiveMonitoredProduct: number
  scrapeRequestsPerUniqueTarget: number
  dedupFactor: number
  estimatedScrapesSaved: number
  costEstimateRubPerDay: { optimistic: number; pessimistic: number }
  costEstimateRubPerMonth: { optimistic: number; pessimistic: number }
  assumptions?: {
    scrappeyRubPerThousandCalls: number
    optimisticCallsPerScrape: number
    pessimisticCallsPerScrape: number
    note: string
  }
}

export interface MetricsDashboardPayload {
  ok: boolean
  generatedAt: string
  periodDays?: number
  searchDaily: SearchMetricRow[]
  searchWeekly: SearchMetricRow[]
  aiRequests: AiRequestRow[]
  /** Per-MP Reliability 24h (WB/Ozon/YM/Mega/Ali) from vw_search_success_rate_24h. */
  searchSuccessRate24h?: SearchSuccessRate24hRow[]
  wbSuccessRate24h: {
    total_requests: number
    successful_requests: number
    success_rate_pct: number
    avg_response_time_ms: number
  } | null
  scrape?: {
    total: number
    bySource: Record<string, number>
    periodDays: number
  }
  seo?: {
    publishedCount: number
    totalViews: number
  }
  premium?: {
    activeCount: number
    activeTrials: number
  }
  productFunnel?: ProductFunnelPayload
  edge?: {
    topEndpoints: Array<{ endpoint: string; count: number }>
    sampleCapped?: boolean
  }
  alerts: {
    lowSearchSuccessRate?: boolean
    alertingMarketplaces?: string[]
    thresholdPct: number
    /** @deprecated Prefer lowSearchSuccessRate / alertingMarketplaces */
    wbLowSuccessRate: boolean
    wbSuccessRatePct: number
  }
  economics?: EconomicsDashboardBlock
  error?: string
}
