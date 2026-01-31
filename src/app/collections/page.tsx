import { Metadata } from 'next';
import Link from 'next/link';
import { getAllCollections } from '@/lib/api';
import { getImageFromAsset } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Colecciones - Acuarelas',
  description: 'Explora las diferentes colecciones de obras en acuarela, cada una con su propia historia y temática.',
};

export const revalidate = 3600;

export default async function CollectionsPage() {
  const collections = await getAllCollections();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="watercolor-texture py-16">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-serif font-bold text-watercolor-900 mb-4">
            Colecciones
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Cada colección cuenta una historia única a través del color y la forma
          </p>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="container-custom py-12">
        {collections.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection) => {
              const coverImage = getImageFromAsset(collection.fields.coverImage);
              const coverImageUrl = coverImage.url.startsWith('//') 
                ? `https:${coverImage.url}` 
                : coverImage.url;

              return (
                <Link
                  key={collection.sys.id}
                  href={`/collections/${collection.fields.slug}`}
                  className="card overflow-hidden group"
                >
                  <div className="relative h-64 bg-gray-200">
                    <img
                      src={coverImageUrl}
                      alt={collection.fields.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h2 className="text-2xl font-serif font-bold">
                        {collection.fields.name}
                      </h2>
                    </div>
                  </div>
                  <div className="p-6">
                    {collection.fields.description && (
                      <p className="text-gray-600 line-clamp-3">
                        {typeof collection.fields.description === 'string' 
                          ? collection.fields.description 
                          : ''}
                      </p>
                    )}
                    <p className="text-sage-600 font-medium mt-4">
                      Ver colección →
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-serif text-gray-600 mb-4">
              No hay colecciones disponibles
            </h2>
            <p className="text-gray-500">
              Vuelve pronto para ver nuevas colecciones
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
