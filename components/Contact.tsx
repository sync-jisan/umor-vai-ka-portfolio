import React, { useState } from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="w-full min-h-screen px-8 md:px-12 flex flex-col justify-between py-24 bg-brand-dark relative z-10">
      <div className="max-w-[1200px] w-full mx-auto flex-1 flex flex-col justify-center">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
            <div>
                <Reveal animation="animate-fly-left">
                    <h2 className="text-[clamp(3rem,6vw,6rem)] font-light text-brand-light leading-[0.9] mb-8 tracking-tighter">
                        Let's work <br /> <span className="text-brand-secondary">together.</span>
                    </h2>
                    <p className="text-lg text-brand-secondary mb-12 max-w-md">
                        Available for freelance projects and open to full-time opportunities.
                    </p>
                </Reveal>
                
                <div className="space-y-4">
                    <div className="pt-8 grid grid-cols-2 gap-4 max-w-sm">
                        <Reveal animation="animate-fly-bottom" delay="delay-400">
                            <div>
                                <span className="block text-xs text-brand-secondary uppercase tracking-widest mb-1">Phone</span>
                                <span className="text-brand-light">Will Add In Future</span>
                            </div>
                        </Reveal>
                        <Reveal animation="animate-fly-bottom" delay="delay-500">
                            <div>
                                <span className="block text-xs text-brand-secondary uppercase tracking-widest mb-1">Location</span>
                                <span className="text-brand-light">Dhaka, Bangladesh</span>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>

            <div className="bg-brand-primary/5 p-8 md:p-12">
                <Reveal animation="animate-fly-right" delay="delay-300">
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        <div className="space-y-1">
                            <label className="text-xs uppercase text-brand-secondary tracking-widest">What's your name?</label>
                            <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent border-b border-brand-primary/20 py-4 text-xl text-brand-light focus:outline-none focus:border-brand-primary transition-colors placeholder-brand-secondary/20" 
                                placeholder="John Doe" 
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs uppercase text-brand-secondary tracking-widest">Your email</label>
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent border-b border-brand-primary/20 py-4 text-xl text-brand-light focus:outline-none focus:border-brand-primary transition-colors placeholder-brand-secondary/20" 
                                placeholder="john@example.com" 
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs uppercase text-brand-secondary tracking-widest">Tell me about your project</label>
                            <textarea 
                                rows={3} 
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent border-b border-brand-primary/20 py-4 text-xl text-brand-light focus:outline-none focus:border-brand-primary transition-colors placeholder-brand-secondary/20" 
                                placeholder="I need a..."
                            ></textarea>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <button 
                                type="submit" 
                                disabled={status === 'sending' || status === 'success'}
                                className="pt-4 group flex items-center gap-2 text-lg font-medium text-brand-light hover:text-brand-primary transition-colors disabled:opacity-50"
                            >
                                {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
                                <ArrowUpRight className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                            </button>
                            {status === 'error' && <span className="text-red-400 text-sm">Failed to send. Try again.</span>}
                        </div>
                    </form>
                </Reveal>
            </div>
        </div>
      </div>

      <Reveal animation="animate-fly-bottom" delay="delay-700">
        <div className="mt-12 py-8 border-t border-brand-primary/10 flex justify-between items-end text-xs text-brand-secondary uppercase tracking-widest">
            <div>
                © {new Date().getFullYear()} Md Umor
            </div>
            <div className="flex gap-6">
                <a href="#" className="hover:text-brand-light">Linkedin</a>
                <a href="#" className="hover:text-brand-light">Github</a>
                <a href="#" className="hover:text-brand-light">Instagram</a>
            </div>
        </div>
      </Reveal>
    </section>
  );
};

export default Contact;