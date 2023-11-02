import { type SchemaTypeDefinition } from 'sanity'

import page from './schemas/page'
import post from './schemas/post'
import project from './schemas/project'
import category from './schemas/category'
import blockContent from './schemas/block-content'
import home from './schemas/home'
import about from './schemas/about'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [page, post, project, category, blockContent, home, about ],
}
