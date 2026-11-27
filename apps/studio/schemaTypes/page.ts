import { defineField, defineType } from 'sanity'
import { PuckInput } from '../components/PuckInput'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      description: 'Use "home" for the start page.',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    // JSON produced by the visual editor. Edited through the button, not by hand.
    defineField({ name: 'puckData', title: 'Layout', type: 'text', components: { input: PuckInput } }),
  ],
  preview: { select: { title: 'title', subtitle: 'slug.current' } },
})
