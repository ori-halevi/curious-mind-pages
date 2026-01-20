import { tableOfContents } from '@/data/bookContent';
import { cn } from '@/lib/utils';
import { Book, X } from 'lucide-react';

interface TableOfContentsProps {
  currentPage: number;
  onNavigate: (pageId: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const TableOfContents = ({ currentPage, onNavigate, isOpen, onClose }: TableOfContentsProps) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 right-0 h-full w-80 bg-card border-l border-border z-50 transform transition-transform duration-300 ease-in-out overflow-hidden",
        isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0 md:relative md:w-72"
      )}>
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Book className="w-5 h-5 accent-text" />
            <h2 className="font-bold text-lg">תוכן העניינים</h2>
          </div>
          <button 
            onClick={onClose}
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="p-4 overflow-y-auto h-[calc(100%-80px)]">
          <ul className="space-y-1">
            {tableOfContents.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    onNavigate(item.page);
                    onClose();
                  }}
                  className={cn(
                    "toc-item w-full text-right",
                    currentPage === item.page && "active"
                  )}
                >
                  <span className="text-sm font-medium">{item.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};
