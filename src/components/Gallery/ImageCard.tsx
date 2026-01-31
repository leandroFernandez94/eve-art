'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Artwork } from '@/lib/types';
import { getImageFromAsset } from '@/lib/types';

interface ImageCardProps {
  artwork: Artwork;
  onClick?: () => void;
}

export default function ImageCard({ artwork, onClick }: ImageCardProps) {
  // Verificar que mainImage existe
  if (!artwork.fields.mainImage) {
    console.error('Artwork sin imagen:', artwork.fields.title);
    return null;
  }

  const image = getImageFromAsset(artwork.fields.mainImage);
  
  // Si no hay URL, no renderizar
  if (!image.url) {
    console.error('No se pudo obtener URL de imagen para:', artwork.fields.title);
    return null;
  }

  const imageUrl = image.url.startsWith('//') ? `https:${image.url}` : image.url;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      <Link href={`/gallery/${artwork.fields.slug}`} onClick={onClick}>
        <div className="relative aspect-[3/4] bg-gray-100">
          <img
            src={imageUrl}
            alt={artwork.fields.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Desktop Hover Overlay */}
          <div className="hidden md:block absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-x-0 bottom-0 p-5 text-center text-gray-900">
              <h3 className="font-serif text-xl font-semibold tracking-wide uppercase">
                {artwork.fields.title}
              </h3>
              {artwork.fields.technique && (
                <p className="text-sm text-gray-700 mt-2">
                  {artwork.fields.technique}
                </p>
              )}
              {artwork.fields.dimensions && (
                <p className="text-sm text-gray-700 mt-1">
                  {artwork.fields.dimensions}
                </p>
              )}
              {artwork.fields.price && (
                <p className="text-base text-gray-900 mt-3">
                  ${artwork.fields.price.toLocaleString()}
                </p>
              )}
              <p className="text-sm text-gray-600 mt-1">
                {artwork.fields.availableForSale ? 'Disponible' : 'No disponible'}
              </p>
            </div>
          </div>

          {/* Featured Badge */}
          {artwork.fields.featured && (
            <div className="absolute top-4 right-4 bg-watercolor-600 text-white px-3 py-1 rounded-full text-xs font-medium">
              Destacada
            </div>
          )}

          {/* Available Badge */}
          {artwork.fields.availableForSale && artwork.fields.price && (
            <div className="absolute top-4 left-4 bg-sage-600 text-white px-3 py-1 rounded-full text-xs font-medium">
              ${artwork.fields.price}
            </div>
          )}
        </div>

        {/* Mobile Details */}
        <div className="md:hidden px-5 py-6 text-center">
          <h3 className="font-serif text-xl font-semibold tracking-wide uppercase text-watercolor-800">
            {artwork.fields.title}
          </h3>
          {artwork.fields.technique && (
            <p className="text-sm text-gray-700 mt-2">
              {artwork.fields.technique}
            </p>
          )}
          {artwork.fields.dimensions && (
            <p className="text-sm text-gray-700 mt-1">
              {artwork.fields.dimensions}
            </p>
          )}
          {artwork.fields.price && (
            <p className="text-base text-gray-900 mt-3">
              ${artwork.fields.price.toLocaleString()}
            </p>
          )}
          <p className="text-sm text-gray-600 mt-1">
            {artwork.fields.availableForSale ? 'Disponible' : 'No disponible'}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
