import React from 'react';
import { SKILLS_DATA } from '../constants';
import Reveal from './Reveal';
import StickmanRunner from './StickmanRunner';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="w-full min-h-screen px-8 md:px-12 flex items-center py-24 bg-brand-dark relative z-10">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Header Area */}
          <div>
            <Reveal animation="animate-fly-left">
                <h2 className="text-[clamp(3rem,6vw,5rem)] font-light text-brand-light mb-8 tracking-tight leading-none">
                Expertise &<br />Capabilities
                </h2>
                <p className="text-xl text-brand-secondary font-light max-w-md">
                    A refined set of tools and methodologies honed over years of solving complex problems.
                </p>
            </Reveal>
            
            <div className="mt-12 flex flex-wrap gap-3">
                {['Git', 'Docker', 'AWS', 'SQL', 'MongoDB', 'Redis', 'GraphQL', 'Tailwind', 'Figma', 'Linux'].map((tech, i) => (
                    <Reveal 
                        key={tech} 
                        animation="animate-assemble" 
                        delay={`delay-${(i % 5) * 100}`}
                        className="inline-block"
                    >
                        <span className="px-4 py-2 bg-brand-primary/5 border border-brand-primary/10 text-brand-secondary text-sm block">
                            {tech}
                        </span>
                    </Reveal>
                ))}
            </div>
          </div>

          {/* Skills List */}
          <div className="space-y-6">
            <div className="relative space-y-6">
                <StickmanRunner skills={SKILLS_DATA} />
                {SKILLS_DATA.map((skill, index) => (
                    <Reveal key={skill.subject} animation="animate-fly-right" delay={`delay-${index * 100}`}>
                        <div className="group relative z-10">
                            <div className="flex justify-between items-end mb-2">
                                <h3 className="text-2xl font-light text-brand-light group-hover:text-brand-primary transition-colors">
                                    {skill.subject}
                                </h3>
                                <span className="text-sm font-mono text-brand-secondary">
                                    {skill.A}%
                                </span>
                            </div>
                            <div className="w-full h-[1px] bg-brand-primary/20 relative overflow-hidden">
                                <div 
                                    className="absolute top-0 left-0 h-full bg-brand-primary"
                                    style={{ width: `${skill.A}%` }}
                                ></div>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
            
            <Reveal animation="animate-fly-bottom" delay="delay-700">
                <div className="pt-12 mt-12 border-t border-brand-primary/10">
                    <h4 className="text-brand-light mb-4 text-sm uppercase tracking-widest">Core Stack</h4>
                    <div className="grid grid-cols-2 gap-4 text-brand-secondary font-light">
                        <p>• React / Next.js Environment</p>
                        <p>• Python Automation Scripting</p>
                        <p>• Java Spring Boot Backend</p>
                        <p>• n8n AI Integration</p>
                    </div>
                </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;