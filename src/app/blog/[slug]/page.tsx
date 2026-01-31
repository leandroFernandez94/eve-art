import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/api';
import { getImageFromAsset } from '@/lib/types';
import RichText from '@/components/ui/RichText';

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.fields.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post no encontrado',
    };
  }

  const featuredImage = getImageFromAsset(post.fields.featuredImage);
  const imageUrl = featuredImage.url.startsWith('//') ? `https:${featuredImage.url}` : featuredImage.url;

  return {
    title: `${post.fields.title} - Blog - Acuarelas`,
    description: post.fields.excerpt,
    openGraph: {
      title: post.fields.title,
      description: post.fields.excerpt,
      images: [imageUrl],
      type: 'article',
      publishedTime: post.fields.publishDate,
    },
  };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const featuredImage = getImageFromAsset(post.fields.featuredImage);
  const imageUrl = featuredImage.url.startsWith('//') ? `https:${featuredImage.url}` : featuredImage.url;

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="container-custom py-6">
        <nav className="flex text-sm text-gray-600">
          <Link href="/" className="hover:text-watercolor-700">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-watercolor-700">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-watercolor-800 line-clamp-1">{post.fields.title}</span>
        </nav>
      </div>

      {/* Article */}
      <article className="container-custom py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <time className="text-sage-600 font-medium">
              {formatDate(post.fields.publishDate)}
            </time>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-watercolor-900 mt-2 mb-6">
              {post.fields.title}
            </h1>
            {post.fields.excerpt && (
              <p className="text-xl text-gray-600 leading-relaxed">
                {post.fields.excerpt}
              </p>
            )}
          </header>

          {/* Featured Image */}
          <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden mb-12 shadow-2xl">
            <Image
              src={imageUrl}
              alt={post.fields.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <RichText content={post.fields.content} />
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <Link 
              href="/blog"
              className="text-sage-600 hover:text-sage-700 font-medium inline-flex items-center"
            >
              ← Volver al blog
            </Link>
          </footer>
        </div>
      </article>

      {/* CTA Section */}
      <section className="bg-watercolor-50 py-12 mt-12">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-serif font-bold text-watercolor-900 mb-4">
            ¿Te gustó este artículo?
          </h2>
          <p className="text-gray-700 mb-6">
            Explora mi galería o contáctame para más información
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/gallery" className="btn-primary">
              Ver Galería
            </Link>
            <Link href="/contact" className="btn-outline">
              Contactar
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
