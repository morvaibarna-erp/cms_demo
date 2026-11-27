import { defineContract } from '../define'

// Shows the News articles marketing writes in Studio. The list comes from Sanity, not from this block.
export interface NewsListProps {
  title: string
  count: number
  showImages: 'yes' | 'no'
}

export const newsList = defineContract<NewsListProps>({
  label: 'News list',
  fields: {
    title: { type: 'text', label: 'Title' },
    count: { type: 'number', label: 'How many articles', min: 1, max: 20 },
    showImages: { type: 'radio', label: 'Show images', options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }] },
  },
  defaultProps: { title: 'Latest news', count: 3, showImages: 'yes' },
})
