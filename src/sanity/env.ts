function assertValue<T>(value: T | undefined, message: string): T {
  if (value === undefined || value === '') throw new Error(message)
  return value
}

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Add it to .env.local (and to Vercel).',
)

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing NEXT_PUBLIC_SANITY_DATASET. Add it to .env.local (and to Vercel).',
)

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-10-01'