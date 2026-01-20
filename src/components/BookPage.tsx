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
      <div className={cn(
        "book-page flex flex-col justify-center min-h-[calc(100vh-140px)] rounded-lg relative overflow-hidden shadow-md",
        getAnimationClass()
      )}>
        <div className="page-content flex flex-col items-center justify-center flex-grow text-center py-8 px-4 md:py-16 md:px-12 max-w-2xl mx-auto w-full">
          <div className="mb-6 md:mb-8 animate-in fade-in zoom-in duration-700">
            <span className="text-6xl md:text-8xl filter drop-shadow-lg">📚</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight accent-text tracking-tight">
            {page.title}
          </h1>
          {page.subtitle && (
            <p className="text-lg md:text-xl text-muted-foreground whitespace-pre-line mb-8 max-w-lg leading-relaxed">
              {page.subtitle}
            </p>
          )}
          <div className="mt-4 space-y-3 text-sm md:text-base text-muted-foreground/80 max-w-prose">
            {page.content.map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
          <div className="mt-8 md:absolute md:bottom-8 md:left-0 md:right-0 text-center animate-pulse">
            <p className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-widest">📖 גלול לדפדוף</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "book-page min-h-[calc(100vh-140px)] rounded-lg relative shadow-md flex flex-col",
      getAnimationClass()
    )}>
      <div className="page-content flex-grow p-6 md:p-12 max-w-3xl mx-auto w-full">
        {page.subtitle && (
          <p className="text-sm text-muted-foreground mb-3 font-medium tracking-wide uppercase">
            {page.subtitle}
          </p>
        )}

        {page.title && (
          <h2 className="chapter-title border-b border-border/50 pb-4 mb-8 inline-block">{page.title}</h2>
        )}

        <div className="space-y-6">
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
                <p key={idx} className="text-left pl-4 text-muted-foreground font-medium italic -mt-4">
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
          <div className="footnote mt-12 bg-muted/30 p-4 rounded-lg">
            {page.footnotes.map((note, idx) => (
              <p key={idx} className="text-sm mb-1 text-muted-foreground">
                <span className="gold-text font-bold text-base mr-1">*</span> {note}
              </p>
            ))}
          </div>
        )}
      </div>

      {page.pageNumber && (
        <div className="py-4 text-center border-t border-border/30 mt-auto bg-card/30">
          <span className="text-sm font-mono text-muted-foreground">
            - {page.pageNumber} -
          </span>
        </div>
      )}
    </div>
  );
};
