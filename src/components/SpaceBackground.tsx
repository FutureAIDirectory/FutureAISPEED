
import React, { useEffect } from 'react';

const SpaceBackground: React.FC = () => {
  useEffect(() => {
    // Create cursor trail elements
    const createCursorTrail = () => {
      const body = document.body;
      const maxTrails = 10;
      const trails: HTMLDivElement[] = [];
      
      // Create trail elements
      for (let i = 0; i < maxTrails; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.opacity = '0';
        body.appendChild(trail);
        trails.push(trail);
      }
      
      // Track mouse position
      let mouseX = 0;
      let mouseY = 0;
      let trailIndex = 0;
      
      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update the current trail position
        const currentTrail = trails[trailIndex];
        currentTrail.style.left = `${mouseX}px`;
        currentTrail.style.top = `${mouseY}px`;
        currentTrail.style.opacity = '1';
        
        // Fade out the trail after some time
        setTimeout(() => {
          currentTrail.style.opacity = '0';
        }, 300);
        
        // Move to the next trail
        trailIndex = (trailIndex + 1) % maxTrails;
      });
    };
    
    // Handle parallax scrolling of stars
    const handleParallaxScroll = () => {
      const starLayers = document.querySelectorAll('.star-layer');
      let lastScrollY = window.scrollY;
      let ticking = false;
      
      const updateParallax = () => {
        const scrollY = window.scrollY;
        const scrollDirection = scrollY > lastScrollY ? 1 : -1;
        
        starLayers.forEach((layer, index) => {
          const speed = (index + 1) * 0.05;
          const yOffset = scrollY * speed * scrollDirection;
          (layer as HTMLElement).style.transform = `translateY(${yOffset}px)`;
        });
        
        lastScrollY = scrollY;
        ticking = false;
      };
      
      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(updateParallax);
          ticking = true;
        }
      });
    };
    
    createCursorTrail();
    handleParallaxScroll();
    
    return () => {
      // Clean up cursor trails on unmount
      document.querySelectorAll('.cursor-trail').forEach(el => el.remove());
    };
  }, []);
  
  return (
    <div className="parallax-stars">
      <div className="star-layer star-layer-1"></div>
      <div className="star-layer star-layer-2"></div>
      <div className="star-layer star-layer-3"></div>
    </div>
  );
};

export default SpaceBackground;
