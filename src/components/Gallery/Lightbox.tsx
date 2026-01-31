'use client';

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { ContentfulImage } from '@/lib/types';

interface LightboxGalleryProps {
  images: ContentfulImage[];
  currentIndex?: number;
  onClose?: () => void;
}

export default function LightboxGallery({ 
  images, 
  currentIndex = 0,
  onClose 
}: LightboxGalleryProps) {
  const [open, setOpen] = useState(currentIndex >= 0);

  const slides = images.map((image) => ({
    src: image.url.startsWith('//') ? `https:${image.url}` : image.url,
    alt: image.title,
    width: image.width,
    height: image.height,
  }));

  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <Lightbox
      open={open}
      close={handleClose}
      slides={slides}
      index={currentIndex}
      styles={{
        container: { backgroundColor: 'rgba(0, 0, 0, 0.9)' },
      }}
    />
  );
}
