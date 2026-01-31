import { getAllArtworks } from '@/lib/api';

export default async function TestPage() {
  const artworks = await getAllArtworks();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Debug - Artworks</h1>
      
      <div className="space-y-8">
        {artworks.map((artwork) => {
          const hasMainImage = !!artwork.fields.mainImage;
          const imageData = hasMainImage ? {
            hasFields: !!artwork.fields.mainImage?.fields,
            hasFile: !!artwork.fields.mainImage?.fields?.file,
            url: artwork.fields.mainImage?.fields?.file?.url,
          } : null;

          return (
            <div key={artwork.sys.id} className="border p-4 rounded">
              <h2 className="text-xl font-bold">{artwork.fields.title}</h2>
              <div className="mt-2 text-sm font-mono bg-gray-100 p-3 rounded">
                <p><strong>Slug:</strong> {artwork.fields.slug}</p>
                <p><strong>Has mainImage:</strong> {hasMainImage ? '✅' : '❌'}</p>
                {hasMainImage && imageData && (
                  <>
                    <p><strong>Has fields:</strong> {imageData.hasFields ? '✅' : '❌'}</p>
                    <p><strong>Has file:</strong> {imageData.hasFile ? '✅' : '❌'}</p>
                    <p><strong>URL:</strong> {imageData.url || 'NO URL'}</p>
                    {imageData.url && (
                      <img 
                        src={imageData.url.startsWith('//') ? `https:${imageData.url}` : imageData.url} 
                        alt={artwork.fields.title}
                        className="mt-2 max-w-xs"
                      />
                    )}
                  </>
                )}
              </div>
              
              <details className="mt-2">
                <summary className="cursor-pointer text-blue-600">Ver JSON completo</summary>
                <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded mt-2 overflow-auto">
                  {JSON.stringify(artwork, null, 2)}
                </pre>
              </details>
            </div>
          );
        })}
      </div>
    </div>
  );
}
