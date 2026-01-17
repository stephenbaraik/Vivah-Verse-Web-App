
export const getWeddingAdvice = async (
  query: string,
  weddingDate: string | null,
  venueName: string | null
): Promise<string> => {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, weddingDate, venueName })
    });
    const data = await response.json();
    return data.text || "I couldn't generate a response at the moment.";
  } catch (error) {
    console.error('Backend Gemini API Error:', error);
    return "I'm having trouble connecting to the wedding planning server. Please try again.";
  }
};