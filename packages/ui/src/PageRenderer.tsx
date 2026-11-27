import { useMemo, type ComponentType } from 'react'
import { contracts, type ComponentName, type NewsItem, type PageBlock, type PageData } from '@acme/contracts'
import { components } from './registry'
import { ContentProvider } from './content'
import { NavigationProvider } from './navigation'

function Blocks({ items }: { items: PageBlock[] }) {
  return (
    <>
      {items.map((block) => (
        <Block key={block.props.id} block={block} />
      ))}
    </>
  )
}

/** Renders one block. Slot props (arrays of blocks) become `<Content />` components, exactly as in the editor. */
function Block({ block }: { block: PageBlock }) {
  const Component = components[block.type as ComponentName] as ComponentType<any> | undefined
  const contract = contracts[block.type as ComponentName]

  const props = useMemo(() => {
    if (!contract) return block.props
    const next: Record<string, unknown> = { ...block.props }
    for (const [key, field] of Object.entries(contract.fields as Record<string, { type?: string }>)) {
      if (field?.type === 'slot') {
        const items = (block.props[key] as PageBlock[] | undefined) ?? []
        next[key] = () => <Blocks items={items} />
      }
    }
    return next
  }, [block, contract])

  if (!Component) {
    if (typeof __DEV__ !== 'undefined' && __DEV__) console.warn(`[PageRenderer] Unknown component "${block.type}"`)
    return null // old app builds simply skip blocks they do not know yet
  }
  return <Component {...props} />
}

/** Renders Puck JSON. The same code runs on iOS/Android (Expo) and on the web (react-native-web). */
export function PageRenderer({ data, news = [], onNavigate }: { data: PageData; news?: NewsItem[]; onNavigate?: (slug: string) => void }) {
  return (
    <ContentProvider value={{ news }}>
      <NavigationProvider value={onNavigate ?? (() => {})}>
        <Blocks items={data.content} />
      </NavigationProvider>
    </ContentProvider>
  )
}
