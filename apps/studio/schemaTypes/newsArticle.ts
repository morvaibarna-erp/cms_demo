import { defineField, defineType } from 'sanity'

export const newsArticle = defineType({
  name: 'newsArticle',
  title: 'News article',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'publishedAt', title: 'Date', type: 'datetime', initialValue: () => new Date().toISOString() }),
    defineField({ name: 'summary', type: 'text', rows: 3, description: 'Short teaser shown in the list.' }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'body', title: 'Full text', type: 'text', rows: 10, description: 'Shown when a visitor taps "Read more".' }),
  ],
  orderings: [{ title: 'Newest first', name: 'dateDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'publishedAt', media: 'image' } },
})
