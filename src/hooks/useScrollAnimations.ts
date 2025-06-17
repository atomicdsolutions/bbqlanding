import { useState, useEffect } from 'react';

interface ScrollInfo {
  scrollY: number;
  direction: 'up' | 'down' | null;
  isAtTop: boolean;
  isAtBottom: boolean;
}

export const useScrollInfo = (): ScrollInfo => {
  const [scrollInfo, setScrollInfo] = useState<ScrollInfo>({
    scrollY: 0,
    direction: null,
    isAtTop: true,
    isAtBottom: false
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollInfo = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      const isAtTop = scrollY === 0;
      const isAtBottom = 
        window.innerHeight + scrollY >= document.documentElement.scrollHeight;

      setScrollInfo({
        scrollY,
        direction,
        isAtTop,
        isAtBottom
      });

      lastScrollY = scrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollInfo();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return scrollInfo;
};

interface ScrollProgressOptions {
  offset?: number;
  threshold?: number;
}

export const useScrollProgress = (
  elementRef: React.RefObject<HTMLElement>,
  options: ScrollProgressOptions = {}
): number => {
  const [progress, setProgress] = useState(0);
  const { offset = 0, threshold = 0 } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const updateProgress = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate when element enters viewport considering offset
      const entryPoint = windowHeight - offset;
      
      // Calculate total distance element needs to travel
      const totalDistance = windowHeight + element.offsetHeight;
      
      // Calculate current position relative to entry point
      const currentPosition = entryPoint - rect.top;
      
      // Calculate progress as percentage
      let progress = (currentPosition / totalDistance) * 100;
      
      // Clamp progress between 0 and 100
      progress = Math.max(0, Math.min(100, progress));
      
      // Apply threshold
      if (progress < threshold) progress = 0;
      if (progress > 100 - threshold) progress = 100;
      
      setProgress(progress);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    
    // Initial calculation
    updateProgress();

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [elementRef, offset, threshold]);

  return progress;
};

interface InViewOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useInView = (
  elementRef: React.RefObject<HTMLElement>,
  options: InViewOptions = {}
): boolean => {
  const [isInView, setIsInView] = useState(false);
  const { threshold = 0, rootMargin = "0px" } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [elementRef, threshold, rootMargin]);

  return isInView;
};

interface ParallaxOptions {
  speed?: number;
  reverse?: boolean;
}

export const useParallax = (
  elementRef: React.RefObject<HTMLElement>,
  options: ParallaxOptions = {}
): { transform: string } => {
  const [transform, setTransform] = useState('translate3d(0, 0, 0)');
  const { speed = 0.5, reverse = false } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const updateTransform = () => {
      const rect = element.getBoundingClientRect();
      const scrollPercent = rect.top / window.innerHeight;
      const movement = scrollPercent * speed * 100;
      const value = reverse ? -movement : movement;
      
      setTransform(`translate3d(0, ${value}px, 0)`);
    };

    window.addEventListener('scroll', updateTransform, { passive: true });
    updateTransform();

    return () => window.removeEventListener('scroll', updateTransform);
  }, [elementRef, speed, reverse]);

  return { transform };
};