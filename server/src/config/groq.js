import Groq from "groq-sdk";

let groq = null;

// Only initialize Groq if API key is properly configured
if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== "your_groq_api_key_here") {
  try {
    groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  } catch (error) {
    console.warn("⚠️  Failed to initialize Groq:", error.message);
  }
} else {
  console.warn("⚠️  GROQ_API_KEY not configured. AI features will not work until a valid API key is provided in .env");
  // Use a mock Groq object for development
  groq = {
    messages: {
      create: async () => {
        throw new Error("Groq not configured - please provide a valid GROQ_API_KEY in .env");
      }
    }
  };
}

export default groq;
