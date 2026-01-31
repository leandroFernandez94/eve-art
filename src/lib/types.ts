import { Asset, Entry } from 'contentful';

// Artwork Type
export interface ArtworkFields {
  title: string;
  slug: string;
  mainImage: Asset;
  additionalImages?: Asset[];
  description: any; // Rich text
  technique?: string;
  dimensions?: string;
  year?: number;
  price?: number;
  availableForSale: boolean;
  collection?: Entry<CollectionFields>;
  featured: boolean;
  order?: number;
}

export type Artwork = Entry<ArtworkFields>;

// Collection Type
export interface CollectionFields {
  name: string;
  slug: string;
  description: any; // Rich text
  coverImage: Asset;
  artworks?: Entry<ArtworkFields>[];
}

export type Collection = Entry<CollectionFields>;

// Blog Post Type
export interface BlogPostFields {
  title: string;
  slug: string;
  content: any; // Rich text
  featuredImage: Asset;
  publishDate: string;
  excerpt: string;
}

export type BlogPost = Entry<BlogPostFields>;

// About Page Type
export interface AboutPageFields {
  biography: any; // Rich text
  profilePhoto: Asset;
  creativeProcess?: any; // Rich text
  exhibitions?: any; // Rich text
}

export type AboutPage = Entry<AboutPageFields>;

// Site Settings Type
export interface SiteSettingsFields {
  siteName: string;
  logo?: Asset;
  socialMedia?: string;
  contactEmail: string;
  welcomeText?: string;
}

export type SiteSettings = Entry<SiteSettingsFields>;

// Helper type for images
export interface ContentfulImage {
  url: string;
  title: string;
  width: number;
  height: number;
  description?: string;
}

// Helper function to extract image data
export function getImageFromAsset(asset: Asset): ContentfulImage {
  if (!asset || !asset.fields) {
    console.error('Invalid asset:', asset);
    return {
      url: '',
      title: 'Image not found',
      width: 800,
      height: 600,
      description: '',
    };
  }

  const file = asset.fields.file;
  if (!file || !file.url) {
    console.error('Asset has no file or URL:', asset);
    return {
      url: '',
      title: asset.fields.title || 'Image not found',
      width: 800,
      height: 600,
      description: asset.fields.description,
    };
  }

  return {
    url: file.url,
    title: asset.fields.title || '',
    width: file.details?.image?.width || 800,
    height: file.details?.image?.height || 600,
    description: asset.fields.description,
  };
}
