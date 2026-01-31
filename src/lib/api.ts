import client from './contentful';
import { Artwork, Collection, BlogPost, AboutPage, SiteSettings } from './types';

// Artworks
export async function getAllArtworks(): Promise<Artwork[]> {
  const entries = await client.getEntries<any>({
    content_type: 'artwork',
    order: ['-fields.order', '-sys.createdAt'],
    include: 2, // Include referenced assets
  });
  return entries.items as Artwork[];
}

export async function getFeaturedArtworks(limit: number = 6): Promise<Artwork[]> {
  const entries = await client.getEntries<any>({
    content_type: 'artwork',
    'fields.featured': true,
    limit,
    order: ['-fields.order'],
    include: 2, // Include referenced assets
  });
  return entries.items as Artwork[];
}

export async function getArtworkBySlug(slug: string): Promise<Artwork | null> {
  const entries = await client.getEntries<any>({
    content_type: 'artwork',
    'fields.slug': slug,
    limit: 1,
    include: 2, // Include referenced assets and entries
  });
  return entries.items[0] || null;
}

export async function getArtworksForSale(): Promise<Artwork[]> {
  const entries = await client.getEntries<any>({
    content_type: 'artwork',
    'fields.availableForSale': true,
    order: ['-fields.order'],
    include: 2, // Include referenced assets
  });
  return entries.items as Artwork[];
}

// Collections
export async function getAllCollections(): Promise<Collection[]> {
  const entries = await client.getEntries<any>({
    content_type: 'collection',
    order: ['fields.name'],
    include: 2, // Include referenced assets
  });
  return entries.items as Collection[];
}

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  const entries = await client.getEntries<any>({
    content_type: 'collection',
    'fields.slug': slug,
    limit: 1,
    include: 2, // Include referenced artworks
  });
  return entries.items[0] || null;
}

// Blog Posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const entries = await client.getEntries<any>({
    content_type: 'blogPost',
    order: ['-fields.publishDate'],
    include: 2, // Include referenced assets
  });
  return entries.items as BlogPost[];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const entries = await client.getEntries<any>({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1,
    include: 2, // Include referenced assets
  });
  return entries.items[0] || null;
}

export async function getRecentBlogPosts(limit: number = 3): Promise<BlogPost[]> {
  const entries = await client.getEntries<any>({
    content_type: 'blogPost',
    order: ['-fields.publishDate'],
    limit,
    include: 2, // Include referenced assets
  });
  return entries.items as BlogPost[];
}

// About Page
export async function getAboutPage(): Promise<AboutPage | null> {
  const entries = await client.getEntries<any>({
    content_type: 'aboutPage',
    limit: 1,
    include: 2, // Include referenced assets
  });
  return entries.items[0] || null;
}

// Site Settings
export async function getSiteSettings(): Promise<SiteSettings | null> {
  const entries = await client.getEntries<any>({
    content_type: 'siteSettings',
    limit: 1,
    include: 2, // Include referenced assets
  });
  return entries.items[0] || null;
}
