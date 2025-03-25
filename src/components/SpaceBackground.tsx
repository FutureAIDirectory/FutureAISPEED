
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
    
    // Apply 3D tilt effect to company rows
    const apply3DTiltEffect = () => {
      const rows = document.querySelectorAll('.company-row');
      
      rows.forEach(row => {
        row.addEventListener('mousemove', (e: any) => {
          const rect = row.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          // Calculate tilt based on mouse position
          const tiltX = ((y - centerY) / centerY) * 5; // Max 5 degrees tilt
          const tiltY = ((centerX - x) / centerX) * 5;
          
          // Apply 3D transform
          (row as HTMLElement).style.transform = 
            `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
          
          // Add subtle highlight based on mouse position
          const percentX = (x / rect.width) * 100;
          const percentY = (y / rect.height) * 100;
          (row as HTMLElement).style.background = 
            `linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, transparent 50%), 
             radial-gradient(circle at ${percentX}% ${percentY}%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)`;
        });
        
        row.addEventListener('mouseleave', () => {
          (row as HTMLElement).style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
          (row as HTMLElement).style.background = 'transparent';
        });
      });
    };
    
    createCursorTrail();
    handleParallaxScroll();
    
    // Apply 3D effect with a slight delay to ensure DOM is ready
    setTimeout(apply3DTiltEffect, 500);
    
    // Reapply 3D effect when table changes (for pagination)
    const observer = new MutationObserver(() => {
      setTimeout(apply3DTiltEffect, 300);
    });
    
    const tableBody = document.querySelector('tbody');
    if (tableBody) {
      observer.observe(tableBody, { childList: true, subtree: true });
    }
    
    return () => {
      // Clean up cursor trails on unmount
      document.querySelectorAll('.cursor-trail').forEach(el => el.remove());
      observer.disconnect();
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
