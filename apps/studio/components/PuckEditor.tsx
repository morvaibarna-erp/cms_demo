import { createContext, useContext, useMemo, useState } from 'react'
import { Puck } from '@puckeditor/core'
import '@puckeditor/core/puck.css'
import { Button, Text } from '@sanity/ui'
import type { PageData } from '@acme/contracts'
import { createPuckConfig, PreviewContext } from '@acme/ui/puck'
import { ImageField } from './ImageField'

type Preview = 'desktop' | 'phone'
type Control = { preview: Preview; setPreview: (p: Preview) => void; close: () => void; status: string }
const ControlContext = createContext<Control>({ preview: 'desktop', setPreview: () => {}, close: () => {}, status: '' })

// Defined once (stable identity) so Puck does not re-mount its header on every render.
function HeaderActions({ children }: { children?: React.ReactNode }) {
  const { preview, setPreview, close, status } = useContext(ControlContext)
  return (
    <>
      {status && <Text size={1} muted>{status}</Text>}
      <Button text="Desktop" mode={preview === 'desktop' ? 'default' : 'ghost'} onClick={() => setPreview('desktop')} />
      <Button text="Phone" mode={preview === 'phone' ? 'default' : 'ghost'} onClick={() => setPreview('phone')} />
      <Button text="Close tab" mode="ghost" onClick={close} />
      {children}
    </>
  )
}
const overrides = { headerActions: HeaderActions }

export function PuckEditor(props: {
  initialData: PageData
  status: string
  onSave: (data: PageData) => void
  onChange: (data: PageData) => void
  onClose: () => void
}) {
  const [preview, setPreview] = useState<Preview>('desktop')
  const config = useMemo(() => createPuckConfig({ ImageField }), [])
  const control = useMemo(
    () => ({ preview, setPreview, close: props.onClose, status: props.status }),
    [preview, props.onClose, props.status],
  )

  return (
    <ControlContext.Provider value={control}>
      <PreviewContext.Provider value={preview}>
        <Puck
          config={config}
          data={props.initialData as any}
          overrides={overrides}
          iframe={{ enabled: false }} // react-native-web injects its styles into the main document
          onChange={(d) => props.onChange(d as unknown as PageData)}
          onPublish={(d) => props.onSave(d as unknown as PageData)}
        />
      </PreviewContext.Provider>
    </ControlContext.Provider>
  )
}
