import { defineContract } from '../define'

export interface SpacerProps { size: 'sm' | 'md' | 'lg' | 'xl' }

export const spacer = defineContract<SpacerProps>({
  label: 'Spacer',
  fields: {
    size: { type: 'select', label: 'Size', options: [{ label: 'S', value: 'sm' }, { label: 'M', value: 'md' }, { label: 'L', value: 'lg' }, { label: 'XL', value: 'xl' }] },
  },
  defaultProps: { size: 'md' },
})
