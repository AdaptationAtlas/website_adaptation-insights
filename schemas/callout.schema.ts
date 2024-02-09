import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'callout',
  title: 'Callout Box',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Callout Heading',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Callout Body',
      type: 'text',
    }),
  ],
})
