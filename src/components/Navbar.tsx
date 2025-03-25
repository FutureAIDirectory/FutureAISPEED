
import React, { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';
import SearchBar from './SearchBar';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-3' : 'py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <a href="/" className="text-xl font-semibold tracking-tight text-primary">
          Future AI Directory
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#tools" className="nav-link">Browse</a>
          <a href="#categories" className="nav-link">Categories</a>
          <a href="#about" className="nav-link">About</a>
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
