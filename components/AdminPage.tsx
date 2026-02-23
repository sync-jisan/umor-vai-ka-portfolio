import React, { useState, useEffect } from 'react';
import { ArrowLeft, Lock, MessageSquare, Trash2 } from 'lucide-react';

interface AdminPageProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

const AdminPage: React.FC<AdminPageProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Reset state when page opens/closes
  useEffect(() => {
    if (!isOpen) {
      setError('');
    } else if (isAuthenticated) {
      fetchMessages();
    }
  }, [isOpen, isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        setIsAuthenticated(true);
        fetchMessages();
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages', {
        headers: { 'Authorization': 'Bearer simple-token-123' }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        // Sort by newest first
        setMessages(data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
      }
    } catch (err) {
      console.error('Failed to fetch messages', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-brand-dark overflow-y-auto">
      <div className="max-w-5xl mx-auto px-6 py-12">
        
        {/* Header / Nav */}
        <div className="flex justify-between items-center mb-12 border-b border-brand-primary/20 pb-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={onClose}
              className="p-2 -ml-2 text-brand-secondary hover:text-brand-light transition-colors rounded-full hover:bg-brand-primary/10"
              title="Back to Home"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-3xl font-display font-bold text-brand-light flex items-center gap-3">
              <Lock className="w-6 h-6 text-brand-primary" />
              Admin Portal
            </h2>
          </div>
          
          {isAuthenticated && (
             <button 
                onClick={() => { setIsAuthenticated(false); setUsername(''); setPassword(''); }}
                className="text-sm text-brand-secondary hover:text-brand-light border border-brand-primary/20 px-4 py-2 rounded-lg hover:bg-brand-primary/10 transition-colors"
              >
                Logout
              </button>
          )}
        </div>

        {/* Content */}
        <div className="min-h-[60vh]">
          {!isAuthenticated ? (
            /* Login Form */
            <div className="max-w-md mx-auto mt-20 p-8 border border-brand-primary/20 rounded-2xl bg-brand-primary/5">
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-brand-light mb-2">Restricted Access</h3>
                <p className="text-brand-secondary text-sm">Please identify yourself to continue.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase text-brand-secondary tracking-widest">Username</label>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-brand-dark border border-brand-primary/20 rounded-lg px-4 py-3 text-brand-light focus:outline-none focus:border-brand-primary transition-colors"
                    placeholder="Enter username"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase text-brand-secondary tracking-widest">Password</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-brand-dark border border-brand-primary/20 rounded-lg px-4 py-3 text-brand-light focus:outline-none focus:border-brand-primary transition-colors"
                    placeholder="Enter password"
                  />
                </div>
                
                {error && (
                  <p className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded border border-red-400/20">
                    {error}
                  </p>
                )}

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-brand-primary hover:bg-brand-primary/80 text-brand-light font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading ? 'Verifying...' : 'Access Dashboard'}
                </button>
              </form>
            </div>
          ) : (
            /* Messages List */
            <div className="space-y-8">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-5 h-5 text-brand-primary" />
                <h3 className="text-brand-light font-bold text-xl">Inbox Messages ({messages.length})</h3>
              </div>

              {messages.length === 0 ? (
                <div className="text-center py-24 text-brand-secondary/50 border-2 border-dashed border-brand-primary/10 rounded-2xl">
                  <p className="text-lg">No messages received yet.</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className="bg-brand-primary/5 border border-brand-primary/10 rounded-xl p-6 hover:border-brand-primary/30 transition-colors group">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary font-bold">
                            {msg.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="text-brand-light font-bold text-lg">{msg.name}</h4>
                            <a href={`mailto:${msg.email}`} className="text-brand-secondary text-sm hover:text-brand-primary transition-colors">{msg.email}</a>
                          </div>
                        </div>
                        <span className="text-xs text-brand-secondary font-mono bg-brand-dark px-3 py-1 rounded-full border border-brand-primary/10">
                          {new Date(msg.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div className="bg-brand-dark/50 p-5 rounded-lg border border-brand-primary/5 ml-0 md:ml-14">
                        <p className="text-brand-light/90 whitespace-pre-wrap leading-relaxed">
                          {msg.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminPage;
