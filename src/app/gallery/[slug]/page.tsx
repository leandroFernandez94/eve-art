import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArtworkBySlug, getAllArtworks } from '@/lib/api';
import { getImageFromAsset } from '@/lib/types';
import RichText from '@/components/ui/RichText';

export const revalidate = 3600;

export async function generateStaticParams() {
  const artworks = await getAllArtworks();
  return artworks.map((artwork) => ({
    slug: artwork.fields.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const artwork = await getArtworkBySlug(params.slug);
  
  if (!artwork) {
    return {
      title: 'Obra no encontrada',
    };
  }

  const imageUrl = artwork.fields.mainImage?.fields?.file?.url || '';
  const fullImageUrl = imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl;

  return {
    title: `${artwork.fields.title} - Acuarelas`,
    description: artwork.fields.technique || 'Obra en acuarela',
    openGraph: {
      title: artwork.fields.title,
      description: artwork.fields.technique || 'Obra en acuarela',
      images: fullImageUrl ? [fullImageUrl] : [],
    },
  };
}

export default async function ArtworkDetailPage({ params }: { params: { slug: string } }) {
  const artwork = await getArtworkBySlug(params.slug);

  if (!artwork) {
    notFound();
  }

  // Obtener URL directamente del asset
  const mainImageUrl = artwork.fields.mainImage?.fields?.file?.url;
  if (!mainImageUrl) {
    console.error('No se pudo obtener la URL de la imagen para:', artwork.fields.title);
    notFound();
  }
  
  // Asegurar que la URL tenga protocolo
  const fullMainImageUrl = mainImageUrl.startsWith('//') ? `https:${mainImageUrl}` : mainImageUrl;

  const additionalImages = artwork.fields.additionalImages?.map((asset) => {
    const url = asset?.fields?.file?.url || '';
    return {
      url: url.startsWith('//') ? `https:${url}` : url,
      title: asset?.fields?.title || '',
      width: asset?.fields?.file?.details?.image?.width || 800,
      height: asset?.fields?.file?.details?.image?.height || 600,
    };
  }).filter(img => img.url) || [];

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="container-custom py-6">
        <nav className="flex text-sm text-gray-600">
          <Link href="/" className="hover:text-watercolor-700">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href="/gallery" className="hover:text-watercolor-700">Galería</Link>
          <span className="mx-2">/</span>
          <span className="text-watercolor-800">{artwork.fields.title}</span>
        </nav>
      </div>

      <div className="container-custom py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images Column */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl">
              <img
                src={fullMainImageUrl}
                alt={artwork.fields.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Additional Images */}
            {additionalImages.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {additionalImages.map((img, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden shadow-md">
                    <img
                      src={img.url}
                      alt={`${artwork.fields.title} - Vista ${index + 2}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-serif font-bold text-watercolor-900 mb-4">
                {artwork.fields.title}
              </h1>
              
              {artwork.fields.featured && (
                <span className="inline-block bg-watercolor-100 text-watercolor-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  ⭐ Obra Destacada
                </span>
              )}
            </div>

            {/* Specs */}
            <div className="bg-watercolor-50 rounded-xl p-6 space-y-3">
              {artwork.fields.technique && (
                <div className="flex justify-between items-center border-b border-watercolor-200 pb-3">
                  <span className="text-gray-600 font-medium">Técnica:</span>
                  <span className="text-watercolor-900">{artwork.fields.technique}</span>
                </div>
              )}
              
              {artwork.fields.dimensions && (
                <div className="flex justify-between items-center border-b border-watercolor-200 pb-3">
                  <span className="text-gray-600 font-medium">Dimensiones:</span>
                  <span className="text-watercolor-900">{artwork.fields.dimensions}</span>
                </div>
              )}
              
              {artwork.fields.year && (
                <div className="flex justify-between items-center border-b border-watercolor-200 pb-3">
                  <span className="text-gray-600 font-medium">Año:</span>
                  <span className="text-watercolor-900">{artwork.fields.year}</span>
                </div>
              )}

              {artwork.fields.collection && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Colección:</span>
                  <Link 
                    href={`/collections/${artwork.fields.collection.fields.slug}`}
                    className="text-sage-600 hover:text-sage-700 font-medium"
                  >
                    {artwork.fields.collection.fields.name}
                  </Link>
                </div>
              )}
            </div>

            {/* Description */}
            {artwork.fields.description && (
              <div className="prose max-w-none">
                <h2 className="text-2xl font-serif font-bold text-watercolor-900 mb-4">
                  Descripción
                </h2>
                <RichText content={artwork.fields.description} />
              </div>
            )}

            {/* Price and Availability */}
            {artwork.fields.availableForSale && (
              <div className="bg-sage-50 rounded-xl p-6">
                <h3 className="text-xl font-serif font-bold text-sage-900 mb-3">
                  Disponible para compra
                </h3>
                {artwork.fields.price && (
                  <p className="text-3xl font-bold text-sage-700 mb-4">
                    ${artwork.fields.price.toLocaleString()}
                  </p>
                )}
                <p className="text-gray-600 mb-4">
                  ¿Te interesa esta obra? Contáctame para más información sobre disponibilidad, 
                  envío y opciones de pago.
                </p>
                <Link 
                  href={`/contact?artwork=${artwork.fields.slug}`}
                  className="btn-secondary w-full block text-center"
                >
                  Consultar Disponibilidad
                </Link>
              </div>
            )}

            {!artwork.fields.availableForSale && (
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-gray-600 text-center">
                  Esta obra no está disponible para la venta
                </p>
              </div>
            )}

            {/* CTA */}
            <div className="pt-6 border-t border-gray-200">
              <Link 
                href="/gallery"
                className="text-sage-600 hover:text-sage-700 font-medium inline-flex items-center"
              >
                ← Volver a la galería
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
