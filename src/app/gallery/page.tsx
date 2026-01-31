import { Metadata } from 'next';
import { getAllArtworks } from '@/lib/api';
import MasonryGrid from '@/components/Gallery/MasonryGrid';

export const metadata: Metadata = {
  title: 'Galería - Acuarelas',
  description: 'Explora la colección completa de obras en acuarela. Cada pieza es única y refleja años de dedicación al arte.',
};

export const revalidate = 3600;

export default async function GalleryPage() {
  const artworks = await getAllArtworks();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="watercolor-texture py-16">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-serif font-bold text-watercolor-900 mb-4">
            Galería
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Una colección de obras en acuarela que capturan momentos, 
            emociones y la belleza de lo efímero
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="container-custom py-12">
        {artworks.length > 0 ? (
          <>
            <div className="mb-8 text-center">
              <p className="text-gray-600">
                Mostrando {artworks.length} {artworks.length === 1 ? 'obra' : 'obras'}
              </p>
            </div>
            <MasonryGrid artworks={artworks} />
          </>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-serif text-gray-600 mb-4">
              No hay obras disponibles
            </h2>
            <p className="text-gray-500">
              Vuelve pronto para ver nuevas creaciones
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
