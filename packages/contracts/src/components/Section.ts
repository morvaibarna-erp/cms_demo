import { defineContract, type SlotProp } from '../define'

export interface SectionProps {
  variant: 'plain' | 'muted' | 'card'
  paddingY: 'sm' | 'md' | 'lg' | 'xl'
  width: 'narrow' | 'normal' | 'full'
  content: SlotProp
}

export const section = defineContract<SectionProps>({
  label: 'Section',
  category: 'layout',
  fields: {
    variant: { type: 'select', label: 'Style', options: [{ label: 'Plain', value: 'plain' }, { label: 'Muted background', value: 'muted' }, { label: 'Card', value: 'card' }] },
    paddingY: { type: 'select', label: 'Vertical spacing', options: [{ label: 'S', value: 'sm' }, { label: 'M', value: 'md' }, { label: 'L', value: 'lg' }, { label: 'XL', value: 'xl' }] },
    width: { type: 'radio', label: 'Content width', options: [{ label: 'Narrow', value: 'narrow' }, { label: 'Normal', value: 'normal' }, { label: 'Full', value: 'full' }] },
    content: { type: 'slot', disallow: ['Section'] },
  },
  defaultProps: { variant: 'plain', paddingY: 'lg', width: 'normal', content: [] },
})
