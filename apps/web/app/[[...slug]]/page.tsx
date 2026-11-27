import { notFound } from 'next/navigation'
import { WebPage } from '../../components/WebPage'
import { getPage } from '../../lib/sanity'

export const revalidate = 60 // published changes appear within a minute

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params
  const result = await getPage(slug?.join('/') || 'home')
  if (!result) notFound()
  return <WebPage data={result.data} news={result.news} />
}
