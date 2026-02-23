import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  // We keep these props to maintain compatibility with App.tsx but we'll use scrolling mainly
  currentView: string;
  setView: (view: any) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const navItems = [
    { label: 'Services', id: 'skills' },
    { label: 'Work', id: 'projects' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 px-6 py-6 transition-all duration-300 ${
      scrolled 
        ? 'bg-white text-[#EF4444] py-4 shadow-lg' 
        : 'bg-[#EF4444] text-white'
    }`}>
      <div className="max-w-[1400px] mx-auto flex items-center justify-between md:grid md:grid-cols-3">
        
        {/* Logo */}
        <div className="flex items-center">
          <button 
            onClick={() => scrollToSection('hero')} 
            className="font-display font-bold text-2xl tracking-tighter uppercase text-current"
          >
            Md Umor<span className={scrolled ? 'text-[#EF4444]' : 'text-white'}>.</span>
          </button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex justify-center items-center gap-12">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-sm font-semibold uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity text-current"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex justify-end">
          <button 
            onClick={() => scrollToSection('contact')}
            className="px-6 py-2 border border-current text-xs font-bold uppercase tracking-widest hover:bg-current hover:text-inherit hover:bg-opacity-10 transition-all"
          >
            Start Project
          </button>
        </div>
        
        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-current"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden ${
          scrolled ? 'bg-white text-[#EF4444]' : 'bg-[#EF4444] text-white'
        }`}>
           <button 
             onClick={() => scrollToSection('hero')}
             className="text-2xl font-display font-bold uppercase text-current"
           >
             Home
           </button>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-2xl font-display font-bold uppercase tracking-widest opacity-80 hover:opacity-100 text-current"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;