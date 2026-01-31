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
      className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300"
    >
      <Link href={`/gallery/${artwork.fields.slug}`} onClick={onClick}>
        <div className="relative aspect-[3/4] bg-gray-100">
          <img
            src={imageUrl}
            alt={artwork.fields.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="font-serif text-xl font-bold mb-1">
                {artwork.fields.title}
              </h3>
              {artwork.fields.technique && (
                <p className="text-sm text-gray-200">
                  {artwork.fields.technique}
                </p>
              )}
              {artwork.fields.year && (
                <p className="text-sm text-gray-300 mt-1">
                  {artwork.fields.year}
                </p>
              )}
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
      </Link>
    </motion.div>
  );
}
