import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import AIChat from './components/AIChat';
import SocialLinks from './components/SocialLinks';
import AdminPage from './components/AdminPage';

export type ViewState = 'home' | 'skills' | 'projects' | 'about' | 'contact';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="bg-brand-dark min-h-screen w-full text-brand-light selection:bg-brand-primary selection:text-brand-light relative">
      <div className="bg-noise"></div>
      
      {isAdminOpen && (
        <AdminPage isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      )}

      <Navbar currentView={currentView} setView={setCurrentView} />
      <SocialLinks />
      
      <main className="w-full relative z-10 flex flex-col">
        {/* Hero is fixed, so it stays behind. We render it here. */}
        <Hero setView={setCurrentView} onOpenAdmin={() => setIsAdminOpen(true)} />
        
        {/* Spacer to push content below the initial viewport */}
        <div className="h-screen w-full pointer-events-none"></div>

        {/* Scrolling content overlays the fixed Hero */}
        <div className="relative z-20 bg-brand-dark shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
          <About />
          <Skills />
          <Projects />
          <Contact />
        </div>
      </main>

      <div className="z-50 relative">
        <AIChat />
      </div>
    </div>
  );
}

export default App;