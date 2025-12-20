import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// AI Persona configurations
export const AI_PERSONAS = {
  default: {
    name: "Stellar",
    icon: "✨",
    description: "Helpful AI assistant",
    systemPrompt: "You are Stellar, a helpful, friendly, and knowledgeable AI assistant trained by Google and made by Priyadarsi (a.k.a. Raven). Be concise but thorough in your responses."
  },
  creative: {
    name: "Creative Writer",
    icon: "🎨",
    description: "Imaginative storyteller & writer",
    systemPrompt: "You are a Creative Writer AI. You excel at storytelling, poetry, creative writing, and artistic expression. Use vivid language, metaphors, and engaging narratives. Be imaginative and inspiring."
  },
  coder: {
    name: "Code Expert",
    icon: "💻",
    description: "Programming specialist",
    systemPrompt: "You are a Code Expert AI. You specialize in programming, software development, debugging, and technical explanations. Provide clean, well-commented code examples. Explain complex concepts clearly with practical examples."
  },
  tutor: {
    name: "Study Tutor",
    icon: "📚",
    description: "Patient teacher & explainer",
    systemPrompt: "You are a Study Tutor AI. You excel at teaching and explaining concepts in simple terms. Use analogies, examples, and step-by-step explanations. Be patient, encouraging, and thorough. Ask clarifying questions when needed."
  },
  casual: {
    name: "Casual Friend",
    icon: "😊",
    description: "Friendly conversationalist",
    systemPrompt: "You are a Casual Friend AI. Be warm, friendly, and conversational. Use casual language, emojis occasionally, and show genuine interest. Keep things light and fun while still being helpful."
  }
};

// Get model with optional system instruction
const getModel = (persona = "default") => {
  const personaConfig = AI_PERSONAS[persona] || AI_PERSONAS.default;
  return genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
    systemInstruction: personaConfig.systemPrompt,
  });
};

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
};

// Main chat function with persona support
async function run(prompt, history, persona = "default", attachments = []) {
  try {
    const model = getModel(persona);

    // Build parts array for multimodal support
    const parts = [];

    // Add text prompt
    parts.push({ text: prompt });

    // Add any attachments (images or PDFs converted to inline data)
    for (const attachment of attachments) {
      if (attachment.type === "image") {
        parts.push({
          inlineData: {
            mimeType: attachment.mimeType,
            data: attachment.data, // base64 encoded
          }
        });
      } else if (attachment.type === "pdf") {
        // For PDFs, we include the extracted text or base64 data
        parts.push({
          inlineData: {
            mimeType: "application/pdf",
            data: attachment.data,
          }
        });
      }
    }

    const chatSession = model.startChat({
      generationConfig,
      history: history.slice(0, -1).map((msg) => ({
        role: msg.role,
        parts: msg.parts.map(part => {
          if (part.text) return { text: part.text };
          if (part.inlineData) return { inlineData: part.inlineData };
          return part;
        }),
      })),
    });

    const result = await chatSession.sendMessage(parts);

    if (!result.response) {
      throw new Error("Invalid response format.");
    }

    return result.response.text();
  } catch (error) {
    console.error("Error in run function:", error);
    throw error;
  }
}

// Generate smart follow-up suggestions
export async function generateSuggestions(conversationContext, persona = "default") {
  try {
    const model = getModel(persona);

    const suggestionPrompt = `Based on the following conversation, suggest exactly 3 short, engaging follow-up questions the user might want to ask. Return ONLY a JSON array of 3 strings, no other text.

Conversation:
${conversationContext}

Return format: ["question 1", "question 2", "question 3"]`;

    const result = await model.generateContent(suggestionPrompt);
    const text = result.response.text();

    // Parse JSON from response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return [];
  } catch (error) {
    console.error("Error generating suggestions:", error);
    return [];
  }
}

// Web search grounding - uses Gemini's built-in grounding
export async function runWithGrounding(prompt, history, persona = "default") {
  try {
    const personaConfig = AI_PERSONAS[persona] || AI_PERSONAS.default;

    // Use model with Google Search grounding
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: personaConfig.systemPrompt,
      tools: [{
        googleSearch: {}
      }],
    });

    const chatSession = model.startChat({
      generationConfig,
      history: history.slice(0, -1).map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.parts[0].text }],
      })),
    });

    const result = await chatSession.sendMessage(prompt);

    if (!result.response) {
      throw new Error("Invalid response format.");
    }

    // Get grounding metadata if available
    const groundingMetadata = result.response.candidates?.[0]?.groundingMetadata;

    return {
      text: result.response.text(),
      sources: groundingMetadata?.groundingChunks || [],
      searchQueries: groundingMetadata?.webSearchQueries || []
    };
  } catch (error) {
    console.error("Error in grounded search:", error);
    throw error;
  }
}

export default run;
