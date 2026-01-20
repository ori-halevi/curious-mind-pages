import { ChevronRight, ChevronLeft, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookNavigationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  onToggleTOC: () => void;
}

export const BookNavigation = ({ 
  currentPage, 
  totalPages, 
  onPrevious, 
  onNext,
  onToggleTOC 
}: BookNavigationProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border p-4 z-30">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <button
          onClick={onPrevious}
          disabled={currentPage === 0}
          className={cn("nav-button", currentPage === 0 && "opacity-40")}
          aria-label="דף קודם"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleTOC}
            className="nav-button md:hidden"
            aria-label="תוכן העניינים"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {currentPage + 1} / {totalPages}
            </span>
            <div className="w-32 h-1.5 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300 rounded-full"
                style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
              />
            </div>
          </div>
        </div>
        
        <button
          onClick={onNext}
          disabled={currentPage === totalPages - 1}
          className={cn("nav-button", currentPage === totalPages - 1 && "opacity-40")}
          aria-label="דף הבא"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
