import { defineContract, type SlotProp } from '../define'

export interface ColumnsProps {
  layout: '50-50' | '33-67' | '67-33' | '33-33-33'
  gap: 'sm' | 'md' | 'lg'
  stack: 'mobile' | 'never'
  col1: SlotProp
  col2: SlotProp
  col3: SlotProp
}

// a function, so each column gets its own fresh object and a mutable array
const slot = () => ({ type: 'slot' as const, disallow: ['Columns', 'Section'] })

export const columns = defineContract<ColumnsProps>({
  label: 'Columns',
  category: 'layout',
  fields: {
    layout: {
      type: 'select',
      label: 'Split',
      options: [
        { label: '2 columns 50 / 50', value: '50-50' },
        { label: '2 columns 33 / 67', value: '33-67' },
        { label: '2 columns 67 / 33', value: '67-33' },
        { label: '3 columns', value: '33-33-33' },
      ],
    },
    gap: { type: 'select', label: 'Gap', options: [{ label: 'S', value: 'sm' }, { label: 'M', value: 'md' }, { label: 'L', value: 'lg' }] },
    stack: { type: 'radio', label: 'On small screens', options: [{ label: 'Stack', value: 'mobile' }, { label: 'Keep side by side', value: 'never' }] },
    col1: slot(),
    col2: slot(),
    col3: slot(),
  },
  defaultProps: { layout: '50-50', gap: 'md', stack: 'mobile', col1: [], col2: [], col3: [] },
})
