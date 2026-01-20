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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-b border-border z-30 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-lg font-bold accent-text hidden md:block">
            הספר המאויר של טיעונים גרועים
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>🎯 לחצו על החצים או השתמשו במקלדת</span>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <div className="flex pt-16 pb-24">
        {/* Table of Contents - Desktop */}
        <div className="hidden md:block">
          <TableOfContents
            currentPage={currentPage}
            onNavigate={navigateTo}
            isOpen={true}
            onClose={() => {}}
          />
        </div>

        {/* Mobile TOC */}
        <TableOfContents
          currentPage={currentPage}
          onNavigate={navigateTo}
          isOpen={isTOCOpen}
          onClose={() => setIsTOCOpen(false)}
        />

        {/* Book content */}
        <main className="flex-1 px-4 py-6 overflow-hidden">
          <div className="book-container">
            <BookPage 
              page={currentPageData}
              isAnimating={isAnimating}
              animationDirection={animationDirection}
            />
          </div>
        </main>
      </div>

      {/* Navigation */}
      <BookNavigation
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={goToPrevious}
        onNext={goToNext}
        onToggleTOC={() => setIsTOCOpen(true)}
      />
    </div>
  );
};

export default Index;
