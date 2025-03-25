
import React, { useEffect } from 'react';
import { FadeIn } from './Animations';

const HeroSection: React.FC = () => {
  // Apply the galaxy card effect to the CTA buttons
  useEffect(() => {
    const applyGalaxyEffect = (selector: string) => {
      const elements = document.querySelectorAll(selector);
      
      elements.forEach(el => {
        el.addEventListener('mousemove', (e: any) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / 20;
          const rotateY = (centerX - x) / 20;
          
          el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        el.addEventListener('mouseleave', () => {
          el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
      });
    };
    
    applyGalaxyEffect('.btn-primary');
    applyGalaxyEffect('.btn-secondary');
  }, []);

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Star Background */}
      <div className="absolute inset-0 -z-10 generate-stars"></div>
      
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[30%] -right-[10%] w-[50%] h-[70%] rounded-full bg-blue-100/10 blur-[100px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[70%] rounded-full bg-purple-100/10 blur-[100px]" />
      </div>
      
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center stagger-animate">
          <div className="inline-flex items-center px-3 py-1.5 mb-6 border border-border rounded-full bg-secondary/50 text-sm text-foreground/70">
            <span className="mr-2 bg-green-500 w-2 h-2 rounded-full"></span>
            Discover the future of AI
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Find the perfect AI tool for your next project
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
            A curated directory of cutting-edge artificial intelligence tools, platforms, and resources to supercharge your workflow.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#tools" className="btn-primary galaxy-card">
              Explore AI Tools
            </a>
            <a href="#categories" className="btn-secondary galaxy-card">
              Browse Categories
            </a>
          </div>
          
          <div className="mt-12 flex flex-wrap items-center justify-center text-sm text-foreground/60 gap-4">
            <span className="flex items-center">
              <span className="w-4 h-4 inline-flex items-center justify-center bg-primary/10 rounded-full mr-2">
                <span className="block w-1.5 h-1.5 bg-primary rounded-full"></span>
              </span>
              <span>500+ AI tools</span>
            </span>
            <span className="hidden md:block h-1 w-1 rounded-full bg-foreground/30"></span>
            <span className="flex items-center">
              <span className="w-4 h-4 inline-flex items-center justify-center bg-primary/10 rounded-full mr-2">
                <span className="block w-1.5 h-1.5 bg-primary rounded-full"></span>
              </span>
              <span>30+ categories</span>
            </span>
            <span className="hidden md:block h-1 w-1 rounded-full bg-foreground/30"></span>
            <span className="flex items-center">
              <span className="w-4 h-4 inline-flex items-center justify-center bg-primary/10 rounded-full mr-2">
                <span className="block w-1.5 h-1.5 bg-primary rounded-full"></span>
              </span>
              <span>Updated daily</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
