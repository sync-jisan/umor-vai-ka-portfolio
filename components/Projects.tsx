import React, { useRef, useEffect, useState } from 'react';
import { PROJECTS_DATA } from '../constants';

const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress: 0 when top touches top of viewport, 1 when bottom touches bottom?
      // Actually, we want 0 when the section *starts* sticking (top <= 0).
      // And we want it to finish when we've scrolled through the height.
      
      // Distance scrolled past the start of the section
      const scrolled = -top;
      // Total scrollable distance (height - windowHeight)
      const totalScrollable = height - windowHeight;

      if (totalScrollable <= 0) return;

      const p = Math.max(0, Math.min(1, scrolled / totalScrollable));
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Init
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper to calculate styles for each slide
  const getSlideStyle = (index: number) => {
    // Define timing ranges for 4 slides
    // Slide 1: 0.0 - 0.2 (Zoom In)
    // Slide 2: 0.2 - 0.45 (From Right)
    // Slide 3: 0.45 - 0.7 (From Left)
    // Slide 4: 0.7 - 0.95 (From Top)
    
    let style: React.CSSProperties = {
      zIndex: index * 10,
      opacity: 1,
      transition: 'transform 0.1s linear', // Smooth out the scroll updates slightly
    };

    if (index === 0) {
      // Zoom effect
      // Active from 0 to 1 (always visible at bottom)
      // Zoom from 0.8 to 1.0 during the first phase
      const zoomProgress = Math.min(1, progress / 0.2);
      const scale = 0.8 + (0.2 * zoomProgress);
      style.transform = `scale(${scale})`;
      style.opacity = 1; // Always visible
    } else if (index === 1) {
      // From Right
      const start = 0.2;
      const end = 0.45;
      const p = Math.max(0, Math.min(1, (progress - start) / (end - start)));
      // 100% -> 0%
      const x = 100 - (p * 100);
      style.transform = `translateX(${x}%)`;
    } else if (index === 2) {
      // From Left
      const start = 0.45;
      const end = 0.7;
      const p = Math.max(0, Math.min(1, (progress - start) / (end - start)));
      // -100% -> 0%
      const x = -100 + (p * 100);
      style.transform = `translateX(${x}%)`;
    } else if (index === 3) {
      // From Up (Top)
      const start = 0.7;
      const end = 0.95;
      const p = Math.max(0, Math.min(1, (progress - start) / (end - start)));
      // -100% -> 0%
      const y = -100 + (p * 100);
      style.transform = `translateY(${y}%)`;
    }

    return style;
  };

  return (
    <section ref={containerRef} id="projects" className="w-full h-[400vh] relative bg-brand-dark z-20">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* Section Title (Fades out as we scroll) */}
        <div 
          className="absolute top-10 left-10 z-50 pointer-events-none transition-opacity duration-500"
          style={{ opacity: Math.max(0, 1 - progress * 5) }}
        >
           <h2 className="text-5xl md:text-7xl font-display font-bold text-brand-light uppercase tracking-tighter shadow-black drop-shadow-lg">
              Selected<span className="text-brand-primary">_</span>Work
           </h2>
        </div>

        {PROJECTS_DATA.map((project, index) => (
          <div
            key={project.id}
            className="absolute inset-0 w-full h-full flex items-center justify-center bg-brand-dark"
            style={getSlideStyle(index)}
          >
            {/* Image */}
            <img 
              src={project.image} 
              alt={project.title} 
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/20 opacity-80"></div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-4xl px-6">
                <span className="inline-block py-1 px-3 border border-brand-primary/50 rounded-full text-brand-primary text-xs font-mono mb-4 bg-brand-dark/50 backdrop-blur-sm">
                    PROJECT 0{index + 1}
                </span>
                <h3 className="text-5xl md:text-8xl font-display font-bold text-brand-light uppercase mb-4 tracking-tighter drop-shadow-2xl">
                    {project.title}
                </h3>
                <p className="text-brand-secondary text-lg md:text-xl max-w-2xl mx-auto font-light drop-shadow-md">
                    {project.description}
                </p>
                <div className="mt-8 flex gap-3 justify-center">
                    {project.tags.map(tag => (
                        <span key={tag} className="text-xs font-bold uppercase tracking-widest text-brand-light/80 bg-brand-light/10 px-4 py-2 rounded-sm backdrop-blur-md">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
          </div>
        ))}
        
        {/* Progress Indicator */}
        <div className="absolute bottom-10 right-10 z-50 flex flex-col gap-2">
            {PROJECTS_DATA.map((_, i) => (
                <div 
                    key={i} 
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        // Simple logic to highlight current active slide
                        (i === 0 && progress < 0.2) ||
                        (i === 1 && progress >= 0.2 && progress < 0.45) ||
                        (i === 2 && progress >= 0.45 && progress < 0.7) ||
                        (i === 3 && progress >= 0.7)
                        ? 'bg-brand-primary scale-150' 
                        : 'bg-brand-light/20'
                    }`}
                />
            ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;