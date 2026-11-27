'use client'
import { useRouter, useServerInsertedHTML } from 'next/navigation'
import { AppRegistry } from 'react-native'
import type { NewsItem, PageData } from '@acme/contracts'
import { PageRenderer } from '@acme/ui'

export function WebPage({ data, news }: { data: PageData; news: NewsItem[] }) {
  const router = useRouter()

  // Server-render react-native-web's styles so there is no unstyled flash.
  useServerInsertedHTML(() => {
    AppRegistry.registerComponent('Main', () => () => null)
    const { getStyleElement } = (AppRegistry as any).getApplication('Main')
    return getStyleElement()
  })

  return <PageRenderer data={data} news={news} onNavigate={(slug) => router.push(slug === 'home' ? '/' : `/${slug}`)} />
}
