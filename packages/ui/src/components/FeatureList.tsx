import { Text, View } from 'react-native'
import { tokens as t, type PropsMap } from '@acme/contracts'

export function FeatureList({ heading, items }: PropsMap['FeatureList']) {
  return (
    <View style={{ padding: t.space.md, gap: t.space.sm }}>
      {!!heading && <Text style={{ fontSize: 24, fontWeight: '700', color: t.color.text }}>{heading}</Text>}
      {items.map((it, i) => (
        <View key={i} style={{ padding: t.space.md, borderRadius: t.radius, backgroundColor: t.color.surface }}>
          <Text style={{ fontWeight: '600', fontSize: 16, color: t.color.text }}>{it.title}</Text>
          <Text style={{ color: t.color.muted }}>{it.description}</Text>
        </View>
      ))}
    </View>
  )
}
