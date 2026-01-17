const fetch = require('node-fetch');
require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-preview:generateContent';

async function getWeddingAdvice(req, res) {
  const { query, weddingDate, venueName } = req.body;
  const context = `
    You are an expert Indian Wedding Planner for 'Vivah Verse'. 
    Your tone is warm, professional, and celebratory.
    Current Date Context: ${new Date().toDateString()}.
    User's Wedding Date: ${weddingDate || 'Not selected yet'}.
    Selected Venue: ${venueName || 'Not selected yet'}.
    The user is asking for advice. Provide concise, creative, and culturally relevant suggestions for an Indian wedding.
    If they ask about decor, suggest pastel colors and glass elements to match our brand.
    Keep the response under 150 words.
  `;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${context}\n\nUser Query: ${query}` }] }]
      })
    });
    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a response at the moment.";
    res.json({ text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ text: "I'm having trouble connecting to the wedding planning server. Please try again." });
  }
}

module.exports = { getWeddingAdvice };
