import React from 'react';
import { ViewState } from '../App';
import Reveal from './Reveal';

interface HeroProps {
  setView: (view: ViewState) => void;
  onOpenAdmin: () => void;
}

const Hero: React.FC<HeroProps> = ({ setView, onOpenAdmin }) => {
  const [opacity, setOpacity] = React.useState(1);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      // Fade out as we scroll down, fully faded by the time the next section covers it
      const newOpacity = Math.max(0, 1 - scrollY / (windowHeight * 0.8));
      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      className="fixed top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden py-20 z-10"
      style={{ opacity }}
    >
      
      {/* 1. Giant Background Typography - Matches screenshot (Solid White, Large) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 select-none overflow-hidden">
         <Reveal animation="animate-fly-top" className="w-full text-center">
            {/* Increased opacity to 0.15 and removed text-outline to match solid white look in screenshot */}
            <h1 className="text-[20vw] md:text-[25vw] font-display font-bold text-brand-light leading-none tracking-tighter opacity-10 md:opacity-15 whitespace-nowrap">
                ENGINEER
            </h1>
         </Reveal>
      </div>

      {/* User Image Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-40 mix-blend-lighten">
        <img 
          src="/Gemini_Generated_Image_76dy4q76dy4q76dy.png" 
          alt="Background Art" 
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      {/* 2. Floating Elements */}
      <div className="absolute top-1/4 left-1/6 hidden md:block">
        <Reveal animation="animate-fly-left" delay="delay-500">
             <div className="w-12 h-12 border border-brand-primary/30 opacity-50 rotate-45 animate-float"></div>
        </Reveal>
      </div>
      <div className="absolute bottom-1/4 right-1/6 hidden md:block">
        <Reveal animation="animate-fly-right" delay="delay-700">
             <div className="w-8 h-8 bg-brand-primary/20 opacity-50 rotate-12 animate-float" style={{ animationDelay: '1s' }}></div>
        </Reveal>
      </div>
      
      <div className="absolute top-24 right-24 hidden md:block">
        <Reveal animation="animate-fly-top" delay="delay-300">
             <div className="text-brand-secondary/30 text-[10px] font-mono flex flex-col items-end gap-1">
                <span>SYS.STATUS: ONLINE</span>
                <span className="w-12 h-0.5 bg-brand-primary"></span>
                <span>ID: MD_UMOR</span>
             </div>
        </Reveal>
      </div>

      <div className="absolute left-8 bottom-32 hidden md:block">
          <Reveal animation="animate-fly-left" delay="delay-500">
            <p className="text-[10px] text-brand-secondary w-24 leading-tight opacity-50">
                LET YOUR SYSTEMS WORK WHILE YOU SLEEP/
            </p>
          </Reveal>
      </div>

      {/* Decorative Large Frame (Matches Screenshot) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] border border-brand-primary/10 rounded-3xl pointer-events-none z-0 hidden md:block"></div>

      {/* 4. Central Content */}
      <div className="relative z-10 w-full max-w-[1400px] px-6 flex flex-col justify-center">
         
         <div className="flex flex-col md:flex-row items-center justify-between min-h-[60vh] gap-12 md:gap-0">
            
            {/* Left Text */}
            <div className="w-full md:w-1/4 text-center md:text-left order-2 md:order-1">
               <Reveal animation="animate-fly-left" delay="delay-200">
                   <h2 className="text-6xl md:text-7xl font-display font-bold text-brand-light uppercase leading-[0.85] opacity-90 tracking-tighter">
                      Full<br/>Stack
                   </h2>
                   <p className="text-brand-secondary text-sm mt-4 max-w-[200px] mx-auto md:mx-0">
                      Building robust architectures for the <button onClick={onOpenAdmin} className="inline appearance-none bg-transparent border-none p-0 m-0 font-inherit text-inherit cursor-text hover:text-brand-light transition-colors select-none pointer-events-auto relative z-50 focus:outline-none">modern</button> web.
                   </p>
               </Reveal>
            </div>

            {/* Right Text */}
            <div className="w-full md:w-1/4 text-center md:text-right order-3">
                <Reveal animation="animate-fly-right" delay="delay-200">
                    <h2 className="text-6xl md:text-7xl font-display font-bold text-brand-light uppercase leading-[0.85] opacity-90 tracking-tighter">
                    AI<br/>Agent
                    </h2>
                    <div className="flex justify-center md:justify-end mt-4">
                        <p className="text-brand-secondary text-sm max-w-[200px] mx-auto md:mx-0">
                            Automating logic with n8n & Python scripts.
                        </p>
                    </div>
               </Reveal>
            </div>
         </div>

         {/* Bottom CTA */}
         <div className="mt-16 md:mt-0 w-full flex flex-col items-center justify-center">
             <Reveal animation="animate-fly-bottom" delay="delay-500" className="flex flex-col items-center">
                 <p className="text-brand-secondary text-[10px] md:text-sm uppercase tracking-[0.2em] mb-8 text-center max-w-[80%] md:max-w-full leading-relaxed">
                     Positioned at the intersection of Design & <br className="md:hidden"/>Automated Intelligence
                 </p>
                 
                 <button 
                    onClick={scrollToProjects}
                    className="group relative px-10 py-4 bg-gradient-to-r from-brand-primary to-[#9d50bb] text-brand-light font-bold uppercase tracking-widest text-sm clip-path-slant hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(122,63,145,0.4)]"
                    style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)' }}
                 >
                    Start Exploring
                 </button>
             </Reveal>
         </div>

      </div>
    </section>
  );
};

export default Hero;