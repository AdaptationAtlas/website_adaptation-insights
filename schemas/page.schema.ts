import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'sitePages',
      title: 'Site pages',
      type: 'array',
      of: [
        { type: 'home' },
        { type: 'about' },
      ]
    }),
  ],
})

