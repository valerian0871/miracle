import type { QueryParams } from 'next-sanity'
import { client } from './client'

type FetchArgs = {
  query: string
  params?: QueryParams
  /** Tags the webhook can invalidate, for example "project" or "siteSettings" */
  tags: string[]
  /** Fallback refresh interval in seconds. Covers scheduled publish dates. */
  revalidate?: number
}

/**
 * Cached read from Sanity. Two things refresh the cache:
 * 1. The webhook in Part 15 invalidates the tags the moment she publishes
 * 2. The time-based fallback re-reads after an hour, so a project with a
 *    future publish date appears on schedule even if nobody edits anything
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags,
  revalidate = 3600,
}: FetchArgs): Promise<T> {
  const data = await client.fetch(query, params, { next: { revalidate, tags } })
  return data as T
}