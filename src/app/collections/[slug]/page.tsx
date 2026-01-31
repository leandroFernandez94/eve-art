import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCollectionBySlug, getAllCollections } from '@/lib/api';
import { getImageFromAsset } from '@/lib/types';
import MasonryGrid from '@/components/Gallery/MasonryGrid';
import RichText from '@/components/ui/RichText';

export const revalidate = 3600;

export async function generateStaticParams() {
  const collections = await getAllCollections();
  return collections.map((collection) => ({
    slug: collection.fields.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const collection = await getCollectionBySlug(params.slug);
  
  if (!collection) {
    return {
      title: 'Colección no encontrada',
    };
  }

  const coverImage = getImageFromAsset(collection.fields.coverImage);
  const coverImageUrl = coverImage.url.startsWith('//') ? `https:${coverImage.url}` : coverImage.url;

  return {
    title: `${collection.fields.name} - Colecciones - Acuarelas`,
    description: typeof collection.fields.description === 'string' 
      ? collection.fields.description 
      : 'Colección de obras en acuarela',
    openGraph: {
      title: collection.fields.name,
      images: [coverImageUrl],
    },
  };
}

export default async function CollectionDetailPage({ params }: { params: { slug: string } }) {
  const collection = await getCollectionBySlug(params.slug);

  if (!collection) {
    notFound();
  }

  const coverImage = getImageFromAsset(collection.fields.coverImage);
  const coverImageUrl = coverImage.url.startsWith('//') ? `https:${coverImage.url}` : coverImage.url;

  const artworks = collection.fields.artworks || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px]">
        <img
          src={coverImageUrl}
          alt={collection.fields.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="container-custom text-white">
            {/* Breadcrumb */}
            <nav className="flex text-sm mb-6 text-white/90">
              <Link href="/" className="hover:text-white">Inicio</Link>
              <span className="mx-2">/</span>
              <Link href="/collections" className="hover:text-white">Colecciones</Link>
              <span className="mx-2">/</span>
              <span>{collection.fields.name}</span>
            </nav>

            <h1 className="text-5xl lg:text-6xl font-serif font-bold mb-4">
              {collection.fields.name}
            </h1>
            {artworks.length > 0 && (
              <p className="text-xl text-white/90">
                {artworks.length} {artworks.length === 1 ? 'obra' : 'obras'}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Description */}
      {collection.fields.description && (
        <section className="container-custom py-12">
          <div className="max-w-3xl mx-auto">
            <RichText content={collection.fields.description} />
          </div>
        </section>
      )}

      {/* Artworks Grid */}
      <section className="container-custom py-12">
        {artworks.length > 0 ? (
          <>
            <h2 className="text-3xl font-serif font-bold text-watercolor-900 mb-8 text-center">
              Obras de la Colección
            </h2>
            <MasonryGrid artworks={artworks} />
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              Esta colección aún no tiene obras asignadas
            </p>
          </div>
        )}
      </section>

      {/* Back Link */}
      <section className="container-custom pb-12">
        <div className="text-center">
          <Link 
            href="/collections"
            className="text-sage-600 hover:text-sage-700 font-medium inline-flex items-center"
          >
            ← Ver todas las colecciones
          </Link>
        </div>
      </section>
    </div>
  );
}
