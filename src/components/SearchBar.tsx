
import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onClose: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Focus the input when the search bar appears
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    // Add escape key listener to close search
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would perform the search here
    console.log('Searching for:', query);
  };
  
  return (
    <div className="glass rounded-2xl p-4 animate-scale-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Search AI Tools</h2>
        <button 
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-secondary/70 transition-colors"
          aria-label="Close search"
        >
          <X size={18} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for AI tools, categories, or capabilities..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background/60 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        
        <div className="mt-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Popular searches</h3>
          <div className="flex flex-wrap gap-2">
            {['AI writing', 'Image generation', 'Chatbots', 'Productivity', 'Research'].map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-3 py-1.5 text-sm bg-secondary/80 hover:bg-secondary rounded-full transition-colors"
                type="button"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
