'use client';

import Masonry from 'react-masonry-css';
import { Artwork } from '@/lib/types';
import ImageCard from './ImageCard';

interface MasonryGridProps {
  artworks: Artwork[];
}

const breakpointColumns = {
  default: 3,
  1024: 2,
  640: 1,
};

export default function MasonryGrid({ artworks }: MasonryGridProps) {
  if (!artworks || artworks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No hay obras para mostrar.</p>
      </div>
    );
  }

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex -ml-6 w-auto"
      columnClassName="pl-6 bg-clip-padding"
    >
      {artworks.map((artwork) => (
        <div key={artwork.sys.id} className="mb-6">
          <ImageCard artwork={artwork} />
        </div>
      ))}
    </Masonry>
  );
}
