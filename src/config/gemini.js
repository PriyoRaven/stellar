import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
};

let chatSession = null;

async function run(prompt, history) {
  try {
    if (!chatSession) {
      chatSession = model.startChat({
        generationConfig,
        history: history.map((msg) => ({
          role: msg.role,
          parts: [{ text: msg.parts[0].text }],
        })),
      });
    }

    const result = await chatSession.sendMessage(prompt);

    if (!result.response) {
      throw new Error("Invalid response format.");
    }

    return result.response.text();
  } catch (error) {
    console.error("Error in run function:", error);
    throw error;
  }
}

export default run;
