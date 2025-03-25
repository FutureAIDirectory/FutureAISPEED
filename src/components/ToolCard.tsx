
import React, { useRef, useEffect } from 'react';

export interface Tool {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  pricingType: 'free' | 'freemium' | 'paid';
  url: string;
}

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate rotation based on mouse position
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;
      
      // Apply the transformation
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      
      // Create a subtle glow effect based on mouse position
      const glowX = (x / rect.width) * 100;
      const glowY = (y / rect.height) * 100;
      card.style.background = `
        radial-gradient(circle at ${glowX}% ${glowY}%, rgba(118, 151, 222, 0.1) 0%, transparent 50%),
        linear-gradient(145deg, rgba(26, 31, 44, 0.9) 0%, rgba(11, 12, 16, 0.95) 100%)
      `;
    };
    
    const handleMouseLeave = () => {
      // Reset the transform when mouse leaves
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      card.style.background = 'linear-gradient(145deg, rgba(26, 31, 44, 0.9) 0%, rgba(11, 12, 16, 0.95) 100%)';
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  // Helper function to get pricing label and color
  const getPricingInfo = (type: 'free' | 'freemium' | 'paid') => {
    switch (type) {
      case 'free':
        return { label: 'Free', bgColor: 'bg-green-900/40', textColor: 'text-green-400' };
      case 'freemium':
        return { label: 'Freemium', bgColor: 'bg-blue-900/40', textColor: 'text-blue-400' };
      case 'paid':
        return { label: 'Paid', bgColor: 'bg-purple-900/40', textColor: 'text-purple-400' };
    }
  };
  
  const pricing = getPricingInfo(tool.pricingType);
  
  // Generate random star positions for a starry background effect
  const generateStars = (count: number) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const size = Math.random() * 1.5 + 0.5;
      const delay = Math.random() * 5;
      stars.push(
        <div 
          key={i}
          className="absolute rounded-full bg-white opacity-60 animate-pulse"
          style={{ 
            top: `${top}%`, 
            left: `${left}%`, 
            width: `${size}px`, 
            height: `${size}px`,
            animationDelay: `${delay}s`,
            animationDuration: '3s'
          }}
        />
      );
    }
    return stars;
  };
  
  return (
    <div 
      ref={cardRef}
      className="group h-full overflow-hidden rounded-xl card-hover 3d-card border border-white/5 shadow-lg animate-float"
      style={{ 
        background: 'linear-gradient(145deg, rgba(26, 31, 44, 0.9) 0%, rgba(11, 12, 16, 0.95) 100%)',
        backdropFilter: 'blur(8px)'
      }}
    >
      <div className="relative h-full p-5 z-10 overflow-hidden">
        {/* Stars background effect */}
        {generateStars(15)}
        
        {/* Animated gradient background */}
        <div className="absolute inset-0 opacity-30 z-0 animate-subtle-pulse">
          <div className="absolute inset-0 bg-gradient-radial from-galaxy-blue/10 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-galaxy-purple/10 to-transparent"></div>
        </div>
        
        {/* Content with z-index to appear above the background */}
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-2">
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${pricing.bgColor} ${pricing.textColor} border border-white/5`}>
              {pricing.label}
            </span>
            <span className="text-xs text-white/60">{tool.category}</span>
          </div>
          
          <h3 className="font-semibold text-lg mb-2 text-white group-hover:text-primary transition-colors">
            {tool.name}
          </h3>
          
          <p className="text-white/70 text-sm line-clamp-3 mb-4">
            {tool.description}
          </p>
          
          <div className="mt-auto pt-2">
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-primary hover:text-white transition-colors"
            >
              Visit Website
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 ml-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;
