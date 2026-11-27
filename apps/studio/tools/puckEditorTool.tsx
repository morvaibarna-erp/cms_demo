import { useCallback, useEffect, useRef, useState } from 'react'
import { Card, Flex, Spinner, Text } from '@sanity/ui'
import { useClient, useDocumentOperation, useEditState, type Tool } from 'sanity'
import { newsQuery, parsePageData, type NewsItem, type PageData } from '@acme/contracts'
import { ContentProvider } from '@acme/ui/puck'
import { PuckEditor } from '../components/PuckEditor'

type PageDoc = { title?: string; puckData?: string }

const Fullscreen = ({ children }: { children: React.ReactNode }) => (
  // covers the Studio navbar so the editor uses the whole tab
  <div style={{ position: 'fixed', inset: 0, zIndex: 1_000_000, background: '#fff' }}>{children}</div>
)
const Message = ({ children, spinner }: { children: React.ReactNode; spinner?: boolean }) => (
  <Fullscreen>
    <Flex align="center" justify="center" gap={3} style={{ height: '100%' }}>
      {spinner && <Spinner muted />}
      <Text muted>{children}</Text>
    </Flex>
  </Fullscreen>
)

function DocEditor({ id }: { id: string }) {
  const client = useClient({ apiVersion: '2025-02-19' })
  const { draft, published, ready } = useEditState(id, 'page')
  const { patch } = useDocumentOperation(id, 'page')
  const doc = (draft ?? published) as PageDoc | null

  const [initial, setInitial] = useState<PageData | null>(null)
  const [news, setNews] = useState<NewsItem[]>([])
  const [status, setStatus] = useState('')
  const lastSaved = useRef('')
  const dirty = useRef(false)

  // Real published news articles, so the News list block previews with real content.
  useEffect(() => {
    client.fetch<NewsItem[]>(newsQuery, {}, { perspective: 'published' }).then(setNews).catch(() => {})
  }, [client])

  // Load the layout ONCE. Later draft updates (our own saves) must not reset the editor.
  useEffect(() => {
    if (ready && doc && !initial) {
      const data = parsePageData(doc.puckData)
      lastSaved.current = JSON.stringify(data)
      setInitial(data)
    }
  }, [ready, doc, initial])

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty.current) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [])

  const onChange = useCallback((d: PageData) => {
    dirty.current = JSON.stringify(d) !== lastSaved.current
  }, [])

  const onSave = useCallback(
    (d: PageData) => {
      if (patch.disabled) return setStatus(`Cannot save (${patch.disabled})`)
      patch.execute([{ set: { puckData: JSON.stringify(d) } }])
      lastSaved.current = JSON.stringify(d)
      dirty.current = false
      setStatus('Saved to the draft. Press Publish on the page in Studio to go live.')
    },
    [patch],
  )

  if (!ready) return <Message spinner>Loading…</Message>
  if (!doc) return <Message>Page not found. In Studio, give the page a title first so a draft exists, then try again.</Message>
  if (!initial) return <Message spinner>Loading…</Message>

  return (
    <Fullscreen>
      <ContentProvider value={{ news }}>
        <PuckEditor initialData={initial} status={status} onChange={onChange} onSave={onSave} onClose={() => window.close()} />
      </ContentProvider>
    </Fullscreen>
  )
}

function PuckEditorTool() {
  const id = new URLSearchParams(window.location.search).get('doc')
  if (!id) {
    return (
      <Card padding={5}>
        <Text muted>Open a page in Studio and click “Open visual editor”.</Text>
      </Card>
    )
  }
  return <DocEditor id={id.replace(/^drafts\./, '')} />
}

export const puckEditorTool: Tool = { name: 'puck-editor', title: 'Visual editor', component: PuckEditorTool }
