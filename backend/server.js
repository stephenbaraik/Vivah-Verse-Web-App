// Basic Express server setup with security enhancements
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Security middleware
const { 
  helmetConfig, 
  authRateLimiter, 
  apiRateLimiter, 
  secureHeaders,
  registerValidation, 
  loginValidation, 
  checkValidation,
  corsOptions
} = require('./middleware/security');

// Logger middleware
const { requestLogger, errorLogger, logger } = require('./middleware/logger');

// Database layer
const { 
  usersDb, 
  sessionsDb,
  initializeDb 
} = require('./utils/database');

// Environment validation
const { printEnvValidation } = require('./utils/envValidator');

const app = express();
const port = process.env.PORT || 5000;

// Initialize database
initializeDb();

// Validate environment variables
const envResult = printEnvValidation();
if (!envResult.valid) {
  console.warn('⚠️ Warning: Environment validation failed. Some features may not work correctly.');
}

// --- Middleware ---
app.use(helmetConfig);
app.use(cors(corsOptions));
app.use(express.json());
app.use(secureHeaders);
app.use(requestLogger);

// Apply rate limiting
app.use('/api/', apiRateLimiter);

// --- In-Memory User Store replaced with JSON file database ---
// Users are now stored in backend/data/users.json

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

// --- Auth Routes ---
const authRouter = express.Router();

// Apply rate limiting to auth routes
authRouter.use(authRateLimiter);

// Register a new user
authRouter.post('/register', registerValidation, checkValidation, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = usersDb.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'User already exists.' 
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create and store the new user
    const newUser = usersDb.create({
      email,
      password: hashedPassword
    });

    // Generate JWT
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email }, 
      JWT_SECRET, 
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Create session
    sessionsDb.create({
      token,
      userId: newUser.id,
      email: newUser.email
    });

    logger.info('New user registered', { userId: newUser.id, email: newUser.email });

    res.status(201).json({ 
      success: true,
      message: 'User registered successfully.',
      token,
      userId: newUser.id,
      email: newUser.email
    });
  } catch (error) {
    logger.error('Registration error', { error: error.message, stack: error.stack });
    res.status(500).json({ 
      success: false,
      message: 'Error registering user.', 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Login a user
authRouter.post('/login', loginValidation, checkValidation, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = usersDb.findByEmail(email);
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials.' 
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials.' 
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email }, 
      JWT_SECRET, 
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Create session
    sessionsDb.create({
      token,
      userId: user.id,
      email: user.email
    });

    logger.info('User logged in', { userId: user.id, email: user.email });

    res.json({ 
      success: true,
      token, 
      userId: user.id, 
      email: user.email 
    });
  } catch (error) {
    logger.error('Login error', { error: error.message, stack: error.stack });
    res.status(500).json({ 
      success: false,
      message: 'Error logging in.', 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Logout a user
authRouter.post('/logout', (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      sessionsDb.delete(token);
      logger.info('User logged out', { token: token.substring(0, 10) + '...' });
    }

    res.json({ 
      success: true,
      message: 'Logged out successfully.' 
    });
  } catch (error) {
    logger.error('Logout error', { error: error.message });
    res.status(500).json({ 
      success: false,
      message: 'Error logging out.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Get current user profile
authRouter.get('/me', (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'No token provided.' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Check session is still valid
    if (!sessionsDb.isValid(token)) {
      return res.status(401).json({ 
        success: false,
        message: 'Session expired. Please login again.' 
      });
    }

    // Get user
    const user = usersDb.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found.' 
      });
    }

    // Return user without password
    const { password, ...userWithoutPassword } = user;
    res.json({ 
      success: true,
      user: userWithoutPassword 
    });
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid token.' 
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: 'Token expired.' 
      });
    }
    logger.error('Get profile error', { error: error.message });
    res.status(500).json({ 
      success: false,
      message: 'Error fetching profile.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

app.use('/api/auth', authRouter);


// --- Gemini API Route ---
const { getWeddingAdvice } = require('./geminiController');
app.post('/api/gemini', getWeddingAdvice);

// --- Payment Simulation Route ---
app.post('/api/process-payment', (req, res) => {
  const { totalAmount, emiPlan } = req.body;
  logger.info('Processing payment', { totalAmount, emiPlan });

  // Simulate a delay for payment processing
  setTimeout(() => {
    // In a real application, you would integrate with a payment gateway here.
    logger.info('Payment processed', { totalAmount, transactionId: `TXN-${Date.now()}` });
    res.status(200).json({ 
      success: true, 
      message: 'Payment processed successfully.',
      transactionId: `TXN-${Date.now()}`
    });
  }, 1000);
});


// --- Protected Route Example ---
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: 'A token is required for authentication.' 
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Check session validity
    if (!sessionsDb.isValid(token)) {
      return res.status(401).json({ 
        success: false,
        message: 'Session expired or invalid.' 
      });
    }
    
    req.user = decoded;
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: 'Token expired.' 
      });
    }
    return res.status(401).json({ 
      success: false,
      message: 'Invalid Token.' 
    });
  }
  return next();
};

app.get('/api/protected', verifyToken, (req, res) => {
  res.json({ 
    success: true,
    message: "Welcome! You have access to protected content.", 
    user: req.user 
  });
});


// --- Health Check Endpoint ---
app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});


// --- 404 Handler ---
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});


// --- Error Handler ---
app.use(errorLogger);

app.use((err, req, res, next) => {
  // Don't leak error details in production
  const message = process.env.NODE_ENV === 'development' 
    ? err.message 
    : 'An unexpected error occurred';
    
  res.status(err.status || 500).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});


// --- Server ---
app.listen(port, () => {
  logger.info(`Backend server started`, { port, environment: process.env.NODE_ENV || 'development' });
  console.log(`Backend server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Health check: http://localhost:${port}/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully...');
  process.exit(0);
});

module.exports = app;

