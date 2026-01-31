import { getArtworkBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';

export default async function DebugArtworkPage({ params }: { params: { slug: string } }) {
  const artwork = await getArtworkBySlug(params.slug);

  if (!artwork) {
    return <div className="p-8">No se encontró el artwork</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Debug - {artwork.fields.title}</h1>
      
      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-bold mb-2">Información Básica</h2>
          <p><strong>Title:</strong> {artwork.fields.title}</p>
          <p><strong>Slug:</strong> {artwork.fields.slug}</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded">
          <h2 className="font-bold mb-2">Main Image Debug</h2>
          <p><strong>Has mainImage:</strong> {artwork.fields.mainImage ? '✅ SÍ' : '❌ NO'}</p>
          
          {artwork.fields.mainImage && (
            <>
              <p><strong>mainImage type:</strong> {typeof artwork.fields.mainImage}</p>
              <p><strong>Has fields:</strong> {artwork.fields.mainImage.fields ? '✅ SÍ' : '❌ NO'}</p>
              
              {artwork.fields.mainImage.fields && (
                <>
                  <p><strong>Has file:</strong> {artwork.fields.mainImage.fields.file ? '✅ SÍ' : '❌ NO'}</p>
                  
                  {artwork.fields.mainImage.fields.file && (
                    <>
                      <p><strong>URL:</strong> {artwork.fields.mainImage.fields.file.url || 'NO URL'}</p>
                      
                      {artwork.fields.mainImage.fields.file.url && (
                        <div className="mt-4">
                          <p className="font-bold mb-2">Vista previa con img tag:</p>
                          <img 
                            src={artwork.fields.mainImage.fields.file.url.startsWith('//') 
                              ? `https:${artwork.fields.mainImage.fields.file.url}` 
                              : artwork.fields.mainImage.fields.file.url
                            } 
                            alt={artwork.fields.title}
                            className="max-w-md"
                          />
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>

        <div className="bg-blue-100 p-4 rounded">
          <h2 className="font-bold mb-2">JSON Completo del Artwork</h2>
          <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded overflow-auto max-h-96">
            {JSON.stringify(artwork, null, 2)}
          </pre>
        </div>

        <div className="bg-red-100 p-4 rounded">
          <h2 className="font-bold mb-2">JSON Solo de mainImage</h2>
          <pre className="text-xs bg-gray-900 text-yellow-400 p-4 rounded overflow-auto max-h-96">
            {JSON.stringify(artwork.fields.mainImage, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
