import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getWeddingAdvice = async (
  query: string, 
  weddingDate: string | null, 
  venueName: string | null
): Promise<string> => {
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
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `${context}\n\nUser Query: ${query}`,
    });

    return response.text || "I couldn't generate a response at the moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the wedding planning server. Please try again.";
  }
};