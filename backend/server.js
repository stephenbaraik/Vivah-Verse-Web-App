// Basic Express server setup for Gemini API proxy
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const { getWeddingAdvice } = require('./geminiController');
app.post('/api/gemini', getWeddingAdvice);

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
