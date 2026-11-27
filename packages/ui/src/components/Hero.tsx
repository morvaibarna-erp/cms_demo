import { Image, Pressable, Text, View } from 'react-native'
import { tokens as t, type PropsMap } from '@acme/contracts'
import { sized } from '../images'
import { useOpenLink } from '../navigation'

export function Hero({ title, subtitle, buttonLabel, buttonUrl, align, imageUrl }: PropsMap['Hero']) {
  const open = useOpenLink()
  return (
    <View style={{ padding: t.space.lg, backgroundColor: t.color.surface, alignItems: align === 'center' ? 'center' : 'flex-start', gap: t.space.sm }}>
      {!!imageUrl && (
        <Image source={{ uri: sized(imageUrl, 1200) }} resizeMode="cover" style={{ width: '100%', aspectRatio: 16 / 9, borderRadius: t.radius }} />
      )}
      <Text style={{ fontSize: 34, fontWeight: '700', color: t.color.text, textAlign: align }}>{title}</Text>
      {!!subtitle && <Text style={{ fontSize: 17, color: t.color.muted, textAlign: align }}>{subtitle}</Text>}
      {!!buttonLabel && (
        <Pressable onPress={() => open(buttonUrl)} style={{ backgroundColor: t.color.primary, paddingVertical: 12, paddingHorizontal: 24, borderRadius: t.radius, marginTop: t.space.sm }}>
          <Text style={{ color: t.color.onPrimary, fontWeight: '600' }}>{buttonLabel}</Text>
        </Pressable>
      )}
    </View>
  )
}
