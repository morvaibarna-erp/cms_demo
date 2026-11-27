import { defineContract } from '../define'

export interface FeatureListProps {
  heading: string
  items: { title: string; description: string }[]
}

export const featureList = defineContract<FeatureListProps>({
  label: 'Feature list',
  fields: {
    heading: { type: 'text', label: 'Heading' },
    items: {
      type: 'array',
      label: 'Features',
      arrayFields: { title: { type: 'text' }, description: { type: 'textarea' } },
      getItemSummary: (item) => item.title || 'Feature',
      defaultItemProps: { title: 'Feature', description: 'Describe it' },
    },
  },
  defaultProps: { heading: 'Why us', items: [{ title: 'Fast', description: 'Quick to load.' }, { title: 'Simple', description: 'Easy to use.' }] },
})
