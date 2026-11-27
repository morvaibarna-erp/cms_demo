import { View } from 'react-native'
import { tokens as t, type PropsMap } from '@acme/contracts'
import { useViewportWidth } from '../platform'

const BREAKPOINT = 640
const WEIGHTS: Record<PropsMap['Columns']['layout'], number[]> = {
  '50-50': [1, 1],
  '33-67': [1, 2],
  '67-33': [2, 1],
  '33-33-33': [1, 1, 1],
}

export function Columns({ layout, gap, stack, col1, col2, col3 }: PropsMap['Columns']) {
  const width = useViewportWidth()
  const row = stack === 'never' || width >= BREAKPOINT
  const slots = [col1, col2, col3]
  return (
    <View style={{ flexDirection: row ? 'row' : 'column', gap: t.space[gap] }}>
      {WEIGHTS[layout].map((weight, i) => {
        const Content = slots[i]
        return (
          <View key={i} style={{ flex: row ? weight : undefined, minWidth: 0 }}>
            <Content />
          </View>
        )
      })}
    </View>
  )
}
