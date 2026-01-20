import { useState, useCallback, useEffect } from 'react';
import { bookPages } from '@/data/bookContent';

export const useBookNavigation = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'forward' | 'backward' | null>(null);

  const totalPages = bookPages.length;

  const navigateTo = useCallback((pageIndex: number) => {
    if (pageIndex < 0 || pageIndex >= totalPages || isAnimating) return;
    
    const direction = pageIndex > currentPage ? 'forward' : 'backward';
    setAnimationDirection(direction);
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentPage(pageIndex);
      setIsAnimating(false);
      setAnimationDirection(null);
    }, 300);
  }, [currentPage, totalPages, isAnimating]);

  const goToNext = useCallback(() => {
    navigateTo(currentPage + 1);
  }, [currentPage, navigateTo]);

  const goToPrevious = useCallback(() => {
    navigateTo(currentPage - 1);
  }, [currentPage, navigateTo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToNext();
      } else if (e.key === 'ArrowRight') {
        goToPrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious]);

  // Touch/swipe navigation
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          goToNext();
        } else {
          goToPrevious();
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [goToNext, goToPrevious]);

  return {
    currentPage,
    totalPages,
    currentPageData: bookPages[currentPage],
    isAnimating,
    animationDirection,
    goToNext,
    goToPrevious,
    navigateTo
  };
};
