
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import CategoryFilter from '../components/CategoryFilter';
import ToolGrid from '../components/ToolGrid';
import CompaniesTable from '../components/CompaniesTable';
import Footer from '../components/Footer';
import ScrollAnimation from '../components/ScrollAnimation';
import { FadeIn } from '../components/Animations';

// Generate star elements for the background
const StarField = ({ count = 100 }) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const size = Math.random() * 1.5 + 0.5;
    const opacity = Math.random() * 0.3 + 0.1;
    const animationDelay = Math.random() * 5;
    
    stars.push(
      <div 
        key={i}
        className="star"
        style={{ 
          top: `${top}%`, 
          left: `${left}%`, 
          width: `${size}px`, 
          height: `${size}px`,
          opacity,
          animationDelay: `${animationDelay}s`
        }}
      />
    );
  }
  return (
    <div className="fixed inset-0 pointer-events-none">
      {stars}
    </div>
  );
};

const Index: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const applyGalaxyCardEffect = () => {
    const cards = document.querySelectorAll('.galaxy-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e: any) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        const glowX = (x / rect.width) * 100;
        const glowY = (y / rect.height) * 100;
        (card as HTMLElement).style.background = `
          radial-gradient(circle at ${glowX}% ${glowY}%, rgba(118, 151, 222, 0.1) 0%, transparent 50%),
          linear-gradient(145deg, rgba(26, 31, 44, 0.9) 0%, rgba(5, 5, 7, 0.95) 100%)
        `;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        (card as HTMLElement).style.background = 'linear-gradient(145deg, rgba(26, 31, 44, 0.9) 0%, rgba(5, 5, 7, 0.95) 100%)';
      });
    });
  };
  
  useEffect(() => {
    // Initialize Intersection Observer for animations
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1
    });
    
    document.querySelectorAll('.scroll-animate').forEach(el => {
      observer.observe(el);
    });

    // Apply the galaxy card effect
    applyGalaxyCardEffect();
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-galaxy generate-stars">
      <Navbar />
      <StarField count={150} />
      
      <main className="flex-grow">
        <HeroSection />
        
        <ScrollAnimation>
          <CategoryFilter onCategoryChange={handleCategoryChange} />
        </ScrollAnimation>
        
        <ScrollAnimation>
          <ToolGrid category={activeCategory} searchQuery={searchQuery} />
        </ScrollAnimation>
        
        {/* Companies Table */}
        <ScrollAnimation>
          <CompaniesTable />
        </ScrollAnimation>
        
        {/* About Section */}
        <section id="about" className="py-16 space-station-bg border-y border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="container-custom relative z-10">
            <ScrollAnimation className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-white">About Future AI Directory</h2>
              <p className="text-foreground/70 mb-8">
                Future AI Directory is a carefully curated collection of the best artificial intelligence tools available today. 
                Our mission is to help professionals, creators, and businesses discover and leverage the power of AI to enhance their work and creative processes.
              </p>
              <p className="text-foreground/70">
                We thoroughly review each tool before adding it to our directory, ensuring you get access to only the highest quality AI solutions across multiple categories.
              </p>
            </ScrollAnimation>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-20 container-custom relative overflow-hidden mars-glow-bg">
          <div className="absolute inset-0 opacity-30 animate-subtle-pulse"></div>
          <ScrollAnimation className="max-w-3xl mx-auto text-center relative z-10">
            <h2 className="text-3xl font-bold mb-4 text-white">Stay Updated</h2>
            <p className="text-foreground/70 mb-8">
              Get the latest AI tools and updates delivered directly to your inbox
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto galaxy-card p-1 rounded-lg">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg border border-white/10 bg-black/40 text-white focus:outline-none focus:ring-2 focus:ring-primary/20 backdrop-blur-sm"
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
          </ScrollAnimation>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
