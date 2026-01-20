import { useState } from 'react';
import { BookPage } from '@/components/BookPage';
import { BookNavigation } from '@/components/BookNavigation';
import { TableOfContents } from '@/components/TableOfContents';
import { useBookNavigation } from '@/hooks/useBookNavigation';

const Index = () => {
  const [isTOCOpen, setIsTOCOpen] = useState(false);
  const {
    currentPage,
    totalPages,
    currentPageData,
    isAnimating,
    animationDirection,
    goToNext,
    goToPrevious,
    navigateTo
  } = useBookNavigation();

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-b border-border z-30 px-4 h-14 flex items-center justify-between shadow-sm">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-lg font-bold accent-text hidden md:block">
            הספר המאויר של טיעונים גרועים
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mr-auto md:mr-0">
            <span>🎯 לחצו על החצים או השתמשו במקלדת</span>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 pt-14 pb-16 max-w-7xl mx-auto w-full">
        {/* Table of Contents - Desktop (Sidebar) & Mobile (Drawer) logic handled via CSS/Props */}
        <div className={`
          fixed inset-y-0 right-0 z-40 w-72 bg-card border-l border-border transform transition-transform duration-300 ease-in-out pt-14
          md:sticky md:top-14 md:h-[calc(100vh-3.5rem)] md:translate-x-0 md:block md:pt-0
          ${isTOCOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          <TableOfContents
            currentPage={currentPage}
            onNavigate={navigateTo}
            onClose={() => setIsTOCOpen(false)}
          />
        </div>

        {/* Backdrop for Mobile TOC */}
        {isTOCOpen && (
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setIsTOCOpen(false)}
          />
        )}

        {/* Book content */}
        <main className="flex-1 px-4 py-6 md:p-8 overflow-y-auto">
          <div className="book-container w-full max-w-3xl mx-auto">
            <BookPage
              page={currentPageData}
              isAnimating={isAnimating}
              animationDirection={animationDirection}
            />
          </div>
        </main>
      </div>

      {/* Navigation Footer */}
      <BookNavigation
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={goToPrevious}
        onNext={goToNext}
        onToggleTOC={() => setIsTOCOpen(!isTOCOpen)}
      />
    </div>
  );
};

export default Index;
