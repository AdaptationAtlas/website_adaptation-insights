import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'home',
  type: 'document',
  title: 'Home',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }
      ]
    }),
    defineField({
      name: 'heroText',
      title: 'Hero text',
      type: 'text',
    }),
    defineField({
      name: 'introText',
      title: 'Intro text',
      type: 'text',
    }),
    defineField({
      name: 'partnersLinkImage',
      title: 'Partners link image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }
      ]
    }),
    defineField({
      name: 'projectsLinkImage',
      title: 'Projects link image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }
      ]
    }),
    defineField({
      name: 'wikiLinkImage',
      title: 'Wiki link image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }
      ]
    }),
  ],
})


