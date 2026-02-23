import React from 'react';
import { Github, Linkedin, Instagram } from 'lucide-react';

const SocialLinks: React.FC = () => {
  return (
    <div className="fixed z-50 flex flex-col gap-4 bottom-6 left-6 md:bottom-auto md:top-32 md:left-auto md:right-6">
      <a 
        href="https://github.com" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-brand-secondary hover:text-brand-light transition-colors p-2 bg-brand-dark/50 backdrop-blur-sm rounded-full border border-brand-primary/20 hover:border-brand-primary"
        aria-label="GitHub"
      >
        <Github className="w-5 h-5" />
      </a>
      <a 
        href="https://linkedin.com" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-brand-secondary hover:text-brand-light transition-colors p-2 bg-brand-dark/50 backdrop-blur-sm rounded-full border border-brand-primary/20 hover:border-brand-primary"
        aria-label="LinkedIn"
      >
        <Linkedin className="w-5 h-5" />
      </a>
      <a 
        href="https://www.instagram.com/md_umor_420/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-brand-secondary hover:text-brand-light transition-colors p-2 bg-brand-dark/50 backdrop-blur-sm rounded-full border border-brand-primary/20 hover:border-brand-primary"
        aria-label="Instagram"
      >
        <Instagram className="w-5 h-5" />
      </a>
    </div>
  );
};

export default SocialLinks;
