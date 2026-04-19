'use client';

import { useEffect, useState } from 'react';
import { Portal } from './portal';
import { LightboxControls } from './lightbox-controls';
import { LightboxMedia } from './lightbox-media';

interface ImageLightboxProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Image Lightbox component with navigation
 * Supports images and videos, keyboard navigation, and click-to-close
 */
export function ImageLightbox({ images, initialIndex, isOpen, onClose }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, currentIndex]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  if (!isOpen) return null;

  return (
    <Portal>
      <div 
        className="fixed inset-0 flex items-center justify-center bg-black/95"
        style={{ zIndex: 9999 }}
        onClick={onClose}
      >
        <LightboxControls
          onClose={onClose}
          onPrevious={handlePrevious}
          onNext={handleNext}
          currentIndex={currentIndex}
          total={images.length}
        />
        
        <LightboxMedia
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
        />
      </div>
    </Portal>
  );
}
