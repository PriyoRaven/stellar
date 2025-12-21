import { GoogleGenerativeAI } from "@google/generative-ai";
import { AI_PERSONAS } from "./personas";
import { AVAILABLE_MODELS, DEFAULT_MODEL } from "./models";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Re-export for convenience
export { AI_PERSONAS } from "./personas";
export { AVAILABLE_MODELS, DEFAULT_MODEL } from "./models";

// Configuration constants
const MAX_HISTORY_MESSAGES = 10;
const MAX_SUGGESTION_CONTEXT = 2;

// Get model with optional system instruction and model selection
const getModel = (persona = "default", modelId = DEFAULT_MODEL) => {
  const personaConfig = AI_PERSONAS[persona] || AI_PERSONAS.default;
  return genAI.getGenerativeModel({
    model: modelId,
    systemInstruction: personaConfig.systemPrompt,
  });
};

const generationConfig = {
  temperature: 1, // this is for creativity 0 is most conservative and 1 is most creative
  topP: 0.95, // this is for randomness 0 is most deterministic and 1 is most random
  topK: 64,  // this is for diversity 0 is most diverse and 64 is most diverse
  maxOutputTokens: 4096, // this is for length of response
};

// Optimize history by limiting messages and removing large attachments from older messages
const optimizeHistory = (history) => {
  const recentHistory = history.slice(-MAX_HISTORY_MESSAGES);

  // For older messages, strip out inline data (images/PDFs) to save tokens
  return recentHistory.map((msg, index) => {
    // Keep attachments only in the last 2 messages
    if (index < recentHistory.length - 2) {
      return {
        role: msg.role,
        parts: msg.parts.filter(part => part.text).map(part => ({ text: part.text })),
      };
    }
    return {
      role: msg.role,
      parts: msg.parts.map(part => {
        if (part.text) return { text: part.text };
        if (part.inlineData) return { inlineData: part.inlineData };
        return part;
      }),
    };
  });
};

// Main chat function with persona and model support
async function run(prompt, history, persona = "default", attachments = [], modelId = DEFAULT_MODEL) {
  try {
    const model = getModel(persona, modelId);

    // Build parts array for multimodal support
    const parts = [];
    parts.push({ text: prompt });

    // Add any attachments (images or PDFs)
    for (const attachment of attachments) {
      if (attachment.type === "image" || attachment.type === "pdf") {
        parts.push({
          inlineData: {
            mimeType: attachment.mimeType,
            data: attachment.data,
          }
        });
      }
    }

    // Optimize history before sending
    const optimizedHistory = optimizeHistory(history.slice(0, -1));

    const chatSession = model.startChat({
      generationConfig,
      history: optimizedHistory,
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

// Generate smart follow-up suggestions (uses minimal tokens)
export async function generateSuggestions(conversationContext, persona = "default", modelId = DEFAULT_MODEL) {
  try {
    // Use the fastest/cheapest model for suggestions
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite", // Always use lite model for suggestions
    });

    // Limit context to save tokens
    const lines = conversationContext.split('\n');
    const limitedContext = lines.slice(-MAX_SUGGESTION_CONTEXT * 2).join('\n');

    const suggestionPrompt = `Based on this conversation, suggest 3 brief follow-up questions. Return ONLY a JSON array.

${limitedContext}

Format: ["q1", "q2", "q3"]`;

    const result = await model.generateContent({
      contents: [{ parts: [{ text: suggestionPrompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 150, // Very small output for suggestions
      },
    });

    const text = result.response.text();
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

// Web search grounding
export async function runWithGrounding(prompt, history, persona = "default", modelId = DEFAULT_MODEL) {
  try {
    const personaConfig = AI_PERSONAS[persona] || AI_PERSONAS.default;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: personaConfig.systemPrompt,
      tools: [{ googleSearch: {} }],
    });

    // Optimize history
    const optimizedHistory = optimizeHistory(history.slice(0, -1));

    const chatSession = model.startChat({
      generationConfig,
      history: optimizedHistory.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.parts[0]?.text || "" }],
      })),
    });

    const result = await chatSession.sendMessage(prompt);

    if (!result.response) {
      throw new Error("Invalid response format.");
    }

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
