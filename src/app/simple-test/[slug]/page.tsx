import { getArtworkBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';

export default async function SimpleTestPage({ params }: { params: { slug: string } }) {
  const artwork = await getArtworkBySlug(params.slug);

  if (!artwork) {
    notFound();
  }

  const imageUrl = artwork.fields.mainImage?.fields?.file?.url;
  if (!imageUrl) {
    return <div>No image URL</div>;
  }

  const fullUrl = imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl;

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Test con IMG tag normal</h1>
      <img src={fullUrl} alt={artwork.fields.title} className="max-w-md" />
      
      <hr className="my-8" />
      
      <h1 className="text-2xl mb-4">Test con Next.js Image (unoptimized)</h1>
      <img 
        src={`/_next/image?url=${encodeURIComponent(fullUrl)}&w=640&q=75`}
        alt={artwork.fields.title} 
        className="max-w-md" 
      />
      
      <p className="mt-4">URL: {fullUrl}</p>
    </div>
  );
}
