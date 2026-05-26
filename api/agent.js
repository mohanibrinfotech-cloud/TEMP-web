import Groq from "groq-sdk";

// Initialize Groq client once outside the handler instance
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Structured Context for optimal LLM parsing
const PORTFOLIO_CONTEXT = `
# MOHAN MAALI - PORTFOLIO DATA
- **Role**: Full Stack Developer
- **Skills**: React, Node.js, MongoDB, Express, AWS, AI Automation
- **Services**: Web Development, Backend Development, AI Automation
- **Projects**: Inventory Management System, Purchase Management System
- **Contact Email**: mohanibrinfotech@gmail.com
`;

export default async function handler(req, res) {
  // 1. Guard Clause: Enforce POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      answer: "Method Not Allowed. Use POST." 
    });
  }

  try {
    const { messages } = req.body;

    // 2. Guard Clause: Validate payload structure
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ 
        success: false, 
        answer: "Invalid request. 'messages' array is required." 
      });
    }

    // 3. Fallback check for missing Environment Variables
    if (!process.env.GROQ_API_KEY) {
      console.error("Configuration Error: GROQ_API_KEY is missing from environment variables.");
      return res.status(500).json({
        success: false,
        answer: "Server configuration error. Please try again later.",
      });
    }

    // 4. Request Groq LLM Completion
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.3, // Keeps responses focused, factual, and less creative
      messages: [
        {
          role: "system",
          content: `You are Mohan Maali's professional AI Assistant. 
Answer questions accurately using ONLY the portfolio information provided below. 
If the answer cannot be confidently inferred from this data, politely state that you do not know or suggest reaching out to Mohan directly at his email.

${PORTFOLIO_CONTEXT}`
        },
        ...messages,
      ],
    });

    // 5. Return Successful Payload
    return res.status(200).json({
      success: true,
      answer: completion.choices[0]?.message?.content || "No response generated.",
    });

  } catch (error) {
    // Log the actual error to your backend console for debugging
    console.error("Groq API Handler Error:", error);

    // Return a clean, user-friendly fallback response
    return res.status(500).json({
      success: false,
      answer: "An error occurred while connecting to the assistant. Please try again.",
    });
  }
}