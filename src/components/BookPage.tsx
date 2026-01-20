import { BookPage as BookPageType } from '@/data/bookContent';
import { cn } from '@/lib/utils';

interface BookPageProps {
  page: BookPageType;
  isAnimating: boolean;
  animationDirection: 'forward' | 'backward' | null;
}

export const BookPage = ({ page, isAnimating, animationDirection }: BookPageProps) => {
  const getAnimationClass = () => {
    if (!isAnimating) return 'page-enter';
    if (animationDirection === 'forward') return 'page-exit-forward';
    if (animationDirection === 'backward') return 'page-exit-backward';
    return '';
  };

  if (page.type === 'cover') {
    return (
      <div className={cn("book-page min-h-[600px] md:min-h-[700px] rounded-lg relative", getAnimationClass())}>
        <div className="page-content flex flex-col items-center justify-center h-full text-center py-16">
          <div className="mb-8">
            <span className="text-6xl">📚</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight accent-text">
            {page.title}
          </h1>
          {page.subtitle && (
            <p className="text-lg md:text-xl text-muted-foreground whitespace-pre-line mb-8">
              {page.subtitle}
            </p>
          )}
          <div className="mt-8 space-y-2 text-sm text-muted-foreground">
            {page.content.map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <p className="text-sm text-muted-foreground">📖 גלול לדפדוף</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("book-page min-h-[600px] md:min-h-[700px] rounded-lg relative", getAnimationClass())}>
      <div className="page-content">
        {page.subtitle && (
          <p className="text-sm text-muted-foreground mb-2 font-medium">
            {page.subtitle}
          </p>
        )}
        
        {page.title && (
          <h2 className="chapter-title">{page.title}</h2>
        )}
        
        <div className="space-y-4">
          {page.content.map((paragraph, idx) => {
            // Check if it's a quote (starts with ")
            const isQuote = paragraph.startsWith('"') || paragraph.startsWith('״');
            const isAttribution = paragraph.startsWith('—') || paragraph.startsWith('-');
            
            if (isQuote) {
              return (
                <blockquote key={idx} className="quote-block">
                  <p className="book-text italic">{paragraph}</p>
                </blockquote>
              );
            }
            
            if (isAttribution) {
              return (
                <p key={idx} className="text-right text-muted-foreground font-medium">
                  {paragraph}
                </p>
              );
            }
            
            return (
              <p key={idx} className="book-text">
                {paragraph}
              </p>
            );
          })}
        </div>
        
        {page.footnotes && page.footnotes.length > 0 && (
          <div className="footnote">
            {page.footnotes.map((note, idx) => (
              <p key={idx} className="text-sm mb-1">
                <span className="gold-text">*</span> {note}
              </p>
            ))}
          </div>
        )}
      </div>
      
      {page.pageNumber && (
        <span className="page-number left-1/2 -translate-x-1/2">
          {page.pageNumber}
        </span>
      )}
    </div>
  );
};
