import dotenv from 'dotenv';
dotenv.config();

// TODO - Import project id and dataset from .env file

const NEXT_PUBLIC_SANITY_PROJECT_ID = '5seshvnd'
const NEXT_PUBLIC_SANITY_DATASET = 'production'

import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: NEXT_PUBLIC_SANITY_DATASET,
  useCdn: process.env.NODE_ENV === 'production',  // Use CDN in production
});
