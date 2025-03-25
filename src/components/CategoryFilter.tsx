
import React, { useState } from 'react';

interface Category {
  id: string;
  name: string;
  count: number;
}

const categories: Category[] = [
  { id: 'all', name: 'All Tools', count: 500 },
  { id: 'writing', name: 'Writing & Content', count: 78 },
  { id: 'image', name: 'Image Generation', count: 64 },
  { id: 'video', name: 'Video Creation', count: 52 },
  { id: 'audio', name: 'Audio & Voice', count: 45 },
  { id: 'chatbots', name: 'Chatbots', count: 39 },
  { id: 'productivity', name: 'Productivity', count: 67 },
  { id: 'research', name: 'Research', count: 43 },
  { id: 'coding', name: 'Coding & Development', count: 58 },
  { id: 'business', name: 'Business', count: 49 },
  { id: 'education', name: 'Education', count: 37 },
  { id: 'design', name: 'Design', count: 31 },
];

interface CategoryFilterProps {
  onCategoryChange: (categoryId: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ onCategoryChange }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAllCategories, setShowAllCategories] = useState(false);
  
  const visibleCategories = showAllCategories ? categories : categories.slice(0, 6);
  
  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    onCategoryChange(categoryId);
  };
  
  return (
    <section id="categories" className="py-16 container-custom">
      <div className="mb-10 text-center animate-fade-in">
        <h2 className="text-3xl font-bold mb-4 text-metallic-silver space-subheader">Explore Categories</h2>
        <p className="text-foreground/70 max-w-2xl mx-auto">
          Discover AI tools organized by category to find exactly what you need
        </p>
      </div>
      
      <div className="flex overflow-x-auto scrollbar-hide pb-4 md:flex-wrap md:justify-center space-x-3 md:space-y-3">
        {visibleCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === category.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-secondary text-foreground/70 hover:bg-secondary/80'
            }`}
          >
            {category.name} <span className="opacity-70 text-xs">({category.count})</span>
          </button>
        ))}
        
        {categories.length > 6 && (
          <button
            onClick={() => setShowAllCategories(!showAllCategories)}
            className="whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium bg-secondary/50 text-foreground/70 hover:bg-secondary/80 transition-all"
          >
            {showAllCategories ? 'Show Less' : 'Show All Categories'}
          </button>
        )}
      </div>
    </section>
  );
};

export default CategoryFilter;
