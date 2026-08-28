import { describe, expect, it } from 'vitest'
import {
  aggregateAiByProvider,
  aggregateSearchByMarketplace,
  filterRowsByPeriod,
  formatOpsBrief,
} from './format'
import type { MetricsDashboardPayload } from './types'

describe('filterRowsByPeriod', () => {
  const now = new Date('2026-08-08T12:00:00.000Z')

  it('keeps rows within window', () => {
    const rows = [
      { day: '2026-08-08' },
      { day: '2026-08-01' },
      { day: '2026-07-01' },
    ]
    expect(filterRowsByPeriod(rows, 7, now).map((r) => r.day)).toEqual([
      '2026-08-08',
      '2026-08-01',
    ])
    expect(filterRowsByPeriod(rows, 1, now)).toHaveLength(1)
  })
})

describe('aggregates', () => {
  it('aggregates search by marketplace', () => {
    const agg = aggregateSearchByMarketplace([
      {
        marketplace: 'ozon',
        day: '2026-08-07',
        total_requests: 10,
        successful_requests: 8,
        success_rate_pct: 80,
        avg_response_time_ms: 100,
      },
      {
        marketplace: 'ozon',
        day: '2026-08-08',
        total_requests: 10,
        successful_requests: 10,
        success_rate_pct: 100,
        avg_response_time_ms: 200,
      },
    ])
    expect(agg).toHaveLength(1)
    expect(agg[0].total).toBe(20)
    expect(agg[0].success).toBe(18)
    expect(agg[0].successRatePct).toBe(90)
    expect(agg[0].avgMs).toBe(150)
  })

  it('aggregates AI by provider', () => {
    const agg = aggregateAiByProvider([
      {
        provider: 'xai',
        day: '2026-08-08',
        request_count: 3,
        success_count: 2,
        error_count: 1,
        total_tokens: 100,
      },
      {
        provider: 'xai',
        day: '2026-08-07',
        request_count: 1,
        success_count: 1,
        error_count: 0,
        total_tokens: 50,
      },
    ])
    expect(agg[0]).toMatchObject({ provider: 'xai', requests: 4, errors: 1, totalTokens: 150 })
  })
})

describe('formatOpsBrief', () => {
  it('builds plaintext brief', () => {
    const data: MetricsDashboardPayload = {
      ok: true,
      generatedAt: '2026-08-08T12:00:00.000Z',
      searchDaily: [
        {
          marketplace: 'wildberries',
          day: '2026-08-08',
          total_requests: 5,
          successful_requests: 4,
          success_rate_pct: 80,
          avg_response_time_ms: 300,
        },
      ],
      searchWeekly: [],
      aiRequests: [
        {
          provider: 'openai',
          day: '2026-08-08',
          request_count: 2,
          success_count: 2,
          error_count: 0,
          total_tokens: 40,
        },
      ],
      wbSuccessRate24h: {
        total_requests: 5,
        successful_requests: 4,
        success_rate_pct: 80,
        avg_response_time_ms: 300,
      },
      scrape: { total: 3, bySource: { scrappey: 2, cache: 1 }, periodDays: 7 },
      seo: { publishedCount: 20, totalViews: 100 },
      premium: { activeCount: 2, activeTrials: 1 },
      alerts: { wbLowSuccessRate: false, wbSuccessRatePct: 80, thresholdPct: 85 },
      productFunnel: {
        installs: 10,
        started: 8,
        marketplaceDetected: 6,
        comparisons: 4,
        successful: 3,
        ai: 2,
        tracked: 1,
        telegram: 1,
        premiumTrial: 1,
        conversions: {
          installToComparison: 40,
          comparisonToSuccess: 75,
          successToTracking: 33.3,
          trackingToTelegram: 100,
          startedToPremium: 12.5,
        },
        byMarketplace: [],
        errors: [],
        aiFunnel: {
          analyses: 2,
          cacheHits: 1,
          generated: 1,
          hitRatePct: 50,
          byProvider: [{ provider: 'openai', count: 2 }],
        },
      },
    }
    const brief = formatOpsBrief(data, 7, new Date('2026-08-08T12:00:00.000Z'))
    expect(brief).toContain('Reliability')
    expect(brief).toContain('wildberries')
    expect(brief).toContain('openai')
    expect(brief).toContain('scrappey: 2')
    expect(brief).toContain('SEO: 20 published')
    expect(brief).toContain('PRODUCT FUNNEL')
    expect(brief).toContain('install→compare 40%')
  })

  it('includes 24h multi-MP reliability and economics in brief', () => {
    const data: MetricsDashboardPayload = {
      ok: true,
      generatedAt: '2026-08-08T12:00:00.000Z',
      searchDaily: [],
      searchWeekly: [],
      aiRequests: [],
      searchSuccessRate24h: [
        {
          marketplace: 'megamarket',
          successRatePct: 90,
          totalRequests: 10,
          successfulRequests: 9,
          avgResponseTimeMs: 120,
          alert: false,
        },
      ],
      wbSuccessRate24h: null,
      alerts: {
        wbLowSuccessRate: false,
        wbSuccessRatePct: 0,
        thresholdPct: 85,
        lowSearchSuccessRate: false,
      },
      economics: {
        periodDays: 7,
        activeMonitoredProducts: 5,
        uniqueMonitoringTargets: 4,
        monitoringUsers: 2,
        subscribers: 3,
        avgSubscribersPerTarget: 1.2,
        maxSubscribersPerTarget: 2,
        checksPerDay: 100,
        scrapeRequestsPerDay: 20,
        cacheHitRatePct: 80,
        scrapeFailures: 1,
        scrapeFailuresPerDay: 0.1,
        scrapeRequestsPerActiveMonitoredProduct: 4,
        scrapeRequestsPerUniqueTarget: 5,
        dedupFactor: 1.5,
        estimatedScrapesSaved: 10,
        costEstimateRubPerDay: { optimistic: 1, pessimistic: 2 },
        costEstimateRubPerMonth: { optimistic: 30, pessimistic: 60 },
      },
    }
    const brief = formatOpsBrief(data, 7, new Date('2026-08-08T12:00:00.000Z'))
    expect(brief).toContain('Reliability (search 24h)')
    expect(brief).toContain('megamarket: 90%')
    expect(brief).toContain('Economics')
  })
})
