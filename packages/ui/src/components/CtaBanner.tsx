import { Pressable, Text, View } from 'react-native'
import { tokens as t, type PropsMap } from '@acme/contracts'
import { useOpenLink } from '../navigation'

export function CtaBanner({ text, buttonLabel, buttonUrl }: PropsMap['CtaBanner']) {
  const open = useOpenLink()
  return (
    <View style={{ padding: t.space.lg, backgroundColor: t.color.primary, gap: t.space.sm }}>
      <Text style={{ fontSize: 22, fontWeight: '700', color: t.color.onPrimary }}>{text}</Text>
      {!!buttonLabel && (
        <Pressable onPress={() => open(buttonUrl)} style={{ backgroundColor: t.color.onPrimary, paddingVertical: 12, paddingHorizontal: 24, borderRadius: t.radius, alignSelf: 'flex-start' }}>
          <Text style={{ color: t.color.primary, fontWeight: '600' }}>{buttonLabel}</Text>
        </Pressable>
      )}
    </View>
  )
}
