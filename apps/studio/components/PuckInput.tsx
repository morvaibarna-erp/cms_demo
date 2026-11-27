import { useMemo } from 'react'
import { Button, Card, Flex, Stack, Text } from '@sanity/ui'
import { useFormValue, useWorkspace, type StringInputProps } from 'sanity'
import { parsePageData } from '@acme/contracts'

/** Shown in the page form: a button that opens the visual editor in a new tab. */
export function PuckInput(props: StringInputProps) {
  const workspace = useWorkspace()
  const rawId = useFormValue(['_id']) as string | undefined
  const blockCount = useMemo(() => parsePageData(props.value).content.length, [props.value])

  const id = rawId?.replace(/^drafts\./, '')
  const url = id ? `${window.location.origin}${workspace.basePath ?? ''}/puck-editor?doc=${encodeURIComponent(id)}` : undefined

  return (
    <Card padding={3} border radius={2}>
      <Flex align="center" justify="space-between" gap={3}>
        <Stack space={2}>
          <Text size={1} muted>{blockCount} top-level block(s)</Text>
          <Text size={0} muted>Opens in a new tab. Saving there updates this draft; then press Publish here.</Text>
        </Stack>
        {url ? (
          <Button as="a" href={url} target="_blank" rel="noopener" text="Open visual editor ↗" tone="primary" />
        ) : (
          <Button text="Open visual editor ↗" tone="primary" disabled />
        )}
      </Flex>
    </Card>
  )
}
