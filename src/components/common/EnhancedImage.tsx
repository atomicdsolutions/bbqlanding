import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface EnhancedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  height?: number;
  width?: number;
  fill?: boolean;
  fallback?: string;
  aspectRatio?: 'square' | 'video' | 'wide' | number;
}

const EnhancedImage: React.FC<EnhancedImageProps> = ({
  src,
  alt,
  className = '',
  priority = false,
  height,
  width,
  fill = false,
  fallback,
  aspectRatio = 'video',
}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [isInView, setIsInView] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        rootMargin: '50px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  // Calculate aspect ratio padding
  const getPaddingTop = () => {
    if (typeof aspectRatio === 'number') {
      return `${(1 / aspectRatio) * 100}%`;
    }
    switch (aspectRatio) {
      case 'square':
        return '100%';
      case 'video':
        return '56.25%'; // 16:9
      case 'wide':
        return '42.86%'; // 21:9
      default:
        return '56.25%';
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: { opacity: 1, scale: 1 },
  };

  const shimmerVariants = {
    hidden: { opacity: 0.1 },
    visible: { 
      opacity: 0.5,
      transition: {
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 1
      }
    },
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-gray-100 ${className}`}
      style={{ paddingTop: fill ? getPaddingTop() : undefined }}
    >
      {/* Loading shimmer effect */}
      {isLoading && (
        <motion.div
          variants={shimmerVariants}
          initial="hidden"
          animate="visible"
          className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100"
        />
      )}
      
      {/* Error state */}
      {error && fallback && (
        <div className={`absolute inset-0 ${fallback} flex items-center justify-center`}>
          <span className="text-white font-medium">{alt}</span>
        </div>
      )}

      {/* Image */}
      <AnimatePresence>
        {(isInView || priority) && !error && (
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={isLoading ? "hidden" : "visible"}
            exit="hidden"
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={src}
              alt={alt}
              fill={fill}
              width={!fill ? width : undefined}
              height={!fill ? height : undefined}
              className="object-cover"
              onLoad={handleLoad}
              onError={handleError}
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={90}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedImage;