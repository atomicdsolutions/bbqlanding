import { useState, useEffect } from 'react';

interface ImageStatus {
  loaded: boolean;
  error: boolean;
  blur: boolean;
}

interface UseImageLoadOptions {
  threshold?: number;
  rootMargin?: string;
  blur?: boolean;
  blurDuration?: number;
}

export const useImageLoad = (
  src: string,
  options: UseImageLoadOptions = {}
): ImageStatus => {
  const {
    threshold = 0,
    rootMargin = '50px',
    blur = true,
    blurDuration = 500
  } = options;

  const [status, setStatus] = useState<ImageStatus>({
    loaded: false,
    error: false,
    blur: blur
  });

  useEffect(() => {
    if (!src) return;

    let isMounted = true;
    let observer: IntersectionObserver | null = null;
    let img: HTMLImageElement | null = null;

    const loadImage = () => {
      img = new Image();
      
      img.onload = () => {
        if (!isMounted) return;
        
        setStatus(prev => ({ ...prev, loaded: true }));
        
        if (blur) {
          setTimeout(() => {
            if (isMounted) {
              setStatus(prev => ({ ...prev, blur: false }));
            }
          }, blurDuration);
        }
      };

      img.onerror = () => {
        if (!isMounted) return;
        setStatus(prev => ({ ...prev, error: true, loaded: false }));
      };

      img.src = src;
    };

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              loadImage();
              observer?.disconnect();
            }
          });
        },
        { threshold, rootMargin }
      );

      const element = document.createElement('div');
      observer.observe(element);
    } else {
      loadImage();
    }

    return () => {
      isMounted = false;
      observer?.disconnect();
      if (img) {
        img.onload = null;
        img.onerror = null;
      }
    };
  }, [src, threshold, rootMargin, blur, blurDuration]);

  return status;
};

interface ImagePreloadOptions {
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
  sequential?: boolean;
}

export const useImagePreload = (
  images: string[],
  options: ImagePreloadOptions = {}
) => {
  const { onProgress, onComplete, sequential = false } = options;
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!images.length) {
      setProgress(100);
      setCompleted(true);
      onComplete?.();
      return;
    }

    let loadedCount = 0;
    const totalImages = images.length;
    let isMounted = true;

    const updateProgress = () => {
      loadedCount++;
      const newProgress = Math.round((loadedCount / totalImages) * 100);
      
      if (!isMounted) return;
      
      setProgress(newProgress);
      onProgress?.(newProgress);

      if (loadedCount === totalImages) {
        setCompleted(true);
        onComplete?.();
      }
    };

    const loadImage = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        
        img.onload = () => {
          updateProgress();
          resolve();
        };
        
        img.onerror = () => {
          updateProgress();
          reject();
        };

        img.src = src;
      });
    };

    if (sequential) {
      // Load images one after another
      const loadSequentially = async () => {
        for (const src of images) {
          if (!isMounted) break;
          await loadImage(src).catch(() => {});
        }
      };

      loadSequentially();
    } else {
      // Load all images in parallel
      images.forEach(src => {
        loadImage(src).catch(() => {});
      });
    }

    return () => {
      isMounted = false;
    };
  }, [images, onProgress, onComplete, sequential]);

  return { progress, completed };
};

interface BackgroundImageOptions {
  blur?: boolean;
  blurAmount?: string;
  blurDuration?: number;
  fallbackColor?: string;
}

export const useBackgroundImage = (
  src: string,
  options: BackgroundImageOptions = {}
) => {
  const {
    blur = true,
    blurAmount = '10px',
    blurDuration = 500,
    fallbackColor = '#000000'
  } = options;

  const [style, setStyle] = useState({
    backgroundImage: `url(${src})`,
    backgroundColor: fallbackColor,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: blur ? `blur(${blurAmount})` : 'none',
    transition: `filter ${blurDuration}ms ease-out`
  });

  const imageStatus = useImageLoad(src, { blur: false });

  useEffect(() => {
    if (imageStatus.loaded) {
      setStyle(prev => ({
        ...prev,
        filter: 'none'
      }));
    }
  }, [imageStatus.loaded]);

  return style;
};