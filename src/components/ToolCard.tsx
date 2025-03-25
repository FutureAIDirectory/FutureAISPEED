
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
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      // Apply the transformation
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    
    const handleMouseLeave = () => {
      // Reset the transform when mouse leaves
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
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
        return { label: 'Free', bgColor: 'bg-green-100', textColor: 'text-green-800' };
      case 'freemium':
        return { label: 'Freemium', bgColor: 'bg-blue-100', textColor: 'text-blue-800' };
      case 'paid':
        return { label: 'Paid', bgColor: 'bg-purple-100', textColor: 'text-purple-800' };
    }
  };
  
  const pricing = getPricingInfo(tool.pricingType);
  
  return (
    <div 
      ref={cardRef}
      className="group h-full overflow-hidden rounded-xl card-hover 3d-card"
    >
      <div className="relative h-full p-5 bg-black bg-opacity-90 border border-white/10">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-radial from-[#222222] to-black opacity-90 z-0 animate-subtle-pulse"></div>
        
        {/* Content with z-index to appear above the background */}
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-2">
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${pricing.bgColor} ${pricing.textColor}`}>
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
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
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
