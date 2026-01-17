// Basic Express server setup
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- In-Memory User Store (for demonstration purposes) ---
const users = [];
const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret_key'; // Use environment variable in production

// --- Auth Routes ---
const authRouter = express.Router();

// Register a new user
authRouter.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and store the new user
    const newUser = { id: users.length + 1, email, password: hashedPassword };
    users.push(newUser);

    console.log('Users:', users); // for debugging

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user.', error: error.message });
  }
});

// Login a user
authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    res.json({ token, userId: user.id, email: user.email });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in.', error: error.message });
  }
});

app.use('/api/auth', authRouter);


// --- Gemini API Route ---
const { getWeddingAdvice } = require('./geminiController');
app.post('/api/gemini', getWeddingAdvice);

// --- Payment Simulation Route ---
app.post('/api/process-payment', (req, res) => {
  const { totalAmount, emiPlan } = req.body;
  console.log(`Processing payment of ${totalAmount} with ${emiPlan}-month EMI plan.`);

  // Simulate a delay for payment processing
  setTimeout(() => {
    // In a real application, you would integrate with a payment gateway here.
    // For this simulation, we'll just return a success response.
    res.status(200).json({ success: true, message: 'Payment processed successfully.' });
  }, 1000);
});


// --- Protected Route Example ---
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(403).json({ message: 'A token is required for authentication.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ message: 'Invalid Token.' });
  }
  return next();
};

app.get('/api/protected', verifyToken, (req, res) => {
    res.json({ message: "Welcome! You have access to protected content.", user: req.user });
});


// --- Server ---
app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});