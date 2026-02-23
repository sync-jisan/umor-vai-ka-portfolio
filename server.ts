import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Simple in-memory storage for messages (persisted to file if possible)
// Use /tmp for serverless environments (read-only file system elsewhere)
const MESSAGES_FILE = path.join(process.env.NODE_ENV === 'production' ? '/tmp' : process.cwd(), 'messages.json');

// Ensure messages file exists
if (!fs.existsSync(MESSAGES_FILE)) {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify([]));
}

// Helper to read messages
const getMessages = () => {
  try {
    if (fs.existsSync(MESSAGES_FILE)) {
      const data = fs.readFileSync(MESSAGES_FILE, 'utf-8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error reading messages:', error);
    return [];
  }
};

// Helper to save message
const saveMessage = (message: any) => {
  try {
    const messages = getMessages();
    messages.push({ ...message, id: Date.now(), timestamp: new Date().toISOString() });
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving message:', error);
    return false;
  }
};

// API Routes

// 1. Submit Contact Form
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const success = saveMessage({ name, email, message });
  if (success) {
    res.json({ success: true, message: 'Message sent successfully' });
  } else {
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// 2. Admin Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Hardcoded credentials as requested (default: admin/admin)
  // In a real app, use environment variables or a database
  const ADMIN_USER = process.env.ADMIN_USER || 'fuckoffyoumoron_369#';
  const ADMIN_PASS = process.env.ADMIN_PASS || 'tarekaktamadarchod369_#';

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    res.json({ success: true, token: 'simple-token-123' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// 3. Get Messages (Protected)
app.get('/api/messages', (req, res) => {
  const authHeader = req.headers.authorization;

  // Simple check
  if (authHeader !== 'Bearer simple-token-123') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const messages = getMessages();
  res.json(messages);
});


// Vite integration
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static file serving (if built)
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Only start server if run directly
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename || process.argv[1].replace(/\\/g, '/').endsWith('server.ts')) {
  startServer();
}

export default app;
