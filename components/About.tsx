import React from 'react';
import { Terminal, Cpu, Palette, Globe } from 'lucide-react';
import Reveal from './Reveal';
import PacmanAnimation from './PacmanAnimation';

const About: React.FC = () => {
  return (
    <section id="about" className="w-full min-h-screen px-8 md:px-12 flex flex-col justify-center py-24 bg-brand-dark relative z-10 overflow-hidden">
      <div className="max-w-6xl w-full mx-auto relative z-10">
        <Reveal animation="animate-fly-top">
            <h2 className="text-[clamp(3rem,6vw,5rem)] font-light text-brand-light mb-16 tracking-tight">
            About Me
            </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Summary */}
          <div className="lg:col-span-5 space-y-8">
            <Reveal animation="animate-fly-left" delay="delay-200">
                <p className="text-xl md:text-2xl text-brand-secondary font-light leading-relaxed">
                I am a multidisciplinary developer bridging the gap between <span className="text-brand-light font-normal">engineering</span> and <span className="text-brand-light font-normal">design</span>.
                </p>
                <p className="text-brand-secondary leading-relaxed mt-4">
                With 5 years of experience, I specialize in building scalable web applications and intelligent automation systems. My approach is rooted in minimalist code and maximalist user experience.
                </p>
            </Reveal>
            
            <div className="pt-8 grid grid-cols-2 gap-8 border-t border-brand-primary/20">
                <Reveal animation="animate-fly-bottom" delay="delay-500">
                    <span className="block text-4xl font-light text-brand-light mb-1">98%</span>
                    <span className="text-xs text-brand-secondary uppercase tracking-widest">Client Satisfaction</span>
                </Reveal>
                <Reveal animation="animate-fly-bottom" delay="delay-700">
                    <span className="block text-4xl font-light text-brand-light mb-1">24/7</span>
                    <span className="text-xs text-brand-secondary uppercase tracking-widest">System Uptime</span>
                </Reveal>
            </div>
          </div>

          {/* Right Column: Services/Skills Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
             {[
               { icon: Terminal, title: 'Backend Engineering', desc: 'Java, Python, C#, Node.js' },
               { icon: Palette, title: 'Interface Design', desc: 'Figma, Tailwind, UI/UX' },
               { icon: Cpu, title: 'AI Integration', desc: 'n8n, LLMs, Automation' },
               { icon: Globe, title: 'Full Stack Web', desc: 'React, Next.js, TypeScript' }
             ].map((item, idx) => (
               <Reveal 
                key={idx} 
                animation="animate-fly-right"
                delay={`delay-${(idx + 2) * 100}`}
               >
                 <div className="group p-6 border border-brand-primary/10 hover:border-brand-primary hover:bg-brand-primary/5 transition-all duration-300 h-full">
                    <div className="flex justify-between items-start mb-4">
                        <item.icon className="w-6 h-6 text-brand-secondary group-hover:text-brand-light transition-colors" />
                        <span className="text-xs font-mono text-brand-secondary/50">0{idx + 1}</span>
                    </div>
                    <h4 className="text-lg font-normal text-brand-light mb-2">{item.title}</h4>
                    <p className="text-brand-secondary text-sm">{item.desc}</p>
                 </div>
               </Reveal>
             ))}
          </div>
        </div>
      </div>
      
      {/* Fun Animation */}
      <PacmanAnimation />
    </section>
  );
};

export default About;