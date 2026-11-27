// Content that lives in Sanity next to the pages (news articles). No API of our own.
export interface NewsItem {
  id: string
  title: string
  slug?: string | null
  publishedAt?: string | null
  summary?: string | null
  body?: string | null
  imageUrl?: string | null
}

const news = `*[_type=="newsArticle"] | order(publishedAt desc)[0...20]{
  "id": _id, title, "slug": slug.current, publishedAt, summary, body, "imageUrl": image.asset->url
}`

/** One query returns the page and all news, so a page needs a single request. */
export const pageWithNewsQuery = `{
  "page": *[_type=="page" && slug.current==$slug][0]{title, puckData},
  "news": ${news}
}`

export const newsQuery = news
