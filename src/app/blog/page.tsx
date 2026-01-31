import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllBlogPosts } from '@/lib/api';
import { getImageFromAsset } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Blog - Acuarelas',
  description: 'Reflexiones, proceso creativo y noticias sobre arte en acuarela',
};

export const revalidate = 3600;

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="watercolor-texture py-16">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-serif font-bold text-watercolor-900 mb-4">
            Blog
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Pensamientos, proceso creativo y el viaje detrás de cada obra
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="container-custom py-12">
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => {
              const featuredImage = getImageFromAsset(post.fields.featuredImage);
              const imageUrl = featuredImage.url.startsWith('//') 
                ? `https:${featuredImage.url}` 
                : featuredImage.url;

              return (
                <article key={post.sys.id} className="card overflow-hidden group">
                  <Link href={`/blog/${post.fields.slug}`}>
                    <div className="relative h-56 bg-gray-200">
                      <Image
                        src={imageUrl}
                        alt={post.fields.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <time className="text-sm text-sage-600 font-medium">
                        {formatDate(post.fields.publishDate)}
                      </time>
                      <h2 className="text-2xl font-serif font-bold text-watercolor-900 mt-2 mb-3 group-hover:text-watercolor-700 transition-colors">
                        {post.fields.title}
                      </h2>
                      <p className="text-gray-600 line-clamp-3 mb-4">
                        {post.fields.excerpt}
                      </p>
                      <span className="text-sage-600 font-medium inline-flex items-center">
                        Leer más
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-serif text-gray-600 mb-4">
              No hay publicaciones aún
            </h2>
            <p className="text-gray-500">
              Vuelve pronto para leer sobre mi proceso creativo
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
