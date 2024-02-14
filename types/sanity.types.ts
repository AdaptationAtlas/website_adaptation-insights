import { PortableTextBlock } from 'sanity'

type HomepageLink = {
  title: string;
  subtitle: string;
  image: string;
}

export type Home = {
  _id: string;
  _createdAt: Date;
  title: string;
  slug: string;
  heroText: string;
  introText: string;
  heroImage: string;
  networkGraphicImage: string;
  homepageLinks: {
    partnersLink: HomepageLink;
    projectsLink: HomepageLink;
    toolsLink: HomepageLink;
  };
}

export type About = {
  _id: string;
  _createdAt: Date;
  title: string;
  slug: string;
  heading: string;
  description: string;
  heroImage: string;
  heroImageMobile: string;
  content: PortableTextBlock[]; // Sanity stores rich text content in PortableTextBlog type
}

export type Tools = {
  _id: string;
  _createdAt: Date;
  title: string;
  slug: string;
  heading: string;
  description: string;
  heroImage: string;
  heroImageMobile: string;
  content: PortableTextBlock[]; // Sanity stores rich text content in PortableTextBlog type
}