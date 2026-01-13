import { useState, useEffect } from 'react';

interface ImageCarouselProps {
  images: Array<{ url: string; alt: string }>;
  interval?: number;
}

export function ImageCarousel({ images, interval = 3000 }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative overflow-hidden">
      <div className="flex gap-3 sm:gap-4 lg:gap-6 transition-transform duration-700 ease-in-out" style={{
        transform: `translateX(calc(-${currentIndex * (100 / 3 + 2)}% + 50px))`
      }}>
        {/* Render all images in a continuous loop */}
        {[...images, ...images.slice(0, 3)].map((image, index) => (
          <div
            key={index}
            className="w-full sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-3rem)/3)] h-40 sm:h-44 lg:h-48 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0"
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}