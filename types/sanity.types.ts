import { PortableTextBlock } from 'sanity'

export type Home = {
  _id: string;
  _createdAt: Date;
  title: string;
  slug: string;
  heroImage: string;
  heroText: string;
  introText: string;
  partnersLinkImage: string;
  projectsLinkImage: string;
  wikiLinkImage: string;
  networkGraphicImage: string;
}

export type About = {
  _id: string;
  _createdAt: Date;
  title: string;
  slug: string;
  heroImage: string;
  heroImageMobile: string;
  content: PortableTextBlock[]; // Sanity stores rich text content in PortableTextBlog type
}

export type Tools = {
  _id: string;
  _createdAt: Date;
  title: string;
  slug: string;
  heroImage: string;
  heroImageMobile: string;
  content: PortableTextBlock[]; // Sanity stores rich text content in PortableTextBlog type
}