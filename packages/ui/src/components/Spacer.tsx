import { View } from 'react-native'
import { tokens as t, type PropsMap } from '@acme/contracts'

export function Spacer({ size }: PropsMap['Spacer']) {
  return <View style={{ height: t.space[size] }} />
}
