
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import CategoryFilter from '../components/CategoryFilter';
import ToolGrid from '../components/ToolGrid';
import Footer from '../components/Footer';

const Index: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <CategoryFilter onCategoryChange={handleCategoryChange} />
        <ToolGrid category={activeCategory} searchQuery={searchQuery} />
        
        {/* About Section */}
        <section id="about" className="py-16 bg-secondary/50">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">About Future AI Directory</h2>
              <p className="text-foreground/70 mb-8">
                Future AI Directory is a carefully curated collection of the best artificial intelligence tools available today. 
                Our mission is to help professionals, creators, and businesses discover and leverage the power of AI to enhance their work and creative processes.
              </p>
              <p className="text-foreground/70">
                We thoroughly review each tool before adding it to our directory, ensuring you get access to only the highest quality AI solutions across multiple categories.
              </p>
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-20 container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-foreground/70 mb-8">
              Get the latest AI tools and updates delivered directly to your inbox
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
              <button
                type="submit"
                className="btn-primary whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            
            <p className="text-xs text-foreground/50 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
