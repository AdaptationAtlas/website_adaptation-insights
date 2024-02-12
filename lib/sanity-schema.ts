import { type SchemaTypeDefinition } from 'sanity'

import page from '@/schemas/page.schema'
import category from '@/schemas/category.schema'
import block from '@/schemas/block.schema'
import callout from '@/schemas/callout.schema'
import gallery from '@/schemas/gallery.schema'
import home from '@/schemas/home.schema'
import about from '@/schemas/about.schema'
import tools from '@/schemas/tools.schema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [page, category, block, callout, gallery, home, about, tools ],
}
