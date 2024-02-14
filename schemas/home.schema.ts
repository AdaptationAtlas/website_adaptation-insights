import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'home',
  type: 'document',
  title: 'Home',
  fields: [
    {
      name: 'title',
      title: 'Page title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'heroText',
      title: 'Hero text',
      type: 'string',
    },
    {
      name: 'introText',
      title: 'Intro text',
      type: 'text',
    },
    {
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
    },
    defineField({
      name: 'networkGraphicImage',
      title: 'Network graphic image',
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
    {
      type: 'object',
      name: 'homepageLinks',
      title: 'Homepage splash links',
      fieldsets: [
        {name: 'partnersLink', title: 'Partners link'},
        {name: 'projectsLink', title: 'Projects link'},
        {name: 'toolsLink', title: 'Tools link'},
      ],
      fields: [
        // Partners link
        {
          name: 'partnersLinkTitle',
          title: 'Partners link title',
          type: 'string',
          fieldset: 'partnersLink',
        },
        {
          name: 'partnersLinkSubtitle',
          title: 'Partners link subtitle',
          type: 'string',
          fieldset: 'partnersLink',
        },
        {
          name: 'partnersLinkImage',
          title: 'Partners link image',
          type: 'image',
          fieldset: 'partnersLink',
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
        },
        // Projects link
        {
          name: 'projectsLinkTitle',
          title: 'Projects link title',
          type: 'string',
          fieldset: 'projectsLink',
        },
        {
          name: 'projectsLinkSubtitle',
          title: 'Projects link subtitle',
          type: 'string',
          fieldset: 'projectsLink',
        },
        {
          name: 'projectsLinkImage',
          title: 'Projects link image',
          type: 'image',
          fieldset: 'projectsLink',
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
        },
        // Tools link
        {
          name: 'toolsLinkTitle',
          title: 'Tools link title',
          type: 'string',
          fieldset: 'toolsLink',
        },
        {
          name: 'toolsLinkSubtitle',
          title: 'Tools link subtitle',
          type: 'string',
          fieldset: 'toolsLink',
        },
        {
          name: 'toolsLinkImage',
          title: 'Tools link image',
          type: 'image',
          fieldset: 'toolsLink',
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
        }
      ]
    },
  ],
})


