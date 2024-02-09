import { createClient, groq } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/lib/env'
import { Home } from '@/types/sanity.types'
import { About } from '@/types/sanity.types'
import { Tools } from '@/types/sanity.types'

// Utility function to get homepage content from sanity database
// createClient allows us to read data from the admin
// Define the promise type returning an array of projects
// Adding types to the sanity utils keeps all the typing in one place
// All pages and components that use these utils inherit the types
export async function getHomeContent(slug: string): Promise<Home> {
  const client = createClient({
    projectId,
    dataset,
    apiVersion
  });

  // Use groq to query the database
  return client.fetch(
    groq`*[_type == "home" && _id == "home"][0] {
      title,
      heroText,
      introText,
      'heroImage': heroImage.asset->url,
      'partnersLinkImage': partnersLinkImage.asset->url,
      'projectsLinkImage': projectsLinkImage.asset->url,
      'wikiLinkImage': wikiLinkImage.asset->url,
      'networkGraphicImage': networkGraphicImage.asset->url
    }`
  )
}

// Function for getting the about page content
export async function getAboutContent(slug: string): Promise<About> {
  const client = createClient({
    projectId,
    dataset,
    apiVersion
  });

  // Use groq to query the database
  return client.fetch(
    groq`*[_type == "about" && _id == "about"][0] {
      title,
      content,
      'heroImage': heroImage.asset->url,
      'heroImageMobile': heroImageMobile.asset->url
    }`
  )
}

// Function for getting the tools page content
export async function getToolsContent(slug: string): Promise<Tools> {
  const client = createClient({
    projectId,
    dataset,
    apiVersion
  });

  // Use groq to query the database
  return client.fetch(
    groq`*[_type == "tools" && _id == "tools"][0] {
      title,
      content,
      'heroImage': heroImage.asset->url,
      'heroImageMobile': heroImageMobile.asset->url
    }`
  )
}