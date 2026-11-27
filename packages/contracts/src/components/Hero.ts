import { defineContract, imageField } from '../define'

export interface HeroProps {
  title: string
  subtitle: string
  buttonLabel: string
  buttonUrl: string
  align: 'left' | 'center'
  imageUrl: string
}

export const hero = defineContract<HeroProps>({
  label: 'Hero',
  fields: {
    title: { type: 'text', label: 'Title' },
    subtitle: { type: 'textarea', label: 'Subtitle' },
    buttonLabel: { type: 'text', label: 'Button label (empty = no button)' },
    buttonUrl: { type: 'text', label: 'Button link (/page-slug or https://…)' },
    align: { type: 'radio', label: 'Alignment', options: [{ label: 'Left', value: 'left' }, { label: 'Center', value: 'center' }] },
    imageUrl: imageField('Image'),
  },
  fieldLayout: [
    { type: 'tab', label: 'Content', fields: ['title', 'subtitle'] },
    { type: 'tab', label: 'Button', fields: ['buttonLabel', 'buttonUrl'] },
    { type: 'tab', label: 'Design', fields: ['align', 'imageUrl'] },
  ],
  defaultProps: { title: 'Headline', subtitle: 'Supporting text', buttonLabel: 'Learn more', buttonUrl: '/', align: 'center', imageUrl: '' },
})
