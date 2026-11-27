import { createClient } from '@sanity/client'
import { pageWithNewsQuery, parsePageData, type NewsItem, type PageData } from '@acme/contracts'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-02-19',
  useCdn: false,
  perspective: 'published', // visitors only ever see published content
})

/** One request: the page layout plus the news articles. Returns null when the page does not exist. */
export async function getPage(slug: string): Promise<{ title: string; data: PageData; news: NewsItem[] } | null> {
  const res = await client.fetch<{ page: { title?: string; puckData?: string } | null; news: NewsItem[] }>(pageWithNewsQuery, { slug })
  if (!res.page) return null
  return { title: res.page.title ?? '', data: parsePageData(res.page.puckData), news: res.news ?? [] }
}
