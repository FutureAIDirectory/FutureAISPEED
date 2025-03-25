
import React, { useState, useEffect, useRef } from 'react';
import { Search, Menu, X } from 'lucide-react';
import SearchBar from './SearchBar';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add 3D effect to nav links
  useEffect(() => {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach((link) => {
      link.addEventListener('mousemove', (e: any) => {
        const rect = link.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * 5;
        const rotateY = ((x - centerX) / centerX) * 5;
        
        (link as HTMLElement).style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
      });
      
      link.addEventListener('mouseleave', () => {
        (link as HTMLElement).style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      });
    });
  }, []);

  return (
    <header 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-3' : 'py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <a href="/" className="text-xl font-semibold tracking-tight text-primary space-subheader text-metallic-silver">
          Future AI Directory
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#tools" className="nav-link">Browse</a>
          <a href="#categories" className="nav-link">Categories</a>
          <a href="#about" className="nav-link">About</a>
          <a href="https://solutions.futureaidirectory.com" target="_blank" rel="noopener noreferrer" className="nav-link">Prompt Directory</a>
          <a href="https://blogs.futureaidirectory.com" target="_blank" rel="noopener noreferrer" className="nav-link">Blogs</a>
          <button 
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 rounded-full text-foreground/70 hover:text-foreground hover:bg-secondary transition-colors"
            aria-label="Search"
          >
            <Search size={18} />
          </button>
        </nav>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 md:hidden rounded-lg text-foreground/80 hover:bg-secondary"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full glass md:hidden animate-slide-down">
          <div className="py-4 px-6 space-y-3">
            <a href="#tools" className="block py-2 text-foreground/80 hover:text-foreground">Browse</a>
            <a href="#categories" className="block py-2 text-foreground/80 hover:text-foreground">Categories</a>
            <a href="#about" className="block py-2 text-foreground/80 hover:text-foreground">About</a>
            <a href="https://solutions.futureaidirectory.com" target="_blank" rel="noopener noreferrer" className="block py-2 text-foreground/80 hover:text-foreground">Prompt Directory</a>
            <a href="https://blogs.futureaidirectory.com" target="_blank" rel="noopener noreferrer" className="block py-2 text-foreground/80 hover:text-foreground">Blogs</a>
            <button 
              onClick={() => {
                setShowSearch(!showSearch);
                setMobileMenuOpen(false);
              }}
              className="flex items-center py-2 text-foreground/80 hover:text-foreground"
            >
              <Search size={18} className="mr-2" /> Search
            </button>
          </div>
        </div>
      )}
      
      {/* Search Overlay */}
      {showSearch && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60] flex items-start justify-center pt-20 px-4 animate-fade-in">
          <div className="w-full max-w-2xl">
            <SearchBar 
              onClose={() => setShowSearch(false)} 
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
