import { useState } from 'react'
import { Button, Flex, Stack, Text } from '@sanity/ui'
import { useClient } from 'sanity'

/** Image picker for the visual editor: uploads to Sanity and stores the image URL. */
export function ImageField({ value, onChange, label }: { value?: string; onChange: (url: string) => void; label?: string }) {
  const client = useClient({ apiVersion: '2025-02-19' })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function upload(file: File) {
    setBusy(true)
    setError('')
    try {
      const asset = await client.assets.upload('image', file, { filename: file.name })
      onChange(asset.url)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <Stack space={3}>
      {label && <Text size={1} weight="medium">{label}</Text>}
      {value ? <img src={`${value}?w=300&auto=format`} alt="" style={{ maxWidth: '100%', borderRadius: 4 }} /> : <Text size={1} muted>No image yet</Text>}
      <Flex gap={2} align="center">
        <input
          type="file"
          accept="image/*"
          disabled={busy}
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) void upload(file)
            e.target.value = ''
          }}
        />
        {value && <Button text="Remove" mode="ghost" tone="critical" onClick={() => onChange('')} />}
      </Flex>
      {busy && <Text size={1} muted>Uploading…</Text>}
      {error && <Text size={1} style={{ color: '#dc2626' }}>{error}</Text>}
    </Stack>
  )
}
