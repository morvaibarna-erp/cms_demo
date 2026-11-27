import { Text, View } from 'react-native'
import { tokens as t, type PropsMap } from '@acme/contracts'

export function RichText({ heading, body, align }: PropsMap['RichText']) {
  const paragraphs = body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
  return (
    <View style={{ padding: t.space.md, gap: t.space.sm }}>
      {!!heading && <Text style={{ fontSize: 24, fontWeight: '700', color: t.color.text, textAlign: align }}>{heading}</Text>}
      {paragraphs.map((p, i) => (
        <Text key={i} style={{ fontSize: 16, lineHeight: 24, color: t.color.text, textAlign: align }}>{p}</Text>
      ))}
    </View>
  )
}
