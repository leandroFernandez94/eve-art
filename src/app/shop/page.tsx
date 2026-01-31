import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getArtworksForSale } from '@/lib/api';
import { getImageFromAsset } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Tienda - Acuarelas',
  description: 'Obras en acuarela disponibles para compra. Cada pieza es única y viene con certificado de autenticidad.',
};

export const revalidate = 3600;

export default async function ShopPage() {
  const artworks = await getArtworksForSale();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="watercolor-texture py-16">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-serif font-bold text-watercolor-900 mb-4">
            Tienda
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Obras en acuarela disponibles para compra
          </p>
        </div>
      </section>

      {/* Info Banner */}
      <section className="bg-sage-50 py-8">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-sage-600 mb-2">
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Obra Original</h3>
              <p className="text-sm text-gray-600">Cada pieza es única y hecha a mano</p>
            </div>
            <div>
              <div className="text-sage-600 mb-2">
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Certificado</h3>
              <p className="text-sm text-gray-600">Con certificado de autenticidad</p>
            </div>
            <div>
              <div className="text-sage-600 mb-2">
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Envío Seguro</h3>
              <p className="text-sm text-gray-600">Empaquetado profesional</p>
            </div>
          </div>
        </div>
      </section>

      {/* Artworks Grid */}
      <section className="container-custom py-12">
        {artworks.length > 0 ? (
          <>
            <div className="mb-8 text-center">
              <p className="text-gray-600">
                {artworks.length} {artworks.length === 1 ? 'obra disponible' : 'obras disponibles'}
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {artworks.map((artwork) => {
                const mainImage = getImageFromAsset(artwork.fields.mainImage);
                const imageUrl = mainImage.url.startsWith('//') 
                  ? `https:${mainImage.url}` 
                  : mainImage.url;

                return (
                  <div key={artwork.sys.id} className="card overflow-hidden group">
                    <Link href={`/gallery/${artwork.fields.slug}`}>
                      <div className="relative aspect-[3/4] bg-gray-200">
                        <Image
                          src={imageUrl}
                          alt={artwork.fields.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {artwork.fields.price && (
                          <div className="absolute top-4 left-4 bg-sage-600 text-white px-4 py-2 rounded-full font-bold">
                            ${artwork.fields.price.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </Link>
                    
                    <div className="p-6">
                      <Link href={`/gallery/${artwork.fields.slug}`}>
                        <h3 className="text-xl font-serif font-bold text-watercolor-900 mb-2 group-hover:text-watercolor-700 transition-colors">
                          {artwork.fields.title}
                        </h3>
                      </Link>
                      
                      <div className="space-y-1 mb-4 text-sm text-gray-600">
                        {artwork.fields.technique && (
                          <p>{artwork.fields.technique}</p>
                        )}
                        {artwork.fields.dimensions && (
                          <p>{artwork.fields.dimensions}</p>
                        )}
                        {artwork.fields.year && (
                          <p>{artwork.fields.year}</p>
                        )}
                      </div>

                      <div className="flex gap-3">
                        <Link 
                          href={`/gallery/${artwork.fields.slug}`}
                          className="flex-1 text-center bg-watercolor-600 hover:bg-watercolor-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium"
                        >
                          Ver Detalles
                        </Link>
                        <Link 
                          href={`/contact?artwork=${artwork.fields.slug}`}
                          className="flex-1 text-center border-2 border-sage-600 text-sage-700 hover:bg-sage-50 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
                        >
                          Consultar
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-serif text-gray-600 mb-4">
              No hay obras disponibles en este momento
            </h2>
            <p className="text-gray-500 mb-8">
              Todas las obras están actualmente reservadas o vendidas. 
              Vuelve pronto o contáctame para comisiones personalizadas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/gallery" className="btn-primary">
                Ver Galería Completa
              </Link>
              <Link href="/contact" className="btn-outline">
                Consultar Comisiones
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Custom Commissions CTA */}
      <section className="bg-gradient-to-br from-sage-700 to-sage-900 text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-bold mb-6">
              Comisiones Personalizadas
            </h2>
            <p className="text-xl mb-8 text-sage-100">
              ¿Tienes una idea especial en mente? Trabajo en comisiones personalizadas 
              adaptadas a tus necesidades y preferencias.
            </p>
            <Link 
              href="/contact"
              className="bg-white text-sage-800 hover:bg-sage-50 font-medium py-3 px-8 rounded-lg transition-colors duration-200 inline-block"
            >
              Solicitar Comisión
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container-custom py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-watercolor-900 mb-8 text-center">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-bold text-lg text-watercolor-900 mb-2">
                ¿Cómo realizo una compra?
              </h3>
              <p className="text-gray-600">
                Haz clic en "Consultar" en la obra que te interese. Te contactaré para 
                coordinar el pago y envío de manera personalizada.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-bold text-lg text-watercolor-900 mb-2">
                ¿Ofrecen envíos internacionales?
              </h3>
              <p className="text-gray-600">
                Sí, envío a todo el mundo. Los costos de envío varían según el destino 
                y se calculan individualmente para cada compra.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-bold text-lg text-watercolor-900 mb-2">
                ¿Las obras vienen enmarcadas?
              </h3>
              <p className="text-gray-600">
                Las obras se venden sin marco a menos que se especifique lo contrario. 
                Puedo recomendar servicios de enmarcado profesional si lo necesitas.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-bold text-lg text-watercolor-900 mb-2">
                ¿Cuánto tarda una comisión personalizada?
              </h3>
              <p className="text-gray-600">
                El tiempo varía según la complejidad de la obra, generalmente entre 2-6 semanas. 
                Discutiremos los detalles y plazos cuando me contactes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
