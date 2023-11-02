/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schema'

const config = defineConfig({
  basePath: '/admin',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schema' folder
  schema,
  plugins: [
    // Set up a custom structure for the desk tool
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Pages')
              .child(
                // Create singleton pages for home and about
                // This allows you to add custom fields to each page
                // And prevents the user from creating multiple pages
                S.list()
                  .title('Pages')
                  .items([
                    S.listItem()
                      .title('Home')
                      .child(
                        S.editor()
                          .id('home')
                          .schemaType('home')
                          .documentId('home')
                      ),
                    S.listItem()
                      .title('About')
                      .child(
                        S.editor()
                          .id('about')
                          .schemaType('about')
                          .documentId('about')
                      )
                  ]),
              ),
            S.documentTypeListItem('post').title('Posts'), // Add Posts to content menu
            S.documentTypeListItem('project').title('Projects') // Add Projects to content menu
          ])
    }),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})

export default config;
