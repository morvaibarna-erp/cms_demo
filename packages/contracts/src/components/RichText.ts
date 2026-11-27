import { defineContract } from '../define'

export interface RichTextProps {
  heading: string
  body: string
  align: 'left' | 'center'
}

export const richText = defineContract<RichTextProps>({
  label: 'Text',
  fields: {
    heading: { type: 'text', label: 'Heading (optional)' },
    body: { type: 'textarea', label: 'Text (blank line = new paragraph)' },
    align: { type: 'radio', label: 'Alignment', options: [{ label: 'Left', value: 'left' }, { label: 'Center', value: 'center' }] },
  },
  defaultProps: { heading: 'A heading', body: 'Write your text here.\n\nA blank line starts a new paragraph.', align: 'left' },
})
