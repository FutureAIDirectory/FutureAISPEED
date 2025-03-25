
import React, { useState, useEffect, useRef } from 'react';
import { Search, Menu, X } from 'lucide-react';
import SearchBar from './SearchBar';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

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

  return (
    <header 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'space-nav-scrolled py-3' : 'space-nav py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <a href="/" className="text-xl font-semibold tracking-tight text-white space-logo">
          Future AI Directory
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#categories" className="space-nav-link">Categories</a>
          <a href="#about" className="space-nav-link">About</a>
          <a href="https://solutions.futureaidirectory.com" target="_blank" rel="noopener noreferrer" className="space-nav-link">Prompt Directory</a>
          <a href="https://blogs.futureaidirectory.com" target="_blank" rel="noopener noreferrer" className="space-nav-link">Blogs</a>
          <button 
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 transform hover:scale-110"
            aria-label="Search"
          >
            <Search size={18} />
          </button>
        </nav>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 md:hidden rounded-lg text-white/80 hover:bg-white/10 transition-all duration-300"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full space-nav-mobile md:hidden animate-slide-down">
          <div className="py-4 px-6 space-y-3">
            <a href="#categories" className="block py-2 text-white/80 hover:text-white transition-all duration-300">Categories</a>
            <a href="#about" className="block py-2 text-white/80 hover:text-white transition-all duration-300">About</a>
            <a href="https://solutions.futureaidirectory.com" target="_blank" rel="noopener noreferrer" className="block py-2 text-white/80 hover:text-white transition-all duration-300">Prompt Directory</a>
            <a href="https://blogs.futureaidirectory.com" target="_blank" rel="noopener noreferrer" className="block py-2 text-white/80 hover:text-white transition-all duration-300">Blogs</a>
            <button 
              onClick={() => {
                setShowSearch(!showSearch);
                setMobileMenuOpen(false);
              }}
              className="flex items-center py-2 text-white/80 hover:text-white transition-all duration-300"
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
