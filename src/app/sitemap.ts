import { MetadataRoute } from 'next';
import { getAllArtworks, getAllCollections, getAllBlogPosts } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://tu-dominio.com'; // Reemplazar con tu dominio

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/collections`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  // Dynamic pages - Artworks
  const artworks = await getAllArtworks();
  const artworkPages = artworks.map((artwork) => ({
    url: `${baseUrl}/gallery/${artwork.fields.slug}`,
    lastModified: new Date(artwork.sys.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic pages - Collections
  const collections = await getAllCollections();
  const collectionPages = collections.map((collection) => ({
    url: `${baseUrl}/collections/${collection.fields.slug}`,
    lastModified: new Date(collection.sys.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Dynamic pages - Blog Posts
  const posts = await getAllBlogPosts();
  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.fields.slug}`,
    lastModified: new Date(post.sys.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...artworkPages, ...collectionPages, ...blogPages];
}
