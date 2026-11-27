import { defineContract,colorPickerField } from '../define'
import { tokens as t } from '../tokens'

export interface HeadLineProps {
  title: string
  color: string
  fontSize: number
}

// The contract = what marketing can edit. Fields + defaults only, no UI.
export const headLine = defineContract<HeadLineProps>({
  label: 'HeadLine',
  fields: {
    title: { type: 'text', label: 'Title' },
    color: colorPickerField('Color'),
    fontSize: { type: 'number', label: 'Font size' },
  },
  fieldLayout: [
    { type: 'tab', label: 'Content', fields: ['title'] },
    { type: 'tab', label: 'Design', fields: ['color', 'fontSize'] },
  ],
  defaultProps: {
    title: 'HeadLine',
    color: t.color.text,
    fontSize: 24,
  },
})
