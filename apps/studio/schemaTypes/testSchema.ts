import { defineField, defineType } from 'sanity'

export const testSchema = defineType({
  name: 'testSchema',
  title: 'Test schema',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
  ],
})
