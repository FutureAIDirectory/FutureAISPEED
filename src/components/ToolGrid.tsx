
import React, { useState, useEffect } from 'react';
import ToolCard, { Tool } from './ToolCard';

// Sample data for tools
const sampleTools: Tool[] = [
  {
    id: '1',
    name: 'ChatGPT',
    description: 'AI language model that can engage in conversations, answer questions, assist with tasks, and generate human-like text based on the prompts it receives.',
    imageUrl: 'https://images.unsplash.com/photo-1677442340599-e89f59db1bad?q=80&w=1932&auto=format&fit=crop',
    category: 'Chatbots',
    pricingType: 'freemium',
    url: 'https://chat.openai.com'
  },
  {
    id: '2',
    name: 'DALL-E',
    description: 'AI system that can create realistic images and art from natural language descriptions. It combines concepts, attributes, and styles to produce original images.',
    imageUrl: 'https://images.unsplash.com/photo-1680582805519-0fb5edda1edc?q=80&w=2071&auto=format&fit=crop',
    category: 'Image Generation',
    pricingType: 'paid',
    url: 'https://openai.com/dall-e-3'
  },
  {
    id: '3',
    name: 'Jasper',
    description: 'AI content platform that helps create marketing copy, social media posts, emails, and more with its advanced language AI.',
    imageUrl: 'https://images.unsplash.com/photo-1622542796254-5b9c46a054ab?q=80&w=2064&auto=format&fit=crop',
    category: 'Writing & Content',
    pricingType: 'paid',
    url: 'https://www.jasper.ai'
  },
  {
    id: '4',
    name: 'Synthesia',
    description: 'AI video generation platform that creates videos with virtual avatars. Turn your text into professional-looking videos in minutes.',
    imageUrl: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?q=80&w=2070&auto=format&fit=crop',
    category: 'Video Creation',
    pricingType: 'freemium',
    url: 'https://www.synthesia.io'
  },
  {
    id: '5',
    name: 'Notion AI',
    description: 'AI writing assistant integrated with Notion that helps you draft, edit, summarize, and brainstorm content directly in your workspace.',
    imageUrl: 'https://images.unsplash.com/photo-1646617747609-45b466ace9a6?q=80&w=2070&auto=format&fit=crop',
    category: 'Productivity',
    pricingType: 'paid',
    url: 'https://www.notion.so/product/ai'
  },
  {
    id: '6',
    name: 'Midjourney',
    description: 'AI art generator that creates images from textual descriptions using a machine learning model similar to DALL-E and Stable Diffusion.',
    imageUrl: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2070&auto=format&fit=crop',
    category: 'Image Generation',
    pricingType: 'paid',
    url: 'https://www.midjourney.com'
  },
  {
    id: '7',
    name: 'Descript',
    description: 'All-in-one audio/video editing that uses AI to enable text-based editing of audio and video files.',
    imageUrl: 'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?q=80&w=2070&auto=format&fit=crop',
    category: 'Audio & Voice',
    pricingType: 'freemium',
    url: 'https://www.descript.com'
  },
  {
    id: '8',
    name: 'GitHub Copilot',
    description: 'AI pair programmer that offers code suggestions directly in your editor, helping you code more efficiently.',
    imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2088&auto=format&fit=crop',
    category: 'Coding & Development',
    pricingType: 'paid',
    url: 'https://github.com/features/copilot'
  }
];

interface ToolGridProps {
  category?: string;
  searchQuery?: string;
}

const ToolGrid: React.FC<ToolGridProps> = ({ category = 'all', searchQuery = '' }) => {
  const [filteredTools, setFilteredTools] = useState<Tool[]>(sampleTools);
  const [visibleCount, setVisibleCount] = useState(6);
  
  useEffect(() => {
    // Filter tools based on category and search query
    let filtered = sampleTools;
    
    if (category !== 'all') {
      filtered = filtered.filter(tool => 
        tool.category.toLowerCase().includes(category.toLowerCase())
      );
    }
    
    if (searchQuery) {
      filtered = filtered.filter(tool => 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredTools(filtered);
    // Reset visible count when filters change
    setVisibleCount(6);
  }, [category, searchQuery]);
  
  const loadMore = () => {
    setVisibleCount(prev => prev + 6);
  };
  
  return (
    <section id="tools" className="py-16 container-custom">
      <div className="mb-10 text-center animate-fade-in">
        <h2 className="text-3xl font-bold mb-4">Discover AI Tools</h2>
        <p className="text-foreground/70 max-w-2xl mx-auto">
          Explore our curated collection of the best AI tools to enhance your productivity
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.slice(0, visibleCount).map((tool, index) => (
          <div 
            key={tool.id} 
            className="opacity-0 animate-slide-up" 
            style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
          >
            <ToolCard tool={tool} />
          </div>
        ))}
      </div>
      
      {visibleCount < filteredTools.length && (
        <div className="mt-12 text-center">
          <button 
            onClick={loadMore}
            className="btn-secondary px-6"
          >
            Load More
          </button>
        </div>
      )}
      
      {filteredTools.length === 0 && (
        <div className="text-center py-20">
          <p className="text-foreground/60 text-lg">No tools found matching your criteria</p>
        </div>
      )}
    </section>
  );
};

export default ToolGrid;
