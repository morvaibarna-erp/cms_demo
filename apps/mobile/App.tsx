import { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, BackHandler, Pressable, RefreshControl, ScrollView, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { createClient } from '@sanity/client'
import { pageWithNewsQuery, parsePageData, type NewsItem, type PageData } from '@acme/contracts'
import { PageRenderer } from '@acme/ui'

const client = createClient({
  projectId: process.env.EXPO_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.EXPO_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-02-19',
  useCdn: false,
  perspective: 'published',
})

type State =
  | { status: 'loading' }
  | { status: 'missing' }
  | { status: 'error'; message: string }
  | { status: 'ready'; data: PageData; news: NewsItem[] }

export default function App() {
  return (
    <SafeAreaProvider>
      <Screen />
    </SafeAreaProvider>
  )
}

function Screen() {
  const [stack, setStack] = useState<string[]>(['home']) // simple history: last = visible page
  const [state, setState] = useState<State>({ status: 'loading' })
  const [refreshing, setRefreshing] = useState(false)
  const slug = stack[stack.length - 1]

  const load = useCallback(async (to: string) => {
    try {
      const res = await client.fetch<{ page: { puckData?: string } | null; news: NewsItem[] }>(pageWithNewsQuery, { slug: to })
      setState(res.page ? { status: 'ready', data: parsePageData(res.page.puckData), news: res.news ?? [] } : { status: 'missing' })
    } catch (e) {
      setState({ status: 'error', message: String(e) })
    }
  }, [])

  useEffect(() => {
    setState({ status: 'loading' })
    load(slug)
  }, [slug, load])

  const back = useCallback(() => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s)), [])
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (stack.length > 1) return back(), true
      return false
    })
    return () => sub.remove()
  }, [stack.length, back])

  // Pull down to see the latest published content.
  const onRefresh = async () => {
    setRefreshing(true)
    await load(slug)
    setRefreshing(false)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar style="dark" />
      {stack.length > 1 && (
        <Pressable onPress={back} style={{ padding: 12 }}>
          <Text style={{ fontSize: 16 }}>‹ Back</Text>
        </Pressable>
      )}
      <ScrollView style={{ flex: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {state.status === 'loading' && <ActivityIndicator style={{ margin: 32 }} />}
        {state.status === 'missing' && <Text style={{ padding: 16 }}>No page "{slug}" yet. Create it in Studio and publish it.</Text>}
        {state.status === 'error' && <Text style={{ padding: 16 }}>{state.message}</Text>}
        {state.status === 'ready' && (
          <View>
            <PageRenderer data={state.data} news={state.news} onNavigate={(to) => setStack((s) => [...s, to])} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
