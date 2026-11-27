import { defineContract, imageField } from '../define'

export interface ImageBlockProps {
  imageUrl: string
  caption: string
  size: 'small' | 'medium' | 'full'
}

export const imageBlock = defineContract<ImageBlockProps>({
  label: 'Image',
  fields: {
    imageUrl: imageField('Image'),
    caption: { type: 'text', label: 'Caption (optional)' },
    size: { type: 'radio', label: 'Size', options: [{ label: 'Small', value: 'small' }, { label: 'Medium', value: 'medium' }, { label: 'Full width', value: 'full' }] },
  },
  defaultProps: { imageUrl: '', caption: '', size: 'medium' },
})
