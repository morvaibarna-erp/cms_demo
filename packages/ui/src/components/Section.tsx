import { View } from 'react-native'
import { tokens as t, type PropsMap } from '@acme/contracts'

const WIDTH = { narrow: 720, normal: 1100, full: undefined } as const

export function Section({ variant, paddingY, width, content: Content }: PropsMap['Section']) {
  const bg = variant === 'muted' ? t.color.surface : t.color.bg
  const card = variant === 'card'
  return (
    <View style={{ width: '100%', alignItems: 'center', backgroundColor: bg, paddingVertical: t.space[paddingY] }}>
      <View
        style={{
          width: '100%',
          maxWidth: WIDTH[width],
          paddingHorizontal: t.space.md,
          ...(card && { borderWidth: 1, borderColor: t.color.border, borderRadius: t.radius, padding: t.space.lg, backgroundColor: t.color.bg }),
        }}
      >
        <Content />
      </View>
    </View>
  )
}
