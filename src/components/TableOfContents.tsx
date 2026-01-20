import { tableOfContents } from '@/data/bookContent';
import { cn } from '@/lib/utils';
import { Book, X } from 'lucide-react';

interface TableOfContentsProps {
  currentPage: number;
  onNavigate: (pageId: number) => void;
  onClose: () => void;
}

export const TableOfContents = ({ currentPage, onNavigate, onClose }: TableOfContentsProps) => {
  return (
    <div className="h-full flex flex-col bg-card">
      <div className="p-4 border-b border-border flex items-center justify-between shrink-0">
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

      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {tableOfContents.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => {
                  onNavigate(item.page);
                  // Only close on mobile (if we are in a mobile context, parent handles this via onClose wrapper, but here we can just call it always as desktop ignores it or we check prop)
                  // For now, simpler to just call onClose, parent logic in Index.tsx decides if it matters.
                  if (window.innerWidth < 768) onClose();
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
    </div>
  );
};
