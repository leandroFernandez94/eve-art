import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAboutPage } from '@/lib/api';
import { getImageFromAsset } from '@/lib/types';
import RichText from '@/components/ui/RichText';

export const metadata: Metadata = {
  title: 'Sobre Mí - Acuarelas',
  description: 'Conoce más sobre la artista y su proceso creativo con acuarelas',
};

export const revalidate = 3600;

export default async function AboutPage() {
  const aboutData = await getAboutPage();

  if (!aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold text-gray-800 mb-4">
            Contenido en construcción
          </h1>
          <p className="text-gray-600 mb-6">
            Esta página está siendo preparada con mucho cariño
          </p>
          <Link href="/" className="btn-primary">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const profilePhoto = aboutData.fields.profilePhoto 
    ? getImageFromAsset(aboutData.fields.profilePhoto)
    : null;
  const profilePhotoUrl = profilePhoto?.url.startsWith('//') 
    ? `https:${profilePhoto.url}` 
    : profilePhoto?.url;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="watercolor-texture py-16">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-serif font-bold text-watercolor-900 mb-4">
            Sobre Mí
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Mi viaje en el mundo de la acuarela
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container-custom py-12">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Profile Image - Sidebar */}
          {profilePhotoUrl && (
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src={profilePhotoUrl}
                    alt="Foto de perfil"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                
                {/* Contact Card */}
                <div className="card p-6 mt-6">
                  <h3 className="font-serif text-xl font-bold text-watercolor-900 mb-4">
                    ¿Hablamos?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Si te interesa mi trabajo o quieres encargar una obra personalizada
                  </p>
                  <Link href="/contact" className="btn-primary w-full block text-center">
                    Contactar
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Content - Main */}
          <div className={profilePhotoUrl ? "lg:col-span-3" : "lg:col-span-5"}>
            <div className="space-y-12">
              {/* Biography */}
              {aboutData.fields.biography && (
                <div>
                  <h2 className="text-3xl font-serif font-bold text-watercolor-900 mb-6">
                    Biografía
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <RichText content={aboutData.fields.biography} />
                  </div>
                </div>
              )}

              {/* Creative Process */}
              {aboutData.fields.creativeProcess && (
                <div className="bg-sage-50 rounded-xl p-8">
                  <h2 className="text-3xl font-serif font-bold text-watercolor-900 mb-6">
                    Proceso Creativo
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <RichText content={aboutData.fields.creativeProcess} />
                  </div>
                </div>
              )}

              {/* Exhibitions */}
              {aboutData.fields.exhibitions && (
                <div>
                  <h2 className="text-3xl font-serif font-bold text-watercolor-900 mb-6">
                    Exposiciones y Logros
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <RichText content={aboutData.fields.exhibitions} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-watercolor-700 to-watercolor-900 text-white py-16 mt-12">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">
            Explora Mi Trabajo
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-watercolor-100">
            Descubre la colección completa de obras en acuarela
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/gallery" className="bg-white text-watercolor-800 hover:bg-watercolor-50 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
              Ver Galería
            </Link>
            <Link href="/collections" className="border-2 border-white text-white hover:bg-white/10 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
              Ver Colecciones
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
