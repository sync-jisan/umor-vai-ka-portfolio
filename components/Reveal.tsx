import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  animation: string; // e.g. 'animate-fly-left'
  delay?: string; // e.g. 'delay-200'
  className?: string;
  threshold?: number;
}

const Reveal: React.FC<RevealProps> = ({ children, animation, delay = '', className = '', threshold = 0.1 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Animate once then stop observing
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={`${className} ${isVisible ? `${animation} ${delay}` : 'opacity-0'}`}>
      {children}
    </div>
  );
};

export default Reveal;