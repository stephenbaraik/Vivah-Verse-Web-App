// JSON File-based Database Layer
// Provides persistent storage using JSON files

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Get data directory from environment or use default
const DATA_DIR = process.env.DATA_DIR || './data';

// Ensure data directory exists
const ensureDataDir = () => {
  const absolutePath = path.resolve(__dirname, '..', DATA_DIR);
  if (!fs.existsSync(absolutePath)) {
    fs.mkdirSync(absolutePath, { recursive: true });
  }
  return absolutePath;
};

/**
 * Generate a unique ID
 */
const generateId = () => {
  return crypto.randomUUID();
};

/**
 * Read data from a JSON file
 * @param {string} filename - Name of the JSON file
 * @param {Object} defaultData - Default data if file doesn't exist
 * @returns {Object} Parsed data from file
 */
const readData = (filename, defaultData = { users: [], sessions: [] }) => {
  try {
    const dataDir = ensureDataDir();
    const filePath = path.join(dataDir, filename);
    
    if (!fs.existsSync(filePath)) {
      // Initialize file with default data
      writeData(filename, defaultData);
      return defaultData;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error.message);
    return defaultData;
  }
};

/**
 * Write data to a JSON file
 * @param {string} filename - Name of the JSON file
 * @param {Object} data - Data to write
 */
const writeData = (filename, data) => {
  try {
    const dataDir = ensureDataDir();
    const filePath = path.join(dataDir, filename);
    
    // Pretty print with 2-space indentation
    const content = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, content, 'utf8');
    
    return true;
  } catch (error) {
    console.error(`Error writing ${filename}:`, error.message);
    return false;
  }
};

/**
 * User Database Operations
 */
const usersDb = {
  // Get all users
  findAll: () => {
    const data = readData('users.json', { users: [] });
    return data.users;
  },
  
  // Find user by ID
  findById: (id) => {
    const users = usersDb.findAll();
    return users.find(u => u.id === id);
  },
  
  // Find user by email
  findByEmail: (email) => {
    const users = usersDb.findAll();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
  },
  
  // Create new user
  create: (userData) => {
    const data = readData('users.json');
    const newUser = {
      id: generateId(),
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    data.users.push(newUser);
    writeData('users.json', data);
    
    return newUser;
  },
  
  // Update user
  update: (id, updates) => {
    const data = readData('users.json');
    const index = data.users.findIndex(u => u.id === id);
    
    if (index === -1) return null;
    
    data.users[index] = {
      ...data.users[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    writeData('users.json', data);
    return data.users[index];
  },
  
  // Delete user
  delete: (id) => {
    const data = readData('users.json');
    const index = data.users.findIndex(u => u.id === id);
    
    if (index === -1) return false;
    
    data.users.splice(index, 1);
    writeData('users.json', data);
    return true;
  },
  
  // Count all users
  count: () => {
    const users = usersDb.findAll();
    return users.length;
  }
};

/**
 * Session Database Operations
 * For storing active sessions/tokens
 */
const sessionsDb = {
  // Get all sessions
  findAll: () => {
    const data = readData('sessions.json', { sessions: [] });
    return data.sessions;
  },
  
  // Find session by token
  findByToken: (token) => {
    const sessions = sessionsDb.findAll();
    return sessions.find(s => s.token === token);
  },
  
  // Find sessions by user ID
  findByUserId: (userId) => {
    const sessions = sessionsDb.findAll();
    return sessions.filter(s => s.userId === userId);
  },
  
  // Create new session
  create: (sessionData) => {
    const data = readData('sessions.json');
    const newSession = {
      id: generateId(),
      ...sessionData,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString() // 1 hour default
    };
    
    data.sessions.push(newSession);
    writeData('sessions.json', data);
    
    return newSession;
  },
  
  // Delete session
  delete: (token) => {
    const data = readData('sessions.json');
    const index = data.sessions.findIndex(s => s.token === token);
    
    if (index === -1) return false;
    
    data.sessions.splice(index, 1);
    writeData('sessions.json', data);
    return true;
  },
  
  // Delete all sessions for a user
  deleteByUserId: (userId) => {
    const data = readData('sessions.json');
    const initialLength = data.sessions.length;
    data.sessions = data.sessions.filter(s => s.userId !== userId);
    writeData('sessions.json', data);
    return initialLength - data.sessions.length;
  },
  
  // Clean expired sessions
  cleanExpired: () => {
    const data = readData('sessions.json');
    const now = new Date().toISOString();
    const initialLength = data.sessions.length;
    data.sessions = data.sessions.filter(s => s.expiresAt > now);
    writeData('sessions.json', data);
    return initialLength - data.sessions.length;
  },
  
  // Check if token is valid
  isValid: (token) => {
    const session = sessionsDb.findByToken(token);
    if (!session) return false;
    
    if (new Date(session.expiresAt) < new Date()) {
      // Auto-clean expired session
      sessionsDb.delete(token);
      return false;
    }
    
    return true;
  }
};

/**
 * Initialize database with sample data (optional)
 */
const initializeDb = () => {
  ensureDataDir();
  
  // Check if users database exists, if not create empty one
  const dataDir = ensureDataDir();
  const usersPath = path.join(dataDir, 'users.json');
  const sessionsPath = path.join(dataDir, 'sessions.json');
  
  if (!fs.existsSync(usersPath)) {
    writeData('users.json', { users: [] });
  }
  
  if (!fs.existsSync(sessionsPath)) {
    writeData('sessions.json', { sessions: [] });
  }
  
  console.log('✅ Database initialized at:', dataDir);
};

// Initialize on module load
initializeDb();

module.exports = {
  usersDb,
  sessionsDb,
  readData,
  writeData,
  generateId,
  initializeDb,
  DATA_DIR
};

