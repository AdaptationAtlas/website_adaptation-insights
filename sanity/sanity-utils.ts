import { createClient, groq } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'
import { Project } from '@/types/Project'
import { Home } from '@/types/Home'
import { About } from '@/types/About'

// Utility function to get projects from sanity database
// createClient allows us to read data from the admin
// Define the promise type returning an array of projects
// Adding types to the sanity utils keeps all the typing in one place
// All pages and components that use these utils inherit the types
export async function getProjects(): Promise<Project[]> {
  const client = createClient({
    projectId,
    dataset,
    apiVersion
  });

  // Use groq to query the database
  return client.fetch(
    groq`*[_type == 'project']{
      _id,
      _createdAt,
      title,
      'slug': slug.current,
      'image': image.asset->url,
      url,
      content
    }`
  )
}

// Function for getting a single project
export async function getProject(slug: string): Promise<Project> {
  const client = createClient({
    projectId,
    dataset,
    apiVersion
  });

  // Use groq to query the database
  return client.fetch(
    groq`*[_type == 'project' && slug.current == $slug][0]{
      _id,
      _createdAt,
      title,
      'slug': slug.current,
      'image': image.asset->url,
      url,
      content
    }`,
    { slug: slug } // can be shortened to just { slug }
  )
}

// Function for getting the homepage content
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
      intro,
      'image': image.asset->url
    }`
  )
}