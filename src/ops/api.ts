import { createClient, type Session, type SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null

export function getLandingSupabase(): SupabaseClient | null {
  const url = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim()
  const anon = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim()
  if (!url || !anon) return null
  if (!client) {
    client = createClient(url, anon, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: 'priceguard-landing-ops-auth',
      },
    })
  }
  return client
}

export function isOpsConfigured(): boolean {
  return getLandingSupabase() != null
}

export async function getOpsSession(): Promise<Session | null> {
  const sb = getLandingSupabase()
  if (!sb) return null
  const { data } = await sb.auth.getSession()
  return data.session
}

export async function signInOps(email: string, password: string): Promise<{ error?: string }> {
  const sb = getLandingSupabase()
  if (!sb) return { error: 'Supabase не настроен (VITE_SUPABASE_URL / ANON_KEY)' }
  const { error } = await sb.auth.signInWithPassword({ email: email.trim(), password })
  if (error) return { error: error.message }
  return {}
}

export async function signOutOps(): Promise<void> {
  const sb = getLandingSupabase()
  if (!sb) return
  await sb.auth.signOut()
}

export async function fetchOpsMetrics(
  accessToken: string,
  periodDays: 1 | 7 | 30,
): Promise<import('./types').MetricsDashboardPayload> {
  const url = (import.meta.env.VITE_SUPABASE_URL as string).replace(/\/$/, '')
  const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string
  const res = await fetch(`${url}/functions/v1/metrics-dashboard`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      apikey: anon,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ periodDays }),
  })
  const json = (await res.json().catch(() => ({}))) as import('./types').MetricsDashboardPayload & {
    error?: string
  }
  if (!res.ok) {
    return {
      ok: false,
      generatedAt: new Date().toISOString(),
      searchDaily: [],
      searchWeekly: [],
      aiRequests: [],
      wbSuccessRate24h: null,
      alerts: {
        wbLowSuccessRate: false,
        wbSuccessRatePct: 0,
        thresholdPct: 85,
        lowSearchSuccessRate: false,
        alertingMarketplaces: [],
      },
      error: json.error || `HTTP ${res.status}`,
    }
  }
  return json
}
