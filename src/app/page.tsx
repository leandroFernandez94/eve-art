import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedArtworks, getRecentBlogPosts } from '@/lib/api';
import MasonryGrid from '@/components/Gallery/MasonryGrid';
import { getImageFromAsset } from '@/lib/types';

export const revalidate = 3600; // Revalidar cada hora

export default async function HomePage() {
  const featuredArtworks = await getFeaturedArtworks(6);
  const recentPosts = await getRecentBlogPosts(3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center watercolor-texture overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-watercolor-100/50 to-watercolor-200/30"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-watercolor-900 mb-6 animate-fade-in">
            Arte en Acuarela
          </h1>
          <p className="text-xl sm:text-2xl text-watercolor-700 mb-8 animate-slide-up">
            Expresiones únicas de color y emoción
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link href="/gallery" className="btn-primary">
              Ver Galería
            </Link>
            <Link href="/shop" className="btn-outline">
              Explorar Tienda
            </Link>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-watercolor-50 to-transparent"></div>
      </section>

      {/* Featured Artworks Section */}
      <section className="container-custom py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-watercolor-900 mb-4">
            Obras Destacadas
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Una selección de mis trabajos más recientes y queridos
          </p>
        </div>

        {featuredArtworks.length > 0 ? (
          <>
            <MasonryGrid artworks={featuredArtworks} />
            <div className="text-center mt-12">
              <Link href="/gallery" className="btn-primary">
                Ver Todas las Obras
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Próximamente nuevas obras...
            </p>
          </div>
        )}
      </section>

      {/* About Preview Section */}
      <section className="bg-gradient-to-b from-white to-watercolor-50 py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-serif font-bold text-watercolor-900">
                Sobre Mi Arte
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                La acuarela es un medio que me permite capturar la esencia efímera 
                de los momentos, donde el agua y el pigmento se encuentran en una 
                danza única cada vez.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Cada pincelada es una exploración de color, luz y textura, 
                creando obras que invitan a la contemplación y despiertan emociones.
              </p>
              <Link href="/about" className="btn-secondary inline-block">
                Conocer Más
              </Link>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-watercolor-200 to-sage-200"></div>
              {/* Placeholder - será reemplazado con imagen real de Contentful */}
              <div className="absolute inset-0 flex items-center justify-center text-watercolor-600">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Blog Posts Section */}
      {recentPosts.length > 0 && (
        <section className="container-custom py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-watercolor-900 mb-4">
              Últimas Publicaciones
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Pensamientos, proceso creativo y novedades
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {recentPosts.map((post) => {
              const image = getImageFromAsset(post.fields.featuredImage);
              const imageUrl = image.url.startsWith('//') ? `https:${image.url}` : image.url;
              
              return (
                <Link 
                  key={post.sys.id} 
                  href={`/blog/${post.fields.slug}`}
                  className="card overflow-hidden group"
                >
                  <div className="relative h-48 bg-gray-200">
                    <Image
                      src={imageUrl}
                      alt={post.fields.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold text-watercolor-900 mb-2 group-hover:text-watercolor-700 transition-colors">
                      {post.fields.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-3">
                      {post.fields.excerpt}
                    </p>
                    <p className="text-sm text-sage-600 mt-4 font-medium">
                      Leer más →
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/blog" className="btn-outline">
              Ver Todos los Posts
            </Link>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-watercolor-700 to-watercolor-900 text-white py-16">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">
            ¿Te Interesa Una Obra?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-watercolor-100">
            Explora las obras disponibles o contáctame para comisiones personalizadas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="bg-white text-watercolor-800 hover:bg-watercolor-50 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
              Ver Tienda
            </Link>
            <Link href="/contact" className="border-2 border-white text-white hover:bg-white/10 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
              Contacto
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
